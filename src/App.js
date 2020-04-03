import React from 'react';
import BackgroundImagePage from "./components/bgImage"
import "./assets/css/heading-flicker.css"
import {ScrollButton} from './components/scrollButton.jsx'
import "./assets/css/ScrollSnap.css"
import "./assets/css/arrow.css"
import Button from "./components/playGame.jsx"
import {AnimatedBackground} from "./components/animatedBackground.jsx" 
import "./assets/css/animated-background.css"
import {Navbar} from "./components/Navbar.jsx"
import "./App.css"
import { ScrollSnap } from './components/ScrollSnap.jsx';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <AnimatedBackground></AnimatedBackground>
      <ScrollSnap></ScrollSnap>
      </div>
  );
}


export default App;
