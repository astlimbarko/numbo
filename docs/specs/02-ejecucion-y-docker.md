# 02. Ejecución local, dependencias y Docker

## Objetivo

Garantizar que cualquier integrante pueda iniciar Numbo de forma reproducible y sin depender de servicios externos.

## Requisitos funcionales

- `index.html` cargará `p5.js` y `p5.sound.min.js` desde archivos locales.
- Todas las imágenes, sonidos, estilos y scripts usarán rutas internas válidas.
- La carga inicial no realizará solicitudes obligatorias a Internet.
- Docker expondrá el juego únicamente en `127.0.0.1:8080` durante desarrollo.
- `docker compose up --build -d` deberá construir e iniciar el juego.
- `docker compose down` deberá detener y retirar el servicio administrado por Compose.

## Requisitos técnicos

- Nginx servirá los archivos estáticos.
- El ZIP original no entrará en la imagen Docker ni en Git.
- Los recursos estáticos podrán usar caché; `index.html` no deberá quedar obsoleto durante desarrollo.
- El contenedor tendrá una comprobación de salud HTTP.
- La configuración no publicará el proyecto en todas las interfaces de red por defecto.

## Pruebas

- Abrir el juego con Internet desactivado.
- Confirmar respuesta HTTP `200` en `/`.
- Confirmar respuesta `200` para todos los scripts, imágenes y audios utilizados.
- Reconstruir desde cero sin archivos generados previamente.
- Revisar la consola del navegador durante la precarga.

## Criterios de aceptación

- El menú aparece sin conexión a Internet.
- La música y los mapas cargan localmente.
- No hay recursos obligatorios con URL `http://` o `https://`.
- Los comandos documentados funcionan desde la raíz del repositorio.
