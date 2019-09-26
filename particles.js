let w, h
//particles
let particleLimit = 1000;
let particles = [];
//masses
let mass = [];
//mass ranges (height)
let mR = []
//start variables
let xStart = -3;
let yStart;
//particle trough mass field range (amplified by mass)
//             r1 r2 r3 r4
//              V  V  V  V
let ptmfr = [20, 10, 5, 0.2, 0.1]
//r1 = a+ or a- && v-
//r2 = a++ or a-- && v++
//r3 = a+++ or a--- && v+++
//r4 = orbit && v++

//default Velocity Range [5,10] or [4,8]
let dVr = [4, 10]
//default Angle Range
let dAr = [0, 0]
//friction constant
let fr = 0.01
//angle increment
let inc = .07
//historyLimit
let hiL = 2
//y range
let yrange = [48, 52]
let x, y;
function setup() {
    createCanvas(windowWidth, windowHeight - 4)
    w = windowWidth
    h = windowHeight
    yStart = (h / 2) - 1
    x = w / 4
    y = h / 2
    createParticles()
    angleMode(DEGREES)
    //mass.push(new Mass(w / 2, h/2, 10))
    //mass.push(new Mass(x, y, 50, 1))
    mass.push(new Mass(x,y, 20, -1))
    mass.push(new Mass(x*3, h / 2, 20, -1))
    massRange() 
}

let np, nn = 0, na = [];
function draw() {
    //x = mouseX
    // y = mouseY
    //mass[0].y = y
    //mass[0].x = x
    massRange()
    if (mR.length > mass.length) {
        mR.pop()
    }
    if (np == 1) {
        for (let i in na) {

                particles[na[i][0]].a < na[i][1] ? particles[na[i][0]].a += inc * mass[0].n
                    : particles[na[i][0]].a -= inc * mass[0].n
                if (particles[na[i][0]].x < mass[0].x) {
                    na.splice(i, 1)
                    nn = 0
                nn++
            }
        }
    }
    background(0)
    noStroke()
    for (let i of particles) {
        i.history.push([i.x, i.y])
        i.u !== true ? fill(i.v * 10, 120, i.a * 20) : 0//fill(205, 0, 0)
        i.check()
        i.go();
        i.reset();
    }
    for (let i of particles) {
        for (let j in mass) {
            if (
                i.x > mass[j].x
                && i.y < mR[j][0]
                && i.y > mR[j][9]
                && i.x < mass[j].x + 10
            ) {
                particleEffect(i, mR[j])
            }
        }
    }
    for (let i of particles) {
        push()

        rotate(i.a)
        //fill(160, (255 / h) * i.y, i.a * 20, (2550 / i.history.length) * i)
        //circle(i.x, i.y, 2)
        beginShape();
        for (let j in i.history) {
            strokeWeight(2)
            stroke(160, (255 / h) * i.y, i.a * 20, (2550 / i.history.length) * j)
            //fill(160, (255 / h) * i.y, i.a * 20, (2550 / i.history.length) )//* j)
            //i.u == true ?stroke(120,0,0):0
            //circle(i.x,i.y,2)
            vertex(i.history[j][0], i.history[j][1])
        }
        endShape();
        pop()
    }
    for (let j of mass) {
        fill(51, 50)
        circle(j.x, j.y, j.m * 2)
    }
} class Particle {
    constructor(_x, _y, _v, _a, _i, _d) {
        this.x = _x
        this.y = _y
        this.a = _a
        this.v = _v
        this.i = _i
        this.u = false
        this.d = 1
        this.timer = 10
        this.history = []
    }
    reset() {
        if (this.u == true) {
            this.timer -= 1
        }
        if (this.timer == 0) {
            this.u = false
            this.timer = 10
        }
        if (this.history.length > hiL) {
            this.history.shift()
        }
    }
    go() {
        this.x += this.v * this.d
    }
    check() {
        if (
            this.x > w + 100 ||
            this.y > h + 100 ||
            this.x < -10 ||
            this.y < -10
        ) {
            deleteParticle(this.i)
        } if (this.v < 0.1) {
            deleteParticle(this.i)
        }
    }
    massEffect(n) {
        rFullEffect(n, this.i)
    }

}
class Mass {
    constructor(_x, _y, _m, _n) {
        this.x = _x
        this.y = _y
        this.m = _m
        this.n = _n
    }
}
function deleteParticle(index) {
    particles[index] = new Particle(
        xStart,
        random(yrange[0] * (h / 100), yrange[1] * (h / 100)), // or yStart
        random(dVr[0], dVr[1]),
        random(dAr[0], dAr[1]),
        index
    );
}
function createParticles() {
    for (let i = 0; i < particleLimit; i++) {
        particles.push(new Particle(
            xStart,
            random(yrange[0] * (h / 100), yrange[1] * (h / 100)),
            random(dVr[0], dVr[1]),
            random(dAr[0], dAr[1]),
            i //particle index
        ));
    }
}
function massRange() {
    let mrTemp = []
    let temp = []
    for (let i of mass) {
        let curent = []
        for (let j of ptmfr) {
            curent.push(j * i.m)
        }
        temp.push(i.y)
        mrTemp.push(curent.concat(rAra(curent)));
    }
    for (let i in mrTemp) {
        aAra(mrTemp[i], temp[i])
    }
}
function rAra(a) {
    return a.map((a) => a * -1).reverse()
}
function aAra(a, y) {
    for (let i = 0; i < a.length; i++) {
        a[i] = a[i] + y
    }
    mR.push(a)
}
function particleEffect(p, m) {
    let a = []
    for (let i of m) {
        a.push(abs(p.y - i))
    }
    let ios = indexOfSmallest(a)
    p.massEffect(ios)
}

function indexOfSmallest(a) {
    return a.indexOf(Math.min.apply(Math, a));
}
function rFullEffect(n, index) {
    if (particles[index].u == false) {
        if (n == 0) {//r1
            incremental(particles[index].i, particles[index].a - 10)
            particles[index].v -= 0.5
        } if (n == 1) {//r2
            incremental(particles[index].i, particles[index].a - 15)
            particles[index].v += 0.05
        } if (n == 2) {//r3
            incremental(particles[index].i, particles[index].a - 20)
            particles[index].v += 0.1
        } if (n == 3) {//r4
            incremental(particles[index].i, particles[index].a - 40)
            particles[index].v += 0.2
        } if (n == 4) {
           // incremental(particles[index].i, particles[index].a - 120)
            particles[index].v += 0.3
            // particles[index].d = -1
        } if (n == 5) {
            //incremental(particles[index].i, particles[index].a + 120)
            particles[index].v += 0.3
            //particles[index].d = -1
        } if (n == 6) {
            incremental(particles[index].i, particles[index].a + 40)
            particles[index].v += 0.2
        } if (n == 7) {
            incremental(particles[index].i, particles[index].a + 20)
            particles[index].v += 0.1
        } if (n == 8) {
            incremental(particles[index].i, particles[index].a + 15)
            particles[index].v += 0.05
        } if (n == 9) {
            incremental(particles[index].i, particles[index].a + 10)
            particles[index].v -= 0.5
        }
        particles[index].u = true
    }
}
//r1 = a+ or a- && v-
//r2 = a++ or a-- && v+
//r3 = a+++ or a--- && v++
//r4 = orbit && v+++
function incremental(v, ev) {
    na.push([v, ev])
    np = 1
}