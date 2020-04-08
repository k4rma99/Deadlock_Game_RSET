import React,{useEffect} from 'react';
import Button from './playGame.js';
import "../assets/css/ScrollSnap.css"
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
    document.getElementById('carousel').classList.toggle('snap');
    setTimeout(()=>{
      document.getElementById('carousel').classList.toggle('snap');
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
          //window.addEventListener("keydown",scrollTo);
        }
        f();
    }
)

  return (
     <div  ref={ref=>{ContainerRef=ref}} id="carousel" className="container snap">
       <div style={{position:"relative"}}  ref={ref=>{page1Ref=ref}}>
           <div>
                <span style={{width:"100%"}}  className="span-header heading-container">
                  <h1 style={{display:"inline-block",width:"12.5"}} id="light-flicker" className = "heading">deadlock</h1>
                </span>
                <div style={{width:"100%",display:"block",position:"absolute",top:"60%"}}>
                  <Button></Button>
            </div>
            
          </div>
          <ScrollButton  refreshAnims={props.refreshAnims} getCarouselPositions={getCarouselPositions} goCarousel={goCarousel} page={0}></ScrollButton>
       </div>
       <div style={{backgroundColor:"white",position:"relative",width:"100%"}} ref={ref=>{page2Ref=ref}} className="blue">
       <div>
       <ScrollButton refreshAnims={props.refreshAnims} getCarouselPositions={getCarouselPositions} goCarousel={goCarousel} page={1}></ScrollButton>
       </div>
       <div>
         <h1>ABOUT</h1>
       </div>
       </div>
    </div>
  );
}
