import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App.js';
import * as serviceWorker from './serviceWorker';
import {store} from "./redux/store";
import {Provider} from 'react-redux';
import { ReactReduxFirebaseProvider} from 'react-redux-firebase'
import "firebase/auth";
import 'firebase/firestore'

window.store = store;

ReactDOM.render(
    <Provider store={store}>
    <App/>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
