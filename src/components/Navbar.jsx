import React, { Component,useEffect,useState } from 'react';
import "../assets/css/Navbar.css"
import "../assets/css/heading-flicker.css"
import {Menu} from  "../components/Menu.jsx";
import {gsap} from "gsap/all";
export const Navbar = () =>{

    var headerText = null;

    var t = gsap.timeline();
    var t1 = gsap.timeline();

    let [openState,setOpenState] = useState(-1);
    var num = 1;

    const setNum = () =>{
        num = num *-1;
        console.log("ss")
    }

    const openMenu = () =>{
        
        openState=openState*-1;
        if(openState==1){
            t.reversed()?t.restart():t
            .fromTo(".options",{zIndex:"-1"},{zIndex:"21",duration:0})
            .fromTo(".options",{height:0},{duration:0.3,height:"100%"})
        }
        else{
            t.reverse();
        }
    }

    const openPage = (s) =>{
        setNum()
        t1
        .add(RandomLetters(s))
        .fromTo('.heading-options',{marginTop:"30vh"},{marginTop:"8vh",duration:0.5})
        .fromTo('.black-header span',{opacity:1},{opacity:0,duration:0.5},0)
        .to('.black-header span',{display:"none",duration:0},0.5)
        .eventCallback("onComplete", ()=>setTextHeading(s));

    }

    const setTextHeading = (s) =>{
        num = num *-1;
        headerText.innerHTML = s
    }

    const Minimize = () => {
        t1.reverse();
    }

    const RandomLetters = (s) =>{
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

    const changeNav = () =>{

    }

    const changeOpenState = () =>{
        if(openState == -1){
            setOpenState(1)
        }
        else{
            t.reverse()
            .eventCallback("onReverseComplete",()=>setOpenState(-1));
        }
    }
    
    useEffect(() => {
        const f = () => {
            window.addEventListener("scroll",changeNav);
            console.log(openState);
            if(openState==1){
                t.reversed()?t.restart():t
                .fromTo(".options",{zIndex:"-1"},{zIndex:"21",duration:0})
                .fromTo(".options",{height:0},{duration:0.3,height:"100%"})
            }
        }
        f();
    }, [t])

    return (
        <div >
            <nav>
            <img  src="" alt="Logo"></img>
            </nav>
            <svg className="menu-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128px" height="128px"><path fill="#fff" d="M64 14A50 50 0 1 0 64 114A50 50 0 1 0 64 14Z"/><path fill="#444b54" d="M64,117c-29.2,0-53-23.8-53-53s23.8-53,53-53s53,23.8,53,53S93.2,117,64,117z M64,17c-25.9,0-47,21.1-47,47s21.1,47,47,47s47-21.1,47-47S89.9,17,64,17z"/><path fill="#444b54" d="M86.5 52h-45c-1.7 0-3-1.3-3-3s1.3-3 3-3h45c1.7 0 3 1.3 3 3S88.2 52 86.5 52zM86.5 67h-45c-1.7 0-3-1.3-3-3s1.3-3 3-3h45c1.7 0 3 1.3 3 3S88.2 67 86.5 67z"/><g><path fill="#444b54" d="M86.5,82h-45c-1.7,0-3-1.3-3-3s1.3-3,3-3h45c1.7,0,3,1.3,3,3S88.2,82,86.5,82z"/></g></svg>
            <div className="menu-div">
                        <button onClick={()=>{changeOpenState()}} className="menu-button"></button>
            </div>
            {
                openState==1?(<Menu></Menu>):""
            }
        </div>
        
    )
}