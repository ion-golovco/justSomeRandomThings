function preload(){
}
let input;
let angle=0
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  input = createInput(6985)
  input.position(110,235)
}
function draw() { function formatDuration(seconds) {
    if(seconds==0){return "now"}
    let min = 0
    let hours = 0
    let days = 0
    let years = 0
    for (i = 0; i < 1; i += 1) {
        if (seconds % 60 < 60) {
            min += Math.floor(seconds / 60)
            seconds = seconds % 60
        } if (min % 60 < 60) {
            hours += Math.floor(min / 60)
            min = min % 60
        } if (hours % 24 < 24) {
            days += Math.floor(hours / 24)
            hours = hours % 24
        } if (days % 365 < 365) {
            years += Math.floor(days / 365)
            days = days % 365
        }
    }
    let acc = [seconds, min, hours, days, years]
    let res = []
    let res1 = []
    let curr = ""
    let o = ["seconds", "minutes", "hours", "days", "years"]
    let s = ["second", "minute", "hour", "day", "year"]
    for (i = acc.length; i > -1; i -= 1) {
        if (acc[i] > 0) {
            if (acc[i] == 1) { curr = s[i] }
            if (acc[i] > 1) { curr = o[i] }
            res.push(acc[i] + " " + curr)
        }
    }
    for (i = 0; i < res.length; i += 1) {
        let curr1 = (i == res.length - 2?" and ":", ")
        res1.push(res[i]+curr1)
    }
    res1 = res1.join("")
    res1 = res1.slice(0,res1.length-2)
    return res1.toString()
}

  let a = formatDuration(input.value())
  background(23)
  fill(256)
  rect(0,0,width,height/13)
  fill(23)
  text("Human readable time",width/2-200,45)
  fill(244)
  textSize(40)
  text(a,120,150)
  rect(100,220,300,height/15)
  
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

