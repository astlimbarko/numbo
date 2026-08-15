let misionPanelAnterior = null;
let animacionMisionHasta = 0;

function dibujarPanelMision() {
  const xPanel = 10;
  const yPanel = 12;
  const anchoPanel = 190;
  const altoPanel = 56;
  const radioPanel = 11;
  const xNumero = 151;
  const yNumero = 18;
  const anchoNumero = 41;
  const altoNumero = 44;

  if (misionPanelAnterior !== mision) {
    misionPanelAnterior = mision;
    animacionMisionHasta = frameCount + 20;
  }

  const cuadrosRestantes = max(0, animacionMisionHasta - frameCount);
  const progresoAnimacion = cuadrosRestantes / 20;
  const escalaNumero = 1 + sin(progresoAnimacion * PI) * 0.08;

  push();
  noStroke();
  fill(40, 22, 89, 90);
  rect(xPanel + 3, yPanel + 6, anchoPanel, altoPanel, radioPanel);

  stroke(66, 31, 139);
  strokeWeight(3);
  fill(123, 48, 196);
  rect(xPanel, yPanel, anchoPanel, altoPanel, radioPanel);

  stroke(176, 99, 235);
  strokeWeight(2);
  noFill();
  line(xPanel + 11, yPanel + 5, xPanel + anchoPanel - 11, yPanel + 5);

  image(hallar_m, xPanel + 7, yPanel + 8, 132, 43);

  push();
  translate(xNumero + anchoNumero / 2, yNumero + altoNumero / 2);
  scale(escalaNumero);
  stroke(76, 42, 142);
  strokeWeight(2);
  fill(255, 211, 54);
  rect(-anchoNumero / 2, -altoNumero / 2, anchoNumero, altoNumero, 7);
  noStroke();
  fill(64, 31, 145);
  textAlign(CENTER, CENTER);
  textFont('Arial Black');
  textSize(String(mision).length >= 3 ? 22 : 30);
  text(mision, 0, -1);
  pop();
  pop();
}

function barra_sup(){  
  let corazonAncho =  42; 
  let corazonAlto = 35;
  let corazonPosX = 480 - corazonAncho / 2; // Posición X del corazón en el centro
  let corazonPosY = height / 10- corazonAlto / 2; // Posición Y del corazón en el centro
  image(corazonImg, corazonPosX, corazonPosY, corazonAncho, corazonAlto);
  image(copa, corazonPosX+80, corazonPosY, corazonAncho, corazonAlto-3);
  
  textFont("Arial");
  dibujarPanelMision();
  stroke(0);
  strokeWeight(1);
  fill(50);
  textSize(30);
  textAlign(LEFT, CENTER);
  text(vidas, corazonPosX + corazonAncho -55, corazonPosY + corazonAlto / 2);

  text(Acertadas, corazonPosX-2 + corazonAncho +10, corazonPosY + corazonAlto / 2);
  
}
