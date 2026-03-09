console.log('Eagle Innovia website loaded');

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active'); // You might want to animate the hamburger itself
    });
}

// Close mobile menu when a link is clicked
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if(hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe section headers and cards
document.querySelectorAll('.section-header, .service-card, .about-text, .platform-item, .contact-info').forEach(el => {
    el.style.opacity = '0'; // Initial state
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Add the class for the animation via JS to keep CSS clean(er) or rely on the style set above
// Actually, let's just use the class trigger
document.head.insertAdjacentHTML("beforeend", `<style>
.fade-in-up {
    opacity: 1 !important;
    transform: translateY(0) !important;
}
</style>`)
