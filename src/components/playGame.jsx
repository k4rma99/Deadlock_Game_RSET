import React from "react"
import { AlertHeading } from "react-bootstrap/Alert"
import "../assets/css/playGameButton.css"
import Svg from "./playGameSVG.jsx"
class playGameButton extends React.Component{
    render(){
        return(<div className="main-grid">
        <div className="main-header">
        <h1 id="light-flicker" className = "heading">deadlock</h1>
        </div>
        <div className="wrapper">
                <a class="cta" href="#">
                <span>PLAY</span>
                <Svg />
            </a>
      
      </div>
            
            </div>
            
        )
    }
}

export default playGameButton
