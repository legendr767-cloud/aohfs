// Volunteer Form JavaScript for AOHF Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Volunteer Form Handling
    const volunteerForm = document.getElementById('volunteerForm');
    
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateVolunteerForm()) {
                submitVolunteerForm();
            }
        });
    }
    
    function validateVolunteerForm() {
        let isValid = true;
        const requiredFields = volunteerForm.querySelectorAll('[required]');
        
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
        
        // Validate phone
        const phone = document.getElementById('phone');
        if (phone.value && !isValidPhone(phone.value)) {
            showFieldError(phone, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate text areas
        const textAreas = ['skills', 'motivation'];
        textAreas.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field.value.trim().length < 20) {
                showFieldError(field, 'Please provide at least 20 characters');
                isValid = false;
            }
        });
        
        // Validate terms checkbox
        const terms = document.querySelector('input[name="terms"]');
        if (!terms.checked) {
            showFieldError(terms, 'You must agree to the terms and conditions');
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
    
    function submitVolunteerForm() {
        const submitButton = volunteerForm.querySelector('.btn-submit-volunteer');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Submitting Application...</span>';
        submitButton.disabled = true;
        
        // Collect form data
        const formData = new FormData(volunteerForm);
        const volunteerData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            country: formData.get('country'),
            age: formData.get('age'),
            opportunity: formData.get('opportunity'),
            availability: formData.get('availability'),
            startDate: formData.get('startDate'),
            education: formData.get('education'),
            profession: formData.get('profession'),
            skills: formData.get('skills'),
            languages: formData.get('languages'),
            motivation: formData.get('motivation'),
            experience: formData.get('experience'),
            newsletter: formData.get('newsletter') === 'on'
        };
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Show success message
            showVolunteerSuccess(volunteerData);
            
            // Reset form
            volunteerForm.reset();
            
        }, 3000);
    }
    
    function showVolunteerSuccess(data) {
        // Create success modal
        const modal = document.createElement('div');
        modal.className = 'volunteer-success-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Application Submitted Successfully!</h2>
                <p>Thank you for your interest in volunteering with AOHF, ${data.firstName}! We're excited about your desire to make a difference.</p>
                
                <div class="application-summary">
                    <h3>Application Summary</h3>
                    <div class="summary-item">
                        <span class="label">Preferred Opportunity:</span>
                        <span class="value">${getOpportunityName(data.opportunity)}</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Availability:</span>
                        <span class="value">${getAvailabilityName(data.availability)}</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Location:</span>
                        <span class="value">${getCountryName(data.country)}</span>
                    </div>
                </div>
                
                <div class="next-steps">
                    <h3>What Happens Next?</h3>
                    <div class="steps-timeline">
                        <div class="timeline-step">
                            <div class="step-icon">
                                <i class="fas fa-search"></i>
                            </div>
                            <div class="step-content">
                                <h4>Application Review</h4>
                                <p>We'll review your application within 48 hours</p>
                            </div>
                        </div>
                        <div class="timeline-step">
                            <div class="step-icon">
                                <i class="fas fa-video"></i>
                            </div>
                            <div class="step-content">
                                <h4>Interview</h4>
                                <p>Virtual interview to discuss your interests and match you with the right opportunity</p>
                            </div>
                        </div>
                        <div class="timeline-step">
                            <div class="step-icon">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                            <div class="step-content">
                                <h4>Orientation</h4>
                                <p>Comprehensive training to prepare you for your volunteer role</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn-primary-3d" onclick="closeVolunteerModal()">
                        <span>Continue</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                    <button class="btn-secondary-3d" onclick="shareVolunteerApplication()">
                        <span>Share</span>
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
                
                <div class="contact-info">
                    <p>Questions? Contact our volunteer coordinator at <a href="mailto:volunteers@aohf.org">volunteers@aohf.org</a></p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 100);
        
        // Close modal when clicking overlay
        modal.querySelector('.modal-overlay').addEventListener('click', closeVolunteerModal);
    }
    
    function getOpportunityName(opportunity) {
        const opportunities = {
            'medical': 'Medical Volunteer',
            'education': 'Education Volunteer',
            'technical': 'Technical Volunteer',
            'remote': 'Remote Volunteer',
            'outreach': 'Community Outreach',
            'professional': 'Professional Services'
        };
        return opportunities[opportunity] || opportunity;
    }
    
    function getAvailabilityName(availability) {
        const availabilities = {
            '1-2-weeks': '1-2 weeks',
            '1-month': '1 month',
            '2-3-months': '2-3 months',
            '6-months': '6 months',
            '1-year': '1 year or more',
            'flexible': 'Flexible'
        };
        return availabilities[availability] || availability;
    }
    
    function getCountryName(country) {
        const countries = {
            'nigeria': 'Nigeria',
            'ghana': 'Ghana',
            'kenya': 'Kenya',
            'south-africa': 'South Africa',
            'uk': 'United Kingdom',
            'usa': 'United States',
            'canada': 'Canada',
            'other': 'Other'
        };
        return countries[country] || country;
    }
    
    // Real-time form validation
    const formInputs = volunteerForm.querySelectorAll('input, select, textarea');
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
        
        if (field.tagName === 'TEXTAREA' && field.hasAttribute('required')) {
            if (field.value.trim().length < 20) {
                showFieldError(field, 'Please provide at least 20 characters');
                return false;
            }
        }
        
        return true;
    }
    
    // Character counters for text areas
    const textAreas = document.querySelectorAll('textarea');
    textAreas.forEach(textArea => {
        const counterDiv = document.createElement('div');
        counterDiv.className = 'character-counter';
        counterDiv.textContent = '0 characters';
        textArea.parentNode.appendChild(counterDiv);
        
        textArea.addEventListener('input', function() {
            const length = this.value.length;
            counterDiv.textContent = `${length} characters`;
            
            const minLength = this.hasAttribute('required') ? 20 : 0;
            
            if (length < minLength && length > 0) {
                counterDiv.style.color = '#EF4444';
            } else if (length >= minLength) {
                counterDiv.style.color = '#10B981';
            } else {
                counterDiv.style.color = '#6B7280';
            }
        });
    });
    
    // Smooth scrolling to application form
    const applyLinks = document.querySelectorAll('a[href="#apply"]');
    applyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById('apply');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Global functions for modal
function closeVolunteerModal() {
    const modal = document.querySelector('.volunteer-success-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function shareVolunteerApplication() {
    const shareData = {
        title: 'I just applied to volunteer with Asuwaju Odusote Humanitarian Foundation',
        text: 'Join me in making a difference! Apply to volunteer with AOHF and help transform lives across Africa.',
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData);
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
        window.open(shareUrl, '_blank');
    }
}

// Add CSS for volunteer page styling
const volunteerStyles = document.createElement('style');
volunteerStyles.textContent = `
    .page-header-3d.volunteer-header {
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        color: white;
        padding: 120px 0 80px;
        margin-top: 80px;
    }
    
    .volunteer-impact-3d {
        padding: 80px 0;
    }
    
    .impact-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px;
        align-items: center;
    }
    
    .volunteer-stats {
        display: flex;
        gap: 30px;
        margin-top: 30px;
    }
    
    .volunteer-opportunities-3d {
        padding: 80px 0;
        background: var(--light-bg);
    }
    
    .opportunities-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 30px;
        margin-top: 60px;
    }
    
    .opportunity-card-3d {
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: var(--shadow-light);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    
    .opportunity-card-3d:hover {
        transform: translateY(-10px);
        box-shadow: var(--shadow-heavy);
    }
    
    .opportunity-details {
        margin: 20px 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .detail {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        color: var(--text-light);
    }
    
    .detail i {
        color: var(--primary-color);
        width: 16px;
    }
    
    .opportunity-link {
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 20px;
        transition: gap 0.3s ease;
    }
    
    .opportunity-link:hover {
        gap: 12px;
    }
    
    .volunteer-application-3d {
        padding: 80px 0;
    }
    
    .application-content {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 60px;
        align-items: start;
    }
    
    .volunteer-form {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    
    .form-section {
        background: var(--light-bg);
        padding: 30px;
        border-radius: 15px;
    }
    
    .form-section h3 {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid var(--primary-color);
    }
    
    .btn-submit-volunteer {
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
        margin-top: 20px;
    }
    
    .btn-submit-volunteer:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-heavy);
    }
    
    .btn-submit-volunteer:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }
    
    .application-info {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    
    .process-steps {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .process-step {
        display: flex;
        align-items: flex-start;
        gap: 15px;
    }
    
    .step-number {
        width: 30px;
        height: 30px;
        background: var(--primary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 14px;
        flex-shrink: 0;
    }
    
    .step-content h4 {
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 5px;
    }
    
    .step-content p {
        font-size: 14px;
        color: var(--text-light);
        line-height: 1.5;
    }
    
    .benefits-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    .benefit {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        color: var(--text-dark);
    }
    
    .benefit i {
        color: var(--primary-color);
        width: 16px;
    }
    
    .volunteer-success-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .volunteer-success-modal.show {
        opacity: 1;
        visibility: visible;
    }
    
    .volunteer-success-modal .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border-radius: 20px;
        max-width: 700px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        text-align: center;
    }
    
    .application-summary {
        background: var(--light-bg);
        padding: 20px;
        border-radius: 12px;
        margin: 30px 0;
        text-align: left;
    }
    
    .application-summary h3 {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 15px;
        text-align: center;
    }
    
    .summary-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #E5E7EB;
    }
    
    .summary-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }
    
    .summary-item .label {
        font-weight: 600;
        color: var(--text-dark);
    }
    
    .summary-item .value {
        color: var(--text-light);
    }
    
    .steps-timeline {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 20px;
    }
    
    .timeline-step {
        display: flex;
        align-items: flex-start;
        gap: 15px;
        text-align: left;
    }
    
    .timeline-step .step-icon {
        width: 40px;
        height: 40px;
        background: var(--primary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    
    .timeline-step .step-content h4 {
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 5px;
    }
    
    .timeline-step .step-content p {
        font-size: 14px;
        color: var(--text-light);
        line-height: 1.5;
    }
    
    .contact-info {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #E5E7EB;
    }
    
    .contact-info p {
        font-size: 14px;
        color: var(--text-light);
    }
    
    .contact-info a {
        color: var(--primary-color);
        text-decoration: none;
    }
    
    .contact-info a:hover {
        text-decoration: underline;
    }
    
    @media (max-width: 768px) {
        .impact-content {
            grid-template-columns: 1fr;
            gap: 40px;
        }
        
        .volunteer-stats {
            justify-content: center;
        }
        
        .application-content {
            grid-template-columns: 1fr;
            gap: 40px;
        }
        
        .opportunities-grid {
            grid-template-columns: 1fr;
        }
        
        .volunteer-success-modal .modal-content {
            padding: 30px 20px;
        }
        
        .steps-timeline {
            gap: 15px;
        }
        
        .timeline-step {
            gap: 12px;
        }
        
        .timeline-step .step-icon {
            width: 35px;
            height: 35px;
        }
    }
`;

document.head.appendChild(volunteerStyles);
