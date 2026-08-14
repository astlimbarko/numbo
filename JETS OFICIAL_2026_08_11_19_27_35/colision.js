function detectarColision(obstaculo, posX, posY, radio) {
  // Calculando el centro del rectángulo (pero esto debería ser innecesario)
  let rectCenterX = obstaculo.hitbox.x;
  let rectCenterY = obstaculo.hitbox.y;

// Determinando la distancia entre el centro del rectángulo y el centro del círculo
  let dx = posX - rectCenterX;
  let dy = posY - rectCenterY;


// Vamos a corregir esto con una lógica similar a la de la función circleRectCollision proporcionada antes
  dx = Math.abs(dx) - obstaculo.hitbox.w / 2 ;
  dy = Math.abs(dy) - obstaculo.hitbox.h / 2 ;

  // Haz que las distancias dx o dy sean 0 si son negativas
  dx = Math.max(dx, 0);
  dy = Math.max(dy, 0);

  // Devuelve true si la distancia es menor que el radio
  return (Math.sqrt(dx * dx + dy * dy) <= radio);
}

function comprobarColisiones() {
  // Recorre todos los obstáculos
  for (var i = 0; i < obstaculos.length; i++) {
    if(!obstaculos[i].colisionada && detectarColision(obstaculos[i], posX, posY, radioHitbox)) {
      //console.log("¡Colisión detectada!");
      
      if(obstaculos[i].resultado==mision){
        Acertadas+=1;
        mision = mision_general();
        //console.log(Acertadas);
        sonidoCorrecto.play(); //reproducir
        colorEfecto = color(0, 255, 0,100);
      }else{
        Incorrectas +=1;
        vidas--;
        sonidoIncorrecto.play(); //reproducir
      colorEfecto = color(255, 0, 0,100); }

      obstaculos[i].colisionada = true;
      obstaculos.splice(i, 1);
      contadorEfecto = duracionEfecto;
    }
  }
  
  // Si el efecto parpadeante está en curso
  if (contadorEfecto > 0) {
    // Parpadear entre el color del efecto y el color de fondo original
    if (Math.floor(frameCount / 6) % 3 == 0) {
      //background(255); // Color de fondo original
    } else {
      background(colorEfecto); // Color del efecto
    }

    // Disminuir el contador del efecto
    contadorEfecto--;
  }
  
  if(Acertadas>=10 && Objetivos1){
    Objetivos1=false;
    nivel_completado1= true;
    vidas++;
  }
  
  if(Acertadas>=20 && Objetivos2){
    Objetivos2=false;
    nivel_completado2= true;
    vidas++;
  }
  
    if(Acertadas>=30 && Objetivos3){
    Objetivos3=false;
    nivel_completado3 = true;
  }
  
  if(vidas<=0){
    juego_perdido = true;
  }
  
}
