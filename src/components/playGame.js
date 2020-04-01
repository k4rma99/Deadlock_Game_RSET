import React from "react"
import { AlertHeading } from "react-bootstrap/Alert"


class playGameButton extends React.Component{
    render(){

        let style = {
            fontSize: "3vw",
            textAlign: "center",
            lineHeight: 1,
            top: "22vw",
            left: "39vw",
            position: "absolute",
            color: "#2d2d2d",
            letterSpacing: "-.1rem"
        }
        

        return(
            <div style = {style}>
                <a href="http://google.com" class="btn-liquid">
                    <span class="inner">Liquid button ?</span>
                </a>
            </div>
        )
    }
}

export default playGameButton
