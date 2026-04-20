// Enhanced Education Programs Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FORCE LOAD HERO BACKGROUND IMAGE
    forceLoadEducationHeroImage();
    
    // FORCE SHOW EDUCATION STATISTICS
    forceShowEducationStats();
    
    // Initialize all enhancements
    initScrollAnimations();
    initCounterAnimations();
    initHoverEffects();
    initEducationEffects();
    initSmoothScrolling();
    initLoadingAnimations();
});

// Force show education statistics
function forceShowEducationStats() {
    // Force visibility of education stats section
    const statsSection = document.querySelector('.education-stats-3d');
    if (statsSection) {
        statsSection.style.display = 'grid';
        statsSection.style.gridTemplateColumns = 'repeat(3, 1fr)';
        statsSection.style.gap = '25px';
        statsSection.style.visibility = 'visible';
        statsSection.style.opacity = '1';
        
        // Force visibility of each stat card
        const statCards = document.querySelectorAll('.education-stat-card-3d');
        statCards.forEach(card => {
            card.style.display = 'block';
            card.style.visibility = 'visible';
            card.style.opacity = '1';
            card.style.height = '150px';
            
            // Force inner elements
            const inner = card.querySelector('.education-stat-inner-3d');
            if (inner) {
                inner.style.display = 'block';
                inner.style.visibility = 'visible';
                inner.style.opacity = '1';
                inner.style.background = 'white';
                inner.style.padding = '20px';
                inner.style.borderRadius = '15px';
                inner.style.textAlign = 'center';
            }
            
            // Force stat numbers and labels
            const number = card.querySelector('.education-stat-number-3d');
            const label = card.querySelector('.education-stat-label-3d');
            const icon = card.querySelector('.education-stat-icon-3d');
            
            if (number) {
                number.style.display = 'block';
                number.style.visibility = 'visible';
                number.style.opacity = '1';
                number.style.fontSize = '1.8rem';
                number.style.fontWeight = '800';
                number.style.color = '#ffc107';
                number.style.marginBottom = '8px';
            }
            
            if (label) {
                label.style.display = 'block';
                label.style.visibility = 'visible';
                label.style.opacity = '1';
                label.style.color = '#6b7280';
                label.style.fontWeight = '600';
            }
            
            if (icon) {
                icon.style.display = 'flex';
                icon.style.visibility = 'visible';
                icon.style.opacity = '1';
                icon.style.width = '50px';
                icon.style.height = '50px';
                icon.style.background = 'linear-gradient(135deg, #ffc107, #ff8f00)';
                icon.style.borderRadius = '50%';
                icon.style.alignItems = 'center';
                icon.style.justifyContent = 'center';
                icon.style.margin = '0 auto 15px';
                
                const iconElement = icon.querySelector('i');
                if (iconElement) {
                    iconElement.style.color = 'white';
                    iconElement.style.fontSize = '1.2rem';
                }
            }
        });
    }
    
    // Force visibility of visual card
    const visualCard = document.querySelector('.visual-card-3d');
    if (visualCard) {
        visualCard.style.display = 'block';
        visualCard.style.visibility = 'visible';
        visualCard.style.opacity = '1';
        visualCard.style.background = 'white';
        visualCard.style.padding = '30px';
        visualCard.style.borderRadius = '20px';
        
        const placeholder = visualCard.querySelector('.placeholder-image');
        if (placeholder) {
            placeholder.style.display = 'block';
            placeholder.style.visibility = 'visible';
            placeholder.style.opacity = '1';
            placeholder.style.background = 'linear-gradient(135deg, #ffc107, #ff8f00)';
            placeholder.style.color = 'white';
            placeholder.style.padding = '60px';
            placeholder.style.borderRadius = '15px';
            placeholder.style.textAlign = 'center';
            
            const placeholderIcon = placeholder.querySelector('i');
            const placeholderText = placeholder.querySelector('p');
            
            if (placeholderIcon) {
                placeholderIcon.style.display = 'block';
                placeholderIcon.style.visibility = 'visible';
                placeholderIcon.style.opacity = '1';
                placeholderIcon.style.color = 'white';
                placeholderIcon.style.fontSize = '4rem';
                placeholderIcon.style.marginBottom = '20px';
            }
            
            if (placeholderText) {
                placeholderText.style.display = 'block';
                placeholderText.style.visibility = 'visible';
                placeholderText.style.opacity = '1';
                placeholderText.style.color = 'white';
                placeholderText.style.fontSize = '1.1rem';
                placeholderText.style.fontWeight = '600';
                placeholderText.style.margin = '0';
            }
        }
    }
    
    console.log('Education statistics forced to be visible');
}

// Force load education hero background image
function forceLoadEducationHeroImage() {
    const heroSection = document.querySelector('.education-header');
    if (heroSection) {
        // Try multiple image paths
        const imagePaths = [
            'pictures/education.jpg',
            './pictures/education.jpg',
            '/pictures/education.jpg'
        ];
        
        // Test each image path
        imagePaths.forEach((path, index) => {
            const img = new Image();
            img.onload = function() {
                console.log(`Education image loaded successfully: ${path}`);
                // Apply the working image path
                heroSection.style.backgroundImage = `url('${path}')`;
                heroSection.style.backgroundSize = 'cover';
                heroSection.style.backgroundPosition = 'center';
                heroSection.style.backgroundRepeat = 'no-repeat';
                
                // Ensure overlay exists
                if (!heroSection.querySelector('.hero-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.className = 'hero-overlay';
                    overlay.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(rgba(220,53,69,0.8), rgba(255,193,7,0.7)); z-index: 1;';
                    heroSection.insertBefore(overlay, heroSection.firstChild);
                }
            };
            img.onerror = function() {
                console.log(`Failed to load education image: ${path}`);
            };
            img.src = path;
        });
        
        // Fallback: Set a solid background color if image fails
        setTimeout(() => {
            if (!heroSection.style.backgroundImage || heroSection.style.backgroundImage === 'none') {
                heroSection.style.backgroundColor = '#ffc107';
                console.log('Using fallback background color for education');
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
                if (entry.target.classList.contains('education-stat-card-3d') || 
                    entry.target.classList.contains('education-impact')) {
                    animateCounters(entry.target);
                }
                
                // Trigger education-specific animations
                if (entry.target.classList.contains('program-card-3d')) {
                    animateEducationCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.program-card-3d, .story-card, .education-stat-card-3d, .action-card, .visual-card-3d');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Counter animations for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.education-stat-number-3d');
    
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
            
            if (text.includes('+')) {
                if (value >= 1000) {
                    number.textContent = (Math.floor(current / 100) / 10).toFixed(1) + 'K+';
                } else {
                    number.textContent = Math.floor(current) + '+';
                }
            } else if (text.includes('%')) {
                number.textContent = Math.floor(current) + '%';
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
            
            // Add education-specific effects
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.animation = 'iconPulse 0.6s ease-in-out';
            }
            
            // Add book flip effect to education icons
            const bookIcon = this.querySelector('.fa-book, .fa-graduation-cap');
            if (bookIcon) {
                bookIcon.classList.add('book-flip');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.animation = '';
            }
            
            const bookIcon = this.querySelector('.fa-book, .fa-graduation-cap');
            if (bookIcon) {
                bookIcon.classList.remove('book-flip');
            }
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
    const buttons = document.querySelectorAll('.btn-primary-3d, .btn-secondary-3d');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('click', function(e) {
            createEducationRipple(this, e);
        });
    });
}

// Education-specific effects
function initEducationEffects() {
    // Add floating animation to graduation caps
    const graduationIcons = document.querySelectorAll('.fa-graduation-cap');
    graduationIcons.forEach(icon => {
        icon.classList.add('graduation-float');
    });
    
    // Add sparkle effect to education stats
    const educationStats = document.querySelectorAll('.education-impact > div');
    educationStats.forEach((stat, index) => {
        setTimeout(() => {
            stat.style.animation = 'educationSparkle 3s ease-in-out infinite';
            stat.style.animationDelay = `${index * 0.5}s`;
        }, 1000);
    });
    
    // Add bouncing effect to education icons
    const educationIcons = document.querySelectorAll('.placeholder-image i, .education-stat-icon-3d i');
    educationIcons.forEach(icon => {
        icon.style.animation = 'iconBounce 3s ease-in-out infinite';
    });
    
    // Add highlight effect to section tags
    const sectionTags = document.querySelectorAll('.section-tag');
    sectionTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.classList.add('education-highlight');
        });
        
        tag.addEventListener('mouseleave', function() {
            this.classList.remove('education-highlight');
        });
    });
}

// Education card animation
function animateEducationCard(card) {
    const icon = card.querySelector('.card-icon');
    const features = card.querySelectorAll('.feature');
    
    if (icon) {
        icon.style.animation = 'iconPulse 1s ease-in-out';
    }
    
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateX(-20px)';
            feature.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                feature.style.opacity = '1';
                feature.style.transform = 'translateX(0)';
            }, 100);
        }, index * 100);
    });
}

// Create education-themed ripple effect
function createEducationRipple(element, event) {
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
        background: radial-gradient(circle, rgba(255,193,7,0.4) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: educationRipple 0.6s linear;
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
    const elements = document.querySelectorAll('.section-title, .program-card-3d, .story-card, .education-stat-card-3d');
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

// Education progress tracker
function initEducationProgress() {
    // Simulate education progress for demonstration
    const progressElements = document.querySelectorAll('.education-stat-number-3d');
    
    progressElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #ffc107, #ff8f00)';
            this.style.webkitBackgroundClip = 'text';
            this.style.webkitTextFillColor = 'transparent';
            this.style.transform = 'scale(1.1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.education-header');
    
    if (heroSection) {
        const speed = 0.5;
        heroSection.style.transform = `translateY(${scrolled * speed}px)`;
    }
    
    // Update education stats on scroll
    const educationStats = document.querySelectorAll('.education-impact > div');
    educationStats.forEach((stat, index) => {
        const rect = stat.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            stat.style.animationDelay = `${index * 0.2}s`;
        }
    });
});

// Add CSS for education animations
const style = document.createElement('style');
style.textContent = `
    @keyframes educationRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes iconPulse {
        0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 8px 25px rgba(255, 193, 7, 0.3);
        }
        50% { 
            transform: scale(1.1); 
            box-shadow: 0 12px 35px rgba(255, 193, 7, 0.4);
        }
    }
    
    .program-card-3d, .story-card, .action-card {
        position: relative;
        overflow: hidden;
    }
    
    .education-highlight {
        animation: educationHighlight 1s ease-in-out infinite alternate !important;
    }
    
    .book-flip {
        animation: bookFlip 1s ease-in-out !important;
    }
    
    .graduation-float {
        animation: graduationFloat 4s ease-in-out infinite !important;
    }
`;
document.head.appendChild(style);

// Form validation for education applications
function initEducationFormValidation() {
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
                    input.style.borderColor = '#ffc107';
                    input.style.boxShadow = '0 0 5px rgba(255, 193, 7, 0.3)';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields for the education application.');
            }
        });
    });
}

// Initialize education form validation
initEducationFormValidation();

// Initialize education progress tracker
initEducationProgress();

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
const focusableElements = document.querySelectorAll('.program-card-3d, .story-card, .action-card');
focusableElements.forEach(element => {
    element.setAttribute('tabindex', '0');
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #ffc107';
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

// Education achievement tracker
function initAchievementTracker() {
    const achievementElements = document.querySelectorAll('.story-name');
    
    achievementElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.color = '#ffc107';
            this.style.transform = 'scale(1.05)';
            this.style.fontWeight = 'bold';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.transform = 'scale(1)';
            this.style.fontWeight = '';
        });
    });
}

// Initialize achievement tracker
initAchievementTracker();

// Education notification system
function initEducationNotifications() {
    // Show education tip after 10 seconds
    setTimeout(() => {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #ffc107, #ff8f00);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(255, 193, 7, 0.3);
                z-index: 1000;
                max-width: 300px;
                animation: slideInRight 0.5s ease;
            ">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-graduation-cap"></i>
                    <div>
                        <strong>Education Tip</strong><br>
                        <small>Every child deserves quality education. Your support makes a difference!</small>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" style="
                        background: none;
                        border: none;
                        color: white;
                        cursor: pointer;
                        font-size: 1.2rem;
                    ">&times;</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 8000);
    }, 10000);
}

// Initialize education notifications
initEducationNotifications();

// Add slide-in animation
const slideStyle = document.createElement('style');
slideStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(slideStyle);
