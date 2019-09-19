let limit = 5366;

let time = 1

let width, w;
let sw2 = 0;
let x2, y2;
let arrayV = []
let arr3 = []
let pivoter 
let states = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    w = windowWidth
    y2 = windowHeight
    let i = 1
    //random sort
        while (limit >= i) {arr3.push(random(1, y2 / 3));i++;}
    //invers sort
        //while (limit >= i) {arr3.push((i/limit)*y2/3);i++;} arr3.reverse()
        arrayV = arr3
}
function draw() {
    arrayV = arr3
    if(sw2 == 1){
        quickSort(arr3, 0, arr3.length - 1)
    }
    background(10)
    noStroke()
    fill(255)
    width = w / arr3.length
    x2 = 0
        for (let i in arrayV) {
            if (states[i] == 0) {
                fill(200,0,0);
              } else if (states[i] == 1) {
                fill(100);
              } else {
                fill(255);
              }
            rect(x2, y2 - (arrayV[i] * 3), width, arrayV[i] * 3)
            x2 += width
        }
}
async function swap(arr, a, b) {
    sw2 = 0
    await sleep(time);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }
async function partition(arr, start, end) {
    for (let i = start; i < end; i++) {
      states[i] = 1;
    }
    let pivotValue = arr[end];
    let pivotIndex = start;
    states[pivotIndex] = 0;
    for (let i = start; i < end; i++) {
      if (arr[i] < pivotValue) {
        swap(arr, i, pivotIndex);
        states[pivotIndex] = -1;
        pivotIndex++;
        states[pivotIndex] = 0;
      }
    }
    await swap(arr, pivotIndex, end);
  
    for (let i = start; i < end; i++) {
      if (i != pivotIndex) {
        states[i] = -1;
      }
    }
    return pivotIndex;
  }
async function quickSort(arr, start, end) {
    if (start >= end) {
      return;
    }
    let index = await partition(arr, start, end);
    states[index] = -1;
    await Promise.all([
      quickSort(arr, start, index - 1),
      quickSort(arr, index + 1, end)
    ]);
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms))
}

