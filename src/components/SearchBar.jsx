import React, { useEffect,useState,useRef } from 'react';
import "../assets/css/GamePage.css"

export const GamePage = (props) =>{

    var added = useRef(false);

  // setting up DOM references

var searchOverlay = null;
var searchInput = null;
var searchButton = null;

// hide the searchOverlay

//searchOverlay.hide();


// Status indicating that search is not active. 
	
var searchStatus = useRef(false);

// If any key is pressed while CMD is not pressed, begin search

// Open and close search when magnifying class or close is tapped
const searchClicked = () =>{
    if (!searchStatus.current) {
            console.log(searchOverlay);
            searchOverlay.style.display = "flex"
            //searchOverlay.show();
            //searchOverlay.find('input').focus();
            searchInput.focus();
			searchStatus.current = true;
      }
    else  {
        searchOverlay.style.display = "none"
        //searchOverlay.hide();
        //searchOverlay.find('input').val('');
        searchInput.textContent = ''
        searchStatus.current = false;
        //searchButton.removeClass("close");

    }
}

const SearchInputKeyUp = (e) =>{
    if (searchStatus) {
        //might have to change the below line of code
        if (!e.target.value) {
            searchOverlay.style.display = "none"
         //searchOverlay.hide();
         //searchOverlay.find('input').val('');
         searchInput.textContent=''
         searchStatus.current = false;
         //searchButton.removeClass("close");
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
        <div>
        <nav>
  <ul>
    <li ref={ref=>searchButton=ref} onClick={()=>searchClicked()} class="search"></li><li><p>Type anywhere (or click the icon) to search.</p></li>
  </ul>
</nav>

<div ref={ref=>searchOverlay=ref}  id="searchOverlay" style={{display:"none"}}>
  
<input ref={ref=>searchInput=ref} onKeyUp={(e)=>SearchInputKeyUp(e)} autofocus type="text" placeholder="Search anything..."/>
  
</div>
    </div>
    )
}