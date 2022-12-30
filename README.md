## Francisco Méndez Labbe

Este sitio documenta y presenta la obra del pintor arquitecto **Francisco Méndez Labbe** y busca construir un espacio de colaboración en torno a la memoria de este artista.  

El fondo de archivo se encuentra representado por las partículas gráficas en ascención del lado derecho de la pantalla. Cada objeto está anotado de la siguiente manera:

### Estructura de datos

- [Planilla de datos](https://docs.google.com/spreadsheets/d/e/2PACX-1vQswJh4DoOWUujtJQctDbYMHnoTjYHE8Q_bHzGXW6fnglidAJdE3F0r2-E4UcpUV9Eakt67X8i99ROF/pubhtml) es un archivo que se exporta a XLS o CSV para ser procesado hacia un formato JSON
- [Herramienta](https://beautifytools.com/excel-to-json-converter.php) para convertir XLS (u otros) a JSON

Si no conoce el manejo de estas herramientas tendrá que hacerlo directamente en el archivo [data.json](data.json) de forma que su estructura sea de la forma:

```
data.json = 

[
    {
    "title": "Título"
    "date": "1957",
    "text": "Escuela Naval",
    "img": "http://franciscomendezlabbe.cl/images/.../filename.jpg",
    "video": "https://player.vimeo.com/...&color=050505&title=0&byline=0",
    "cat": "arquitectura"
    },
    ...
]

```
