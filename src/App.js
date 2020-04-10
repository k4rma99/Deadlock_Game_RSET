import React,{useEffect} from 'react';
import BackgroundImagePage from "./components/bgImage"
import "./assets/css/heading-flicker.css"
import {ScrollButton} from './components/scrollButton.jsx'
import "./assets/css/ScrollSnap.css"
import "./assets/css/arrow.css"
import Button from "./components/playGame"
import {AnimatedBackground} from "./components/animatedBackground.jsx" 
import "./assets/css/animated-background.css"
import {Navbar} from "./components/Navbar.jsx"
import "./App.css"
import { ScrollSnap } from './components/ScrollSnap.jsx';
import {SubBar} from "./components/SubBar.jsx";
import Div100vh from 'react-div-100vh';

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

    
    <div  id='App' className="App">
      <Navbar></Navbar>
      <Div100vh>
      <ScrollSnap></ScrollSnap>
      </Div100vh>
      </div>
  );
}


export default App;
