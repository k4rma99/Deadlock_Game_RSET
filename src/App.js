import React from 'react';
import BackgroundImagePage from "./components/bgImage"
import "./assets/css/heading-flicker.css"
import Button from "./components/playGame.jsx"
import {AnimatedBackground} from "./components/animatedBackground.jsx" 
import "./assets/css/animated-background.css"
import {Navbar} from "./components/Navbar.jsx"
import "./App.css"
import { ScrollSnap } from './components/ScrollSnap';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <AnimatedBackground></AnimatedBackground>
     </div>
  );
}


export default App;
