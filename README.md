# GameZone — Evaluación Final Transversal

Proyecto desarrollado para la asignatura **Desarrollo Frontend I (PFY2201)**.

GameZone es una tienda web de videojuegos construida con **React, Vite, JavaScript, HTML5, CSS3 y Bootstrap 5**. El proyecto integra las funcionalidades desarrolladas durante las semanas anteriores y las aplica en una solución final responsive, modular e interactiva.

## Funcionalidades principales

- Catálogo dinámico de videojuegos cargado desde un archivo JSON.
- Búsqueda de videojuegos por nombre.
- Filtro de productos por categoría.
- Tarjetas de productos generadas dinámicamente con React.
- Modal con información detallada de cada videojuego.
- Carrito de compras con contador, total y eliminación individual.
- Persistencia del carrito mediante `localStorage`.
- Sincronización del carrito entre pestañas mediante `BroadcastChannel` y evento `storage`.
- Gestión dinámica del catálogo:
  - agregar nuevos videojuegos;
  - eliminar videojuegos existentes;
  - persistir los cambios mediante `localStorage`.
- Formulario de contacto con validación de:
  - nombre;
  - correo electrónico;
  - mensaje.
- Mensajes de error y confirmación.
- Renderizado condicional para estados de carga, error, catálogo vacío y carrito vacío.
- Navegación por secciones.
- Diseño responsive para escritorio y dispositivos móviles.
- Uso combinado de Bootstrap 5 y estilos CSS personalizados.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- HTML5
- CSS3
- Bootstrap 5
- JSON
- LocalStorage
- BroadcastChannel API

## Estructura general del proyecto

```text
PFY2201_Semana9_GameZone/
├── public/
│   ├── data/
│   │   └── products.json
│   └── img/
├── src/
│   ├── components/
│   │   ├── AddProductForm.jsx
│   │   ├── Cart.jsx
│   │   ├── Carousel.jsx
│   │   ├── ContactForm.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductModal.jsx
│   │   └── SearchBar.jsx
│   ├── utils/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
└── README.md
```

## Instalación

1. Clonar el repositorio o descargar el proyecto.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Abrir una terminal en la raíz del proyecto.
4. Instalar las dependencias:

```bash
npm install
```

## Ejecución en desarrollo

Ejecutar:

```bash
npm run dev
```

Vite mostrará una dirección local, por ejemplo:

```text
http://localhost:5173/
```

Abrir esa dirección en el navegador.

## Uso de GameZone

### Catálogo

El catálogo muestra los videojuegos disponibles y permite:

- buscar por nombre;
- filtrar por categoría;
- consultar detalles;
- agregar productos al carrito;
- eliminar productos del catálogo.

### Gestión del catálogo

La sección **Gestión del catálogo** permite registrar nuevos videojuegos indicando:

- nombre;
- categoría;
- precio normal;
- precio de oferta;
- imagen;
- descripción.

Los productos agregados y eliminados se conservan mediante `localStorage`.

### Carrito de compras

El carrito permite:

- agregar uno o más productos;
- visualizar la cantidad total;
- calcular el total de la compra;
- eliminar productos individualmente;
- conservar la información al recargar la página.

### Formulario de contacto

El formulario valida los datos antes del envío y muestra mensajes de error cuando la información no es válida. Al completar correctamente los campos, se muestra un mensaje de confirmación.

## Persistencia de datos

GameZone utiliza `localStorage` para conservar:

- productos del carrito;
- cambios realizados en el catálogo.

También utiliza `BroadcastChannel` y el evento `storage` para mantener sincronizado el carrito entre distintas pestañas del navegador.

## Diseño responsive

La interfaz fue adaptada para funcionar correctamente en distintos tamaños de pantalla.

En dispositivos móviles:

- el menú principal utiliza navegación tipo hamburguesa;
- las tarjetas se organizan en una sola columna;
- los botones se adaptan al ancho disponible;
- los formularios reorganizan sus campos verticalmente.

## Comprobaciones realizadas

Antes de la entrega se verificó el proyecto mediante:

```bash
npm run lint
```

y:

```bash
npm run build
```

Ambos comandos finalizaron correctamente.

También se realizaron pruebas de:

- navegación;
- filtros;
- búsqueda;
- carrito;
- persistencia;
- agregado y eliminación de videojuegos;
- formulario de contacto;
- diseño responsive.

## Autor

**Frank Córdoba**  
Desarrollo Frontend I — PFY2201  
Duoc UC
