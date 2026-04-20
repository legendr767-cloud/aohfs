// Enhanced Support Our Work Page JavaScript - Stunning 3D Effects

document.addEventListener('DOMContentLoaded', function() {
    // FORCE LOAD HERO BACKGROUND IMAGE
    forceLoadSupportHeroImage();
    
    // FORCE FIX ALL SUPPORT SECTIONS
    forceFixSupportSections();
    
    // Initialize all enhancements
    init3DCardEffects();
    initScrollAnimations();
    initCounterAnimations();
    initHoverEffects();
    initSupportEffects();
    initSmoothScrolling();
    initLoadingAnimations();
    initParallaxEffects();
    initMouseTrackingEffects();
    initImpactCalculator();
    initStoryCarousel();
    initProgressBars();
    initCountUpAnimations();
});

// Force load support hero background image
function forceLoadSupportHeroImage() {
    const heroSection = document.querySelector('.page-header-3d');
    if (heroSection) {
        // Try multiple image paths
        const imagePaths = [
            'pictures/orphan and widow.jpg',
            './pictures/orphan and widow.jpg',
            '/pictures/orphan and widow.jpg'
        ];
        
        // Test each image path
        imagePaths.forEach((path, index) => {
            const img = new Image();
            img.onload = function() {
                console.log(`Support image loaded successfully: ${path}`);
                // Apply the working image path
                heroSection.style.backgroundImage = `url('${path}')`;
                heroSection.style.backgroundSize = 'cover';
                heroSection.style.backgroundPosition = 'center';
                heroSection.style.backgroundRepeat = 'no-repeat';
                
                // Ensure overlay exists
                if (!heroSection.querySelector('::before')) {
                    heroSection.style.position = 'relative';
                    const overlay = document.createElement('div');
                    overlay.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, rgba(220,53,69,0.85), rgba(255,107,53,0.75)); z-index: 1; pointer-events: none;';
                    heroSection.insertBefore(overlay, heroSection.firstChild);
                }
            };
            img.onerror = function() {
                console.log(`Failed to load support image: ${path}`);
            };
            img.src = path;
        });
        
        // Fallback: Set a solid background color if image fails
        setTimeout(() => {
            if (!heroSection.style.backgroundImage || heroSection.style.backgroundImage === 'none') {
                heroSection.style.backgroundColor = '#dc3545';
                console.log('Using fallback background color for support');
            }
        }, 2000);
    }
}

// Force fix all support sections
function forceFixSupportSections() {
    // Fix header z-index issue
    const header = document.querySelector('.header-3d');
    if (header) {
        header.style.zIndex = '9999';
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.left = '0';
        header.style.width = '100%';
        header.style.background = 'white';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
    
    // Fix navbar and donate button
    const nav = document.querySelector('.nav-3d');
    if (nav) {
        nav.style.zIndex = '9999';
    }
    
    const donateBtn = document.querySelector('.btn-donate-3d');
    if (donateBtn) {
        donateBtn.style.zIndex = '10000';
        donateBtn.style.position = 'relative';
    }
    
    const sections = [
        { selector: '.support-options', zIndex: 1 },
        { selector: '.impact-support', zIndex: 1 },
        { selector: '.cta-section', zIndex: 1 }
    ];
    
    sections.forEach(section => {
        const element = document.querySelector(section.selector);
        if (element) {
            element.style.position = 'relative';
            element.style.zIndex = section.zIndex.toString();
            element.style.display = 'block';
            element.style.visibility = 'visible';
            element.style.opacity = '1';
            element.style.paddingTop = '100px';
            element.style.paddingBottom = '100px';
            
            console.log(`Fixed support section: ${section.selector}`);
        }
    });
    
    // Fix support items
    const supportItems = document.querySelectorAll('.support-item');
    supportItems.forEach(item => {
        item.style.display = 'block';
        item.style.visibility = 'visible';
        item.style.opacity = '1';
        item.style.position = 'relative';
    });
    
    // Fix impact items
    const impactItems = document.querySelectorAll('.impact-item');
    impactItems.forEach(item => {
        item.style.display = 'block';
        item.style.visibility = 'visible';
        item.style.opacity = '1';
        item.style.position = 'relative';
    });
    
    console.log('All support sections fixed and visible');
}

// Enhanced 3D Card Effects
function init3DCardEffects() {
    const cards = document.querySelectorAll('.support-card-3d');
    
    cards.forEach(card => {
        let isFlipped = false;
        
        // Add mouse tracking for 3D tilt effect when not flipped
        card.addEventListener('mousemove', function(e) {
            if (isFlipped) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(10px)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            if (!isFlipped) {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            }
        });
        
        // Handle card flip
        card.addEventListener('click', function() {
            isFlipped = !isFlipped;
            if (isFlipped) {
                card.style.transform = 'perspective(1000px) rotateY(180deg)';
            } else {
                card.style.transform = 'perspective(1000px) rotateY(0deg)';
            }
        });
        
        // Add floating animation to icons
        const icon = card.querySelector('.support-icon-3d i');
        if (icon) {
            setInterval(() => {
                icon.style.transform = `translateY(${Math.sin(Date.now() * 0.002) * 5}px)`;
            }, 16);
        }
    });
}

// Enhanced Parallax Effects
function initParallaxEffects() {
    const hero = document.querySelector('.hero-3d');
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Mouse Tracking Effects for Hero
function initMouseTrackingEffects() {
    const hero = document.querySelector('.hero-3d');
    const particles = document.querySelector('.hero-particles');
    const shapes = document.querySelectorAll('.shape');
    
    if (!hero) return;
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const moveX = (x - 0.5) * 50;
        const moveY = (y - 0.5) * 50;
        
        if (particles) {
            particles.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
        
        shapes.forEach((shape, index) => {
            const multiplier = (index + 1) * 0.3;
            shape.style.transform = `translate(${moveX * multiplier}px, ${moveY * multiplier}px)`;
        });
    });
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
                
                // Trigger counter animation for impact amounts
                if (entry.target.classList.contains('impact-item')) {
                    animateImpactAmount(entry.target);
                }
                
                // Trigger support-specific animations
                if (entry.target.classList.contains('support-item')) {
                    animateSupportCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.support-item, .impact-item, .cta-content, .section-header');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Counter animations for impact amounts
function initCounterAnimations() {
    const counters = document.querySelectorAll('.impact-amount');
    
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
        
        // Format with dollar sign
        element.textContent = '$' + Math.floor(current);
    }, 16);
}

function animateImpactAmount(container) {
    const amount = container.querySelector('.impact-amount');
    if (amount) {
        const text = amount.textContent;
        const number = parseInt(text.replace(/[^\d]/g, ''));
        
        if (isNaN(number)) return;
        
        let current = 0;
        const increment = number / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            amount.textContent = '$' + Math.floor(current);
        }, 20);
    }
}

// Enhanced hover effects
function initHoverEffects() {
    // Support items hover effects
    const supportItems = document.querySelectorAll('.support-item');
    supportItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            
            // Add support-specific effects
            const icon = this.querySelector('.support-icon');
            if (icon) {
                icon.style.animation = 'supportPulse 0.6s ease-in-out';
                
                // Add specific animations based on icon type
                const iconElement = icon.querySelector('i');
                if (iconElement) {
                    if (iconElement.classList.contains('fa-heart')) {
                        iconElement.classList.add('heart-beat');
                    } else if (iconElement.classList.contains('fa-hands-helping')) {
                        iconElement.classList.add('hands-helping');
                    } else if (iconElement.classList.contains('fa-handshake')) {
                        iconElement.classList.add('handshake-shake');
                    } else if (iconElement.classList.contains('fa-bullhorn')) {
                        iconElement.classList.add('bullhorn-announce');
                    }
                }
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            
            const icon = this.querySelector('.support-icon');
            if (icon) {
                icon.style.animation = '';
                
                const iconElement = icon.querySelector('i');
                if (iconElement) {
                    iconElement.classList.remove('heart-beat', 'hands-helping', 'handshake-shake', 'bullhorn-announce');
                }
            }
        });
    });
    
    // Impact items hover effects
    const impactItems = document.querySelectorAll('.impact-item');
    impactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.support-btn, .btn-primary-3d, .btn-secondary-3d');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('click', function(e) {
            createSupportRipple(this, e);
        });
    });
}

// Support-specific effects
function initSupportEffects() {
    // Add floating animation to support icons
    const supportIcons = document.querySelectorAll('.support-icon i');
    supportIcons.forEach((icon, index) => {
        setTimeout(() => {
            if (icon.classList.contains('fa-heart')) {
                icon.style.animation = 'heartBeat 3s ease-in-out infinite';
            } else if (icon.classList.contains('fa-hands-helping')) {
                icon.style.animation = 'handsHelping 4s ease-in-out infinite';
            } else if (icon.classList.contains('fa-handshake')) {
                icon.style.animation = 'handshakeShake 5s ease-in-out infinite';
            } else if (icon.classList.contains('fa-bullhorn')) {
                icon.style.animation = 'bullhornAnnounce 3.5s ease-in-out infinite';
            }
        }, index * 500);
    });
    
    // Add sparkle effect to impact amounts
    const impactAmounts = document.querySelectorAll('.impact-amount');
    impactAmounts.forEach((amount, index) => {
        setTimeout(() => {
            amount.style.animation = 'supportPulse 4s ease-in-out infinite';
            amount.style.animationDelay = `${index * 0.5}s`;
        }, 1000);
    });
    
    // Add highlight effect to section headers
    const sectionHeaders = document.querySelectorAll('.section-header h2');
    sectionHeaders.forEach(header => {
        header.addEventListener('mouseenter', function() {
            this.classList.add('support-highlight');
        });
        
        header.addEventListener('mouseleave', function() {
            this.classList.remove('support-highlight');
        });
    });
}

// Support card animation
function animateSupportCard(card) {
    const icon = card.querySelector('.support-icon');
    const title = card.querySelector('h3');
    const description = card.querySelector('p');
    const button = card.querySelector('.support-btn');
    
    if (icon) {
        icon.style.animation = 'supportPulse 1s ease-in-out';
    }
    
    // Animate elements sequentially
    const elements = [title, description, button];
    elements.forEach((element, index) => {
        if (element) {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
            }, index * 100);
        }
    });
}

// Create support-themed ripple effect
function createSupportRipple(element, event) {
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
        animation: supportRipple 0.6s linear;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Enhanced smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header-3d').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add highlight effect to target section
                target.style.animation = 'sectionHighlight 2s ease-in-out';
                setTimeout(() => {
                    target.style.animation = '';
                }, 2000);
            }
        });
    });
}

// Add section highlight animation
const highlightStyle = document.createElement('style');
highlightStyle.textContent = `
    @keyframes sectionHighlight {
        0% { background-color: transparent; }
        50% { background-color: rgba(220, 53, 69, 0.1); }
        100% { background-color: transparent; }
    }
`;
document.head.appendChild(highlightStyle);

// Loading animations
function initLoadingAnimations() {
    // Add loading animation to page elements
    const elements = document.querySelectorAll('.section-header, .support-item, .impact-item, .cta-content');
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

// Support progress tracker
function initSupportProgress() {
    // Simulate support progress for demonstration
    const progressElements = document.querySelectorAll('.impact-amount');
    
    progressElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #dc3545, #ff6b35)';
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
    const heroSection = document.querySelector('.page-header-3d');
    
    if (heroSection) {
        const speed = 0.5;
        heroSection.style.transform = `translateY(${scrolled * speed}px)`;
    }
    
    // Update support items on scroll
    const supportItems = document.querySelectorAll('.support-item');
    supportItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            item.style.animationDelay = `${index * 0.2}s`;
        }
    });
});

// Add CSS for support animations
const style = document.createElement('style');
style.textContent = `
    @keyframes supportRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes supportPulse {
        0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 8px 25px rgba(220, 53, 69, 0.3);
        }
        50% { 
            transform: scale(1.1); 
            box-shadow: 0 12px 35px rgba(220, 53, 69, 0.4);
        }
    }
    
    .support-item, .impact-item, .cta-content {
        position: relative;
        overflow: hidden;
    }
    
    .support-highlight {
        animation: supportHighlight 1s ease-in-out infinite alternate !important;
    }
    
    .heart-beat {
        animation: heartBeat 1.5s ease-in-out infinite !important;
    }
    
    .hands-helping {
        animation: handsHelping 2s ease-in-out infinite !important;
    }
    
    .handshake-shake {
        animation: handshakeShake 2s ease-in-out infinite !important;
    }
    
    .bullhorn-announce {
        animation: bullhornAnnounce 2s ease-in-out infinite !important;
    }
`;
document.head.appendChild(style);

// Form validation for support applications
function initSupportFormValidation() {
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
                    input.style.borderColor = '#dc3545';
                    input.style.boxShadow = '0 0 5px rgba(220, 53, 69, 0.3)';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields for the support application.');
            }
        });
    });
}

// Initialize support form validation
initSupportFormValidation();

// Initialize support progress tracker
initSupportProgress();

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Add keyboard navigation for cards
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('support-item') || 
            focusedElement.classList.contains('impact-item')) {
            focusedElement.click();
        }
    }
});

// Add focus styles for accessibility
const focusableElements = document.querySelectorAll('.support-item, .impact-item, .support-btn, .btn-primary-3d, .btn-secondary-3d');
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

// Support notification system
function initSupportNotifications() {
    // Show support tip after 10 seconds
    setTimeout(() => {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #dc3545, #ff6b35);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(220, 53, 69, 0.3);
                z-index: 1000;
                max-width: 300px;
                animation: slideInRight 0.5s ease;
            ">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-heart"></i>
                    <div>
                        <strong>Support Tip</strong><br>
                        <small>Every contribution, no matter the size, makes a real difference in someone's life!</small>
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

// Initialize support notifications
initSupportNotifications();

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

// Impact Calculator Functionality
function initImpactCalculator() {
    const slider = document.getElementById('donationAmount');
    const displayAmount = document.getElementById('displayAmount');
    const waterImpact = document.querySelector('#waterImpact .result-number');
    const foodImpact = document.querySelector('#foodImpact .result-number');
    const educationImpact = document.querySelector('#educationImpact .result-number');
    
    if (!slider) return;
    
    function updateImpact(amount) {
        displayAmount.textContent = amount;
        
        // Calculate impact based on donation amount
        const waterFamilies = Math.floor(amount / 50);
        const childrenFed = Math.floor(amount / 10);
        const studentsSupplied = Math.floor(amount / 25);
        
        if (waterImpact) waterImpact.textContent = waterFamilies;
        if (foodImpact) foodImpact.textContent = childrenFed;
        if (educationImpact) educationImpact.textContent = studentsSupplied;
        
        // Add animation to updated numbers
        [waterImpact, foodImpact, educationImpact].forEach(element => {
            if (element) {
                element.style.animation = 'none';
                element.offsetHeight; // Trigger reflow
                element.style.animation = 'numberPulse 0.6s ease-in-out';
            }
        });
    }
    
    slider.addEventListener('input', (e) => {
        updateImpact(e.target.value);
    });
    
    // Initialize with default value
    updateImpact(slider.value);
}

// Story Carousel Functionality
let currentStoryIndex = 0;
const stories = document.querySelectorAll('.story-card');

function initStoryCarousel() {
    if (stories.length === 0) return;
    
    // Auto-advance carousel
    setInterval(() => {
        changeStory(1);
    }, 5000);
}

function changeStory(direction) {
    if (stories.length === 0) return;
    
    stories[currentStoryIndex].classList.remove('active');
    
    currentStoryIndex += direction;
    if (currentStoryIndex >= stories.length) currentStoryIndex = 0;
    if (currentStoryIndex < 0) currentStoryIndex = stories.length - 1;
    
    stories[currentStoryIndex].classList.add('active');
    updateDots();
}

function currentStory(index) {
    if (stories.length === 0) return;
    
    stories[currentStoryIndex].classList.remove('active');
    currentStoryIndex = index - 1;
    stories[currentStoryIndex].classList.add('active');
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentStoryIndex);
    });
}

// Progress Bars Animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetProgress = progressBar.getAttribute('data-progress');
                
                setTimeout(() => {
                    progressBar.style.width = targetProgress + '%';
                }, 500);
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Count Up Animations for Statistics
function initCountUpAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCountUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCountUp(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Add number pulse animation
const numberPulseStyle = document.createElement('style');
numberPulseStyle.textContent = `
    @keyframes numberPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); color: #ffd700; }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(numberPulseStyle);
