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
          <iconify-icon icon="guidance:home-2"></iconify-icon>
          Home
        </li>
        <li>
            <iconify-icon icon="fluent:food-16-regular"></iconify-icon>
            Menu
        </li>
        <li>
            <iconify-icon icon="cil:info"></iconify-icon>
            About us
        </li>
        <li>
            <iconify-icon icon="fluent-mdl2:reservation-orders"></iconify-icon>
            Reservation
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

  return section;
}
