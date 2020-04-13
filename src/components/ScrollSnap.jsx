import React,{useEffect} from 'react';
import Button from './playGame.js';
import "../assets/css/ScrollSnap.css"
import "../assets/css/heading-flicker.css"
import Div100vh from 'react-div-100vh';
import "../assets/css/arrow.css"
import {ScrollButton} from '../components/scrollButton.jsx'
import {About} from "../components/About.jsx";
import {AnimatedBackground} from "../components/animatedBackground.jsx"
import {gsap} from "gsap/all";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import {BlackHole} from "../components/blackhole.jsx"
export const ScrollSnap = (props) => {

  return (    
      <div id="carousel" className="container snap">
      <div className="page1">
        <Button></Button>
      </div>
  </div>
  );
}
