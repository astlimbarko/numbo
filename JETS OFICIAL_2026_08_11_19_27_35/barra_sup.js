function barra_sup(){  
  let corazonAncho =  42; 
  let corazonAlto = 35;
  let corazonPosX = 480 - corazonAncho / 2; // Posición X del corazón en el centro
  let corazonPosY = height / 10- corazonAlto / 2; // Posición Y del corazón en el centro
  image(corazonImg, corazonPosX, corazonPosY, corazonAncho, corazonAlto);
  image(copa, corazonPosX+80, corazonPosY, corazonAncho, corazonAlto-3);
  image(hallar_m,0,0);
  
  textFont("Arial");
  stroke(0);
  strokeWeight(1);
  fill(50);
  textSize(30);
  textAlign(LEFT, CENTER);
  text(vidas, corazonPosX + corazonAncho -55, corazonPosY + corazonAlto / 2);

  text(Acertadas, corazonPosX-2 + corazonAncho +10, corazonPosY + corazonAlto / 2);
  
}
