function preload() {
  precargarMapas();
  precargaNumbi();
  
  //precargando
  sonidoCorrecto = loadSound('sonidos/correct.mp3');
  sonidoIncorrecto = loadSound('sonidos/fallo.mp3');
  sonidoGanaste = loadSound('sonidos/ganaste.mp3');
  
  //sonido juego
  sonidoFondo = loadSound('sonidos/sonidoFondo.mp3');
  sonidoMapa1 = loadSound('sonidos/sonidoMapa1.mp3');
  sonidoMapa2 = loadSound('sonidos/sonidoMapa2.mp3');
  sonidoMapa3 = loadSound('sonidos/sonidoMapa3.mp3');
  
  
  //barra superior
  corazonImg = loadImage("img/barra_superior/corazon.png"); 
  copa = loadImage("img/barra_superior/copa.png");
  hallar_m = loadImage("img/barra_superior/mision.png");
  numberImg = loadImage("img/num.png")
  
  imgMenu = loadImage('img/scmenu.png'); //menu
}


function setup() {
  createCanvas(600, 400);
  setupNumbi(); //setup numbi
  inicializarMapas();
  playSound(sonidoFondo);

}

function draw() {
  ifpausa();
  if (!pausaActiva) {
  
    if (estadoJuego === "MENU") {
      
    velocidadGeneral = 0; 
    drawMenu(); // Dibujar el menú
  } else if (estadoJuego === "PLAY") {
    
    
    velocidadGeneral = 3.5; 
    
  if(!juego_perdido){
  if(nivel==1 && !nivel_completado1){
    stopSound(sonidoFondo);
    playSound(sonidoMapa1);
    velo = 6;
    inter = 90;
    mapita1();
    Numbii();
    draw_numeros();
  }
  
  if (nivel_completado1 && !nivel_bandera) {
    velo = 0;
    inter=0;
    mapita1();
    Numbii();
    obstaculos.length = 0;
    contadorEfecto = 0;
    MensajeLevel();
    pasar_nivel =true;
  }
  
  if(nivel==2 && !nivel_completado2){
    stopSound(sonidoMapa1);
    playSound(sonidoMapa2);
    nivel_bandera = false;
    nivel_completado1 = false;
    velo = 7;
    inter = 90;
    mapita2();
    Numbii();
    draw_numeros();
  }
  
   if (nivel_completado2 && !nivel_bandera) {
    velo = 0;
    inter = 0;
    mapita2();
    Numbii();
    obstaculos.length = 0;
    contadorEfecto = 0;
    MensajeLevel();
    pasar_nivel =true;
  }
  
    if(nivel==3 && !nivel_completado3){
    stopSound(sonidoMapa2);
    playSound(sonidoMapa3);
    nivel_bandera = false;
    nivel_completado2 = false;
    velo = 8;
    inter = 65;
    mapita3();
    Numbii();
    draw_numeros();
  }
  
  if (nivel_completado3 && !nivel_bandera) {
    velo = 0;
    inter = 0;
    mapita3();
    Numbii();
    Ganaste();
    obstaculos.length = 0;
    contadorEfecto = 0;
    
  }
    
  }
  
  if(juego_perdido){
    if(nivel==1){
    mapita1();
    Numbii();
    }else if(nivel==2){
    mapita2();
    Numbii();
    }else if(nivel==3){
    mapita3();
    Numbii();
    }
    Perdiste();
    velo = 0;
    inter = 0;    
  }
    
  
  barra_sup();
}

}
}


function keyPressed() {
  if (key === 'd' || key === 'D' ||keyCode === 39) {
    moverDerecha = true;
    mirarIzquierda = false;
  }
  if (key === 'a' || key === 'A'|| keyCode === 37) {
    moverIzquierda = true;
    mirarIzquierda = true;
  }
  if (keyCode === 32 && !enElAire || keyCode === 38 && !enElAire || key === 'w' && !enElAire || key === 'W' && !enElAire) {
    enElAire = true;
    tiempoInicioSalto = millis(); // Registrar el tiempo de inicio del salto
    velocidadSalto = 15; // Establecer una velocidad inicial para el salto
  }
  
  if(pasar_nivel){
  if (key === 'f' || key === 'F') {
    pasar_nivel = false;
    nivel_bandera = true; // Resetear la bandera
    nivel++; // Pasar al siguiente nivel
  }}
    if (keyCode === ESCAPE) {
    if (estadoJuego === "PLAY") {
      estadoJuego = "MENU"; // Volver al menú
    } else if (estadoJuego === "MENU") {
      estadoJuego = "PLAY"; // Volver al juego
    }
  }
  
  if (key === 'p' || key === 'P'){ 
    if (pausaActiva) {
      Reanudar();
    } else {
      Pausa(); 
    }
  }
}

function keyReleased() {
  if (key === 'd' || key === 'D' || keyCode === 39) {
    moverDerecha = false;
  }
  if (key === 'a' || key === 'A' ||keyCode === 37) {
    moverIzquierda = false;
    mirarIzquierda = false;
  }
}

function mousePressed() {
  checkClicks(); // Llamar a la función que verifica los clics
}
