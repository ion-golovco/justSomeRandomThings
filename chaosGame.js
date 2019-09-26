let w, h;
let points = []
let pointL = 5
let curent, previous;
let sp = 5000
let colors = []
let per = 0.5
let total = 0
//cool combinatons 
// 6 n + 2/3 per
// 5n + 5/8 per
function setup() {
    createCanvas(windowWidth, windowHeight)
    w = windowWidth
    h = windowHeight
    translate(w / 2, h / 2)
    background(0)
    for (let i = 0; i < pointL; i++) {
        let angle = i * TWO_PI / pointL
        let v = p5.Vector.fromAngle(angle)
        v.mult(h / 2)
        v.z = i
        points.push(v)
    }
    for(let i =0;i<pointL;i++){
        colors.push([random(255),random(255),random(255)])
    }
    curent = createVector(random(w), random(h))
    frameRate(30)
    stroke(255)
    for (let i of points) { circle(i.x, i.y, 2) }
}

function draw() {
    {
        translate(w / 2, h / 2)
        strokeWeight(1.1)
    }
    total +=sp
    if(frameCount%31==0){
        console.log(total)   
    }
    for (let i = 0; i < sp; i++) {
        let next = random(points)
        for(let i in colors){
            if(next.z == i){
                stroke(colors[i],100)
            }
        }
       if (next !== previous) { //pentagon1
            curent.x = lerp(curent.x, next.x, per)
            curent.y = lerp(curent.y, next.y, per)
            point(curent.x, curent.y)
            
            previous = next
        }
    }
    
}
