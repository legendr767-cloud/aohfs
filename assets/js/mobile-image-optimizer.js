// Mobile Image Optimization and Lazy Loading
document.addEventListener('DOMContentLoaded', function() {
    const isMobile = window.innerWidth <= 768;
    
    // Optimize background images for mobile
    if (isMobile) {
        optimizeMobileImages();
        setupIntersectionObserver();
    }
    
    function optimizeMobileImages() {
        // Get all elements with background images
        const bgElements = document.querySelectorAll('[style*="background"]');
        
        bgElements.forEach(element => {
            const style = element.getAttribute('style');
            if (style && style.includes('url(')) {
                // Add loading class
                element.classList.add('lazy-bg');
                
                // Store original background
                const originalBg = style;
                element.setAttribute('data-bg', originalBg);
                
                // Remove background temporarily
                element.style.background = 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)';
                element.style.backgroundSize = 'cover';
                element.style.backgroundPosition = 'center';
            }
        });
    }
    
    function setupIntersectionObserver() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const originalBg = element.getAttribute('data-bg');
                    
                    if (originalBg) {
                        // Create a new image to preload
                        const img = new Image();
                        const urlMatch = originalBg.match(/url\(['"]?([^'"]+)['"]?\)/);
                        
                        if (urlMatch) {
                            img.onload = function() {
                                element.setAttribute('style', originalBg);
                                element.classList.remove('lazy-bg');
                                element.classList.add('loaded');
                            };
                            
                            img.onerror = function() {
                                // Fallback gradient if image fails to load
                                element.style.background = 'linear-gradient(135deg, #8B2B8B 0%, #FF6B35 100%)';
                                element.classList.remove('lazy-bg');
                            };
                            
                            img.src = urlMatch[1];
                        }
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        // Observe all lazy background elements
        document.querySelectorAll('.lazy-bg').forEach(element => {
            imageObserver.observe(element);
        });
    }
    
    // Optimize regular images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            // Add loading attribute based on position
            const rect = img.getBoundingClientRect();
            if (rect.top > window.innerHeight) {
                img.setAttribute('loading', 'lazy');
            }
        }
        
        // Add error handling
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
    
    // Preload critical images for mobile
    if (isMobile) {
        preloadCriticalImages();
    }
    
    function preloadCriticalImages() {
        const criticalImages = [
            'pictures/logo.jpg',
            'pictures/clean water for every community.jpg' // First hero slide
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
});

// Add CSS for loading states
const style = document.createElement('style');
style.textContent = `
    .lazy-bg {
        transition: opacity 0.3s ease;
    }
    
    .lazy-bg.loaded {
        opacity: 1;
    }
    
    @media screen and (max-width: 768px) {
        /* Optimize image containers for mobile */
        .hero-slide,
        .program-image,
        .campaign-image {
            background-attachment: scroll !important;
            will-change: transform;
        }
        
        /* Loading placeholder */
        .lazy-bg::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #8B2B8B;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        .lazy-bg.loaded::before {
            display: none;
        }
        
        @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
    }
`;
document.head.appendChild(style);
