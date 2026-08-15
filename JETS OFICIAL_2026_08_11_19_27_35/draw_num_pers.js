function draw_numeros(){
  dibujarNumeros();
  comprobarColisiones();
}

function Numbii(){
  drawNumbi(); //personaje
  moveCharacter(); //personaje
}

function mapita1(){
  velocidad = velocidadMapaPorEstado(0);
  mapa1();
}

function mapita2(){
  velocidad = velocidadMapaPorEstado(4);
  mapa2();
}

function mapita3(){
  velocidad = velocidadMapaPorEstado(8);
  mapa3();
}

function velocidadMapaPorEstado(incrementoNivel) {
  return estadoJuego === ESTADOS.JUGANDO ? velocidadGeneral + incrementoNivel : 0;
}

