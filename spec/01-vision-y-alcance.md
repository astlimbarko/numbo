# 01. Visión y alcance

## Objetivo

Numbo será un juego educativo de matemáticas, accesible desde navegador y como aplicación de Windows. El jugador controla a Numbi, evita o recoge operaciones y debe elegir las que producen el resultado indicado por la misión.

## Plataformas objetivo

- Navegadores modernos de escritorio.
- Windows 10 y Windows 11 mediante Tauri y WebView2.
- Docker para desarrollo y validación local.

Los dispositivos móviles no forman parte de la primera versión estable, pero la arquitectura no debe impedir incorporarlos posteriormente.

## Principios

- Aprendizaje claro: cada operación debe ser matemáticamente correcta y comprensible.
- Respuesta justa: las colisiones y controles deben coincidir con lo que el jugador ve.
- Funcionamiento local: jugar no requerirá conexión a Internet.
- Código compartido: no habrá una copia distinta del juego para Tauri.
- Mejoras incrementales: conservar personajes, mapas, sonidos y mecánicas actuales.

## Alcance de la estabilización

- Tres niveles completamente jugables.
- Suma, resta, multiplicación y división.
- Menú, pausa, victoria, derrota y reinicio.
- Idiomas configurables.
- Audio configurable.
- Pantalla completa y ventana adaptable.
- Guardado local de preferencias.
- Ejecución web, Docker y aplicación de Windows.

## Fuera del alcance inicial

- Multijugador.
- Cuentas en línea.
- Servidor o base de datos.
- Compras dentro del juego.
- Editor visual de niveles.
- Sincronización del progreso en la nube.

## Criterios de aceptación

- El objetivo del juego puede explicarse desde una pantalla de instrucciones.
- Los tres niveles se pueden completar sin recargar la página.
- La partida puede reiniciarse después de ganar o perder.
- El juego funciona sin Internet.
- La misma versión funciona en navegador y Tauri.
