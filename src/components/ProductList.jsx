import ProductCard from "./ProductCard";

/**
 * Renderiza el catálogo y sus distintos estados de carga.
 *
 * @param {Object} props Propiedades recibidas por el componente.
 * @param {Array} props.products Lista de productos filtrados.
 * @param {Array} props.cart Productos agregados al carrito.
 * @param {boolean} props.isLoading Indica si el catálogo se está cargando.
 * @param {string} props.error Mensaje de error al cargar el catálogo.
 * @param {Function} props.onAddToCart Función para agregar productos al carrito.
 * @param {Function} props.onViewDetails Función para mostrar detalles del producto.
 */
function ProductList({
  products,
  cart,
  isLoading,
  error,
  onAddToCart,
  onViewDetails,
}) {
  return (
    <section id="productos" className="products-section">
      <div className="section-heading">
        <p className="section-heading__eyebrow">Catálogo</p>
        <h2>Videojuegos disponibles</h2>
        <p>
          Descubre nuestras ofertas y agrega tus videojuegos favoritos al
          carrito.
        </p>
      </div>

      {isLoading ? (
        <p className="products-empty" role="status" aria-live="polite">
          Cargando catálogo de videojuegos...
        </p>
      ) : error ? (
        <p className="products-empty" role="alert">
          {error}
        </p>
      ) : products.length === 0 ? (
        <p className="products-empty">
          No se encontraron videojuegos para la búsqueda o categoría
          seleccionada.
        </p>
      ) : (
        <div className="products-grid">
          {products.map((product) => {
            const isInCart = cart.some(
              (cartItem) => cartItem.id === product.id,
            );

            return (
              <ProductCard
                key={product.id}
                product={product}
                isInCart={isInCart}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ProductList;
