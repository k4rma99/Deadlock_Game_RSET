import React from 'react';
import {Navbar} from "./components/Navbar.jsx"
import "./App.css"
import { ScrollSnap } from './components/ScrollSnap.jsx';

function App() {

  return (
<html>

  <head>
    <link rel="stylesheet" href="https://use.typekit.net/bfk1sru.css"/>
  </head>
  <body id='App' className="App">
  <Navbar></Navbar>
              <ScrollSnap></ScrollSnap>
  </body>

</html>
  );
}


export default App;
