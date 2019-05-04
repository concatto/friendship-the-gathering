import firebase from 'firebase/app';
import uuidv4 from 'uuid/v4';
import app from './config';
import { composeEmail } from '../utils';

export default app;

const toArray = (snapshot) => {
  const docs = [];

  snapshot.forEach(doc => docs.push(doc));

  return docs;
};

export const gatherResults = (socialGroup) => {
  // EmQaRX3WT8nRvmfuKs0M

  // Transform the subject field of each response to the document's ID
  const populateResponses = responses => (
    responses.map(response => (
      { ...response, subject: response.subject.id }
    ))
  );

  app.firestore().collection('socialGroups').doc(socialGroup).get()
    .then(doc => doc.data().members.map(member => member.get()))
    .then(promises => Promise.all(promises))
    .then(members => (
      members.map(doc => ({ id: doc.id, responses: populateResponses(doc.data().responses) }))
    ))
    .then((groupData) => {
      const rows = [
        ['from', 'to', 'level', 'change'],
      ];

      groupData.forEach((member) => {
        member.responses.forEach((response) => {
          rows.push([member.id, response.subject, response.level, response.change]);
        });
      });

      const text = rows.map(row => row.join(',')).join('\n');
      console.log(text);
    });
};

export const registerPerson = (name, email, socialGroup) => {
  const persons = app.firestore().collection('persons');
  const groups = app.firestore().collection('socialGroups');
  const socialGroupDoc = groups.doc(socialGroup.id);

  return persons.add({
    name,
    email,
    socialGroup: socialGroupDoc,
    responses: [],
    token: uuidv4(),
  }).then((doc) => {
    console.log('Added: ', doc.id);
    return socialGroupDoc.update({
      members: firebase.firestore.FieldValue.arrayUnion(persons.doc(doc.id)),
    });
  });
};

export const generateEmailsForGroup = (socialGroup) => {
  const promises = socialGroup.data().members.map(x => x.get());
  const groupName = socialGroup.data().name;

  Promise.all(promises)
    .then(members => toArray(members))
    .then(members => members.map(member => composeEmail(member.data(), groupName)))
    .then(emails => console.log(JSON.stringify(emails, '', 4)));
};


export const getSocialGroups = () => app.firestore().collection('socialGroups').get().then(data => toArray(data));

export const withToken = (token = '') => {
  if (token.length === 0) {
    throw new Error('No token set.');
  }

  const persons = app.firestore().collection('persons');

  return {
    getRemainingResponses() {
      const membersQuery = this.getSocialGroup().then(doc => (
        doc.data().members.map(member => member.get()) // Map members of the group to docs
      )).then(members => Promise.all(members));

      const subjectsQuery = this.getResponses().then(responses => (
        responses.map(r => r.subject.get()) // Map each response to the subject's doc
      )).then(subjects => Promise.all(subjects));

      const queries = [
        membersQuery,
        subjectsQuery,
        this.getSelf().then(self => self.id),
      ];

      return Promise.all(queries).then(([members, subjects, selfId]) => {
        const ids = subjects.map(item => item.id);
        ids.push(selfId);

        return members.filter(member => ids.includes(member.id) === false);
      });
    },

    getSelf() {
      return persons.where('token', '==', token).limit(1).get().then(snapshot => toArray(snapshot)[0]);
    },

    getResponses() {
      return this.getSelf().then(self => self.data().responses);
    },

    getSocialGroup() {
      return this.getSelf().then(self => self.data().socialGroup.get());
    },

    getRandomSubject() {
      return this.getRemainingResponses().then((docs) => {
        if (docs.length === 0) {
          return null;
        }

        const index = Math.floor(Math.random() * docs.length); // Generate a random index
        const doc = docs[index]; // Retrieve the person's document directly

        return {
          id: doc.id,
          name: doc.data().name,
        };
      });
    },

    insertResponse(subject, level, change) {
      const data = {
        level,
        change,
        subject: persons.doc(subject),
      };

      return this.getSelf().then(self => (
        self.ref.update({
          responses: firebase.firestore.FieldValue.arrayUnion(data),
        })
      ));
    },
  };
};
