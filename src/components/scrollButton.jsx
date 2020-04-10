import React, { Component,useEffect,useState} from 'react';
import "../assets/css/arrow.css"

export const ScrollButton = (props) =>{

    let [refresh,SetRefresh] = useState(0);

    const returnPage = () =>{
        if(props.page==0){
            if(window.screen.width<1024){
                return (
                    <div onClick={()=>props.goCarousel('next-vert')}  style={{position:"absolute",bottom:"2%",width:"100%",height:"4%"}}>
                        <div style={{position:"relative",left:"50%"}}>
                        <i  className="arrow-white down"/>
                        </div>
                    </div>
                )
            }
            else{
                return(
                    <div onClick={()=>props.goCarousel('next')}  style={{display:"flex",position:"absolute",right:"0%",width:"3%",height:"100%"}}>
                        
                        <div style={{position:"relative",top:"50%"}}>
                        <i className="arrow-white right"/>
                            </div>
                    </div>
                )
            }
        }
        else{
            if(window.screen.width<1024){
                return(
                    <div onClick={()=>props.goCarousel('previous-vert')} style={{position:"absolute",bottom:"2%",width:"100%",height:"4%"}}>
                        <div style={{position:"relative",left:"50%"}}>
                        <i  className=" up"/>
                        </div>
                    </div>
                )
            }
            else{
                return(
                    <div onClick={()=>props.goCarousel('previous')} style={{display:"flex",position:"absolute",right:"0%",width:"3%",height:"100%"}}>
                        
                        <div style={{position:"relative",top:"50%"}}>
                        <i className=" left"/>
                            </div>
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