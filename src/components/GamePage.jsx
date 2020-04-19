import React, { useEffect,useState,useRef } from 'react';
import {FancyLoader} from "./fancyLoader.jsx"
import { useFirebase, isLoaded } from 'react-redux-firebase'
import {gsap} from "gsap";
import "../assets/css/GamePage.css"
import { useSelector } from 'react-redux';
var CryptoJS = require("crypto-js");

export const GamePage = (props) =>{
  var profile = useSelector(state=>state.fireBaseReducer.profile);
  var auth = useSelector(state=>state.fireBaseReducer.auth);
  const firebase = useFirebase();
  var db = useRef(firebase.firestore());
  const lvl1=useRef("b16d7a03a24d35c3434f78ea1f09a0ac177f64769772df7d8f2cf07940de865f");
  var t = gsap.timeline();
  var [error,setError] = useState(null);
  
  var [content,setContent] = useState(
    {
      question:{},
      isLoading:true,
      submitting:false,
      error:{
        flag:false,
        message:""
      }
    }
  )

  var added = useRef(false);

  var questionRef = useRef(null);

  const openModal = () =>{
        t.to('.modal-background',{visibility:"visible"})
        .to(".modal",{transform:"scale(1)"});
  }

  const gotoNextQuestion = () =>{
    setContent(
      {
        question:"",
        encryptedans:"",
        isLoading:true,
        submitting:false,
        error:{
          flag:false,
          message:""
        }
      }
    )
  }

  const check_ans =(ans_hash)=>{
    firebase.firestore().collection('testQnA').doc(ans_hash).get().then((doc)=>{
      if (doc.exists) {
        var date = new Date();
        var time_stamp = date.getTime();
        firebase.firestore().collection('users').doc(auth.uid).update({
          prevhash: ans_hash,
          timestamp: time_stamp,
          level: profile.level + 1
        }).then((success) => {
          setContent(
            {
              question:"",
              encryptedans:"",
              isLoading:true,
              submitting:false,
              error:{
                flag:false,
                message:""
              },
              success:true
            }
          )
        })
      } else {
        setContent(
          {
            question:content.question,
            encryptedans:content.encryptedans,
            isLoading:false,
            submitting:false,
            error:{
              flag:true,
              message:"Sorry wrong answer!"
            }
          }
        )
      }
        //action(flag,ans_hash);
    })
  }

  const hash_ans=()=>{
    var before_hash;
    console.log("question",content.question);
    console.log("answer",searchInput.value);
    console.log("lvl1",lvl1.current);
    if(profile.level==1){
      before_hash = lvl1.current.concat(content.question,searchInput.value);
    }
    else{
      before_hash = profile.prevhash.concat(content.question,searchInput.value);
    }
    let hash = CryptoJS.SHA256(before_hash);
    let encryptedans = hash.toString(CryptoJS.enc.Hex)
    //check_ans(encryptedans);
    console.log(encryptedans);
    setContent(
      {
        question:content.question,
        encryptedans:encryptedans,
        isLoading:true,
        submitting:true,
        error:{
          flag:false,
          message:""
        }
      }
    )
  }

  const submitAnswer = async () =>{
    try{
  
      //let querySnapshot = await firebase.firestore().collection('QnA').doc(profile.level+'').get();
      //console.log(querySnapshot.data())
  
      if(searchInput){
          if(searchInput.value.trim()!=""){
            hash_ans();
          }
          else{
            setContent(
              {
                question:content.question,
                isLoading:false,
                submitting:false,
                error:{
                  flag:true,
                  message:"Please enter an answer!"
                }
              }
            )
          }
      }
      else{
        setContent(
          {
            question:content.question,
            isLoading:false,
            submitting:false,
            error:{
              flag:true,
              message:"Please enter an answer!"
            }
          }
        )
      }
      
    } 
    catch(error){
      console.log(error)
    }
  }

  const get_ques =(actual_hash)=>{
    firebase.firestore().collection('testQnA').doc(actual_hash).get().then((doc)=>{
      console.log("question does exist");
      console.log(doc.data().question)
      setContent({
        question:doc.data().question,
        isLoading:false,
        submitting:false,
        error:{
          flag:false,
          message:""
        }
      })
    }
    ).catch((error)=>{
      console.log(error)
    });
}

  const check_lvl =()=>{
    if(profile.level==1){
        get_ques(lvl1.current);
    }else{
        get_ques(profile.prevhash);//field prevhash to be created in each user document
    }
  }


  const playgame =()=>{
  console.log('dsdsd');
  db.collection('users').get().then((snapshot) => {
      snapshot.docs.forEach(doc =>{
          if(doc.id=="HwZAWuGq5RY3QF1y4q7E7PTNFO52"){
          check_lvl(doc.data());//passing current user's data
          }
      })
  })

  }


  // setting up DOM references

var searchOverlay = null;
var searchInput = null;
var searchButton = null;
var liRef = null;

// Status indicating that search is not active. 
	
var searchStatus = useRef(false);

const searchClicked = () =>{
    console.log("epe")
    if(searchOverlay && searchInput && searchButton &&liRef){
      if (!searchStatus.current) {
        requestAnimationFrame(()=>{ 
            searchOverlay.style.display = "flex"
            liRef.style.opacity = "0"
            searchInput.focus();
        })
  searchStatus.current = true;
  }
else  {
    requestAnimationFrame(()=>{
        searchOverlay.style.display = "none"
        liRef.style.opacity = "1"
        searchInput.textContent = ''
    })
    searchStatus.current = false;

}
    }
    
}

const SearchInputKeyUp = (e) =>{
  if(searchOverlay && searchInput && searchButton &&liRef){
    if (searchStatus) {
      if (!e.target.value) {
          requestAnimationFrame(()=>{
              searchOverlay.style.display = "none"
              liRef.style.opacity = "1"
              searchInput.textContent=''
          })
       searchStatus.current = false;
      }
   }
  }
}

const ClosePage = (e) =>{
    console.log("d")
    console.log(e.target.className)
    if(searchOverlay && searchInput && searchButton &&liRef){
      if(e.target.className!='search' && e.target.className!='text-area-search' && e.target.className!='search-button'){
        if(searchStatus.current == true){
            requestAnimationFrame(()=>{
                searchOverlay.style.display = "none"
                liRef.style.opacity = "1"
                searchInput.textContent = ''
            })
            searchStatus.current = false;
        }
    }
    }
}

useEffect(()=>{

    console.log(added.current)
    if(added.current==false){

        document.addEventListener("keyup",(e)=>{
          if(searchOverlay && searchInput &&liRef){
            if (e.keyCode == 27 && searchStatus.current) {
              searchOverlay.style.display = "none"
              liRef.style.opacity = "1"
              searchInput.textContent = ''
          searchStatus.current = false;
           }
          }
            
        })


        window.addEventListener("keydown",(e)=>{
          if(searchOverlay && searchInput &&liRef){
            if (!e) e = window.event;
            if (!e.metaKey) {
              if(e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 48 && e.keyCode <= 57) {
                  if (!searchStatus.current) {
                        searchOverlay.style.display = "flex"
                        liRef.style.opacity = "0"
                        searchInput.focus();//
                      searchStatus.current = true;
                  }
              }
            }
          }
        })
        added.current = true;
    }
    if(searchOverlay){ 
      searchOverlay.style.display = "none"

    }

      if(content.isLoading && isLoaded(profile)){
        if(content.submitting==false){
          check_lvl();
        }
        else{
          if(profile.prevhash){
            if(content.encryptedans != profile.prevhash){
                check_ans(content.encryptedans);
            }
          }
          else{
                check_ans(content.encryptedans);
          }
        }
      }
    
    
})

    return (
        <div style={{width:"100vw",height:"100%",position:"fixed",zIndex:"-10"}}>
{
      !isLoaded(profile)||content.isLoading
      ?<FancyLoader></FancyLoader>
      :(
        <div className="game-main" onClick={e=>ClosePage(e)} style={{width:"100vw",height:"100vh",paddingTop:"10vh",paddingLeft:"4vw",paddingRight:"4vw",backgroundColor:"black",display:"flex",flexDirection:"column"}}>

<h4 className="game-header">Challenge</h4>
      <h3 style={{color:"red"}}>{content.error.flag?content.error.message:""}</h3>
      {
        !content.isLoading
        ?<h3 style={{color:"white"}}>{content.question}</h3>
        :""
      }
<div className="img-wrapper">
<nav className="search-nav">
  <ul>
    <li ref={ref=>liRef=ref} style={{display:"flex",flexDirection:"row",height:"100%"}}>
        <button onClick={()=>searchClicked()} ref={ref=>searchButton=ref} className="search"></button>
        <div onClick={()=>searchClicked()} style={{width:"80%"}} className="text-area-search">Your answer here.</div>
    </li>
    <li>
    <div ref={ref=>searchOverlay=ref} id="searchOverlay" style={{display:"none"}}>
  
  <input ref={ref=>searchInput=ref} style={{fontSize:"3em",height:"100%"}} onKeyUp={(e)=>SearchInputKeyUp(e)} autofocus type="text" placeholder=""/>
    
  </div>
    </li>
  </ul>
  <br/>
  <button className="search-button" onClick={()=>submitAnswer()}>
     <h3>Submit</h3>
  </button>
</nav>
    <img src="https://htmlcolorcodes.com/assets/images/html-color-codes-color-tutorials-hero-00e10b1f.jpg"></img>
</div>
    
          </div>
        
      )
}

<div className="modal-background">
    <div className="modal">
      Success
      <button onClick={()=>gotoNextQuestion()}></button>
    </div>
</div>
    </div>
    )
}