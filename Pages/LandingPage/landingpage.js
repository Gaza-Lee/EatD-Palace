(function(){
    if (!document.querySelector('link[href="/Pages/LandingPage/landingpage.css"]')){
        const landingpageStyle = document.createElement("link");
        landingpageStyle.rel = "stylesheet";
        landingpageStyle.href = "/Pages/LandingPage/landingpage.css";
        document.head.appendChild(landingpageStyle);
    }
})();

//Background Images
(function () {
  const images = [
    "../../src/assets/bgimg1.jpg",
    "../../src/assets/bgimg2.jpg",
    "../../src/assets/bgimg3.jpg",
    "../../src/assets/bgimg4.jpg"
  ];

  let index = 0;
  const bg1 = document.getElementById("bg1");
  const bg2 = document.getElementById("bg2");
  let showingBg1 = true;

  function changeBackground() {
    const nextImage = images[index];
    if (showingBg1) {
      bg2.style.backgroundImage = `url(${nextImage})`;
      bg2.classList.add("active");
      bg1.classList.remove("active");
    } else {
      bg1.style.backgroundImage = `url(${nextImage})`;
      bg1.classList.add("active");
      bg2.classList.remove("active");
    }
    showingBg1 = !showingBg1;
    index = (index + 1) % images.length;
  }

  // initial load
  bg1.style.backgroundImage = `url(${images[index]})`;
  bg1.classList.add("active");
  index++;

  setInterval(changeBackground, 8000);
})();


//Carousel view of foods
(function(){
    const images = [
        "/src/assets/friedrice1.png",
        "/src/assets/wakye1.png",
        "/src/assets/bankuandtilapia1.png",
        "/src/assets/friedrice3.png",
        "/src/assets/fufu2.jpg",
        "/src/assets/friedrice2.png"
    ];

    const container = document.querySelector(".carousel-container");
    let currentIndex = 0;

    // Create img elements for each image
    images.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Slide ${i + 1}`;
        container.appendChild(img);
    });

    const imgElements = container.querySelectorAll('img');

    function updateCarousel() {
        const total = images.length;
        
        imgElements.forEach((img, i) => {
            img.classList.remove('active', 'prev', 'next');
            
            if (i === currentIndex) {
                img.classList.add('active');
            } else if (i === (currentIndex - 1 + total) % total) {
                img.classList.add('prev');
            } else if (i === (currentIndex + 1) % total) {
                img.classList.add('next');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    }

    // Initialize
    updateCarousel();

    // Auto-rotate
    setInterval(nextSlide, 6000);
})();



(function() {
    const testimonials = document.querySelectorAll('.comment');
    let currentIndex = 0;
    
    function rotateTestimonials() {
        const current = testimonials[currentIndex];
        const next = testimonials[(currentIndex + 1) % testimonials.length];
        
        // Start exit animation
        current.classList.add('exit');
        current.classList.remove('active');

        
        setTimeout(() => {
            current.classList.remove('exit');
            next.classList.add('active');
        }, 500);
        
        currentIndex = (currentIndex + 1) % testimonials.length;
    }
    
    // Initialize
    testimonials[0].classList.add('active');
    
    // Rotate every 5 seconds
    setInterval(rotateTestimonials, 8000);
})();