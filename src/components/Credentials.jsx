import React, { useState,useEffect,useRef } from 'react';
import {useSelector,useDispatch} from "react-redux";
import {updateProfile} from "../redux/actions.jsx";
import {FancyLoader} from "./fancyLoader.jsx";
import firebase from "../firebase/firebase.js";
import "../assets/css/Credentials.css";

export const Credentials = (props) =>{

    var mobRef = null;
    var checkRef = null;

    var [state,setState] = useState({
        isLoading:true,
        error:null
    });
    var check = useRef(0);
    var playerState = useSelector(state=>state.rootReducer);
    var dispatch =useDispatch();

const SubmitUserProfileData = () =>{
      if(mobRef.value!=null || mobRef.value!=undefined){
        if(mobRef.value.trim()=="" || mobRef.value.trim().length!=10){
            setState({
                isLoading:false,
                error:"Mobile number invalid!"
            });
        }
        else{
                var date = new Date();
                var time_stamp = date.getTime();
                firebase.firestore().collection('users').doc(playerState.uid).set({
                    mobileNo:mobRef.value.trim(),
                    collegeNo:checkRef.checked?"RSET":"OTHER",
                    isRSET:checkRef.checked?true:false,
                    level:1,
                    previousHash:"",
                    timestamp:time_stamp,
                    displayName:playerState.username
                  }).then((success) => {
                      dispatch(updateProfile());
                  }).catch((error)=>{
                    setState({
                        isLoading:false,
                        error:error
                    });
                  });
        }
}
else{
    setState({
        isLoading:false,
        error:"Mobile number field cannot be blank!"
    });
}
}

const checkifSet = async () =>{
    try{
    var userData = await firebase.firestore().collection('users').doc(playerState.uid).get();
                if(userData.exists){
                    if(userData.data().mobileNo!=null && userData.data().mobileNo!=undefined){
                        dispatch(updateProfile());
                    }
                    else{
                        setState({
                            isLoading:false,
                            error:null
                        });
                    }
                }
                else{
                    setState({
                        isLoading:false,
                        error:null
                    });
                }
            } catch (e){
                setState({
                    isLoading:false,
                    error:e
                });
            } 
}

useEffect(()=>{
    if(check.current==0){
        if(state.isLoading){
            checkifSet();
        }
        check.current =1;
    }
    else{
        if(state.isLoading){
            SubmitUserProfileData();
        }
    }
},[])
    return(
        <div className="credentials-page" style={{height:"100vh",addingTop:"10vh",marginLeft:"4vh",marginRight:"4vh",display:"flex",flexDirection:"column"}}>
            
                    <div>
                <h1 style={{color:"white",fontSize:"8vh"}}>Enter your details</h1>
            {
                state.error!=null?<h3 style={{color:"red"}}>{state.error}</h3>:""
            }
            <span style={{color:"white",marginBottom:"2vh"}}>Mobile number</span>
            <input ref={ref=>mobRef = ref} style={{marginBottom:"4vh"}} type="text" placeholder="mobile number"></input>
            <label className="container-check">
                <span style={{color:"white"}}>Are you a rajagiri student?</span>
                <input ref={ref=>checkRef = ref} type="checkbox" />
                <span className="checkmark"></span>
            </label>
            <button onClick={()=>{setState({isLoading:true,error:null})}}>Submit</button>)
            </div>
            {
                state.isLoading
                ?<FancyLoader></FancyLoader>
                :""
            }
        </div>
    )
}