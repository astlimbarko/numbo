# 04. Motor matematico

## Objetivo

Generar operaciones correctas, justas, legibles y apropiadas para cada nivel sin utilizar `eval()`.

## Modelo de operacion

Cada operacion es un objeto con:

- Primer operando (`num1`).
- Operador.
- Segundo operando (`num2`).
- Resultado numerico.
- Texto para mostrar.
- Indicador de si coincide con la mision.

El renderizado utiliza los valores separados. El texto se conserva para pruebas y diagnostico.

## Reglas generales

- 50% de las operaciones creadas seran correctas y 50% incorrectas.
- Una operacion correcta coincidira exactamente con la mision vigente.
- Una operacion incorrecta nunca coincidira accidentalmente con la mision.
- La comparacion sera numerica, no basada en texto.
- Ninguna division tendra divisor cero.
- Todas las divisiones de la version 1 tendran resultado entero.
- Los operandos negativos se mostraran entre parentesis.
- No se utilizara `eval()`.
- Al cambiar la mision se retiraran las operaciones creadas para la mision anterior.

## Progresion matematica acordada

### Nivel 1 - Sumas

- 100% sumas.
- Sin restas, multiplicaciones, divisiones ni numeros negativos.
- Mision entre 4 y 20.
- Operandos no negativos y normalmente entre 0 y 20.
- La operacion debe poder leerse rapidamente mientras se mueve.

Ejemplos:

```text
2 + 5
7 + 3
9 + 6
```

### Nivel 2 - Sumas, restas y negativos

- 55% sumas.
- 45% restas.
- Aproximadamente 25% de las operaciones tendran al menos un operando negativo.
- Mision entre -6 y 13.
- Operandos normalmente entre -15 y 30.
- No apareceran multiplicaciones ni divisiones.

Ejemplos:

```text
8 + 6
14 - 5
8 + (-3)
5 - (-2)
```

### Nivel 3 - Mezcla completa

- 35% sumas.
- 30% restas.
- 20% multiplicaciones.
- 15% divisiones.
- Suma y resta seguiran siendo la mayoria.
- Aproximadamente 30% de las sumas y restas tendran al menos un operando negativo.
- Mision par entre 2 y 22.
- Las multiplicaciones usaran factores educativos.
- Las divisiones seran exactas y usaran divisores entre 1 y 10.
- Los dividendos podran ser mayores cuando sea necesario para producir la mision.
- Se conservara la reduccion de frecuencia para operandos de tres cifras.

Ejemplos:

```text
12 + 8
15 - 7
9 + (-4)
3 - (-6)
4 x 5
18 / 3
```

## Respuestas correctas e incorrectas

El reparto 50/50 se aplica al crear cada operacion, independientemente de su familia matematica.

Ejemplo con 100 operaciones creadas:

```text
50 correctas
50 incorrectas
```

Las operaciones que permanezcan en pantalla despues de un acierto no se reutilizaran para una mision nueva, porque fueron calculadas para el objetivo anterior.

## Pruebas automaticas

- Generar al menos 1.000 operaciones por nivel.
- Medir que las familias se aproximen a sus porcentajes con una muestra amplia.
- Confirmar que el resultado almacenado coincide con el calculo esperado.
- Confirmar que todas las operaciones correctas dan la mision.
- Confirmar que ninguna incorrecta da la mision.
- Confirmar ausencia de divisiones entre cero y resultados no finitos.
- Confirmar que los valores respetan las reglas del nivel.
- Confirmar que el nivel 1 nunca genera una operacion distinta de suma.
- Confirmar que el nivel 2 nunca genera multiplicacion o division.

## Criterios de aceptacion

- La progresion coincide con los porcentajes documentados.
- No aparecen respuestas falsas etiquetadas como correctas.
- Siempre aparecen oportunidades razonables para progresar.
- Todas las expresiones mostradas son validas y legibles.
- Ninguna operacion de una mision anterior permanece activa tras cambiar el objetivo.
- Las pruebas matematicas pasan de forma repetible.
