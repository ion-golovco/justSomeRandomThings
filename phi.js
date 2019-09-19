function setup() {
    createCanvas(windowWidth, windowHeight / 2);
    w = windowWidth
    y2 = windowHeight
    background(51)
    frameRate(60)
}
let fix = 2, inc = 0.0001
let phi = 1.618033988749895
let phi2 = (phi - 1) * -1

let allow = 1

let speed = 100
let acceleration = 0

let x = 1, scope = phi
let array = []

for (let i = 0; i < 20; i++) {
    array.push(Math.pow(phi - 0.2, i))
}

function draw() {
    {
        translate(w / 4, 0)
        background(210)
        noStroke()
        textAlign(CENTER)
    }
    
    acceleration = array[ceil(abs(x)) - 1] ? array[ceil(abs(x)) - 1] : array[array.length - 1]

    let x1 = (x / (phi * 2)) * w / 4
    let y1 = y2 / 4
    let x2 = (phi / (phi * 2)) * w / 4
    let x3 = (scope / (phi * 2)) * w / 4
    //let x4 = (phi2 / (phi * 2)) * w / 4
    {
        stroke(0)
        line(0 - w / 2, y1 - 1, w, y1 - 1)
        noStroke()
    }
    for (let i = -100; i < 100; i++) {
        fill(51)
        circle((i / (phi * 4)) * w / 4, y1, 5)
        circle((i / (phi * 8)) * w / 4, y1, 3)
        circle((i / (phi * 2)) * w / 4, y1, 10)
    }
    {
        fill(20, 170, 20)
        circle(x2, y1, 3)
        text(phi, x2, y1 + 30)
        //circle(x4, y1, 3)
        //text(phi2, x4, y1 + 30)
        fill(250, 250, 10)
        stroke(250, 250, 10)
        rect(x3 - 1.6, y1 - 15, 2, 30)
        noStroke()
    }

    if (scope == phi && allow == 1) {
        allow = 2
    }
    if (allow == 1) {
        for (let i = 0; i < acceleration * speed; i++) {
            if (x.toFixed(fix) == scope.toFixed(fix)) { scope = 1 + (1 / scope) }
            if (x > scope) { x = minusIncremental(x, inc) }
            if (x < scope) { x = incremental(x, inc) }
            {
                fill(255, 0, 0)
                ellipse(x1, y1, 5, 5)
                stroke(255, 0, 0)
                line(x1 - 0.75, y1 + 15, x1, y1 - 18)
                noStroke()
            }
        }
    }
    if (allow == 2) {
        console.log(allow)
        allow = 0
        randomm()
        setTimeout(wait, 1200)
    }
    for (let i = -10; i < 18; i++) {
        let x2 = (i / (phi * 2)) * w / 4
        {
            fill(255)
            text(i, x2, y2 / 4 + 5)
        }
    }
    {
        fill(51)
        textAlign(LEFT)
        text("Curent : " + x.toFixed(fix), 10 - w / 2, 20)
        text("Scope : " + scope.toFixed(fix), 10 - w / 2, 40)
    }
}
function incremental(n, inc) {
    return n = n + inc
}
function minusIncremental(n, inc) {
    return n = n - inc
}
function wait() {
    x = scope
    allow = 1
}
function randomm() {
    scope = random(-5, 5)
}