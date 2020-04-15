import React,{Component,useEffect} from "react"
import "../assets/css/playGameButton.css"
import {useSelector} from 'react-redux';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import Svg from "./playGameSVG"
var Cookie = require('js-cookie');
export const PlayGameButton = () =>{

        const firebase =useFirebase();

        let auth = useSelector(state=>state.fireBaseReducer.auth);
        let authError = useSelector(state=>state.fireBaseReducer.authError)

        function loginWithGoogle() {
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(function() {
                        return firebase.login({ provider: 'google', type: 'popup' });
                })
        }
    
        return(<div className="main-grid">
                        <div className="main-header">
                                <h1 id="light-flicker" className = "heading">DEADLOCK</h1>
                                <h1 className="span-header">Lorem ipsum dolor</h1>
                                {
                                        authError!=null
                                        ?<span>{auth.authError}</span>
                                        :""
                                }
                        </div>
                        <div className="wrapper">
                                <div className="cta" >
                                        {
                                                !isLoaded(auth)
                                                ? <span>Loading</span>
                                                : isEmpty(auth)
                                                ? <span onClick={loginWithGoogle}>LOGIN</span>
                                                : <span>LOGGEDIN</span>
                                        }
                                        <Svg />
                                </div>
                        </div>
                </div>
        )
}

export default PlayGameButton
