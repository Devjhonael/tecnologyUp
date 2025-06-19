// main.js - Funcionalidades para Balsamiq Tienda de Tecnología

document.addEventListener("DOMContentLoaded", function () {
  // ======================
  //  Header Functionality
  // ======================
  const menuBtn = document.getElementById("menuBtn");
  const logoBtn = document.getElementById("logoBtn");
  const accountBtn = document.getElementById("accountBtn");
  const cartBtn = document.getElementById("cartBtn");
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuOverlay = document.getElementById("menuOverlay");
  const closeMenu = document.getElementById("closeMenu");

  // Logo click - redirect to index
  // logoBtn?.addEventListener('click', function() {
  //     window.location.href = 'index.html';
  // });

  // Menu button click
  menuBtn?.addEventListener("click", function () {
    mobileMenu.classList.add("active");
    menuOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // Close menu
  function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  closeMenu?.addEventListener("click", closeMobileMenu);
  menuOverlay?.addEventListener("click", closeMobileMenu);

  // ======================
  //  Search Functionality
  // ======================
  function performSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      window.location.href = `buscar.html?q=${encodeURIComponent(searchTerm)}`;
    }
  }

  searchBtn?.addEventListener("click", performSearch);
  searchInput?.addEventListener("keypress", function (e) {
    if (e.key === "Enter") performSearch();
  });

  // ======================
  //  Funcionalidad Carrusel
  // ======================
  const setupProductSliders = () => {
    const productSliders = document.querySelectorAll(".products-grid");

    productSliders.forEach((slider) => {
      const leftBtn = slider.querySelector(".nav-arrow.left");
      const rightBtn = slider.querySelector(".nav-arrow.right");
      const products = slider.querySelectorAll(".product-card");
      const productWidth = products[0]?.offsetWidth + 20; // Ancho del producto + gap

      // Oculta flechas si no hay overflow
      const checkOverflow = () => {
        const hasOverflow = slider.scrollWidth > slider.clientWidth;
        leftBtn.style.display = hasOverflow ? "flex" : "none";
        rightBtn.style.display = hasOverflow ? "flex" : "none";
      };

      // Flecha izquierda
      leftBtn?.addEventListener("click", () => {
        slider.scrollBy({ left: -productWidth, behavior: "smooth" });
      });

      // Flecha derecha
      rightBtn?.addEventListener("click", () => {
        slider.scrollBy({ left: productWidth, behavior: "smooth" });
      });

      // Check inicial y en resize
      checkOverflow();
      window.addEventListener("resize", checkOverflow);
    });
  };

  // ======================
  //  Carrito de Compras (Versión Mejorada)
  // ======================
  const setupCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("hugoTechCart")) || [];
    const cartBtn = document.getElementById("cartBtn");

    // Actualizar ícono del carrito
    const updateCartIcon = () => {
      const totalItems = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      if (cartBtn) {
        cartBtn.textContent =
          totalItems > 0 ? `🛒 Carrito (${totalItems})` : "🛒 Carrito";
      }
      localStorage.setItem("hugoTechCart", JSON.stringify(cartItems));
    };

    // Añadir producto al carrito
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-btn")) {
        const productCard = e.target.closest(".product-card");
        const productName =
          productCard.querySelector(".product-title").textContent;
        const productPrice =
          productCard.querySelector(".product-price").textContent;
        const productImage =
          productCard.querySelector(".product-image").textContent;

        // Buscar si el producto ya está en el carrito
        const existingItem = cartItems.find(
          (item) => item.name === productName
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cartItems.push({
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1,
          });
        }

        updateCartIcon();

        // Feedback visual mejorado
        const originalText = e.target.textContent;
        const originalBg = e.target.style.backgroundColor;
        e.target.textContent = "✓ Añadido";
        e.target.style.backgroundColor = "#2ecc71";
        e.target.disabled = true;

        setTimeout(() => {
          e.target.textContent = originalText;
          e.target.style.backgroundColor = originalBg;
          e.target.disabled = false;
        }, 1500);
      }
    });

    // Abrir carrito - redirección a página
    if (cartBtn) {
      cartBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (cartItems.length > 0) {
          window.location.href = "carrito.html";
        } else {
          // Modal o notificación más elegante
          const notification = document.createElement("div");
          notification.style.position = "fixed";
          notification.style.bottom = "20px";
          notification.style.right = "20px";
          notification.style.backgroundColor = "#e74c3c";
          notification.style.color = "white";
          notification.style.padding = "10px 20px";
          notification.style.borderRadius = "5px";
          notification.style.zIndex = "1000";
          notification.textContent = "Tu carrito está vacío";

          document.body.appendChild(notification);

          setTimeout(() => {
            notification.style.opacity = "0";
            notification.style.transition = "opacity 0.5s";
            setTimeout(() => notification.remove(), 500);
          }, 2000);
        }
      });
    }

    // Inicializar el ícono del carrito
    updateCartIcon();
  };

  // ======================
  //  Menú Mobile
  // ======================
  const setupMobileMenu = () => {
    const menuBtn = document.querySelector(".menu-btn");
    const headerContent = document.querySelector(".header-content");

    menuBtn?.addEventListener("click", () => {
      headerContent.classList.toggle("mobile-menu-open");
    });
  };

  // ======================
  //  Efectos Hover
  // ======================
  const setupHoverEffects = () => {
    // Efecto para tarjetas de producto
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px)";
        card.style.boxShadow = "0 5px 20px rgba(0,0,0,0.15)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.boxShadow = "";
      });
    });

    // Efecto para ítems de categoría
    const categoryItems = document.querySelectorAll(".category-item");
    categoryItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        item.style.transform = "translateY(-5px)";
      });

      item.addEventListener("mouseleave", () => {
        item.style.transform = "";
      });
    });
  };

  // ======================
  //  Inicialización
  // ======================
  const init = () => {
    setupProductSliders();
    setupCart();
    setupMobileMenu();
    setupHoverEffects();

    // Puedes añadir más inicializaciones aquí
    console.log("Tienda Balsamiq - JS cargado correctamente");
  };

  init();
});



  new Swiper(".swiper-banner", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination-banner",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-banner",
      prevEl: ".swiper-button-prev-banner",
    },
  });

  new Swiper(".swiper-cards", {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination-cards",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-cards",
      prevEl: ".swiper-button-prev-cards",
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
