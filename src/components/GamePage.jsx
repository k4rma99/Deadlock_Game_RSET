import React, { useEffect,useState,useRef } from 'react';

import "../assets/css/GamePage.css"

export const GamePage = (props) =>{

    var added = useRef(false);

  const logout = () =>{
    props.firebase.logout();
    props.SetStateChange(props.forceStateChange*-1)
  }

  // setting up DOM references

var searchOverlay = null;
var searchInput = null;
var searchButton = null;
var liRef = null;

// hide the searchOverlay

//searchOverlay.hide();


// Status indicating that search is not active. 
	
var searchStatus = useRef(false);

// If any key is pressed while CMD is not pressed, begin search

// Open and close search when magnifying class or close is tapped
const searchClicked = () =>{
    console.log("epe")
    
    if (!searchStatus.current) {
            requestAnimationFrame(()=>{ 
                searchOverlay.style.display = "flex"
                liRef.style.opacity = "0"
            //searchOverlay.show();
            //searchOverlay.find('input').focus();
                searchInput.focus();
            })
			searchStatus.current = true;
      }
    else  {
        requestAnimationFrame(()=>{
            searchOverlay.style.display = "none"
            liRef.style.opacity = "1"
        //searchOverlay.hide();
        //searchOverlay.find('input').val('');
            searchInput.textContent = ''
        })
        searchStatus.current = false;
        //searchButton.removeClass("close");

    }
}

const SearchInputKeyUp = (e) =>{
    if (searchStatus) {
        //might have to change the below line of code
        if (!e.target.value) {
            requestAnimationFrame(()=>{
                searchOverlay.style.display = "none"
                liRef.style.opacity = "1"
             //searchOverlay.hide();
             //searchOverlay.find('input').val('');
                searchInput.textContent=''
            })
         searchStatus.current = false;
         //searchButton.removeClass("close");
        }
     }
}

const ClosePage = (e) =>{
    console.log("d")
    console.log(e.target.className)
    if(e.target.className!='search' && e.target.className!='text-area-search'){
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

useEffect(()=>{

    console.log(added.current)
    if(added.current==false){

        document.addEventListener("keyup",(e)=>{
            if (e.keyCode == 27 && searchStatus.current) {
                //searchOverlay.hide();//
                    searchOverlay.style.display = "none"
                    liRef.style.opacity = "1"
                    //searchOverlay.find('input').val('');//
                    searchInput.textContent = ''
                searchStatus.current = false;
                //searchButton.removeClass("close");//
                 }
        })

        window.addEventListener("keydown",(e)=>{
            if (!e) e = window.event;
            if (!e.metaKey) {
              if(e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 48 && e.keyCode <= 57) {
                  if (!searchStatus.current) {
                        //searchOverlay.show();//
                        searchOverlay.style.display = "flex"
                        liRef.style.opacity = "0"
                        searchInput.focus();//
                      searchStatus.current = true;
                      //searchButton.addClass("close");//
                  }
              }
            }
        })
        added.current = true;
    }
    searchOverlay.style.display = "none"
},[])

    return (
        <div onClick={e=>ClosePage(e)} style={{width:"100%",height:"100%",paddingTop:"10vh",paddingLeft:"4vw",backgroundColor:"black"}}>
<h1 className="game-header">Overclock your Brain</h1>
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
</nav>


{/*

<div style={{height:"100vh",backgroundColor:"white",color:"black",paddingTop:"10vh"}}>
        Game Page
      <button onClick={()=>logout()}>Logout</button>
    </div>

*/}
    </div>
    )
}