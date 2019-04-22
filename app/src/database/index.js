import firebase from './config';

export default firebase;

const toArray = (snapshot) => {
  const docs = [];

  snapshot.forEach(doc => docs.push(doc));

  return docs;
};

export const withToken = (token = '') => {
  if (token.length === 0) {
    throw new Error('No token set.');
  }

  const persons = firebase.firestore().collection('persons');

  return {
    getRemainingResponses() {
      const memberIds = this.getSocialGroup().then(doc => (
        doc.data().members.map(member => member.get()) // Map members of the group to docs
      )).then(members => Promise.all(members));

      const subjectIds = this.getResponses().then(responses => (
        responses.map(r => r.subject.get()) // Map each response to the subject's doc
      )).then(subjects => Promise.all(subjects));

      return Promise.all([memberIds, subjectIds]).then(([m, s]) => {
        const ids = s.map(item => item.id);

        return m.filter(member => ids.includes(member.id) === false);
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
        const index = Math.floor(Math.random() * docs.length); // Generate a random index

        return docs[index]; // Retrieve the person's document directly
      }).then(doc => ({
        id: doc.id,
        name: doc.data().name,
      }));
    },
  };
};
