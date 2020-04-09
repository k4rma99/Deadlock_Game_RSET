import React, { Component,useEffect,useState } from 'react';
import "../assets/css/Navbar.css"
import {SubBar} from "../components/SubBar.jsx";
import {gsap} from "gsap/all";
export const Navbar = () =>{

    var t = gsap.timeline();

    let openState = -1;

    const openMenu = () =>{
        openState=openState*-1;
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var width = w<1024?"100%":"40%" 
        if(openState==1){
            t
            .to(".nav-container",{duration:0.3,width:width});
        }
        else{
            t
            .to(".nav-container",{duration:0.3,width:"0%"})
        }
    }

    useEffect(() => {
        const f = () => {
        }
        f();
    }, [t])

    return (
        <nav>
            <img  src="" alt="Logo"></img>
            <svg className="menu-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128px" height="128px"><path fill="#fff" d="M64 14A50 50 0 1 0 64 114A50 50 0 1 0 64 14Z"/><path fill="#444b54" d="M64,117c-29.2,0-53-23.8-53-53s23.8-53,53-53s53,23.8,53,53S93.2,117,64,117z M64,17c-25.9,0-47,21.1-47,47s21.1,47,47,47s47-21.1,47-47S89.9,17,64,17z"/><path fill="#444b54" d="M86.5 52h-45c-1.7 0-3-1.3-3-3s1.3-3 3-3h45c1.7 0 3 1.3 3 3S88.2 52 86.5 52zM86.5 67h-45c-1.7 0-3-1.3-3-3s1.3-3 3-3h45c1.7 0 3 1.3 3 3S88.2 67 86.5 67z"/><g><path fill="#444b54" d="M86.5,82h-45c-1.7,0-3-1.3-3-3s1.3-3,3-3h45c1.7,0,3,1.3,3,3S88.2,82,86.5,82z"/></g></svg>
                    <div className="menu-div">
                        <button onClick={()=>{openMenu(openState * -1)}} className="menu-button"></button>
                    </div>
                    <SubBar/>
        </nav>
    )
}