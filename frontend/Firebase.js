import firebase from 'firebase';
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBFDhjUcyj5254AturCrZfRUMotyLgx9fw",
    authDomain: "cookieproject-bb832.firebaseapp.com",
    databaseURL: "https://cookieproject-bb832.firebaseio.com",
    projectId: "cookieproject-bb832",
    storageBucket: "cookieproject-bb832.appspot.com",
    messagingSenderId: "532183552789",
    appId: "1:532183552789:web:edcdc45c4d1a7e24258f1c",
    measurementId: "G-Z3CZ95H17H"
  };

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;