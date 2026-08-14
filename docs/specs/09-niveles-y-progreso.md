# 09. Niveles, dificultad y progreso

## Objetivo

Definir una progresión coherente y evitar bloqueos durante los cambios de nivel.

## Progresión inicial

- Nivel 1: suma y resta básica; termina con 10 aciertos acumulados.
- Nivel 2: suma y resta con negativos; termina con 20 aciertos acumulados.
- Nivel 3: multiplicación y división; termina con 30 aciertos acumulados.

Antes de estabilizar se decidirá si los objetivos seguirán siendo acumulados o se mostrarán como progreso propio de cada nivel. La interfaz deberá dejarlo claro.

## Reglas

- Completar un nivel detendrá temporalmente generación y colisiones.
- El jugador confirmará cuándo continuar.
- Al comenzar el siguiente nivel se limpiarán obstáculos anteriores.
- El mapa, velocidad, intervalo de generación y música cambiarán una sola vez.
- Las vidas adicionales por completar niveles estarán documentadas y visibles.
- El nivel 3 terminará en `VICTORY`, no en un nivel inexistente.

## Equilibrio

- La velocidad y frecuencia no impedirán leer la operación.
- Siempre habrá oportunidades suficientes de respuestas correctas.
- La dificultad matemática y la dificultad física aumentarán gradualmente.
- Los parámetros estarán centralizados para poder ajustarlos.

## Guardado de progreso

- Primera versión: guardar preferencias obligatoriamente.
- Guardar el progreso de partida será una decisión separada.
- Si se guarda progreso, deberá incluir versión del formato y opción para reiniciar.

## Criterios de aceptación

- Los tres niveles pueden completarse consecutivamente.
- No quedan operaciones del nivel anterior.
- El nivel y la misión mostrados son correctos.
- Ganar no incrementa el nivel a `4`.
- Reiniciar devuelve el juego exactamente al comienzo del nivel 1.
