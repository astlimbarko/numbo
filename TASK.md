# Tareas de Numbo

Este archivo resume el avance real del proyecto. Una tarea se marca con `[x]` después de implementarla, probarla, aprobarla y publicarla en GitHub. Las tareas en revisión permanecen con `[ ]`.

## Completadas

- [x] Crear el repositorio independiente de Numbo y publicar la versión inicial.
- [x] Crear Docker y levantar el juego en `http://127.0.0.1:8080`.
- [x] Documentar la ruta de trabajo y las especificaciones.
- [x] Usar `p5.js` y `p5.sound` localmente.
- [x] Usar la distribución minimizada de `p5.js` para acelerar la carga web.
- [x] Activar compresión y caché segura para la publicación web.
- [x] Comprimir las músicas largas conservando formato, duración y calidad adecuada.
- [x] Optimizar la imagen de la copa conservando PNG, transparencia y calidad de visualización.
- [x] Mostrar progreso real de imágenes y audios durante la bienvenida.
- [x] Crear el panel profesional `MISIÓN — HALLAR — número` aprobado.
- [x] Mejorar las letras del panel: `MISIÓN` dorado y `HALLAR` blanco con sombra.
- [x] Actualizar la información del autor.
- [x] Organizar los estados del juego y el reinicio de partida.
- [x] Corregir y probar el motor matemático.
- [x] Corregir y probar las colisiones principales.
- [x] Documentar el análisis de velocidad, dificultad y arquitectura.

## Audio completado

- [x] Controlador de audio: música por estado, pausa, silencio, tecla `M`, icono WebP y persistencia.
- [x] Menú visible inmediatamente y música desde la primera interacción.
- [x] Barra roja durante la pausa o cuando el sonido está silenciado.
- [x] Publicar los cambios de audio en el commit `3d79384`.

## Experiencia completada

- [x] Centralizar y guardar la selección de idiomas.
- [x] Traducir menú, pausa, cambio de nivel, victoria y derrota.
- [x] Añadir una pantalla de instrucciones traducida.
- [x] Mejorar la distribución del menú principal.
- [x] Destacar el número objetivo de la misión.

## Pendientes — versión 1

### En revisión

- [ ] Añadir atajos de pantalla completa y salida con `Esc`.
- [ ] Mantener resolución lógica de `600 × 400` y proporción `3:2`.
- [ ] Validar las traducciones con fuentes o hablantes confiables.
- [ ] Aprobar pantalla completa desde menú y pausa.
- [ ] Aprobar los atajos `Alt + Enter`, `F11` y salida con `Esc`.
- [ ] Escalar y centrar el canvas con barras laterales cuando correspondan.
- [ ] Adaptar mouse, textos y colisiones al escalado.
- [ ] Analizar y equilibrar la velocidad de los tres niveles.
- [ ] Analizar la arquitectura global y decidir si conviene introducir POO gradualmente.
- [ ] Revisar mapas, dificultad y progresión entre niveles.
- [ ] Revisar y optimizar imágenes grandes solamente cuando sea necesario.
- [ ] Ordenar variables globales, scripts y responsabilidades del código.
- [ ] Completar pruebas manuales y automáticas de los tres niveles.
- [ ] Probar el juego completo sin Internet y sin errores de consola.
- [ ] Preparar la publicación web.
- [ ] Empaquetar la versión estable con Tauri como `.exe`/`.msi`.

## Pendientes — versión 2

- [ ] Diseñar el control del personaje mediante gestos de la mano.
- [ ] Evaluar MediaPipe en JavaScript para manos y rostro.
- [ ] Diseñar la integración opcional de la cámara con el fondo del juego.
- [ ] Definir privacidad, permisos, calibración y alternativa mediante teclado.

## Mantenimiento del entorno

- [ ] Diagnosticar y corregir de forma segura los permisos ACL de Windows en la carpeta del proyecto.

## Regla de entrega

- [x] Trabajar una modificación a la vez.
- [x] Probar cada modificación en Docker.
- [x] Esperar la aprobación del usuario antes de hacer commit y push.
