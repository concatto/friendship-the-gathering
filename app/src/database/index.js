import firebase from 'firebase/app';
import app from './config';

export default app;

const toArray = (snapshot) => {
  const docs = [];

  snapshot.forEach(doc => docs.push(doc));

  return docs;
};

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
