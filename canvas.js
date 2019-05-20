let canvas = document.querySelector("canvas");
// let width = window.innerWidth;
// let height = window.innerHeight;
let c = canvas.getContext("2d");
let maxRad = 45;
let minRad = 1;
let colors = ["rgba(6, 19, 36, 0.91)","#3B658F","#F28927","#F27222","rgba(217, 55, 43, 0.91)","rgba(133, 125, 125, 0.94)"];
let mouse = {
  x:undefined,
  y:undefined
}

function getCordinates(e){
  mouse.x = e.x;
  mouse.y = e.y;
}
window.addEventListener("mousemove",getCordinates);

function Circle(x,y,dx,dy,radius){
  this.radius = radius;
  this.temp = radius;
  this.color = colors[Math.floor(Math.random()*6)];
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.draw = function (){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
    c.fillStyle = this.color;
    c.fill();
  }
  this.animate = function (){
    c.beginPath();
    if(this.x + this.radius > window.innerWidth || this.x - this.radius < 0 )
      {
        this.dx = -this.dx;
      }
    if(this.y + this.radius > window.innerHeight || this.y - this.radius < 0 )
      {
        this.dy = -this.dy;
      }
    this.x += this.dx;
    this.y += this.dy;
    c.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
    this.draw();
    let offsetX = this.x - mouse.x;
    let offsetY = this.y - mouse.y;
    if( offsetX < 50 && offsetX > -50 && offsetY < 50 && offsetY > -50)
      {
        if(this.radius < maxRad)
        {
          this.radius += 1;
        }
      }
    else if(this.radius > this.temp){
      // if radius is in decimal values , -1 makes it a negative no
      if(this.radius > minRad){
        this.radius--;
      }
    }
  }
}
let circle = [];
function createCircles(e){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  circle = [];
  for(let i=0;i<500;i++){
      let rad = (Math.random()*5);
      let x = Math.random() * (window.innerWidth - 2*rad) + rad ;
      let y = Math.random() * (window.innerHeight - 2*rad) + rad;
      let dx = (Math.random() - 0.5)*4;
      let dy = (Math.random() - 0.5)*4;
      let cir = new Circle(x,y,dx,dy,rad);
      circle.push(cir);
  }
}

window.addEventListener('resize',createCircles);
window.addEventListener('load',createCircles);

frame();
function frame(){
  requestAnimationFrame(frame);
  c.clearRect(0,0,window.innerWidth,window.innerHeight);
  for(let i=0;i<circle.length;i++){
       circle[i].animate();
  }
}
