# 06a. Flujo de música por estado

## Objetivo

Conseguir que la música acompañe claramente el menú, el inicio de partida, la pausa, los cambios de nivel, la victoria y la derrota.

## Restricción del navegador

Los navegadores pueden bloquear cualquier audio iniciado antes de que el usuario haga clic, toque una tecla o interactúe con la página. Por eso no se puede garantizar música audible inmediatamente al abrir la URL.

## Solución propuesta

- Mostrar inicialmente una pantalla breve con el mensaje `Haz clic para comenzar`.
- La primera interacción habilitará el sistema de audio.
- Después de esa interacción comenzará la música del menú.
- En Tauri se evaluará si la política de la WebView permite una experiencia más directa, conservando siempre control para silenciar.

## Música por estado

### Inicio y menú

- Antes de la primera interacción no se asumirá que el navegador permitirá sonido.
- Después de `Haz clic para comenzar`, sonará la música de menú en bucle.
- Regresar al menú detendrá la música del nivel y restaurará la música del menú.

### Comenzar a jugar

- Al pulsar `Jugar`, la música del menú hará una transición corta de salida.
- Comenzará la pista correspondiente al nivel actual.
- La transición deberá sentirse como el inicio de una nueva fase y no como un corte accidental.
- Se evaluará añadir un sonido breve de inicio o cuenta regresiva `3, 2, 1`.

### Pausa

- Al pausar, la música también se pausará.
- Al continuar, la música se reanudará desde el mismo punto.
- No se reiniciará la pista desde el principio.
- Los efectos y la generación de nuevos sonidos quedarán suspendidos durante la pausa.

### Nivel completado

- La música del nivel se pausará o reducirá de volumen.
- Sonará un efecto corto de nivel completado.
- Al continuar, comenzará la música del siguiente nivel.

### Victoria

- La música del nivel se detendrá.
- El sonido de victoria se reproducirá una sola vez.
- Si la pantalla permanece abierta, no se repetirá en cada fotograma.

### Derrota

- La música del nivel se detendrá o reducirá suavemente.
- Se podrá incorporar un efecto corto de derrota.
- Reintentar iniciará nuevamente la música del nivel 1.

## Controles

- Botón visible para activar o silenciar audio.
- Control de volumen en una fase posterior de interfaz.
- Preferencia de audio guardada localmente.
- Si el usuario eligió silencio, ninguna transición volverá a activar sonido por sí sola.

## Alternativas para el inicio de partida

Se analizarán con el usuario estas opciones:

1. Efecto breve y entrada inmediata a la música del nivel.
2. Cuenta regresiva visual y sonora `3, 2, 1`.
3. Transición musical gradual desde el tema del menú.

La recomendación inicial es combinar un efecto corto de inicio con una transición suave hacia la música del nivel, sin retrasar demasiado la acción.

## Criterios de aceptación

- Después de la primera interacción, el menú tiene música.
- Pulsar `Jugar` cambia claramente de música de menú a música de nivel.
- Pausar detiene la música y continuar la reanuda desde el mismo punto.
- Regresar al menú recupera su música.
- No hay pistas superpuestas.
- Victoria y derrota no repiten sonidos por fotograma.
- Silenciar se respeta en todos los estados.
