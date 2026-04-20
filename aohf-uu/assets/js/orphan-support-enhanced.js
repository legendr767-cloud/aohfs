// Enhanced Orphan & Widow Support Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FORCE LOAD HERO BACKGROUND IMAGE
    forceLoadHeroImage();
    
    // Initialize all enhancements
    initScrollAnimations();
    initCounterAnimations();
    initHoverEffects();
    initSmoothScrolling();
    initLoadingAnimations();
});

// Force load hero background image
function forceLoadHeroImage() {
    const heroSection = document.querySelector('.orphan-header');
    if (heroSection) {
        // Try multiple image paths
        const imagePaths = [
            'pictures/orphan-widow.jpg',
            './pictures/orphan-widow.jpg',
            '/pictures/orphan-widow.jpg',
            'pictures/orphan and widow.jpg'
        ];
        
        // Test each image path
        imagePaths.forEach((path, index) => {
            const img = new Image();
            img.onload = function() {
                console.log(`Image loaded successfully: ${path}`);
                // Apply the working image path
                heroSection.style.backgroundImage = `url('${path}')`;
                heroSection.style.backgroundSize = 'cover';
                heroSection.style.backgroundPosition = 'center';
                heroSection.style.backgroundRepeat = 'no-repeat';
                
                // Add overlay if not exists
                if (!heroSection.querySelector('.hero-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.className = 'hero-overlay';
                    overlay.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(rgba(156,39,176,0.8), rgba(233,30,99,0.7)); z-index: 1;';
                    heroSection.insertBefore(overlay, heroSection.firstChild);
                }
            };
            img.onerror = function() {
                console.log(`Failed to load image: ${path}`);
            };
            img.src = path;
        });
        
        // Fallback: Set a solid background color if image fails
        setTimeout(() => {
            if (!heroSection.style.backgroundImage || heroSection.style.backgroundImage === 'none') {
                heroSection.style.backgroundColor = '#9c27b0';
                console.log('Using fallback background color');
            }
        }, 2000);
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Trigger counter animation for stats
                if (entry.target.classList.contains('stat-item') || 
                    entry.target.classList.contains('support-stats')) {
                    animateCounters(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.program-card-3d, .story-card, .stat-item, .benefit-item, .action-card, .plan-card');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Counter animations for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/[^\d]/g, ''));
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const increment = number / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        // Format based on original text
        if (text.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (text.includes('+')) {
            if (number >= 1000) {
                element.textContent = (Math.floor(current / 100) / 10).toFixed(1) + 'K+';
            } else {
                element.textContent = Math.floor(current).toLocaleString() + '+';
            }
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

function animateCounters(container) {
    const numbers = container.querySelectorAll('[style*="font-size: 2.5rem"]');
    numbers.forEach(number => {
        const text = number.textContent;
        const value = parseInt(text.replace(/[^\d]/g, ''));
        
        if (isNaN(value)) return;
        
        let current = 0;
        const increment = value / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                current = value;
                clearInterval(timer);
            }
            
            if (text.includes('%')) {
                number.textContent = Math.floor(current) + '%';
            } else if (text.includes('+')) {
                if (value >= 1000) {
                    number.textContent = (Math.floor(current / 100) / 10).toFixed(1) + 'K+';
                } else {
                    number.textContent = Math.floor(current) + '+';
                }
            } else {
                number.textContent = Math.floor(current).toLocaleString();
            }
        }, 20);
    });
}

// Enhanced hover effects
function initHoverEffects() {
    // Program cards hover effects
    const programCards = document.querySelectorAll('.program-card-3d');
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            
            // Add ripple effect
            createRippleEffect(this, event);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Story cards hover effects
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.plan-btn, .btn-primary-3d, .btn-secondary-3d');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
    });
}

// Create ripple effect
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

// Smooth scrolling for anchor links
function initSmoothScrolling() {
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
}

// Loading animations
function initLoadingAnimations() {
    // Add loading animation to page elements
    const elements = document.querySelectorAll('.section-title, .program-card-3d, .story-card, .plan-card');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.orphan-header');
    
    if (heroSection) {
        const speed = 0.5;
        heroSection.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .program-card-3d, .story-card, .plan-card, .action-card {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Form validation for donation/sponsorship
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e53e3e';
                    input.style.boxShadow = '0 0 5px rgba(229, 62, 62, 0.3)';
                } else {
                    input.style.borderColor = '#e2e8f0';
                    input.style.boxShadow = 'none';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
}

// Initialize form validation
initFormValidation();

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Add keyboard navigation for cards
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('program-card-3d') || 
            focusedElement.classList.contains('story-card')) {
            focusedElement.click();
        }
    }
});

// Add focus styles for accessibility
const focusableElements = document.querySelectorAll('.program-card-3d, .story-card, .plan-card');
focusableElements.forEach(element => {
    element.setAttribute('tabindex', '0');
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #e91e63';
        this.style.outlineOffset = '2px';
    });
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Performance optimization - lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();
