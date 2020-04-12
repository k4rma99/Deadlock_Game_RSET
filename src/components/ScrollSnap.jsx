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


var carouselPositions;
var halfWidth;
var halfHeight;
var currentItem = 0;
var ContainerRef=null;
var page1Ref=null;
var page2Ref=null;
var RightScroll=null;
var t = gsap.timeline();
var vh;
gsap.registerPlugin(ScrollToPlugin);

const getCarouselPositions = () => {
  carouselPositions = [];
    carouselPositions.push([page1Ref.offsetLeft, page1Ref.offsetLeft + page1Ref.offsetWidth,page1Ref.offsetTop, page1Ref.offsetTop + page1Ref.offsetHeight]);
    carouselPositions.push([page2Ref.offsetLeft, page2Ref.offsetLeft + page2Ref.offsetWidth,page2Ref.offsetTop, page2Ref.offsetTop + page2Ref.offsetHeight]); // add to array the positions information
  halfWidth = document.querySelector('.container').offsetWidth/2;
  halfHeight = document.querySelector('.container').offsetHeight/2;
}

 // call it once

function goCarousel(direction) {
  
  //t.to(".container",{duration:0.7,scrollTo: ".page2", ease: "power2"})

  
  
  var currentScollTopHorizontal = document.querySelector('.container').scrollLeft;
  var currentScrollTopVertical = document.querySelector('.container').scrollTop;
  if (direction === 'next' || direction== 'next-vert') {
      currentItem = 1;
  } else if (direction=='previous'){
      var currentMiddlePosition = currentScollTopHorizontal + halfWidth;
      for (var i = 0; i < carouselPositions.length; i++) {
        if (currentMiddlePosition > carouselPositions[i][0] && currentMiddlePosition < carouselPositions[i][1]) {
          currentItem = i;
          if (direction === 'next') {
              currentItem=1;
          } else if (direction === 'previous') {
              currentItem=0;
          }
        }
      }
  }
  else if (direction=='previous-vert'){
    var currentMiddlePosition = currentScrollTopVertical + halfHeight;
    for (var i = 0; i < carouselPositions.length; i++) {
      if (currentMiddlePosition > carouselPositions[i][2] && currentMiddlePosition < carouselPositions[i][3]) {
        currentItem = i;
        if (direction === 'next-vert') {
            currentItem=1;
        } else if (direction === 'previous-vert') {
            currentItem=0   
        }
      }
    }
  }
  if(direction=='next-vert' ||direction=='previous-vert'){
    scrollTo('up')
  } 
  else{
    scrollTo('left')
  }
}

 const scrollTo = (method) =>{  
   if(method == 'up'){
     if(currentItem == 0){
      t.to(".container",{duration:0.7,scrollTo: {y:0, ease: "power2"}})  
     }
     else{
      t.to(".container",{duration:0.7,scrollTo: {y:"max", ease: "power2"}})  
     }
   }
   else{
    ToggleSnap();
    setTimeout(()=>{
      ToggleSnap();
    },700)
    if(currentItem == 0){
      t.to(".container",{duration:0.7,scrollTo: {x:0, ease: "power2"}})  
     }
     else{
      t.to(".container",{duration:0.7,scrollTo: {x: "max", ease: "power2"}})  
     }
   }
  }

  const ToggleSnap = () =>{
      document.getElementById('carousel').classList.toggle('snap');
  }

  const resizeScreen = () =>{
    page2Ref.style.width = window.width;
    page2Ref.style.height = window.height;
  }

  const setNavScroll = () =>{
    document.getElementById("nav-color").scrollTop = ContainerRef.scrollTop;
    document.getElementById("nav-color").scrollLeft = ContainerRef.scrollLeft;
  }
  
  const setNavColor = () =>{
    setNavScroll()
    document.getElementById('nav-color').style.gridTemplateRows = `${page1Ref.clientHeight}px ${page2Ref.clientHeight}px 100vh` ;
  }

useEffect(
    
    ()=>{
        function f(){
          getCarouselPositions();
          resizeScreen();
          window.addEventListener("resize",setNavColor);
          setNavColor();
        }
        f();
    }
)

  return (    
      <div onScroll={()=>{setNavScroll()}} ref={ref=>ContainerRef=ref} id="carousel" className="container snap">
    <div ref={ref=>page1Ref=ref} className="page1">
        <Button></Button>
        <ScrollButton goCarousel={goCarousel} getCarouselPositions={getCarouselPositions} page={0}></ScrollButton>
    </div>
    <div ref={ref=>page2Ref=ref} className="page2">
      <About/>
    <ScrollButton goCarousel={goCarousel} getCarouselPositions={getCarouselPositions} page={1}></ScrollButton>
    </div> 
    <div id="nav-color" className="navigation-color">
              <div style={{position:"relative",background:"black",width:"100%",height:"100%"}}>

              </div>
              <div style={{position:"relative",background:"white",width:"100%",height:"100%"}}>

          </div>
        </div>  
  </div>
  );
}
