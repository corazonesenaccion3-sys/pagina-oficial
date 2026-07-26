# Corazones en Acción

Sitio estático, responsive y sin dependencias de JavaScript para su funcionamiento.

## Estructura

- `css/variables.css`: tokens visuales (colores, tipografía, sombras y radios).
- `css/components.css`: componentes y layouts compartidos.
- `css/animations.css`: animaciones reutilizables.
- `css/responsive.css`: todos los breakpoints.
- `js/main.js`: inicializa módulos; no contiene lógica de negocio.
- `js/dataLoader.js`: carga, valida de forma básica y normaliza `contenido.json`; aún acepta el formato legado de arreglo.
- `js/events.js`, `gallery.js`, `team.js`: renderizadores de cada sección.
- `js/map.js`: único módulo que genera URLs, iframes y enlaces de mapas.
- `js/whatsapp.js`: botón flotante y ocultamiento al entrar a Contacto.

## Contenido dinámico

Edita solamente `contenido.json` para cambiar eventos, galería, voluntarios y contacto. Para un mapa, cada `ubicacion` puede tener `direccion`, `colonia`, `ciudad`, `estado`, `pais`; o `latitud` y `longitud`; o un enlace `googleMaps`; o una URL `embedUrl`. Si sólo hay dirección, el sistema forma automáticamente las URLs de Google Maps.

Para añadir un evento, agrega un objeto a `eventos`. Si incluye `ubicacion`, se mostrará automáticamente su mapa; si no, la tarjeta funcionará sin mapa. Las imágenes de galería se agregan en `galeria` con `imagen`, `titulo` y `alt`.

## Desarrollo local

Como se usa `fetch`, abre el proyecto mediante un servidor local (por ejemplo, Live Server) en lugar de abrir `index.html` directamente. No se requieren paquetes ni proceso de compilación.
