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

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    new CarouselManager(popularFoods);
});

