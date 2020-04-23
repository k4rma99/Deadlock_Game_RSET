import React, { useEffect,useState,useRef, useLayoutEffect } from 'react';
import "../assets/css/Navbar.css"
import {Menu} from "./Menu.jsx"
import {gsap} from "gsap/all";
export const Navbar = (props) =>{

    var t = gsap.timeline();

    var width = useRef(null);

    let [openState,setOpenState] = useState(-1);
    
    const changeOpenState = () =>{
        if(openState == -1){
            setOpenState(1)
        }
        else{
            requestAnimationFrame(()=>{
                t
                .clear()
                .to(".main-menu",{display:"none"})
                .to(".options",{transform:"scaleX(0)",duration:0.2})
                .fromTo(".dark-overlay",{backgroundColor:"rgba(0,0,0,0.8)",pointerEvents:"all"},{backgroundColor:"rgba(0,0,0,0)",pointerEvents:"none",duration:0.2})
                .eventCallback("onComplete",()=>setOpenState(-1));
                
            })
        }
    }

    useLayoutEffect(()=>{
        if(width.current == null){
            width.current = document.getElementById('nav-div').clientWidth;
        }

    },[])
    
    useEffect(() => {
        const f = () => {
            function updateSize() {
                if(openState == 1){
                    var c = document.getElementById('nav-div').clientWidth
                    if(width.current != document.getElementById('nav-div').clientWidth){
                        width.current = document.getElementById('nav-div').clientWidth;
                        changeOpenState();
                    }
                }
               
          }
            window.addEventListener('resize', updateSize);
            if(openState==1){
                requestAnimationFrame(()=>{
                    t
                    .clear()
                    //.to(".options",{opacity:"1",duration:0.2})
                    .fromTo(".dark-overlay",{backgroundColor:"rgba(0,0,0,0)",pointerEvents:"none"},{backgroundColor:"rgba(0,0,0,0.8)",pointerEvents:"all",duration:0.2},0)
                    .to(".options",{transform:"scaleX(1)",duration:0.1},0)
                }) 
            }
        }
        f();
    }, [t])

    return (
        <div style={{position:"fixed",width:"100vw",zIndex:"1000"}} id="nav-div" >
            <div className="options">
            {openState==1?<Menu  forceStateChange={props.forceStateChange} changeOpenState={changeOpenState} SetStateChange={props.SetStateChange}></Menu>:<></>}

            </div>
            <div className="dark-overlay" onClick={()=>changeOpenState()}></div>           
            <div className="menu-div">
                        <button onClick={()=>{changeOpenState()}} className="menu-button">
                        </button>
            </div>
        </div>
        
    )
}