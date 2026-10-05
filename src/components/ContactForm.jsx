import { useState } from "react";
import "./ContactForm.css";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

/**
 * Formulario de contacto de GameZone.
 * Utiliza estado controlado, validación antes del envío y componentes visuales de Bootstrap 5.
 */
function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (trimmedName.length < 2) {
      newErrors.name = "Ingresa un nombre válido de al menos 2 caracteres.";
    }

    if (!emailPattern.test(trimmedEmail)) {
      newErrors.email = "Ingresa un correo electrónico válido.";
    }

    if (trimmedMessage.length < 10) {
      newErrors.message = "El mensaje debe contener al menos 10 caracteres.";
    }

    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));

    setSent(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSent(false);
      return;
    }

    setErrors({});
    setSent(true);
    setFormData(initialForm);
  };

  return (
    <section
      id="contacto"
      className="contact-section py-5"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-7">
            <div className="section-heading text-center mb-4">
              <p className="section-heading__eyebrow">Contacto</p>
              <h2 id="contact-title">¿Necesitas ayuda?</h2>
              <p>
                Envíanos tu consulta y el equipo de GameZone se pondrá en
                contacto contigo.
              </p>
            </div>

            <form
              className="contact-form p-4 p-md-5 rounded-4"
              onSubmit={handleSubmit}
              noValidate
            >
              {sent && (
                <div className="alert alert-success" role="status">
                  ¡Mensaje enviado correctamente! Gracias por contactarnos.
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="contact-name" className="form-label">
                  Nombre
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                />
                {errors.name && (
                  <div id="contact-name-error" className="invalid-feedback">
                    {errors.name}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="contact-email" className="form-label">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                />
                {errors.email && (
                  <div id="contact-email-error" className="invalid-feedback">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="contact-message" className="form-label">
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className={`form-control ${errors.message ? "is-invalid" : ""}`}
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                />
                {errors.message && (
                  <div id="contact-message-error" className="invalid-feedback">
                    {errors.message}
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
