import React from "react"
import "../assets/css/playGameButton.css"
import Svg from "./playGameSVG"
export const playGameButton = () =>{
    
        return(<div className="main-grid">
        <div className="main-header">
        <h1 id="light-flicker" className = "heading">DEADLOCK</h1>
        <h1 className="span-header">Lorem ipsum dolor</h1>
        </div>
        <div className="wrapper">
                <a className="cta" href="#">
                <span>PLAY</span>
                <Svg />
            </a></div>
        </div>
            
        )
}

export default playGameButton
