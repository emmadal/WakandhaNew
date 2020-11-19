import { decode, encode } from 'base-64';
import './timerConfig';
global.addEventListener = (x) => x;
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyC-O6YbXfXsMyxOfScw6t-O0f5NOsGsE88',
  authDomain: 'wakandha-c7cea.firebaseapp.com',
  databaseURL: 'https://wakandha-c7cea.firebaseio.com',
  projectId: 'wakandha-c7cea',
  storageBucket: 'wakandha-c7cea.appspot.com',
  messagingSenderId: '250946094205',
  appId: '1:250946094205:web:19fbc1b22a752e6469dd14',
  measurementId: 'G-R1XMV5KN08',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);

  if (__DEV__) {
    firebase.functions().useFunctionsEmulator('http://localhost:5001');
  }
}

export { firebase };
