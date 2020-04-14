import React, { useEffect,useState,useRef,useLayoutEffect } from 'react';
import "../assets/css/Menu.css"
import {gsap,TimelineLite,TweenMax} from "gsap";
import { LeaderBoard } from "../components/leaderBoards.jsx";

export const Menu = () =>{
    var headerText = null;
    var contentArea = null;
    let t1 = gsap.timeline();
    let id = useRef(null);

    //used for generating random alphanumeric characters. If num == -1 then the recursive functions starts
    //the recursive function generates the random number effect 
    //when we set it back to 1 then it stops
    var num = 1;

    //tells us if any one of the subsections are open
    var isOpen = 0;

    var topMargin = useRef();

    var [toggle,setToggle] = useState({
        isToggled:false,
        value:"",
        section:0,
    });
    
    const setNum = () =>{
        num = num *-1;
    }

    const setTextHeading = (s) =>{
        num = num *-1;
        if(headerText){
            requestAnimationFrame(()=>{
                headerText.textContent = s
            })
        }
    }

    const Minimize = () => 
    {
        if(num!=-1){
        requestAnimationFrame(()=>{
        setNum()
        t1
        .to('.content-area',{autoAlpha:"0",duration:0.2})
        .add(()=>RandomLetters("DEADLOCK"))
        .to('.option-textarea',{transform:"translateY(0vh)",duration:0.7})
        .add(()=>setTextHeading(toggle.value))
        .to('.black-header h4',{display:"block",duration:0.2})
        .fromTo('.black-header h4',{autoAlpha:0},{autoAlpha:1,duration:0.2})
        .eventCallback("onComplete", ()=>{isOpen = 0;setToggle({isToggled:false,value:"DEADLOCK",section:0})});
        })
        }

    }

    const RandomLetters = (s) =>{
        if(headerText){
                headerText.textContent = Math.random().toString(36).substr(2, s.length)
        if(num==-1){
            setTimeout(()=>{
                requestAnimationFrame(()=>RandomLetters(s))
            },100)
        }
        else{
                headerText.textContent = s
        }

        }
    }

    const returnSection = (num) =>{
        switch(num){
            case 1:{
                //Return the how to play page
                return (
                    <LeaderBoard></LeaderBoard>
                )
            }
            case 2:{
                //Return the game rules page
                return (
                    <div style={{marginLeft:"4vw",marginRight:"4vw",width:"92vw",display:"flex",flexDirection:"row",flexWrap:"wrap",borderTop:"thin lightgray solid"}}>
                        <div style={{marginRight:"1vw"}}>
                            <h3>Admin is always right.</h3>
                            <h4>He's right above you.</h4>
                        </div>
                        <div style={{marginRight:"1vw"}}>
                            <h3>We suggest you enter FULL NAMES including space.</h3>
                            <h4>Answer is CASE INSENSITIVE.Eg.barton hills,Barton Hills,BARTON HILLS,BaRtOn HilLs are all same</h4>
                        </div>
                        <div>
                            <h3>Play fair, the mods will be fair.</h3>
                            <h4>Dare to post answers in forum or any place known to us, be ready to face the consequences.</h4>
                        </div>
                        <div style={{marginRight:"1vw"}}>
                            <h3>Google and Wikipedia</h3>
                            <h4>They are both our boon and bane.</h4>
                        </div>
                        <div style={{marginRight:"1vw"}}>
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

    var optionTextArea = useRef(null);
    var contentArea = useRef(null);
    var LeaderBoards = useRef(null);
    var Rules = useRef(null);
    var Contact = useRef(null);
    var Clues = useRef(null);

    useLayoutEffect(() => {
        /*function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
          }
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
        */
       const f = () =>{
            function updateSize() {
            topMargin.current = { 
                width: window.getComputedStyle(optionTextArea).getPropertyValue('margin-top')>"29.2143px"?20:0,
                orientation:window.innerHeight > window.innerWidth?"portrait":"landscape-primary",
                setListener:true
            };
            }
        if(!topMargin.current){
            console.log("pp")
            window.addEventListener('resize', updateSize);
            updateSize();
        }
       }
       f();
      }, [topMargin]);
    

    useEffect(()=>{
        const f = () =>{
            if(num!=-1 && toggle.isToggled==true){
                console.log(topMargin)
                var newwidth;
                    newwidth = 20
                setNum()
                requestAnimationFrame(()=>{
                        t1
                            .add(()=>RandomLetters(toggle.value))
                            .fromTo([LeaderBoards,Rules,Contact,Clues],{autoAlpha:1},{autoAlpha:0,duration:0.2},0)
                            .to(optionTextArea,{transform:`translateY(-${topMargin.width}vh)`,duration:0.7},0.2)
                            .add(()=>setTextHeading(toggle.value))
                            .to([LeaderBoards,Rules,Contact,Clues],{display:"none",duration:0.2})
                            .to(contentArea,{autoAlpha:1,duration:0.2})
                            .eventCallback("onComplete", ()=>{t1.clear();})
                })
            }

        }
        f();
    },[toggle])
    
    return(
        <div className="main-menu" style={{display:"flex",position:"absolute",zIndex:"100"}}>
        
        <div id="options" ref={ref=>optionTextArea=ref} className="option-textarea" style={{position:"fixed",zIndex:"-1"}}>
        <div style={{color:"black"}} className="black-header">
            <h1 ref={ref=>headerText = ref} style={{color:"black"}} onClick={()=>Minimize()} className = "heading-options">DEADLOCK</h1>
            <h4 id="options" ref={ref=>LeaderBoards=ref} className="htp" style={{marginTop:"1vh"}} onClick={()=>toggle.isToggled?"":setToggle({isToggled:true,value:"leaderboard",section:1})}>Leaderboards</h4>
            <h4 id="options" ref={ref=>Rules=ref} onClick={()=>toggle.isToggled?"":setToggle({isToggled:true,value:"Game rules",section:2})}>Game rules</h4>
            <h4 id="options" ref={ref=>Contact=ref} onClick={()=>toggle.isToggled?"":setToggle({isToggled:true,value:"Contact",section:3})}>Contact</h4>
            <h4 id="options" ref={ref=>Clues=ref} onClick={()=>toggle.isToggled?"":setToggle({isToggled:true,value:"Clues",section:4})}>Clues</h4>
        </div>
            {toggle.isToggled?(
                <div ref={ref=>contentArea=ref} className="content-area">
                    {toggle.isToggled?returnSection(toggle.section):""}
                </div>
            ):<></>
            }
        </div>
        </div>
    )
}