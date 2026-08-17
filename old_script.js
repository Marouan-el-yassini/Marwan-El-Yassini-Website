// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
});

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
    
    setTimeout(() => {
        meteor.remove();
    }, 2000);
}

// Animate Planets on Canvas
function animatePlanets() {
    const canvas = document.getElementById('planetsCanvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    let angle = 0;
    
    const planets = [
        { x: 200, y: 150, radius: 40, color: '#8b5cf6', orbitRadius: 60, speed: 0.01 },
        { x: canvas.width - 200, y: 300, radius: 30, color: '#3b82f6', orbitRadius: 50, speed: 0.015 },
        { x: 150, y: canvas.height - 200, radius: 35, color: '#ec4899', orbitRadius: 45, speed: 0.012 }
    ];
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        planets.forEach(planet => {
            const x = planet.x + Math.cos(angle * planet.speed) * planet.orbitRadius;
            const y = planet.y + Math.sin(angle * planet.speed) * planet.orbitRadius;
            
            // Planet glow
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, planet.radius * 1.5);
            gradient.addColorStop(0, planet.color);
            gradient.addColorStop(0.5, planet.color + '80');
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, planet.radius * 1.5, 0, Math.PI * 2);
            ctx.fill();
            
            // Planet body
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

// Parallax Effect on Scroll
let scrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    const canvas = document.getElementById('planetsCanvas');
    canvas.style.transform = `translateY(${scrollY * 0.3}px)`;
    
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        const speed = (index % 3 + 1) * 0.1;
        star.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#cv' && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe certification cards
document.querySelectorAll('.cert-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    generateStars();
    animatePlanets();
    
    // Generate meteors periodically
    setInterval(generateMeteor, 3000);
    
    // Add scroll effect to header
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
    const isLight = document.body.classList.contains('light-theme');
    if (window.scrollY > 100) {
        header.style.background = isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(10, 14, 26, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'transparent'; 
        header.style.boxShadow = 'none';
    }
});
});
