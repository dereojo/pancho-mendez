/**
 *
 * pancho méndez "nav" alias la cascada inversa - por hspencer
 * 
 */

const FRICTION = 0.0023;

let n = 380; // cantidad de elementos
let globalWidth = 3; // ancho
let N; // arreglo global de elementos
let data; // objeto de datos
let notes; // arreglo a partir de los datos

let content; // div del contenido: lado izquierso
let divP5; // div de esta nav: lado derecho
let acercaBtn, colaboraBtn, contactoBtn;
let font;

let colorPal;

function getCol(img){
  return img.get(round(random(img.width)), round(random(img.height)));
}

function preload() {
  data = loadJSON("data.json", gotData, 'json');
  font = loadFont("data/Jost-Medium.ttf");
  colorPal = loadImage("images/fml_paintings/fml_pt_018.jpg");
}

function gotData(response) {
  print("gotData!");
  notes = [];
}

function setup() {
  content = document.getElementById('content');
  acercaBtn = document.getElementById('acerca-btn');
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
  for (let key in data.datos) {
    let num = round(random(N.length - 1));
    let cant = data.length;
    let th = round(random(cant - 1));
    let n = N[num];
    n.w = globalWidth * 2;
    n.x = round(random(width / n.w) * n.w);
    n.h = random(30, 60);
    n.color = color(0);
    n.colorOver = color("red");
    n.title = data[key].title;
    n.date = data[key].date;
    n.video = data[key].video;
    n.image = data[key].img;
    n.text = data[key].text;
    n.cat = data[key].cat;
    n.index = num;
    n.hasData = true;
    n.step *= 0.333;
    notes.push(n);
  }
  console.log({notes});
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
    this.colorOver = this.color;
    this.title = "";
    this.cat = "",
    this.hasData = false;
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
    if (!n.hasData) n.go();
  }

  for (let n of notes) {
    n.go();
    if (n.over) {
      let fontSize = 18;
      let textMargin = 15
      textFont(font);
      textSize(fontSize);
      textLeading(fontSize * .85);
      fill(0, 200);
      if (n.x < width / 2) {
        textAlign(LEFT);
        text(n.title, n.x + textMargin, n.y + fontSize, width - n.x - textMargin * 2, 100);
      } else {
        textAlign(RIGHT);
        text(n.title, 0, n.y + fontSize, n.x - textMargin, 100);
      }
      if(mouseIsPressed){
        let diffx = mouseX - n.x;
        let diffy = mouseY - n.y;
        n.x += diffx * FRICTION;
        n.y += diffy * FRICTION;
      }
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

      if (n.video) {
        let videoElem = createDiv("<iframe class='vid-overlay' src=" + n.video + " width='100%' height='360' frameborder='0' allow='autoplay; fullscreen; picture-in-picture' allowfullscreen></iframe>");
        videoElem.parent(divP5);
      }

      if (n.image) {
        print("img = " + n.img);
        let imageElem = createDiv("<div class='img-overlay'><img src="+n.image+" title="+n.title+" /></div>");
        imageElem.parent(divP5);
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

function clearContent() {
  console.log({
    content
  })
  content.innerHTML = "";
  removeElements();
}