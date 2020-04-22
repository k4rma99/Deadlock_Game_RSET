import React,{useState, useEffect} from "react"
import "../assets/css/playGameButton.css"
import { useSelector,useDispatch } from 'react-redux';
import Svg from "./playGameSVG"
import {loginSuccess} from "../redux/actions.jsx"
import firebase from "../firebase/firebase.js"
export const PlayGameButton = (props) =>{

        var auth = useSelector(state=>state.rootReducer)
        var dispatch = useDispatch();
        var [state,setState] = useState({
                error:null,
                isLoading:false
        });
        const loginWithGoogle =()=> {
                var provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(()=> {
                        return firebase.auth().signInWithPopup(provider).then(async (result) => {
                                try {
                                        var userData = await firebase.firestore().collection('users').doc(result.user.uid).get();
                                        var isDetailsSet='false';
                                        if(userData.exists){
                                                if(userData.data().mobileNo!=null && userData.data().mobileNo!=undefined){
                                                        isDetailsSet = 'true';
                                                }
                                                
                                        }
                                      } catch (e){
                                        setState({
                                                isLoading:false,
                                                error:"an error occurred while signing in"
                                        });
                                      } 


                                        dispatch(loginSuccess({
                                              uid:result.user.uid,
                                                username:result.user.displayName,
                                               isDetailsSet:isDetailsSet
                                       }));
                                
                              }
                              ).catch(function(error) {
                                setState({
                                        isLoading:false,
                                        error:"error while signing in"
                                });
                              });
                }).then((popup)=>{
                        console.log(popup)
                })

        }

        useEffect(()=>{
                if(state.isLoading==true){
                        loginWithGoogle()
                }
        })
    
        return(<div className="main-grid">
                        <div className="main-header">
                                <div style={{position:"relative"}}>
                                <div id="glitch-holder">
                                        <h1  className="heading glitch" data-text="DEADLOCK">DEADLOCK</h1>
                                </div></div>
                                <h1 className="span-header">Lorem ipsum dolor</h1>
                                {
                                        state.error!=null
                                        ?<span>{state.error}</span>
                                        :""
                                }
                        </div>
                        <div className="wrapper">
                                <div onClick={()=>{loginWithGoogle()}} className="cta" >
                                        {
                                                auth.LoggedIn==true
                                                ? <span>Loading</span>
                                                :<span>LOGIN</span>
                                        }
                                        <Svg />
                                </div>
                        </div>
                </div>
        )
}

export default PlayGameButton
