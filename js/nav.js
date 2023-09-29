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
  data = loadTable('https://docs.google.com/spreadsheets/d/e/2PACX-1vQswJh4DoOWUujtJQctDbYMHnoTjYHE8Q_bHzGXW6fnglidAJdE3F0r2-E4UcpUV9Eakt67X8i99ROF/pub?gid=0&single=true&output=csv', 'csv', 'header');
  font = loadFont("data/Jost-Medium.ttf");
  colorPal = loadImage("images/fml_paintings/fml_pt_018.jpg");
  selectorContent = "<p class='selector'><span id='PIN'></span><span id='ARQ'></span><span id='DIB'></span><span id='VID'></span><span id='FOT'></span></p>";
  creditsContent = "<dl class='credits'><dt>Proyecto permanente desarrollo</dt><dt><a href='https://github.com/dereojo/pancho-mendez'><strong>dereojo</strong> comunicaciones</a></dt><dt>Producción: <strong>Xhinno Leiva</strong></dt><!--<dt>Diseño: <strong>Herbert Spencer</strong></dt>--></dl>";
  notes = [];
}

function regen() {
  let w = divP5.offsetWidth;
  let h = divMainotes.offsetHeight;
  let sketch = createCanvas(w, h);

  sketch.parent(divP5);
  sketch.style('position', 'absolute');
  sketch.style('z-index', '1000');
  
  // se crean 'n' notas vacías en el arreglo N
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
  if(hasSelector){
    let elt = document.getElementById('pancho');
    let panchoContent;
    if (init) {
      panchoContent = "<h2 style='margin-top: 4em'>Francisco Méndez Labbé</h2><img src='" + panchoFotos[floor(random(panchoFotos.length))] + "' class='pancho' title='Pancho Méndez'>"
    } else {
      panchoContent = "<img src='" + panchoFotos[floor(random(panchoFotos.length))] + "' class='pancho'>"
    }
    let pancho = createDiv(panchoContent);
    pancho.parent(elt);
    init = false;
  }
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

  let num = data.getRowCount();
  let cols = data.getColumnCount();
  //cycle through the table
  for (let r = 0; r < num; r++){
    
    let n = N[r];
    n.x = round(random(width / n.w) * (n.w - 1));
    n.h = random(30, 60);
    n.title = data.getString(r, 0);
    n.date = data.getString(r, 1);
    n.text = data.getString(r, 2);
    n.image = data.getString(r, 3);
    n.video = data.getString(r, 4);
    n.cat = data.getString(r, 5);
    n.index = r;
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
        n.color = color("deepPink");
        n.colorOver = color("fuchsia");
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
    this.x = floor(random(width / this.w)) * this.w - this.w;
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
      blendMode(MULTIPLY);
      fill(this.color);
      this.w = globalWidth * 3;
    } else {
      blendMode(BLEND);
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
  blendMode(BLEND);
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

      // videos
      if (n.cat === "video") {
        let videoElem = createDiv("<iframe class='vid-overlay' src=" + n.video + " width='100%' height='450' frameborder='0' allow='autoplay; fullscreen; picture-in-picture' allowfullscreen></iframe>");
        videoElem.parent(mediaDiv);


        let videoFooter = createDiv("<h5>" + n.title + "</h5><p>" + n.text + "<br><strong>" + n.date + "</strong></p>");
        videoFooter.parent(textDiv);
        videoFooter.class('vid-footer');
        resize();
      // imágenes
      }else{
        print("img = " + n.url);
        let imageElem = createDiv("<div class='img-overlay'><img onload='resize()' src=" + n.image + " title=" + n.title + " /></div>");
        imageElem.parent(mediaDiv); 
        let imageFooter = createDiv("<h5>" + n.title + "</h5><p>" + n.text + "<br><strong>" + n.date + "</strong></p>");
        imageFooter.parent(textDiv);
        imageFooter.class('img-footer');
        resize();
      }

      let closeBtn = createButton("<span>cerrar</span>");
      closeBtn.class('close');
      closeBtn.parent('content');
      closeBtn.mousePressed(clearContent);
    }
  }
}

function windowResized() {
  resize();
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

    /*
    let selectorTitle = createElement('label', '<a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQswJh4DoOWUujtJQctDbYMHnoTjYHE8Q_bHzGXW6fnglidAJdE3F0r2-E4UcpUV9Eakt67X8i99ROF/pubhtml" style="text-decoration:none" target="_blank">FML</a>');
    selectorTitle.parent('pancho');
    */

    toggleARQ = createCheckbox('arquitectura', ARQ);
    togglePIN = createCheckbox('pintura', PIN);
    toggleDIB = createCheckbox('gráfica', DIB);
    toggleVID = createCheckbox('video', VID);
    toggleFOT = createCheckbox('fotografía', FOT);

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
  mediaDiv.innerHTML = "";
  recreateMenu();
  newPancho(false);
  resize();
}

function resize(){
    let oldHeight = height;
    let w = divP5.offsetWidth;
    let h = divMainotes.offsetHeight;
    resizeCanvas(w, h);
  
    for(let n of N){
      N.y = map(N.y, 0, oldHeight, 0, height);
    }
    toggle(); // reinicializa los inputs
}