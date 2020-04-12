import React, { useEffect,useState } from 'react';

export const BlackHole = () =>{

    // Global Animation Setting
window.requestAnimFrame = 
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback) {
  window.setTimeout(callback, 1000/60);
};

// Global Canvas Setting
var canvas;
var ctx;


// Particles Around the Parent
function Particle(x, y, distance) {
this.angle = Math.random() * 2 * Math.PI;
this.radius = Math.random() ; 
this.opacity =  (Math.random()*5 + 2)/10;
this.distance = (1/this.opacity)*distance;
this.speed = this.distance*0.00001;

this.position = {
  x: x + this.distance * Math.cos(this.angle),
  y: y + this.distance * Math.sin(this.angle)
};

this.draw = function() {
  ctx.fillStyle = "rgba(255,255,255," + this.opacity + ")";
  ctx.beginPath();
  ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
  //ctx.bezierCurveTo(0, 0,0, document.getElementById('particle').clientHeight, 10, 10)
  ctx.fill();
  ctx.closePath();
}
this.update = function() {
  this.angle += this.speed; 
  this.position = {
    x: x + this.distance * Math.cos(this.angle)*2,
    y: y + this.distance * Math.sin(this.angle)*2
  };
  this.draw();
}
}

function Emitter(x, y) {
var c=x;
if(window.screen.width<1024){
    c = 0;
}
this.position = { x: c, y: y+20};
this.radius = 100;
this.count = 3000;
this.particles = [];

for(var i=0; i< this.count; i ++ ){
  this.particles.push(new Particle(this.position.x, this.position.y, this.radius));
}
}


Emitter.prototype = {
draw: function() {
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.beginPath();
  ctx.arc(this.position.x, this.position.y, this.radius , 0, Math.PI * 1.5, false);
  ctx.fill();
  ctx.closePath();    
},
update: function() {  
 for(var i=0; i< this.count; i++) {
   this.particles[i].update();
 }
  this.draw(); 
}
}


var emitter;

function loop() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
emitter.update();
window.requestAnimFrame(loop);
}


    useEffect(()=>{
        const f = () =>{
            canvas = document.getElementById('particle');
            ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            emitter = new Emitter(canvas.width/2, canvas.height/2);
            loop();
        }
        f();
    })
    return(
        <canvas style={{zIndex:-1,position:"absolute",width:"100%",height:"100%",top:"0"}} id="particle"></canvas>
    )
}