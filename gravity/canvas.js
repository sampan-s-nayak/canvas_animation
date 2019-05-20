const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//es6 class syntax
class Circle{
  constructor(x,y,dx,dy,radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.gravity = 1;
  }
  draw(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    c.fillStyle = "red";
    c.strokeStyle = "black";
    c.stroke();
    c.fill();
  }
  update(){
    if(this.y + this.radius > window.innerHeight || this.y - this.radius < 0){
      //0.9 is the friction value,choose higher for more bouncy effect
      this.dy = -this.dy *0.9;
    }
    else{
      //acceleration is change in velocity
      this.dy += this.gravity;
    }

    if(this.x + this.radius > window.innerHeight || this.x - this.radius < 0){
      this.dx = -this.dx;
    }
    this.y += this.dy;
    this.x += this.dx;
    console.log(this.y);
    this.draw();
  }
}
let circle;
function onLoad(){
  circle = [];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  for(let i=0;i<100;i++){
    let radius = 20;
    let x = Math.random()*(canvas.width - 2*radius)+radius;
    let y = Math.random()*(canvas.height - 2*radius)+radius;
    let dx = (Math.random()-0.5)*5;
    let dy = (Math.random()-0.5)*5;
    circle.push(new Circle(x,y,dx,dy,radius));
  }
  animate();
}
window.addEventListener('resize',onLoad);
window.addEventListener('load',onLoad);

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,window.innerWidth,window.innerHeight);
  circle.forEach(circ => {
    circ.update();
  });
}
