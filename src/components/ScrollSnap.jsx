import React,{useEffect} from 'react';
import Button from './playGame.js';
import "../assets/css/ScrollSnap.css"
import "../assets/css/heading-flicker.css"
import "../assets/css/arrow.css"
import {ScrollButton} from '../components/scrollButton.jsx'
import {gsap} from "gsap/all";
import ScrollToPlugin from "gsap/ScrollToPlugin";
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
gsap.registerPlugin(ScrollToPlugin);

const getCarouselPositions = () => {
  carouselPositions = [];
    console.log("item1");
    carouselPositions.push([page1Ref.offsetLeft, page1Ref.offsetLeft + page1Ref.offsetWidth,page1Ref.offsetTop, page1Ref.offsetTop + page1Ref.offsetHeight]);
    carouselPositions.push([page2Ref.offsetLeft, page2Ref.offsetLeft + page2Ref.offsetWidth,page2Ref.offsetTop, page2Ref.offsetTop + page2Ref.offsetHeight]); // add to array the positions information
    console.log(carouselPositions);
  halfWidth = document.querySelector('.container').offsetWidth/2;
  halfHeight = document.querySelector('.container').offsetHeight/2;
}

 // call it once

function goCarousel(direction) {
  
  var currentScollTopHorizontal = document.querySelector('.container').scrollLeft;
  var currentScrollBottom = currentScollTopHorizontal + document.querySelector('.container').offsetWidth;
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
    t.to(".container",{duration:0.7,scrollTo: {y:carouselPositions[currentItem][2]}, ease: "power2"})  
   }
   else{
    ToggleSnap();
    setTimeout(()=>{
      ToggleSnap();
    },700)
    t.to(".container",{duration:0.7,scrollTo: {x: carouselPositions[currentItem][0]}, ease: "power2"})
   }
  }

  const ToggleSnap = () =>{
      document.getElementById('carousel').classList.toggle('snap');
  }
useEffect(
    
    ()=>{
        function f(){
          getCarouselPositions();
        }
        f();
    }
)

  return (
    <div id="carousel" className="container snap">
    <div ref={ref=>page1Ref=ref} className="page1">
        <Button></Button>
        <ScrollButton goCarousel={goCarousel} getCarouselPositions={getCarouselPositions} page={0}></ScrollButton>
    </div>
    <div ref={ref=>page2Ref=ref} className="page2">
    <ScrollButton goCarousel={goCarousel} getCarouselPositions={getCarouselPositions} page={1}></ScrollButton>
    </div> 
  </div>
  );
}
