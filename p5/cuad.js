/**
 *
 * navv
 */


let n = 222;
let globalWidth = 3;
let N;
let data;
let notes; 

function preload(){
  data = loadJSON("../data.json", gotData, 'json');
}

function gotData(response) {
  print("gotData!");
  notes = [];
}



function setup() {
let htmlElem = document.getElementById('p5');
let w = htmlElem.offsetWidth;
  let sketch = createCanvas(w, windowHeight-7);
  sketch.parent("p5");
  regen();
}

function regen(){
  N = [];
  for(let i = 0; i < n; i++){
    N.push(new Note());
  }
  strokeCap(SQUARE);
  notes = [];
  buildNotes(data);
}

function buildNotes(data){
  for(let key in data){
   let num = round(random(N.length - 1));
   let cant = data.length;
   let th = round(random(cant - 1));
   let n = N[num];
   n.x = 0;
   n.w = width;
   n.h = globalWidth * 5;
   n.color = color(0);
   n.title = data[key].title;
   n.date = data[key].date;
   n.video = data[key].video;
   n.text = data[key].text;
   notes.push(n);
  }
  console.log({notes});
 }

class Note{
    constructor(data){
        this.w = globalWidth;
        this.from = random(0, height/2);
        this.to = random(this.from + this.w, this.from + height/4);
        this.h = this.to - this.from;
        this.x = floor(random(width/this.w))*this.w;
        this.y = random(-this.h/2, height);
        this.step = random(.2, 1.2);
        this.over = false;
        this.color = color(random(255),random(255),random(255));
        this.title = "";
    }

    go(){
        this.move();
        this.draw(); 
    }

    draw(){
        noStroke();
        fill("#FFFA");
        
        if(this.over){
          stroke(this.color);
          //strokeWeight(this.w/2);
          // line(this.x - this.w/4, this.y, this.x - this.w/4, this.y+this.h);
          fill(this.color);
          rect(this.x, this.y, this.w, this.h);
          strokeWeight(1);
          line(this.x + this.w/2, this.y + this.w/2, this.x + this.w/2, this.y + this.h - this.w/2);
        }

        rect(this.x, this.y, this.w, this.h);
    }

    move(){
        this.y -= this.step;
        if(mouseX > this.x && mouseX < this.x+this.w
          && mouseY > this.y && mouseY < this.y+this.h){
            this.over = true;
          } else {
            this.over = false;
          }
        if(this.y + this.h < 0){
          this.y = height;
        }
    }
}

function draw() {
  clear();
 for(let n of N){
  n.go();
 }

 for(let n of notes){
  if(n.over){
    let fontSize = 15;
    textFont("Futura PT");
    textSize(fontSize);
    fill(0);
    text(n.title, n.x, n.y + n.h + fontSize, width/4, 200);
  }
 }
}

function mousePressed(){
  background(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  regen();
}