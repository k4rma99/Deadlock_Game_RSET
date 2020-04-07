import React,{useEffect} from 'react';
import Button from './playGame.js';
import "../assets/css/ScrollSnap.css"
import "../assets/css/arrow.css"
export const ScrollSnap = () => {


var carouselPositions;
var halfWidth;
var halfHeight;
var currentItem;
var ContainerRef=null;
var page1Ref=null;
var page2Ref=null;
var RightScroll=null;

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
    ContainerRef.scrollTo({
      top: carouselPositions[currentItem][2],
      behavior: 'smooth' 
    });
  } 
  else{
    ContainerRef.scrollTo({
      left: carouselPositions[currentItem][0],
      behavior: 'smooth' 
    });
  }
}

useEffect(
    
    ()=>{
        function f(){

            getCarouselPositions();
            window.addEventListener('resize', getCarouselPositions);
        }
        f();
    }
)

  return (
     <div ref={ref=>{ContainerRef=ref}} className="container">
       <div style={{width:"100%"}} ref={ref=>{page1Ref=ref}}>
           <div>
                <span style={{width:"100%"}}  className="span-header heading-container">
                  <h1 style={{display:"inline-block",width:"12.5"}} id="light-flicker" className = "heading">deadlock</h1>
                </span>
                <div style={{width:"100%",display:"block",position:"absolute",top:"60%"}}>
                  <Button></Button>
            </div>
            
          </div>
          {window.screen.width<1024?        
          <div onClick={()=>{goCarousel('next-vert')}} style={{position:"absolute",bottom:"0%",width:"100%",height:"4%"}}>
              <i style={{position:"absolute"}}class="arrow-white down"/>
          </div>
              :
          <div onClick={()=>{goCarousel('next')}} style={{position:"absolute",right:"0%",width:"3%",height:"100%"}}>
            <i class="arrow-white right"/>
          </div>
          }
       </div>
       <div style={{backgroundColor:"white",position:"relative"}} ref={ref=>{page2Ref=ref}} className="blue">
       <div>
       {window.screen.width<1024?        
          <div onClick={()=>{goCarousel('previous-vert')}} style={{position:"absolute",bottom:"0%",width:"100%",height:"4%"}}>
              <i style={{position:"absolute"}}class=" up"/>
          </div>
              :
          <div onClick={()=>{goCarousel('previous')}} style={{position:"absolute",right:"0%",width:"3%",height:"100%"}}>
            <i class="left"/>
          </div>
       }
       </div>
       <div>
         <h1>ABOUT</h1>
       </div>
       </div>
            
      </div>
  );
}
