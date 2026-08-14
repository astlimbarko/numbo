# 08. Interfaz, adaptación y pantalla completa

## Objetivo

Permitir que Numbo aproveche distintos tamaños de pantalla sin modificar su lógica ni deformar la imagen.

## Sistema de resolución

- Resolución lógica fija: `600 × 400`.
- Proporción lógica: `3:2`.
- Todos los mapas, posiciones, física y colisiones operarán en coordenadas lógicas.
- El canvas se escalará visualmente al mayor tamaño disponible que conserve `3:2`.
- No se estirará horizontal ni verticalmente.

## Centrado y barras

- El canvas permanecerá centrado horizontal y verticalmente.
- Cuando la ventana sea más ancha que `3:2`, aparecerán barras laterales.
- Cuando sea más alta o estrecha, aparecerán barras superior e inferior.
- Las barras tendrán un color o fondo definido por diseño.
- No habrá barras de desplazamiento del navegador durante el juego.

## Pantalla completa

- Habrá un botón visible en el menú principal.
- Habrá un botón visible en el menú de pausa.
- `Alt + Enter` alternará pantalla completa.
- `Esc` permitirá salir mediante el comportamiento estándar del navegador/WebView.
- El botón indicará si permite entrar o salir de pantalla completa.
- Si la API no está disponible, la interfaz no deberá fallar.

## Mouse y entrada

- Se transformarán `mouseX` y `mouseY` visuales a coordenadas lógicas.
- Los botones conservarán el área correcta después del escalado.
- El teclado no dependerá del tamaño de la ventana.
- El foco del canvas y los botones será predecible.

## Texto e interfaz

- El texto se renderizará en la resolución lógica y escalará junto al canvas.
- No se recalcularán manualmente todas las posiciones para cada pantalla.
- Los elementos importantes respetarán márgenes seguros dentro de `600 × 400`.

## Casos de prueba

- Ventana `600 × 400`.
- Ventana menor que `600 × 400`.
- Pantalla `1366 × 768`.
- Full HD `1920 × 1080`.
- Monitor ultrapanorámico.
- Entrada y salida repetida de pantalla completa.
- Cambio de tamaño durante menú, juego y pausa.
- Clics en botones después de cada cambio.

## Criterios de aceptación

- El juego nunca se ve deformado.
- Siempre se muestra el área lógica completa.
- El canvas queda centrado.
- Los clics coinciden con los botones visibles.
- Las colisiones son idénticas en ventana y pantalla completa.
- El botón funciona en menú y pausa.
