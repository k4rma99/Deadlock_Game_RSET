import React, { Component,useEffect,useState } from 'react';
import "../assets/css/Menu.css"
import {SubBar} from "../components/SubBar.jsx";
import {gsap} from "gsap";

export const Menu = () =>{
    var headerText = null;

    var t1 = gsap.timeline();

    //used for generating random alphanumeric characters
    var num = 1;

    //tells us if any one of the subsections are open
    var isOpen = 0;


    var [toggle,setToggle] = useState({
        isToggled:false,
        value:""
    });
    
    const setNum = () =>{
        num = num *-1;
    }

    const openPage = (s) =>{
        if(isOpen == 0 && num!=-1){
        setNum()
        t1
        .clear()
        .add(RandomLetters(s),0)
        .fromTo('.heading-options',{marginTop:"30vh"},{marginTop:"10vh",duration:0.8})
        .fromTo('.black-header h4',{opacity:1},{opacity:0,duration:0.8},0)
        .to('.black-header h4',{display:"none",duration:0},0.8)
        .eventCallback("onComplete", ()=>{setTextHeading(s);t1.clear();isOpen = 1;})
        }
    }

    const setTextHeading = (s) =>{
        num = num *-1;
        if(headerText){
            headerText.innerHTML = s
        }
    }

    const Minimize = () => 
    {
        if(isOpen==1 && num!=-1){
        setNum()
        t1
        .add(RandomLetters("DEADLOCK"),0)
        .fromTo('.heading-options',{marginTop:"10vh"},{marginTop:"30vh",duration:0.8})
        .to('.black-header h4',{display:"block",duration:0},0)
        .fromTo('.black-header h4',{opacity:0},{opacity:1,duration:0.8})
        .eventCallback("onComplete", ()=>{setTextHeading("DEADLOCK");isOpen = 0;setToggle({isToggled:false,value:"DEADLOCK"})});
        }

    }

    const RandomLetters = (s) =>{
        if(headerText){
            headerText.innerHTML = Math.random().toString(36).substr(2, s.length)
        if(num==-1){
            console.log("bleep")
            setTimeout(()=>{
                RandomLetters(s);

            },100)
        }
        else{
            headerText.innerHTML = s
        }

        }
    }

    useEffect(()=>{
        const f = () =>{

            console.log(toggle.isToggled)
            if(isOpen == 0 && num!=-1 && toggle.isToggled==true){
                setNum()
                t1
                .clear()
                .add(RandomLetters(toggle.value),0)
                .fromTo('.heading-options',{marginTop:"30vh"},{marginTop:"10vh",duration:0.8})
                .fromTo('.black-header h4',{opacity:1},{opacity:0,duration:0.8},0)
                .to('.black-header h4',{display:"none",duration:0},0.8)
                .eventCallback("onComplete", ()=>{setTextHeading(toggle.value);t1.clear();isOpen = 1;})
            }

        }
        f();
    })
    
    return(
        <div className="options">
        
        <div className="black-header">
            <h1 ref={ref=>headerText = ref} style={{color:"black"}} onClick={()=>Minimize()} className = "heading-options">DEADLOCK</h1>
            <h4 id="options" className="htp" style={{marginTop:"1vh"}} onClick={()=>setToggle({isToggled:true,value:"How to play"})}>How to play</h4>
            <h4 id="options" onClick={()=>setToggle({isToggled:true,value:"Game rules"})}>Game rules</h4>
            <h4 id="options" onClick={()=>setToggle({isToggled:true,value:"Contact"})}>Contact</h4>
            <h4 id="options" onClick={()=>setToggle({isToggled:true,value:"Clues"})}>Clues</h4>
        </div>
            {toggle.isToggled?(
                <div className="content-area">
                    
                </div>
            ):<></>
                }
        </div>
    )
}