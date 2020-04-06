import React from 'react';
import {Navbar, Container} from "react-bootstrap"
import BackgroundImagePage from "./components/bgImage"
import "./assets/css/heading-flicker.css"
import Button from "./components/playGame"
import {AnimatedBackground} from "./components/animatedBackground.jsx" 
import {ScrollSnap} from "./components/ScrollSnap.jsx"
import "./App.css"

function App() {
  return (
    <div className="App">
      <AnimatedBackground>
      </AnimatedBackground>
     </div>
  );
}


export default App;
