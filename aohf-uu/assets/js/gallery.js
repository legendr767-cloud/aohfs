// Gallery JavaScript for AOHF Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Gallery filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    // Re-trigger AOS animation
                    item.classList.add('aos-animate');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('aos-animate');
                }
            });
        });
    });
    
    // Lightbox functionality
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    
    // Video player functionality
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoType = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            playVideo(videoType);
        });
    });
});

// Global functions
function openLightbox(button) {
    const galleryCard = button.closest('.gallery-card');
    const title = galleryCard.querySelector('h3').textContent;
    const description = galleryCard.querySelector('p').textContent;
    
    // Update lightbox content
    document.getElementById('lightboxTitle').textContent = title;
    document.getElementById('lightboxDescription').textContent = description;
    
    // Show lightbox
    const lightboxModal = document.getElementById('lightboxModal');
    lightboxModal.classList.add('show');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightboxModal = document.getElementById('lightboxModal');
    lightboxModal.classList.remove('show');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

function playVideo(videoType) {
    // Create video modal
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    videoModal.innerHTML = `
        <div class="video-overlay" onclick="closeVideoModal()"></div>
        <div class="video-container">
            <button class="video-close" onclick="closeVideoModal()">
                <i class="fas fa-times"></i>
            </button>
            <div class="video-content">
                <div class="video-placeholder">
                    <i class="fas fa-play-circle"></i>
                    <h3>${getVideoTitle(videoType)}</h3>
                    <p>Video would play here in a real implementation</p>
                    <p><em>This is a placeholder for the ${videoType} video. In a real website, this would embed the actual video player.</em></p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(videoModal);
    
    // Show modal
    setTimeout(() => {
        videoModal.classList.add('show');
    }, 100);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const videoModal = document.querySelector('.video-modal');
    if (videoModal) {
        videoModal.classList.remove('show');
        setTimeout(() => {
            videoModal.remove();
            // Restore body scroll
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function getVideoTitle(videoType) {
    const titles = {
        'overview': 'AOHF Program Overview',
        'success': 'From Orphan to Doctor - Success Story',
        'water': 'Clean Water Transforms Village'
    };
    return titles[videoType] || 'Video';
}

// Add CSS for video modal
const videoModalStyles = document.createElement('style');
videoModalStyles.textContent = `
    .video-modal {
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
    
    .video-modal.show {
        opacity: 1;
        visibility: visible;
    }
    
    .video-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        cursor: pointer;
    }
    
    .video-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 15px;
        max-width: 90vw;
        max-height: 90vh;
        overflow: hidden;
        min-width: 600px;
        min-height: 400px;
    }
    
    .video-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        z-index: 10001;
        transition: all 0.3s ease;
    }
    
    .video-close:hover {
        background: rgba(0, 0, 0, 0.9);
    }
    
    .video-content {
        padding: 40px;
        text-align: center;
    }
    
    .video-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 300px;
        color: var(--text-dark);
    }
    
    .video-placeholder i {
        font-size: 64px;
        color: var(--primary-color);
        margin-bottom: 20px;
    }
    
    .video-placeholder h3 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 15px;
        color: var(--text-dark);
    }
    
    .video-placeholder p {
        color: var(--text-light);
        margin-bottom: 10px;
        line-height: 1.6;
    }
    
    .video-placeholder em {
        font-size: 14px;
        color: var(--text-light);
        opacity: 0.8;
    }
    
    @media (max-width: 768px) {
        .video-container {
            min-width: 90vw;
            min-height: 300px;
        }
        
        .video-content {
            padding: 20px;
        }
        
        .video-placeholder {
            min-height: 200px;
        }
        
        .video-placeholder i {
            font-size: 48px;
        }
        
        .video-placeholder h3 {
            font-size: 1.2rem;
        }
    }
`;

document.head.appendChild(videoModalStyles);
