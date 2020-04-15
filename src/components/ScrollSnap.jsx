import React from 'react';
import {PlayGameButton} from './playGame.jsx';
import "../assets/css/ScrollSnap.css"
import "../assets/css/heading-flicker.css"
export const ScrollSnap = (props) => {

  return (    
      <div className="container">
      <div className="page1">
        <PlayGameButton forceStateChange={props.forceStateChange} SetStateChange={props.SetStateChange}></PlayGameButton>
      </div>
  </div>
  );
}
