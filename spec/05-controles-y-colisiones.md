# 05. Personaje, controles y colisiones

## Objetivo

Conseguir controles previsibles y colisiones coherentes con la representación visual.

## Controles

- Izquierda: `A` o flecha izquierda.
- Derecha: `D` o flecha derecha.
- Saltar: `W`, flecha arriba o espacio.
- Pausa: `P`.
- Pantalla completa: botón visible y `Alt + Enter`.
- Continuar nivel: botón visible y una tecla documentada.

`F11` se dejará al navegador porque muchos navegadores reservan esa tecla. `Alt + Enter` será el atajo controlado por el juego.

## Personaje

- No podrá salir de los límites lógicos del canvas.
- Solo podrá iniciar un salto cuando esté en el suelo.
- La animación y la física se congelarán durante la pausa.
- Su hitbox será más pequeña que el rectángulo completo del sprite y coincidirá con el cuerpo visible.

## Operaciones

- Cada operación tendrá una hitbox rectangular con ancho y altura positivos.
- La hitbox estará centrada respecto al texto completo.
- El área de colisión no dependerá de sombras decorativas.
- Una operación se eliminará una sola vez después de colisionar.

## Escalado

- La lógica de colisión permanecerá en coordenadas `600 × 400`.
- El escalado visual no alterará posiciones ni radios lógicos.
- Las coordenadas del mouse se convertirán de pantalla a coordenadas lógicas.

## Pruebas

- Colisión por izquierda, derecha, arriba y abajo.
- Colisión durante ascenso y descenso del salto.
- Paso cercano sin colisión.
- Cambio de tamaño y pantalla completa.
- Pulsaciones simultáneas y liberación de teclas.

## Criterios de aceptación

- El jugador recibe el resultado esperado cuando visualmente toca una operación.
- No hay colisiones invisibles evidentes.
- Una operación no descuenta más de una vida.
- Los controles se comportan igual en ventana y pantalla completa.
