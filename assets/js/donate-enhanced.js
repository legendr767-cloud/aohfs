// Enhanced Donation Page JavaScript - Stunning 3D Effects

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all donation enhancements
    initLiveCounters();
    initAmountButtons();
    initDonationForm();
    initParallaxEffects();
    initMouseTrackingEffects();
    initImpactPreview();
});

// Live Impact Counters
function initLiveCounters() {
    const counters = [
        { element: document.getElementById('liveCounter1'), target: 15847, suffix: '' },
        { element: document.getElementById('liveCounter2'), target: 2450000, suffix: '', prefix: '₦' },
        { element: document.getElementById('liveCounter3'), target: 1234, suffix: '' }
    ];
    
    // Animate counters on page load
    setTimeout(() => {
        counters.forEach(counter => {
            if (counter.element) {
                animateCounter(counter.element, counter.target, counter.prefix, counter.suffix);
            }
        });
    }, 1000);
    
    // Update counters periodically to simulate live data
    setInterval(() => {
        counters.forEach(counter => {
            if (counter.element) {
                const increment = Math.floor(Math.random() * 5) + 1;
                counter.target += increment;
                counter.element.textContent = formatNumber(counter.target, counter.prefix, counter.suffix);
            }
        });
    }, 30000); // Update every 30 seconds
}

function animateCounter(element, target, prefix = '', suffix = '') {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = formatNumber(Math.floor(current), prefix, suffix);
    }, 16);
}

function formatNumber(num, prefix = '', suffix = '') {
    return prefix + num.toLocaleString() + suffix;
}

// Enhanced Amount Buttons
function initAmountButtons() {
    const amountButtons = document.querySelectorAll('.amount-btn-3d');
    const customAmountDiv = document.getElementById('customAmount');
    const customAmountInput = document.getElementById('customAmountInput');
    const selectedAmountInput = document.getElementById('selectedAmount');
    const impactPreview = document.getElementById('impactPreview');
    
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            const amount = this.getAttribute('data-amount');
            const impact = this.getAttribute('data-impact');
            
            if (this.classList.contains('custom-btn')) {
                // Show custom amount input
                customAmountDiv.style.display = 'block';
                customAmountInput.focus();
                selectedAmountInput.value = '';
            } else {
                // Hide custom amount input
                customAmountDiv.style.display = 'none';
                selectedAmountInput.value = amount;
                
                // Update impact preview
                updateImpactPreview(amount, impact);
            }
            
            // Add selection animation
            this.style.animation = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.animation = 'selectionPulse 0.6s ease-in-out';
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateX(5deg) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0) rotateX(0) scale(1)';
            }
        });
    });
    
    // Handle custom amount input
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            const amount = this.value;
            selectedAmountInput.value = amount;
            
            if (amount) {
                const impact = calculateCustomImpact(amount);
                updateImpactPreview(amount, impact);
            }
        });
    }
    
    // Initialize with first button selected
    if (amountButtons.length > 0) {
        amountButtons[0].click();
    }
}

function calculateCustomImpact(amount) {
    const numAmount = parseInt(amount);
    if (numAmount >= 100000) return "Transform multiple communities";
    if (numAmount >= 50000) return "Provide medical care for 25+ patients";
    if (numAmount >= 25000) return "Supply school materials for 20+ students";
    if (numAmount >= 10000) return "Provide clean water for 10+ people";
    if (numAmount >= 5000) return "Feed 5+ families for a week";
    return "Make a meaningful difference";
}

function updateImpactPreview(amount, impact) {
    const previewAmount = document.querySelector('.preview-amount');
    const previewImpact = document.querySelector('.preview-impact');
    
    if (previewAmount && previewImpact) {
        previewAmount.textContent = `₦${parseInt(amount).toLocaleString()}`;
        previewImpact.textContent = `will ${impact.toLowerCase()}`;
        
        // Add update animation
        const preview = document.getElementById('impactPreview');
        if (preview) {
            preview.style.animation = 'none';
            preview.offsetHeight; // Trigger reflow
            preview.style.animation = 'previewUpdate 0.8s ease-in-out';
        }
    }
}

// Enhanced Donation Form
function initDonationForm() {
    const form = document.getElementById('donationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateDonationForm()) {
                // Show processing animation
                showProcessingAnimation();
                
                // Simulate form submission
                setTimeout(() => {
                    showSuccessMessage();
                }, 3000);
            }
        });
    }
    
    // Add focus effects to form inputs
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

function validateDonationForm() {
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#dc3545';
            field.style.boxShadow = '0 0 10px rgba(220, 53, 69, 0.5)';
            
            // Remove error styling after 3 seconds
            setTimeout(() => {
                field.style.borderColor = '';
                field.style.boxShadow = '';
            }, 3000);
        }
    });
    
    if (!isValid) {
        showErrorMessage('Please fill in all required fields.');
    }
    
    return isValid;
}

function showProcessingAnimation() {
    const submitBtn = document.querySelector('.btn-donate-submit');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
    }
}

function showSuccessMessage() {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            padding: 30px 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(40, 167, 69, 0.4);
            z-index: 10000;
            text-align: center;
            animation: successPop 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        ">
            <div style="font-size: 3rem; margin-bottom: 15px;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 style="margin: 0 0 10px 0; font-size: 1.5rem;">Thank You!</h3>
            <p style="margin: 0; opacity: 0.9;">Your donation is being processed. You'll receive a confirmation email shortly.</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
        // Reset form
        document.getElementById('donationForm').reset();
        const submitBtn = document.querySelector('.btn-donate-submit');
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-heart"></i> <span>Complete Donation</span>';
            submitBtn.disabled = false;
        }
    }, 5000);
}

function showErrorMessage(message) {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #dc3545, #c82333);
            color: white;
            padding: 20px 25px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(220, 53, 69, 0.4);
            z-index: 10000;
            animation: slideInRight 0.5s ease;
        ">
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Impact Preview Animation
function initImpactPreview() {
    const preview = document.getElementById('impactPreview');
    if (preview) {
        // Add floating animation to preview icon
        const icon = preview.querySelector('.preview-icon i');
        if (icon) {
            setInterval(() => {
                icon.style.transform = `translateY(${Math.sin(Date.now() * 0.003) * 3}px)`;
            }, 16);
        }
    }
}

// Enhanced Parallax Effects
function initParallaxEffects() {
    const hero = document.querySelector('.donation-hero-3d');
    const shapes = document.querySelectorAll('.shape');
    const particles = document.querySelectorAll('.money-particle');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
        
        particles.forEach((particle, index) => {
            const speed = 0.2 + (index * 0.1);
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Mouse Tracking Effects
function initMouseTrackingEffects() {
    const hero = document.querySelector('.donation-hero-3d');
    const shapes = document.querySelectorAll('.shape');
    
    if (!hero) return;
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const moveX = (x - 0.5) * 30;
        const moveY = (y - 0.5) * 30;
        
        shapes.forEach((shape, index) => {
            const multiplier = (index + 1) * 0.2;
            shape.style.transform = `translate(${moveX * multiplier}px, ${moveY * multiplier}px)`;
        });
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes selectionPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes previewUpdate {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); background: rgba(255, 215, 0, 0.2); }
        100% { transform: scale(1); }
    }
    
    @keyframes successPop {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .focused {
        transform: translateY(-2px);
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);
