import React,{useEffect} from 'react';
import "./assets/css/heading-flicker.css"
import "./assets/css/ScrollSnap.css"
import "./assets/css/arrow.css"
import "./assets/css/animated-background.css"

import {Navbar} from "./components/Navbar.jsx"
import "./App.css"
import { ScrollSnap } from './components/ScrollSnap.jsx';
import Div100vh from 'react-div-100vh';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {


  useEffect(() => {
    const f = () => {
      window.onresize = function() {
        document.body.height = window.innerHeight;
    }
      window.onresize();
    }
    f();
  }, [])

  return (
<html>

  <head>
    <link rel="stylesheet" href="https://use.typekit.net/bfk1sru.css"/>
  </head>
  <Router>
    <div  id='App' className="App">
        <Navbar></Navbar>
        <Switch>
          <Route path="/">
              <ScrollSnap></ScrollSnap>
          </Route>
          <Route path="/info">
          </Route>
        </Switch>
    </div>

  </Router>
</html>
  );
}


export default App;
