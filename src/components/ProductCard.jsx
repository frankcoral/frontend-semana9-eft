import { formatPrice } from "../utils/format";

/**
 * Muestra la información de un videojuego y sus acciones principales.
 *
 * @param {Object} props Propiedades recibidas por el componente.
 * @param {Object} props.product Producto que se mostrará.
 * @param {boolean} props.isInCart Indica si el producto ya está en el carrito.
 * @param {Function} props.onAddToCart Función para agregar el producto al carrito.
 * @param {Function} props.onViewDetails Función para mostrar el detalle del producto.
 * @param {Function} props.onDeleteProduct Función para eliminar el producto del catálogo.
 */
function ProductCard({
  product,
  isInCart,
  onAddToCart,
  onViewDetails,
  onDeleteProduct,
}) {
  return (
    <article className="card product-card h-100">
      <img
        src={product.image}
        alt={`Portada de ${product.name}`}
        className="card-img-top product-card__image"
      />

      <div className="card-body product-card__body d-flex flex-column">
        <span className="badge rounded-pill product-card__category align-self-start">
          {product.category}
        </span>

        <h3 className="card-title mt-3">{product.name}</h3>

        <p className="card-text">{product.description}</p>

        <div className="product-card__prices mt-auto">
          <span className="product-card__price-normal">
            {formatPrice(product.price)}
          </span>

          <strong className="product-card__price-offer">
            {formatPrice(product.offerPrice)}
          </strong>
        </div>

        <div className="product-card__actions d-grid gap-2 mt-3">
          <div className="d-grid gap-2 d-md-flex">
            <button
              type="button"
              onClick={() => onViewDetails(product)}
              className="btn btn-outline-light product-card__details-button flex-fill"
            >
              Ver detalles
            </button>

            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="btn btn-primary product-card__button flex-fill"
            >
              {isInCart ? "En el carrito · Agregar otro" : "Agregar al carrito"}
            </button>
          </div>

          {onDeleteProduct && (
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => onDeleteProduct(product.id)}
              aria-label={`Eliminar ${product.name} del catálogo`}
            >
              Eliminar del catálogo
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
