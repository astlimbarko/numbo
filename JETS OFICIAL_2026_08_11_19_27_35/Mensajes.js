function MensajeLevel() {
  // Definir el estilo y posición del recuadro
  let boxX = width / 2 - 250;
  let boxY = height / 2 - 100;
  let boxWidth = 500;
  let boxHeight = 220;

  // Dibujar el recuadro
  fill(255, 255, 255, 200); // Color blanco semi-transparente
  stroke(0); // Color negro para el borde
  strokeWeight(1); // Grosor del borde
  rect(boxX, boxY, boxWidth, boxHeight, 20); // Borde redondeado

  // Escribir el mensaje de felicitaciones
  fill(0); // Color negro para el texto
  textAlign(CENTER, CENTER);
  textSize(36);
  text("¡Felicitaciones!", width / 2, boxY + 50);

  textSize(24);
  
  text("Has completado el nivel "+ nivel+".", width / 2, boxY + 100);

  // Agregar el botón de continuación
  let buttonX = width / 2 - 150;
  let buttonY = boxY + 150;
  let buttonWidth = 300;
  let buttonHeight = 50;

  // Dibujar el botón
  fill(50, 205, 50); // Color verde para el botón
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 10); // Borde redondeado

  // Escribir el texto del botón
  fill(50); // Color blanco para el texto
  textSize(20);
  text("Presiona 'F' para continuar", buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
}


function Ganaste() {

  // Calcular la posición y el tamaño del cuadro
  let cuadroX = width / 2 - 175;
  let cuadroY = height / 2 - 130;
  let cuadroAncho = 350;
  let cuadroAlto = 290;

  // Dibujar el cuadro blanco semi-transparente
  fill(255, 255, 255, 180);
  rect(cuadroX, cuadroY, cuadroAncho, cuadroAlto, 20);

  // Dibujar el texto
  fill(50,50,50); // Color gris oscuro
  textFont("Arial Black");
  textSize(30);
  textAlign(CENTER, CENTER);
  strokeWeight(2);
  stroke(255);

  // Título "GANASTE!"
  text("GANASTE!", width / 2, cuadroY + 50);

  // Mostrar estadísticas
  text("Acertadas: " + Acertadas, width / 2, cuadroY + 120);
  text("Incorrectas: " + Incorrectas, width / 2, cuadroY + 170);
  text("Puntaje: " + Acertadas * 1000, width / 2, cuadroY + 220);
  
  // Mensaje de felicitaciones
  textSize(18);
  text("Eres todo un Genio!", width / 2, cuadroY + 270);
}

function Perdiste() {
  // Calcular la posición y el tamaño del cuadro
  let cuadroX = width / 2 - 175;
  let cuadroY = height / 2 - 130;
  let cuadroAncho = 350;
  let cuadroAlto = 290;

  // Dibujar el cuadro blanco semi-transparente
  fill(255, 255, 255, 180);
  rect(cuadroX, cuadroY, cuadroAncho, cuadroAlto, 20);

  // Dibujar el texto
  fill(50, 50, 50); // Color gris oscuro
  textFont("Arial Black");
  textSize(30);
  textAlign(CENTER, CENTER);
  strokeWeight(2);
  stroke(255);

  // Título "PERDISTE!"
  text("PERDISTE!", width / 2, cuadroY + 50);

  // Mostrar estadísticas
  text("Acertadas: " + Acertadas, width / 2, cuadroY + 120);
  text("Incorrectas: " + Incorrectas, width / 2, cuadroY + 170);
  text("Puntaje: " + Acertadas * 1000, width / 2, cuadroY + 220);

  // Mensaje de ánimo
  textSize(18);
  text("Mejor suerte para la próxima", width / 2, cuadroY + 270);
}
