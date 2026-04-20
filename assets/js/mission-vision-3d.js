// Mission Vision 3D Interactive Effects

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out-cubic',
        once: true,
        offset: 100
    });

    // Mission Vision Toggle Functionality
    const toggleButtons = document.querySelectorAll('.toggle-btn-3d');
    const contentPanels = document.querySelectorAll('.content-panel');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Remove active class from all buttons and panels
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            contentPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
            
            // Add ripple effect
            createRippleEffect(this);
        });
    });

    // Create ripple effect for buttons
    function createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Compass Interactive Effects
    const compassDirections = document.querySelectorAll('.compass-direction');
    
    compassDirections.forEach(direction => {
        direction.addEventListener('mouseenter', function() {
            const directionName = this.getAttribute('data-direction');
            
            // Add glow effect to center
            const compassCenter = document.querySelector('.compass-center');
            compassCenter.style.boxShadow = `
                0 20px 40px rgba(212, 175, 55, 0.6),
                0 0 0 10px rgba(255,255,255,0.9),
                0 0 0 15px rgba(212, 175, 55, 0.4),
                0 0 60px rgba(212, 175, 55, 0.3)
            `;
            
            // Animate direction icon
            const icon = this.querySelector('.direction-icon');
            icon.style.transform = 'rotateY(360deg) scale(1.2)';
        });
        
        direction.addEventListener('mouseleave', function() {
            const compassCenter = document.querySelector('.compass-center');
            compassCenter.style.boxShadow = `
                0 20px 40px rgba(212, 175, 55, 0.4),
                0 0 0 10px rgba(255,255,255,0.9),
                0 0 0 15px rgba(212, 175, 55, 0.2)
            `;
            
            const icon = this.querySelector('.direction-icon');
            icon.style.transform = 'rotateY(0deg) scale(1)';
        });
    });

    // Stars Interactive Effects
    const stars = document.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            // Create starburst effect
            createStarburstEffect(this);
            
            // Animate connecting lines
            animateConstellationLines();
        });
        
        // Add random twinkling
        setInterval(() => {
            if (Math.random() > 0.7) {
                star.style.animation = 'none';
                setTimeout(() => {
                    star.style.animation = `starTwinkle 3s ease-in-out infinite`;
                    star.style.animationDelay = `${index * 0.5}s`;
                }, 100);
            }
        }, 3000 + Math.random() * 2000);
    });

    function createStarburstEffect(star) {
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#d4af37';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.transform = 'translate(-50%, -50%)';
            
            star.appendChild(particle);
            
            const angle = (i * 45) * Math.PI / 180;
            const distance = 60;
            
            particle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 800,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }

    function animateConstellationLines() {
        const lines = document.querySelectorAll('.constellation-lines line');
        lines.forEach((line, index) => {
            line.style.animation = 'none';
            setTimeout(() => {
                line.style.animation = 'lineGlow 2s ease-in-out';
            }, index * 200);
        });
    }

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Hero particles movement
        const heroParticles = document.querySelector('.hero-particles');
        if (heroParticles) {
            heroParticles.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Timeline Interactive Effects
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Intersection Observer for timeline animations
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate timeline marker
                const marker = entry.target.querySelector('.timeline-marker');
                marker.style.animation = 'markerPulse 1s ease-out';
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                if (finalValue !== '∞') {
                    animateCounter(target, 0, parseInt(finalValue), 2000);
                } else {
                    target.style.animation = 'pulse 2s ease-in-out infinite';
                }
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * easeOutCubic(progress));
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = end;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    // Mouse movement effects for 3D elements
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Parallax effect for floating elements
        const floatingElements = document.querySelectorAll('.floating');
        floatingElements.forEach(element => {
            const speed = element.dataset.mouseSpeed || 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // 3D tilt effect for cards
        const tiltCards = document.querySelectorAll('.pillar-3d, .goal-3d');
        tiltCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const angleX = (e.clientY - cardCenterY) / 30;
            const angleY = (cardCenterX - e.clientX) / 30;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
    });

    // Reset card transforms when mouse leaves
    document.addEventListener('mouseleave', function() {
        const tiltCards = document.querySelectorAll('.pillar-3d, .goal-3d');
        tiltCards.forEach(card => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
            const heroElements = document.querySelectorAll('.hero-content > *');
            heroElements.forEach((element, index) => {
                element.style.animationDelay = `${index * 0.2}s`;
                element.classList.add('fade-in-up');
            });
        }, 500);
    });

    // Floating Action Button
    const floatingActionBtn = document.getElementById('floating-action');
    const fabMain = floatingActionBtn.querySelector('.fab-main');
    
    fabMain.addEventListener('click', function() {
        floatingActionBtn.classList.toggle('active');
    });
    
    // Close FAB when clicking outside
    document.addEventListener('click', function(e) {
        if (!floatingActionBtn.contains(e.target)) {
            floatingActionBtn.classList.remove('active');
        }
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Share Content Function
    window.shareContent = function() {
        if (navigator.share) {
            navigator.share({
                title: 'Mission & Vision - AOHF',
                text: 'Discover the mission and vision of Asuwaju Odusote Humanitarian Foundation',
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard!');
            });
        }
    };

    // Enhanced scroll animations with intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply fade-in animation to elements
    const fadeElements = document.querySelectorAll('.stat-card, .pillar-3d, .goal-3d, .timeline-content');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(el);
    });

    // Add CSS for dynamic animations
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes markerPulse {
            0% { transform: translateX(-50%) scale(1); }
            50% { transform: translateX(-50%) scale(1.3); }
            100% { transform: translateX(-50%) scale(1); }
        }
        
        .fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-in {
            animation: slideInFromSide 0.8s ease-out forwards;
        }
        
        @keyframes slideInFromSide {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        body.loaded .hero-particles {
            animation: particleFloat 20s infinite linear;
        }
        
        body.loaded .hero-waves {
            animation: waveMove 10s infinite linear;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.1);
        }
        
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #d4af37, #b8941f);
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #b8941f, #d4af37);
        }
    `;
    document.head.appendChild(style);

    // Progress Circle Animation
    function animateProgressCircles() {
        const progressCircles = document.querySelectorAll('.progress-circle');
        
        progressCircles.forEach(circle => {
            const percentage = circle.getAttribute('data-percentage');
            const progressRing = circle.querySelector('.progress-ring-circle');
            const radius = progressRing.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            
            progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
            progressRing.style.strokeDashoffset = circumference;
            
            // Animate the progress
            setTimeout(() => {
                const offset = circumference - (percentage / 100) * circumference;
                progressRing.style.strokeDashoffset = offset;
            }, 500);
        });
    }
    
    // Observe progress circles for animation
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressCircles();
            }
        });
    }, { threshold: 0.5 });
    
    const progressSection = document.querySelector('.objectives-section');
    if (progressSection) {
        progressObserver.observe(progressSection);
    }
});

// Additional utility functions for enhanced 3D effects
function createParticleExplosion(element, particleCount = 12) {
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #d4af37, #ff6b35);
            border-radius: 50%;
            pointer-events: none;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 1000;
        `;
        
        element.appendChild(particle);
        
        const angle = (i * 360 / particleCount) * Math.PI / 180;
        const distance = 80 + Math.random() * 40;
        const duration = 800 + Math.random() * 400;
        
        particle.animate([
            {
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}
