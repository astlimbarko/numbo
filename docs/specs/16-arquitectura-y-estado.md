# 16. Evaluación de arquitectura y estado

## Objetivo

Evaluar cómo organizar el código antes de las etapas de pantalla completa, Tauri y la futura versión con control gestual, sin asumir que una conversión completa a programación orientada a objetos sea obligatoria.

## Problema actual

- Gran cantidad de variables globales.
- Funciones de diferentes archivos modifican el mismo estado.
- Dependencia del orden de carga de scripts.
- Código antiguo permanece cargado aunque funciones nuevas lo reemplacen.
- Riesgo de nombres duplicados.
- Reinicios futuros pueden omitir variables nuevas.
- Es difícil identificar qué sistema es responsable de cada cambio.

No se ha detectado actualmente una fuga importante de obstáculos, imágenes o sonidos. El problema principal es mantenibilidad y riesgo de errores al crecer.

## Alternativas que deberán compararse

### Opción A — Mantener estilo funcional con limpieza mínima

- Conservar funciones y variables actuales.
- Eliminar código antiguo.
- Agrupar constantes.
- Reducir globales cuando sea sencillo.

Ventaja: cambio pequeño. Desventaja: conserva dependencias y fragilidad.

### Opción B — Estado centralizado y módulos funcionales

- Crear un objeto central para datos de partida.
- Separar matemáticas, audio, entrada, colisiones, mapas e interfaz.
- Usar módulos JavaScript con importaciones explícitas.
- Mantener funciones puras siempre que sea posible.

Ventaja: equilibrio entre claridad, pruebas y esfuerzo. Esta es la recomendación preliminar.

### Opción C — Programación orientada a objetos

- Clases como `Juego`, `Jugador`, `Obstaculo`, `Nivel` y `AudioManager`.
- Encapsular datos y comportamiento.

Ventaja: puede ordenar entidades complejas. Desventaja: una migración total puede añadir complejidad innecesaria para el tamaño actual.

### Opción D — Arquitectura de componentes o ECS

- Separar entidades, componentes y sistemas.

Ventaja: útil para juegos grandes. Desventaja: probablemente excesiva para la versión actual de Numbo.

## Proceso de decisión

1. Terminar las correcciones funcionales prioritarias.
2. Inventariar variables globales, funciones duplicadas y dependencias.
3. Medir complejidad y necesidades reales de la versión 2.
4. Preparar ejemplos pequeños de las opciones viables.
5. Presentar ventajas, riesgos, costo y efecto sobre Tauri y control gestual.
6. Recomendar una alternativa.
7. Esperar aprobación antes de migrar.

## Recomendación preliminar

Adoptar estado centralizado y módulos funcionales. Usar clases únicamente donde aporten una ventaja concreta, como una familia de obstáculos o un controlador de audio. No convertir todo a POO por obligación.

## Gestión de memoria

- Mantener eliminación de obstáculos al colisionar o salir de pantalla.
- Vaciar arreglos al reiniciar y cambiar de nivel.
- Evitar registrar eventos o temporizadores repetidos.
- Evitar volver a cargar imágenes y sonidos durante reinicios.
- Añadir diagnóstico opcional de obstáculos activos, FPS y estado.
- Definir límites preventivos para objetos activos cuando corresponda.

## Criterios de aceptación

- Se presenta al usuario una comparación antes de migrar.
- La alternativa elegida tiene alcance y plan de reversión.
- No se pierde comportamiento del juego durante la reorganización.
- Se elimina código reemplazado y duplicado.
- El orden de scripts deja de ser una dependencia oculta.
- El reinicio utiliza una única fuente de estado.
- La arquitectura permite añadir teclado, control gestual y gamepad mediante una interfaz común.
