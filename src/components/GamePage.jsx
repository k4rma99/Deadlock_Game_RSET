import React, { useEffect,useState,useRef } from 'react';
import {FancyLoader} from "./fancyLoader.jsx"
import { useFirebase, isLoaded } from 'react-redux-firebase'

import "../assets/css/GamePage.css"
import { useSelector } from 'react-redux';

export const GamePage = (props) =>{
  var profile = useSelector(state=>state.fireBaseReducer.profile);
  var auth = useSelector(state=>state.fireBaseReducer.auth);
  const firebase = useFirebase();

  var [error,setError] = useState(null);

  var added = useRef(false);

  function updateUserProfile() {
    return firebase.updateProfile({
        email: "test",
      displayName:"test",
      mobno:"test",
      college:"test",
      rset:"test"
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

const submitAnswer = async () =>{
  try{

    //let querySnapshot = await firebase.firestore().collection('QnA').doc(profile.level+'').get();
    //console.log(querySnapshot.data())

    if(searchInput){
        if(searchInput.value.trim()!=""){
                console.log("ok we can submit the answer now");
                /*
                var hash = sha256(this.ans + '' + this.question.photoURL + '' + profile.previousHash).toString()
          firebase.firestore().collection('QnA').doc(profile.previousHash).get().then((doc) => {
          if (doc.exists) {
            firebase.updateProfile({
              currentHash: hash,
              previousHash: profile.previousHash,
              currentLevel: this.getCurrentLevel + 1
            })
            .then((success) => {
                //swal('Good job!', 'Correct Answer !', 'success').then(success => {
                //this.answer = null
                //this.$store.commit('CURRENT_LEVEL', this.getCurrentLevel + 1)
                //this.$store.commit('SET_PREVIOUS_HASH', this.getCurrentHash)
                //this.$store.commit('SET_CURRENT_HASH', hash)
                //this.question = {
                  //photoURL: doc.data().photoURL,
                  //previousHash: doc.data().id
                //}
              })
            })
          } else {
              //swal('Sorry', 'Wrong Answer!!', 'error')
          }
                */
        }
        else{
          setError("Please enter an answer!");
        }
    }
    else{
      setError("Please enter an answer!");
    }
    
  } 
  catch(error){
    console.log(error)
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

    /*
    firebase.firestore().collection('QnA').doc(profile.previousHash).get().then((doc) => {
            console.log(doc.data);
    })

    */
},[])

    return (
        <div style={{width:"100vw",position:"fixed",zIndex:"-10"}}>
{
      !isLoaded(profile)
      ?<FancyLoader></FancyLoader>
      :(
        <div className="game-main" onClick={e=>ClosePage(e)} style={{width:"100vw",height:"100vh",paddingTop:"10vh",paddingLeft:"4vw",paddingRight:"4vw",backgroundColor:"black",display:"flex",flexDirection:"column"}}>

<h4 className="game-header">Challenge</h4>
      <h3 style={{color:"red"}}>{error!=null?error:""}</h3>
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
    </div>
    )
}