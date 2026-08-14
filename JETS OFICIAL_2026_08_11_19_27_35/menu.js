// -- menu --
// Variables para la imagen de fondo y número aleatorio
let imgMenu;
let numAutor = null; // Variable para almacenar el número aleatorio

// variables de texto del menu
let play = traducir('jugar');
let language = traducir('idiomas');
let Authors = traducir('autor');
let instructions = traducir('instrucciones');


// Configurar y dibujar el menú
function drawMenu() {
  // Dibujar la imagen de fondo
  if (imgMenu) {
    image(imgMenu, 0, 0, width, height);
  }

  textAlign(CENTER, CENTER);
  
  switch (menuOne) {
    case 1:
      estadoJuego = "PLAY";
      break;
    case 2:
      menuPrincipal();
      break;
    case 3:
      languages();
      break;
    case 4:
      autores();
      break;
    case 5:
      instrucciones();
      break;
  }
}

// Función para dibujar el texto con animación al pasar el mouse
function drawTextWithAnimation(texto, x, y) {
  let overText = mouseX > x - textWidth(texto) / 2 && mouseX < x + textWidth(texto) / 2 && mouseY > y - 25 && mouseY < y + 25;
  
  if (overText) {
    textSize(46);
    stroke(127, 191, 255, 100); // Color del borde al pasar el mouse
    strokeWeight(7); // Grosor del borde al pasar el mouse
    fill(127, 0, 255); // Color del relleno al pasar el mouse
  } else {
    textSize(40);
    stroke(100); // Color del borde normal
    strokeWeight(7); // Grosor del borde normal
    fill(255); // Color del relleno normal
  }
  
  text(texto, x, y);
  return overText;
}

function menuPrincipal() {
  play = traducir('jugar');
  language = traducir('idiomas');
  Authors = traducir('autor');
  instructions = traducir('instrucciones');
  // Dibujar los textos del menú con animación
  drawTextWithAnimation(play, width / 2, 90);
  drawTextWithAnimation(language, width / 2, 155);
  drawTextWithAnimation(instructions, width / 2, 220);
  drawTextWithAnimation(Authors, width / 2, 285);
}

function autores() {
  // Solo generar un nuevo número aleatorio si no se ha generado antes
  if (numAutor === null) {
    numAutor = Math.floor(Math.random() * 3) + 1;
  }

  textSize(25);
  stroke(90); // Color del borde
  strokeWeight(5); // Grosor del borde
  fill(255); // Color del relleno del texto
  
  text(`${traducir('autor')}:`, width / 2, 120);
  
  // Configuración del trazo
  strokeWeight(3); // Grosor de la línea

  // Dibujo de la línea
  line(230, 135, 370, 135); // Coordenadas: (x1, y1, x2, y2)
  strokeWeight(5); // Grosor del borde
  
  let autor1, autor2, autor3;

  switch (numAutor) {
    case 1:
      autor1 = 'Gonzalo Joaquin Veizaga Justiniano';
      autor2 = 'gonzaloveizaga@outlook.com';
      autor3 = '';
      break;
    case 2:
      autor1 = 'Gonzalo Joaquin Veizaga Justiniano';
      autor2 = 'gonzaloveizaga@outlook.com';
      autor3 = '';
      break;
    case 3:
      autor1 = 'Gonzalo Joaquin Veizaga Justiniano';
      autor2 = 'gonzaloveizaga@outlook.com';
      autor3 = '';
      break;
  }
  
  text(autor1, width / 2, 160);
  text(autor2, width / 2, 200);
  text(autor3, width / 2, 240);
  
  drawTextWithAnimation(traducir('retornar'), width / 2, 300);
}

function languages() {
  drawTextWithAnimation('Español', width / 2, 80);
  drawTextWithAnimation('Quechua', width / 2, 120);
  drawTextWithAnimation('Aymara', width / 2, 160);
  drawTextWithAnimation('Guaraní', width / 2, 200);
  drawTextWithAnimation('Plautdietsch', width / 2, 240);
  drawTextWithAnimation(traducir('retornar'), width / 2, 300);
}
function instrucciones() {
  fill(255, 255, 255, 225);
  stroke(45);
  strokeWeight(2);
  rect(80, 45, 440, 285, 18);
  noStroke();
  fill(40);
  textAlign(CENTER, CENTER);
  textFont('Arial Black');
  textSize(27);
  text(traducir('controles'), width / 2, 78);
  textFont('Arial');
  textSize(18);
  text(`${traducir('mover')}: A / D  ·  ← / →`, width / 2, 125);
  text(`${traducir('saltar')}: W  ·  ↑  ·  ESPACIO`, width / 2, 160);
  text(`${traducir('pausar')}: ESC`, width / 2, 195);
  text(`${traducir('silenciar')}: M`, width / 2, 230);
  textSize(16);
  text(traducir('objetivo'), width / 2, 270);
  drawTextWithAnimation(traducir('retornar'), width / 2, 355);
}


// Función para restablecer numAutor al salir de la pantalla de autores
function resetAutores() {
  numAutor = null;
}

// Función para manejar los clics del mouse
function checkClicks() {
  if (menuOne === 2) {
    if (drawTextWithAnimation(play, width / 2, 90)) {
      if (mouseIsPressed) iniciarJuego();
    }
    if (drawTextWithAnimation(language, width / 2, 155)) {
      if (mouseIsPressed) mostrarIdiomas();
    }
    if (drawTextWithAnimation(instructions, width / 2, 220)) {
      if (mouseIsPressed) mostrarInstrucciones();
    }
    if (drawTextWithAnimation(Authors, width / 2, 285)) {
      if (mouseIsPressed) mostrarAutores();
    }
  } else if (menuOne === 3) {
    if (drawTextWithAnimation('Español', width / 2, 80)) {
      if (mouseIsPressed) seleccionarIdioma('Español');
    }
    if (drawTextWithAnimation('Quechua', width / 2, 120)) {
      if (mouseIsPressed) seleccionarIdioma('Quechua');
    }
    if (drawTextWithAnimation('Aymara', width / 2, 160)) {
      if (mouseIsPressed) seleccionarIdioma('Aymara');
    }
    if (drawTextWithAnimation('Guaraní', width / 2, 200)) {
      if (mouseIsPressed) seleccionarIdioma('Guaraní');
    }
    if (drawTextWithAnimation('Plautdietsch', width / 2, 240)) {
      if (mouseIsPressed) seleccionarIdioma('Plautdietsch');
    }
    if (drawTextWithAnimation(traducir('retornar'), width / 2, 300)) {
      if (mouseIsPressed) regresarMenu();
    }
  } else if (menuOne === 4) {
    if (drawTextWithAnimation(traducir('retornar'), width / 2, 300)) {
      if (mouseIsPressed) regresarMenu();
    }
  } else if (menuOne === 5) {
    if (drawTextWithAnimation(traducir('retornar'), width / 2, 355)) {
      if (mouseIsPressed) regresarMenu();
    }
  }
}

// Funciones de ejemplo para manejar los clics
function iniciarJuego() {
  console.log('Iniciar Juego');
  menuOne = 1; // Cambia la variable para iniciar el juego
}

function mostrarIdiomas() {
  console.log('Mostrar Idiomas');
  menuOne = 3; // Cambia la variable para mostrar idiomas
}

function mostrarAutores() {
  console.log('Mostrar Autores');
  menuOne = 4; // Cambia la variable para mostrar autores
}

function regresarMenu() {
  console.log('Regresar al Menú');
  menuOne = 2; // Cambia la variable para regresar al menú principal
}

function mostrarInstrucciones() {
  console.log('Mostrar Instrucciones');
  menuOne = 5;
}
