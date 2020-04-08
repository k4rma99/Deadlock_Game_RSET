import React, { Component,useEffect,useState} from 'react';


export const ScrollButton = (props) =>{

    let [refresh,SetRefresh] = useState(0);

    const returnPage = () =>{
        if(props.page==0){
            if(window.screen.width<1024){
                return (
                    <div onClick={()=>{props.goCarousel('next-vert')}} style={{position:"fixed",bottom:"0%",width:"100%",height:"4%"}}>
                        <i class="arrow-white down"/>
                    </div>
                )
            }
            else{
                return(
                    <div onClick={()=>{props.goCarousel('next')}} style={{position:"fixed",right:"0%",width:"3%",height:"100%"}}>
                        <i class="arrow-white right"/>
                    </div>
                )
            }
        }
        else{
            if(window.screen.width<1024){
                return(
                    <div onClick={()=>{props.goCarousel('previous-vert')}} style={{position:"absolute",bottom:"0%",width:"100%",height:"4%"}}>
                        <i  className=" up"/>
                    </div>
                )
            }
            else{
                return(
                    <div onClick={()=>{props.goCarousel('previous')}} style={{position:"absolute",right:"0%",width:"3%",height:"100%"}}>
                        <i  class="left"/>
                    </div>
                )
            }
        }
    }

    const refreshPage = () =>{
        props.getCarouselPositions();
    }

    useEffect(() => {
        const f = () => {
            props.getCarouselPositions();
            window.addEventListener('resize', refreshPage);
        }
        f()
    })

    return(
            returnPage()
    )
}