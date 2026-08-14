# 04. Motor matemático

## Objetivo

Generar operaciones correctas, justas y apropiadas para cada nivel sin utilizar `eval()`.

## Modelo de operación

Cada operación será un objeto con:

- Primer operando.
- Operador.
- Segundo operando.
- Resultado numérico.
- Texto para mostrar.
- Indicador de si coincide con la misión.

## Reglas generales

- Ninguna división tendrá divisor cero.
- Las divisiones producirán resultados enteros en la versión inicial.
- Una operación marcada como correcta deberá coincidir exactamente con la misión.
- Las operaciones incorrectas no podrán coincidir accidentalmente con la misión.
- La comparación será numérica, no basada en texto.
- No se utilizará `eval()`.
- Cada misión deberá tener una probabilidad configurable de respuesta correcta.

## Dificultad propuesta

### Nivel 1

- Suma y resta con enteros no negativos.
- Resultados dentro de un rango educativo definido.
- Sin expresiones con paréntesis negativos.

### Nivel 2

- Suma y resta incluyendo números negativos.
- Paréntesis visuales para operandos negativos cuando sean necesarios.
- Rango mayor que el nivel 1.

### Nivel 3

- Multiplicación y división.
- Factores y divisores elegidos a partir del resultado objetivo.
- División exacta.

## Pruebas automáticas

- Generar al menos 1.000 operaciones por nivel.
- Confirmar que el resultado almacenado coincide con el cálculo esperado.
- Confirmar que todas las operaciones correctas dan la misión.
- Confirmar que ninguna incorrecta da la misión.
- Confirmar ausencia de divisiones entre cero y resultados no finitos.
- Confirmar que los valores respetan los rangos del nivel.

## Criterios de aceptación

- No aparecen respuestas falsas etiquetadas como correctas.
- Siempre aparecen oportunidades razonables para progresar.
- Todas las expresiones mostradas son válidas y legibles.
- Las pruebas matemáticas pasan de forma repetible.
