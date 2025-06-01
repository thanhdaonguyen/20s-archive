/**
 * Gallery Module for Thanhdao's Archive
 * Handles image galleries and lightbox functionality
 */

const Gallery = {
    // State
    state: {
        isOpen: false,
        currentIndex: 0,
        images: [],
        touchStartX: 0,
        touchEndX: 0
    },
    
    // Configuration
    config: {
        animationDuration: 200,
        swipeThreshold: 50,
        keyboardEnabled: true,
        touchEnabled: true,
        autoClose: false,
        preloadNext: true
    },
    
    // Initialize gallery
    init() {
        this.cacheElements();
        this.bindEvents();
        this.setupPreloading();
        console.log('Gallery module initialized');
    },
    
    // Cache DOM elements
    cacheElements() {
        this.elements = {
            journalImages: document.querySelectorAll('.journal-image'),
            blogImages: document.querySelectorAll('.blog-image'),
            galleryImages: document.querySelectorAll('.gallery-image'),
            body: document.body
        };
        
        // Combine all gallery images
        this.allImages = [
            ...this.elements.journalImages,
            ...this.elements.blogImages,
            ...this.elements.galleryImages
        ];
    },
    
    // Bind event listeners
    bindEvents() {
        // Image click events
        this.allImages.forEach((img, index) => {
            img.addEventListener('click', (e) => {
                e.preventDefault();
                this.openLightbox(index);
            });
            
            // Keyboard support for images with tabindex
            img.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openLightbox(index);
                }
            });
            
            // Add cursor pointer and tabindex for accessibility
            img.style.cursor = 'pointer';
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.setAttribute('aria-label', `Open image in lightbox: ${img.alt || 'Image'}`);
        });
        
        // Global keyboard events
        document.addEventListener('keydown', (e) => {
            if (!this.state.isOpen || !this.config.keyboardEnabled) return;
            
            switch (e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.showPrevious();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.showNext();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.showFirst();
                    break;
                case 'End':
                    e.preventDefault();
                    this.showLast();
                    break;
            }
        });
    },
    
    // Open lightbox
    openLightbox(index) {
        this.state.currentIndex = index;
        this.state.images = this.allImages;
        this.state.isOpen = true;
        
        // Create lightbox
        const lightbox = this.createLightbox();
        this.elements.body.appendChild(lightbox);
        
        // Prevent body scroll
        this.elements.body.classList.add('lightbox-open');
        
        // Show lightbox with animation
        requestAnimationFrame(() => {
            lightbox.classList.add('active');
        });
        
        // Set focus for accessibility
        const closeButton = lightbox.querySelector('.lightbox-close');
        if (closeButton) {
            closeButton.focus();
        }
        
        // Preload adjacent images
        if (this.config.preloadNext) {
            this.preloadAdjacentImages();
        }
        
        // Announce to screen readers
        this.announceToScreenReader(`Image ${index + 1} of ${this.state.images.length} opened in lightbox`);
    },
    
    // Create lightbox DOM structure
    createLightbox() {
        const currentImg = this.state.images[this.state.currentIndex];
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'Image lightbox');
        
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <header class="lightbox-header">
                    <button class="lightbox-close" aria-label="Close lightbox" type="button">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </header>
                
                <div class="lightbox-main">
                    <img src="${currentImg.src}" 
                         alt="${currentImg.alt || 'Image'}" 
                         class="lightbox-image"
                         loading="eager">
                </div>
                
                <footer class="lightbox-footer">
                    <div class="lightbox-controls">
                        <button class="lightbox-prev" 
                                aria-label="Previous image" 
                                type="button"
                                ${this.state.currentIndex === 0 ? 'disabled' : ''}>
                            <span aria-hidden="true">‹</span>
                        </button>
                        
                        <span class="lightbox-counter" aria-live="polite">
                            ${this.state.currentIndex + 1} / ${this.state.images.length}
                        </span>
                        
                        <button class="lightbox-next" 
                                aria-label="Next image" 
                                type="button"
                                ${this.state.currentIndex === this.state.images.length - 1 ? 'disabled' : ''}>
                            <span aria-hidden="true">›</span>
                        </button>
                    </div>
                    
                    ${currentImg.alt ? `<div class="lightbox-caption">${currentImg.alt}</div>` : ''}
                </footer>
            </div>
        `;
        
        // Bind lightbox events
        this.bindLightboxEvents(lightbox);
        
        return lightbox;
    },
    
    // Bind lightbox-specific events
    bindLightboxEvents(lightbox) {
        // Close button
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => this.closeLightbox());
        
        // Navigation buttons
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        prevBtn.addEventListener('click', () => this.showPrevious());
        nextBtn.addEventListener('click', () => this.showNext());
        
        // Click outside to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });
        
        // Touch events for mobile swiping
        if (this.config.touchEnabled) {
            this.bindTouchEvents(lightbox);
        }
        
        // Prevent image dragging
        const img = lightbox.querySelector('.lightbox-image');
        img.addEventListener('dragstart', (e) => e.preventDefault());
        
        // Handle image load errors
        img.addEventListener('error', () => {
            img.alt = 'Image failed to load';
            img.classList.add('error');
        });
    },
    
    // Bind touch events for mobile swiping
    bindTouchEvents(lightbox) {
        const touchArea = lightbox.querySelector('.lightbox-main');
        
        touchArea.addEventListener('touchstart', (e) => {
            this.state.touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        touchArea.addEventListener('touchend', (e) => {
            this.state.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        }, { passive: true });
        
        // Prevent scrolling while swiping
        touchArea.addEventListener('touchmove', (e) => {
            e.preventDefault();
        });
    },
    
    // Handle swipe gestures
    handleSwipe() {
        const swipeDistance = this.state.touchStartX - this.state.touchEndX;
        
        if (Math.abs(swipeDistance) > this.config.swipeThreshold) {
            if (swipeDistance > 0) {
                // Swiped left - show next
                this.showNext();
            } else {
                // Swiped right - show previous
                this.showPrevious();
            }
        }
    },
    
    // Show previous image
    showPrevious() {
        if (this.state.currentIndex > 0) {
            this.state.currentIndex--;
            this.updateLightboxImage();
        }
    },
    
    // Show next image
    showNext() {
        if (this.state.currentIndex < this.state.images.length - 1) {
            this.state.currentIndex++;
            this.updateLightboxImage();
        }
    },
    
    // Show first image
    showFirst() {
        this.state.currentIndex = 0;
        this.updateLightboxImage();
    },
    
    // Show last image
    showLast() {
        this.state.currentIndex = this.state.images.length - 1;
        this.updateLightboxImage();
    },
    
    // Update lightbox image
    updateLightboxImage() {
        const lightbox = document.querySelector('.lightbox-overlay');
        if (!lightbox) return;
        
        const img = lightbox.querySelector('.lightbox-image');
        const counter = lightbox.querySelector('.lightbox-counter');
        const caption = lightbox.querySelector('.lightbox-caption');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        const currentImg = this.state.images[this.state.currentIndex];
        
        // Add loading state
        img.classList.add('loading');
        
        // Update image with fade effect
        img.style.opacity = '0';
        
        setTimeout(() => {
            img.src = currentImg.src;
            img.alt = currentImg.alt || 'Image';
            
            // Update counter
            counter.textContent = `${this.state.currentIndex + 1} / ${this.state.images.length}`;
            
            // Update caption
            if (caption) {
                if (currentImg.alt) {
                    caption.textContent = currentImg.alt;
                    caption.style.display = 'block';
                } else {
                    caption.style.display = 'none';
                }
            }
            
            // Update navigation buttons
            prevBtn.disabled = this.state.currentIndex === 0;
            nextBtn.disabled = this.state.currentIndex === this.state.images.length - 1;
            
            // Fade in new image
            img.style.opacity = '1';
            img.classList.remove('loading');
            
        }, 100);
        
        // Preload adjacent images
        if (this.config.preloadNext) {
            this.preloadAdjacentImages();
        }
        
        // Announce change to screen readers
        this.announceToScreenReader(`Image ${this.state.currentIndex + 1} of ${this.state.images.length}`);
    },
    
    // Close lightbox
    closeLightbox() {
        const lightbox = document.querySelector('.lightbox-overlay');
        if (!lightbox) return;
        
        this.state.isOpen = false;
        
        // Animate out
        lightbox.classList.remove('active');
        
        setTimeout(() => {
            // Remove lightbox
            if (lightbox.parentNode) {
                lightbox.parentNode.removeChild(lightbox);
            }
            
            // Restore body scroll
            this.elements.body.classList.remove('lightbox-open');
            
            // Return focus to the clicked image
            const originalImage = this.state.images[this.state.currentIndex];
            if (originalImage) {
                originalImage.focus();
            }
            
        }, this.config.animationDuration);
        
        // Announce to screen readers
        this.announceToScreenReader('Lightbox closed');
    },
    
    // Preload adjacent images for better performance
    preloadAdjacentImages() {
        const indicesToPreload = [
            this.state.currentIndex - 1,
            this.state.currentIndex + 1
        ].filter(index => index >= 0 && index < this.state.images.length);
        
        indicesToPreload.forEach(index => {
            const img = this.state.images[index];
            if (img && !img.dataset.preloaded) {
                const preloadImg = new Image();
                preloadImg.src = img.src;
                img.dataset.preloaded = 'true';
            }
        });
    },
    
    // Setup initial preloading
    setupPreloading() {
        // Preload first few images for better initial experience
        const initialPreloadCount = Math.min(3, this.allImages.length);
        
        for (let i = 0; i < initialPreloadCount; i++) {
            if (this.allImages[i] && !this.allImages[i].dataset.preloaded) {
                const preloadImg = new Image();
                preloadImg.src = this.allImages[i].src;
                this.allImages[i].dataset.preloaded = 'true';
            }
        }
    },
    
    // Announce messages to screen readers
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'visually-hidden';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            if (announcement.parentNode) {
                announcement.parentNode.removeChild(announcement);
            }
        }, 1000);
    },
    
    // Get current gallery state
    getState() {
        return { ...this.state };
    },
    
    // Navigate to specific image
    navigateToImage(index) {
        if (index >= 0 && index < this.state.images.length) {
            this.state.currentIndex = index;
            if (this.state.isOpen) {
                this.updateLightboxImage();
            } else {
                this.openLightbox(index);
            }
        }
    },
    
    // Add new images to gallery dynamically
    addImages(images) {
        const newImages = Array.from(images);
        this.allImages = [...this.allImages, ...newImages];
        
        // Bind events to new images
        newImages.forEach((img, index) => {
            const globalIndex = this.allImages.length - newImages.length + index;
            
            img.addEventListener('click', (e) => {
                e.preventDefault();
                this.openLightbox(globalIndex);
            });
            
            img.style.cursor = 'pointer';
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.setAttribute('aria-label', `Open image in lightbox: ${img.alt || 'Image'}`);
        });
    },
    
    // Configure gallery options
    configure(options) {
        this.config = { ...this.config, ...options };
    },
    
    // Destroy gallery (cleanup)
    destroy() {
        // Close lightbox if open
        if (this.state.isOpen) {
            this.closeLightbox();
        }
        
        // Remove event listeners
        this.allImages.forEach(img => {
            img.style.cursor = '';
            img.removeAttribute('tabindex');
            img.removeAttribute('role');
            img.removeAttribute('aria-label');
        });
        
        // Reset state
        this.state = {
            isOpen: false,
            currentIndex: 0,
            images: [],
            touchStartX: 0,
            touchEndX: 0
        };
        
        console.log('Gallery module destroyed');
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Gallery;
} else {
    window.Gallery = Gallery;
}