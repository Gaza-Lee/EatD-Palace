(function () {
  if (!document.querySelector('link[href="/Pages/menu/menu.css"]')) {
    const menuStyles = document.createElement("link");
    menuStyles.rel = "stylesheet";
    menuStyles.href = "/Pages/menu/menu.css";
    document.head.appendChild(menuStyles);
  }
})();

// Menu data
const menuData = {
  // Main Dishes
  mainDishes: [
    {
      id: 201,
      name: "Special Fufu",
      image: "/src/assets/fufu1.jpg",
      description:
        "Authentic pounded cassava and plantain served with choice of soup and meat. Choose what soup, meat, and many more extras in the cart",
      price: "GH₵ 45.00",
      rating: "4.9 ⭐ (3.2k reviews)",
    },
    {
      id: 202,
      name: "Jollof Rice",
      image: "/src/assets/friedrice1.png",
      description:
        "Flavorful rice cooked in a rich tomato sauce, served with your choice of chicken, beef, or fish. Accompanied by a side of fried plantains.",
      price: "GH₵ 40.00",
      rating: "4.8 ⭐ (2.5k reviews)",
    },
    {
      id: 203,
      name: "Banku and Tilapia",
      image: "/src/assets/bankuandtilapia.png",
      description:
        "Fermented corn and cassava dough cooked to perfection, served with grilled tilapia and spicy pepper sauce.",
      price: "GH₵ 35.00",
      rating: "4.7 ⭐ (1.8k reviews)",
    },
    {
      id: 204,
      name: "Kenkey",
      image: "/src/assets/kenkey.png",
      description:
        "Steamed fermented corn dough served with fried fish and a spicy sauce. A traditional favorite!",
      price: "GH₵ 30.00",
      rating: "4.6 ⭐ (1.2k reviews)",
    },
    {
      id: 205,
      name: "Rice Balls",
      image: "/src/assets/riceballs.png",
      description:
        "Soft rice balls served with a choice of groundnut soup or light soup, perfect for a hearty meal.",
      price: "GH₵ 38.00",
      rating: "4.5 ⭐ (1.0k reviews)",
    },
    {
      id: 206,
      name: "Eba",
      image: "/src/assets/eba.png",
      description:
        "Cassava dough served with a rich egusi or vegetable soup, offering a delightful taste of Ghana.",
      price: "GH₵ 42.00",
      rating: "4.4 ⭐ (900 reviews)",
    },
    {
      id: 207,
      name: "Tuo Zaafi",
      image: "/src/assets/tuozafi.png",
      description:
        "A traditional northern dish made from corn or millet, served with a spicy vegetable soup and your choice of meat.",
      price: "GH₵ 50.00",
      rating: "4.9 ⭐ (1.5k reviews)",
    },
    {
      id: 208,
      name: "Ampesi",
      image: "/src/assets/ampesi.png",
      description:
        "Boiled yam or plantain served with palava sauce, a delicious mix of vegetables and spices.",
      price: "GH₵ 32.00",
      rating: "4.3 ⭐ (800 reviews)",
    },
    {
      id: 209,
      name: "Gari Fortor",
      image: "/src/assets/garifortor.png",
      description:
        "A savory dish made from gari (grated cassava) mixed with a spicy tomato sauce and served with fish or meat.",
      price: "GH₵ 36.00",
      rating: "4.6 ⭐ (1.1k reviews)",
    },
    {
      id: 210,
      name: "Ampesi with Groundnut Soup",
      image: "/src/assets/ampesiandgroundnut.png",
      description:
        "Boiled yam or plantain served with a rich groundnut soup, a comforting and filling meal.",
      price: "GH₵ 37.00",
      rating: "4.5 ⭐ (950 reviews)",
    },
  ],

  // Dessert And Beverages
  dessertsAndBeverages: [
    {
      id: 301,
      name: "Sobolo",
      image: "/src/assets/sobolo.jpg",
      description:
        "Refreshing hibiscus drink with ginger and natural spices. Served chilled with optional lime garnish.",
      price: "GH₵ 15.00",
      rating: "4.8 ⭐ (2.1k reviews)",
    },
    {
      id: 302,
      name: "Kelewele",
      image: "/src/assets/kelewele.jpg",
      description:
        "Spicy fried plantain cubes seasoned with ginger, cayenne pepper, and salt. Perfect evening snack!",
      price: "GH₵ 20.00",
      rating: "4.7 ⭐ (1.8k reviews)",
    },
    {
      id: 303,
      name: "Bofrot (Puff Puff)",
      image: "/src/assets/bofrot.png",
      description:
        "Golden brown deep-fried dough balls, lightly sweetened and perfect with your favorite beverage.",
      price: "GH₵ 18.00",
      rating: "4.6 ⭐ (2.3k reviews)",
    },
    {
      id: 304,
      name: "Asaana",
      image: "/src/assets/asaana.jpg",
      description:
        "Traditional fermented corn drink with caramelized sugar and a hint of ginger. Refreshingly authentic!",
      price: "GH₵ 12.00",
      rating: "4.5 ⭐ (1.5k reviews)",
    },
    {
      id: 305,
      name: "Coconut Candy",
      image: "/src/assets/coconutcandy.jpg",
      description:
        "Sweet and chewy coconut treats made with fresh coconut, sugar, and a touch of vanilla.",
      price: "GH₵ 10.00",
      rating: "4.4 ⭐ (900 reviews)",
    },
    {
      id: 306,
      name: "Fan Ice Cream",
      image: "/src/assets/fanice.jpg",
      description:
        "Creamy vanilla ice cream in various flavors - vanilla, strawberry, and chocolate. A local favorite!",
      price: "GH₵ 8.00",
      rating: "4.7 ⭐ (3.1k reviews)",
    },
    {
      id: 307,
      name: "Kaklo",
      image: "/src/assets/kaklo.jpg",
      description:
        "Sweet plantain fritters made from overripe plantains, flour, and spices. Crispy outside, soft inside!",
      price: "GH₵ 22.00",
      rating: "4.6 ⭐ (1.7k reviews)",
    },
    {
      id: 308,
      name: "Brukina",
      image: "/src/assets/brukina.jpg",
      description:
        "Nutritious millet-based drink sweetened with sugar and enhanced with milk and groundnuts.",
      price: "GH₵ 14.00",
      rating: "4.3 ⭐ (1.2k reviews)",
    },
    {
      id: 309,
      name: "Nkate Cake",
      image: "/src/assets/nkatecake.jpg",
      description:
        "Crunchy peanut brittle made with roasted peanuts and caramelized sugar. A sweet traditional treat!",
      price: "GH₵ 16.00",
      rating: "4.5 ⭐ (1.4k reviews)",
    },
    {
      id: 310,
      name: "Fresh Fruit Salad",
      image: "/src/assets/fruitsalad.jpg",
      description:
        "Mix of fresh tropical fruits including pineapple, watermelon, pawpaw, and mango with optional cream.",
      price: "GH₵ 25.00",
      rating: "4.8 ⭐ (2.5k reviews)",
    },
  ],

  // Appetizers
  appetizers: [
    {
      id: 401,
      name: "Spring Rolls",
      image: "/src/assets/springrolls.jpg",
      description: "Crispy vegetable spring rolls filled with cabbage, carrots, and spices. Served with sweet chili sauce.",
      price: "GH₵ 25.00",
      rating: "4.6 ⭐ (1.5k reviews)",
    },
    {
      id: 402,
      name: "Meat Pie",
      image: "/src/assets/meatpie.jpg",
      description: "Flaky golden pastry filled with seasoned minced meat, potatoes, and vegetables. Baked to perfection!",
      price: "GH₵ 18.00",
      rating: "4.5 ⭐ (1.2k reviews)",
    },
    {
      id: 403,
      name: "Samosa",
      image: "/src/assets/samosa.jpg",
      description: "Triangular fried pastry with savory filling of spiced potatoes, peas, and optional minced meat.",
      price: "GH₵ 20.00",
      rating: "4.7 ⭐ (1.8k reviews)",
    },
    {
      id: 404,
      name: "Chicken Wings",
      image: "/src/assets/chickenwings.jpg",
      description: "Crispy fried chicken wings marinated in special spices. Choose from BBQ, spicy, or honey glazed.",
      price: "GH₵ 35.00",
      rating: "4.8 ⭐ (2.7k reviews)",
    },
    {
      id: 405,
      name: "Kebab",
      image: "/src/assets/kebab.jpg",
      description: "Grilled meat skewers (beef, chicken, or goat) marinated in suya spice blend. Served with sliced onions.",
      price: "GH₵ 30.00",
      rating: "4.6 ⭐ (2.1k reviews)",
    },
    {
      id: 406,
      name: "Fish Rolls",
      image: "/src/assets/fishrolls.jpg",
      description: "Crispy pastry rolls filled with seasoned fish, vegetables, and special herbs. A seafood lover's delight!",
      price: "GH₵ 22.00",
      rating: "4.4 ⭐ (950 reviews)",
    },
    {
      id: 407,
      name: "Gizzard Pepper Soup",
      image: "/src/assets/gizzardsoup.jpg",
      description: "Spicy and aromatic soup with tender chicken gizzards, perfect as a starter or light meal.",
      price: "GH₵ 28.00",
      rating: "4.5 ⭐ (1.3k reviews)",
    },
    {
      id: 408,
      name: "Scotch Eggs",
      image: "/src/assets/scotcheggs.jpg",
      description: "Hard-boiled eggs wrapped in seasoned sausage meat, coated with breadcrumbs and deep-fried.",
      price: "GH₵ 24.00",
      rating: "4.3 ⭐ (800 reviews)",
    },
    {
      id: 409,
      name: "Plantain Chips",
      image: "/src/assets/plantainchips.jpg",
      description: "Thinly sliced and crispy fried plantain chips, lightly salted or spiced. Perfect for snacking!",
      price: "GH₵ 15.00",
      rating: "4.6 ⭐ (1.9k reviews)",
    },
    {
      id: 410,
      name: "Chicken Satay",
      image: "/src/assets/chickensatay.jpg",
      description: "Grilled chicken skewers marinated in coconut milk and spices, served with peanut sauce.",
      price: "GH₵ 32.00",
      rating: "4.7 ⭐ (1.6k reviews)",
    },
  ]
};

// Intersection Observer for scroll animations
class ScrollAnimator {
  constructor() {
    this.initObserver();
    this.animateOnScroll();
  }

  initObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
  }

  animateOnScroll() {
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('scroll-animate');
      this.observer.observe(section);
    });

    // Observe individual cards as they load
    const observeCards = () => {
      document.querySelectorAll('.food-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
      });
    };

    // Call when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeCards);
    } else {
      observeCards();
    }
  }
}

//FoodCardDisplayManager
class FoodCardDisplayManager {
  constructor(containerId, dishes, moreBtnId, lessBtnId, initialCount = 4) {
    this.container = document.getElementById(containerId);
    this.dishes = dishes;
    this.viewMoreBtn = document.getElementById(moreBtnId);
    this.viewLessBtn = document.getElementById(lessBtnId);
    this.initialCount = initialCount;
    this.displayCount = initialCount;

    this.render();
    this.setupControls();
  }

  createCard(dish, index) {
    const card = document.createElement("div");
    card.className = "food-card";
    card.style.animationDelay = `${index * 0.05}s`;
    
    card.innerHTML = `
      <div class="food-header">
            <div class="image-and-btns">
                    <img src="${dish.image}" loading="lazy" alt="${dish.name}"/>
                    <div class="food-actions">
                        <button class="details-btn" data-id="${dish.id}">Details</button>
                        <button class="add-cart-btn" data-id="${dish.id}">
                            <iconify-icon icon="qlementine-icons:add-to-cart-16"></iconify-icon>
                        </button>
                    </div>
            </div>
            <div class="food-meta">
                    <h4 class="food-name">${dish.name}</h4>
                    <div class="food-details">
                        <span class="price">${dish.price}</span>
                        <span class="rating">${dish.rating}</span>
                    </div>
            </div>
      </div>
      <p class="food-description" id="desc-${dish.id}" style="display:none;">
        ${dish.description}
      </p>
    `;

    const detailsBtn = card.querySelector(".details-btn");
    const description = card.querySelector(`#desc-${dish.id}`);
    
    detailsBtn.addEventListener("click", () => {
      if (description.style.display === "none") {
        description.style.display = "block";
        description.classList.add('show');
      } else {
        description.classList.remove('show');
        setTimeout(() => {
          description.style.display = "none";
        }, 400);
      }
    });

    // Add to cart animation
    const addCartBtn = card.querySelector(".add-cart-btn");
    addCartBtn.addEventListener("click", function() {
      this.style.transform = "scale(1.2)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 300);
      
      //"added to cart" notification
      this.innerHTML = '<iconify-icon icon="mdi:check"></iconify-icon>';
      setTimeout(() => {
        this.innerHTML = '<iconify-icon icon="qlementine-icons:add-to-cart-16"></iconify-icon>';
      }, 1000);
    });

    return card;
  }

  render() {
    // Fade out effect before changing content
    this.container.style.opacity = '0';
    
    setTimeout(() => {
      this.container.innerHTML = "";
      this.dishes.slice(0, this.displayCount).forEach((dish, index) => {
        const card = this.createCard(dish, index);
        this.container.appendChild(card);
      });

      // Fade in effect
      this.container.style.opacity = '1';
      this.container.style.transition = 'opacity 0.3s ease';

      // Toggle buttons
      this.viewMoreBtn.style.display =
        this.displayCount < this.dishes.length ? "inline-block" : "none";
      this.viewLessBtn.style.display =
        this.displayCount > this.initialCount ? "inline-block" : "none";
    }, 300);
  }

  setupControls() {
    this.viewMoreBtn.addEventListener("click", () => {
      this.displayCount += 6;
      if (this.displayCount > this.dishes.length) {
        this.displayCount = this.dishes.length;
      }
      this.render();
      
      // Smooth scroll to new cards
      setTimeout(() => {
        const cards = this.container.querySelectorAll('.food-card');
        if (cards.length > 6) {
          cards[cards.length - 6].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 400);
    });

    this.viewLessBtn.addEventListener("click", () => {
      this.displayCount = this.initialCount;
      this.render();
      
      // Scroll back to top of section
      this.container.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    });
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  new ScrollAnimator();
  
  const sections = [
    {
      data: menuData.mainDishes,
      containerId: "menu-container",
      viewMoreBtnId: "view-more-btn",
      viewLessBtnId: "view-less-btn",
      initialCount: 6,
    },
    {
      data: menuData.dessertsAndBeverages,
      containerId: "dessert-container",
      viewMoreBtnId: "dessert-view-more-btn",
      viewLessBtnId: "dessert-view-less-btn",
      initialCount: 6,
    },
    {
      data: menuData.appetizers,
      containerId: "appetizer-container",
      viewMoreBtnId: "appetizer-view-more-btn",
      viewLessBtnId: "appetizer-view-less-btn",
      initialCount: 6,
    },
  ];
  
  sections.forEach((section) => {
    new FoodCardDisplayManager(
      section.containerId,
      section.data,
      section.viewMoreBtnId,
      section.viewLessBtnId,
      section.initialCount
    );
  });
});