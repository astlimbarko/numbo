// sound.js


// Función para reproducir sonido
function playSound(sound) {
  if (!sound.isPlaying()) {
    sound.setVolume(0.3);
    sound.loop(); // Reproducir en bucle si no se está reproduciendo
  }
}

// Función para detener el sonido
function stopSound(sound) {
  if (sound.isPlaying()) {
    sound.stop();
  }
}