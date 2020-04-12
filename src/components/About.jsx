import React,{useEffect,useState} from "react";
import {gsap,Power3} from "gsap/all";
import "../assets/css/About.css";

export const About = () =>{

    let state = -1;
    let t = gsap.timeline();
    var contentRef = null;
    var buttonRef = null;
    useEffect(()=>{
        const f = () =>{
        }
        f();
    },[])

   const contentShift = () =>{
       var imgWidth;
       if(window.screen.width<1024){
            imgWidth = "100%"
       }
       else{
            imgWidth = "55%"
       }
    state = state * -1;
    if(state == 1){
        t.reversed()?t.restart():t.pause()
    }
    else{
        contentRef.classList.toggle('overflow-hide');
        t.reverse();
    }
    }   

    return(
        <div className="about-main">
            <div className="about-container">
                    <img id="img" src="https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"></img>
                    <div ref={ref=>{contentRef = ref}} className="about-content overflow-hide">
                            <div>
                                <div>
                                    <span>LOREM IPSUM</span>
                                </div>
                                <div>
                                <button ref={(ref)=>buttonRef = ref} onClick={()=>contentShift()}>CLICK</button>
                                </div>
                                <p>
                                How can I approach my company for advertising a role the same as mine for a much higher salary?
What actually is RP-1, and how is it different from any other hydrocarbon liquid fuel?
Avoiding "Zoom bombing" in virtual conferences and seminars
Is it possible to create a relativistic space probe going at least 0.1c with present day technology?
What is the most ‘understandable’ way to order sparkling water in German?
My inflatable hot tub says "don't use with an extension cord"... but can I?
Use grep to extract some text from file based on regex
Seeking in-depth coverage of this French defense sideline
Manilius nesciebat quid scribebat
                                </p>
                            </div>
                    </div>
            </div>
        </div>
    )
};