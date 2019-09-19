let limit = 1000;

let width, w;

let sw3 = 0;
let x3, y3;
let arr4 = []
let arry = []

function setup() {
    createCanvas(windowWidth, windowHeight);
    w = windowWidth
    y3 = windowHeight
    let i = 1
    //random sort
    while (limit >= i) { arr4.push(random(1, y3 / 3)); i++; }
}
let j = 0
function draw() {
    if (sw3 == 1) {
        if (j < arr4.length-1) { j++ 
        }else{
            sw3 = 0
            arr4.splice(0,1)
        }
        let minimum = j
        for (let i = j +1; i < arr4.length; i++) {
            if(arr4[i]<arr4[minimum]){
                minimum = i
            }
        }
        arry = [j,minimum]
        if(minimum !== j){
            let temp = arr4[j]
            let temp2 = arr4[minimum]
            arr4[j] = temp2
            arr4[minimum] = temp
        }
    }
    background(10)
    noStroke()
    width = w / arr4.length
    x3 = 0
    fill(255)
    for (let i in arr4) {
        rect(x3, y3 - (arr4[i] * 3), width, arr4[i] * 3)
        x3 += width
    }
    fill(200,0,0)
    for(let i in arry){
        rect(arry[i]*width, y3 - (arry[i] * 3), width, arry[i] * 3)
    }
}