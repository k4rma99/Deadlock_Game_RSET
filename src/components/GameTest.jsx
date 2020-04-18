import React, { Component,useRef,useState,useEffect } from 'react';
import "../assets/css/GameTest.css"

export const GameTest = () =>{

    //var t = gsap.timeline();
    var [content,setContent] = useState({
        isLoading:false,
        data:[
        "Installing device drivers",
        "Running cortex module"
    ]})

    var reqId = useRef(null);

    var input = useRef(null);
    var cursor = useRef(null);

      window.addEventListener("keydown",(e)=>{
        if(input){

          if (!e) e = window.event;

          console.log(e)
          if (!e.metaKey) {
            if(e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 48 && e.keyCode <= 57) {
                    input.textContent = input.textContent + e.key
            }
            else if(e.keyCode == 8){
                input.textContent = input.textContent.substring(0,input.textContent.length-1)
            }
            else if(e.code == "Space"){
                input.textContent = input.textContent + " "
            }
            else if(e.keyCode == 13){
                    var c = content.data
                    c.push(input.textContent)
                    input.textContent = ""
                    console.log(c)
                    setContent({
                        isLoading:true,
                        data:c
                    })
            }
          }
        }
      })


const a = (num) =>{
   if(num == 1){
       
       if(!content.isLoading){
           if(cursor){
        cursor?cursor.style.visibility='hidden':console.log("");
           }
        setTimeout(()=>{
           reqId.current = requestAnimationFrame(()=>a(-1))
         
       },800)
       }
  }
  else{
    if(!content.isLoading){
        if(cursor){
        cursor?cursor.style.visibility='visible':console.log("");
           }
        setTimeout(()=>{
            reqId.current = requestAnimationFrame(()=>a(1))
          
        },800)
    }
  }
}

useEffect(() => {
    if(content.isLoading){
        setContent({
            isLoading:false,
            data:content.data
        })
    }
    else{
        reqId.current = requestAnimationFrame(()=>a(1));
    }
    return () => cancelAnimationFrame(reqId.current);
  });
 

    return(
        <div className="main-console">
  <div className="input-area-answer">
      {
          content.data.map((val,index)=>{
                    return(<div style={{display:"flex",flexDirection:"row"}}>
                    <span className="cmd-text">
                    root@jacob:~/Deadlock$
                  </span>
                    &nbsp;
                  <span id="answer-text" className="answer-text">
                            {val}
                 </span>
                        
                  </div>)
              })
      }
      <div style={{display:"flex",flexDirection:"row"}}>
              <span className="cmd-text">
              root@jacob:~/Deadlock$
            </span>
              &nbsp;
            <span ref={ref=>input=ref} id="answer-text" className="answer-text">
           </span>
              <div ref={ref=>cursor=ref} id="cursor" className="cursor">

              </div>
          </div>
  </div>
</div>
    )
}