import React,{useEffect} from 'react';
import Button from './playGame.js';
import "../assets/css/ScrollSnap.css"
import "../assets/css/arrow.css"
export const ScrollSnap = () => {


var carouselPositions;
var halfContainer;
var currentItem;
var ContainerRef=null;
var page1Ref=null;
var page2Ref=null;
var RightScroll=null;

const getCarouselPositions = () => {
  carouselPositions = [];
  //document.querySelectorAll('.container div').forEach(function(div) {
    console.log("item1");
    carouselPositions.push([page1Ref.offsetLeft, page1Ref.offsetLeft + page1Ref.offsetWidth]);
    carouselPositions.push([page2Ref.offsetLeft, page2Ref.offsetLeft + page2Ref.offsetWidth]); // add to array the positions information
    console.log(carouselPositions);
    //})
  halfContainer = document.querySelector('.container').offsetWidth/2;
}

 // call it once

function goCarousel(direction) {
  
  var currentScrollTop = document.querySelector('.container').scrollLeft;
  var currentScrollBottom = currentScrollTop + document.querySelector('.container').offsetWidth;
  
  if (currentScrollTop === 0 && direction === 'next') {
      currentItem = 1;
  } else if (currentScrollBottom === document.querySelector('.container').scrollWidth && direction === 'previous') {
      console.log('here')
      currentItem = carouselPositions.length - 2;
  } else {
      var currentMiddlePosition = currentScrollTop + halfContainer;
      for (var i = 0; i < carouselPositions.length; i++) {
        if (currentMiddlePosition > carouselPositions[i][0] && currentMiddlePosition < carouselPositions[i][1]) {
          currentItem = i;
          if (direction === 'next') {
              currentItem++;
          } else if (direction === 'previous') {
              currentItem--    
          }
        }
      }
  } 
  ContainerRef.scrollTo({
    left: carouselPositions[currentItem][0],
    behavior: 'smooth' 
  });
  
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
       <div ref={ref=>{page1Ref=ref}}>
           <div>
           <div className="heading-container"><h1 data-heading="a" id = "heading">deadlock</h1> </div>
           <div >
                <div ></div>
                <Button></Button>
           </div>
           </div>
           
           <div >
             <i className="right arrow-white"></i>
           </div>
           <div onClick={()=>{goCarousel('next')}}  className="scroll-div"></div>
       </div>
       <div  ref={ref=>{page2Ref=ref}} className="blue">
       <div></div>
       <div >
       <i className="left arrow-white"></i>
       </div>
       <div onClick={()=>{goCarousel('previous')}}  className="scroll-div"></div>
       
       </div>
            
      </div>
  );
}
