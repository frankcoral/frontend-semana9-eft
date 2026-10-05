import { useState } from "react";
import "./AddProductForm.css";

const INITIAL_FORM = {
  name: "",
  category: "Aventura",
  price: "",
  offerPrice: "",
  description: "",
  image: "",
};

/**
 * Formulario para agregar videojuegos dinámicamente al catálogo.
 *
 * @param {Object} props Propiedades recibidas por el componente.
 * @param {Function} props.onAddProduct Función que agrega un videojuego al catálogo.
 */
function AddProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (formData.name.trim().length < 2) {
      nextErrors.name = "Ingresa un nombre de al menos 2 caracteres.";
    }

    if (Number(formData.price) <= 0) {
      nextErrors.price = "Ingresa un precio válido.";
    }

    if (Number(formData.offerPrice) <= 0) {
      nextErrors.offerPrice = "Ingresa un precio de oferta válido.";
    }

    if (formData.description.trim().length < 10) {
      nextErrors.description =
        "La descripción debe contener al menos 10 caracteres.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onAddProduct({
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      offerPrice: Number(formData.offerPrice),
      description: formData.description.trim(),
      image: formData.image.trim(),
    });

    setFormData(INITIAL_FORM);
    setErrors({});
  };

  return (
    <section id="gestion-catalogo" className="catalog-manager container py-5">
      <div className="mx-auto" style={{ maxWidth: "760px" }}>
        <div className="section-heading mb-4">
          <p className="section-heading__eyebrow">Gestión del catálogo</p>
          <h2>Agregar videojuego</h2>
          <p>
            Completa los datos para incorporar un nuevo videojuego al catálogo.
          </p>
        </div>

        <form
          className="catalog-manager__form p-4 rounded-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="row g-3">
            <div className="col-12 col-md-8">
              <label htmlFor="game-name" className="form-label">
                Nombre
              </label>
              <input
                id="game-name"
                name="name"
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Hollow Knight"
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            <div className="col-12 col-md-4">
              <label htmlFor="game-category" className="form-label">
                Categoría
              </label>
              <select
                id="game-category"
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Aventura">Aventura</option>
                <option value="Carreras">Carreras</option>
                <option value="Deportes">Deportes</option>
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="game-price" className="form-label">
                Precio normal
              </label>
              <input
                id="game-price"
                name="price"
                type="number"
                min="1"
                className={`form-control ${errors.price ? "is-invalid" : ""}`}
                value={formData.price}
                onChange={handleChange}
                placeholder="29990"
              />
              {errors.price && (
                <div className="invalid-feedback">{errors.price}</div>
              )}
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="game-offer-price" className="form-label">
                Precio oferta
              </label>
              <input
                id="game-offer-price"
                name="offerPrice"
                type="number"
                min="1"
                className={`form-control ${
                  errors.offerPrice ? "is-invalid" : ""
                }`}
                value={formData.offerPrice}
                onChange={handleChange}
                placeholder="24990"
              />
              {errors.offerPrice && (
                <div className="invalid-feedback">{errors.offerPrice}</div>
              )}
            </div>

            <div className="col-12">
              <label htmlFor="game-image" className="form-label">
                URL de imagen (opcional)
              </label>
              <input
                id="game-image"
                name="image"
                type="url"
                className="form-control"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
              />
              <div className="catalog-manager__help">
                Si se deja vacío, GameZone usará una imagen de respaldo.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="game-description" className="form-label">
                Descripción
              </label>
              <textarea
                id="game-description"
                name="description"
                rows="4"
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe brevemente el videojuego."
              />
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary w-100 catalog-manager__button"
              >
                Agregar videojuego
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddProductForm;
