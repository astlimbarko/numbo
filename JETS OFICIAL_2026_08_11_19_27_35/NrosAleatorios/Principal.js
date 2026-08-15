function dibujarNumeros(){
  if (millis() >= operacionesSuspendidasHasta && frameCount % inter === 0) {
    generarObstaculo(); }

  for (let i = 0; i < obstaculos.length; i++) {
    obstaculos[i].x -= velo;
    
    
    mostrarObstaculo(obstaculos[i]);

    if (obstaculos[i].x < -obstaculos[i].texto.length * 40) {
//para que muestre las operaciones en consola con su resultado
      //console.log(`La operación ${obstaculos[i].texto} resultó en ${obstaculos[i].resultado}`);
      obstaculos.splice(i, 1);
      i--;
    }
  }
}

function generarObstaculo() {
  let texto = generarOperacion(mision, nivel);
  let resultado = eval(texto); //almacena el resultado de la operacion
  let colorNum1 = color(random(255), random(255), random(255));
  let colorNum2 = color(random(255), random(255), random(255));
  let colorOperador = color(random(255), random(255), random(255));

  let obstaculo = {
    x: width,
    y: random(height / 2 - 100, height / 2 + 100),
    texto: texto,
    colorNum1: colorNum1,
    colorNum2: colorNum2,
    resultado: resultado,
    colorOperador: colorOperador,
    colisionada: false,
  };
  obstaculos.push(obstaculo);
}

function mostrarObstaculo(obstaculo) {
  push();
  textSize(50);
  strokeWeight(5);
  stroke(0, 0, 0, 100);
  textAlign(LEFT, CENTER);
  
  // Obtener el ancho de todo el texto
  let anchoTexto = textWidth(obstaculo.texto);
  
  // Calcular el alto.
  let altoTexto = textSize();

  // Definimos el hitbox
  obstaculo.hitbox = {
    x: obstaculo.x+20,
    y: obstaculo.y - altoTexto / 2,
    w: anchoTexto-25,
    h: altoTexto-50,
  };

  // hitbox - comprobar si funciona por el rect
  //noFill(); 
  //noStroke(); 
  //rect(obstaculo.hitbox.x, obstaculo.hitbox.y, obstaculo.hitbox.w, obstaculo.hitbox.h);

  fill(obstaculo.colorNum1);
  text(obstaculo.texto.split(" ")[0], obstaculo.x, obstaculo.y);
  fill(0, 50);
  text(obstaculo.texto.split(" ")[0], obstaculo.x + 5, obstaculo.y + 5);
  fill(obstaculo.colorOperador);
  text(obstaculo.texto.split(" ")[1], obstaculo.x + textWidth(obstaculo.texto.split(" ")[0]) + 10, obstaculo.y);
  fill(0, 50);
  text(obstaculo.texto.split(" ")[1], obstaculo.x + textWidth(obstaculo.texto.split(" ")[0]) + 15, obstaculo.y + 5);
  fill(obstaculo.colorNum2);
  text(obstaculo.texto.split(" ")[2], obstaculo.x + textWidth(obstaculo.texto.split(" ")[0]) + textWidth(obstaculo.texto.split(" ")[1]) + 20, obstaculo.y);
  fill(0, 50);
  text(obstaculo.texto.split(" ")[2], obstaculo.x + textWidth(obstaculo.texto.split(" ")[0]) + textWidth(obstaculo.texto.split(" ")[1]) + 25, obstaculo.y + 5);
  pop();
}

function generarOperacion(objetivo, nivel) {
  let operacion;
  if(nivel==1 || nivel==2){
  operacion=generarSumaResta(objetivo,nivel);
  }else{
    operacion=generarMultiDiv(objetivo,nivel)
  }
  
  return operacion;
}
