
let limit = 1000000
let i = 1
let arr = []
//random sort
function setup(){
	console.log("Start timer if you want,this is the start of the sorting.")
    console.log(Sort(arr))
}
function draw(){}
while (limit >= i) {arr.push(Math.random()*limit); i++; }
function Sort(arr) {
    if (arr.length <= 1) {
        return arr;
    } else {
        let left = [], right = [], array = [];
        let pi = arr.pop()
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] <= pi) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        sw = 0
        return array.concat(Sort(left),pi,Sort(right));
    }
}
