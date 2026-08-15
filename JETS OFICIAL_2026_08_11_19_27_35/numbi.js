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
  push();
  noStroke();
  fill(35, 45, 30, 75);
  ellipse(posX + ancho_sp / 2, posYInicial + 73, 44, 10);
  pop();
}

function dibujarVientoAmbienteNumbi() {
  const movimientoHorizontal = moverDerecha !== moverIzquierda;
  if (nivel !== 3 || estadoJuego !== ESTADOS.JUGANDO || movimientoHorizontal) return;

  const anclaX = posX + 18;
  push();
  noFill();
  strokeCap(ROUND);
  for (let i = 0; i < 4; i++) {
    const oscilacion = sin((frameCount + i * 11) * 0.18) * 2;
    const y = posY + 24 + i * 13 + oscilacion;
    const longitud = 18 + (i % 2) * 7;

    stroke(75, 78, 82, 105 - i * 10);
    strokeWeight(1.4);
    line(anclaX, y, anclaX - longitud, y + oscilacion * 0.3);

    stroke(20, 22, 25, 60 - i * 6);
    strokeWeight(0.8);
    line(anclaX - 5, y + 2, anclaX - longitud - 5, y + 3);
  }
  pop();
}

function dibujarVientoNumbi() {
  const movimientoHorizontal = moverDerecha !== moverIzquierda;
  if (nivel !== 3 || estadoJuego !== ESTADOS.JUGANDO || !movimientoHorizontal) return;

  const direccion = moverDerecha ? 1 : -1;
  const anclaX = moverDerecha ? posX + 20 : posX + ancho_sp - 20;

  push();
  noFill();
  strokeCap(ROUND);
  for (let i = 0; i < 6; i++) {
    const oscilacion = sin((frameCount + i * 7) * 0.28) * 3;
    const y = posY + 18 + i * 11 + oscilacion;
    const longitud = 36 + (i % 3) * 10;
    const extremoX = anclaX - direccion * longitud;

    stroke(240, 253, 255, 230 - i * 12);
    strokeWeight(i % 2 === 0 ? 3 : 2);
    line(anclaX, y, extremoX, y + oscilacion * 0.35);

    stroke(45, 190, 255, 175 - i * 10);
    strokeWeight(1);
    line(anclaX - direccion * 5, y + 3, extremoX - direccion * 7, y + 4);
  }
  pop();
}

function drawNumbi() {
  // Generar y dibujar hitbox
  hitboxSP();
  // Estela visual del nivel 3, detrás del sprite y sin alterar su hitbox.
  dibujarVientoNumbi();
  dibujarVientoAmbienteNumbi();
  // La sombra sigue al personaje horizontalmente y permanece sobre el suelo al saltar.
  dibujarSombraNumbi();
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