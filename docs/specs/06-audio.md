# 06. Audio

## Objetivo

Controlar música y efectos según estados, sin reinicios, superposiciones ni llamadas innecesarias por fotograma.

## Canales

- Música de menú.
- Música de nivel 1.
- Música de nivel 2.
- Música de nivel 3.
- Efecto de respuesta correcta.
- Efecto de respuesta incorrecta.
- Efecto de victoria.
- Efecto de derrota, si se incorpora.

## Reglas

- El cambio de música ocurrirá al entrar en un estado o nivel.
- Solo una pista musical principal podrá estar activa.
- Los efectos no detendrán la música.
- Victoria y derrota se reproducirán una sola vez por transición.
- Pausar congelará o atenuará el audio según la decisión de diseño.
- Reiniciar limpiará el estado de audio anterior.
- El primer inicio respetará las restricciones de reproducción automática del navegador.

## Configuración

- Volumen general.
- Volumen de música.
- Volumen de efectos.
- Silenciar todo.
- Preferencias guardadas en almacenamiento local.

## Criterios de aceptación

- No se escuchan dos músicas de mapa simultáneamente.
- Cambiar de nivel cambia la pista una sola vez.
- Pausar y reanudar no reinicia continuamente la canción.
- La configuración persiste al recargar.
