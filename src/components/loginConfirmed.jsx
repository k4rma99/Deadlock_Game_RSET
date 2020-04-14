import React,{Component,useEffect} from "react"
import {TweenMax,TimelineMax,Circ,Power2} from "gsap/all"
import "../assets/css/loginConfirmed.css"

// https://codepen.io/balapa/pen/VvVebO

export const Chicken = () => {

    let mainCtr = null,//$("#main-ctr"),
        hello = null,//$(".hello"),
        eyeLeft = null,//$("#eye-left"),
        eyeRight = null,//$("#eye-right"),
        eyeToLeft = null,//$("#eye-to-left"),
        eyeToRight = null,//$("#eye-to-right"),
        wink = null,//$("#wink"),
        smileUp = null,//$("#smile-up"),
        smileDown = null,//$("#smile-down"),
        smile = null;//$("#smile");    

    useEffect(()=>{
        const f = ()=> {

            var tl = new TimelineMax({
                repeat: -1,
                repeatDelay: .3,
                delay: .3
                });

            TweenMax.set([mainCtr, hello], {
                opacity: 0
                });
            
                tl
                .to(mainCtr, .3, {
                    opacity: 1
                })
                .to(smileDown, .3, {
                    morphSVG: "#smile-up"
                })
                .to(smile, .3, {
                    rotation: -30,
                    transformOrigin: "center center",
                    ease: Circ.ease
                })
                .to(smile, .9, {
                    rotation: 900,
                    transformOrigin: "center center",
                    ease: Circ.easeInOut
                })
                .to(eyeLeft, .3, {
                    morphSVG: "#eye-to-left",
                    ease: Power2.ease
                }, "-=.3")
                .to(eyeRight, .3, {
                    morphSVG: "#eye-to-right",
                    ease: Power2.ease
                }, "-=.3")
                .to(eyeRight, .1, {
                    scaleY: .25,
                    transformOrigin: "center center"
                })
                .to(eyeRight, .1, {
                    scaleY: 1
                })
                .to(hello, .3, {
                    opacity: 1
                }, "-=.3")
                .to(mainCtr, .6, {
                    delay: 1,
                    opacity: 0
                })

        }
        f();
    })


    return(
        <div ref={ref=>mainCtr=ref} id="main-ctr">
            <svg xmlns="http://www.w3.org/2000/svg" width="294" height="241" viewBox="0 0 294 241">
                <g id="group" fill="none" fill-rule="evenodd">
                    <g ref={ref=>smile=ref} id="smile">
                        <path ref={ref=>smileUp=ref} id="smile-up" stroke="#FFF" stroke-width="30" d="M238.797 75.04C222.935 40.772 188.243 17 148 17c-39.62 0-73.857 23.04-90.046 56.453" stroke-linecap="round"/>
                        <path ref ={ref=>smileDown=ref} id="smile-down" stroke="#FFF" stroke-width="30" d="M238.843 166c-15.863 34.268-50.554 58.04-90.797 58.04-39.62 0-73.857-23.04-90.046-56.453" stroke-linecap="round"/>
                        <path ref ={ref=>wink=ref} id="bg" fill="#FFF" d="M43 2h211v237H43z" opacity=".1"/>
                    </g>

                    <path ref={ref=>eyeLeft=ref} id="eye-left" fill="#FFF" d="M148 173c29.27 0 53-23.73 53-53s-23.73-53-53-53c-4.956 0-9.753.68-14.303 1.952C111.374 75.194 95 95.685 95 120c0 29.27 23.73 53 53 53z"/>
                    <path ref={ref=>eyeRight=ref} id="eye-right" fill="#FFF" d="M148 173c29.27 0 53-23.73 53-53s-23.73-53-53-53c-4.016 0-7.927.447-11.687 1.293C112.665 73.615 95 94.745 95 120c0 29.27 23.73 53 53 53z"/>
                    <path ref={ref=>eyeToLeft=ref} id="eye-to-left" fill="#FFF" d="M106 143c12.15 0 22-9.85 22-22s-9.85-22-22-22c-2.028 0-3.992.274-5.857.788C90.836 102.352 84 110.878 84 121c0 12.15 9.85 22 22 22z"/>
                    <path ref={ref=>eyeToRight = ref} id="eye-to-right" fill="#FFF" d="M187 143c12.15 0 22-9.85 22-22s-9.85-22-22-22c-3.286 0-6.404.72-9.204 2.012C170.242 104.496 165 112.136 165 121c0 12.15 9.85 22 22 22z"/>
                </g>
            </svg>
            <h1 ref={ref=>hello = ref} class="hello">Hello, Bhakti!</h1>
        </div>
    )


}