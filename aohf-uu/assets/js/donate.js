// Donation Form JavaScript for AOHF Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Amount Selection Functionality
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountDiv = document.getElementById('customAmount');
    const customAmountInput = document.getElementById('customAmountInput');
    const selectedAmountInput = document.getElementById('selectedAmount');
    
    amountButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            if (this.classList.contains('custom-btn')) {
                // Show custom amount input
                customAmountDiv.style.display = 'block';
                customAmountInput.focus();
                selectedAmountInput.value = '';
            } else {
                // Hide custom amount input and set selected amount
                customAmountDiv.style.display = 'none';
                const amount = this.dataset.amount;
                selectedAmountInput.value = amount;
                customAmountInput.value = '';
            }
        });
    });
    
    // Custom amount input handling
    customAmountInput.addEventListener('input', function() {
        selectedAmountInput.value = this.value;
    });
    
    // Form Validation and Submission
    const donationForm = document.getElementById('donationForm');
    
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateDonationForm()) {
            processDonation();
        }
    });
    
    function validateDonationForm() {
        let isValid = true;
        const requiredFields = donationForm.querySelectorAll('[required]');
        
        // Clear previous error states
        document.querySelectorAll('.form-error').forEach(error => error.remove());
        document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
        
        // Check required fields
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showFieldError(field, 'This field is required');
                isValid = false;
            }
        });
        
        // Validate amount
        const amount = selectedAmountInput.value;
        if (!amount || amount < 1000) {
            showFieldError(selectedAmountInput, 'Minimum donation amount is ₦1,000');
            isValid = false;
        }
        
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
    
    function processDonation() {
        // Show loading state
        const submitButton = document.querySelector('.btn-donate-submit');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitButton.disabled = true;
        
        // Collect form data
        const formData = new FormData(donationForm);
        const donationData = {
            type: formData.get('donationType'),
            cause: formData.get('cause'),
            amount: selectedAmountInput.value,
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            paymentMethod: formData.get('paymentMethod'),
            anonymous: formData.get('anonymous') === 'on',
            newsletter: formData.get('newsletter') === 'on'
        };
        
        // Simulate payment processing (replace with actual payment gateway integration)
        setTimeout(() => {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Show success message
            showDonationSuccess(donationData);
            
            // Reset form
            donationForm.reset();
            amountButtons.forEach(btn => btn.classList.remove('active'));
            customAmountDiv.style.display = 'none';
            selectedAmountInput.value = '';
            
        }, 3000);
    }
    
    function showDonationSuccess(data) {
        // Create success modal
        const modal = document.createElement('div');
        modal.className = 'donation-success-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Thank You for Your Donation!</h2>
                <p>Your generous donation of <strong>₦${parseInt(data.amount).toLocaleString()}</strong> will make a real difference in the lives of those we serve.</p>
                
                <div class="donation-details">
                    <div class="detail-item">
                        <span class="label">Donation Type:</span>
                        <span class="value">${data.type === 'one-time' ? 'One-Time' : 'Monthly'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Cause:</span>
                        <span class="value">${getCauseName(data.cause)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Payment Method:</span>
                        <span class="value">${getPaymentMethodName(data.paymentMethod)}</span>
                    </div>
                </div>
                
                <div class="next-steps">
                    <h3>What Happens Next?</h3>
                    <ul>
                        <li><i class="fas fa-envelope"></i> You'll receive a confirmation email with your receipt</li>
                        <li><i class="fas fa-chart-line"></i> We'll send you updates on how your donation is being used</li>
                        <li><i class="fas fa-heart"></i> Your contribution will directly support our programs</li>
                    </ul>
                </div>
                
                <div class="modal-actions">
                    <button class="btn-primary-3d" onclick="closeDonationModal()">
                        <span>Continue</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                    <button class="btn-secondary-3d" onclick="shareDonation()">
                        <span>Share</span>
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 100);
        
        // Close modal when clicking overlay
        modal.querySelector('.modal-overlay').addEventListener('click', closeDonationModal);
    }
    
    function getCauseName(cause) {
        const causes = {
            'general': 'General Fund - Where Most Needed',
            'education': 'Education Programs',
            'healthcare': 'Healthcare Initiatives',
            'clean-water': 'Clean Water Projects',
            'food': 'Food Distribution',
            'emergency': 'Emergency Relief',
            'orphan-support': 'Orphan & Widow Support'
        };
        return causes[cause] || cause;
    }
    
    function getPaymentMethodName(method) {
        const methods = {
            'card': 'Credit/Debit Card',
            'bank': 'Bank Transfer',
            'mobile': 'Mobile Money'
        };
        return methods[method] || method;
    }
    
    // Payment Method Selection
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Update UI based on selected payment method
            updatePaymentMethodUI(this.value);
        });
    });
    
    function updatePaymentMethodUI(method) {
        // Remove existing payment info
        const existingInfo = document.querySelector('.payment-info');
        if (existingInfo) {
            existingInfo.remove();
        }
        
        // Add payment method specific information
        const paymentSection = document.querySelector('.form-section:last-of-type');
        const infoDiv = document.createElement('div');
        infoDiv.className = 'payment-info';
        
        switch(method) {
            case 'card':
                infoDiv.innerHTML = `
                    <div class="payment-note">
                        <i class="fas fa-credit-card"></i>
                        <p>You'll be redirected to our secure payment processor to complete your donation.</p>
                    </div>
                `;
                break;
            case 'bank':
                infoDiv.innerHTML = `
                    <div class="payment-note">
                        <i class="fas fa-university"></i>
                        <p>Bank transfer details will be provided after form submission.</p>
                    </div>
                `;
                break;
            case 'mobile':
                infoDiv.innerHTML = `
                    <div class="payment-note">
                        <i class="fas fa-mobile-alt"></i>
                        <p>Mobile money payment instructions will be sent to your phone.</p>
                    </div>
                `;
                break;
        }
        
        paymentSection.appendChild(infoDiv);
    }
    
    // Initialize default payment method UI
    updatePaymentMethodUI('card');
    
    // Donation Type Change Handler
    const donationTypes = document.querySelectorAll('input[name="donationType"]');
    donationTypes.forEach(type => {
        type.addEventListener('change', function() {
            updateDonationTypeUI(this.value);
        });
    });
    
    function updateDonationTypeUI(type) {
        const submitButton = document.querySelector('.btn-donate-submit span');
        if (type === 'monthly') {
            submitButton.textContent = 'Start Monthly Donation';
        } else {
            submitButton.textContent = 'Complete Donation';
        }
    }
    
    // Real-time form validation
    const formInputs = donationForm.querySelectorAll('input, select');
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
        
        return true;
    }
});

// Global functions for modal
function closeDonationModal() {
    const modal = document.querySelector('.donation-success-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function shareDonation() {
    const shareData = {
        title: 'I just donated to Asuwaju Odusote Humanitarian Foundation',
        text: 'Join me in supporting AOHF\'s mission to transform lives through compassion and sustainable support.',
        url: window.location.origin
    };
    
    if (navigator.share) {
        navigator.share(shareData);
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
        window.open(shareUrl, '_blank');
    }
}

// Add CSS for donation form styling
const donationStyles = document.createElement('style');
donationStyles.textContent = `
    .page-header-3d.donate-header {
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        color: white;
        padding: 120px 0 80px;
        margin-top: 80px;
    }
    
    .donation-impact-3d {
        padding: 80px 0;
        background: var(--light-bg);
    }
    
    .impact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 30px;
        margin-top: 60px;
    }
    
    .impact-item {
        background: white;
        padding: 40px 30px;
        border-radius: 20px;
        text-align: center;
        box-shadow: var(--shadow-light);
        transition: all 0.3s ease;
    }
    
    .impact-item:hover {
        transform: translateY(-10px);
        box-shadow: var(--shadow-heavy);
    }
    
    .impact-icon {
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
    
    .impact-item h3 {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary-color);
        margin-bottom: 15px;
    }
    
    .donation-form-3d {
        padding: 80px 0;
    }
    
    .donation-content {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 60px;
        align-items: start;
    }
    
    .donation-form-container {
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
    
    .form-section {
        margin-bottom: 40px;
    }
    
    .form-section h3 {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 20px;
    }
    
    .donation-types,
    .payment-methods {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
    }
    
    .donation-type-card,
    .payment-method-card {
        position: relative;
        cursor: pointer;
    }
    
    .donation-type-card input,
    .payment-method-card input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }
    
    .card-content {
        background: var(--light-bg);
        padding: 20px;
        border-radius: 12px;
        text-align: center;
        transition: all 0.3s ease;
        border: 2px solid transparent;
    }
    
    .card-content i {
        font-size: 24px;
        color: var(--primary-color);
        margin-bottom: 10px;
    }
    
    .card-content span {
        display: block;
        font-weight: 600;
        color: var(--text-dark);
    }
    
    .donation-type-card input:checked + .card-content,
    .payment-method-card input:checked + .card-content {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
    }
    
    .donation-type-card input:checked + .card-content i,
    .payment-method-card input:checked + .card-content i,
    .donation-type-card input:checked + .card-content span,
    .payment-method-card input:checked + .card-content span {
        color: white;
    }
    
    .amount-buttons {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        margin-bottom: 20px;
    }
    
    .amount-btn {
        background: var(--light-bg);
        border: 2px solid transparent;
        padding: 15px;
        border-radius: 12px;
        font-weight: 600;
        color: var(--text-dark);
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .amount-btn:hover,
    .amount-btn.active {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
    }
    
    .custom-amount {
        margin-top: 20px;
    }
    
    .form-grid {
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
    .form-select {
        padding: 12px 16px;
        border: 2px solid #E5E7EB;
        border-radius: 8px;
        font-size: 16px;
        transition: all 0.3s ease;
    }
    
    .form-group input:focus,
    .form-select:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(139, 43, 139, 0.1);
    }
    
    .form-group input.error,
    .form-select.error {
        border-color: #EF4444;
    }
    
    .form-error {
        color: #EF4444;
        font-size: 14px;
        margin-top: 5px;
    }
    
    .form-options {
        display: flex;
        flex-direction: column;
        gap: 15px;
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
    
    .btn-donate-submit {
        width: 100%;
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
    
    .btn-donate-submit:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-heavy);
    }
    
    .btn-donate-submit:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }
    
    .security-note {
        text-align: center;
        color: var(--text-light);
        font-size: 14px;
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    
    .donation-info {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    
    .info-card,
    .contact-card,
    .testimonial-card {
        background: white;
        padding: 30px;
        border-radius: 20px;
        box-shadow: var(--shadow-light);
    }
    
    .info-card h3,
    .contact-card h3 {
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 20px;
    }
    
    .info-points {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .info-point {
        display: flex;
        gap: 15px;
        align-items: flex-start;
    }
    
    .info-point i {
        color: var(--primary-color);
        font-size: 20px;
        margin-top: 2px;
    }
    
    .info-point h4 {
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 5px;
    }
    
    .contact-methods {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .contact-method {
        display: flex;
        align-items: center;
        gap: 12px;
        color: var(--text-dark);
        text-decoration: none;
        padding: 12px;
        border-radius: 8px;
        transition: all 0.3s ease;
    }
    
    .contact-method:hover {
        background: var(--light-bg);
        color: var(--primary-color);
    }
    
    .testimonial-content {
        text-align: center;
    }
    
    .testimonial-content p {
        font-style: italic;
        color: var(--text-light);
        margin-bottom: 20px;
        line-height: 1.6;
    }
    
    .testimonial-author strong {
        color: var(--text-dark);
        display: block;
        margin-bottom: 5px;
    }
    
    .testimonial-author span {
        color: var(--text-light);
        font-size: 14px;
    }
    
    .other-ways-3d {
        padding: 80px 0;
        background: var(--light-bg);
    }
    
    .ways-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
        margin-top: 60px;
    }
    
    .way-card {
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        box-shadow: var(--shadow-light);
        transition: all 0.3s ease;
    }
    
    .way-card:hover {
        transform: translateY(-10px);
        box-shadow: var(--shadow-heavy);
    }
    
    .way-icon {
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
    
    .way-card h3 {
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 15px;
    }
    
    .way-card p {
        color: var(--text-light);
        margin-bottom: 20px;
        line-height: 1.6;
    }
    
    .way-link {
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: gap 0.3s ease;
    }
    
    .way-link:hover {
        gap: 12px;
    }
    
    .donation-success-modal {
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
    
    .donation-success-modal.show {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    }
    
    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border-radius: 20px;
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        text-align: center;
    }
    
    .success-icon {
        width: 100px;
        height: 100px;
        background: #10B981;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 30px;
        color: white;
        font-size: 48px;
    }
    
    .modal-content h2 {
        font-size: 2rem;
        font-weight: 700;
        color: var(--text-dark);
        margin-bottom: 20px;
    }
    
    .donation-details {
        background: var(--light-bg);
        padding: 20px;
        border-radius: 12px;
        margin: 30px 0;
        text-align: left;
    }
    
    .detail-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    
    .detail-item:last-child {
        margin-bottom: 0;
    }
    
    .detail-item .label {
        font-weight: 600;
        color: var(--text-dark);
    }
    
    .detail-item .value {
        color: var(--text-light);
    }
    
    .next-steps {
        margin: 30px 0;
        text-align: left;
    }
    
    .next-steps h3 {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 15px;
        text-align: center;
    }
    
    .next-steps ul {
        list-style: none;
        padding: 0;
    }
    
    .next-steps li {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 10px;
        color: var(--text-light);
    }
    
    .next-steps li i {
        color: var(--primary-color);
        width: 20px;
    }
    
    .modal-actions {
        display: flex;
        gap: 15px;
        justify-content: center;
        margin-top: 30px;
    }
    
    .payment-info {
        margin-top: 20px;
        padding: 15px;
        background: var(--light-bg);
        border-radius: 8px;
    }
    
    .payment-note {
        display: flex;
        align-items: center;
        gap: 12px;
        color: var(--text-light);
    }
    
    .payment-note i {
        color: var(--primary-color);
        font-size: 20px;
    }
    
    @media (max-width: 768px) {
        .donation-content {
            grid-template-columns: 1fr;
            gap: 40px;
        }
        
        .form-grid {
            grid-template-columns: 1fr;
        }
        
        .amount-buttons {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .donation-types,
        .payment-methods {
            grid-template-columns: 1fr;
        }
        
        .modal-actions {
            flex-direction: column;
        }
    }
`;

document.head.appendChild(donationStyles);
