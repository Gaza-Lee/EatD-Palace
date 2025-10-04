(function () {
  if (!document.querySelector('link[href="/Pages/aboutUs/aboutUs.css"]')) {
    const menuStyles = document.createElement("link");
    menuStyles.rel = "stylesheet";
    menuStyles.href = "/Pages/aboutUs/aboutUs.css";
    document.head.appendChild(menuStyles);
  }
})();

// Star rating functionality
const stars = document.querySelectorAll('.stars .star');
let selectedRating = 0;

stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    selectedRating = index + 1;
    updateStars(selectedRating);
  });

  star.addEventListener('mouseenter', () => {
    updateStars(index + 1);
  });
});

// Reset stars on mouse leave
document.querySelector('.stars').addEventListener('mouseleave', () => {
  updateStars(selectedRating);
});

function updateStars(rating) {
  stars.forEach((star, index) => {
    if (index < rating) {
      star.setAttribute('icon', 'ant-design:star-filled');
      star.style.color = '#FFD700';
    } else {
      star.setAttribute('icon', 'ant-design:star-outlined');
      star.style.color = '#ccc';
    }
  });
}

// Submit review functionality
const submitBtn = document.querySelector('.review input[type="submit"]');
const nameInput = document.querySelector('.review input[type="text"]');
const reviewTextarea = document.querySelector('.review textarea');
const testimonialsContainer = document.querySelector('.testimonials-container');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Validate inputs
  const name = nameInput.value.trim();
  const reviewText = reviewTextarea.value.trim();
  
  if (!name) {
    showMessage('Please enter your name', 'error');
    nameInput.focus();
    return;
  }
  
  if (!reviewText || reviewText.length < 10) {
    showMessage('Please write a review (minimum 10 characters)', 'error');
    reviewTextarea.focus();
    return;
  }
  
  if (selectedRating === 0) {
    showMessage('Please select a star rating', 'error');
    return;
  }
  
  // Create new review
  addNewReview(name, reviewText, selectedRating);
  
  // Clear form
  clearForm();
  
  // Show success message
  showMessage('Thank you for your review!', 'success');
});

function addNewReview(name, reviewText, rating) {
  const newComment = document.createElement('section');
  newComment.className = 'comment new-comment';
  
  const starsHTML = '⭐'.repeat(rating);
  
  newComment.innerHTML = `
    <div class="comment-text">
      <div style="margin-right: 0.5rem" class="profile-info">
        <p>${name}</p>
        <p>${starsHTML}</p>
      </div>
      <p>${reviewText}</p>
    </div>
    <section class="profile">
      <img src="/src/assets/default-avatar.png" alt="${name}" 
           onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRTBFMEUwIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzUiIHI9IjE4IiBmaWxsPSIjQTBBMEEwIi8+CjxwYXRoIGQ9Ik0yMCA3NUMyMCA2NSAzMCA1NSA1MCA1NUM3MCA1NSA4MCA2NSA4MCA3NVY5MEgyMFY3NVoiIGZpbGw9IiNBMEEwQTAiLz4KPC9zdmc+'" />
    </section>
  `;
  
  // Add to the beginning of testimonials
  testimonialsContainer.insertBefore(newComment, testimonialsContainer.firstChild);
  
  // Scroll to the beginning to show new review
  testimonialsContainer.scrollTo({
    left: 0,
    behavior: 'smooth'
  });
  
  // Animate the new comment
  setTimeout(() => {
    newComment.classList.remove('new-comment');
  }, 10);
  
  // Update arrows visibility
  updateArrows();
}

function clearForm() {
  nameInput.value = '';
  reviewTextarea.value = '';
  selectedRating = 0;
  updateStars(0);
  
  // Clear character counter
  const counter = document.querySelector('.char-counter');
  if (counter) {
    counter.textContent = '0/300';
    counter.style.color = '#ccc';
  }
}

function showMessage(message, type) {
  // Remove existing message if any
  const existingMessage = document.querySelector('.message-popup');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message-popup ${type}`;
  messageDiv.textContent = message;
  
  document.body.appendChild(messageDiv);
  
  // Animate in
  setTimeout(() => {
    messageDiv.classList.add('show');
  }, 10);
  
  // Remove after 8 seconds
  setTimeout(() => {
    messageDiv.classList.remove('show');
    setTimeout(() => {
      messageDiv.remove();
    }, 300);
  }, 8000);
}

// Character counter for textarea
reviewTextarea.addEventListener('input', function() {
  const maxLength = 300;
  const currentLength = this.value.length;
  
  // Create or update character counter
  let counter = document.querySelector('.char-counter');
  if (!counter) {
    counter = document.createElement('span');
    counter.className = 'char-counter';
    this.parentElement.appendChild(counter);
  }
  
  counter.textContent = `${currentLength}/${maxLength}`;
  
  if (currentLength > maxLength) {
    this.value = this.value.substring(0, maxLength);
    counter.style.color = '#ff6b6b';
  } else if (currentLength > maxLength * 0.8) {
    counter.style.color = '#ffa500';
  } else {
    counter.style.color = '#ccc';
  }
});

// Global variable for arrow update function
let updateArrows;

// Create and add scroll arrows
function addScrollArrows() {
  const testimonialsSection = document.querySelector('.testimonials-section');
  const container = document.querySelector('.testimonials-container');
  
  // Check if arrows already exist
  if (document.querySelector('.scroll-arrow')) {
    return;
  }
  
  // Create left arrow
  const leftArrow = document.createElement('button');
  leftArrow.className = 'scroll-arrow left';
  leftArrow.innerHTML = '←';
  leftArrow.style.display = 'none'; // Hidden initially
  
  // Create right arrow
  const rightArrow = document.createElement('button');
  rightArrow.className = 'scroll-arrow right';
  rightArrow.innerHTML = '→';
  
  // Insert arrows
  testimonialsSection.appendChild(leftArrow);
  testimonialsSection.appendChild(rightArrow);
  
  // Scroll functionality
  const scrollAmount = 640; // Adjust scroll distance
  
  leftArrow.addEventListener('click', () => {
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });
  
  rightArrow.addEventListener('click', () => {
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
  
  // Show/hide arrows based on scroll position
  updateArrows = function() {
    const maxScroll = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;
    
    leftArrow.style.display = currentScroll > 0 ? 'flex' : 'none';
    rightArrow.style.display = currentScroll < maxScroll - 1 ? 'flex' : 'none';
  }
  
  container.addEventListener('scroll', updateArrows);
  
  // Initial check
  setTimeout(updateArrows, 100);
  
  // Update when new review is added
  const observer = new MutationObserver(updateArrows);
  observer.observe(container, { childList: true });
}

// DOM initialization
document.addEventListener('DOMContentLoaded', () => {
  addScrollArrows();
});