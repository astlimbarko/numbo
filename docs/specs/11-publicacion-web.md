# 11. Publicación web

## Objetivo

Preparar una versión web reproducible, segura y fácil de actualizar.

## Requisitos

- Construcción basada en los archivos versionados del repositorio.
- Dependencias del juego disponibles localmente.
- Título, icono y metadatos de Numbo.
- Nginx con tipos MIME correctos para JavaScript, imágenes y audio.
- Política de caché que permita actualizar el juego sin conservar HTML obsoleto.
- HTTPS cuando se publique fuera del equipo local.

## Entornos

- Desarrollo: `127.0.0.1:8080` mediante Docker.
- Producción: proveedor por decidir.
- La configuración de producción no deberá asumir que existe Python o Docker en el dispositivo del jugador.

## Criterios de aceptación

- La versión publicada coincide con una versión etiquetada en GitHub.
- Se puede abrir mediante HTTPS.
- No hay rutas rotas ni dependencias externas accidentales.
- Existe un procedimiento documentado de actualización y reversión.
