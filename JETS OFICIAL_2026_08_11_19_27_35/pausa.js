//-- pausa.js

function Pausa() {
  pausaActiva = true;
  fill(255); 
  rect(width/2 - 50, height/2 - 25, 100, 50); 
  fill(0); 
  textSize(24);
  textAlign(CENTER, CENTER);
  text("PAUSA", width/2, height/2); 
}

function Reanudar() {
  pausaActiva = false;
}

function ifpausa(){
  if(pausaActiva){
    if (pausaActiva) 
      Pausa();  
}  
}
