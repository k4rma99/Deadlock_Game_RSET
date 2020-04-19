import React, { useEffect,useState,useRef } from 'react';
import "../assets/css/Menu.css"
import {gsap} from "gsap";
import { LeaderBoard } from "../components/leaderBoards.jsx";
import firebase from "../firebase/firebase.js"
import {logout} from "../redux/actions.jsx";
import {useSelector,useDispatch} from "react-redux"

export const Menu = (props) =>{
    var headerText = null;
    var contentArea = null;
    let t1 = useRef(gsap.timeline());
    let id = useRef(null);

    var playerState = useSelector(state=>state.rootReducer);
    var dispatch =useDispatch();
    //used for generating random alphanumeric characters. If num == -1 then the recursive functions starts
    //the recursive function generates the random number effect 
    //when we set it back to 1 then it stops
    var num = useRef(1);

    var [toggle,setToggle] = useState({
        isToggled:false,
        value:"",
        section:0,
    });

    const resetLevel = () =>{
        firebase.firestore().collection('users').doc(playerState.uid).update({
            level:1
        }).then((success)=>{
            console.log("success")
        }).catch((error)=>{
            console.log(error);
        })
    }

    const Logout = async () =>{
        props.changeOpenState();
        setTimeout(async ()=>{
            try {
                await firebase.auth().signOut();
                // signed out

                dispatch(logout())
              } catch (e){
               // an error
              } 
        },500)


     }

     const removeUser = async () =>{
            try{
                await firebase.firestore().collection('users').doc(playerState.uid).update({
                    displayName:playerState.username
                })
            }
            catch(error){

            }
     }
 
    
    const setNum = () =>{
        num.current = num.current *-1;
    }

    const setTextHeading = (s) =>{
        num.current = num.current *-1;
        if(headerText){
                headerText.textContent = s
        }
    }

    const Minimize = () => 
    {
        if(num.current!=-1 && toggle.isToggled==true){
            setNum();
            RandomLetters("DEADLOCK");
            t1.current
            .reverse()
            .eventCallback("onReverseComplete",()=>{setTextHeading("DEADLOCK");t1.current.clear();setToggle({
                isToggled:false,
                value:"",
                section:0
            })});
    }
}

    const RandomLetters = (s) =>{
        if(headerText){
                headerText.textContent = Math.random().toString(36).substr(2, s.length)
        if(num.current==-1){
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
                if(!playerState.LoggedIn){
                    return (
                        <span style={{marginLeft:"4vw"}}>
                            Contact page content goes here
                        </span>
                    )
                }
                else{
                    return (
                        <div className="profile-info" style={{marginLeft:"4vw",marginRight:"4vw",height:"90%",overflowY:"scroll"}}>
                            <div >
                                <h3>Username:</h3>
                                <h4>{playerState.username}</h4>
                            </div>
                            <div >
                                <button onClick={()=>Logout()} className="logout-button">Logout</button>
                            </div>

                            <div >
                                <button onClick={()=>resetLevel()} className="logout-button">Reset Level</button>
                            </div>
                            <div >
                                <button onClick={()=>removeUser()} className="logout-button">Reset Name</button>
                            </div>
                        </div>
                    )
                }
                
            }
            case 4:{    
                //Returns the clues page
                return (
                    <span style={{marginLeft:"4vw"}}>
                        More page content goes here
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

    useEffect(()=>{
        const f = () =>{
            if(num.current!=-1 && toggle.isToggled==true){
                t1.current = gsap.timeline();
                setNum()
                RandomLetters(toggle.value)
                requestAnimationFrame(()=>{
                        t1.current
                            .fromTo([LeaderBoards,Rules,Contact,Clues],{autoAlpha:1},{autoAlpha:0,duration:0.2},0)
                            .to(optionTextArea,{top:`10vh`,duration:0.7},0.2)
                            .to([LeaderBoards,Rules,Contact,Clues],{display:"none",duration:0.2})
                            .to(contentArea,{autoAlpha:1,duration:0.2})
                            .eventCallback("onComplete", ()=>{setTextHeading(toggle.value)})
                })
            }
        }
        f();
    },[toggle])
    
    return(
        <div className="main-menu" id="main-menu" style={{height:"100vh",display:"flex",position:"absolute",zIndex:"121",overflow:"hidden"}}>
        
        <div id="options" ref={ref=>optionTextArea=ref} className="option-textarea" style={{position:"relative",zIndex:"-1"}}>
        <div style={{color:"black"}} className="black-header">
            <h1 ref={ref=>headerText = ref} style={{color:"black"}} onClick={()=>Minimize()} className = "heading-options">DEADLOCK</h1>
            <h4 id="options" ref={ref=>LeaderBoards=ref} className="htp" style={{marginTop:"1vh"}} onClick={()=>toggle.isToggled?"":setToggle({isToggled:true,value:"leaderboard",section:1})}>Leaderboards</h4>
            <h4 id="options" ref={ref=>Rules=ref} onClick={()=>toggle.isToggled?"":setToggle({isToggled:true,value:"Game rules",section:2})}>Game rules</h4>
            <h4 id="options" ref={ref=>Contact=ref} onClick={()=>toggle.isToggled?"":setToggle({isToggled:true,value:!playerState.LoggedIn?"Contact":"Profile",section:3})}>{!playerState.LoggedIn?"Contact":"Profile"}</h4>
            <h4 id="options" ref={ref=>Clues=ref} onClick={()=>toggle.isToggled?"":setToggle({isToggled:true,value:"More",section:4})}>More</h4>
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