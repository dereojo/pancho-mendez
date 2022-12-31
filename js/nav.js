/**
 *
 * pancho méndez "nav" alias la cascada inversa - por hspencer
 * 
 */

// const FRICTION = 0.0023;

let n = 380; // cantidad de elementos
let globalWidth = 3; // ancho
let N; // arreglo global de elementos
let data; // objeto de datos
let notes; // arreglo a partir de los datos

let content, mediaDiv, textDiv; // div del contenido: lado izquierso
let divP5; // div de esta nav: lado derecho
let divMainotes;
let selectorContent, creditsContent;

let toggleARQ, togglePIN, toggleDIB, toggleVID, toggleFOT;
let font;
let colorPal;
let panchoFotos = [
  "/images/fml_fotos_perfil/01.png",
  "/images/fml_fotos_perfil/02.png",
  "/images/fml_fotos_perfil/03.png",
  "/images/fml_fotos_perfil/04.png",
  "/images/fml_fotos_perfil/05.png",
];


function getCol(img) {
  return img.get(round(random(img.width)), round(random(img.height)));
}

function preload() {
  data = loadJSON("data.json", gotData, 'json');
  font = loadFont("data/Jost-Medium.ttf");
  colorPal = loadImage("images/fml_paintings/fml_pt_018.jpg");
  selectorContent = loadStrings('selector.txt');
  creditsContent = loadStrings('credits.txt');
}

function gotData(response) {
  print("gotData!");
  notes = [];
}

function regen() {
  /*
  content = document.getElementById('content');
  divP5 = document.getElementById('p5');
  divMainotes = document.getElementById('main');
  */

  let w = divP5.offsetWidth;
  let h = divMainotes.offsetHeight;
  let sketch = createCanvas(w, h);

  sketch.parent(divP5);
  sketch.style('position', 'absolute');
  sketch.style('z-index', '1000');
  N = [];
  for (let i = 0; i < n; i++) {
    N.push(new Note());
  }
  strokeCap(SQUARE);
  notes = [];
  buildNotes(data);
  // check if already some are selected
  toggle();
}

function setup() {
  content = document.getElementById('pancho');
  divP5 = document.getElementById('p5');
  divMainotes = document.getElementById('main');
  mediaDiv = document.getElementById('media');
  textDiv = document.getElementById('text');
  newPancho(true);
  recreateMenu();
  regen();
}

function newPancho(init) {
  let elt = document.getElementById('pancho');
  let panchoContent;
  if (init) {
    panchoContent = "<h2>Francisco Méndez Labbé</h2><img src='" + panchoFotos[floor(random(panchoFotos.length))] + "' class='pancho'>"
  } else {
    panchoContent = "<img src='" + panchoFotos[floor(random(panchoFotos.length))] + "' class='pancho'>"
  }
  let pancho = createDiv(panchoContent);
  pancho.parent(elt);
  init = false;
}

function toggle() {

  print("##################################");
  print("togglePIN = " + togglePIN.checked());
  print("toggleARQ = " + toggleARQ.checked());
  print("toggleDIB = " + toggleDIB.checked());
  print("toggleVID = " + toggleVID.checked());
  print("toggleFOT = " + toggleFOT.checked());
  print("##################################");

  for (let n of notes) {
    print(n.title);
    if (toggleARQ.checked() && n.cat === 'arquitectura') {
      n.active = true;
    } else if (!toggleARQ.checked() && n.cat === 'arquitectura') {
      n.active = false;
    }
    if (togglePIN.checked() && n.cat === 'pintura') {
      n.active = true;
    } else if (!togglePIN.checked() && n.cat === 'pintura') {
      n.active = false;
    }

    if (toggleDIB.checked() && n.cat === 'dibujo') {
      n.active = true;
    } else if (!toggleDIB.checked() && n.cat === 'dibujo') {
      n.active = false;
    }

    if (toggleVID.checked() && n.cat === 'video') {
      n.active = true;
    } else if (!toggleVID.checked() && n.cat === 'video') {
      n.active = false;
    }

    if (toggleFOT.checked() && n.cat === 'foto') {
      n.active = true;
    } else if (!toggleFOT.checked() && n.cat === 'foto') {
      n.active = false;
    }
  }
}

function buildNotes(data) {
  for (let key in data) {
    let num = round(random(N.length - 1));
    let cant = data.length;
    let n = N[num];
    n.x = round(random(width / n.w) * n.w);
    n.h = random(30, 60);
    n.title = data[key].title;
    n.date = data[key].date;
    n.video = data[key].video;
    n.image = data[key].img;
    n.text = data[key].text;
    n.cat = data[key].cat;
    n.index = num;
    n.hasData = true;
    n.step *= 0.333;

    switch (n.cat) {

      case "pintura":
        n.color = color("blue");
        n.colorOver = color("darkBlue");
        break;
      case "arquitectura":
        n.color = color("goldenRod");
        n.colorOver = color("gold");
        break;
      case "dibujo":
        n.color = color("SkyBlue");
        n.colorOver = color("deepSkyBlue");
        break;
      case "video":
        n.color = color("cyan");
        n.colorOver = color("blue");
        break;
      case "foto":
        n.color = color(0);
        n.colorOver = color("gray");
        break;
    }
    notes.push(n);
  }
}

class Note {
  constructor(data) {
    this.w = globalWidth * 2;
    this.from = random(0, height / 2);
    this.to = random(this.from + this.w, this.from + height / 4);
    this.h = this.to - this.from;
    this.x = floor(random(width / this.w)) * this.w;
    this.y = random(-this.h / 2, height);
    this.step = random(.1, .8);
    this.over = false;
    this.color = "#FFF3";
    this.colorOver = this.color;
    this.title = "-";
    this.cat = "",
      this.hasData = false;
    this.active = false;
  }

  go() {
    this.move();
    this.draw();
  }

  draw() {
    noStroke();
    if (this.active) {
      fill(this.color);
      this.w = globalWidth * 3;
    } else {
      fill("#FFF3");
      this.w = globalWidth;
    }

    if (this.over) {
      fill(this.colorOver);
      rect(this.x, this.y, this.w, this.h);
    }

    noStroke();
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
    // rollover
    if (n.over) {
      let fontSize = 18;
      let textMargin = 15
      textFont(font);
      textSize(fontSize);
      textLeading(fontSize * .85);
      fill(255, 200);
      if (n.x < width / 2) {
        textAlign(LEFT);
        text(n.title, n.x + textMargin, n.y + fontSize, width - n.x - textMargin * 2, 100);
      } else {
        textAlign(RIGHT);
        text(n.title, 0, n.y + fontSize, n.x - textMargin, 100);
      }
    }
  }
}

function mousePressed() {
  for (let n of notes) {
    if (n.over) {
      clearContent();
      if (n.video) {
        let videoElem = createDiv("<iframe class='vid-overlay' src=" + n.video + " width='100%' height='420' frameborder='0' allow='autoplay; fullscreen; picture-in-picture' allowfullscreen></iframe>");
        videoElem.parent(mediaDiv);
        let newTitle = createElement('h5', n.title);
        newTitle.parent(textDiv);
        let newText = createElement('p', n.text + "<br>" + n.date);
        newText.parent(textDiv);
      }

      if (n.image) {
        print("img = " + n.img);
        let imageElem = createDiv("<div class='img-overlay'><img src=" + n.image + " title=" + n.title + " /></div>");
        imageElem.parent(mediaDiv); 
        let imageFooter = createDiv("<h5>" + n.title + "</h5><p>" + n.text + "<br><strong>" + n.date + "</strong></p>");
        imageFooter.parent(textDiv);
        imageFooter.class('img-footer');
      }

      let closeBtn = createButton("<span>cerrar</span>");
      closeBtn.class('close');
      closeBtn.parent('content');
      closeBtn.mousePressed(clearContent);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  regen();
}

function recreateMenu() {
  //removeElements();
  if (hasSelector === true) {
    let elt = document.getElementById('selector');
    elt.innerHTML = selectorContent + creditsContent;

    let PIN = false;
    let ARQ = false;
    let DIB = false;
    let FOT = false;
    let VID = false;

    for (let n of notes) {
      if (n.active && n.cat === "pintura") {
        PIN = true;
      } else if (n.active && n.cat === "arquitectura") {
        ARQ = true;
      } else if (n.active && n.cat === "dibujo") {
        DIB = true;
      } else if (n.active && n.cat === "video") {
        VID = true
      } else if (n.active && n.cat === "foto") {
        FOT = true;
      }
    }

    toggleARQ = createCheckbox('arquitecto', ARQ);
    togglePIN = createCheckbox('pintor', PIN);
    toggleDIB = createCheckbox('artista gráfico', DIB);
    toggleVID = createCheckbox('profesor de arquitectura y diseño', VID);
    toggleFOT = createCheckbox('fundador del instituto de arquitectura de la PUCV y de la Ciudad Abierta', FOT);

    toggleARQ.parent(document.getElementById('ARQ'));
    togglePIN.parent(document.getElementById('PIN'));
    toggleDIB.parent(document.getElementById('DIB'));
    toggleVID.parent(document.getElementById('VID'));
    toggleFOT.parent(document.getElementById('FOT'));

    toggleARQ.changed(toggle);
    togglePIN.changed(toggle);
    toggleDIB.changed(toggle);
    toggleVID.changed(toggle);
    toggleFOT.changed(toggle);
  }
}

function clearContent() {
  removeElements();
  mediaDiv.innerHTML = " ";
  recreateMenu();
  newPancho(false);
  resizeCanvas(width, divMainotes.offsetHeight);
}