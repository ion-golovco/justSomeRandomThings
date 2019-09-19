let limit = 1000;

let width, w;

let sw4 = 0;
let x4, y4;
let arr5 = []

function setup() {
    createCanvas(windowWidth, windowHeight);
    w = windowWidth
    y4 = windowHeight
    let i = 1
    //random sort
    while (limit >= i) { arr5.push(random(1, y4 / 3)); i++; }
}
let j = 0; i = 1
function draw() {
    if (sw4 == 1) {
        if (i < arr5.length - 1) {
            j = i
            while (j > 0 && arr5[j - 1] > arr5[j]) {
                let temp = arr5[j - 1]
                let temp2 = arr5[j]
                arr5[j - 1] = temp2
                arr5[j] = temp
                j--
            }
        } else { sw4 = 0 }
        i++
    }
    background(10)
    noStroke()
    width = w / arr5.length
    x4 = 0
    fill(255)
    for (let i in arr5) {
        rect(x4, y4 - (arr5[i] * 3), width, arr5[i] * 3)
        x4 += width
    }
}