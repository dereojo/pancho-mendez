/**
 *
 * primera prueba
 */


let n = 99;
let N;

function setup() {
let htmlElem = document.getElementById('p5');
let w = htmlElem.offsetWidth;
  let sketch = createCanvas(w, windowHeight-10);
  sketch.parent("p5");
  N = [];
  for(let i = 0; i < n; i++){
    N.push(new Note());
  }
}

class Note{
    constructor(){
        this.w = 11;
        this.from = random(0, height/2);
        this.to = random(this.from + this.w, height/2);
        this.h = this.to - this.from;
        this.x = floor(random(width/this.w))*this.w;
        this.y = random(height - this.h) + height;
        this.step = random(.2, 1.2);
    }

    go(){
        this.draw();
        this.move();
    }

    draw(){
        noStroke();
        fill("#FFFC");
        rect(this.x, this.y, this.w, this.h);
    }

    move(){
        this.y -= this.step;
    }
}

function draw() {
  clear();
  for(let i = 0; i < N.length; i++){
    N[i].go();
  }

  for(let i = 0; i < N.length; i++){
    if(N[i].y +  N[i].h < 0){
      N.splice(i, 1);
      N.push(new Note())
    }
  }
}
