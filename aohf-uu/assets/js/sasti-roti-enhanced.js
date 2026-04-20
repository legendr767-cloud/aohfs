// Enhanced Sasti Roti Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all enhancements
    initPageLoader();
    initScrollProgress();
    initCounterAnimations();
    initTypingEffects();
    initScrollAnimations();
    initHoverEffects();
    initParticleEffects();
});

// Page Loader
function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    
    // Hide loader after page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000); // Show loader for at least 1 second
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Counter Animation for Statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.sasti-stat-number-3d[data-count]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number based on the original text
        const originalText = element.textContent;
        if (originalText.includes('K')) {
            element.textContent = Math.floor(current / 1000) + 'K+';
        } else if (originalText.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else {
            element.textContent = Math.floor(current).toLocaleString() + '+';
        }
    }, 16);
}

// Typing Effect for Titles
function initTypingEffects() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startTypingAnimation(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    typingElements.forEach(element => {
        // Store original text and clear element
        element.setAttribute('data-original-text', element.textContent);
        element.textContent = '';
        observer.observe(element);
    });
}

function startTypingAnimation(element) {
    const text = element.getAttribute('data-original-text');
    let index = 0;
    
    const typeTimer = setInterval(() => {
        element.textContent = text.slice(0, index + 1);
        index++;
        
        if (index >= text.length) {
            clearInterval(typeTimer);
            // Remove typing cursor after animation
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }, 100);
}

// Enhanced Scroll Animations
function initScrollAnimations() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Reveal animations for sections
    const revealElements = document.querySelectorAll('.sasti-feature-item-3d, .sasti-stat-card-3d, .sasti-step-item-3d');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        revealObserver.observe(element);
    });
}

// Enhanced Hover Effects
function initHoverEffects() {
    // Feature cards hover effects
    const featureCards = document.querySelectorAll('.sasti-feature-item-3d');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(139, 43, 139, 0.2)';
            
            // Add ripple effect
            createRippleEffect(this, event);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.sasti-btn-3d, .sasti-cta-btn-3d');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 15px 30px rgba(139, 43, 139, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
    });
}

// Create ripple effect on click/hover
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Particle Effects
function initParticleEffects() {
    // Create floating particles for hero section
    const heroSection = document.querySelector('.sasti-hero-3d');
    if (heroSection) {
        createFloatingParticles(heroSection, 15);
    }
    
    // Create particles for CTA section
    const ctaSection = document.querySelector('.sasti-cta-3d');
    if (ctaSection) {
        createFloatingParticles(ctaSection, 10);
    }
}

function createFloatingParticles(container, count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        const icons = ['fas fa-heart', 'fas fa-star', 'fas fa-sparkles', 'fas fa-leaf'];
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        
        particle.innerHTML = `<i class="${randomIcon}"></i>`;
        
        particle.style.cssText = `
            position: absolute;
            color: rgba(139, 43, 139, 0.3);
            font-size: ${Math.random() * 10 + 10}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s infinite linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        container.appendChild(particle);
    }
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .floating-particle {
        will-change: transform, opacity;
    }
`;
document.head.appendChild(particleStyle);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.sasti-hero-content-3d > *');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});
