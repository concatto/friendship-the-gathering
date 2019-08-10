import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

// welcome/1ec2d6e1-7f1f-4f0b-81f0-09406442e85f

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
firebase.storage();
