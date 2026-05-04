// Main JavaScript for Asuwaju Odusote Humanitarian Foundation Website

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced mobile detection and performance optimization
    const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSlowConnection = navigator.connection && (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g');
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    
    // Initialize AOS (Animate On Scroll) with comprehensive mobile optimizations
    AOS.init({
        duration: isMobile ? (isSlowConnection ? 400 : 600) : 1000,
        easing: 'ease-out',
        once: true,
        offset: isMobile ? 30 : 100,
        delay: isMobile ? 50 : 100,
        disable: function() {
            // Disable animations on very slow devices or connections
            return (window.innerWidth < 480 && isSlowConnection) || isLowEndDevice;
        },
        startEvent: 'DOMContentLoaded',
        initClassName: 'aos-init',
        animatedClassName: 'aos-animate',
        useClassNames: false,
        disableMutationObserver: isMobile, // Improve performance on mobile
        debounceDelay: isMobile ? 100 : 50,
        throttleDelay: isMobile ? 100 : 99
    });

    // Animated Counter for Stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        updateCounter();
    }

    // Initialize counters when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-count'));
                
                // Special handling for percentage
                if (element.textContent.includes('%')) {
                    animateCounter(element, target, 1500);
                    setTimeout(() => {
                        element.textContent = target + '%';
                    }, 1500);
                } else {
                    animateCounter(element, target, 2000);
                }
                
                counterObserver.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all stat numbers (Core Values page)
    const statNumbers = document.querySelectorAll('.stat-number-3d[data-count]');
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });

    // Observe team stat numbers (Our Team page)
    const teamStatNumbers = document.querySelectorAll('.stat-number-team-3d[data-count]');
    teamStatNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });

    // Observe join team stat numbers (Our Team page - Join section)
    const joinStatNumbers = document.querySelectorAll('.join-stat-number-3d[data-count]');
    joinStatNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });

    // Observe food stat numbers (Food Distribution page)
    const foodStatNumbers = document.querySelectorAll('.food-stat-number-3d[data-count]');
    foodStatNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });

    // Observe security metric numbers (Food Distribution page)
    const securityMetricNumbers = document.querySelectorAll('.security-metric-number-3d[data-count]');
    securityMetricNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });

    // Observe water stat numbers (Clean Water page)
    const waterStatNumbers = document.querySelectorAll('.water-stat-number-3d[data-count]');
    waterStatNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });

    // Observe education stat numbers (Education page)
    const educationStatNumbers = document.querySelectorAll('.education-stat-number-3d[data-count]');
    educationStatNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });

    // Observe water story metric numbers (Clean Water page - Water Changes Lives section)
    const waterStoryMetrics = document.querySelectorAll('.metric-number-3d[data-count]');
    waterStoryMetrics.forEach(metric => {
        counterObserver.observe(metric);
    });

    // Observe sasti roti hero stat numbers
    const sastiHeroStats = document.querySelectorAll('.hero-stat-number-3d[data-count]');
    sastiHeroStats.forEach(stat => {
        counterObserver.observe(stat);
    });

    // Observe sasti roti impact stat numbers
    const sastiImpactStats = document.querySelectorAll('.sasti-stat-number-3d[data-count]');
    sastiImpactStats.forEach(stat => {
        counterObserver.observe(stat);
    });

    // Ensure Join Our Team buttons are clickable - AGGRESSIVE FIX
    const joinButtons = document.querySelectorAll('.join-btn-3d');
    joinButtons.forEach((button, index) => {
        // Force styles
        button.style.cursor = 'pointer';
        button.style.pointerEvents = 'auto';
        button.style.zIndex = '99999';
        button.style.position = 'relative';
        
        // Add multiple event listeners
        button.addEventListener('click', function(e) {
            console.log('Button clicked via addEventListener:', this.href);
            // Add visual feedback
            this.style.transform = 'translateY(-1px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add onclick as backup
        button.onclick = function(e) {
            console.log('Button clicked via onclick:', this.href);
            window.location.href = this.href;
        };
        
        // Add mousedown as another backup
        button.addEventListener('mousedown', function(e) {
            console.log('Button mousedown:', this.href);
        });
        
        // Force clickable area
        const buttonContent = button.querySelector('.btn-content-3d');
        if (buttonContent) {
            buttonContent.style.pointerEvents = 'none';
        }
        
        console.log(`Join button ${index + 1} initialized:`, button.href);
    });

    // Enhanced hover effects for value cards
    const valueCards = document.querySelectorAll('.value-card-enhanced');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth scroll for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
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

    // Parallax effect for hero section - Mobile optimized
    if (!isMobile && !isSlowConnection) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }

    // Loading Screen - Fixed and Optimized
    const loadingScreen = document.getElementById('loading-screen');
    let assetsLoaded = false;
    let minTimeElapsed = false;
    let loadingHidden = false;
    
    // Ensure loading screen is visible initially
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        loadingScreen.style.opacity = '1';
        loadingScreen.style.zIndex = '99999';
    }
    
    // Set minimum display time to 600ms for smooth UX
    setTimeout(() => {
        minTimeElapsed = true;
        if (assetsLoaded && !loadingHidden) {
            hideLoadingScreen();
        }
    }, 600);
    
    // Hide loading screen when page is fully loaded
    window.addEventListener('load', function() {
        assetsLoaded = true;
        if (minTimeElapsed && !loadingHidden) {
            hideLoadingScreen();
        }
    });
    
    // Fallback - force hide after 3 seconds maximum
    setTimeout(() => {
        if (!loadingHidden) {
            console.log('Loading screen fallback triggered');
            hideLoadingScreen();
        }
    }, 3000);
    
    // Also check DOM ready state
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(() => {
            assetsLoaded = true;
            if (minTimeElapsed && !loadingHidden) {
                hideLoadingScreen();
            }
        }, 100);
    }
    
    function hideLoadingScreen() {
        if (loadingScreen && !loadingHidden) {
            loadingHidden = true;
            loadingScreen.classList.remove('active');
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.4s ease-out';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                loadingScreen.style.visibility = 'hidden';
                loadingScreen.style.pointerEvents = 'none';
                // Ensure body is scrollable
                document.body.style.overflow = 'auto';
            }, 400);
        }
    }

    // Header Scroll Effect - Mobile optimized
    const header = document.querySelector('.header-3d');
    let lastScrollTop = 0;
    let headerTicking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
            if (!isMobile) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            }
        } else {
            header.classList.remove('scrolled');
            if (!isMobile) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        }

        // Hide/show header on scroll (disabled on mobile for better UX)
        if (!isMobile) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
        headerTicking = false;
    }

    window.addEventListener('scroll', function() {
        if (!headerTicking) {
            requestAnimationFrame(updateHeader);
            headerTicking = true;
        }
    }, { passive: true });

    // Mobile Menu Toggle - Enhanced
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    console.log('Mobile menu toggle:', mobileMenuToggle);
    console.log('Nav menu:', navMenu);
    
    if (mobileMenuToggle && navMenu) {
        // Toggle menu function
        function toggleMobileMenu() {
            const isActive = navMenu.classList.contains('active');
            
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Prevent body scroll when menu is open
            if (!isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
        
        // Close menu function
        function closeMobileMenu() {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
            
            // Close all dropdowns
            document.querySelectorAll('.nav-item.dropdown').forEach(item => {
                item.classList.remove('active');
            });
        }
        
        // Hamburger menu click
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Handle dropdown toggles in mobile
        const dropdownLinks = document.querySelectorAll('.nav-item.dropdown > .nav-link');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    const parentItem = this.parentElement;
                    
                    // Close other dropdowns
                    document.querySelectorAll('.nav-item.dropdown').forEach(item => {
                        if (item !== parentItem) {
                            item.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    parentItem.classList.toggle('active');
                }
            });
        });
        
        // Close menu when clicking on a regular nav link (non-dropdown)
        const regularNavLinks = document.querySelectorAll('.nav-item:not(.dropdown) .nav-link');
        regularNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            });
        });
        
        // Close menu when clicking on dropdown items
        const dropdownItems = document.querySelectorAll('.dropdown-menu-3d a');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu && navMenu.classList.contains('active')) {
                const isClickInsideMenu = navMenu.contains(e.target);
                const isClickOnToggle = mobileMenuToggle && mobileMenuToggle.contains(e.target);
                
                if (!isClickInsideMenu && !isClickOnToggle) {
                    closeMobileMenu();
                }
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            }, 250);
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                });
            }
        });
    });

    // Hero Carousel Functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const totalSlides = slides.length;
    let autoSlideInterval;

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        // Set background gradient for current slide
        const currentSlideElement = slides[index];
        const bgGradient = currentSlideElement.getAttribute('data-bg');
        if (bgGradient) {
            currentSlideElement.style.background = bgGradient;
        }
        
        // Animate counters for the active slide
        animateCountersInSlide(currentSlideElement);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 30000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners for carousel navigation
    if (nextBtn) nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            currentSlide = index;
            showSlide(currentSlide);
            startAutoSlide();
        });
    });

    // Pause auto-slide on hover
    const carouselSection = document.querySelector('.hero-carousel-section');
    if (carouselSection) {
        carouselSection.addEventListener('mouseenter', stopAutoSlide);
        carouselSection.addEventListener('mouseleave', startAutoSlide);
    }

    // Counter Animation for carousel slides
    function animateCountersInSlide(slide) {
        const counters = slide.querySelectorAll('.stat-number[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (target >= 1000) {
                        counter.textContent = Math.floor(current).toLocaleString() + '+';
                    } else {
                        counter.textContent = Math.floor(current) + '+';
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    if (target >= 1000) {
                        counter.textContent = target.toLocaleString() + '+';
                    } else {
                        counter.textContent = target + '+';
                    }
                }
            };
            
            updateCounter();
        });
    }

    // Initialize carousel
    if (slides.length > 0) {
        showSlide(0);
        startAutoSlide();
    }

    // Impact Counters Animation
    function animateImpactCounters() {
        const counters = document.querySelectorAll('.counter-number[data-target], .circle-number[data-target]');
        const progressBars = document.querySelectorAll('.progress-bar[data-width]');
        const progressCircle = document.querySelector('.progress-circle');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate counters
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2500;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            if (target >= 1000) {
                                counter.textContent = Math.floor(current).toLocaleString();
                            } else {
                                counter.textContent = Math.floor(current);
                            }
                            requestAnimationFrame(updateCounter);
                        } else {
                            if (target >= 1000) {
                                counter.textContent = target.toLocaleString();
                            } else {
                                counter.textContent = target;
                            }
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
        
        // Animate progress bars
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.getAttribute('data-width');
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 500);
                    progressObserver.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => progressObserver.observe(bar));
        
        // Animate progress circle
        if (progressCircle) {
            const circleObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            progressCircle.style.strokeDashoffset = '100';
                        }, 1000);
                        circleObserver.unobserve(progressCircle);
                    }
                });
            }, { threshold: 0.5 });
            
            circleObserver.observe(progressCircle);
        }
    }

    // Initialize impact counters
    animateImpactCounters();

    // Programs Carousel Functionality
    let currentProgramSlide = 0;
    const programSlides = document.querySelectorAll('.program-slide');
    const programIndicators = document.querySelectorAll('.programs-indicator');
    const programsPrevBtn = document.querySelector('.programs-prev');
    const programsNextBtn = document.querySelector('.programs-next');
    const totalProgramSlides = programSlides.length;
    let programAutoSlideInterval;

    function showProgramSlide(index) {
        // Remove active class from all slides and indicators
        programSlides.forEach(slide => slide.classList.remove('active'));
        programIndicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        if (programSlides[index]) {
            programSlides[index].classList.add('active');
        }
        if (programIndicators[index]) {
            programIndicators[index].classList.add('active');
        }
    }

    function nextProgramSlide() {
        currentProgramSlide = (currentProgramSlide + 1) % totalProgramSlides;
        showProgramSlide(currentProgramSlide);
    }

    function prevProgramSlide() {
        currentProgramSlide = (currentProgramSlide - 1 + totalProgramSlides) % totalProgramSlides;
        showProgramSlide(currentProgramSlide);
    }

    function startProgramAutoSlide() {
        programAutoSlideInterval = setInterval(nextProgramSlide, 8000); // Change slide every 8 seconds
    }

    function stopProgramAutoSlide() {
        clearInterval(programAutoSlideInterval);
    }

    // Event listeners for programs carousel navigation
    if (programsNextBtn) programsNextBtn.addEventListener('click', () => {
        stopProgramAutoSlide();
        nextProgramSlide();
        startProgramAutoSlide();
    });

    if (programsPrevBtn) programsPrevBtn.addEventListener('click', () => {
        stopProgramAutoSlide();
        prevProgramSlide();
        startProgramAutoSlide();
    });

    // Event listeners for programs indicators
    programIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopProgramAutoSlide();
            currentProgramSlide = index;
            showProgramSlide(currentProgramSlide);
            startProgramAutoSlide();
        });
    });

    // Pause auto-slide on hover for programs carousel
    const programsCarouselSection = document.querySelector('.featured-programs-carousel');
    if (programsCarouselSection) {
        programsCarouselSection.addEventListener('mouseenter', stopProgramAutoSlide);
        programsCarouselSection.addEventListener('mouseleave', startProgramAutoSlide);
    }

    // Initialize programs carousel
    if (programSlides.length > 0) {
        showProgramSlide(0);
        startProgramAutoSlide();
    }

    // Testimonials Slider Functionality
    let currentTestimonialSlide = 0;
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialIndicators = document.querySelectorAll('.testimonials-indicator');
    const testimonialsPrevBtn = document.querySelector('.testimonials-prev');
    const testimonialsNextBtn = document.querySelector('.testimonials-next');
    const totalTestimonialSlides = testimonialSlides.length;
    let testimonialAutoSlideInterval;

    function showTestimonialSlide(index) {
        // Remove active class from all slides and indicators
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialIndicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        if (testimonialSlides[index]) {
            testimonialSlides[index].classList.add('active');
        }
        if (testimonialIndicators[index]) {
            testimonialIndicators[index].classList.add('active');
        }
    }

    function nextTestimonialSlide() {
        currentTestimonialSlide = (currentTestimonialSlide + 1) % totalTestimonialSlides;
        showTestimonialSlide(currentTestimonialSlide);
    }

    function prevTestimonialSlide() {
        currentTestimonialSlide = (currentTestimonialSlide - 1 + totalTestimonialSlides) % totalTestimonialSlides;
        showTestimonialSlide(currentTestimonialSlide);
    }

    function startTestimonialAutoSlide() {
        testimonialAutoSlideInterval = setInterval(nextTestimonialSlide, 7000); // Change slide every 7 seconds
    }

    function stopTestimonialAutoSlide() {
        clearInterval(testimonialAutoSlideInterval);
    }

    // Event listeners for testimonials navigation
    if (testimonialsNextBtn) testimonialsNextBtn.addEventListener('click', () => {
        stopTestimonialAutoSlide();
        nextTestimonialSlide();
        startTestimonialAutoSlide();
    });

    if (testimonialsPrevBtn) testimonialsPrevBtn.addEventListener('click', () => {
        stopTestimonialAutoSlide();
        prevTestimonialSlide();
        startTestimonialAutoSlide();
    });

    // Event listeners for testimonial indicators
    testimonialIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopTestimonialAutoSlide();
            currentTestimonialSlide = index;
            showTestimonialSlide(currentTestimonialSlide);
            startTestimonialAutoSlide();
        });
    });

    // Pause auto-slide on hover for testimonials
    const testimonialsSection = document.querySelector('.donor-testimonials-section');
    if (testimonialsSection) {
        testimonialsSection.addEventListener('mouseenter', stopTestimonialAutoSlide);
        testimonialsSection.addEventListener('mouseleave', startTestimonialAutoSlide);
    }

    // Initialize testimonials slider
    if (testimonialSlides.length > 0) {
        showTestimonialSlide(0);
        startTestimonialAutoSlide();
    }

    // Campaign Progress Bars Animation
    function animateCampaignProgress() {
        const progressBars = document.querySelectorAll('.progress-fill[data-progress]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progress = progressBar.getAttribute('data-progress');
                    setTimeout(() => {
                        progressBar.style.width = progress + '%';
                    }, 500);
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    }

    // Initialize campaign progress animation
    animateCampaignProgress();


    // Newsletter Form Functionality
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterSuccess = document.getElementById('newsletter-success');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const interest = formData.get('interest');
            
            // Simulate form submission
            const submitBtn = this.querySelector('.newsletter-submit');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Joining...</span>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Hide form and show success message
                newsletterForm.style.display = 'none';
                newsletterSuccess.style.display = 'block';
                
                // Optional: Store in localStorage for demo purposes
                localStorage.setItem('newsletter_subscriber', JSON.stringify({
                    name: name,
                    email: email,
                    interest: interest,
                    subscribed_at: new Date().toISOString()
                }));
                
                console.log('Newsletter subscription:', { name, email, interest });
            }, 2000);
        });
    }

    // Legacy Counter Animation (for other sections)
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number:not([data-count]), .impact-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            // Start animation when element is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }

    // Initialize counter animation
    animateCounters();

    // Parallax Effect
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Initialize parallax
    initParallax();

    // 3D Tilt Effect for Cards
    function init3DTilt() {
        const cards = document.querySelectorAll('.program-card-3d, .impact-card-3d, .trust-feature');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }

    // Initialize 3D tilt effect
    init3DTilt();

    // Dropdown Menu Functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu-3d');
        let timeout;
        
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateY(0) rotateX(0deg)';
        });
        
        dropdown.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px) rotateX(-10deg)';
            }, 100);
        });
    });

    // Form Validation and Submission
    function initFormHandling() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic validation
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                        
                        // Remove error class after user starts typing
                        field.addEventListener('input', () => {
                            field.classList.remove('error');
                        });
                    }
                });
                
                if (isValid) {
                    // Show success message
                    showNotification('Thank you! Your message has been sent successfully.', 'success');
                    form.reset();
                } else {
                    showNotification('Please fill in all required fields.', 'error');
                }
            });
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            removeNotification(notification);
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            removeNotification(notification);
        });
    }

    function removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Initialize form handling
    initFormHandling();

    // Search Functionality
    function initSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchResults = document.querySelector('.search-results');
        
        if (searchInput) {
            let searchTimeout;
            
            searchInput.addEventListener('input', function() {
                clearTimeout(searchTimeout);
                const query = this.value.trim();
                
                if (query.length > 2) {
                    searchTimeout = setTimeout(() => {
                        performSearch(query);
                    }, 300);
                } else {
                    if (searchResults) {
                        searchResults.style.display = 'none';
                    }
                }
            });
        }
    }

    function performSearch(query) {
        // This would typically make an API call
        // For now, we'll simulate search results
        const mockResults = [
            { title: 'Education Programs', url: 'education.html', description: 'Learn about our education initiatives' },
            { title: 'Clean Water Projects', url: 'clean-water.html', description: 'Providing clean water to communities' },
            { title: 'Healthcare Initiatives', url: 'healthcare.html', description: 'Medical care for vulnerable populations' }
        ];
        
        const filteredResults = mockResults.filter(result => 
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.description.toLowerCase().includes(query.toLowerCase())
        );
        
        displaySearchResults(filteredResults);
    }

    function displaySearchResults(results) {
        const searchResults = document.querySelector('.search-results');
        if (!searchResults) return;
        
        if (results.length > 0) {
            searchResults.innerHTML = results.map(result => `
                <div class="search-result-item">
                    <h4><a href="${result.url}">${result.title}</a></h4>
                    <p>${result.description}</p>
                </div>
            `).join('');
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
            searchResults.style.display = 'block';
        }
    }

    // Initialize search
    initSearch();

    // Lazy Loading for Images
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize lazy loading
    initLazyLoading();

    // Back to Top Button
    function initBackToTop() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTopBtn);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize back to top button
    initBackToTop();

    // Accessibility Improvements
    function initAccessibility() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Focus management for modals and dropdowns
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any open dropdowns or modals
                const openDropdowns = document.querySelectorAll('.dropdown-menu-3d[style*="opacity: 1"]');
                openDropdowns.forEach(dropdown => {
                    dropdown.style.opacity = '0';
                    dropdown.style.visibility = 'hidden';
                });
            }
        });
    }

    // Initialize accessibility features
    initAccessibility();

    // Performance Monitoring
    function initPerformanceMonitoring() {
        // Monitor page load time
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${Math.round(loadTime)}ms`);
            
            // Send to analytics if needed
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_load_time', {
                    value: Math.round(loadTime)
                });
            }
        });
    }

    // Initialize performance monitoring
    initPerformanceMonitoring();

    // Error Handling
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
        // Send error to logging service if needed
    });

    // Service Worker Registration (for PWA capabilities)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
});

// Utility Functions
const utils = {
    // Debounce function
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Format currency
    formatCurrency: function(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    // Format date
    formatDate: function(date, options = {}) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options
        }).format(new Date(date));
    }
};

// Export utils for use in other scripts
window.AOHFUtils = utils;
