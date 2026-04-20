// Success Stories JavaScript for AOHF Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Tab functionality for stories by category
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab + '-tab');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Story sharing form
    const storyForm = document.getElementById('storyForm');
    
    if (storyForm) {
        storyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateStoryForm()) {
                submitStoryForm();
            }
        });
    }
    
    function validateStoryForm() {
        let isValid = true;
        const requiredFields = storyForm.querySelectorAll('[required]');
        
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
        const email = document.getElementById('storyEmail');
        if (email.value && !isValidEmail(email.value)) {
            showFieldError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate story content length
        const storyContent = document.getElementById('storyContent');
        if (storyContent.value.trim().length < 50) {
            showFieldError(storyContent, 'Please provide at least 50 characters for your story');
            isValid = false;
        }
        
        // Validate consent checkbox
        const consent = document.querySelector('input[name="storyConsent"]');
        if (!consent.checked) {
            showFieldError(consent, 'You must consent to sharing your story');
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
    
    function submitStoryForm() {
        const submitButton = storyForm.querySelector('.btn-submit-story');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Submitting Story...</span>';
        submitButton.disabled = true;
        
        // Collect form data
        const formData = new FormData(storyForm);
        const storyData = {
            name: formData.get('storyName'),
            email: formData.get('storyEmail'),
            program: formData.get('storyProgram'),
            content: formData.get('storyContent'),
            consent: formData.get('storyConsent') === 'on'
        };
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Show success message
            showStorySuccess(storyData);
            
            // Reset form
            storyForm.reset();
            
        }, 2000);
    }
    
    function showStorySuccess(data) {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'story-success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="success-text">
                    <h3>Story Submitted Successfully!</h3>
                    <p>Thank you for sharing your story, ${data.name}. Our team will review it and may feature it to inspire others.</p>
                </div>
                <button class="close-notification" onclick="closeStoryNotification(this)">
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
                closeStoryNotification(notification.querySelector('.close-notification'));
            }
        }, 5000);
    }
    
    // Read more functionality for featured stories
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // This would typically open a modal or navigate to a full story page
            showFullStoryModal(this);
        });
    });
    
    function showFullStoryModal(button) {
        const storyCard = button.closest('.featured-story-card');
        const title = storyCard.querySelector('h3').textContent;
        const author = storyCard.querySelector('.story-author').textContent;
        const excerpt = storyCard.querySelector('p').textContent;
        
        // Create modal with full story (this would typically fetch from API)
        const modal = document.createElement('div');
        modal.className = 'story-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close" onclick="closeStoryModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="story-author-info">
                        <strong>${author}</strong>
                    </div>
                    <div class="story-full-content">
                        <p>${excerpt}</p>
                        <p><em>This is where the full story would be displayed. In a real implementation, this would fetch the complete story content from your database.</em></p>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary-3d" onclick="shareStory('${title}')">
                        <span>Share Story</span>
                        <i class="fas fa-share-alt"></i>
                    </button>
                    <button class="btn-primary-3d" onclick="closeStoryModal()">
                        <span>Close</span>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => {
            modal.classList.add('show');
        }, 100);
        
        // Close on overlay click
        modal.querySelector('.modal-overlay').addEventListener('click', closeStoryModal);
    }
    
    // Character counter for story content
    const storyContent = document.getElementById('storyContent');
    if (storyContent) {
        const counterDiv = document.createElement('div');
        counterDiv.className = 'character-counter';
        counterDiv.textContent = '0 characters (minimum 50)';
        storyContent.parentNode.appendChild(counterDiv);
        
        storyContent.addEventListener('input', function() {
            const length = this.value.length;
            counterDiv.textContent = `${length} characters (minimum 50)`;
            
            if (length < 50 && length > 0) {
                counterDiv.style.color = '#EF4444';
            } else if (length >= 50) {
                counterDiv.style.color = '#10B981';
            } else {
                counterDiv.style.color = '#6B7280';
            }
        });
    }
    
    // Real-time form validation
    const formInputs = storyForm ? storyForm.querySelectorAll('input, select, textarea') : [];
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
        
        if (field.id === 'storyContent' && field.value.trim().length > 0 && field.value.trim().length < 50) {
            showFieldError(field, 'Please provide at least 50 characters for your story');
            return false;
        }
        
        return true;
    }
    
    // Smooth scrolling for timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
});

// Global functions
function closeStoryNotification(button) {
    const notification = button.closest('.story-success-notification');
    if (notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

function closeStoryModal() {
    const modal = document.querySelector('.story-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function shareStory(title) {
    const shareData = {
        title: `Inspiring Story: ${title}`,
        text: `Read this inspiring success story from Asuwaju Odusote Humanitarian Foundation`,
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

// Add CSS for success stories page
const storiesStyles = document.createElement('style');
storiesStyles.textContent = `
    .page-header-3d.stories-header {
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        color: white;
        padding: 120px 0 80px;
        margin-top: 80px;
    }
    
    .stories-overview-3d {
        padding: 80px 0;
    }
    
    .impact-numbers {
        display: flex;
        gap: 40px;
        margin-top: 30px;
    }
    
    .number-item {
        text-align: center;
    }
    
    .number {
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--primary-color);
        margin-bottom: 8px;
    }
    
    .label {
        font-size: 14px;
        color: var(--text-light);
    }
    
    .featured-stories-3d {
        padding: 80px 0;
        background: var(--light-bg);
    }
    
    .featured-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 40px;
        margin-top: 60px;
    }
    
    .featured-story-card {
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: var(--shadow-light);
        transition: all 0.3s ease;
    }
    
    .featured-story-card:hover {
        transform: translateY(-10px);
        box-shadow: var(--shadow-heavy);
    }
    
    .story-image {
        position: relative;
        height: 200px;
    }
    
    .story-category {
        position: absolute;
        top: 15px;
        right: 15px;
        background: var(--primary-color);
        color: white;
        padding: 5px 12px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 600;
    }
    
    .story-content {
        padding: 30px;
    }
    
    .story-content h3 {
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 15px;
    }
    
    .story-meta {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 15px;
    }
    
    .story-author {
        font-weight: 600;
        color: var(--primary-color);
    }
    
    .story-location {
        font-size: 14px;
        color: var(--text-light);
    }
    
    .story-content p {
        color: var(--text-light);
        line-height: 1.6;
        margin-bottom: 20px;
    }
    
    .story-impact {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
    }
    
    .impact-stat {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: var(--text-light);
    }
    
    .impact-stat i {
        color: var(--primary-color);
    }
    
    .read-more-btn {
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: gap 0.3s ease;
    }
    
    .read-more-btn:hover {
        gap: 12px;
    }
    
    .stories-categories-3d {
        padding: 80px 0;
    }
    
    .categories-tabs {
        margin-top: 60px;
    }
    
    .tab-buttons {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 40px;
        flex-wrap: wrap;
    }
    
    .tab-btn {
        background: var(--light-bg);
        border: 2px solid transparent;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: 600;
        color: var(--text-dark);
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .tab-btn:hover,
    .tab-btn.active {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
    }
    
    .tab-content {
        display: none;
    }
    
    .tab-content.active {
        display: block;
    }
    
    .impact-timeline-3d {
        padding: 80px 0;
        background: var(--light-bg);
    }
    
    .timeline-container {
        position: relative;
        margin-top: 60px;
    }
    
    .timeline-container::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 3px;
        background: var(--primary-color);
        transform: translateX(-50%);
    }
    
    .timeline-item {
        display: flex;
        align-items: center;
        margin-bottom: 60px;
        position: relative;
    }
    
    .timeline-item:nth-child(odd) {
        flex-direction: row;
    }
    
    .timeline-item:nth-child(even) {
        flex-direction: row-reverse;
    }
    
    .timeline-year {
        width: 100px;
        height: 100px;
        background: var(--gradient-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
        font-weight: 700;
        position: relative;
        z-index: 2;
        flex-shrink: 0;
    }
    
    .timeline-content {
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: var(--shadow-light);
        margin: 0 40px;
        flex: 1;
        max-width: 400px;
    }
    
    .timeline-content h3 {
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--text-dark);
        margin-bottom: 15px;
    }
    
    .timeline-content p {
        color: var(--text-light);
        line-height: 1.6;
        margin-bottom: 15px;
    }
    
    .timeline-stats {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }
    
    .timeline-stats span {
        background: var(--light-bg);
        padding: 5px 12px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 600;
        color: var(--primary-color);
    }
    
    .share-story-3d {
        padding: 80px 0;
    }
    
    .share-content {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
    }
    
    .share-header {
        margin-bottom: 40px;
    }
    
    .share-header h2 {
        font-size: 2rem;
        font-weight: 700;
        color: var(--text-dark);
        margin-bottom: 15px;
    }
    
    .share-form-container {
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: var(--shadow-medium);
        text-align: left;
    }
    
    .story-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .btn-submit-story {
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
    
    .btn-submit-story:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-heavy);
    }
    
    .story-success-notification {
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
    
    .story-success-notification.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .story-modal {
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
    
    .story-modal.show {
        opacity: 1;
        visibility: visible;
    }
    
    .story-modal .modal-content {
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
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #E5E7EB;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: var(--text-light);
        transition: color 0.3s ease;
    }
    
    .modal-close:hover {
        color: var(--text-dark);
    }
    
    .story-author-info {
        margin-bottom: 20px;
        color: var(--primary-color);
        font-size: 1.1rem;
    }
    
    .story-full-content p {
        line-height: 1.7;
        margin-bottom: 20px;
        color: var(--text-dark);
    }
    
    .modal-actions {
        display: flex;
        gap: 15px;
        justify-content: center;
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #E5E7EB;
    }
    
    @media (max-width: 768px) {
        .featured-grid {
            grid-template-columns: 1fr;
        }
        
        .impact-numbers {
            justify-content: center;
        }
        
        .tab-buttons {
            gap: 10px;
        }
        
        .tab-btn {
            padding: 8px 16px;
            font-size: 14px;
        }
        
        .timeline-container::before {
            left: 30px;
        }
        
        .timeline-item {
            flex-direction: row !important;
            padding-left: 80px;
        }
        
        .timeline-year {
            position: absolute;
            left: 0;
            width: 60px;
            height: 60px;
            font-size: 1rem;
        }
        
        .timeline-content {
            margin: 0;
            margin-left: 20px;
        }
        
        .modal-actions {
            flex-direction: column;
        }
    }
`;

document.head.appendChild(storiesStyles);
