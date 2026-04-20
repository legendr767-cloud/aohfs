// Contact Form JavaScript for AOHF Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                submitContactForm();
            }
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-answer').style.maxHeight = '0';
                faq.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(45deg)';
            }
        });
    });
    
    function validateContactForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(error => error.remove());
        document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
        
        // Validate required fields
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showFieldError(field, 'This field is required');
                isValid = false;
            }
        });
        
        // Validate email
        const email = document.getElementById('email');
        if (email.value && !isValidEmail(email.value)) {
            showFieldError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone (if provided)
        const phone = document.getElementById('phone');
        if (phone.value && !isValidPhone(phone.value)) {
            showFieldError(phone, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate message length
        const message = document.getElementById('message');
        if (message.value.trim().length < 10) {
            showFieldError(message, 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    function submitContactForm() {
        const submitButton = contactForm.querySelector('.btn-submit-3d');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        submitButton.disabled = true;
        
        // Collect form data
        const formData = new FormData(contactForm);
        const contactData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            newsletter: formData.get('newsletter') === 'on'
        };
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Show success message
            showContactSuccess(contactData);
            
            // Reset form
            contactForm.reset();
            
        }, 2000);
    }
    
    function showContactSuccess(data) {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'contact-success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="success-text">
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting us, ${data.firstName}. We'll get back to you within 24 hours.</p>
                </div>
                <button class="close-notification" onclick="closeNotification(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                closeNotification(notification.querySelector('.close-notification'));
            }
        }, 5000);
    }
    
    // Real-time form validation
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const errorElement = field.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
        field.classList.remove('error');
        
        if (field.hasAttribute('required') && !field.value.trim()) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
        
        if (field.id === 'message' && field.value.trim().length > 0 && field.value.trim().length < 10) {
            showFieldError(field, 'Message must be at least 10 characters long');
            return false;
        }
        
        return true;
    }
    
    // Character counter for message field
    const messageField = document.getElementById('message');
    if (messageField) {
        const counterDiv = document.createElement('div');
        counterDiv.className = 'character-counter';
        counterDiv.textContent = '0 characters';
        messageField.parentNode.appendChild(counterDiv);
        
        messageField.addEventListener('input', function() {
            const length = this.value.length;
            counterDiv.textContent = `${length} characters`;
            
            if (length < 10 && length > 0) {
                counterDiv.style.color = '#EF4444';
            } else if (length >= 10) {
                counterDiv.style.color = '#10B981';
            } else {
                counterDiv.style.color = '#6B7280';
            }
        });
    }
});

// Global function for closing notifications
function closeNotification(button) {
    const notification = button.closest('.contact-success-notification');
    if (notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Add CSS for contact page styling
const contactStyles = document.createElement('style');
contactStyles.textContent = `
    .page-header-3d.contact-header {
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        color: white;
        padding: 120px 0 80px;
        margin-top: 80px;
    }
    
    .contact-info-3d {
        padding: 80px 0;
        background: var(--light-bg);
    }
    
    .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 30px;
    }
    
    .contact-card {
        background: white;
        padding: 40px 30px;
        border-radius: 20px;
        text-align: center;
        box-shadow: var(--shadow-light);
        transition: all 0.3s ease;
    }
    
    .contact-card:hover {
        transform: translateY(-10px);
        box-shadow: var(--shadow-heavy);
    }
    
    .contact-icon {
        width: 80px;
        height: 80px;
        background: var(--gradient-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        color: white;
        font-size: 28px;
    }
    
    .contact-card h3 {
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 15px;
    }
    
    .contact-card p {
        color: var(--text-light);
        margin-bottom: 8px;
    }
    
    .contact-card a {
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 500;
    }
    
    .contact-card a:hover {
        text-decoration: underline;
    }
    
    .contact-form-3d {
        padding: 80px 0;
    }
    
    .contact-content {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 60px;
        align-items: start;
    }
    
    .form-container {
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: var(--shadow-medium);
    }
    
    .form-header {
        text-align: center;
        margin-bottom: 40px;
    }
    
    .form-header h2 {
        font-size: 2rem;
        font-weight: 700;
        color: var(--text-dark);
        margin-bottom: 10px;
    }
    
    .form-header p {
        color: var(--text-light);
    }
    
    .contact-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
    }
    
    .form-group label {
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 8px;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        padding: 12px 16px;
        border: 2px solid #E5E7EB;
        border-radius: 8px;
        font-size: 16px;
        font-family: inherit;
        transition: all 0.3s ease;
        resize: vertical;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(139, 43, 139, 0.1);
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #EF4444;
    }
    
    .form-error {
        color: #EF4444;
        font-size: 14px;
        margin-top: 5px;
    }
    
    .character-counter {
        font-size: 12px;
        color: #6B7280;
        margin-top: 5px;
        text-align: right;
    }
    
    .form-options {
        margin: 20px 0;
    }
    
    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        font-weight: 500;
    }
    
    .checkbox-label input {
        width: 20px;
        height: 20px;
    }
    
    .btn-submit-3d {
        background: var(--gradient-primary);
        color: white;
        border: none;
        padding: 16px 32px;
        border-radius: 12px;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
    }
    
    .btn-submit-3d:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-heavy);
    }
    
    .btn-submit-3d:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }
    
    .contact-sidebar {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    
    .sidebar-card {
        background: white;
        padding: 30px;
        border-radius: 20px;
        box-shadow: var(--shadow-light);
    }
    
    .sidebar-card h3 {
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 20px;
    }
    
    .quick-links {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .quick-link {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        border-radius: 12px;
        text-decoration: none;
        color: var(--text-dark);
        transition: all 0.3s ease;
        border: 1px solid #E5E7EB;
    }
    
    .quick-link:hover {
        background: var(--light-bg);
        border-color: var(--primary-color);
    }
    
    .quick-link i {
        width: 40px;
        height: 40px;
        background: var(--primary-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 18px;
    }
    
    .quick-link h4 {
        font-weight: 600;
        margin-bottom: 5px;
    }
    
    .quick-link p {
        font-size: 14px;
        color: var(--text-light);
    }
    
    .social-links-contact {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 15px;
    }
    
    .social-link-contact {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-radius: 8px;
        text-decoration: none;
        color: var(--text-dark);
        transition: all 0.3s ease;
    }
    
    .social-link-contact:hover {
        background: var(--light-bg);
        color: var(--primary-color);
    }
    
    .social-link-contact i {
        width: 30px;
        text-align: center;
        font-size: 18px;
    }
    
    .emergency-card {
        background: var(--gradient-primary);
        color: white;
        text-align: center;
    }
    
    .emergency-icon {
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        font-size: 24px;
    }
    
    .emergency-card h3 {
        color: white;
    }
    
    .emergency-card p {
        opacity: 0.9;
        margin-bottom: 20px;
    }
    
    .emergency-contact {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .emergency-contact:hover {
        background: rgba(255, 255, 255, 0.3);
        color: white;
    }
    
    .faq-3d {
        padding: 80px 0;
        background: var(--light-bg);
    }
    
    .faq-container {
        max-width: 800px;
        margin: 0 auto;
        margin-top: 60px;
    }
    
    .faq-item {
        background: white;
        border-radius: 12px;
        margin-bottom: 20px;
        box-shadow: var(--shadow-light);
        overflow: hidden;
        transition: all 0.3s ease;
    }
    
    .faq-item:hover {
        box-shadow: var(--shadow-medium);
    }
    
    .faq-question {
        padding: 25px 30px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: white;
        transition: all 0.3s ease;
    }
    
    .faq-question:hover {
        background: var(--light-bg);
    }
    
    .faq-question h3 {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-dark);
        margin: 0;
    }
    
    .faq-question i {
        color: var(--primary-color);
        font-size: 18px;
        transition: transform 0.3s ease;
    }
    
    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }
    
    .faq-answer p {
        padding: 0 30px 25px;
        color: var(--text-light);
        line-height: 1.6;
        margin: 0;
    }
    
    .contact-success-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: var(--shadow-heavy);
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
    }
    
    .contact-success-notification.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .notification-content {
        padding: 20px;
        display: flex;
        align-items: flex-start;
        gap: 15px;
        position: relative;
    }
    
    .success-icon {
        width: 40px;
        height: 40px;
        background: #10B981;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 18px;
        flex-shrink: 0;
    }
    
    .success-text h3 {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 5px;
    }
    
    .success-text p {
        color: var(--text-light);
        font-size: 14px;
        line-height: 1.4;
    }
    
    .close-notification {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        color: var(--text-light);
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .close-notification:hover {
        background: var(--light-bg);
        color: var(--text-dark);
    }
    
    @media (max-width: 768px) {
        .contact-content {
            grid-template-columns: 1fr;
            gap: 40px;
        }
        
        .form-row {
            grid-template-columns: 1fr;
        }
        
        .contact-success-notification {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
        }
        
        .faq-question {
            padding: 20px;
        }
        
        .faq-answer p {
            padding: 0 20px 20px;
        }
    }
`;

document.head.appendChild(contactStyles);
