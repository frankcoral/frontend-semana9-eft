# GameZone — Semana 8

Proyecto eCommerce de videojuegos desarrollado para **Desarrollo Frontend I (PFY2201)**, evaluación sumativa de la **Semana 8: “Mejorando funcionalidades clave en el eCommerce con React”**.

Esta versión continúa el proyecto GameZone desarrollado en semanas anteriores y profundiza el uso de **React + Vite**, especialmente la gestión de estados con `useState`, el manejo de efectos secundarios con `useEffect`, la carga dinámica de datos y el renderizado condicional.

## Objetivo de la actividad

Optimizar el eCommerce existente utilizando componentes funcionales de React, gestión de estados, efectos secundarios y renderizado condicional, manteniendo una estructura de proyecto clara, reutilizable y preparada para su publicación mediante GitHub Pages.

## Tecnologías utilizadas

- React
- Vite
- JavaScript (ES Modules)
- CSS3
- Fetch API
- `useState`
- `useEffect`
- `useRef`
- `useCallback`
- `localStorage`
- `BroadcastChannel`
- ESLint
- Git y GitHub
- GitHub Pages

## Mejoras implementadas en Semana 8

### Carga dinámica del catálogo

El catálogo ya no se importa desde un archivo JavaScript estático.

Los productos se almacenan en:

```text
public/data/products.json
```

y se cargan dinámicamente desde `App.jsx` mediante:

```text
useEffect → fetch → response.json() → setProducts()
```

La aplicación maneja los siguientes estados:

- catálogo de productos;
- estado de carga;
- mensaje de error.

La petición utiliza `AbortController` y cleanup para evitar actualizaciones innecesarias si el componente se desmonta mientras la solicitud sigue en curso.

### Gestión de estados con useState

Se utiliza `useState` para gestionar, entre otros:

- catálogo de productos;
- carga del catálogo;
- errores de carga;
- carrito de compras;
- búsqueda;
- categoría activa;
- notificaciones;
- producto seleccionado para el modal.

Otros componentes del proyecto también utilizan estado para sus elementos interactivos, como el menú responsive y el carrusel.

### Renderizado condicional

La interfaz cambia según el estado de la aplicación.

Se implementa renderizado condicional para:

- mostrar **“Cargando catálogo de videojuegos...”** mientras se cargan los datos;
- mostrar un mensaje si ocurre un error;
- mostrar un mensaje cuando no existen resultados;
- mostrar **“Tu carrito está vacío.”** cuando no hay productos;
- mostrar el modal únicamente cuando existe un producto seleccionado;
- mostrar notificaciones temporales;
- cambiar el texto del botón desde **“Agregar al carrito”** a **“En el carrito · Agregar otro”** cuando el producto ya está presente.

### Persistencia y sincronización del carrito

El carrito se guarda automáticamente en `localStorage` mediante `useEffect`.

Además, se implementó sincronización en tiempo real entre distintas pestañas del navegador mediante `BroadcastChannel`.

También se mantiene un listener del evento `storage` como mecanismo complementario.

Los listeners y canales utilizados se limpian correctamente mediante las funciones de cleanup de `useEffect`.

## Funcionalidades generales de GameZone

- Catálogo de videojuegos con:
  - nombre;
  - categoría;
  - descripción;
  - imagen;
  - precio normal;
  - precio oferta.
- Navbar responsive.
- Menú desplegable de productos.
- Filtro por categorías:
  - Aventura;
  - Carreras;
  - Deportes.
- Carrusel de videojuegos destacados.
- Búsqueda dinámica por nombre o categoría.
- Carrito de compras con:
  - agregar productos;
  - agregar un mismo producto varias veces;
  - eliminar una entrada específica;
  - contador total;
  - cálculo dinámico del precio total.
- Persistencia mediante `localStorage`.
- Sincronización del carrito entre pestañas.
- Toast de confirmación.
- Modal de detalles de producto.
- Diseño responsive.
- Mejoras de accesibilidad mediante atributos ARIA.

## Estructura principal

```text
PFY2201_Semana8_GameZone/
├── capturas/
├── public/
│   ├── data/
│   │   └── products.json
│   ├── img/
│   │   ├── minecraft.jpg
│   │   ├── forza-horizon-5.jpg
│   │   └── ea-sports-fc-26.jpg
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Carousel.jsx
│   │   ├── SearchBar.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductModal.jsx
│   │   ├── Cart.jsx
│   │   └── CartTotal.jsx
│   ├── utils/
│   │   └── format.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## Componentes y comunicación mediante props

La aplicación mantiene una estructura modular y separa responsabilidades entre componentes.

Ejemplos:

- `Navbar` recibe la cantidad de productos del carrito y la función para cambiar categoría.
- `ProductList` recibe los productos filtrados, el carrito y los estados de carga/error.
- `ProductCard` recibe un producto, su estado dentro del carrito y las acciones disponibles.
- `Cart` recibe los productos seleccionados y la función de eliminación.
- `ProductModal` recibe el producto seleccionado y las acciones para cerrar o agregar al carrito.

Esto permite mantener componentes reutilizables y un flujo de datos claro.

## Buenas prácticas aplicadas

- Componentes separados por responsabilidad.
- Nombres de variables y funciones descriptivos.
- Actualización inmutable de arreglos.
- Actualizaciones de estado basadas en el estado anterior cuando corresponde.
- Funciones reutilizables.
- Comentarios y documentación JSDoc en funcionalidades principales.
- Cleanup de efectos secundarios.
- Manejo de errores en la carga dinámica.
- Uso de `AbortController` en la petición `fetch`.
- Accesibilidad mediante atributos ARIA.
- Código validado con ESLint.
- Estructura clara y sin duplicar la fuente de datos del catálogo.

## Relación con la pauta de evaluación

| Criterio | Implementación en GameZone |
| --- | --- |
| **1. Gestión de estados con `useState`** | El catálogo, carrito y distintos elementos interactivos son gestionados mediante estados de React. |
| **2. Efectos secundarios con `useEffect`** | El catálogo se carga dinámicamente desde `products.json` utilizando `fetch`. También se gestionan persistencia, notificaciones y sincronización entre pestañas. |
| **3. Renderizado condicional** | Se muestran estados distintos para carga, error, búsquedas sin resultados, carrito vacío, modal, notificaciones y botón de producto según el estado del carrito. |
| **4. Buenas prácticas de desarrollo** | El proyecto está organizado en componentes y utilidades, utiliza código reutilizable, comentarios, cleanup de efectos y evita duplicación innecesaria. |
| **5. GitHub y GitHub Pages** | El proyecto será publicado en un repositorio público y desplegado mediante la rama `gh-pages`. |

## Evidencias de Semana 8

Las capturas se encuentran en la carpeta [`capturas/`](./capturas/).

| Archivo | Evidencia |
| --- | --- |
| `01-Renderizado-Condicional-Producto-En-Carrito.png` | Cambio del botón según el estado del carrito. |
| `02-Carga-Dinamica-Productos-JSON.png` | Carga dinámica de `products.json` mediante una petición `fetch`. |
| `03-Carrito-Dos-Productos.png` | Carrito funcionando con dos productos y total actualizado. |
| `04-Carrito-Eliminacion-Individual.png` | Eliminación individual de un producto y recálculo del total. |
| `05-Renderizado-Condicional-Carrito-Vacio.png` | Mensaje mostrado cuando el carrito no contiene productos. |

## Instalación

Instalar dependencias:

```bash
npm install
```

En Windows PowerShell, si `npm.ps1` está bloqueado por la política de ejecución:

```powershell
npm.cmd install
```

## Ejecución en desarrollo

```bash
npm run dev
```

o en PowerShell:

```powershell
npm.cmd run dev
```

## Validación del código

Ejecutar ESLint:

```bash
npm run lint
```

La validación realizada para esta entrega finalizó sin errores ni advertencias.

## Compilación de producción

```bash
npm run build
```

La compilación de producción fue validada correctamente con Vite.

## Previsualización de producción

```bash
npm run preview
```

La versión generada en `dist/` fue comprobada localmente y conserva las funcionalidades principales del proyecto.

## Despliegue en GitHub Pages

`vite.config.js` utiliza una ruta base compatible con GitHub Pages:

```js
base: "./"
```

El proyecto incluye el script:

```json
"deploy": "npm run build && npx --yes gh-pages -d dist"
```

Para desplegar:

```powershell
npm.cmd run deploy
```

Después del despliegue se debe configurar GitHub Pages para utilizar la rama:

```text
gh-pages / (root)
```


## Validaciones realizadas

- Catálogo cargado dinámicamente desde JSON.
- Petición `products.json` comprobada desde DevTools.
- Carrito con múltiples productos.
- Eliminación individual del carrito.
- Total dinámico actualizado.
- Renderizado condicional del botón.
- Renderizado condicional del carrito vacío.
- Persistencia en `localStorage`.
- Sincronización del carrito entre pestañas.
- `npm.cmd run lint` sin errores.
- `npm.cmd run build` exitoso.
- `npm.cmd run preview` funcionando correctamente.
- `npm.cmd install` con 0 vulnerabilidades reportadas.
