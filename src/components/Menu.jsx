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

    const returnLevel = () =>{
        if(playerState.LoggedIn=='true' && playerState.isDetailsSet=='true'){
            if(!localStorage.getItem('level') || !localStorage.getItem('studentType')){
                firebase.firestore().collection('users').doc(playerState.uid).get().then((snapshot)=>{
                        document.getElementById('level-span').textContent = snapshot.data().level
                        document.getElementById('student-type-span').textContent = snapshot.data().collegeNo
                        localStorage.setItem('level',snapshot.data().level)
                        localStorage.setItem('studentType',snapshot.data().collegeNo)
                });
            }
            else{
                document.getElementById('level-span').textContent = localStorage.getItem('level')
                document.getElementById('student-type-span').textContent = localStorage.getItem('studentType')
            }
        }
    }

    const resetLevel = () =>{
        firebase.firestore().collection('users').doc(playerState.uid).update({
            level:1
        }).then((success)=>{
            console.log("success")
        }).catch((error)=>{
            console.log(error);
        })
    }

    const rerouteLogout =()=>{
        if(playerState.LoggedIn){
            Logout();
        }
        else{
            //reroute the user to the about page
        }
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
            returnLevel()
        }
        f();
    },[toggle])
    
    return(
        <div className="main-menu" id="main-menu" style={{backgroundColor:"transparent",height:"100vh",display:"flex",position:"absolute",zIndex:"111",overflow:"hidden"}}>
            <div className="profile-area">
                <img alt="" className="no-profile-pic" src={playerState.LoggedIn?firebase.auth().currentUser?firebase.auth().currentUser.photoURL:"none":"none"} style={playerState.isLoggedIn?{backgroundImage:`none`}:{backgroundImage:""},{borderRadius:"100%"}}></img>
                <span style={{display:"inline",textAlign:"center",marginRight:"7.5%",marginLeft:"7.5%"}}>{playerState.LoggedIn?playerState.username:"Sign up to take part in the game and win awesome prizes!"}</span>
            </div>
        <div className="stats-holder">
            <div className="induvidual-icon">
                <div className="level-icon" style={{margin:"auto 2vh"}}></div>
                <div>
                <span id="level-span" className="level-span" style={{fontSize:"3vh"}}>-</span>
                <br/>
                <span style={{color:"gray"}}>level</span>
                </div>
            </div>
            <hr style={{border:"thin gray solid"}} />
            <div className="induvidual-icon">
                <div className="trophy-icon" style={{margin:"auto 2vh"}}></div>
                <div>
                <span id="student-type-span" style={{fontSize:"3vh"}}>-</span>
                <br/>
                <span style={{color:"gray"}}>type</span>
                </div>
            </div>
        </div>
        <div style={{marginLeft:"7.5%",marginTop:"3vh",display:"flex",flexDirection:"row"}}>
            <div className="icon-menu rules-icon"></div>
            <a style={{margin:"auto 0"}}>Game Rules</a>
        </div>
        <div style={{marginLeft:"7.5%",marginTop:"3vh",display:"flex",flexDirection:"row"}}>
            <div className="icon-menu leaderboards-icon "></div>
            <a href="/leaderboards" style={{margin:"auto 0"}}>LeaderBoards</a>
        </div>
        <div style={{marginLeft:"7.5%",marginTop:"3vh",display:"flex",flexDirection:"row"}}>
            <div className="icon-menu clues-icon"></div>
            <a style={{margin:"auto 0"}}>Clues</a>
        </div>
        <div style={{marginLeft:"7.5%",marginTop:"3vh",display:"flex",flexDirection:"row"}}>
            <div className="icon-menu contact-icon"></div>
            <a style={{margin:"auto 0"}}>Contact us</a>
        </div>
        <div onClick={()=>{rerouteLogout()}} style={{position:"absolute",top:"80vh",marginLeft:"7.5%",display:"flex",flexDirection:"row"}}>
            <div className="icon-menu logout-icon"></div>
            <span style={{margin:"auto 0"}}>{playerState.LoggedIn?"Logout":"About"}</span>
        </div>
        </div>
    )
}