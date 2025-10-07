export function Footer() {
  const section = document.createElement("section");
  section.id = "footer";

  section.innerHTML = `
    <div class="footer-content content-container">
      
      <!-- About / Logo -->
      <div class="footer-about">
        <div class="logo-and-name">
          <div class="logo-container">
            <img src="/src/assets/logo1.png" alt="EatD Palace Logo">
          </div>
          <p>EatD Palace</p>
        </div>
        <p class="short-description">
          The best place to enjoy delicious meals with family and friends.
          We offer a variety of cuisines to satisfy your cravings.
          The perfect spot for any occasion!
        </p>

        <!-- Social Links -->
        <div class="footer-essentials">
          <iconify-icon icon="lucide:instagram" width="24" height="24"></iconify-icon>
          <iconify-icon icon="line-md:twitter-x" width="24" height="24"></iconify-icon>
          <iconify-icon icon="bi:facebook" width="24" height="24"></iconify-icon>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="footer-links">
        <h2>Quick Links</h2>
        <a href="/pages/home/home.html">Home</a>
        <a href="/pages/menu/menu.html">Menu</a>
        <a href="/pages/aboutUs/aboutUs.html">About Us</a>
        <a href="/pages/reservation/reservation.html">Reservation</a>
      </div>

      <!-- Newsletter -->
      <div class="newsletter">
        <h2>Newsletter</h2>
        <p>Subscribe to our newsletter for the latest updates and offers!</p>
        <form id="newsletter-form">
          <input type="email" id="newsletter-email" placeholder="Enter your email" required>
          <button type="submit">Subscribe</button>
        </form>
        <p class="newsletter-success hidden">Thank you for subscribing!</p>
      </div>

      <!-- Contact Info -->
      <div class="contact-info">
        <h2>Contact Us</h2>
        <p>
        <iconify-icon icon="ic:round-location-on"></iconify-icon> 
        <span class="contact-text">
            123 Fun dev St, FunCity, FunHeavenLand
        </span>
        </p>
        <p><iconify-icon icon="ic:round-phone"></iconify-icon>
        <span class="contact-text">
            +1 (234) 567-890</p>
        </span>
        <p><iconify-icon icon="ic:round-email"></iconify-icon> 
        <span class="contact-text">
          <a href="mailto:eatdpalace@gmail.com">eatdpalace@gmail.com</a>
        </span>
        </p>
      </div>

    </div>

    <hr>
    <p class="copyright">&copy; ${new Date().getFullYear()} EatD Palace. All rights reserved.</p>
  `;

  // Newsletter form handler
  const newsletterForm = section.querySelector("#newsletter-form");
  const successMsg = section.querySelector(".newsletter-success");

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = section.querySelector("#newsletter-email");
    const email = emailInput.value.trim();
    if (email) {
      successMsg.classList.remove("hidden");
      newsletterForm.reset();
      setTimeout(() => {
        successMsg.classList.add("hidden");
      }, 3000);
    }
  });

  return section;
}
