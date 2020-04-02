import React from 'react';
import {Navbar, Container} from "react-bootstrap"
import BackgroundImagePage from "./components/bgImage"
import "./assets/css/heading-flicker.css"
import Button from "./components/playGame"

function App() {
  return (
    <div className="App">
      <BackgroundImagePage />
      <section className = "head-wrapper" style = {{height : 0}}>
        <h1 data-heading="a" id = "heading">deadlock</h1> 
        <Button />
      </section>
    </div>
  );
}


export default App;
