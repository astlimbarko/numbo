# 15. Velocidad y dificultad

## Objetivo

Analizar y corregir la progresión de velocidad para que cada nivel se perciba más desafiante de manera coherente, sin sacrificar la lectura de las operaciones.

## Problema detectado

La velocidad está repartida entre distintas variables y archivos:

- Velocidad horizontal de las operaciones.
- Intervalo de aparición de operaciones.
- Velocidad base del mapa.
- Multiplicadores individuales de cada capa del mapa.
- Velocidad del personaje.

Aunque el nivel 3 usa una velocidad base de mapa mayor, sus multiplicadores son menores. Algunas capas del nivel 3 pueden verse más lentas que el suelo del nivel 2. Esto hace que el aumento de dificultad no siempre sea perceptible visualmente.

## Estado actual aproximado

| Nivel | Operaciones | Intervalo | Velocidad base del mapa |
|---|---:|---:|---:|
| 1 | 6 | 90 fotogramas | 3.5 |
| 2 | 7 | 90 fotogramas | 7.5 |
| 3 | 8 | 65 fotogramas | 11.5 |

Estos valores no cuentan toda la historia porque cada mapa aplica multiplicadores diferentes a sus capas.

## Trabajo de análisis

- Medir la velocidad efectiva de cada capa de los tres mapas.
- Comparar velocidad visual del suelo y primer plano entre niveles.
- Medir tiempo disponible para leer y decidir cada operación.
- Revisar frecuencia de respuestas correctas respecto a la velocidad.
- Determinar si el personaje necesita conservar o aumentar su velocidad.
- Evaluar dificultad física y matemática por separado.
- Probar el nivel 3 con jugadores antes de fijar valores definitivos.

## Solución propuesta

Centralizar parámetros por nivel en una configuración única:

```js
const CONFIG_NIVELES = {
  1: {
    velocidadOperacion: 6,
    intervaloOperacion: 90,
    velocidadMapa: 3.5,
    velocidadPersonaje: 6
  },
  2: {
    velocidadOperacion: 7,
    intervaloOperacion: 80,
    velocidadMapa: 5,
    velocidadPersonaje: 6
  },
  3: {
    velocidadOperacion: 8,
    intervaloOperacion: 65,
    velocidadMapa: 7,
    velocidadPersonaje: 6
  }
};
```

Los valores del ejemplo no son definitivos. Se elegirán después de medir y probar.

## Reglas

- Cada nivel tendrá una configuración explícita.
- Los multiplicadores de parallax tendrán una escala comparable entre mapas.
- El aumento visual no podrá dificultar excesivamente la lectura.
- La velocidad del personaje deberá permitir alcanzar operaciones sin hacer trivial el juego.
- La frecuencia de aparición tendrá un límite que evite demasiados objetos simultáneos.
- Los valores deberán poder ajustarse sin editar la lógica principal.

## Opciones a presentar antes de implementar

1. Aumento lineal y predecible por nivel.
2. Aumento distinto para mapa, operaciones y aparición.
3. Dificultad adaptativa según rendimiento del jugador.

La dificultad adaptativa quedará como posible mejora posterior; no se incorporará sin aprobación.

## Criterios de aceptación

- El nivel 2 se percibe más rápido que el nivel 1.
- El nivel 3 se percibe más rápido que el nivel 2.
- Las operaciones siguen siendo legibles.
- La configuración completa de dificultad está centralizada.
- No hay diferencias accidentales causadas por multiplicadores dispersos.
- Los tres niveles pueden completarse con controles normales.
