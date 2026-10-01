import { formatPrice } from "../utils/format";

/**
 * Muestra la información de un videojuego y sus acciones principales.
 *
 * @param {Object} props Propiedades recibidas por el componente.
 * @param {Object} props.product Producto que se mostrará.
 * @param {boolean} props.isInCart Indica si el producto ya está en el carrito.
 * @param {Function} props.onAddToCart Función para agregar el producto al carrito.
 * @param {Function} props.onViewDetails Función para mostrar el detalle del producto.
 */
function ProductCard({
  product,
  isInCart,
  onAddToCart,
  onViewDetails,
}) {
  return (
    <article className="product-card">
      <img
        src={product.image}
        alt={`Portada de ${product.name}`}
        className="product-card__image"
      />

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="product-card__prices">
          <span className="product-card__price-normal">
            {formatPrice(product.price)}
          </span>

          <strong className="product-card__price-offer">
            {formatPrice(product.offerPrice)}
          </strong>
        </div>

        <div className="product-card__actions">
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="product-card__details-button"
          >
            Ver detalles
          </button>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="product-card__button"
          >
            {isInCart ? "En el carrito · Agregar otro" : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
