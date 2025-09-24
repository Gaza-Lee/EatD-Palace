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
        this.book = document.getElementById('seasonal-book');
        this.indicatorsContainer = document.getElementById('page-indicators');
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
        this.book.innerHTML = '';
        
        this.foods.forEach((food, index) => {
            // Create left page (image)
            const leftPage = document.createElement('div');
            leftPage.className = 'book-page left-page loading';
            leftPage.dataset.index = index;
            
            const img = document.createElement('img');
            img.src = food.image;
            img.alt = food.name;
            img.className = 'page-image';
            img.onload = () => {
                leftPage.classList.remove('loading');
            };
            img.onerror = () => {
                leftPage.classList.remove('loading');
                // Fallback image or placeholder
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjM1ZW0iPkZvb2QgSW1hZ2U8L3RleHQ+PC9zdmc+';
            };
            
            leftPage.appendChild(img);
            
            // Create right page (content)
            const rightPage = document.createElement('div');
            rightPage.className = 'book-page right-page';
            rightPage.dataset.index = index;
            
            const content = document.createElement('div');
            content.className = 'page-content';
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
        this.indicatorsContainer.innerHTML = '';
        
        this.foods.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'page-indicator';
            indicator.dataset.index = index;
            indicator.setAttribute('aria-label', `Go to page ${index + 1}`);
            if (index === 0) indicator.classList.add('active');
            
            indicator.addEventListener('click', () => {
                if (!this.transitioning) {
                    this.goToPage(index);
                }
            });
            
            this.indicatorsContainer.appendChild(indicator);
        });
    }

    updateBookDisplay() {
        const pages = document.querySelectorAll('.book-page');
        const indicators = document.querySelectorAll('.page-indicator');
        
        // Hide all pages
        pages.forEach(page => {
            page.style.display = 'none';
            page.setAttribute('aria-hidden', 'true');
        });
        
        // Show current pages
        const leftPage = document.querySelector(`.left-page[data-index="${this.currentIndex}"]`);
        const rightPage = document.querySelector(`.right-page[data-index="${this.currentIndex}"]`);
        
        if (leftPage && rightPage) {
            leftPage.style.display = 'block';
            rightPage.style.display = 'block';
            leftPage.setAttribute('aria-hidden', 'false');
            rightPage.setAttribute('aria-hidden', 'false');
            
            // Update ARIA labels for accessibility
            this.book.setAttribute('aria-label', `Currently viewing: ${this.foods[this.currentIndex].name}`);
        }
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
            indicator.setAttribute('aria-current', index === this.currentIndex ? 'true' : 'false');
        });
    }

    goToPage(index) {
        if (this.transitioning || index === this.currentIndex) return;
        
        this.transitioning = true;
        this.stopAutoRotate();
        
        // Add turning animation
        this.book.classList.add('turning');
        
        // Update for screen readers
        this.book.setAttribute('aria-busy', 'true');
        
        setTimeout(() => {
            this.currentIndex = index;
            this.updateBookDisplay();
            
            // Remove animation class
            this.book.classList.remove('turning');
            
            this.transitioning = false;
            this.book.setAttribute('aria-busy', 'false');
            this.startAutoRotate();
        }, 500);
    }

    nextPage() {
        const nextIndex = (this.currentIndex + 1) % this.foods.length;
        this.goToPage(nextIndex);
    }

    prevPage() {
        const prevIndex = (this.currentIndex - 1 + this.foods.length) % this.foods.length;
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
        this.book.addEventListener('mouseenter', () => {
            this.isPaused = true;
        });

        this.book.addEventListener('mouseleave', () => {
            this.isPaused = false;
        });

        // Navigation buttons
        const prevButton = document.querySelector('.book-prev');
        const nextButton = document.querySelector('.book-next');
        
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (!this.transitioning) {
                    this.prevPage();
                }
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (!this.transitioning) {
                    this.nextPage();
                }
            });
        }

        // Order button
        this.book.addEventListener('click', (e) => {
            if (e.target.classList.contains('seasonal-order-btn')) {
                const food = this.foods[this.currentIndex];
                this.orderFood(food);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.transitioning) {
                if (e.key === 'ArrowLeft') {
                    this.prevPage();
                } else if (e.key === 'ArrowRight' || e.key === ' ') {
                    this.nextPage();
                }
            }
        });

        // Touch/swipe support for mobile
        this.book.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });

        this.book.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        // Pause auto-rotate when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoRotate();
            } else {
                this.startAutoRotate();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
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
        const bookContainer = document.querySelector('.book-container');
        if (bookContainer) {
            const newHeight = Math.min(500, window.innerHeight * 0.6);
            bookContainer.style.height = `${newHeight}px`;
        }
    }

    preloadImages() {
        this.foods.forEach(food => {
            const img = new Image();
            img.src = food.image;
        });
    }

    orderFood(foodItem) {
        console.log(`Ordering: ${foodItem.name}`);
        
        // Create order confirmation
        const orderEvent = new CustomEvent('foodOrdered', {
            detail: {
                food: foodItem,
                timestamp: new Date().toISOString()
            }
        });
        document.dispatchEvent(orderEvent);
        
        // Show visual feedback
        this.showOrderConfirmation(foodItem);
    }

    showOrderConfirmation(foodItem) {
        // Create confirmation element
        const confirmation = document.createElement('div');
        confirmation.className = 'order-confirmation';
        confirmation.innerHTML = `
            <div class="confirmation-content">
                <span class="confirmation-icon">✓</span>
                <p>Added "${foodItem.name}" to your order!</p>
            </div>
        `;
        
        // Add styles for confirmation
        if (!document.querySelector('#confirmation-styles')) {
            const styles = document.createElement('style');
            styles.id = 'confirmation-styles';
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
        this.book.innerHTML = '';
        this.indicatorsContainer.innerHTML = '';
        
        // Remove event listeners
        document.removeEventListener('keydown', this.boundKeyHandler);
        document.removeEventListener('visibilitychange', this.boundVisibilityHandler);
        window.removeEventListener('resize', this.boundResizeHandler);
    }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  if (
    typeof CarouselManager !== "undefined" &&
    typeof ChefsSpecialManager !== "undefined"
  ) {
    new CarouselManager(popularFoods);
    new ChefsSpecialManager(chefsSpecials);
    new SeasonalBookManager(seasonalSpecials);
  }
});