# 13. GitHub, versiones y entregas

## Objetivo

Mantener un historial claro, recuperable y completamente separado de otros proyectos.

## Repositorio

- Repositorio exclusivo: `https://github.com/astlimbarko/numbo.git`.
- Rama principal actual: `main`.
- El ZIP original permanecerá fuera de Git.
- No se conectará esta carpeta con repositorios de otros proyectos.

## Ciclo por modificación

1. Elegir una tarea de las especificaciones.
2. Definir alcance y criterios de aceptación aplicables.
3. Implementar únicamente esa mejora o un bloque coherente pequeño.
4. Ejecutar validaciones automáticas.
5. Levantar o reconstruir Docker.
6. Entregar pasos de prueba al usuario.
7. Esperar aprobación explícita.
8. Crear un commit descriptivo.
9. Hacer push a GitHub.
10. Marcar la tarea completada en el plan.

## Commits

- Serán pequeños y enfocados.
- No mezclarán arreglos no relacionados.
- No incluirán archivos temporales, ZIP, secretos ni artefactos de compilación.
- Los mensajes describirán el resultado, por ejemplo `Corregir generación de multiplicaciones`.

## Ramas

- Mientras trabaje una sola persona y los cambios sean pequeños, se podrá continuar en `main` con aprobación previa.
- Para cambios grandes, experimentales o trabajo simultáneo se usarán ramas y pull requests.
- Tauri y rediseños amplios deberán considerar una rama propia.

## Versiones

- Se usarán etiquetas para entregas estables.
- Propuesta inicial: `v0.1.0` para la primera versión web estabilizada.
- La primera versión instalable con Tauri tendrá una versión explícita y notas de cambios.
- Cada binario deberá poder relacionarse con un commit y una etiqueta.

## Criterios de aceptación

- El árbol de trabajo queda limpio después de cada entrega aprobada.
- GitHub contiene todos los commits aprobados.
- Cada versión publicada puede reconstruirse desde el repositorio.
- No existe dependencia ni mezcla con el proyecto trabajado mediante Claude.
