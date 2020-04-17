import React, { Component, useEffect } from 'react';
import {useSelector} from "react-redux";
import { useFirebase, isLoaded } from 'react-redux-firebase';

import { Credentials } from '../components/Credentials.jsx';
import { FancyLoader } from './fancyLoader.jsx';


export const MainLoader = (props) =>{
    var profile = useSelector(state=>state.fireBaseReducer.profile)
    var auth = useSelector(state=>state.fireBaseReducer.auth)
    useEffect(()=>{
        if(props.profile==true){
            if((profile.mobileNo)!=null){
                console.log("teehee")
                localStorage.setItem('isDetailSet','true');
                localStorage.setItem('LoggedIn','true');
                props.SetStateChange(props.forceStateChange * -1);
            }
        }
        else if(props.auth==true){
            if((auth.isEmpty)==false){
                localStorage.setItem('LoggedIn','true');
                props.SetStateChange(props.forceStateChange * -1);
            }
        }
    
    })

    return(
        <div>
            {!isLoaded(profile)
            ?<FancyLoader></FancyLoader>
            :<Credentials forceStateChange={props.forceStateChange} SetStateChange={props.SetStateChange}></Credentials>
            }
        </div>
    )
}