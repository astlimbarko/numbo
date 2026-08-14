# 10. Calidad y pruebas

## Objetivo

Detectar regresiones antes de cada commit aprobado.

## Validaciones automáticas

- Sintaxis de todos los JavaScript propios.
- Pruebas del motor matemático.
- Comprobación de archivos y rutas referenciadas.
- Validación de `docker compose config`.
- Construcción limpia de la imagen Docker.
- Respuesta HTTP del juego y recursos principales.

## Pruebas manuales mínimas por entrega

- Abrir menú.
- Iniciar partida.
- Moverse y saltar.
- Acertar y fallar una operación.
- Pausar y reanudar.
- Volver al menú cuando aplique.
- Revisar consola del navegador.

## Prueba completa antes de una versión

- Completar niveles 1, 2 y 3.
- Perder todas las vidas y reiniciar.
- Ganar y volver a jugar.
- Probar todos los idiomas implementados.
- Probar audio, silencio y persistencia.
- Probar ventana y pantalla completa.
- Probar sin Internet.
- Probar Docker desde construcción limpia.
- Probar la aplicación Tauri instalada.

## Limpieza técnica

- Declarar todas las variables.
- Eliminar código muerto y comentarios obsoletos.
- Centralizar constantes y configuración.
- Separar lógica matemática de p5.js.
- Evitar `eval()` y estados globales implícitos.
- Documentar decisiones que afecten extensiones futuras.

## Criterios de aceptación

- Las validaciones aplicables pasan.
- No hay errores no explicados en consola.
- Cada error corregido tiene una prueba o un procedimiento que evita su regreso.
- El usuario recibe pasos concretos para verificar cada entrega.
