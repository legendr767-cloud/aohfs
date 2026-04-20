// Enhanced Healthcare Initiatives Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FORCE LOAD HERO BACKGROUND IMAGE
    forceLoadHealthcareHeroImage();
    
    // FIX HEALTHCARE STATISTICS IN OVERVIEW SECTION
    fixHealthcareOverviewStats();
    
    // FIX SECTION Z-INDEX ISSUES
    fixSectionZIndexIssues();
    
    // Initialize all enhancements
    initScrollAnimations();
    initCounterAnimations();
    initHoverEffects();
    initHealthcareEffects();
    initSmoothScrolling();
    initLoadingAnimations();
});

// Force fix all hero section issues
function forceFixHeroSection() {
    const heroSection = document.querySelector('.healthcare-header');
    const heroTitle = document.querySelector('.healthcare-header h1');
    const heroText = document.querySelector('.healthcare-header p');
    const heroContent = document.querySelector('.healthcare-header .page-header-content');
    const container = document.querySelector('.healthcare-header .container');
    
    if (heroSection) {
        // Fix hero section styling
        heroSection.style.minHeight = '100vh';
        heroSection.style.paddingTop = '120px';
        heroSection.style.zIndex = '1';
        heroSection.style.position = 'relative';
        heroSection.style.display = 'flex';
        heroSection.style.alignItems = 'center';
        
        // Fix container z-index
        if (container) {
            container.style.position = 'relative';
            container.style.zIndex = '10';
            container.style.width = '100%';
            container.style.maxWidth = '1200px';
            container.style.margin = '0 auto';
            container.style.padding = '0 20px';
        }
        
        // Force white text color
        if (heroTitle) {
            heroTitle.style.color = 'white';
            heroTitle.style.webkitTextFillColor = 'white';
            heroTitle.style.background = 'none';
            heroTitle.style.webkitBackgroundClip = 'initial';
            heroTitle.style.backgroundClip = 'initial';
            heroTitle.style.textShadow = '3px 3px 6px rgba(0,0,0,0.7)';
            heroTitle.style.fontSize = '4rem';
            heroTitle.style.fontWeight = '900';
            heroTitle.style.lineHeight = '1.2';
            heroTitle.style.marginBottom = '20px';
        }
        
        if (heroText) {
            heroText.style.color = 'white';
            heroText.style.textShadow = '2px 2px 4px rgba(0,0,0,0.7)';
            heroText.style.fontSize = '1.4rem';
            heroText.style.lineHeight = '1.6';
            heroText.style.marginBottom = '30px';
        }
        
        if (heroContent) {
            heroContent.style.textAlign = 'center';
            heroContent.style.color = 'white';
        }
        
        // Ensure overlay is properly positioned
        const overlay = heroSection.querySelector('.hero-overlay');
        if (overlay) {
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.right = '0';
            overlay.style.bottom = '0';
            overlay.style.zIndex = '0';
            overlay.style.background = 'linear-gradient(rgba(0,123,255,0.8), rgba(40,167,69,0.7))';
        }
        
        // Ensure image is behind overlay
        const heroImg = heroSection.querySelector('img');
        if (heroImg) {
            heroImg.style.position = 'absolute';
            heroImg.style.top = '0';
            heroImg.style.left = '0';
            heroImg.style.width = '100%';
            heroImg.style.height = '100%';
            heroImg.style.objectFit = 'cover';
            heroImg.style.zIndex = '-1';
        }
        
        console.log('Hero section issues fixed automatically');
    }
}

// Fix healthcare overview statistics to ensure proper display
function fixHealthcareOverviewStats() {
    const overviewStats = document.querySelector('.overview-stats');
    if (overviewStats) {
        // Fix the container
        overviewStats.style.display = 'grid';
        overviewStats.style.gridTemplateColumns = 'repeat(3, 1fr)';
        overviewStats.style.gap = '30px';
        overviewStats.style.marginTop = '40px';
        
        // Fix each stat item
        const statItems = overviewStats.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
            if (index === 0) {
                // Make the first tile (10K+) bigger
                item.style.textAlign = 'center';
                item.style.padding = '40px 30px';
                item.style.background = 'white';
                item.style.borderRadius = '20px';
                item.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
                item.style.transition = 'all 0.3s ease';
                item.style.border = '2px solid rgba(0, 123, 255, 0.2)';
                item.style.minHeight = '200px';
                item.style.display = 'flex';
                item.style.flexDirection = 'column';
                item.style.justifyContent = 'center';
                
                const number = item.querySelector('.stat-number');
                const label = item.querySelector('.stat-label');
                
                if (number) {
                    number.style.fontSize = '3.5rem';
                    number.style.fontWeight = '900';
                    number.style.background = 'linear-gradient(135deg, #007bff, #28a745)';
                    number.style.webkitBackgroundClip = 'text';
                    number.style.webkitTextFillColor = 'transparent';
                    number.style.backgroundClip = 'text';
                    number.style.marginBottom = '15px';
                    number.style.lineHeight = '1';
                    number.textContent = '10K+';
                }
                
                if (label) {
                    label.style.color = '#6b7280';
                    label.style.fontWeight = '700';
                    label.style.fontSize = '1.1rem';
                }
            } else {
                // Standard size for other tiles
                item.style.textAlign = 'center';
                item.style.padding = '25px';
                item.style.background = 'white';
                item.style.borderRadius = '15px';
                item.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
                item.style.transition = 'all 0.3s ease';
                item.style.border = '1px solid rgba(0, 123, 255, 0.1)';
                
                const number = item.querySelector('.stat-number');
                const label = item.querySelector('.stat-label');
                
                if (number) {
                    number.style.fontSize = '2.5rem';
                    number.style.fontWeight = '800';
                    number.style.background = 'linear-gradient(135deg, #007bff, #28a745)';
                    number.style.webkitBackgroundClip = 'text';
                    number.style.webkitTextFillColor = 'transparent';
                    number.style.backgroundClip = 'text';
                    number.style.marginBottom = '10px';
                }
                
                if (label) {
                    label.style.color = '#6b7280';
                    label.style.fontWeight = '600';
                }
            }
            
            // Add hover effects
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = index === 0 ? '0 15px 40px rgba(0, 123, 255, 0.15)' : '0 10px 30px rgba(0, 123, 255, 0.1)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = index === 0 ? '0 8px 30px rgba(0,0,0,0.1)' : '0 5px 20px rgba(0,0,0,0.08)';
            });
        });
        
        console.log('Healthcare overview statistics fixed and enhanced');
    }
}

// Fix section z-index issues to prevent going under hero
function fixSectionZIndexIssues() {
    const sections = [
        { selector: '.healthcare-overview-3d', zIndex: 100 },
        { selector: '.healthcare-services-3d', zIndex: 99 },
        { selector: '.health-impact-3d', zIndex: 98 },
        { selector: '.patient-stories-3d', zIndex: 97 },
        { selector: '.support-healthcare-3d', zIndex: 96 }
    ];
    
    sections.forEach(section => {
        const element = document.querySelector(section.selector);
        if (element) {
            element.style.position = 'relative';
            element.style.zIndex = section.zIndex.toString();
            element.style.background = element.style.background || 'white';
            
            // Ensure proper spacing
            element.style.marginTop = '0';
            element.style.paddingTop = element.style.paddingTop || '80px';
            element.style.paddingBottom = element.style.paddingBottom || '80px';
            
            console.log(`Fixed z-index for ${section.selector}: ${section.zIndex}`);
        }
    });
    
    // Special fix for hero section to ensure it doesn't interfere
    const heroSection = document.querySelector('.healthcare-header');
    if (heroSection) {
        heroSection.style.position = 'relative';
        heroSection.style.zIndex = '1';
        
        // Ensure hero doesn't have fixed positioning that could cause issues
        heroSection.style.position = 'relative';
        
        console.log('Hero section z-index adjusted to prevent interference');
    }
}

// Fix healthcare statistics tiles to prevent display issues
function fixHealthcareStatsTiles() {
    const healthcareStats = document.querySelector('.healthcare-stats');
    if (healthcareStats) {
        // Fix the container
        healthcareStats.style.display = 'flex';
        healthcareStats.style.justifyContent = 'center';
        healthcareStats.style.gap = '60px';
        healthcareStats.style.flexWrap = 'wrap';
        healthcareStats.style.marginTop = '60px';
        
        // Fix each tile
        const tiles = healthcareStats.querySelectorAll('div');
        tiles.forEach((tile, index) => {
            // Fix tile container
            tile.style.position = 'relative';
            tile.style.overflow = 'hidden';
            tile.style.display = 'flex';
            tile.style.flexDirection = 'column';
            tile.style.justifyContent = 'center';
            tile.style.alignItems = 'center';
            tile.style.background = 'rgba(255,255,255,0.15)';
            tile.style.backdropFilter = 'blur(10px)';
            tile.style.border = '3px solid rgba(255,255,255,0.4)';
            tile.style.borderRadius = '25px';
            tile.style.minWidth = '280px';
            tile.style.minHeight = '200px';
            tile.style.padding = '50px 60px';
            tile.style.textAlign = 'center';
            tile.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            tile.style.transition = 'all 0.3s ease';
            
            // Fix inner elements
            const number = tile.querySelector('div:first-child');
            const label = tile.querySelector('div:last-child');
            
            if (number) {
                number.style.fontSize = '4.5rem';
                number.style.fontWeight = '900';
                number.style.color = 'white';
                number.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
                number.style.marginBottom = '20px';
                number.style.lineHeight = '1';
                number.style.position = 'relative';
                number.style.zIndex = '2';
                number.style.display = 'block';
                number.style.width = '100%';
                
                // Ensure the number displays correctly
                const originalText = number.textContent;
                if (originalText.includes('10K+')) {
                    number.textContent = '10K+';
                } else if (originalText.includes('50+')) {
                    number.textContent = '50+';
                } else if (originalText.includes('25')) {
                    number.textContent = '25';
                }
            }
            
            if (label) {
                label.style.fontSize = '1.3rem';
                label.style.fontWeight = '700';
                label.style.color = 'white';
                label.style.textShadow = '1px 1px 2px rgba(0,0,0,0.3)';
                label.style.lineHeight = '1.3';
                label.style.position = 'relative';
                label.style.zIndex = '2';
                label.style.display = 'block';
                label.style.width = '100%';
                label.style.opacity = '1';
            }
            
            // Add hover effect
            tile.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
                this.style.background = 'rgba(255,255,255,0.2)';
            });
            
            tile.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                this.style.background = 'rgba(255,255,255,0.15)';
            });
        });
        
        console.log('Healthcare statistics tiles fixed and stabilized');
    }
}

// Force load healthcare hero background image
function forceLoadHealthcareHeroImage() {
    const heroSection = document.querySelector('.healthcare-header');
    if (heroSection) {
        // Try multiple image paths
        const imagePaths = [
            'pictures/mobile medical for rural areas.jpg',
            './pictures/mobile medical for rural areas.jpg',
            '/pictures/mobile medical for rural areas.jpg'
        ];
        
        // Test each image path
        imagePaths.forEach((path, index) => {
            const img = new Image();
            img.onload = function() {
                console.log(`Healthcare image loaded successfully: ${path}`);
                // Apply the working image path
                heroSection.style.backgroundImage = `url('${path}')`;
                heroSection.style.backgroundSize = 'cover';
                heroSection.style.backgroundPosition = 'center';
                heroSection.style.backgroundRepeat = 'no-repeat';
                
                // Ensure overlay exists
                if (!heroSection.querySelector('.hero-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.className = 'hero-overlay';
                    overlay.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(rgba(0,123,255,0.8), rgba(40,167,69,0.7)); z-index: 1;';
                    heroSection.insertBefore(overlay, heroSection.firstChild);
                }
            };
            img.onerror = function() {
                console.log(`Failed to load healthcare image: ${path}`);
            };
            img.src = path;
        });
        
        // Fallback: Set a solid background color if image fails
        setTimeout(() => {
            if (!heroSection.style.backgroundImage || heroSection.style.backgroundImage === 'none') {
                heroSection.style.backgroundColor = '#007bff';
                console.log('Using fallback background color for healthcare');
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
                    entry.target.classList.contains('metric-card') ||
                    entry.target.classList.contains('healthcare-stats')) {
                    animateCounters(entry.target);
                }
                
                // Trigger healthcare-specific animations
                if (entry.target.classList.contains('service-card-3d')) {
                    animateHealthcareCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.service-card-3d, .metric-card, .story-card, .stat-item, .action-card, .visual-card-3d');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Counter animations for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number, .metric-number');
    
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
        } else if (text.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (text.includes('+')) {
            if (current >= 1000) {
                element.textContent = (Math.floor(current / 100) / 10).toFixed(1) + 'K+';
            } else {
                element.textContent = Math.floor(current) + '+';
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
            
            if (text.includes('K+')) {
                number.textContent = (Math.floor(current / 100) / 10).toFixed(1) + 'K+';
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
            
            // Add healthcare-specific effects
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.animation = 'medicalPulse 0.6s ease-in-out';
            }
            
            // Add medical cross effect to healthcare icons
            const medicalIcon = this.querySelector('.fa-clinic-medical, .fa-stethoscope, .fa-syringe');
            if (medicalIcon) {
                medicalIcon.classList.add('medical-cross');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.animation = '';
            }
            
            const medicalIcon = this.querySelector('.fa-clinic-medical, .fa-stethoscope, .fa-syringe');
            if (medicalIcon) {
                medicalIcon.classList.remove('medical-cross');
            }
        });
    });
    
    // Metric cards hover effects
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            
            // Add heartbeat effect to heartbeat icon
            const heartIcon = this.querySelector('.fa-heartbeat');
            if (heartIcon) {
                heartIcon.classList.add('heartbeat');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            
            const heartIcon = this.querySelector('.fa-heartbeat');
            if (heartIcon) {
                heartIcon.classList.remove('heartbeat');
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
            createHealthcareRipple(this, e);
        });
    });
}

// Healthcare-specific effects
function initHealthcareEffects() {
    // Add floating animation to medical icons
    const medicalIcons = document.querySelectorAll('.fa-stethoscope, .fa-heartbeat, .fa-syringe');
    medicalIcons.forEach(icon => {
        icon.style.animation = 'medicalFloat 3s ease-in-out infinite';
    });
    
    // Add sparkle effect to healthcare stats
    const healthcareStats = document.querySelectorAll('.healthcare-stats > div');
    healthcareStats.forEach((stat, index) => {
        setTimeout(() => {
            stat.style.animation = 'medicalPulse 3s ease-in-out infinite';
            stat.style.animationDelay = `${index * 0.5}s`;
        }, 1000);
    });
    
    // Add highlight effect to section tags
    const sectionTags = document.querySelectorAll('.section-tag');
    sectionTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.classList.add('healthcare-highlight');
        });
        
        tag.addEventListener('mouseleave', function() {
            this.classList.remove('healthcare-highlight');
        });
    });
}

// Healthcare card animation
function animateHealthcareCard(card) {
    const icon = card.querySelector('.card-icon');
    const features = card.querySelectorAll('.feature');
    
    if (icon) {
        icon.style.animation = 'medicalPulse 1s ease-in-out';
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

// Create healthcare-themed ripple effect
function createHealthcareRipple(element, event) {
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
        background: radial-gradient(circle, rgba(0,123,255,0.4) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: healthcareRipple 0.6s linear;
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
    const elements = document.querySelectorAll('.section-title, .service-card-3d, .metric-card, .story-card');
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

// Healthcare progress tracker
function initHealthcareProgress() {
    // Simulate healthcare progress for demonstration
    const progressElements = document.querySelectorAll('.metric-number');
    
    progressElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #007bff, #28a745)';
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
    const heroSection = document.querySelector('.healthcare-header');
    
    if (heroSection) {
        const speed = 0.5;
        heroSection.style.transform = `translateY(${scrolled * speed}px)`;
    }
    
    // Update healthcare stats on scroll
    const healthcareStats = document.querySelectorAll('.healthcare-stats > div');
    healthcareStats.forEach((stat, index) => {
        const rect = stat.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            stat.style.animationDelay = `${index * 0.2}s`;
        }
    });
});

// Add CSS for healthcare animations
const style = document.createElement('style');
style.textContent = `
    @keyframes healthcareRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes medicalPulse {
        0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
        }
        50% { 
            transform: scale(1.1); 
            box-shadow: 0 12px 35px rgba(0, 123, 255, 0.4);
        }
    }
    
    .service-card-3d, .metric-card, .story-card, .action-card {
        position: relative;
        overflow: hidden;
    }
    
    .healthcare-highlight {
        animation: healthcareHighlight 1s ease-in-out infinite alternate !important;
    }
    
    .medical-cross {
        animation: medicalCross 1s ease-in-out !important;
    }
    
    .heartbeat {
        animation: heartbeat 1.5s ease-in-out infinite !important;
    }
`;
document.head.appendChild(style);

// Form validation for healthcare applications
function initHealthcareFormValidation() {
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
                    input.style.borderColor = '#007bff';
                    input.style.boxShadow = '0 0 5px rgba(0, 123, 255, 0.3)';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields for the healthcare application.');
            }
        });
    });
}

// Initialize healthcare form validation
initHealthcareFormValidation();

// Initialize healthcare progress tracker
initHealthcareProgress();

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Add keyboard navigation for cards
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('service-card-3d') || 
            focusedElement.classList.contains('metric-card') ||
            focusedElement.classList.contains('story-card')) {
            focusedElement.click();
        }
    }
});

// Add focus styles for accessibility
const focusableElements = document.querySelectorAll('.service-card-3d, .metric-card, .story-card, .action-card');
focusableElements.forEach(element => {
    element.setAttribute('tabindex', '0');
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #007bff';
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

// Healthcare notification system
function initHealthcareNotifications() {
    // Show healthcare tip after 8 seconds
    setTimeout(() => {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #007bff, #28a745);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0, 123, 255, 0.3);
                z-index: 1000;
                max-width: 300px;
                animation: slideInRight 0.5s ease;
            ">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-stethoscope"></i>
                    <div>
                        <strong>Healthcare Tip</strong><br>
                        <small>Your support helps us provide life-saving medical care to those in need!</small>
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
    }, 8000);
}

// Initialize healthcare notifications
initHealthcareNotifications();

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
