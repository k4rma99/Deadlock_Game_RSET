import React from 'react';
import BackgroundImagePage from "./components/bgImage"
import "./assets/css/heading-flicker.css"
import Button from "./components/playGame"
import {AnimatedBackground} from "./components/animatedBackground.jsx" 
import "./assets/css/animated-background.css"
import {Navbar} from "./components/Navbar.jsx"
import "./App.css"
import { ScrollSnap } from './components/ScrollSnap.jsx';

function App() {
  return (
    <div className="App">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/plugins/ScrollToPlugin.min.js"></script>
      <Navbar></Navbar>
      <AnimatedBackground></AnimatedBackground>
      <ScrollSnap></ScrollSnap>
     </div>
  );
}


export default App;
