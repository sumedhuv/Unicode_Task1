import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAKzY_ZDdPbqYPQq5z0X6iNW-gwP9FgBsA',
  authDomain: 'unicode-task-2ac0f.firebaseapp.com',
  databaseURL: 'unicode-task-2ac0f.firebaseio.com',
  projectId: 'unicode-task-2ac0f',
  storageBucket: 'unicode-task-2ac0f.appspot.com',
  messagingSenderId: '405295057560',
  appId: '1:405295057560:android:c3ece896de3805670edeed',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };