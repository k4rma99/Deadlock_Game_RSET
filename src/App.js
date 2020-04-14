import React from 'react';
// import BackgroundImagePage from "./components/bgImage.jsx"
import "./assets/css/heading-flicker.css"
// import Button from "./components/playGame.jsx"
import {Navbar} from "./components/Navbar.jsx"
import "./App.css";
// import {Chicken} from "./components/loginConfirmed.jsx"
import Stuff from "./components/gamePlay/gameScreen.jsx"

function App() {
  return (
    <div className="App">
      {/* <Navbar></Navbar>
      <AnimatedBackground></AnimatedBackground>
      <ScrollSnap></ScrollSnap> */}
      <Stuff />
      </div>
  );
}


export default App;
