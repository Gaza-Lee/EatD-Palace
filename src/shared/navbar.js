export function Navbar() {
  const section = document.createElement("section");
  section.id = "nav-bar";

  section.innerHTML = `
    <!--Logo and name-->
    <section>
      <img src="/src/assets/logo1.png" alt="EatD Palace Logo">
      <p>EatD Palace</p>
    </section>

    <nav>
      <ul>
        <li>
          <iconify-icon icon="guidance:home-2"></iconify-icon>
          Home
        </li>
        <li>Menu</li>
        <li>About us</li>
        <li>Reservation</li>
      </ul>
    </nav>

    <!--Essentials-->
    <section>
      <search>
        <input type="search" name="search-for-items-in-menu" placeholder="Search...">
        <button class="nav-buttons">
          <iconify-icon icon="akar-icons:search"></iconify-icon>
        </button>
      </search>
      <button class="nav-buttons">
        <iconify-icon icon="et:profile-male"></iconify-icon>
      </button>
      <button class="nav-buttons">
        <iconify-icon icon="uil:cart"></iconify-icon>
      </button>
    </section>
  `;

  return section;
}
