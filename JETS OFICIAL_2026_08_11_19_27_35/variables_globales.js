//creo que la variable obstaculo ya estaba en el juego oficial
let obstaculos = [];
let mision = 10; //numero a encontrar mision
let nivel = 1; //hay 3 niveles y esta ajustado

let sonidoCorrecto; //para el sonido
let sonidoIncorrecto;
let sonidoHoverMenu;
let sonidoPausa;
let operacionesSuspendidasHasta = 0;

let velo; //velocidad numeros
//let velodi = 0.5; 
let inter; //intervalo numeros

//efecto de correct e incorrect
let contadorEfecto = 0;
let colorEfecto;
const duracionEfecto = 20;

let Acertadas=0; //operaciones acertadas
let Incorrectas=0; //operaciones erroneas
let Objetivos1=true;
let Objetivos2=true;
let Objetivos3=true; 
let nivel_completado1 = false;
let nivel_completado2 = false;
let nivel_completado3 = false;
let nivel_bandera = false;
let juego_perdido = false;
let pasar_nivel = false;

let vidas=5; //vidas jugador

let corazonImg; //imagen corazon
let copa; //imagen copa
let hallar_m; //imagen hallar mision
let numberImg; //numeros arrays

// Declaración de variables para las imágenes MAPA1
let fondo, nube1, mont1, mont2, mont3, mont4, cartel, bosque, piso;
let fondo_x, nube1_x, mont1_x, mont2_x, mont3_x, mont4_x, cartel_x, bosque_x, piso_x; // Posiciones en x de los elementos del mapa

//declaracion de variables para las imagenes MAPA2
let fondo2, siluetaCiudad, piedras, ciudad, suelo2;

// Declaración de variables para las imágenes MAPA3
let fondo3, arboles1, arboles2, piso1, piso2, arboles3, monta1, monta2, monta3, nubes, nubes2;
let fondo3_x, arboles1_x, arboles2_x, piso1_x, piso2_x, arboles3_x, monta1_x, monta2_x, monta3_x, nubes_x, nubes2_x;

let espacioEntreNubes = 300; // Espacio entre la aparición de las nubes
let velocidad;
let velocidadGeneral; // velocidad global

// Variable para el estado del juego
let estadoJuego = "MENU"; // Estado inicial
//control del menu principal 
// 1 para jugar, 
// 2 para Menu principal
// 3 para idiomas, 
//4 para Autores
let menuOne = 2;

//let mision = "5";
let spriteX = 200; // Cambia la posición en X deseada
let spriteY = 19; // Cambia la posición en Y deseada


//let mision = ""; // Variable que almacenará el número o signo a mostrar
let misionSPWidth = 29; // Ancho de cada sprite individual
let misionSPHeight = 36; // Alto de cada sprite individual

let pausaActiva;
let sonidoFondo;

//variables de los sonidos
let sonidoMapa1;



 