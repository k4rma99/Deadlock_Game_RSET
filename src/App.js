import React from 'react';
import {Navbar} from "./components/Navbar.jsx"
import "./App.css"
import { ScrollSnap } from './components/ScrollSnap.jsx';
import { Menu } from './components/Menu.jsx';

function App() {

  return (
<html>

  <head>
    <link rel="stylesheet" href="https://use.typekit.net/bfk1sru.css"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/gsap.js" integrity="sha256-mfgvzVjyIcoXo0ElsT8uFIuDWYkvKCQ6wrkm6If7iug=" crossorigin="anonymous"></script>
  </head>
  <body id='App' className="App">
  <Navbar></Navbar>
  <Menu></Menu>
  <ScrollSnap></ScrollSnap>
  </body>

</html>
  );
}


export default App;
