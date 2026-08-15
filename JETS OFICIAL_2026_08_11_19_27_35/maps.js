 function precargarMapas(){
    // Precargar las imágenes MAPA1
  fondo = loadImage("img/maps/mapa1/back_0.png");
  nube1 = loadImage("img/maps/mapa1/nube1.png");
  mont1 = loadImage("img/maps/mapa1/mont1.png");
  mont2 = loadImage("img/maps/mapa1/mont2.png");
  mont3 = loadImage("img/maps/mapa1/mont3.png");
  mont4 = loadImage("img/maps/mapa1/mont4.png");
  cartel = loadImage("img/maps/mapa1/cartel.png"); // Nueva imagen: cartel
  bosque = loadImage("img/maps/mapa1/bosque1.png");
  piso = loadImage("img/maps/mapa1/suelo.png");
  
  // Precargar las imágenes MAPA2
  fondo2 = loadImage("img/maps/mapa2/fondo.png");
  siluetaCiudad = loadImage("img/maps/mapa2/silueta_ciudad.png");
  piedras = loadImage("img/maps/mapa2/piedras.png");
  ciudad = loadImage("img/maps/mapa2/ciudad.png");
  suelo2 = loadImage("img/maps/mapa2/suelo.png");
  

  // Precargar las imágenes MAPA3
  fondo3 = loadImage("img/maps/mapa3/fondo.png");
  arboles1 = loadImage("img/maps/mapa3/arboles1.png");
  arboles2 = loadImage("img/maps/mapa3/arboles2.png");
  piso1 = loadImage("img/maps/mapa3/suelo1.png");
  piso2 = loadImage("img/maps/mapa3/suelo2.png");
  arboles3 = loadImage("img/maps/mapa3/arboles3.png");
  monta1 = loadImage("img/maps/mapa3/mont1.png");
  monta2 = loadImage("img/maps/mapa3/mont2.png");
  monta3 = loadImage("img/maps/mapa3/mont3.png");
  nubes = loadImage("img/maps/mapa3/nubes1.png");
  nubes2 = loadImage("img/maps/mapa3/nubes2.png")
  }



function inicializarMapas(){
    // Inicializar valores iniciales al mapa 1
    fondo_x = 0;
    nube1_x = 0;
    mont1_x = 0;
    mont2_x = 0;
    mont3_x = 0;
    mont4_x = 0;
    cartel_x = 1000; // Posición inicial del cartel
    bosque_x = 0;
    piso_x = 0;
  
    // Inicializar mapa 2
    fondo2_x = 0;
    siluetaCiudad_x = 0;
    piedras_x = 0;
    ciudad_x = 0;
    suelo2_x = 0;
  
    // Inicializar mapa 3
    fondo3_x = 0;
    arboles1_x = 0;
    arboles2_x = 0;
    piso1_x = 0;
    piso2_x = 0;
    arboles3_x = 0;
    monta1_x = 0;
    monta2_x = 0;
    monta3_x = 0;
    nubes_x = 0;
    nubes2_x = 0;
  
}

function mapa1(){
  // Dibujar imágenes del nivel 1
      // Fondo (cielo)
      image(fondo, fondo_x, 0);
      image(fondo, fondo_x + fondo.width, 0); // Imagen adicional para el scrolling
      
      // Nube1
      image(nube1, nube1_x, 50);
      image(nube1, nube1_x + nube1.width + espacioEntreNubes, 50); // Imagen adicional con espacio entre nubes

      // Montañas
      image(mont1, mont1_x, 130);
      image(mont1, mont1_x + mont1.width, 130); // adicional
      image(mont2, mont2_x, 160);
      image(mont2, mont2_x + mont2.width, 160); // Imagen adicional para el scrolling
      image(mont3, mont3_x, 170);
      image(mont3, mont3_x + mont3.width, 170); // Imagen adicional para el scrolling
      image(mont4, mont4_x, 200);
      image(mont4, mont4_x + mont4.width, 200); // Imagen adicional para el scrolling
      
      // Cartel
      image(cartel, cartel_x, 205); // Posición del cartel

      // Bosque
      image(bosque, bosque_x, 280);
      image(bosque, bosque_x + bosque.width, 280); // Imagen adicional para el scrolling

      // Piso
      image(piso, piso_x, 312);
      image(piso, piso_x + piso.width, 312); // Imagen adicional para el scrolling

      // Mover la nube1 a una velocidad diferente
      nube1_x -= velocidad * 0.02; // Velocidad nube1

      // Mover las imágenes según la velocidad
      mont1_x -= velocidad * 0.05; // Velocidad montaña 1
      mont2_x -= velocidad * 0.3; // Velocidad montaña 2
      mont3_x -= velocidad * 0.5; // Velocidad montaña 3
      mont4_x -= velocidad * 0.7; // Velocidad montaña 4
      cartel_x -= velocidad * 1.0; // cartel
      bosque_x -= velocidad * 1.4; // Velocidad bosque
      piso_x -= velocidad * 0.5; // Velocidad para el piso

      // Verificar el rebobinado (scrolling infinito)
      if (fondo_x <= -fondo.width) {
        fondo_x = 0;
      }
      if (nube1_x <= -nube1.width - espacioEntreNubes) {
        nube1_x = 0;
      }
      if (mont1_x <= -mont1.width) {
        mont1_x = 0;
      }
      if (mont2_x <= -mont2.width) {
        mont2_x = 0;
      }
      if (mont3_x <= -mont3.width) {
        mont3_x = 0;
      }
      if (mont4_x <= -mont4.width) {
        mont4_x = 0;
      }
      if (bosque_x <= -bosque.width) {
        bosque_x = 0;
      }
      if (piso_x <= -piso.width) {
        piso_x = 0;
      }
}


function mapa2(){
  // Dibujar imágenes del mapa 2
  // Fondo
  image(fondo2, fondo_x, 0);
  
  // Silueta de la ciudad
  image(siluetaCiudad, siluetaCiudad_x, 0);
  image(siluetaCiudad, siluetaCiudad_x + siluetaCiudad.width, 0);
  
  // Piedras
  image(piedras, piedras_x, 240);
  image(piedras, piedras_x + piedras.width, 240);
  
  // Ciudad
  image(ciudad, ciudad_x, 40); // adicional
  image(ciudad, ciudad_x + ciudad.width, 40);
  
  // Suelo
  image(suelo2, suelo2_x, 333);
  image(suelo2, suelo2_x + suelo2.width, 333); 
  

  // Manejo de velocidades
  siluetaCiudad_x -= velocidad * 0.2; 
  piedras_x -= velocidad * 0.2; 
  ciudad_x -= velocidad * 0.5; 
  suelo2_x -= velocidad * 1.2; 
  
  // Verificar el rebobinado (scrolling infinito)
  if (siluetaCiudad_x <= -siluetaCiudad.width) {
    siluetaCiudad_x = 0;
  }

  if (piedras_x <= -piedras.width) {
    piedras_x = 0;
  }

  if (ciudad_x <= -ciudad.width) {
    ciudad_x = 0;
  }

  if (suelo2_x <= -suelo2.width) {
    suelo2_x = 0;
  }
}

function mapa3(){
  // Dibujar imágenes del mapa 3
  // Fondo
  image(fondo3, fondo3_x, 0);
  
    // Nubes
  image(nubes, nubes_x, 0);
  image(nubes, nubes_x + nubes.width, 0); // Duplicación
  image(nubes2, nubes2_x, 0);
  image(nubes2, nubes2_x + nubes2.width, 0); // 
  
  // Montaña 3
  image(monta3, monta3_x, 0);
  image(monta3, monta3_x + monta3.width, 0); // Duplicación
  
    // Montaña 2
  image(monta2, monta2_x, -5);
  image(monta2, monta2_x + monta2.width, -5); // Duplicación
  
    // Montaña 1
  image(monta1, monta1_x, 0);
  image(monta1, monta1_x + monta1.width, 0); // Duplicación
  
    // Arboles 3
  image(arboles3, arboles3_x, -11);
  image(arboles3, arboles3_x + arboles3.width, -11); // Duplicación
  
    // Piso 2
  image(piso2, piso2_x, 0);
  image(piso2, piso2_x + piso2.width, 0); // Duplicación
  
    // Piso 1
  image(piso1, piso1_x, 0);
  image(piso1, piso1_x + piso1.width, 0); // Duplicación
  
    // Arboles 2
  image(arboles2, arboles2_x, 0);
  image(arboles2, arboles2_x + arboles2.width, 0); // Duplicación
  
  // Arboles 1
  image(arboles1, arboles1_x, 0);
  image(arboles1, arboles1_x + arboles1.width, 0); // Duplicación
  

  
  // Manejo de velocidades para el mapa 3
  // El primer plano supera ligeramente la velocidad visual del nivel 2.
  arboles1_x -= velocidad * 0.8;
  arboles2_x -= velocidad * 0.8;
  piso1_x -= velocidad * 0.8;
  piso2_x -= velocidad * 0.5;
  arboles3_x -= velocidad * 0.25;
  monta1_x -= velocidad * 0.05; 
  monta2_x -= velocidad * 0.04; 
  monta3_x -= velocidad * 0.03; 
  nubes_x -= velocidad * -0.01; 
  nubes2_x -= velocidad * -0.0001; 
  
  // Verificar el rebobinado (scrolling infinito) para el mapa 3
  if (arboles1_x <= -arboles1.width) {
    arboles1_x = 0;
  }

  if (arboles2_x <= -arboles2.width) {
    arboles2_x = 0;
  }

  if (piso1_x <= -piso1.width) {
    piso1_x = 0;
  }

  if (piso2_x <= -piso2.width) {
    piso2_x = 0;
  }

  if (arboles3_x <= -arboles3.width) {
    arboles3_x = 0;
  }

  if (monta1_x <= -monta1.width) {
    monta1_x = 0;
  }

  if (monta2_x <= -monta2.width) {
    monta2_x = 0;
  }

  if (monta3_x <= -monta3.width) {
    monta3_x = 0;
  }

  if (nubes_x <= -nubes.width) {
    nubes_x = 0;
  }
  
   if (nubes2_x <= -nubes2.width) {
    nubes2_x = 0;
  }
  
}

