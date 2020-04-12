import React, { Component,useEffect,useState } from 'react';
import "../assets/css/Menu.css"
import {SubBar} from "../components/SubBar.jsx";
import {gsap} from "gsap";

export const Menu = () =>{
    var headerText = null;
    var contentArea = null;

    var t1 = gsap.timeline();

    //used for generating random alphanumeric characters. If num == -1 then the recursive functions starts
    //the recursive function generates the random number effect 
    //when we set it back to 1 then it stops
    var num = 1;

    //tells us if any one of the subsections are open
    var isOpen = 0;


    var [toggle,setToggle] = useState({
        isToggled:false,
        value:"",
        section:0
    });
    
    const setNum = () =>{
        num = num *-1;
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
        .fromTo('.content-area',{opacity:1,top:` 10vh - ${headerText.clientHeight} + 10vh `},{opacity:0,top:` 10vh - ${headerText.clientHeight} + 10vh `,duration:0.3})
        .add(RandomLetters("DEADLOCK"),0)
        .fromTo('.heading-options',{marginTop:"10vh"},{marginTop:"30vh",duration:0.8})
        .to('.black-header h4',{display:"block",duration:0},0)
        .fromTo('.black-header h4',{opacity:0},{opacity:1,duration:0.8})
        .eventCallback("onComplete", ()=>{setTextHeading("DEADLOCK");isOpen = 0;setToggle({isToggled:false,value:"DEADLOCK",section:0})});
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

    const returnSection = (num) =>{
        switch(num){
            case 1:{
                //Return the how to play page
                return (
                    <span style={{marginLeft:"4vw"}}>
                        How to play page content goes here
                    </span>
                )
            }
            case 2:{
                //Return the game rules page
                return (
                    <div style={{marginLeft:"4vw",marginLeft:"4vw",display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
                        <div>
                            <h3>Admin is always right.</h3>
                            <h4>He's right above you.</h4>
                        </div>
                        <div>
                            <h3>We suggest you enter FULL NAMES including space.</h3>
                            <h4>Answer is CASE INSENSITIVE.Eg.barton hills,Barton Hills,BARTON HILLS,BaRtOn HilLs are all same</h4>
                        </div>
                        <div>
                            <h3>Play fair, the mods will be fair.</h3>
                            <h4>Dare to post answers in forum or any place known to us, be ready to face the consequences.</h4>
                        </div>
                        <div>
                            <h3>Google and Wikipedia</h3>
                            <h4>They are both our boon and bane.</h4>
                        </div>
                        <div>
                            <h3>If you're stuck then hit up the clues section</h3>
                            <h4>Clues for the levels may be found in page source too</h4>
                        </div>
                        <div>
                            <h3>Hackers, you guys rule.</h3>
                            <h4>Make any attempts and you will be banned from the game.</h4>
                        </div>
                    </div>
                )
            }
            case 3:{
                //Returns the contact page
                return (
                    <span style={{marginLeft:"4vw"}}>
                        Contact page content goes here
                    </span>
                )
            }
            case 4:{    
                //Returns the clues page
                return (
                    <span style={{marginLeft:"4vw"}}>
                        Clues page content goes here
                    </span>
                )
            }
        }
    }

    useEffect(()=>{
        const f = () =>{

            console.log(toggle.isToggled)
            if(isOpen == 0 && num!=-1 && toggle.isToggled==true){
                contentArea.style.top = ` 10vh - ${headerText.clientHeight} + 10vh `;
                contentArea.style.paddingTop = ` 10vh - ${headerText.clientHeight} + 10vh `;
                setNum()
                t1
                .clear()
                .add(RandomLetters(toggle.value),0)
                .fromTo('.heading-options',{marginTop:"30vh"},{marginTop:"10vh",duration:0.8})
                .fromTo('.black-header h4',{opacity:1},{opacity:0,duration:0.8},0)
                .to('.black-header h4',{display:"none",duration:0},0.8)
                .to('.content-area',{opacity:1,duration:0.3})
                .eventCallback("onComplete", ()=>{setTextHeading(toggle.value);t1.clear();isOpen = 1;})
            }

        }
        f();
    })
    
    return(
        <div className="options">
        
        <div className="black-header">
            <h1 ref={ref=>headerText = ref} style={{color:"black"}} onClick={()=>Minimize()} className = "heading-options">DEADLOCK</h1>
            <h4 id="options" className="htp" style={{marginTop:"1vh"}} onClick={()=>setToggle({isToggled:true,value:"Leaderboards",section:1})}>Leaderboards</h4>
            <h4 id="options" onClick={()=>setToggle({isToggled:true,value:"Game rules",section:2})}>Game rules</h4>
            <h4 id="options" onClick={()=>setToggle({isToggled:true,value:"Contact",section:3})}>Contact</h4>
            <h4 id="options" onClick={()=>setToggle({isToggled:true,value:"Clues",section:4})}>Clues</h4>
        </div>
            {toggle.isToggled?(
                <div ref={ref=>contentArea=ref} className="content-area">
                    {returnSection(toggle.section)}
                </div>
            ):<></>
                }
        </div>
    )
}