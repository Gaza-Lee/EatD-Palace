(function () {
  if (
    !document.querySelector('link[href="/Pages/reservation/reservation.css"]')
  ) {
    const reservationStyles = document.createElement("link");
    reservationStyles.rel = "stylesheet";
    reservationStyles.href = "/Pages/reservation/reservation.css";
    document.head.appendChild(reservationStyles);
  }
})();

class TableReservation {
  constructor() {
    this.pickButtons = document.querySelectorAll(".location button");
    this.modal = document.getElementById("table-modal");
    this.closeBtn = document.querySelector(".close-btn");
    this.confirmBtn = document.getElementById("confirm-table");
    this.tableLayoutContainer = document.querySelector(".table-layout");

    this.selectedTable = null;
    this.currentLocation = null;

    // Different layouts for each restaurant
    this.layouts = {
      "The Baesement": {
        rows: 3,
        cols: 5,
        layout: [
          ["L", "R", "T", "R", "L"],
          ["R", "S", "E", "S", "R"],
          ["L", "R", "T", "R", "L"],
        ],
      },
      "The Open Hearth": {
        rows: 4,
        cols: 4,
        layout: [
          ["R", "T", "R", "R"],
          ["R", "T", "R", "R"],
          ["R", "T", "T", "R"],
          ["R", "R", "R", "R"],
        ],
      },
      "The Top HeeVen": {
        rows: 3,
        cols: 3,
        layout: [
          ["R", "T", "R"],
          ["R", "T", "R"],
          ["R", "T", "R"],
        ],
      },
    };

    this.initEvents();
  }

  initEvents() {
    this.pickButtons.forEach((btn) => {
      btn.addEventListener("click", () => this.openModal(btn));
    });

    this.closeBtn.addEventListener("click", () => this.closeModal());
    this.confirmBtn.addEventListener("click", () => this.confirmSelection());
  }

  openModal(button) {
    this.currentLocation = button.parentElement.querySelector("h3").textContent;
    this.modal.classList.remove("hidden");
    this.renderLayout();
  }

  closeModal() {
    this.modal.classList.add("hidden");
    this.selectedTable = null;
    this.tableLayoutContainer.innerHTML = ""; // Clear old layout
  }

  renderLayout() {
    const locationLayout = this.layouts[this.currentLocation];
    if (!locationLayout) return;

    this.tableLayoutContainer.innerHTML = ""; // Reset layout
    this.tableLayoutContainer.style.display = "grid";
    this.tableLayoutContainer.style.gridTemplateColumns = `repeat(${locationLayout.cols}, 100px)`;
    this.tableLayoutContainer.style.gap = "1.5rem";

    let tableCounter = 1;

    locationLayout.layout.forEach((row) => {
      row.forEach((cell) => {
        if (cell === "E") {
          const empty = document.createElement("div");
          empty.classList.add("empty-slot");
          this.tableLayoutContainer.appendChild(empty);
          return;
        }

        const table = document.createElement("div");
        table.classList.add("table");
        table.dataset.table = `${this.currentLocation}-${tableCounter}`;

        if (cell === "R") {
          table.classList.add("round");
          table.innerHTML = `
            <div class="chair top"></div>
            <div class="chair right"></div>
            <div class="chair bottom"></div>
            <div class="chair left"></div>`;
        } else if (cell === "T") {
          table.classList.add("rect");
          table.innerHTML = `
            <div class="chair-bar top">
              <div class="chair-segment"></div>
              <div class="chair-segment"></div>
              <div class="chair-segment"></div>
            </div>
            <div class="chair-bar bottom">
              <div class="chair-segment"></div>
              <div class="chair-segment"></div>
              <div class="chair-segment"></div>
            </div>`;
        } else if (cell === "S") {
          table.classList.add("round", "two-chair");
          table.innerHTML = `
            <div class="chair top"></div>
            <div class="chair bottom"></div>`;
        } else if (cell === "L") {
          table.classList.add("round", "tw-chair");
          table.innerHTML = `
                <div class="chair right"></div>
                <div class="chair left"></div>`;
        }

        this.tableLayoutContainer.appendChild(table);
        tableCounter++;

        // Add click handler
        table.addEventListener("click", () => this.selectTable(table));
      });
    });
  }

  selectTable(table) {
    const allTables = this.tableLayoutContainer.querySelectorAll(".table");
    allTables.forEach((t) => t.classList.remove("selected"));
    table.classList.add("selected");
    this.selectedTable = table.dataset.table;
  }

  confirmSelection() {
    if (this.selectedTable) {
      // Hide the table layout and button
      this.tableLayoutContainer.classList.add("hidden");
      this.confirmBtn.classList.add("hidden");

      // Create or show confirmation animation
      const confirmationContainer = document.querySelector(
        ".confirmation-container"
      );
      confirmationContainer.classList.remove("hidden");

      // Play tick animation for 1.5s
      setTimeout(() => {
        confirmationContainer.classList.add("hidden");
        this.showReservationForm();
      }, 1800);

      console.log(`You reserved ${this.selectedTable}`);
    } else {
      alert("Please select a table first!");
    }
  }

  showReservationForm() {
    let formOverlay = document.querySelector(".form-overlay");
    if (document.querySelector(".form-overlay")) return;
    if (!formOverlay) {
      formOverlay = document.createElement("div");
      formOverlay.className = "form-overlay";
      formOverlay.innerHTML = `
        <form id="reservation-form" class="form-fade">
          <span class="close-btn">&times;</span>
          <h4>Last Step! <br/> Let's grab your details to reserve your table</h4>
          <div class="input-wrapper">
              <input type="text" id="name" placeholder="Full Name" required />
          </div>
          <div class="input-wrapper">
              <input type="tel" id="phone" placeholder="Phone Number" required />
          </div>
          <div class="input-wrapper">
              <input type="email" id="email" placeholder="Email Address" required />
          </div>
          <button type="submit">Confirm Reservation</button>
        </form>
    `;
      document.body.appendChild(formOverlay);
    } else {
      formOverlay.classList.remove("hidden");
    }

    // Attach event to the close button (same style as modal)
    const closeFormBtn = formOverlay.querySelector(".close-btn");
    closeFormBtn.addEventListener("click", () => {
      formOverlay.classList.add("fade-out");
      setTimeout(() => {
        formOverlay.remove();
        this.selectTable = null;
        this.currentLocation = null;
        this.closeModal();
        location.reload();
      }, 500);
    });

    const form = formOverlay.querySelector("#reservation-form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector("#name").value.trim();
      const phone = form.querySelector("#phone").value.trim();
      const email = form.querySelector("#email").value.trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^\+?[0-9\s\-()]{7,15}$/;
      const namePattern = /^[a-zA-Z\s'-]{2,}$/;

      let errors = [];

      if (!namePattern.test(name)) {
        errors.push(
          "Please enter a valid name (at least 2 characters, letters, spaces, apostrophes, and hyphens only)."
        );
      }
      if (!phonePattern.test(phone)) {
        errors.push(
          "Please enter a valid phone number (7-15 digits, can include +, spaces, dashes, and parentheses)."
        );
      }
      if (!emailPattern.test(email)) {
        errors.push("Please enter a valid email address.");
      }

      if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
      }

      const confirmationContainer = document.querySelector(
        ".confirmation-container"
      );
      confirmationContainer.classList.remove("hidden");
      confirmationContainer.innerHTML = `
    <div class="tick-animation"></div>
    <p>Reservation confirmed for ${name} at ${this.selectedTable}!</p>
  `;

      formOverlay.classList.add("fade-out");
      setTimeout(() => {
        confirmationContainer.classList.add("hidden");
        formOverlay.remove();
        location.reload();
      }, 5000);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => new TableReservation());
