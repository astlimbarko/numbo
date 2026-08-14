function draw_numeros(){
  dibujarNumeros();
  comprobarColisiones();
}

function Numbii(){
  drawNumbi(); //personaje
  moveCharacter(); //personaje
}

function mapita1(){
  velocidad = velocidadGeneral;
  mapa1();
}

function mapita2(){
  velocidad = velocidadGeneral+4;
  mapa2();
}

function mapita3(){
  velocidad = velocidadGeneral+8;
  mapa3();
}

