function preload(){
}
let angle=360
function setup() {
  createCanvas(windowWidth, windowHeight+100);
  angleMode(DEGREES)
}
function draw() { 
let x = 100
let y = 0
fill(246,46,45)
translate(windowWidth/2, windowHeight/2)
rotate(angle)
circle(0,0,10)
fill(2,200,250)
translate(x,y)
rotate(angle)

circle(x,y,10)
translate(x,y)
rotate(angle)

circle(x,y,10)
translate(x,y)
rotate(angle)

circle(x,y,10)
translate(x,y)
rotate(angle)

circle(x,y,10)
translate(x,y)
rotate(angle)

circle(x,y,10)
angle+=0.1
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}