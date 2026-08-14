# 07. Idiomas y textos

## Objetivo

Convertir el menú de idiomas actual en un sistema funcional, centralizado y verificable.

## Idiomas previstos

- Español.
- Quechua.
- Aymara.
- Guaraní.
- Plautdietsch.

## Arquitectura

- Las traducciones vivirán en una estructura centralizada por claves.
- La interfaz solicitará textos por clave, no mediante textos escritos directamente en cada función.
- `seleccionarIdioma(codigo)` validará el idioma, lo activará y lo guardará.
- Si falta una traducción, se usará español como respaldo.
- El idioma inicial será el guardado o español.

## Textos incluidos

- Menú principal.
- Instrucciones y controles.
- Pausa.
- Indicadores de misión, nivel, vidas y puntuación.
- Mensajes de nivel completado.
- Victoria y derrota.
- Botones de reinicio, continuación, retorno y pantalla completa.

## Codificación

- Todos los archivos de texto usarán UTF-8.
- Se revisarán tildes, eñes y caracteres propios de cada idioma.
- El documento HTML declarará el idioma activo cuando sea posible.

## Validación

- Las traducciones indígenas deberán revisarse con una persona competente o una fuente confiable antes de considerarse finales.
- Una traducción provisional se marcará explícitamente como pendiente.

## Criterios de aceptación

- Seleccionar un idioma no genera errores.
- Los textos visibles cambian inmediatamente.
- La selección persiste después de cerrar y abrir.
- No aparecen claves internas ni caracteres dañados en pantalla.
