
import * as firebase from "firebase/app";
var firebaseConfig = {
    apiKey: "AIzaSyBtRrJtcIanMnaZlsdgxPoY7DfTx6F7fhU",
    authDomain: "iedc-firebase-test.firebaseapp.com",
    databaseURL: "https://iedc-firebase-test.firebaseio.com",
    projectId: "iedc-firebase-test",
    storageBucket: "iedc-firebase-test.appspot.com",
    messagingSenderId: "769907728983",
    appId: "1:769907728983:web:cebf44c216bfbd66e03912",
    measurementId: "G-FH9JN90Q6E",
    updateProfileOnLogin: false,
    userProfile: 'users',
    useFirestoreForProfile: true
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;