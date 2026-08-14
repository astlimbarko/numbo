# 12. Aplicación de escritorio con Tauri

## Objetivo

Distribuir Numbo como aplicación de Windows ligera, usando la misma versión web estabilizada.

## Momento de implementación

Tauri se incorporará después de completar la estabilización, pantalla completa y pruebas web. No se mezclarán inicialmente errores del juego con problemas de empaquetado.

## Requisitos técnicos

- Rust y Cargo instalados.
- Requisitos de compilación de Windows verificados.
- Tauri configurado para cargar los recursos locales del juego.
- WebView2 usado como motor web en Windows.
- Sin servidor Docker ni conexión a Internet durante el uso normal.
- Política de seguridad de contenido restrictiva y compatible con p5.js.
- Acceso nativo mínimo; no se habilitarán permisos innecesarios.

## Ventana

- Tamaño inicial apropiado para `600 × 400` más decoración cuando corresponda.
- Tamaño mínimo que preserve la usabilidad.
- Redimensionable.
- Pantalla completa desde botón y `Alt + Enter`.
- Nombre, icono y metadatos propios de Numbo.

## Distribución

- Generar instalador `.exe`.
- Generar paquete `.msi` cuando la herramienta lo permita.
- Probar instalación y desinstalación en Windows 10 y 11.
- Definir estrategia para WebView2 cuando no esté presente.
- Evaluar firma digital antes de una distribución pública.
- Versionar instaladores y publicar comprobaciones de integridad cuando corresponda.

## Datos locales

- Preferencias guardadas en una ubicación adecuada para la aplicación.
- Las actualizaciones no deberán borrar configuración ni progreso compatible.
- Debe existir una opción para restaurar valores predeterminados.

## Criterios de aceptación

- Numbo se instala y abre desde un acceso directo.
- Funciona sin Docker, navegador abierto ni Internet.
- Audio, imágenes, controles y pantalla completa funcionan igual que en web.
- El instalador puede desinstalarse limpiamente.
- La versión mostrada coincide con la etiqueta de GitHub.
