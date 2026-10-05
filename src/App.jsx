import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Carousel from "./components/Carousel";
import ProductModal from "./components/ProductModal";
import ContactForm from "./components/ContactForm";
import AddProductForm from "./components/AddProductForm";
import "./App.css";

const CART_STORAGE_KEY = "gamezone-cart";
const CATALOG_STORAGE_KEY = "gamezone-products";
const CART_CHANNEL_NAME = "gamezone-cart-sync";

function getStoredCart() {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("No fue posible recuperar el carrito guardado.", error);
    return [];
  }
}

function getStoredProducts() {
  try {
    const storedProducts = localStorage.getItem(CATALOG_STORAGE_KEY);

    if (!storedProducts) {
      return null;
    }

    const parsedProducts = JSON.parse(storedProducts);
    return Array.isArray(parsedProducts) ? parsedProducts : null;
  } catch (error) {
    console.error("No fue posible recuperar el catálogo guardado.", error);
    return null;
  }
}

function App() {
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [catalogReady, setCatalogReady] = useState(false);

  const [cart, setCart] = useState(getStoredCart);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [notification, setNotification] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const cartChannelRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      const storedProducts = getStoredProducts();

      if (storedProducts) {
        setProducts(storedProducts);
        setIsLoadingProducts(false);
        setCatalogReady(true);
        return;
      }

      try {
        setIsLoadingProducts(true);
        setProductsError("");

        const response = await fetch(
          `${import.meta.env.BASE_URL}data/products.json`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`Error HTTP ${response.status}`);
        }

        const data = await response.json();

        const productsWithImages = data.map((product) => ({
          ...product,
          image: `${import.meta.env.BASE_URL}${product.image}`,
        }));

        setProducts(productsWithImages);
        setCatalogReady(true);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("No fue posible cargar el catálogo.", error);
          setProductsError(
            "No fue posible cargar el catálogo. Intenta nuevamente más tarde.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingProducts(false);
        }
      }
    };

    loadProducts();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!catalogReady || productsError) {
      return;
    }

    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(products));
  }, [products, catalogReady, productsError]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!("BroadcastChannel" in window)) {
      return undefined;
    }

    const channel = new BroadcastChannel(CART_CHANNEL_NAME);
    cartChannelRef.current = channel;

    channel.onmessage = (event) => {
      if (Array.isArray(event.data)) {
        setCart(event.data);
      }
    };

    return () => {
      channel.close();
      cartChannelRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key !== CART_STORAGE_KEY) {
        return;
      }

      try {
        const updatedCart = event.newValue ? JSON.parse(event.newValue) : [];
        setCart(updatedCart);
      } catch (error) {
        console.error(
          "No fue posible sincronizar el carrito mediante localStorage.",
          error,
        );
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (!notification) {
      return undefined;
    }

    const timeout = setTimeout(() => {
      setNotification(null);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [notification]);

  const showNotification = (text) => {
    setNotification({
      id: Date.now(),
      text,
    });
  };

  const publishCartUpdate = (nextCart) => {
    cartChannelRef.current?.postMessage(nextCart);
  };

  const addToCart = (product) => {
    const cartItem = {
      ...product,
      cartItemId: `${product.id}-${Date.now()}`,
    };

    setCart((currentCart) => {
      const nextCart = [...currentCart, cartItem];
      publishCartUpdate(nextCart);
      return nextCart;
    });

    showNotification(`${product.name} fue agregado al carrito.`);
  };

  const removeFromCart = (cartItemId) => {
    const removedProduct = cart.find(
      (product) => product.cartItemId === cartItemId,
    );

    setCart((currentCart) => {
      const nextCart = currentCart.filter(
        (product) => product.cartItemId !== cartItemId,
      );

      publishCartUpdate(nextCart);
      return nextCart;
    });

    if (removedProduct) {
      showNotification(`${removedProduct.name} fue eliminado del carrito.`);
    }
  };

  const deleteProduct = (productId) => {
    const productToDelete = products.find(
      (product) => product.id === productId,
    );

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    );

    setSelectedProduct((currentProduct) =>
      currentProduct?.id === productId ? null : currentProduct,
    );

    if (productToDelete) {
      showNotification(`${productToDelete.name} fue eliminado del catálogo.`);
    }
  };

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now(),
      image: productData.image || `${import.meta.env.BASE_URL}favicon.svg`,
    };

    setProducts((currentProducts) => [...currentProducts, newProduct]);
    setActiveCategory("Todas");
    setSearch("");
    showNotification(`${newProduct.name} fue agregado al catálogo.`);
  };

  const changeCategory = (category) => {
    setActiveCategory(category);
  };

  const closeProductModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "Todas" || product.category === activeCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.category.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar cartCount={cart.length} onCategoryChange={changeCategory} />

      {notification && (
        <div
          key={notification.id}
          className="toast-message"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="toast-message__icon" aria-hidden="true">
            ✓
          </span>
          <span>{notification.text}</span>
        </div>
      )}

      <main id="inicio" className="main-content">
        <header className="hero">
          <p className="hero__eyebrow">GameZone</p>
          <h1>Tu próxima aventura comienza aquí</h1>
          <p>
            Descubre videojuegos destacados, ofertas especiales y arma tu
            carrito de forma rápida y sencilla.
          </p>
          <a href="#productos" className="hero__button">
            Ver catálogo
          </a>
        </header>

        <Carousel />

        <SearchBar search={search} onSearchChange={setSearch} />

        <ProductList
          products={filteredProducts}
          cart={cart}
          isLoading={isLoadingProducts}
          error={productsError}
          onAddToCart={addToCart}
          onViewDetails={setSelectedProduct}
          onDeleteProduct={deleteProduct}
        />

        <AddProductForm onAddProduct={addProduct} />

        <Cart cart={cart} onRemoveFromCart={removeFromCart} />

        <ContactForm />
      </main>

      <footer className="footer">
        <p>© 2026 GameZone. Todos los derechos reservados.</p>
        <p>Contacto: contacto@gamezone.cl</p>
      </footer>

      <ProductModal
        product={selectedProduct}
        onClose={closeProductModal}
        onAddToCart={addToCart}
      />
    </>
  );
}

export default App;
