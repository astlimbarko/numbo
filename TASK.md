# Ruta de trabajo de Numbo

Este es el checklist operativo y actualizado del proyecto. `PLAN_TRABAJO.md` conserva el plan inicial como referencia historica; las especificaciones detalladas estan en `docs/specs/`.

Una tarea se marca `[X]` solamente cuando fue implementada, probada, aprobada y guardada en Git. Las tareas se trabajan de una en una.

## Version 1 - Base terminada

[X] Crear un repositorio independiente y trabajar en una rama de desarrollo
[X] Crear Docker y levantar el juego en `http://127.0.0.1:8080`
[X] Mantener p5.js y p5.sound locales y usar p5.js minimizado
[X] Activar compresion y cache para la version web
[X] Optimizar musica, copa y carga inicial con progreso real
[X] Mantener resolucion logica de 600 x 400 y proporcion 3:2
[X] Escalar y centrar el canvas con barras laterales
[X] Adaptar mouse, textos y colisiones al escalado
[X] Implementar pantalla completa desde menu y pausa
[X] Implementar F11, Alt + Enter y salida escalonada con Esc
[X] Crear estados claros, reinicio, pausa, victoria y derrota
[X] Detener mapas, movimiento y colisiones fuera de la partida activa
[X] Corregir el motor matematico y sus pruebas automaticas
[X] Corregir colisiones, hitboxes y controles principales
[X] Centralizar idiomas y recordar la seleccion
[X] Traducir menu, controles, pausa, niveles, victoria y derrota
[X] Crear la bienvenida que habilita audio con clic, Enter o Espacio
[X] Centralizar musica, efectos, pausa, silencio y tecla M
[X] Crear sonidos de hover del menu y entrada en pausa
[X] Crear el panel profesional MISION - HALLAR - numero
[X] Redisenar el panel de Controles y abrirlo con Esc desde el menu
[X] Crear la sombra fija de Numbi sobre el suelo
[X] Ajustar el mapa y la velocidad de Numbi en el nivel 3
[X] Crear efectos de viento ambiental y de movimiento en el nivel 3
[X] Mezclar operaciones del nivel 3 y reducir operandos gigantes
[X] Crear accesos directos `?testLevel=1`, `2` y `3`
[X] Conservar la arquitectura actual y planificar una refactorizacion gradual sin reescritura POO

## Version 1 - Siguiente tarea

[ ] Analizar y mejorar la visibilidad de las operaciones matematicas sin afectar la estabilidad

## Version 1 - Jugabilidad y equilibrio

[ ] Probar y equilibrar la velocidad definitiva de los tres niveles
[ ] Revisar frecuencia, legibilidad y dificultad de las operaciones por nivel
[ ] Revisar mapas, parallax, transiciones y requisitos para completar cada nivel
[ ] Completar manualmente los niveles 1, 2 y 3, incluyendo victoria, derrota y reinicio
[ ] Decidir si Numbo guardara el progreso de niveles

## Version 1 - Interfaz y accesibilidad

[ ] Validar las traducciones con hablantes o fuentes confiables
[ ] Revisar textos largos y caracteres en los cinco idiomas
[ ] Completar navegacion del menu mediante teclado y estados visibles de seleccion
[ ] Revisar contraste y no depender solamente del color para comunicar resultados
[ ] Evaluar un control de volumen independiente ademas del boton de silencio

## Version 1 - Arquitectura y mantenimiento

[ ] Auditar variables globales, archivos y dependencias por orden de carga
[ ] Eliminar variables, funciones y comentarios obsoletos de forma gradual
[ ] Separar configuracion, estado, renderizado y logica donde aporte estabilidad
[ ] Sustituir numeros magicos importantes por constantes configurables
[ ] Anadir formateo y analisis estatico de JavaScript cuando el codigo este preparado
[ ] Optimizar imagenes adicionales solamente si una medicion demuestra que es necesario

## Version 1 - Pruebas finales

[ ] Crear el checklist manual definitivo por pantalla y nivel
[ ] Probar todos los idiomas, audio, silencio, pausa y pantalla completa
[ ] Probar HD, Full HD, pantallas pequenas y cambios de tamano
[ ] Probar el juego completamente sin Internet
[ ] Reconstruir Docker desde cero y verificar todos los recursos HTTP
[ ] Completar los tres niveles sin bloqueos ni errores de consola

## Version 1 - Publicacion web

[ ] Preparar una compilacion web limpia y versionada
[ ] Anadir titulo, descripcion, icono y metadatos web
[ ] Elegir el servicio de alojamiento
[ ] Publicar una version de prueba y verificarla en navegadores principales
[ ] Documentar despliegue, actualizacion y recuperacion de una version
[ ] Crear una etiqueta Git para la primera version estable

## Version de escritorio - Despues de publicar la web

[ ] Instalar y verificar Rust, Cargo, WebView2 y requisitos de Windows
[ ] Integrar Tauri conservando una sola base de codigo
[ ] Configurar nombre, version, identificador, ventana e iconos
[ ] Verificar p5.js, audio, almacenamiento y funcionamiento sin Internet
[ ] Generar y probar instaladores `.exe` y `.msi`
[ ] Documentar nuevas compilaciones y evaluar firma digital

## Version 2 - Camara, gestos y dispositivos moviles

[ ] Disenar el control de Numbi mediante gestos de la mano
[ ] Evaluar MediaPipe en JavaScript para manos y rostro
[ ] Disenar la integracion opcional de la camara con el fondo
[ ] Definir privacidad, permisos, calibracion y alternativa mediante teclado
[ ] Disenar controles tactiles y evaluar una futura version Android

## Entorno de desarrollo

[ ] Diagnosticar y corregir de forma segura los permisos ACL de Windows

## Regla permanente de entrega

[X] Trabajar una microtarea por vez
[X] Probar cada cambio en Docker
[X] Esperar aprobacion antes de hacer commit
[X] Crear commits pequenos y descriptivos
[X] Trabajar fuera de `main` durante el desarrollo
