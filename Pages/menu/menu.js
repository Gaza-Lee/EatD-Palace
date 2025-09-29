(function () {
  if (!document.querySelector('link[href="/Pages/menu/menu.css"]')) {
    const menuStyles = document.createElement("link");
    menuStyles.rel = "stylesheet";
    menuStyles.href = "/Pages/menu/menu.css";
    document.head.appendChild(menuStyles);
  }
})();

//Food Menu
const mainDishes = [
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
];

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

  createCard(dish) {
    const card = document.createElement("div");
    card.className = "food-card";
    card.innerHTML = `
      <div class="food-header">
            <div class="image-and-btns">
                    <img src="${dish.image}"/>
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
    detailsBtn.addEventListener("click", () => {
      const desc = card.querySelector(`#desc-${dish.id}`);
      desc.style.display = desc.style.display === "none" ? "block" : "none";
    });
    return card;
  }

  render() {
    this.container.innerHTML = "";
    this.dishes.slice(0, this.displayCount).forEach((dish) => {
      const card = this.createCard(dish);
      this.container.appendChild(card);
    });

    // Toggle buttons
    this.viewMoreBtn.style.display =
      this.displayCount < this.dishes.length ? "inline-block" : "none";
    this.viewLessBtn.style.display =
      this.displayCount > this.initialCount ? "inline-block" : "none";
  }

  setupControls() {
    this.viewMoreBtn.addEventListener("click", () => {
      this.displayCount += 6;
      if (this.displayCount > this.dishes.length) {
        this.displayCount = this.dishes.length;
      }
      this.render();
    });

    this.viewLessBtn.addEventListener("click", () => {
      this.displayCount = this.initialCount;
      this.render();
    });
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  new FoodCardDisplayManager(
    "menu-container", mainDishes, "view-more-btn","view-less-btn", 6);
});
