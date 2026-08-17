document.addEventListener('DOMContentLoaded', () => {

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
          navLinks.classList.toggle('active');
          menuToggle.classList.toggle('active');
      });
      // Close menu when a link is clicked
      document.querySelectorAll('.nav-links a').forEach(link => {
          link.addEventListener('click', () => {
              navLinks.classList.remove('active');
              menuToggle.classList.remove('active');
          });
      });
  }

  // --- Background Animations (From Old Portfolio) ---

  // Generate Stars
  function generateStars() {
      const starsContainer = document.getElementById('stars');
      const numberOfStars = 200;
      for (let i = 0; i < numberOfStars; i++) {
          const star = document.createElement('div');
          star.className = 'star';
          star.style.left = Math.random() * 100 + '%';
          star.style.top = Math.random() * 100 + '%';
          star.style.width = (Math.random() * 2 + 1) + 'px';
          star.style.height = star.style.width;
          star.style.animationDelay = Math.random() * 5 + 's';
          starsContainer.appendChild(star);
      }
  }

  // Generate Meteors
  function generateMeteor() {
      const meteorsContainer = document.getElementById('meteors');
      const meteor = document.createElement('div');
      meteor.className = 'meteor';
      meteor.style.left = Math.random() * 100 + '%';
      meteor.style.top = '-10%';
      meteorsContainer.appendChild(meteor);
      setTimeout(() => { meteor.remove(); }, 2000);
  }

  // Animate Planets on Canvas
  function animatePlanets() {
      const canvas = document.getElementById('planetsCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      
      function resizeCanvas() {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
      }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      let angle = 0;
      const planets = [
          { x: 200, y: 150, radius: 40, color: '#00e5ff', orbitRadius: 60, speed: 0.01 }, // Cyan
          { x: canvas.width - 200, y: 300, radius: 30, color: '#3b82f6', orbitRadius: 50, speed: 0.015 }, // Blue
          { x: 150, y: canvas.height - 200, radius: 35, color: '#ffaa00', orbitRadius: 45, speed: 0.012 } // Amber
      ];
      
      function animate() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          planets.forEach(planet => {
              const x = planet.x + Math.cos(angle * planet.speed) * planet.orbitRadius;
              const y = planet.y + Math.sin(angle * planet.speed) * planet.orbitRadius;
              
              const gradient = ctx.createRadialGradient(x, y, 0, x, y, planet.radius * 1.5);
              gradient.addColorStop(0, planet.color);
              gradient.addColorStop(0.5, planet.color + '80');
              gradient.addColorStop(1, 'transparent');
              
              ctx.fillStyle = gradient;
              ctx.beginPath();
              ctx.arc(x, y, planet.radius * 1.5, 0, Math.PI * 2);
              ctx.fill();
              
              ctx.fillStyle = planet.color;
              ctx.beginPath();
              ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
              ctx.fill();
          });
          
          angle += 0.01;
          requestAnimationFrame(animate);
      }
      animate();
  }

  // Initialize Background
  generateStars();
  animatePlanets();
  setInterval(generateMeteor, 3000);

  // Parallax Effect on Scroll
  window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const canvas = document.getElementById('planetsCanvas');
      if(canvas) canvas.style.transform = `translateY(${scrollY * 0.3}px)`;
      
      const stars = document.querySelectorAll('.star');
      stars.forEach((star, index) => {
          const speed = (index % 3 + 1) * 0.1;
          star.style.transform = `translateY(${scrollY * speed}px)`;
      });
  });

  // --- Anime.js Animations ---

  // Initial Hero Animation
  anime.timeline({ easing: 'easeOutExpo' })
  .add({
      targets: '.navbar',
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: 200
  })
  .add({
      targets: '.image-glow',
      scale: [0.5, 1],
      opacity: [0, 0.6],
      duration: 800
  }, '-=600')
  .add({
      targets: '.profile-img',
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 800
  }, '-=800')
  .add({
      targets: '.hero-badge',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
  }, '-=600')
  .add({
      targets: '.hero-title',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1000,
  }, '-=600')
  .add({
      targets: '.hero-subtitle',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
  }, '-=400')
  .add({
      targets: '.hero-actions .btn',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(150),
      duration: 800,
  }, '-=600');

  // Scroll Reveal Animations using Intersection Observer
  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const target = entry.target;
              
              if (target.classList.contains('section-title')) {
                  anime({
                      targets: target,
                      opacity: [0, 1],
                      translateX: [-30, 0],
                      duration: 1000,
                      easing: 'easeOutExpo'
                  });
              }
              
              if (target.classList.contains('card-glass') || target.classList.contains('skill-category') || target.classList.contains('cert-card')) {
                  anime({
                      targets: target,
                      opacity: [0, 1],
                      translateY: [40, 0],
                      duration: 1000,
                      delay: target.dataset.delay ? parseInt(target.dataset.delay) : 0,
                      easing: 'easeOutExpo'
                  });
              }

              observer.unobserve(target);
          }
      });
  }, observerOptions);

  document.querySelectorAll('.section-title').forEach(el => {
      el.style.opacity = 0;
      observer.observe(el);
  });

  const grids = document.querySelectorAll('.expertise-grid, .projects-grid, .certifications-grid, .about-grid, .skills-container, .about-stats');
  grids.forEach(grid => {
      const cards = grid.querySelectorAll('.card-glass, .skill-category, .cert-card');
      cards.forEach((card, index) => {
          card.style.opacity = 0;
          card.dataset.delay = index * 80;
          observer.observe(card);
      });
  });

  const contactBox = document.querySelector('.contact-box');
  if(contactBox) {
      contactBox.style.opacity = 0;
      observer.observe(contactBox);
  }

  // View More Logic for Projects & Certifications
  function setupViewMore(itemsSelector, btnId, defaultCount, btnTextMore, btnTextLess) {
      const items = document.querySelectorAll(itemsSelector);
      const btn = document.getElementById(btnId);
      if(!btn || items.length <= defaultCount) {
          if(btn) btn.style.display = 'none';
          return;
      }
      
      let expanded = false;
      
      // Hide initially
      items.forEach((item, idx) => {
          if(idx >= defaultCount) item.classList.add('hidden-card');
      });
      
      btn.addEventListener('click', () => {
          expanded = !expanded;
          items.forEach((item, idx) => {
              if(idx >= defaultCount) {
                  if(expanded) {
                      item.classList.remove('hidden-card');
                      // Reset opacity to allow observer to animate again if needed, or just let them show
                      if(item.style.opacity === "0") {
                          // Observer will catch it if it's still observing
                      }
                  } else {
                      item.classList.add('hidden-card');
                  }
              }
          });
          btn.innerText = expanded ? btnTextLess : btnTextMore;
      });
  }

  setupViewMore('.project-card', 'btn-more-projects', 3, 'View More Projects', 'View Less Projects');
  setupViewMore('.cert-card', 'btn-more-certs', 3, 'View More Certifications', 'View Less Certifications');


  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetEl = document.querySelector(this.getAttribute('href'));
          if(targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth' });
          }
      });
  });
});
