/**
 *
 * navv
 */


let n = 222;
let N;

function setup() {
let htmlElem = document.getElementById('p5');
let w = htmlElem.offsetWidth;
  let sketch = createCanvas(w, windowHeight-7);
  sketch.parent("p5");
  N = [];
  for(let i = 0; i < n; i++){
    N.push(new Note());
  }
  strokeCap(SQUARE);
}

class Note{
    constructor(){
        this.w = 3;
        this.from = random(0, height/2);
        this.to = random(this.from + this.w, this.from + height/4);
        this.h = this.to - this.from;
        this.x = floor(random(width/this.w))*this.w;
        this.y = random(-this.h/2, height);
        this.step = random(.2, 1.2);
        this.over = false;
        this.color = color(random(255),random(255),random(255));
    }

    go(){
        this.move();
        this.draw(); 
    }

    draw(){

        noStroke();
        fill("#FFFA");
        rect(this.x, this.y, this.w, this.h);

        if(this.over){
          stroke(this.color);//stroke("#E4752D");
          strokeWeight(this.w/2);
          // line(this.x - this.w/4, this.y, this.x - this.w/4, this.y+this.h);
          noFill();
          rect(this.x, this.y, this.w, this.h);
          strokeWeight(1);
          line(this.x + this.w/2, this.y + this.w/2, this.x + this.w/2, this.y + this.h - this.w/2);
        }
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
}
