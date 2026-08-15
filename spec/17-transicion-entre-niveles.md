# 17. Transicion automatica entre niveles

## Objetivo

Reemplazar el panel de confirmacion por una transicion breve, automatica y coherente con el estilo visual de Numbo.

## Flujo

- Se aplica de nivel 1 a 2 y de nivel 2 a 3.
- Al completar el nivel se eliminan las operaciones visibles.
- Movimiento, generacion y colisiones quedan suspendidos.
- El mapa nuevo y su musica comienzan debajo de la transicion.
- Una captura del mapa anterior cae en franjas como pintura espesa.
- Se muestra brevemente el numero del nivel nuevo.
- El juego continua sin clic ni tecla.
- La primera operacion espera brevemente para permitir orientacion.

## Implementacion

- Estado independiente `TRANSICION_NIVEL`.
- Una sola captura del fotograma anterior.
- 22 franjas con retrasos, recorridos y estiramientos diferentes.
- Movimiento con aceleracion cubica.
- Sin filtros, mascaras, videos ni procesamiento de pixeles.
- Duracion total aproximada de 1,5 segundos.

## Criterios de aceptacion

- No aparece el panel `NIVEL COMPLETADO` entre los niveles.
- No se requiere interaccion para continuar.
- La misma transicion funciona en ambos cambios de nivel.
- No aparecen operaciones durante la transicion.
- La musica corresponde al nivel que se esta revelando.
- Numbi y las colisiones permanecen detenidos.
- No hay errores de consola ni acumulacion de capturas.
