function dibujarObjetivoMision() {
  const centroX = 202;
  const centroY = 35;
  const pulso = estadoJuego === ESTADOS.JUGANDO ? sin(frameCount * 0.08) * 2 : 0;

  push();
  noStroke();
  fill(38, 24, 80, 65);
  ellipse(centroX + 3, centroY + 4, 64 + pulso, 58 + pulso);

  stroke(77, 35, 180);
  strokeWeight(4);
  fill(255, 224, 55);
  ellipse(centroX, centroY, 61 + pulso, 55 + pulso);

  noStroke();
  fill(47, 23, 129);
  textAlign(CENTER, CENTER);
  textFont('Arial Black');
  textSize(String(mision).length >= 3 ? 25 : 31);
  text(mision, centroX, centroY - 1);
  pop();
}

function barra_sup(){  
  let corazonAncho =  42; 
  let corazonAlto = 35;
  let corazonPosX = 480 - corazonAncho / 2; // Posición X del corazón en el centro
  let corazonPosY = height / 10- corazonAlto / 2; // Posición Y del corazón en el centro
  image(corazonImg, corazonPosX, corazonPosY, corazonAncho, corazonAlto);
  image(copa, corazonPosX+80, corazonPosY, corazonAncho, corazonAlto-3);
  image(hallar_m,0,0);
  
  textFont("Arial");
  dibujarObjetivoMision();
  stroke(0);
  strokeWeight(1);
  fill(50);
  textSize(30);
  textAlign(LEFT, CENTER);
  text(vidas, corazonPosX + corazonAncho -55, corazonPosY + corazonAlto / 2);

  text(Acertadas, corazonPosX-2 + corazonAncho +10, corazonPosY + corazonAlto / 2);
  
}
