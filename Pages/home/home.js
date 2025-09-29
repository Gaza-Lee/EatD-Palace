(function () {
  if (!document.querySelector('link[href="/Pages/home/home.css"]')) {
    const homeStyle = document.createElement("link");
    homeStyle.rel = "stylesheet";
    homeStyle.href = "/Pages/home/home.css";
    document.head.appendChild(homeStyle);
  }
})();

const popularFoods = [
  {
    id: 1,
    name: "Fufu",
    image: "/src/assets/fufu1.jpg",
    description:
      "Authentic pounded cassava and plantain served with your choice of rich groundnut soup, palm nut soup, or light soup. A true taste of home!",
    price: "GH₵ 45.00",
    rating: "4.9 ⭐ (3.2k reviews)",
  },
  {
    id: 2,
    name: "Deluxed Fried Rice",
    image: "/src/assets/friedrice1.png",
    description:
      "Aromatic jasmine rice stir-fried with succulent shrimp, chicken, mixed vegetables, and our special blend of spices. Topped with fried plantain.",
    price: "GH₵ 65.00",
    rating: "4.8 ⭐ (2.5k reviews)",
  },
  {
    id: 3,
    name: "Hot Waakye",
    image: "/src/assets/wakye1.png",
    description:
      "Traditional rice and beans cooked to perfection, served with gari, fried plantain, spaghetti, boiled egg, and your choice of fish or meat.",
    price: "GH₵ 35.00",
    rating: "4.9 ⭐ (4.1k reviews)",
  },
  {
    id: 4,
    name: "Soft Banku and Tilapia",
    image: "/src/assets/bankuandtilapia.png",
    description:
      "Freshly prepared fermented corn and cassava dough paired with perfectly grilled tilapia, pepper sauce, and fresh vegetables.",
    price: "GH₵ 55.00",
    rating: "5.0 ⭐ (5.3k reviews)",
  },
];

class CarouselManager {
  constructor(foods) {
    this.foods = foods;
    this.currentIndex = 0;
    this.track = document.querySelector(".carousel-track");
    this.isPaused = false;
    this.autoRotateInterval = null;

    this.init();
  }

  init() {
    this.createCarouselItems();
    this.updateCarousel();
    this.startAutoRotate();
    this.addEventListeners();
  }

  createCarouselItems() {
    this.foods.forEach((food, index) => {
      const item = document.createElement("div");
      item.className = "carousel-item";
      item.dataset.index = index;

      const img = document.createElement("img");
      img.src = food.image;
      img.alt = food.name;

      // Create overlay for food info
      const overlay = document.createElement("div");
      overlay.className = "food-info-overlay";
      overlay.innerHTML = `
                <div class="food-info-content">
                    <h4 class="food-name">${food.name}</h4>
                    <p class="food-description">${food.description}</p>
                    <div class="food-details">
                        <span class="price">${food.price}</span>
                        <span class="rating">${food.rating}</span>
                    </div>
                </div>
            `;

      item.appendChild(img);
      item.appendChild(overlay);
      this.track.appendChild(item);
    });
  }

  updateCarousel() {
    const items = document.querySelectorAll(".carousel-item");
    const totalItems = items.length;

    items.forEach((item, index) => {
      item.classList.remove("active", "prev", "next", "hidden");

      const position = (index - this.currentIndex + totalItems) % totalItems;

      if (position === 0) {
        item.classList.add("active");
      } else if (position === 1) {
        item.classList.add("next");
      } else if (position === totalItems - 1) {
        item.classList.add("prev");
      } else {
        item.classList.add("hidden");
      }
    });
  }

  rotate(direction = "next") {
    if (direction === "next") {
      this.currentIndex = (this.currentIndex + 1) % this.foods.length;
    } else {
      this.currentIndex =
        (this.currentIndex - 1 + this.foods.length) % this.foods.length;
    }
    this.updateCarousel();
  }

  startAutoRotate() {
    this.autoRotateInterval = setInterval(() => {
      if (!this.isPaused) {
        this.rotate("next");
      }
    }, 3000);
  }

  stopAutoRotate() {
    clearInterval(this.autoRotateInterval);
  }

  addEventListeners() {
    // Hover events for active image
    this.track.addEventListener("mouseover", (e) => {
      const item = e.target.closest(".carousel-item");
      if (item && item.classList.contains("active")) {
        this.isPaused = true;
      }
    });

    this.track.addEventListener("mouseout", (e) => {
      const item = e.target.closest(".carousel-item");
      if (item && item.classList.contains("active")) {
        this.isPaused = false;
      }
    });

    // Click on side images to navigate
    this.track.addEventListener("click", (e) => {
      const item = e.target.closest(".carousel-item");
      if (item) {
        if (item.classList.contains("prev")) {
          this.rotate("prev");
        } else if (item.classList.contains("next")) {
          this.rotate("next");
        }
      }
    });
  }
}

// Chef's Special Section Implementation
const chefsSpecials = [
  {
    id: 5,
    name: "Fufu with Light Soup & Goat Meat",
    image: "/src/assets/fufu3.jpg",
    description:
      "Smooth, pounded cassava and plantain fufu served with a rich, aromatic light soup simmered with tender goat meat, garden eggs, and fresh herbs. A comforting West African classic.",
    price: "GH₵ 120.00",
    rating: "4.9 ⭐ (1.8k reviews)",
  },
  {
    id: 6,
    name: "Jollof Rice with Grilled Chicken",
    image: "/src/assets/friedrice3.png",
    description:
      "Our signature Ghanaian jollof rice — slow-cooked in tomato stew with spices and smoky aroma — topped with succulent grilled chicken thighs. Served with coleslaw and fried plantain.",
    price: "GH₵ 95.00",
    rating: "4.8 ⭐ (1.2k reviews)",
  },
  {
    id: 7,
    name: "Waakye with Beef Stew & Boiled Egg",
    image: "/src/assets/friedrice4.png",
    description:
      "Traditional waakye (rice and beans) cooked with sorghum leaves for authentic flavor, served with savory beef stew, boiled egg, fried plantain, and shito (spicy pepper sauce).",
    price: "GH₵ 150.00",
    rating: "5.0 ⭐ (2.3k reviews)",
  },
  {
    id: 8,
    name: "Banku with Tilapia & Pepper Sauce",
    image: "/src/assets/bankuandtilapia2.png",
    description:
      "Soft, fermented corn and cassava dough (banku) paired with whole grilled tilapia marinated in spicy pepper sauce. Served with fresh onions and a side of green chili. A coastal favorite!",
    price: "GH₵ 110.00",
    rating: "4.7 ⭐ (980 reviews)",
  },
];

class ChefsSpecialManager {
  constructor(foods) {
    this.foods = foods;
    this.currentIndex = 0;
    this.track = document.querySelector(".chefs-track");
    this.isPaused = false;
    this.autoRotateInterval = null;
    this.transitioning = false;

    this.init();
  }

  init() {
    this.createChefsItems();
    this.updateChefsDisplay();
    this.startAutoRotate();
    this.addEventListeners();
  }

  createChefsItems() {
    // Clear any existing items
    this.track.innerHTML = "";

    this.foods.forEach((food, index) => {
      const item = document.createElement("div");
      item.className = "chefs-item";
      item.dataset.index = index;

      // Create image container
      const imgContainer = document.createElement("div");
      imgContainer.className = "chefs-img-container";

      const img = document.createElement("img");
      img.src = food.image;
      img.alt = food.name;
      img.loading = "lazy";

      imgContainer.appendChild(img);

      // Create food content
      const content = document.createElement("div");
      content.className = "food-content";
      content.innerHTML = `
        <h4>${food.name}</h4>
        <p>${food.description}</p>
        <div class="food-details">
          <span class="price">${food.price}</span>
          <span class="rating">${food.rating}</span>
        </div>
        <button class="order-btn">Order Now</button>
      `;

      item.appendChild(imgContainer);
      item.appendChild(content);
      this.track.appendChild(item);
    });

    // Add navigation buttons
    const nav = document.createElement("div");
    nav.className = "chefs-nav";
    nav.innerHTML = `
      <button class="chefs-prev" aria-label="Previous dish">❮</button>
      <button class="chefs-next" aria-label="Next dish">❯</button>
    `;
    this.track.parentElement.appendChild(nav);
  }

  updateChefsDisplay() {
    const items = document.querySelectorAll(".chefs-item");
    const totalItems = items.length;

    items.forEach((item, index) => {
      item.classList.remove("active", "next", "hidden");

      const position = (index - this.currentIndex + totalItems) % totalItems;

      if (position === 0) {
        item.classList.add("active");
      } else if (position === 1) {
        item.classList.add("next");
      } else {
        item.classList.add("hidden");
      }
    });
  }

  rotate(direction = "next") {
    if (this.transitioning) return;
    this.transitioning = true;
    this.stopAutoRotate();

    const items = document.querySelectorAll(".chefs-item");
    const activeItem = items[this.currentIndex];
    let nextIndex =
      direction === "next"
        ? (this.currentIndex + 1) % this.foods.length
        : (this.currentIndex - 1 + this.foods.length) % this.foods.length;

    const nextItem = items[nextIndex];

    // Set up transitions
    activeItem.style.transition = "all 0.5s cubic-bezier(0.65, 0, 0.35, 1)";
    nextItem.style.transition = "all 0.5s cubic-bezier(0.65, 0, 0.35, 1)";

    // Animate current active item to become the next preview (right side)
    if (direction === "next") {
      activeItem.style.width = "20%";
      activeItem.style.left = "auto";
      activeItem.style.right = "0";
      activeItem.querySelector("img").style.clipPath =
        "circle(50% at right center)";
    } else {
      activeItem.style.width = "20%";
      activeItem.style.left = "auto";
      activeItem.style.right = "0";
      activeItem.querySelector("img").style.clipPath =
        "circle(50% at right center)";
    }

    // Common styles for transitioning out active item
    activeItem.querySelector("img").style.borderRadius = "50%";
    activeItem.querySelector("img").style.height = "80%";
    activeItem.querySelector(".food-content").style.display = "none";

    // Animate next item to become active (left side)
    nextItem.style.width = "80%";
    nextItem.style.left = "0";
    nextItem.style.right = "auto";
    nextItem.querySelector("img").style.clipPath = "none";
    nextItem.querySelector("img").style.borderRadius = "20px 0 0 20px";
    nextItem.querySelector("img").style.height = "100%";
    nextItem.querySelector(".food-content").style.display = "block";

    // After animation completes
    setTimeout(() => {
      this.currentIndex = nextIndex;
      this.updateChefsDisplay();

      // Reset inline styles
      items.forEach((item) => {
        item.style.transition = "";
        const img = item.querySelector("img");
        if (img) {
          img.style.height = "";
          img.style.borderRadius = "";
          img.style.clipPath = "";
        }
        const content = item.querySelector(".food-content");
        if (content) {
          content.style.display = "";
        }
      });

      this.transitioning = false;
      this.startAutoRotate();
    }, 500);
  }

  startAutoRotate() {
    this.stopAutoRotate();
    this.autoRotateInterval = setInterval(() => {
      if (!this.isPaused && !this.transitioning) {
        this.rotate("next");
      }
    }, 5000);
  }

  stopAutoRotate() {
    clearInterval(this.autoRotateInterval);
  }

  addEventListeners() {
    // Pause on hover
    this.track.addEventListener("mouseenter", () => {
      this.isPaused = true;
    });

    this.track.addEventListener("mouseleave", () => {
      this.isPaused = false;
    });

    // Navigation buttons
    document.querySelector(".chefs-prev")?.addEventListener("click", (e) => {
      e.stopPropagation();
      this.rotate("prev");
    });

    document.querySelector(".chefs-next")?.addEventListener("click", (e) => {
      e.stopPropagation();
      this.rotate("next");
    });

    // Click on next item to navigate
    this.track.addEventListener("click", (e) => {
      const item = e.target.closest(".chefs-item");
      if (item && item.classList.contains("next")) {
        this.rotate("next");
      }
    });

    // Order button click
    this.track.addEventListener("click", (e) => {
      if (e.target.classList.contains("order-btn")) {
        const item = e.target.closest(".chefs-item");
        const foodIndex = parseInt(item.dataset.index);
        this.orderFood(this.foods[foodIndex]);
      }
    });
  }

  orderFood(foodItem) {
    console.log(`Ordering: ${foodItem.name}`);
    // TODO: add to cart
    alert(`Added ${foodItem.name} to your order!`);
  }
}

// Seasonal Specials Data
const seasonalSpecials = [
  {
    id: 9,
    name: "Festive Jollof Platter",
    image: "/src/assets/festiveJollof.png",
    description:
      "Our holiday special features perfectly spiced jollof rice cooked with premium basmati, served with grilled chicken, beef kebabs, kelewele (spicy fried plantain), and a side of coleslaw. Garnished with fresh herbs and served with our signature pepper sauce.",
    price: "GH₵ 180.00",
    rating: "5.0 ⭐ (500 reviews)",
    season: "December Special",
    availability: "Limited Time",
  },
  {
    id: 10,
    name: "Harvest Yam Festival",
    image: "/src/assets/festiveyamplatter.png",
    description:
      "Celebrate the yam harvest with our special platter featuring roasted yam, fried yam chips, and yam pottage. Accompanied by grilled tilapia, kontomire stew, and fresh garden egg sauce. A true celebration of Ghanaian harvest traditions.",
    price: "GH₵ 165.00",
    rating: "4.9 ⭐ (320 reviews)",
    season: "Harvest Season",
    availability: "September - November",
  },
  {
    id: 11,
    name: "Easter Feast Bowl",
    image: "/src/assets/easterfeast.png",
    description:
      "A festive combination of omo tuo (rice balls) served with palm nut soup enriched with assorted meats including lamb, beef, and dry fish. Accompanied by boiled eggs and fresh vegetables. Perfect for the Easter celebration.",
    price: "GH₵ 195.00",
    rating: "4.8 ⭐ (280 reviews)",
    season: "Easter Special",
    availability: "March - April",
  },
  {
    id: 12,
    name: "Summer Beach Grill",
    image: "/src/assets/summerbeachgrill.png",
    description:
      "Fresh from the coast! Grilled lobster, prawns, and red snapper served with coconut rice, grilled vegetables, and our special seafood sauce. Garnished with lime and served with chilled palm wine.",
    price: "GH₵ 220.00",
    rating: "5.0 ⭐ (450 reviews)",
    season: "Summer Special",
    availability: "June - August",
  },
];

class SeasonalBookManager {
  constructor(foods) {
    this.foods = foods;
    this.currentIndex = 0;
    this.book = document.getElementById("seasonal-book");
    this.indicatorsContainer = document.getElementById("page-indicators");
    this.isPaused = false;
    this.autoRotateInterval = null;
    this.transitioning = false;
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    this.createBookPages();
    this.createPageIndicators();
    this.updateBookDisplay();
    this.startAutoRotate();
    this.addEventListeners();
    this.preloadImages();
  }

  createBookPages() {
    // Clear existing content
    this.book.innerHTML = "";

    this.foods.forEach((food, index) => {
      // Create left page (image)
      const leftPage = document.createElement("div");
      leftPage.className = "book-page left-page loading";
      leftPage.dataset.index = index;

      const img = document.createElement("img");
      img.src = food.image;
      img.alt = food.name;
      img.className = "page-image";
      img.onload = () => {
        leftPage.classList.remove("loading");
      };
      img.onerror = () => {
        leftPage.classList.remove("loading");
        // Fallback image or placeholder
        img.src =
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjM1ZW0iPkZvb2QgSW1hZ2U8L3RleHQ+PC9zdmc+";
      };

      leftPage.appendChild(img);

      // Create right page (content)
      const rightPage = document.createElement("div");
      rightPage.className = "book-page right-page";
      rightPage.dataset.index = index;

      const content = document.createElement("div");
      content.className = "page-content";
      content.innerHTML = `
                <h3 class="seasonal-name">${food.name}</h3>
                <div class="seasonal-tags">
                    <span class="season-tag">${food.season}</span>
                    <span class="season-tag">${food.availability}</span>
                </div>
                <p class="seasonal-description">${food.description}</p>
                <div class="seasonal-details">
                    <span class="seasonal-price">${food.price}</span>
                    <span class="seasonal-rating">${food.rating}</span>
                </div>
                <button class="seasonal-order-btn" aria-label="Order ${food.name}">Order Now</button>
            `;

      rightPage.appendChild(content);

      // Add pages to book
      this.book.appendChild(leftPage);
      this.book.appendChild(rightPage);
    });
  }

  createPageIndicators() {
    this.indicatorsContainer.innerHTML = "";

    this.foods.forEach((_, index) => {
      const indicator = document.createElement("div");
      indicator.className = "page-indicator";
      indicator.dataset.index = index;
      indicator.setAttribute("aria-label", `Go to page ${index + 1}`);
      if (index === 0) indicator.classList.add("active");

      indicator.addEventListener("click", () => {
        if (!this.transitioning) {
          this.goToPage(index);
        }
      });

      this.indicatorsContainer.appendChild(indicator);
    });
  }

  updateBookDisplay() {
    const pages = document.querySelectorAll(".book-page");
    const indicators = document.querySelectorAll(".page-indicator");

    // Hide all pages
    pages.forEach((page) => {
      page.style.display = "none";
      page.setAttribute("aria-hidden", "true");
    });

    // Show current pages
    const leftPage = document.querySelector(
      `.left-page[data-index="${this.currentIndex}"]`
    );
    const rightPage = document.querySelector(
      `.right-page[data-index="${this.currentIndex}"]`
    );

    if (leftPage && rightPage) {
      leftPage.style.display = "block";
      rightPage.style.display = "block";
      leftPage.setAttribute("aria-hidden", "false");
      rightPage.setAttribute("aria-hidden", "false");

      // Update ARIA labels for accessibility
      this.book.setAttribute(
        "aria-label",
        `Currently viewing: ${this.foods[this.currentIndex].name}`
      );
    }

    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentIndex);
      indicator.setAttribute(
        "aria-current",
        index === this.currentIndex ? "true" : "false"
      );
    });
  }

  goToPage(index) {
    if (this.transitioning || index === this.currentIndex) return;

    this.transitioning = true;
    this.stopAutoRotate();

    // Add turning animation
    this.book.classList.add("turning");

    // Update for screen readers
    this.book.setAttribute("aria-busy", "true");

    setTimeout(() => {
      this.currentIndex = index;
      this.updateBookDisplay();

      // Remove animation class
      this.book.classList.remove("turning");

      this.transitioning = false;
      this.book.setAttribute("aria-busy", "false");
      this.startAutoRotate();
    }, 500);
  }

  nextPage() {
    const nextIndex = (this.currentIndex + 1) % this.foods.length;
    this.goToPage(nextIndex);
  }

  prevPage() {
    const prevIndex =
      (this.currentIndex - 1 + this.foods.length) % this.foods.length;
    this.goToPage(prevIndex);
  }

  startAutoRotate() {
    this.stopAutoRotate();
    this.autoRotateInterval = setInterval(() => {
      if (!this.isPaused && !this.transitioning) {
        this.nextPage();
      }
    }, 5000);
  }

  stopAutoRotate() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
    }
  }

  addEventListeners() {
    // Pause on hover
    this.book.addEventListener("mouseenter", () => {
      this.isPaused = true;
    });

    this.book.addEventListener("mouseleave", () => {
      this.isPaused = false;
    });

    // Navigation buttons
    const prevButton = document.querySelector(".book-prev");
    const nextButton = document.querySelector(".book-next");

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        if (!this.transitioning) {
          this.prevPage();
        }
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        if (!this.transitioning) {
          this.nextPage();
        }
      });
    }

    // Order button
    this.book.addEventListener("click", (e) => {
      if (e.target.classList.contains("seasonal-order-btn")) {
        const food = this.foods[this.currentIndex];
        this.orderFood(food);
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!this.transitioning) {
        if (e.key === "ArrowLeft") {
          this.prevPage();
        } else if (e.key === "ArrowRight" || e.key === " ") {
          this.nextPage();
        }
      }
    });

    // Touch/swipe support for mobile
    this.book.addEventListener("touchstart", (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    });

    this.book.addEventListener("touchend", (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });

    // Pause auto-rotate when page is not visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stopAutoRotate();
      } else {
        this.startAutoRotate();
      }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      this.handleResize();
    });
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextPage(); // Swipe left
      } else {
        this.prevPage(); // Swipe right
      }
    }
  }

  handleResize() {
    // Adjust book dimensions on resize
    const bookContainer = document.querySelector(".book-container");
    if (bookContainer) {
      const newHeight = Math.min(500, window.innerHeight * 0.6);
      bookContainer.style.height = `${newHeight}px`;
    }
  }

  preloadImages() {
    this.foods.forEach((food) => {
      const img = new Image();
      img.src = food.image;
    });
  }

  orderFood(foodItem) {
    console.log(`Ordering: ${foodItem.name}`);

    // Create order confirmation
    const orderEvent = new CustomEvent("foodOrdered", {
      detail: {
        food: foodItem,
        timestamp: new Date().toISOString(),
      },
    });
    document.dispatchEvent(orderEvent);

    // Show visual feedback
    this.showOrderConfirmation(foodItem);
  }

  showOrderConfirmation(foodItem) {
    // Create confirmation element
    const confirmation = document.createElement("div");
    confirmation.className = "order-confirmation";
    confirmation.innerHTML = `
            <div class="confirmation-content">
                <span class="confirmation-icon">✓</span>
                <p>Added "${foodItem.name}" to your order!</p>
            </div>
        `;

    // Add styles for confirmation
    if (!document.querySelector("#confirmation-styles")) {
      const styles = document.createElement("style");
      styles.id = "confirmation-styles";
      styles.textContent = `
                .order-confirmation {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #ff6600, #e55c00);
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 10px;
                    box-shadow: 0 5px 20px rgba(255, 102, 0, 0.4);
                    z-index: 10000;
                    animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
                    transform: translateX(100%);
                }
                
                .confirmation-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .confirmation-icon {
                    font-size: 1.5rem;
                    font-weight: bold;
                }
                
                @keyframes slideIn {
                    to { transform: translateX(0); }
                }
                
                @keyframes slideOut {
                    from { transform: translateX(0); }
                    to { transform: translateX(100%); }
                }
            `;
      document.head.appendChild(styles);
    }

    document.body.appendChild(confirmation);

    // Remove after animation
    setTimeout(() => {
      if (confirmation.parentNode) {
        confirmation.parentNode.removeChild(confirmation);
      }
    }, 3000);
  }

  // Public method to manually change page
  setPage(index) {
    if (index >= 0 && index < this.foods.length) {
      this.goToPage(index);
    }
  }

  // Public method to get current food item
  getCurrentFood() {
    return this.foods[this.currentIndex];
  }

  // Cleanup method
  destroy() {
    this.stopAutoRotate();
    this.book.innerHTML = "";
    this.indicatorsContainer.innerHTML = "";

    // Remove event listeners
    document.removeEventListener("keydown", this.boundKeyHandler);
    document.removeEventListener(
      "visibilitychange",
      this.boundVisibilityHandler
    );
    window.removeEventListener("resize", this.boundResizeHandler);
  }
}


class RecommendationAnimator {
  constructor() {
    this.container = document.querySelector(".user-recommendation");
    this.currentIndex = 0;
    this.foods = [];
    this.autoRotateInterval = null;
    this.isPaused = false;
    this.transitionDuration = 800; // ms
    this.autoRotateDelay = 5000; // ms
  }

  async renderRecommendations(foods) {
    if (!this.container) return;
    
    this.foods = foods;
    this.currentIndex = 0;
    
    // Create container structure
    this.createStructure();
    
    // Display first item
    this.displayItem(0);
    
    // Start auto-rotation
    this.startAutoRotate();
    
    // Add navigation
    this.addNavigation();
  }

  createStructure() {
    this.container.innerHTML = `
      <div class="recommendation-wrapper">
        <div class="recommendation-slider">
          <!-- Content will be inserted here -->
        </div>
        <div class="recommendation-nav">
          <button class="rec-nav-prev" aria-label="Previous recommendation">❮</button>
          <button class="rec-nav-next" aria-label="Next recommendation">❯</button>
        </div>
        <div class="recommendation-dots">
          ${this.foods.map((_, index) => `
            <span class="rec-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
          `).join('')}
        </div>
      </div>
    `;
    
    this.slider = this.container.querySelector('.recommendation-slider');
  }

  createFoodHTML(food) {
    return `
      <div class="recommended-item" data-food-id="${food.id}">
        <div class="food-card">
          <img class="food-image" src="${food.image}" alt="${food.name}" loading="lazy" />
          <div class="food-overlay">
            <h4 class="food-name">${food.name}</h4>
            <div class="food-meta">
              <div class="food-details">
                <span class="price">${food.price}</span>
                <span class="rating">${food.rating}</span>
              </div>
            </div>
            <div class="agreement-stats">
              <button class="order-btn agree-btn" data-food-id="${food.id}">Agree</button>
              <span class="agree-count" data-count="${food.agreeCount}">
                <span class="count-number">${food.agreeCount}</span> People Agree
              </span>
            </div>
          </div>
        </div>
        <div class="recommendation-info">
          <div class="user-profile-section">
            <img class="user-avatar" src="${food.user.avatar}" alt="${food.user.name}" 
                 onerror="this.src='/src/assets/default-avatar.png'" />
            <div>
              <p class="user-name">${food.user.name}</p>
              <p class="user-rating">${food.user.rating}</p>
            </div>
          </div>
          <blockquote class="user-comment">${food.user.comment}</blockquote>
          <button class="order-btn" data-food-id="${food.id}">Order Now</button>
        </div>
      </div>
    `;
  }

  async displayItem(index) {
    const food = this.foods[index];
    if (!food) return;
    
    const newContent = this.createFoodHTML(food);
    const currentItem = this.slider.querySelector('.recommended-item');
    
    if (currentItem) {
      // Animate out current item
      currentItem.classList.add('slide-out');
      
      await new Promise(resolve => setTimeout(resolve, this.transitionDuration / 2));
      
      // Replace content
      this.slider.innerHTML = newContent;
      
      // Animate in new item
      const newItem = this.slider.querySelector('.recommended-item');
      newItem.classList.add('slide-in');
      
      // Attach event listeners to new item
      this.attachItemEventListeners();
      
      // Remove animation class after completion
      setTimeout(() => {
        newItem.classList.remove('slide-in');
      }, this.transitionDuration);
    } else {
      // First load - no animation
      this.slider.innerHTML = newContent;
      this.attachItemEventListeners();
    }
    
    // Update dots
    this.updateDots(index);
  }

  updateDots(activeIndex) {
    const dots = this.container.querySelectorAll('.rec-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.foods.length;
    this.displayItem(this.currentIndex);
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.foods.length) % this.foods.length;
    this.displayItem(this.currentIndex);
  }

  goToIndex(index) {
    if (index >= 0 && index < this.foods.length) {
      this.currentIndex = index;
      this.displayItem(this.currentIndex);
    }
  }

  startAutoRotate() {
    this.stopAutoRotate();
    this.autoRotateInterval = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, this.autoRotateDelay);
  }

  stopAutoRotate() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
    }
  }

  addNavigation() {
    // Previous/Next buttons
    const prevBtn = this.container.querySelector('.rec-nav-prev');
    const nextBtn = this.container.querySelector('.rec-nav-next');
    
    prevBtn?.addEventListener('click', () => {
      this.stopAutoRotate();
      this.prev();
      this.startAutoRotate();
    });
    
    nextBtn?.addEventListener('click', () => {
      this.stopAutoRotate();
      this.next();
      this.startAutoRotate();
    });
    
    // Dot navigation
    const dots = this.container.querySelectorAll('.rec-dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.stopAutoRotate();
        this.goToIndex(index);
        this.startAutoRotate();
      });
    });
    
    // Pause on hover
    this.container.addEventListener('mouseenter', () => {
      this.isPaused = true;
    });
    
    this.container.addEventListener('mouseleave', () => {
      this.isPaused = false;
    });
  }

  attachItemEventListeners() {
    // Agree button with particle effect
    const agreeBtn = this.slider.querySelector('.agree-btn');
    agreeBtn?.addEventListener('click', (e) => this.handleAgree(e));

    // Order buttons
    this.slider.querySelectorAll('.order-btn:not(.agree-btn)').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleOrder(e));
    });

    // Image hover
    const img = this.slider.querySelector('.food-image');
    img?.addEventListener('mouseenter', (e) => this.handleImageHover(e));
  }
  handleAgree(e) {
    const btn = e.target;
    const foodId = btn.dataset.foodId;
    const countElement = btn.parentElement.querySelector('.count-number');
    let currentCount = parseInt(countElement.textContent);
    
    // Increment count with animation
    currentCount++;
    this.animateCountChange(countElement, currentCount);
    
    // Create particle effect
    this.createParticles(e);
    
    // Pulse animation
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 200);

    // Disable button to prevent spam
    btn.disabled = true;
    btn.textContent = 'Agreed!';
    btn.style.background = 'linear-gradient(135deg, gold, #ffa500)';
  }

  animateCountChange(element, newCount) {
    const startCount = parseInt(element.textContent);
    const duration = 500;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentCount = Math.floor(startCount + (newCount - startCount) * progress);
      element.textContent = currentCount;
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.style.animation = 'countUp 0.3s ease-out';
        setTimeout(() => {
          element.style.animation = '';
        }, 300);
      }
    };

    requestAnimationFrame(updateCount);
  }

  createParticles(e) {
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      
      const angle = (i / 12) * Math.PI * 2;
      const velocity = 50 + Math.random() * 50;
      particle.style.setProperty('--x', `${Math.cos(angle) * velocity}px`);
      particle.style.setProperty('--y', `${Math.sin(angle) * velocity}px`);
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    }
  }

  handleOrder(e) {
    const btn = e.target;
    const foodId = btn.dataset.foodId;
    
    // Ripple effect
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    
    ripple.animate([
      { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
      { transform: 'translate(-50%, -50%) scale(4)', opacity: 0 }
    ], {
      duration: 600,
      easing: 'ease-out'
    }).onfinish = () => ripple.remove();

    // Success feedback
    this.showOrderSuccess(foodId);
  }

  handleImageHover(e) {
    const img = e.target;
    img.style.transform = 'scale(1.05) rotate(2deg)';
    
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1) rotate(0deg)';
    }, { once: true });
  }

  showOrderSuccess(foodId) {
    const food = this.currentData.find(f => f.id == foodId);
    if (!food) return;

    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'order-success-notification';
    notification.innerHTML = `
      <div class="success-content">
        <span class="success-icon">✨</span>
        <div class="success-text">
          <strong>${food.name}</strong>
          <p>Added to your order!</p>
        </div>
      </div>
    `;

    // Add notification styles if not exists
    if (!document.querySelector('#notification-styles')) {
      const styles = document.createElement('style');
      styles.id = 'notification-styles';
      styles.textContent = `
        .order-success-notification {
          position: fixed;
          top: 20px;
          right: -400px;
          background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
          z-index: 10000;
          display: flex;
          align-items: center;
          gap: 1rem;
          border: 1px solid rgba(255, 215, 0, 0.3);
          animation: slideInNotification 0.5s ease-out forwards,
                     slideOutNotification 0.5s ease-out 3s forwards;
        }

        @keyframes slideInNotification {
          to {
            right: 20px;
            transform: translateX(0);
          }
        }

        @keyframes slideOutNotification {
          from {
            right: 20px;
            opacity: 1;
          }
          to {
            right: -400px;
            opacity: 0;
          }
        }

        .success-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .success-icon {
          font-size: 2rem;
          animation: sparkle 1s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
        }

        .success-text strong {
          display: block;
          color: gold;
          margin-bottom: 0.25rem;
        }

        .success-text p {
          margin: 0;
          font-size: 0.9rem;
          opacity: 0.9;
        }
      `;
      document.head.appendChild(styles);
    }

    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
  }

  // Method to update data with smooth transition
  async updateRecommendations(newFoods) {
    // Fade out current items
    const items = this.container.querySelectorAll('.recommended-item');
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.animation = 'fadeOutLeft 0.5s ease-out forwards';
      }, index * 50);
    });

    // Wait for fade out to complete
    await new Promise(resolve => setTimeout(resolve, items.length * 50 + 500));

    // Render new items
    await this.renderRecommendations(newFoods);
  }
}

// Initialize the animator
const recommendationAnimator = new RecommendationAnimator();

// Sample data with multiple items
const recommendedFoods = [
  {
    id: 101,
    name: "Fufu and Chicken Light Soup",
    image: "/src/assets/fufu3.jpg",
    price: "GH₵ 200.99",
    rating: "5.0 ⭐ (450 reviews)",
    agreeCount: 200,
    user: {
      name: "Sarah K.",
      avatar: "/src/assets/person1.png",
      rating: "⭐⭐⭐⭐⭐",
      comment: "This fufu is SO smooth, just like my grandma used to pound! Paired with that rich, aromatic chicken light soup? Pure comfort. Every spoonful feels like home. 10/10, no regrets. I'm ordering this weekly!"
    },
  },
  {
    id: 102,
    name: "Jollof Rice Special",
    image: "/src/assets/friedrice1.png",
    price: "GH₵ 85.00",
    rating: "4.9 ⭐ (320 reviews)",
    agreeCount: 156,
    user: {
      name: "Kofi M.",
      avatar: "/src/assets/person2.png",
      rating: "⭐⭐⭐⭐⭐",
      comment: "This jollof hits different! The smoky flavor, the perfect spice level, and those crispy bottom grains? Chef's kiss! Better than any party jollof I've had."
    },
  },
  {
    id: 103,
    name: "Banku with Grilled Tilapia",
    image: "/src/assets/bankuandtilapia2.png",
    price: "GH₵ 120.00",
    rating: "5.0 ⭐ (280 reviews)",
    agreeCount: 189,
    user: {
      name: "Ama D.",
      avatar: "/src/assets/person3.png",
      rating: "⭐⭐⭐⭐⭐",
      comment: "Fresh tilapia grilled to perfection! The banku is soft and pairs beautifully with the spicy pepper sauce. This is how traditional food should taste!"
    },
  }
];



//Discounted data
const discounted = [
  {
    id: 201,
    name: "Assorted Jollof",
    image: "/src/assets/friedrice3.png",
    originalPrice: "GH₵ 240.70",
    priceNow: "GH₵ 200.90",
    rating: "5.0 ⭐ (200 reviews)",
    promo: {
      title:"Wekend Special offer",
      description: "Order this package on the wekend to enjoy exclusive discount",
    }
  },
  {
    id: 202,
    name: "Special fufu",
    image: "/src/assets/fufu2.jpg",
    originalPrice: "GH₵ 300.60",
    priceNow: "GH₵ 250.99",
    rating: "5.0 ⭐ (305 reviews)",
    promo:{
      title: "Deluxe costomers offer",
      description: "Must be a costomer, enjoy this offer twice every month"
    }
  }
]

// Discounted Section Manager
// Discounted Section Manager
class DiscountedSlider {
  constructor(items) {
    this.items = items;
    this.currentIndex = 0;
    this.container = null;
    this.isTransitioning = false;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 4000; // 4 seconds
    
    this.init();
  }
  
  init() {
    this.createContainer();
    this.renderCurrentItem();
    this.startAutoPlay();
    this.addEventListeners();
  }
  
  createContainer() {
    const section = document.getElementById('discounted');
    if (!section) return;
    
    // Create the slider structure
    const sliderHTML = `
      <div class="discount-slider-container">
        <div class="discount-slider-track">
          <!-- Items will be inserted here -->
        </div>
        <div class="discount-navigation">
          <button class="discount-nav-btn discount-prev" aria-label="Previous item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="discount-indicators">
            ${this.items.map((_, index) => 
              `<span class="discount-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`
            ).join('')}
          </div>
          <button class="discount-nav-btn discount-next" aria-label="Next item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    `;
    
    const contentDiv = section.querySelector('div');
    contentDiv.innerHTML = sliderHTML;
    
    this.container = contentDiv.querySelector('.discount-slider-track');
  }
  
  createItemHTML(item, className = '') {
    const discount = Math.round(((parseFloat(item.originalPrice.replace(/[^0-9.]/g, '')) - 
                                  parseFloat(item.priceNow.replace(/[^0-9.]/g, ''))) / 
                                  parseFloat(item.originalPrice.replace(/[^0-9.]/g, ''))) * 100);
    
    return `
      <div class="discount-card ${className}">
        <div class="discount-badge">
          <span class="discount-percentage">${discount}%</span>
          <span class="discount-text">OFF</span>
        </div>
        
        <div class="discount-content">
          <div class="discount-image-wrapper">
            <img src="${item.image}" alt="${item.name}" class="discount-image">
            <div class="discount-overlay">
              <button class="quick-order-btn" data-id="${item.id}">
                Quick Order
              </button>
            </div>
          </div>
          
          <div class="discount-info">
            <h4 class="discount-name">${item.name}</h4>
            
            <div class="discount-promo">
              <span class="promo-tag">${item.promo.title}</span>
              <p class="promo-description">${item.promo.description}</p>
            </div>
            
            <div class="discount-pricing">
              <span class="original-price">${item.originalPrice}</span>
              <span class="current-price">${item.priceNow}</span>
            </div>
            
            <div class="discount-rating">${item.rating}</div>
            
            <div class="discount-timer">
              <span class="timer-icon">⏰</span>
              <span class="timer-text">Offer ends in: <span class="countdown">23:59:59</span></span>
            </div>
            
            <button class="discount-order-btn" data-id="${item.id}">
              Order Now & Save
            </button>
          </div>
        </div>
      </div>
    `;
  }
  
  renderCurrentItem() {
    const currentItem = this.items[this.currentIndex];
    this.container.innerHTML = this.createItemHTML(currentItem, 'active');
    this.startCountdown();
  }
  
  async slideToNext() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    const nextIndex = (this.currentIndex + 1) % this.items.length;
    const nextItem = this.items[nextIndex];
    
    // Create next item element
    const nextElement = document.createElement('div');
    nextElement.innerHTML = this.createItemHTML(nextItem, 'entering');
    const nextCard = nextElement.firstElementChild;
    
    // Add next item to container
    this.container.appendChild(nextCard);
    
    // Get current card
    const currentCard = this.container.querySelector('.discount-card.active');
    
    // Trigger animations
    requestAnimationFrame(() => {
      currentCard.classList.add('exiting');
      nextCard.classList.remove('entering');
      nextCard.classList.add('active');
    });
    
    // Wait for animation to complete
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Remove old card
    currentCard.remove();
    
    // Update state
    this.currentIndex = nextIndex;
    this.updateIndicators();
    this.startCountdown();
    this.isTransitioning = false;
  }
  
  async slideToPrev() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    const prevItem = this.items[prevIndex];
    
    // Create previous item element
    const prevElement = document.createElement('div');
    prevElement.innerHTML = this.createItemHTML(prevItem, 'entering-reverse');
    const prevCard = prevElement.firstElementChild;
    
    // Add previous item to container
    this.container.appendChild(prevCard);
    
    // Get current card
    const currentCard = this.container.querySelector('.discount-card.active');
    
    // Trigger animations
    requestAnimationFrame(() => {
      currentCard.classList.add('exiting-reverse');
      prevCard.classList.remove('entering-reverse');
      prevCard.classList.add('active');
    });
    
    // Wait for animation to complete
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Remove old card
    currentCard.remove();
    
    // Update state
    this.currentIndex = prevIndex;
    this.updateIndicators();
    this.startCountdown();
    this.isTransitioning = false;
  }
  
  async goToIndex(targetIndex) {
    if (this.isTransitioning || targetIndex === this.currentIndex) return;
    
    // Determine direction
    if (targetIndex > this.currentIndex) {
      // Calculate how many slides to go forward
      const steps = targetIndex - this.currentIndex;
      for (let i = 0; i < steps; i++) {
        await this.slideToNext();
        // Small delay between multiple slides
        if (i < steps - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    } else {
      // Calculate how many slides to go backward
      const steps = this.currentIndex - targetIndex;
      for (let i = 0; i < steps; i++) {
        await this.slideToPrev();
        // Small delay between multiple slides
        if (i < steps - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    }
  }
  
  updateIndicators() {
    const dots = document.querySelectorAll('.discount-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }
  
  startCountdown() {
    const countdownElement = this.container.querySelector('.countdown');
    if (!countdownElement) return;
    
    let hours = 23, minutes = 59, seconds = 59;
    
    const updateTimer = () => {
      seconds--;
      if (seconds < 0) {
        seconds = 59;
        minutes--;
        if (minutes < 0) {
          minutes = 59;
          hours--;
          if (hours < 0) {
            hours = 23;
          }
        }
      }
      
      countdownElement.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
    
    // Clear any existing interval
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    
    this.countdownInterval = setInterval(updateTimer, 1000);
  }
  
  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.slideToNext();
    }, this.autoPlayDelay);
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
  
  addEventListeners() {
    // Get the parent container to ensure we're selecting from the right scope
    const section = document.getElementById('discounted');
    if (!section) return;
    
    // Navigation buttons
    const prevBtn = section.querySelector('.discount-prev');
    const nextBtn = section.querySelector('.discount-next');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.stopAutoPlay();
        this.slideToPrev();
        this.startAutoPlay();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.stopAutoPlay();
        this.slideToNext();
        this.startAutoPlay();
      });
    }
    
    // Dot navigation
    const dots = section.querySelectorAll('.discount-dot');
    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        if (!isNaN(index) && index !== this.currentIndex && !this.isTransitioning) {
          this.stopAutoPlay();
          this.goToIndex(index);
          this.startAutoPlay();
        }
      });
    });
    
    // Pause on hover
    this.container.addEventListener('mouseenter', () => {
      this.stopAutoPlay();
    });
    
    this.container.addEventListener('mouseleave', () => {
      this.startAutoPlay();
    });
    
    // Order button clicks
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('discount-order-btn') || 
          e.target.classList.contains('quick-order-btn')) {
        const itemId = e.target.dataset.id;
        this.handleOrder(itemId);
      }
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    this.container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    this.container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.target.closest('#discounted')) {
        if (e.key === 'ArrowLeft') {
          this.stopAutoPlay();
          this.slideToPrev();
          this.startAutoPlay();
        } else if (e.key === 'ArrowRight') {
          this.stopAutoPlay();
          this.slideToNext();
          this.startAutoPlay();
        }
      }
    });
  }
  
  handleSwipe(startX, endX) {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
      this.stopAutoPlay();
      
      if (diff > 0) {
        this.slideToNext(); // Swipe left
      } else {
        this.slideToPrev(); // Swipe right
      }
      
      this.startAutoPlay();
    }
  }
  
  handleOrder(itemId) {
    const item = this.items.find(i => i.id == itemId);
    if (!item) return;
    
    // Create order confirmation with special discount emphasis
    const notification = document.createElement('div');
    notification.className = 'discount-order-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <span class="success-icon">🎉</span>
        <div>
          <strong>${item.name}</strong>
          <p>Added to cart with ${item.promo.title}!</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  destroy() {
    this.stopAutoPlay();
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.container.innerHTML = '';
  }
}

//Initialization
document.addEventListener("DOMContentLoaded", () => {
  // Render recommendations with animation
  if (typeof recommendationAnimator !== 'undefined' && typeof recommendedFoods !== 'undefined') {
    recommendationAnimator.renderRecommendations(recommendedFoods);
  }
  if (typeof CarouselManager !== 'undefined' && typeof popularFoods !== 'undefined') {
    new CarouselManager(popularFoods);
  }
  if (typeof ChefsSpecialManager !== 'undefined' && typeof chefsSpecials !== 'undefined') {
    new ChefsSpecialManager(chefsSpecials);
  }
  if (typeof SeasonalBookManager !== 'undefined' && typeof seasonalSpecials !== 'undefined') {
    new SeasonalBookManager(seasonalSpecials);
  }
  if (typeof DiscountedSlider !== 'undefined' && typeof discounted !== 'undefined' && discounted.length > 0) {
    new DiscountedSlider(discounted);
  }
});
