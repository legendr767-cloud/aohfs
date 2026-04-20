// 3D Effects JavaScript for AOHF Website

document.addEventListener('DOMContentLoaded', function() {
    
    // 3D Mouse Tracking for Hero Section
    function init3DMouseTracking() {
        const hero = document.querySelector('.hero-3d');
        if (!hero) return;
        
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
            mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
        });
        
        function animate3DBackground() {
            targetX += (mouseX - targetX) * 0.1;
            targetY += (mouseY - targetY) * 0.1;
            
            const particles = hero.querySelector('.hero-particles');
            const waves = hero.querySelector('.hero-waves');
            
            if (particles) {
                particles.style.transform = `translate(${targetX * 20}px, ${targetY * 20}px)`;
            }
            
            if (waves) {
                waves.style.transform = `translateX(${targetX * 30}px)`;
            }
            
            requestAnimationFrame(animate3DBackground);
        }
        
        animate3DBackground();
    }
    
    // Advanced 3D Card Effects
    function initAdvanced3DCards() {
        const cards = document.querySelectorAll('.program-card-3d, .impact-card-3d, .visual-card-3d');
        
        cards.forEach(card => {
            let isHovered = false;
            
            card.addEventListener('mouseenter', () => {
                isHovered = true;
                card.style.transformStyle = 'preserve-3d';
            });
            
            card.addEventListener('mouseleave', () => {
                isHovered = false;
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
            
            card.addEventListener('mousemove', (e) => {
                if (!isHovered) return;
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 8;
                const rotateY = (centerX - x) / 8;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(20px)
                    scale3d(1.02, 1.02, 1.02)
                `;
                
                // Add glow effect
                const glowIntensity = Math.min(Math.abs(rotateX) + Math.abs(rotateY), 20);
                card.style.boxShadow = `
                    0 ${10 + glowIntensity}px ${30 + glowIntensity}px rgba(139, 43, 139, 0.${Math.floor(glowIntensity)}),
                    0 0 0 1px rgba(255, 255, 255, 0.1)
                `;
            });
        });
    }
    
    // 3D Button Ripple Effect
    function init3DButtonEffects() {
        const buttons = document.querySelectorAll('.btn-primary-3d, .btn-secondary-3d, .btn-donate-3d');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.className = 'ripple-3d';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
            
            // 3D hover effect
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'perspective(1000px) rotateX(-5deg) translateZ(10px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) translateZ(0px)';
            });
        });
    }
    
    // Floating Elements Animation
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.stat-card-3d, .trust-feature');
        
        floatingElements.forEach((element, index) => {
            const delay = index * 0.5;
            const duration = 4 + (index % 3);
            
            element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        });
    }
    
    // 3D Text Effects
    function init3DTextEffects() {
        const titles = document.querySelectorAll('.hero-title, .section-title');
        
        titles.forEach(title => {
            const text = title.textContent;
            title.innerHTML = '';
            
            [...text].forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                span.style.transition = 'all 0.3s ease';
                span.style.transformOrigin = 'center bottom';
                
                span.addEventListener('mouseenter', () => {
                    span.style.transform = 'rotateX(360deg) scale(1.2)';
                    span.style.color = 'var(--secondary-color)';
                });
                
                span.addEventListener('mouseleave', () => {
                    span.style.transform = 'rotateX(0deg) scale(1)';
                    span.style.color = '';
                });
                
                title.appendChild(span);
            });
        });
    }
    
    // 3D Scroll Reveal
    function init3DScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.style.opacity = '1';
                    element.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0px)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const revealElements = document.querySelectorAll('.program-card-3d, .impact-card-3d, .mission-point');
        
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'perspective(1000px) rotateX(45deg) translateY(50px)';
            element.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            observer.observe(element);
        });
    }
    
    // 3D Particle System
    function init3DParticleSystem() {
        const hero = document.querySelector('.hero-3d');
        if (!hero) return;
        
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-system-3d';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        hero.appendChild(particleContainer);
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle-3d';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                pointer-events: none;
                animation: particleFloat3D ${5 + Math.random() * 10}s linear infinite;
            `;
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            particleContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 15000);
        }
        
        // Create particles periodically
        setInterval(createParticle, 500);
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat3D {
                0% {
                    transform: translateY(0) rotateZ(0deg) scale(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                    transform: scale(1);
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotateZ(360deg) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // 3D Logo Animation
    function init3DLogoAnimation() {
        const logo = document.querySelector('.logo-3d');
        if (!logo) return;
        
        let rotationX = 0;
        let rotationY = 0;
        
        logo.addEventListener('mousemove', (e) => {
            const rect = logo.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
            
            rotationX = y * 20;
            rotationY = x * 20;
            
            logo.style.transform = `
                perspective(1000px) 
                rotateX(${rotationX}deg) 
                rotateY(${rotationY}deg)
                scale(1.1)
            `;
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }
    
    // 3D Navigation Effects
    function init3DNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'perspective(1000px) rotateX(-10deg) translateZ(5px)';
                this.style.textShadow = '0 5px 10px rgba(0,0,0,0.3)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) translateZ(0px)';
                this.style.textShadow = 'none';
            });
        });
    }
    
    // 3D Loading Animation Enhancement
    function enhance3DLoader() {
        const loader = document.querySelector('.loader-3d');
        if (!loader) return;
        
        const cube = loader.querySelector('.cube');
        if (!cube) return;
        
        let rotationSpeed = 1;
        
        function animateLoader() {
            rotationSpeed += 0.01;
            cube.style.animation = `rotateCube ${2 / rotationSpeed}s infinite linear`;
            
            if (document.getElementById('loading-screen').style.display !== 'none') {
                requestAnimationFrame(animateLoader);
            }
        }
        
        animateLoader();
    }
    
    // 3D Depth of Field Effect
    function init3DDepthOfField() {
        // DISABLED: This function was causing scroll blur issues
        // Keeping function for compatibility but removing blur effects
        return;
    }
    
    // Initialize all 3D effects
    init3DMouseTracking();
    initAdvanced3DCards();
    init3DButtonEffects();
    initFloatingElements();
    init3DTextEffects();
    init3DScrollReveal();
    init3DParticleSystem();
    init3DLogoAnimation();
    init3DNavigation();
    enhance3DLoader();
    
    // Depth of field disabled to prevent scroll blur
    // if (window.innerWidth > 1024) {
    //     init3DDepthOfField();
    // }
    
    // Add ripple effect styles
    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `
        .ripple-3d {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple3D 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple3D {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn-primary-3d,
        .btn-secondary-3d,
        .btn-donate-3d {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyles);
    
    // Performance optimization for mobile devices
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // Reduce 3D effects on mobile for better performance
        const style = document.createElement('style');
        style.textContent = `
            .program-card-3d:hover,
            .impact-card-3d:hover,
            .stat-card-3d:hover {
                transform: translateY(-5px) !important;
            }
            
            .btn-primary-3d:hover,
            .btn-secondary-3d:hover,
            .btn-donate-3d:hover {
                transform: translateY(-2px) !important;
            }
        `;
        document.head.appendChild(style);
    }
});

// Export 3D effects utilities
window.AOHF3D = {
    // Create 3D transform string
    transform3D: function(x = 0, y = 0, z = 0, rotateX = 0, rotateY = 0, rotateZ = 0, scale = 1) {
        return `perspective(1000px) translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale3d(${scale}, ${scale}, ${scale})`;
    },
    
    // Animate element with 3D transform
    animate3D: function(element, transforms, duration = 1000, easing = 'ease-out') {
        return new Promise(resolve => {
            element.style.transition = `transform ${duration}ms ${easing}`;
            element.style.transform = this.transform3D(...transforms);
            
            setTimeout(() => {
                resolve();
            }, duration);
        });
    }
};
