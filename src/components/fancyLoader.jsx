import React, { useEffect } from 'react';
import {TimelineMax,CSSRulePlugin,Power2} from "gsap/all";
import "../assets/css/fancy-loader.css";

export const FancyLoader = () =>{

function transition() {
  var tl = new TimelineMax();
  
  tl.to(CSSRulePlugin.getRule('.loader-main:before'), 0.2, {cssRule: {top: '50%' }, ease: Power2.easeOut}, 'close')
  .to(CSSRulePlugin.getRule('.loader-main:after'), 0.2, {cssRule: {bottom: '50%' }, ease: Power2.easeOut}, 'close')
  .to('.loader', 0.2, {opacity: 1})
  
}

useEffect(()=>{
    requestAnimationFrame(()=>{
        transition();
    })
},[])

    return(
        <div className="loader-main">
        <div className="loader">
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                        <div className="bar4"></div>
                        <div className="bar5"></div>
                        <div className="bar6"></div></div>
        </div>
    )
}