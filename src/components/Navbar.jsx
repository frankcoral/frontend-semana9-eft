import { useState } from "react";

/**
 * Barra de navegación principal de GameZone.
 *
 * @param {Object} props Propiedades recibidas por el componente.
 * @param {number} props.cartCount Cantidad de productos en el carrito.
 * @param {Function} props.onCategoryChange Función para filtrar por categoría.
 */
function Navbar({ cartCount, onCategoryChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const categories = ["Todas", "Aventura", "Carreras", "Deportes"];

  const closeNavigation = () => {
    setMenuOpen(false);
    setProductsOpen(false);
  };

  const handleCategoryChange = (category) => {
    onCategoryChange(category);
    closeNavigation();
  };

  return (
    <nav className="navbar navbar-expand-lg" aria-label="Navegación principal">
      <div className="navbar__top">
        <a href="#inicio" className="navbar__brand" onClick={closeNavigation}>
          GameZone
        </a>

        <button
          type="button"
          className="navbar__toggle"
          aria-label="Abrir o cerrar menú de navegación"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div
        id="main-navigation"
        className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
      >
        <a href="#inicio" onClick={closeNavigation}>
          Inicio
        </a>

        <a href="#destacados" onClick={closeNavigation}>
          Destacados
        </a>

        <div className="navbar__dropdown">
          <button
            type="button"
            className="navbar__dropdown-toggle"
            aria-expanded={productsOpen}
            aria-controls="products-menu"
            onClick={() => setProductsOpen((current) => !current)}
          >
            Productos
            <span aria-hidden="true">▾</span>
          </button>

          <div
            id="products-menu"
            className={`navbar__dropdown-menu ${
              productsOpen ? "navbar__dropdown-menu--open" : ""
            }`}
          >
            {categories.map((category) => (
              <a
                key={category}
                href="#productos"
                onClick={() => handleCategoryChange(category)}
              >
                {category === "Todas" ? "Todos los productos" : category}
              </a>
            ))}
          </div>
        </div>

        <a href="#contacto" onClick={closeNavigation}>
          Contacto
        </a>

        <a href="#carrito" className="navbar__cart" onClick={closeNavigation}>
          Carrito
          <span
            className="navbar__cart-count"
            aria-label={`${cartCount} productos en el carrito`}
          >
            {cartCount}
          </span>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
