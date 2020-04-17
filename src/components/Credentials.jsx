import React, { useState } from 'react';
import {useSelector} from "react-redux";
import { useFirebase, isLoaded } from 'react-redux-firebase';
import {fancyLoader} from "./fancyLoader.jsx";
import "../assets/css/Credentials.css";

export const Credentials = (props) =>{

    var mobRef = null;
    var checkRef = null;

    var [error,SetError] = useState(null);
    const firebase = useFirebase();

    var profile = useSelector(state=>state.fireBaseReducer.profile);

    const SubmitUserProfileData = () =>{
        console.log(mobRef.value);
        console.log(checkRef.checked);
        if(mobRef.value!=null || mobRef.value!=undefined){
                if(mobRef.value.trim()=="" || mobRef.value.trim().length!=10){
                    SetError("Mobile number invalid!");
                }
                else{
                    firebase.updateProfile(
                    { 
                        mobileNo:mobRef.value.trim(),
                        collegeNo:checkRef.checked?"RSET":"OTHER",
                        isRSET:checkRef.checked?true:false,
                        level:1
                    }
                    ).then((success)=>{
                        localStorage.setItem('isDetailSet','true');
                        props.SetStateChange(props.forceStateChange * -1);
                    });
                }
        }
        else{
            SetError("Mobile number field cannot be blank!");
        }
    }

    return(
        <div className="credentials-page" style={{height:"100vh",addingTop:"10vh",marginLeft:"4vh",marginRight:"4vh",display:"flex",flexDirection:"column"}}>
          {  
                isLoaded(profile)
                ?(
                    <div>
                <h1 style={{color:"white"}}>Enter your details</h1>
            {
                error!=null?<h3 style={{color:"red"}}>{error}</h3>:""
            }
            <input ref={ref=>mobRef = ref} type="text" placeholder="mobile number"></input>
            <label className="container-check">
                <span style={{color:"white"}}>Are you a rajagiri student?</span>
                <input ref={ref=>checkRef = ref} type="checkbox" />
                <span className="checkmark"></span>
            </label>
            <button onClick={()=>SubmitUserProfileData()}>Submit</button>)
            </div>)
        :<span style={{color:"white",margin:"auto auto"}}>Please wait....</span>
}
        </div>
    )
}