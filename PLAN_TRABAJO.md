# Plan de trabajo de Numbo

Este documento es la cola oficial de tareas del proyecto. Cada mejora se implementará y probará por separado. El commit y el push se harán después de la aprobación del usuario.

## 1. Base técnica y ejecución

- [ ] Usar las copias locales de `p5.js` y `p5.sound.min.js`.
- [ ] Comprobar que el juego funcione completamente sin Internet.
- [ ] Confirmar que todas las imágenes y sonidos carguen correctamente.
- [ ] Revisar y simplificar el orden de carga de los scripts.
- [ ] Mantener Docker como entorno reproducible de desarrollo.
- [ ] Conseguir que `docker compose up --build -d` levante el juego sin pasos adicionales.
- [ ] Añadir comandos claros de inicio, reconstrucción, diagnóstico y apagado al README.

## 2. Sistema de estados

- [ ] Definir estados claros: menú, jugando, pausa, cambio de nivel, victoria y derrota.
- [ ] Evitar que varios estados se ejecuten simultáneamente.
- [ ] Impedir que `Esc` inicie accidentalmente una partida desde el menú.
- [ ] Desactivar movimiento y colisiones cuando la partida termine.
- [ ] Centralizar los cambios de nivel.
- [ ] Eliminar banderas redundantes o contradictorias.

## 3. Reinicio y flujo de partida

- [ ] Crear una función de reinicio completo.
- [ ] Restablecer vidas, aciertos, errores y misión.
- [ ] Restablecer nivel, objetivos y banderas de finalización.
- [ ] Vaciar obstáculos y efectos visuales.
- [ ] Restablecer posición, salto y dirección del personaje.
- [ ] Restablecer posiciones de todos los mapas.
- [ ] Añadir opción para volver a jugar después de ganar.
- [ ] Añadir opción para volver a jugar después de perder.
- [ ] Añadir opción para regresar al menú.

## 4. Operaciones matemáticas

- [ ] Corregir la generación de multiplicaciones que deberían producir la misión exacta.
- [ ] Garantizar divisiones válidas y sin división entre cero.
- [ ] Revisar sumas y restas con números negativos.
- [ ] Evitar operaciones ambiguas o visualmente confusas.
- [ ] Definir claramente la dificultad matemática de cada nivel.
- [ ] Garantizar una frecuencia justa de respuestas correctas e incorrectas.
- [ ] Sustituir `eval()` por un cálculo explícito y seguro.
- [ ] Crear pruebas automáticas para suma, resta, multiplicación y división.
- [ ] Probar que toda misión tenga respuestas posibles.

## 5. Colisiones y personaje

- [ ] Corregir la altura cero de las hitboxes de operaciones.
- [ ] Alinear la hitbox con el texto visible.
- [ ] Ajustar la hitbox del personaje a su cuerpo visible.
- [ ] Evitar colisiones dobles o repetidas.
- [ ] Revisar colisiones durante el salto.
- [ ] Revisar límites izquierdo y derecho del personaje.
- [ ] Corregir condiciones de teclado con paréntesis explícitos.
- [ ] Probar controles con WASD y flechas.
- [ ] Considerar controles táctiles para una futura versión móvil/web.

## 6. Audio

- [ ] Centralizar música y efectos en un controlador de audio.
- [ ] Cambiar música solamente al entrar o salir de un estado o nivel.
- [ ] Evitar comprobaciones de reproducción en cada fotograma.
- [ ] Detener correctamente la música anterior al cambiar de nivel.
- [ ] Reproducir una sola vez los sonidos de victoria y derrota.
- [ ] Pausar o atenuar el audio cuando el juego esté en pausa.
- [ ] Añadir control de volumen.
- [ ] Añadir opción para silenciar música y efectos.
- [ ] Recordar la configuración de audio localmente.

## 7. Idiomas y textos

- [ ] Implementar la función faltante `seleccionarIdioma()`.
- [ ] Definir qué textos deben traducirse.
- [ ] Crear una estructura centralizada de traducciones.
- [ ] Implementar español.
- [ ] Implementar quechua.
- [ ] Implementar aymara.
- [ ] Implementar guaraní.
- [ ] Implementar plautdietsch.
- [ ] Validar las traducciones con hablantes o fuentes confiables.
- [ ] Corregir caracteres y codificación UTF-8.
- [ ] Cambiar dinámicamente el atributo de idioma de la aplicación.
- [ ] Recordar el idioma seleccionado localmente.

## 8. Menús e interfaz

- [ ] Añadir una pantalla de instrucciones y controles.
- [ ] Mejorar la navegación del menú principal.
- [ ] Añadir botones claros para jugar, continuar, reiniciar y salir.
- [ ] Mejorar el menú de pausa.
- [ ] Mostrar claramente misión, vidas, nivel y puntuación.
- [ ] Añadir retroalimentación visual para respuestas correctas e incorrectas.
- [ ] Revisar legibilidad, contraste y tamaños de texto.
- [ ] Añadir navegación mediante teclado.
- [ ] Añadir estados visuales de foco y selección.

## 9. Pantalla completa y adaptación

- [ ] Añadir un botón de pantalla completa.
- [ ] Añadir un atajo de teclado apropiado para pantalla completa.
- [ ] Permitir salir de pantalla completa con `Esc`.
- [ ] Mantener `600 × 400` como resolución lógica inicial.
- [ ] Escalar el canvas conservando la proporción `3:2`.
- [ ] Centrar el juego y usar barras cuando la pantalla tenga otra proporción.
- [ ] Adaptar correctamente coordenadas del mouse al escalado.
- [ ] Verificar que colisiones y controles no cambien con el escalado.
- [ ] Probar resoluciones HD, Full HD y pantallas pequeñas.
- [ ] Revisar comportamiento al cambiar el tamaño de la ventana.

## 10. Mapas, niveles y dificultad

- [ ] Corregir variables inconsistentes de los fondos de mapas.
- [ ] Revisar velocidades de desplazamiento y parallax.
- [ ] Reiniciar correctamente cada mapa al comenzar una partida.
- [ ] Equilibrar velocidad de obstáculos por nivel.
- [ ] Equilibrar frecuencia de aparición de operaciones.
- [ ] Confirmar requisitos para completar cada nivel.
- [ ] Evitar bloqueos al pasar del nivel 1 al 2 y del 2 al 3.
- [ ] Revisar la pantalla final del nivel 3.
- [ ] Documentar cómo añadir mapas y niveles en el futuro.

## 11. Calidad y mantenimiento del código

- [ ] Declarar explícitamente todas las variables globales utilizadas.
- [ ] Eliminar variables y comentarios obsoletos.
- [ ] Adoptar nombres consistentes para variables y funciones.
- [ ] Separar configuración, estado, renderizado y lógica.
- [ ] Evitar números mágicos mediante constantes configurables.
- [ ] Evitar dependencias implícitas entre archivos y orden de scripts.
- [ ] Añadir modo estricto o módulos cuando el código esté preparado.
- [ ] Añadir formateo y análisis estático de JavaScript.
- [ ] Documentar la arquitectura básica del juego.

## 12. Guardado local

- [ ] Guardar preferencias de idioma, volumen y pantalla completa.
- [ ] Decidir si se guardará el progreso de niveles.
- [ ] Añadir una opción para borrar datos guardados.
- [ ] Manejar datos antiguos o inválidos sin romper el juego.

## 13. Pruebas

- [ ] Crear una lista de pruebas manuales por pantalla y nivel.
- [ ] Probar inicio, pausa, reanudación y regreso al menú.
- [ ] Probar victoria, derrota y reinicio.
- [ ] Probar todos los idiomas.
- [ ] Probar el juego sin conexión a Internet.
- [ ] Probar audio activado, silenciado y después de pausar.
- [ ] Probar pantalla completa y ventana normal.
- [ ] Completar los tres niveles sin errores de consola.
- [ ] Comprobar rutas y respuestas HTTP de todos los recursos.
- [ ] Añadir pruebas automáticas para la lógica que no dependa de p5.js.

## 14. Accesibilidad y experiencia

- [ ] Evitar depender únicamente del color para indicar aciertos y errores.
- [ ] Añadir textos o símbolos de apoyo a los efectos visuales.
- [ ] Revisar contraste de interfaz y operaciones.
- [ ] Permitir jugar sin mouse en las pantallas principales.
- [ ] Considerar reducción de movimiento y control independiente de volumen.

## 15. Publicación web

- [ ] Preparar una compilación web limpia y versionada.
- [ ] Definir configuración de producción para Nginx.
- [ ] Revisar caché de JavaScript, imágenes y audio.
- [ ] Añadir metadatos, título e icono web.
- [ ] Elegir posteriormente un servicio de publicación.
- [ ] Documentar el proceso de despliegue y actualización.

## 16. Aplicación de escritorio con Tauri

- [ ] Instalar y verificar Rust, Cargo y requisitos de compilación de Windows.
- [ ] Añadir Tauri al proyecto después de estabilizar la versión web.
- [ ] Mantener una sola base de código para web y escritorio.
- [ ] Configurar nombre, versión, identificador y metadatos de Numbo.
- [ ] Crear iconos de aplicación en todos los tamaños necesarios.
- [ ] Configurar ventana inicial, dimensiones mínimas y pantalla completa.
- [ ] Asegurar funcionamiento completamente sin Internet.
- [ ] Verificar compatibilidad de p5.js, audio y almacenamiento con WebView2.
- [ ] Aplicar una política de seguridad de contenido adecuada.
- [ ] Generar instaladores `.exe` y `.msi`.
- [ ] Probar instalación, ejecución, actualización y desinstalación.
- [ ] Documentar cómo generar nuevas versiones.
- [ ] Evaluar firma digital del instalador para distribución pública.

## 17. GitHub y flujo de trabajo

- [ ] Trabajar una mejora aislada por vez.
- [ ] Validar técnicamente cada modificación antes de entregarla.
- [ ] Probar la modificación en Docker.
- [ ] Esperar la aprobación del usuario antes de hacer commit.
- [ ] Crear commits pequeños y descriptivos.
- [ ] Subir cada commit aprobado a `origin/main` mientras se mantenga este flujo.
- [ ] Usar ramas y pull requests cuando comiencen cambios grandes o simultáneos.
- [ ] Mantener el ZIP original fuera del historial Git.
- [ ] Etiquetar versiones estables del juego.

## Orden recomendado de ejecución

1. Dependencias locales y ejecución sin Internet.
2. Estados y reinicio de partida.
3. Operaciones matemáticas.
4. Colisiones y controles.
5. Audio.
6. Idiomas y codificación.
7. Menús e interfaz.
8. Pantalla completa y adaptación.
9. Mapas, dificultad y limpieza del código.
10. Guardado local y accesibilidad.
11. Pruebas completas.
12. Publicación web.
13. Empaquetado final con Tauri.
