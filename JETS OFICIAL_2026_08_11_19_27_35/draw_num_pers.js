function draw_numeros(){
  dibujarNumeros();
  comprobarColisiones();
}

function Numbii(){
  drawNumbi(); //personaje
  moveCharacter(); //personaje
}

function mapita1(){
  velocidad = velocidadMapaPorEstado(1);
  mapa1();
}

function mapita2(){
  velocidad = velocidadMapaPorEstado(2);
  mapa2();
}

function mapita3(){
  velocidad = velocidadMapaPorEstado(3);
  mapa3();
}

function velocidadMapaPorEstado(nivelActual) {
  return estadoJuego === ESTADOS.JUGANDO ? obtenerConfiguracionNivel(nivelActual).velocidadMapa : 0;
}

