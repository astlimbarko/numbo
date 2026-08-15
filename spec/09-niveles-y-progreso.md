# 09. Niveles, dificultad y progreso

## Objetivo

Definir una progresion coherente y evitar bloqueos durante los cambios de mision y nivel.

## Progresion acordada

- Nivel 1: solamente sumas; termina con 10 aciertos acumulados.
- Nivel 2: sumas, restas y algunos operandos negativos; termina con 20 aciertos acumulados.
- Nivel 3: sumas, restas, negativos y apariciones ocasionales de multiplicacion y division; termina con 30 aciertos acumulados.
- Todos los niveles conservan 50% de operaciones correctas y 50% incorrectas al momento de crearlas.

Los porcentajes y rangos exactos estan definidos en `04-motor-matematico.md`.

## Reglas de mision

- Cada operacion se crea para la mision vigente.
- Al atrapar una respuesta correcta se genera una mision nueva.
- Las operaciones restantes de la mision anterior se retiran antes de continuar.
- Atrapar una respuesta incorrecta no cambia la mision.

## Reglas de nivel

- Completar un nivel detendra temporalmente generacion, movimiento y colisiones.
- La transicion automatica continuara al siguiente nivel sin solicitar confirmacion.
- Al comenzar el siguiente nivel se limpiaran obstaculos anteriores.
- El mapa, velocidad, intervalo de generacion y musica cambiaran una sola vez.
- El nivel 3 terminara en victoria y no intentara abrir un nivel 4.

## Equilibrio

- La velocidad y frecuencia permitiran leer cada operacion.
- Siempre habra oportunidades suficientes de respuestas correctas.
- La dificultad matematica y la dificultad fisica aumentaran gradualmente.
- Los parametros se centralizaran para poder ajustarlos.
- Los porcentajes se validaran estadisticamente con pruebas automaticas.
- La experiencia final se validara completando manualmente los tres niveles.

## Guardado de progreso

- La version 1 guardara preferencias cuando corresponda.
- Guardar el progreso de partida sera una decision separada.
- Si se guarda progreso, incluira version del formato y opcion para reiniciar.

## Criterios de aceptacion

- Los tres niveles pueden completarse consecutivamente.
- Las familias matematicas respetan la progresion acordada.
- No quedan operaciones de una mision o nivel anterior.
- El nivel y la mision mostrados son correctos.
- Ganar no incrementa el nivel a 4.
- Reiniciar devuelve el juego exactamente al comienzo del nivel 1.
