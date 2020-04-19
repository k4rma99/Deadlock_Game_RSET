import React,{Component,useEffect,useState} from "react"
import "../assets/css/playGameButton.css"
import { useSelector,useDispatch } from 'react-redux';
import Svg from "./playGameSVG"
import {loginSuccess} from "../redux/actions.jsx"
import firebase from "../firebase/firebase.js"
var Cookie = require('js-cookie');
export const PlayGameButton = (props) =>{

        var auth = useSelector(state=>state.rootReducer)
        var dispatch = useDispatch();
        console.log(auth)
        var [error,setError] = useState(null);
        function loginWithGoogle() {
                var provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(function() {
                        return firebase.auth().signInWithPopup(provider).then(async (result) => {
                                console.log(result)
                                try {
                                        var userData = await firebase.firestore().collection('users').doc(result.user.uid).get();
                                        var isDetailsSet='false';
                                        if(userData.exists){
                                                console.log("ok")
                                                if(userData.data().mobileNo!=null && userData.data().mobileNo!=undefined){
                                                        console.log("ok1")
                                                        isDetailsSet = 'true';
                                                }
                                                
                                        }
                                        console.log("userdata",userData.data().mobileNo);
                                        // signed out
                                      } catch (e){
                                       // an error
                                      } 


                                        dispatch(loginSuccess({
                                              uid:result.user.uid,
                                                username:result.user.displayName,
                                               isDetailsSet:isDetailsSet
                                       }));
                                
                              }).catch(function(error) {
                              });
                })
        }
    
        return(<div className="main-grid">
                        <div className="main-header">
                                <div style={{position:"relative"}}>
                                <div id="glitch-holder">
                                        <h1  className="heading glitch" data-text="DEADLOCK">DEADLOCK</h1>
                                </div></div>
                                <h1 className="span-header">Lorem ipsum dolor</h1>
                                {
                                        error!=null
                                        ?<span>{error}</span>
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
