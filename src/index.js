import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App.js';
import * as serviceWorker from './serviceWorker';
import {store} from "./redux/store";
import {Provider} from 'react-redux';
import * as firebase from "firebase/app";
import { ReactReduxFirebaseProvider} from 'react-redux-firebase'
import "firebase/auth";
var Cookie = require('js-cookie');

window.Cookie = Cookie;

var firebaseConfig = {
        apiKey: "AIzaSyBtRrJtcIanMnaZlsdgxPoY7DfTx6F7fhU",
        authDomain: "iedc-firebase-test.firebaseapp.com",
        databaseURL: "https://iedc-firebase-test.firebaseio.com",
        projectId: "iedc-firebase-test",
        storageBucket: "iedc-firebase-test.appspot.com",
        messagingSenderId: "769907728983",
        appId: "1:769907728983:web:cebf44c216bfbd66e03912",
        measurementId: "G-FH9JN90Q6E"
};
      // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
}

window.store = store;

ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
    <App/>
    </ReactReduxFirebaseProvider>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
