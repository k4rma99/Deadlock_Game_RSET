import React, { useEffect,useState } from 'react';
import "../assets/css/Navbar.css"
import {Menu} from "./Menu.jsx"
import {gsap} from "gsap/all";
export const Navbar = (props) =>{

    var t = gsap.timeline();

    let [openState,setOpenState] = useState(-1);
    
    const changeOpenState = () =>{
        if(openState == -1){
            setOpenState(1)
        }
        else{
            requestAnimationFrame(()=>{
                t
                .fromTo(".option-textarea",{opacity:1,pointerEvents:"auto"},{pointerEvents:"none",opacity:"0",duration:0.2})
                .to([".container",".game-main"],{display:"block",duration:0})
                .to(".options",{transform:"scaleY(0)",duration:0.1})
                .eventCallback("onComplete",()=>setOpenState(-1));
                
            })
        }
    }
    
    useEffect(() => {
        const f = () => {
            function updateSize() {
                if(openState == 1){
                    changeOpenState();
                }
               
          }
            window.addEventListener('resize', updateSize);
            if(openState==1){
                console.log("openState is 1")
                requestAnimationFrame(()=>{
                    t
                    //.to(".options",{opacity:"1",duration:0.2})
                    .to(".options",{transform:"scaleY(1)",duration:0.1})
                    .to([".container",".game-main"],{display:"none",duration:0})
                    .fromTo(".option-textarea",{opacity:0,pointerEvents:"none"},{pointerEvents:"auto",opacity:"1",duration:0.2})  
                }) 
            }
        }
        f();
    }, [t])

    return (
        <div style={{overflowY:"auto"}}>
            <div className="options"/>           
            <svg className="menu-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128px" height="128px"><path fill="#fff" d="M64 14A50 50 0 1 0 64 114A50 50 0 1 0 64 14Z"/><path fill="#444b54" d="M64,117c-29.2,0-53-23.8-53-53s23.8-53,53-53s53,23.8,53,53S93.2,117,64,117z M64,17c-25.9,0-47,21.1-47,47s21.1,47,47,47s47-21.1,47-47S89.9,17,64,17z"/><path fill="#444b54" d="M86.5 52h-45c-1.7 0-3-1.3-3-3s1.3-3 3-3h45c1.7 0 3 1.3 3 3S88.2 52 86.5 52zM86.5 67h-45c-1.7 0-3-1.3-3-3s1.3-3 3-3h45c1.7 0 3 1.3 3 3S88.2 67 86.5 67z"/><g><path fill="#444b54" d="M86.5,82h-45c-1.7,0-3-1.3-3-3s1.3-3,3-3h45c1.7,0,3,1.3,3,3S88.2,82,86.5,82z"/></g></svg>
            <div className="menu-div">
                        <button onClick={()=>{changeOpenState()}} className="menu-button"></button>
            </div>
            {openState==1?<Menu  forceStateChange={props.forceStateChange} changeOpenState={changeOpenState} SetStateChange={props.SetStateChange}></Menu>:<></>}
        </div>
        
    )
}