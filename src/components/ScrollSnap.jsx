import React from 'react';
import {PlayGameButton} from './playGame.jsx';
import {TvStatic} from "./tvStatic.jsx";
import "../assets/css/ScrollSnap.css"
import "../assets/css/heading-flicker.css"
export const ScrollSnap = (props) => {

  return (    
      <div className="container">
        <TvStatic></TvStatic>
      <div className="page1">
        <PlayGameButton forceStateChange={props.forceStateChange} SetStateChange={props.SetStateChange}></PlayGameButton>
      </div>
      <div className="page2" style={{background:"#181818"}}>
            <h1 className="follow-header">Follow us</h1>
            <div className="icon-container">
              <a className="icon" href="https://www.instagram.com" style={{background:"url(https://img.icons8.com/offices/1080/000000/instagram-new.png",backgroundSize:"cover"}}/>
              <a className="icon" href="https://www.facebook.com" style={{background:"url(https://img.icons8.com/color/1080/000000/facebook.png)",backgroundSize:"cover"}}/>
            </div>

            <div style={{width:"100%",display:"grid",position:"absolute",bottom:"100vh"}}>
                <i className="down arrow-white" style={{margin:"10vh auto"}}></i>
            </div>
      </div>
  </div>
  );
}
