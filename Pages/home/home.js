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
        description: "Authentic pounded cassava and plantain served with your choice of rich groundnut soup, palm nut soup, or light soup. A true taste of home!",
        price: "GH₵ 45.00",
        rating: "4.9 ⭐ (3.2k reviews)"
    },
    {
        id: 2,
        name: "Deluxed Fried Rice",
        image: "/src/assets/friedrice1.png",
        description: "Aromatic jasmine rice stir-fried with succulent shrimp, chicken, mixed vegetables, and our special blend of spices. Topped with fried plantain.",
        price: "GH₵ 65.00",
        rating: "4.8 ⭐ (2.5k reviews)"
    },
    {
        id: 3,
        name: "Hot Waakye",
        image: "/src/assets/wakye1.png",
        description: "Traditional rice and beans cooked to perfection, served with gari, fried plantain, spaghetti, boiled egg, and your choice of fish or meat.",
        price: "GH₵ 35.00",
        rating: "4.9 ⭐ (4.1k reviews)"
    },
    {
        id: 4,
        name: "Soft Banku and Tilapia",
        image: "/src/assets/bankuandtilapia.png",
        description: "Freshly prepared fermented corn and cassava dough paired with perfectly grilled tilapia, pepper sauce, and fresh vegetables.",
        price: "GH₵ 55.00",
        rating: "5.0 ⭐ (5.3k reviews)"
    }
];

class CarouselManager {
    constructor(foods) {
        this.foods = foods;
        this.currentIndex = 0;
        this.track = document.querySelector('.carousel-track');
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
            const item = document.createElement('div');
            item.className = 'carousel-item';
            item.dataset.index = index;

            const img = document.createElement('img');
            img.src = food.image;
            img.alt = food.name;

            // Create overlay for food info
            const overlay = document.createElement('div');
            overlay.className = 'food-info-overlay';
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
        const items = document.querySelectorAll('.carousel-item');
        const totalItems = items.length;

        items.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next', 'hidden');

            const position = (index - this.currentIndex + totalItems) % totalItems;

            if (position === 0) {
                item.classList.add('active');
            } else if (position === 1) {
                item.classList.add('next');
            } else if (position === totalItems - 1) {
                item.classList.add('prev');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    rotate(direction = 'next') {
        if (direction === 'next') {
            this.currentIndex = (this.currentIndex + 1) % this.foods.length;
        } else {
            this.currentIndex = (this.currentIndex - 1 + this.foods.length) % this.foods.length;
        }
        this.updateCarousel();
    }

    startAutoRotate() {
        this.autoRotateInterval = setInterval(() => {
            if (!this.isPaused) {
                this.rotate('next');
            }
        }, 3000);
    }

    stopAutoRotate() {
        clearInterval(this.autoRotateInterval);
    }

    addEventListeners() {
        // Hover events for active image
        this.track.addEventListener('mouseover', (e) => {
            const item = e.target.closest('.carousel-item');
            if (item && item.classList.contains('active')) {
                this.isPaused = true;
            }
        });

        this.track.addEventListener('mouseout', (e) => {
            const item = e.target.closest('.carousel-item');
            if (item && item.classList.contains('active')) {
                this.isPaused = false;
            }
        });

        // Click on side images to navigate
        this.track.addEventListener('click', (e) => {
            const item = e.target.closest('.carousel-item');
            if (item) {
                if (item.classList.contains('prev')) {
                    this.rotate('prev');
                } else if (item.classList.contains('next')) {
                    this.rotate('next');
                }
            }
        });
    }
}


// Chef's Special Section Implementation
const chefsSpecials = [
  {
    id: 5,
    name: "Lobster Thermidor",
    image: "/src/assets/fufu3.jpg",
    description: "Succulent lobster meat cooked in a rich cream sauce with brandy, mustard and cheese, then returned to the shell and grilled to perfection.",
    price: "GH₵ 120.00",
    rating: "4.9 ⭐ (1.8k reviews)"
  },
  {
    id: 6,
    name: "Truffle Risotto",
    image: "/src/assets/friedrice3.png",
    description: "Creamy Arborio rice cooked with white truffle oil, wild mushrooms, and parmesan cheese. Finished with shaved black truffles for an exquisite flavor.",
    price: "GH₵ 95.00",
    rating: "4.8 ⭐ (1.2k reviews)"
  },
  {
    id: 7,
    name: "Beef Wellington",
    image: "/src/assets/friedrice4.png",
    description: "Premium beef tenderloin wrapped in mushroom duxelles and prosciutto, then encased in flaky puff pastry. Served with red wine reduction.",
    price: "GH₵ 150.00",
    rating: "5.0 ⭐ (2.3k reviews)"
  },
  {
    id: 8,
    name: "Sous Vide Duck",
    image: "/src/assets/bankuandtilapia2.png",
    description: "Duck breast cooked sous vide to perfect medium-rare, then crisped and served with cherry port reduction, roasted vegetables, and truffle mashed potatoes.",
    price: "GH₵ 110.00",
    rating: "4.7 ⭐ (980 reviews)"
  }
];

class ChefsSpecialManager {
  constructor(foods) {
    this.foods = foods;
    this.currentIndex = 0;
    this.track = document.querySelector('.chefs-track');
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
    this.track.innerHTML = '';

    this.foods.forEach((food, index) => {
      const item = document.createElement('div');
      item.className = 'chefs-item';
      item.dataset.index = index;

      // Create image container
      const imgContainer = document.createElement('div');
      imgContainer.className = 'chefs-img-container';
      
      const img = document.createElement('img');
      img.src = food.image;
      img.alt = food.name;
      img.loading = 'lazy';
      
      imgContainer.appendChild(img);

      // Create food content
      const content = document.createElement('div');
      content.className = 'food-content';
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
    const nav = document.createElement('div');
    nav.className = 'chefs-nav';
    nav.innerHTML = `
      <button class="chefs-prev" aria-label="Previous dish">❮</button>
      <button class="chefs-next" aria-label="Next dish">❯</button>
    `;
    this.track.parentElement.appendChild(nav);
  }

  updateChefsDisplay() {
    const items = document.querySelectorAll('.chefs-item');
    const totalItems = items.length;

    items.forEach((item, index) => {
      item.classList.remove('active', 'next', 'hidden');

      const position = (index - this.currentIndex + totalItems) % totalItems;

      if (position === 0) {
        item.classList.add('active');
      } else if (position === 1) {
        item.classList.add('next');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  rotate(direction = 'next') {
    if (this.transitioning) return;
    this.transitioning = true;
    this.stopAutoRotate();

    const items = document.querySelectorAll('.chefs-item');
    const activeItem = items[this.currentIndex];
    let nextIndex = direction === 'next' 
      ? (this.currentIndex + 1) % this.foods.length 
      : (this.currentIndex - 1 + this.foods.length) % this.foods.length;
    
    const nextItem = items[nextIndex];

    // Set up transitions
    activeItem.style.transition = 'all 0.5s cubic-bezier(0.65, 0, 0.35, 1)';
    nextItem.style.transition = 'all 0.5s cubic-bezier(0.65, 0, 0.35, 1)';

    // Animate current active item to become the next preview (right side)
    if (direction === 'next') {
      activeItem.style.width = '20%';
      activeItem.style.left = 'auto';
      activeItem.style.right = '0';
      activeItem.querySelector('img').style.clipPath = 'circle(50% at right center)';
    } else {
      activeItem.style.width = '20%';
      activeItem.style.left = 'auto';
      activeItem.style.right = '0';
      activeItem.querySelector('img').style.clipPath = 'circle(50% at right center)';
    }

    // Common styles for transitioning out active item
    activeItem.querySelector('img').style.borderRadius = '50%';
    activeItem.querySelector('img').style.height = '80%';
    activeItem.querySelector('.food-content').style.display = 'none';

    // Animate next item to become active (left side)
    nextItem.style.width = '80%';
    nextItem.style.left = '0';
    nextItem.style.right = 'auto';
    nextItem.querySelector('img').style.clipPath = 'none';
    nextItem.querySelector('img').style.borderRadius = '20px 0 0 20px';
    nextItem.querySelector('img').style.height = '100%';
    nextItem.querySelector('.food-content').style.display = 'block';

    // After animation completes
    setTimeout(() => {
      this.currentIndex = nextIndex;
      this.updateChefsDisplay();
      
      // Reset inline styles
      items.forEach(item => {
        item.style.transition = '';
        const img = item.querySelector('img');
        if (img) {
          img.style.height = '';
          img.style.borderRadius = '';
          img.style.clipPath = '';
        }
        const content = item.querySelector('.food-content');
        if (content) {
          content.style.display = '';
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
        this.rotate('next');
      }
    }, 5000);
  }

  stopAutoRotate() {
    clearInterval(this.autoRotateInterval);
  }

  addEventListeners() {
    // Pause on hover
    this.track.addEventListener('mouseenter', () => {
      this.isPaused = true;
    });

    this.track.addEventListener('mouseleave', () => {
      this.isPaused = false;
    });

    // Navigation buttons
    document.querySelector('.chefs-prev')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.rotate('prev');
    });

    document.querySelector('.chefs-next')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.rotate('next');
    });

    // Click on next item to navigate
    this.track.addEventListener('click', (e) => {
      const item = e.target.closest('.chefs-item');
      if (item && item.classList.contains('next')) {
        this.rotate('next');
      }
    });

    // Order button click
    this.track.addEventListener('click', (e) => {
      if (e.target.classList.contains('order-btn')) {
        const item = e.target.closest('.chefs-item');
        const foodIndex = parseInt(item.dataset.index);
        this.orderFood(this.foods[foodIndex]);
      }
    });
  }

  orderFood(foodItem) {
    console.log(`Ordering: ${foodItem.name}`);
    // Here you would typically add to cart or show a modal
    alert(`Added ${foodItem.name} to your order!`);
  }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    new CarouselManager(popularFoods);
    new ChefsSpecialManager(chefsSpecials);
});

