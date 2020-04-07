import React from "react"
import { AlertHeading } from "react-bootstrap/Alert"
import "../assets/css/playGameButton.css"
import Svg from "./playGameSVG"
class playGameButton extends React.Component{
    render(){
        return(
            <div class="wrapper">
            <a class="cta" href="#">
                <span>PLAY</span>
                <Svg />
            </a>
            </div>
        )
    }
}

export default playGameButton
