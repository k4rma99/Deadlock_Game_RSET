import React from 'react';
import {Navbar} from "react-bootstrap"
// import Background from "../src/images/backgroundImage"
import BackgroundImagePage from "./components/bgImage"
import "./assets/css/heading-flicker.css"
import Button from "./components/playGame"

function App() {
  return (
    <div className="App">
      <BackgroundImagePage />
      <h1 data-heading="a" id = "heading">deadlock</h1> 
      <Button />
    </div>
  );
}

class Nav extends React.Component{
  
    constructor(){
      super()
      this.state = {
        style : {
          backgroundColor : "#180c4d"
        }
      }
    }

  render(){
    return(
      <div id = "navbar-wrapper" style = {this.state.style}>
        <Navbar bg = "light">
        <Navbar.Brand href="#home">
        <img
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
        </Navbar.Brand>
        </Navbar>
      </div>
    )
  }

}

export default App;
