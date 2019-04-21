import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBvZYvSfaZGmIHKu-JgFHcwPscn-SYuonk',
  authDomain: 'friendship-f4cd0.firebaseapp.com',
  databaseURL: 'https://friendship-f4cd0.firebaseio.com',
  projectId: 'friendship-f4cd0',
  storageBucket: 'friendship-f4cd0.appspot.com',
  messagingSenderId: '622857027360',
};

export default firebase.initializeApp(config);

firebase.firestore();
