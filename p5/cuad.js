/**
 *
 * navv
 */


let n = 222;
let globalWidth = 3;
let N;
let data;
let notes;

let content;
let divP5;
let acercaBtn;

function preload() {
  data = loadJSON("data.json", gotData, 'json');
}

function gotData(response) {
  print("gotData!");
  notes = [];
}

function setup() {
  content = document.getElementById('content');
  acercaBtn = document.getElementById('acerca-btn');
  console.log({acercaBtn});
  acercaBtn.onmousedown = function (){
    let strings = loadStrings("acerca.html");
    print("strings = " + strings);
    print(strings)
    print("length = "+strings.length);
    document.getElementById('content').innerHTML = "";
    for(let i = 0; i < strings.length; i++){
      print(strings[i]);
    }
  };
  regen();
}

function regen() {
  divP5 = document.getElementById('p5');
  let w = divP5.offsetWidth;
  let sketch = createCanvas(w, windowHeight - 7);
  sketch.parent(divP5);
  N = [];
  for (let i = 0; i < n; i++) {
    N.push(new Note());
  }
  strokeCap(SQUARE);
  notes = [];
  buildNotes(data);
}

function buildNotes(data) {
  for (let key in data) {
    let num = round(random(N.length - 1));
    let cant = data.length;
    let th = round(random(cant - 1));
    let n = N[num];
    n.x = (width / 10) * 1;
    n.w = (width / 10) * 8;
    n.h = 99;
    n.colorOver = color(0, 140);
    n.color = color(0, 30);
    n.title = data[key].title;
    n.date = data[key].date;
    n.video = data[key].video;
    n.image = data[key].img;
    n.text = data[key].text;
    n.index = num;
    notes.push(n);
  }
  console.log({
    notes
  });
}

class Note {
  constructor(data) {
    this.w = globalWidth;
    this.from = random(0, height / 2);
    this.to = random(this.from + this.w, this.from + height / 4);
    this.h = this.to - this.from;
    this.x = floor(random(width / this.w)) * this.w;
    this.y = random(-this.h / 2, height);
    this.step = random(.1, .8);
    this.over = false;
    this.color = "#FFFA";
    this.colorOver = color(random(255), random(255), random(255));
    this.title = "";
  }

  go() {
    this.move();
    this.draw();
  }

  draw() {
    noStroke();
    fill(this.color);

    if (this.over) {
      fill(this.colorOver);
      rect(this.x, this.y, this.w, this.h);
      strokeWeight(1);
      line(this.x + this.w / 2, this.y + this.w / 2, this.x + this.w / 2, this.y + this.h - this.w / 2);
    }

    rect(this.x, this.y, this.w, this.h);
  }

  move() {
    this.y -= this.step;
    if (mouseX > this.x && mouseX < this.x + this.w &&
      mouseY > this.y && mouseY < this.y + this.h) {
      this.over = true;
    } else {
      this.over = false;
    }
    if (this.y + this.h < 0) {
      this.y = height;
    }
  }
}

function draw() {
  clear();
  for (let n of N) {
    n.go();
  }

  for (let n of notes) {
    if (n.over) {
      let fontSize = 19;
      let textMargin = 13
      textFont("Futura PT");
      textSize(fontSize);
      fill("#FFF");
      text(n.title, n.x + textMargin, n.y + textMargin, width * .68, 200);
    }
  }
}

function mousePressed() {
  for (let n of notes) {
    if (n.over) {
      removeElements();
      clearContent();
      let newTitle = createElement('h2', n.title);
      newTitle.parent('content');
      let newText = createElement('p', n.text);
      newText.parent('content');
      
      if(n.video){
        let videoElem = createDiv("<iframe class='overlay' src="+n.video+" width='100%' height='360' frameborder='0' allow='autoplay; fullscreen; picture-in-picture' allowfullscreen></iframe>");
        videoElem.parent(divP5);
      }

      if(n.image){
        print("img = "+n.img);
        let imageElem = createImg(n.image, n.title);
        imageElem.parent(divP5);
        imageElem.style('overflow-x', 'scroll');
        imageElem.style('max-height', '50%');
        select('img').class('overlay');
      }

      let closeBtn = createButton("<span>cerrar</span>");
      closeBtn.parent('content');
      closeBtn.mousePressed(clearContent);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  regen();
}

function clearContent(){
  console.log({content})
  content.innerHTML = "";
  removeElements();
}