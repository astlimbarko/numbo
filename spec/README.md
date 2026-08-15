# Especificaciones de Numbo

Esta carpeta contiene la definición funcional y técnica del proyecto. `PLAN_TRABAJO.md` es la lista de seguimiento; estos documentos explican qué debe hacerse, cómo debe comportarse y cuándo se considera terminado.

## Reglas del proyecto

- La resolución lógica del juego será `600 × 400` con proporción `3:2`.
- La versión web y la versión Tauri compartirán el mismo código del juego.
- El juego deberá funcionar sin conexión a Internet.
- Cada cambio se implementará de forma aislada, se validará y se entregará al usuario para prueba.
- El commit y el push se harán únicamente después de la aprobación del usuario.
- Un cambio no se considerará terminado solo porque compile: debe cumplir sus criterios de aceptación.

## Ruta de documentos

1. [Visión y alcance](01-vision-y-alcance.md)
2. [Ejecución local, dependencias y Docker](02-ejecucion-y-docker.md)
3. [Estados y flujo de partida](03-estados-y-flujo.md)
4. [Motor matemático](04-motor-matematico.md)
5. [Personaje, controles y colisiones](05-controles-y-colisiones.md)
6. [Audio](06-audio.md)
7. [Idiomas y textos](07-idiomas.md)
8. [Interfaz, adaptación y pantalla completa](08-interfaz-y-pantalla-completa.md)
9. [Niveles, dificultad y progreso](09-niveles-y-progreso.md)
10. [Calidad y pruebas](10-calidad-y-pruebas.md)
11. [Publicación web](11-publicacion-web.md)
12. [Aplicación de escritorio con Tauri](12-tauri.md)
13. [GitHub, versiones y entregas](13-github-y-versiones.md)

## Orden de implementación

### Fase 1 — Base estable

1. Dependencias locales y funcionamiento sin Internet.
2. Estados del juego y reinicio completo.
3. Motor matemático.
4. Colisiones y controles.
5. Audio.

### Fase 2 — Experiencia del jugador

6. Idiomas y textos.
7. Menús e interfaz.
8. Pantalla completa y diseño adaptable.
9. Niveles, dificultad y progreso.

### Fase 3 — Calidad y publicación

10. Pruebas completas y limpieza técnica.
11. Publicación web reproducible.
12. Aplicación e instalador con Tauri.

## Definición general de terminado

Una tarea está terminada cuando:

1. El comportamiento coincide con su especificación.
2. No aparecen errores nuevos en la consola.
3. El juego funciona en Docker.
4. Se prueban los casos normales y los casos límite aplicables.
5. El usuario comprueba el cambio y lo aprueba.
6. Se crea un commit descriptivo y se publica en GitHub.
