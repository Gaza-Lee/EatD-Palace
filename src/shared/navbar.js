export function Navbar() {
  const section = document.createElement("section");
  section.id = "nav-bar";

  section.innerHTML = `
    <!--Logo and name-->
    <section class="name-and-logo">
      <img src="/src/assets/logo1.png" alt="EatD Palace Logo">
      <p>EatD Palace</p>
    </section>

    <nav>
      <ul>
        <li>
          <a href="/pages/home/home.html">
            <iconify-icon icon="guidance:home-2"></iconify-icon>
             <span>Home</span>
          </a>
        </li>
        <li>
          <a href="/pages/menu/menu.html">
            <iconify-icon icon="fluent:food-16-regular"></iconify-icon>
            <span>Menu</span>
          </a>
        </li>
        <li>
          <a href="/pages/aboutUs/aboutUs.html">
            <iconify-icon icon="cil:info"></iconify-icon>
             <span>About us</span>
          </a>
        </li>
        <li>
          <a href="/pages/reservation/reservation.html">
            <iconify-icon icon="fluent-mdl2:reservation-orders"></iconify-icon>
             <span>Reservation</span>
          </a>
        </li>
      </ul>
    </nav>

    <!--Essentials-->
    <section class="essentials">
      <search>
        <input type="search" name="search-for-items-in-menu" placeholder="Search...">
        <button class="search nav-buttons">
          <iconify-icon icon="akar-icons:search"></iconify-icon>
        </button>
      </search>
      <button class="acc nav-buttons">
        <iconify-icon icon="et:profile-male"></iconify-icon>
      </button>
      <button class="acc nav-buttons">
        <iconify-icon icon="uil:cart"></iconify-icon>
      </button>
    </section>
  `;

  // Active path
  const currentPath = window.location.pathname;
  const navLinks = section.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  return section;
}