// numbi.js
var kind; 
var imgs = [];
var ancho_sp = 82; // ancho del sprite por fotograma
let indice = 0;
var llave = 0; 
var cantidadCuadrosLoop = 20; 
var paso = 1 / cantidadCuadrosLoop;
var velocidadSP = 6; // velocidadSP de movimiento horizontal
var posX = 80; // Posición inicial en X del personaje
var posYInicial = 270; // Posición inicial en Y del personaje
var posY = posYInicial; // Posición en Y del personaje
var moverDerecha = false; 
var moverIzquierda = false; 
var mirarIzquierda = false; 
var enElAire = false; 
var tiempoInicioSalto = 0; 
var duracionSalto = 0; 
var velocidadSalto = 0; 
var gravedad = 0.5; 
var limiteX = 520; 
var radioHitbox;
var saltarSound;

function precargaNumbi() {
  kind = loadImage("img/numbiRun.png");
}

function setupNumbi() {
  for (let x = 0; x < 653; x += ancho_sp) {
    imgs.push(kind.get(x, 0, ancho_sp, 80));
  }
}

function dibujarSombraNumbi() {
  const centroX = posX + ancho_sp / 2;
  const sueloY = posYInicial + 77;

  push();
  noStroke();
  fill(26, 24, 38, 22);
  ellipse(centroX, sueloY, 56, 13);
  fill(26, 24, 38, 34);
  ellipse(centroX, sueloY, 46, 9);
  fill(26, 24, 38, 24);
  ellipse(centroX, sueloY, 34, 6);
  pop();
}

function drawNumbi() {
  dibujarSombraNumbi();
  // Generar y dibujar hitbox
  hitboxSP();
  noFill(); 
  noStroke(); 
  ellipse(posX + ancho_sp / 2, posY + ancho_sp / 2, 30 * 2); // Dibujar círculo del hitbox
  
  // Dibujar personaje
  indice = Math.floor(llave * imgs.length);
  if (indice < imgs.length) {
    if (!moverIzquierda) {
      image(imgs[indice], posX, posY);
    } else {
      push();
      scale(-1, 1);
      image(imgs[indice], -posX - ancho_sp, posY);
      pop();
    }
  }

  // Actualizar llave para animación
  llave += paso;
  if (llave > 1) {
    llave = 0;
  }

  // Aplicar gravedad si está en el aire
  if (enElAire) {
    duracionSalto = millis() - tiempoInicioSalto;
    velocidadSalto -= gravedad; 
    posY -= velocidadSalto; 

    if (posY >= posYInicial) {
      posY = posYInicial; 
      enElAire = false; 
      velocidadSalto = 0; 
    }
  }
}

function moveCharacter() {
  if (moverDerecha && posX + velocidadSP < limiteX) {
    posX += velocidadSP;
  }
  if (moverIzquierda && posX - velocidadSP > 0) {
    posX -= velocidadSP;
  }
}

function hitboxSP() {
  radioHitbox = ancho_sp / 2;
}