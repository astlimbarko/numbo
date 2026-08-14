# 14. Jerarquía visual del número objetivo

## Objetivo

Conseguir que el número que el jugador debe encontrar se reconozca inmediatamente como la información principal de la partida.

## Problema actual

El número objetivo aparece integrado en la barra superior, pero no tiene suficiente jerarquía visual. Puede confundirse con vidas, aciertos, nivel u otros indicadores y obliga al jugador a buscarlo antes de interpretar las operaciones.

## Aspectos que se analizarán

- Tamaño del número.
- Posición dentro del área segura de `600 × 400`.
- Contraste con los tres mapas.
- Forma, color y tamaño de su contenedor.
- Icono o texto que explique que se trata de la misión.
- Separación respecto a vidas, nivel y puntuación.
- Animación moderada al cambiar de misión.
- Retroalimentación después de una respuesta correcta.
- Legibilidad en ventana pequeña y pantalla completa.
- Accesibilidad para personas que no distinguen ciertos colores.

## Reglas

- Será el elemento informativo más prominente durante `PLAYING`.
- No cubrirá al personaje, operaciones ni información necesaria.
- No dependerá únicamente del color para comunicar su función.
- Mantendrá una posición estable para reducir esfuerzo visual.
- Se renderizará en coordenadas lógicas y escalará junto con el canvas.
- Su animación no dificultará la lectura ni distraerá continuamente.

## Proceso de diseño

1. Revisar la barra superior actual.
2. Preparar propuestas de jerarquía, posición y estilo.
3. Comparar las propuestas dentro de los tres mapas.
4. Elegir una propuesta con el usuario.
5. Implementar el componente reutilizable.
6. Probarlo en ventana normal y pantalla completa.

## Criterios de aceptación

- El jugador puede identificar el objetivo inmediatamente.
- No se confunde con vidas, nivel, aciertos o puntuación.
- Es legible sobre los tres fondos.
- El cambio de objetivo se percibe claramente.
- Funciona con escalado y pantalla completa.
- Su significado se comprende sin depender exclusivamente de un color.
