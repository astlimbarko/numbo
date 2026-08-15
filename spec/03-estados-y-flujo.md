# 03. Estados y flujo de partida

## Objetivo

Sustituir la combinación actual de banderas por un flujo predecible y fácil de ampliar.

## Estados requeridos

- `MENU`: menú principal.
- `INSTRUCTIONS`: instrucciones y controles.
- `PLAYING`: partida activa.
- `PAUSED`: partida congelada.
- `LEVEL_COMPLETE`: nivel terminado y esperando continuación.
- `GAME_OVER`: derrota.
- `VICTORY`: victoria después del nivel 3.

Solo un estado principal podrá estar activo a la vez.

## Transiciones

- `MENU → PLAYING`: botón Jugar.
- `MENU → INSTRUCTIONS`: botón Instrucciones.
- `INSTRUCTIONS → MENU`: botón Retornar o `Esc`.
- `PLAYING → PAUSED`: tecla `P` o botón de pausa.
- `PAUSED → PLAYING`: tecla `P` o botón Continuar.
- `PAUSED → MENU`: botón Menú.
- `PLAYING → LEVEL_COMPLETE`: alcanzar el objetivo del nivel 1 o 2.
- `LEVEL_COMPLETE → PLAYING`: confirmar siguiente nivel.
- `PLAYING → GAME_OVER`: vidas iguales a cero.
- `PLAYING → VICTORY`: completar el nivel 3.
- `GAME_OVER → PLAYING`: Reiniciar.
- `VICTORY → PLAYING`: Volver a jugar.
- `GAME_OVER/VICTORY → MENU`: Volver al menú.

## Reinicio completo

El reinicio deberá restablecer:

- Nivel y misión.
- Vidas, aciertos, errores y puntuación.
- Objetivos y marcas de niveles completados.
- Obstáculos y efectos visuales.
- Posición, dirección, salto y animación del personaje.
- Posiciones de las capas de todos los mapas.
- Música correspondiente al nuevo estado.

## Reglas de entrada

- `Esc` no iniciará una partida desde el menú.
- `Esc` saldrá primero de pantalla completa según el comportamiento del navegador.
- El personaje no se moverá fuera de `PLAYING`.
- No habrá generación ni colisiones fuera de `PLAYING`.
- La pausa congelará tiempo de juego, movimiento, animación y generación.

## Criterios de aceptación

- No existen dos pantallas principales visibles simultáneamente.
- Se puede ganar, reiniciar y volver a ganar sin recargar.
- Se puede perder, reiniciar y continuar sin datos de la partida anterior.
- Las transiciones no duplican obstáculos ni música.
