// Enhanced Emergency Relief Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all enhancements
    initScrollAnimations();
    initCounterAnimations();
    initHoverEffects();
    initEmergencyEffects();
    initTimelineAnimations();
    initSmoothScrolling();
    initLoadingAnimations();
});

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
                    entry.target.classList.contains('emergency-stats')) {
                    animateCounters(entry.target);
                }
                
                // Trigger timeline animations
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.service-card-3d, .operation-card, .stat-item, .timeline-item, .action-card, .visual-card-3d');
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
        if (text.includes('K+')) {
            element.textContent = (Math.floor(current / 100) / 10).toFixed(1) + 'K+';
        } else if (text.includes('hrs')) {
            element.textContent = Math.floor(current) + 'hrs';
        } else if (text.includes('+')) {
            element.textContent = Math.floor(current).toLocaleString() + '+';
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
            
            if (text.includes('K+')) {
                number.textContent = (Math.floor(current / 100) / 10).toFixed(1) + 'K+';
            } else if (text.includes('hrs')) {
                number.textContent = Math.floor(current) + 'hrs';
            } else if (text.includes('+')) {
                number.textContent = Math.floor(current) + '+';
            } else {
                number.textContent = Math.floor(current).toLocaleString();
            }
        }, 20);
    });
}

// Enhanced hover effects
function initHoverEffects() {
    // Service cards hover effects
    const serviceCards = document.querySelectorAll('.service-card-3d');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            
            // Add emergency pulse effect
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.animation = 'emergencyPulse 0.5s ease-in-out';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });
    
    // Operation cards hover effects
    const operationCards = document.querySelectorAll('.operation-card');
    operationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary-3d, .btn-secondary-3d');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('click', function(e) {
            createEmergencyRipple(this, e);
        });
    });
}

// Emergency-specific effects
function initEmergencyEffects() {
    // Add emergency alert animation to critical elements
    const emergencyElements = document.querySelectorAll('.emergency-card, .operation-type.conflict');
    emergencyElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('emergency-alert');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('emergency-alert');
        });
    });
    
    // Add pulsing effect to emergency stats
    const emergencyStats = document.querySelectorAll('.emergency-stats > div');
    emergencyStats.forEach((stat, index) => {
        setTimeout(() => {
            stat.style.animation = 'emergencyGlow 3s ease-in-out infinite';
            stat.style.animationDelay = `${index * 0.5}s`;
        }, 1000);
    });
    
    // Add floating effect to emergency icons
    const emergencyIcons = document.querySelectorAll('.placeholder-image i, .emergency-icon i');
    emergencyIcons.forEach(icon => {
        icon.style.animation = 'iconFloat 3s ease-in-out infinite';
    });
}

// Timeline animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.3 });
        
        // Set initial state
        item.style.opacity = '0';
        item.style.transition = 'all 0.6s ease';
        
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        
        observer.observe(item);
    });
}

function animateTimelineItem(item) {
    const icon = item.querySelector('.timeline-icon');
    const content = item.querySelector('.timeline-content');
    
    if (icon) {
        icon.style.animation = 'emergencyPulse 1s ease-in-out';
    }
    
    if (content) {
        content.style.animation = 'fadeInUp 0.8s ease forwards';
    }
}

// Create emergency ripple effect
function createEmergencyRipple(element, event) {
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
        background: radial-gradient(circle, rgba(220,53,69,0.4) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: emergencyRipple 0.6s linear;
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
    const elements = document.querySelectorAll('.section-title, .service-card-3d, .operation-card, .timeline-item');
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

// Emergency alert system
function initEmergencyAlerts() {
    // Simulate emergency alert for demonstration
    const alertButton = document.createElement('button');
    alertButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Emergency Alert';
    alertButton.className = 'emergency-alert-btn';
    alertButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #dc3545, #ff6b35);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        z-index: 1000;
        animation: emergencyPulse 2s ease-in-out infinite;
        display: none;
    `;
    
    document.body.appendChild(alertButton);
    
    // Show alert button after 5 seconds (demo)
    setTimeout(() => {
        alertButton.style.display = 'block';
    }, 5000);
    
    alertButton.addEventListener('click', function() {
        alert('Emergency Response Team has been notified!');
        this.style.display = 'none';
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.emergency-header');
    
    if (heroSection) {
        const speed = 0.5;
        heroSection.style.transform = `translateY(${scrolled * speed}px)`;
    }
    
    // Update emergency stats on scroll
    const emergencyStats = document.querySelectorAll('.emergency-stats > div');
    emergencyStats.forEach((stat, index) => {
        const rect = stat.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            stat.style.animationDelay = `${index * 0.2}s`;
        }
    });
});

// Add CSS for emergency animations
const style = document.createElement('style');
style.textContent = `
    @keyframes emergencyRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes emergencyPulse {
        0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 0 10px rgba(220, 53, 69, 0.3);
        }
        50% { 
            transform: scale(1.05); 
            box-shadow: 0 0 20px rgba(220, 53, 69, 0.5);
        }
    }
    
    .service-card-3d, .operation-card, .timeline-item, .action-card {
        position: relative;
        overflow: hidden;
    }
    
    .emergency-alert {
        animation: emergencyAlert 1s ease-in-out infinite alternate !important;
    }
`;
document.head.appendChild(style);

// Form validation for emergency contact
function initEmergencyFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                    input.style.boxShadow = '0 0 5px rgba(220, 53, 69, 0.3)';
                } else {
                    input.style.borderColor = '#28a745';
                    input.style.boxShadow = '0 0 5px rgba(40, 167, 69, 0.3)';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields for emergency contact.');
            }
        });
    });
}

// Initialize emergency form validation
initEmergencyFormValidation();

// Initialize emergency alerts (demo)
initEmergencyAlerts();

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Add keyboard navigation for cards
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('service-card-3d') || 
            focusedElement.classList.contains('operation-card')) {
            focusedElement.click();
        }
    }
});

// Add focus styles for accessibility
const focusableElements = document.querySelectorAll('.service-card-3d, .operation-card, .action-card');
focusableElements.forEach(element => {
    element.setAttribute('tabindex', '0');
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #dc3545';
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

// Emergency response time tracker
function initResponseTimeTracker() {
    const responseElements = document.querySelectorAll('.timeline-time');
    
    responseElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #dc3545, #ff6b35)';
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 4px 15px rgba(220, 53, 69, 0.3)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Initialize response time tracker
initResponseTimeTracker();
