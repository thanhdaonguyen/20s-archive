/**
 * Main JavaScript for Thanhdao's Archive
 * Initializes all site functionality
 */

// Import modules
// Note: In a real setup, you'd use a bundler like Webpack or Rollup
// For now, we'll use vanilla JS with namespace pattern

// Global namespace
window.ThanhDaoArchive = {
    // Configuration
    config: {
        mobileBreakpoint: 768,
        animationDuration: 200,
        scrollOffset: 80
    },
    
    // Initialize all functionality
    init: function() {
        this.Navigation.init();
        this.Utils.init();
        this.bindEvents();
        console.log('Thanhdao Archive initialized');
    },
    
    // Bind global events
    bindEvents: function() {
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.Navigation.handleResize();
            }, 100);
        });
        
        // Handle scroll events for performance features
        let scrollTimer;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                this.Utils.handleScroll();
            }, 16); // ~60fps
        });
        
        // Handle clicks on cards for navigation
        this.bindCardClicks();
    },
    
    // Bind card click events
    bindCardClicks: function() {
        const cards = document.querySelectorAll('.card[data-url]');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                const url = card.getAttribute('data-url');
                if (url && !e.defaultPrevented) {
                    window.location.href = url;
                }
            });
            
            // Add keyboard support
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const url = card.getAttribute('data-url');
                    if (url) {
                        window.location.href = url;
                    }
                }
            });
        });
    }
};

// Navigation module
window.ThanhDaoArchive.Navigation = {
    mobileMenuOpen: false,
    
    init: function() {
        this.bindEvents();
        this.updateActiveLink();
    },
    
    bindEvents: function() {
        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const nav = document.querySelector('.main-navigation');
            if (nav && this.mobileMenuOpen && !nav.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    },
    
    toggleMobileMenu: function() {
        if (this.mobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    },
    
    openMobileMenu: function() {
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navMenu) {
            navMenu.classList.add('active');
            this.mobileMenuOpen = true;
            
            // Animate hamburger
            if (menuToggle) {
                menuToggle.classList.add('active');
            }
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
    },
    
    closeMobileMenu: function() {
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navMenu) {
            navMenu.classList.remove('active');
            this.mobileMenuOpen = false;
            
            // Reset hamburger
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    },
    
    handleResize: function() {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > window.ThanhDaoArchive.config.mobileBreakpoint) {
            this.closeMobileMenu();
        }
    },
    
    updateActiveLink: function() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href && currentPath.includes(href) && href !== '/') {
                link.classList.add('active');
            }
        });
    }
};

// Utility functions
window.ThanhDaoArchive.Utils = {
    init: function() {
        this.setupSmoothScrolling();
        this.setupLazyLoading();
        this.setupAccessibility();
    },
    
    // Smooth scrolling for anchor links
    setupSmoothScrolling: function() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - window.ThanhDaoArchive.config.scrollOffset;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },
    
    // Lazy loading for images
    setupLazyLoading: function() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        
                        if (src) {
                            img.src = src;
                            img.classList.remove('lazy');
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    }
                });
            });
            
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    },
    
    // Accessibility enhancements
    setupAccessibility: function() {
        // Add role and tabindex to clickable cards
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            if (card.getAttribute('data-url')) {
                card.setAttribute('role', 'button');
                card.setAttribute('tabindex', '0');
                card.style.cursor = 'pointer';
            }
        });
        
        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView();
                }
            });
        }
    },
    
    // Handle scroll events
    handleScroll: function() {
        const scrollTop = window.pageYOffset;
        const header = document.querySelector('.site-header');
        
        // Add shadow to header when scrolling
        if (header) {
            if (scrollTop > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    },
    
    // Format dates consistently
    formatDate: function(dateString, format = 'long') {
        const date = new Date(dateString);
        const options = {
            long: { year: 'numeric', month: 'long', day: 'numeric' },
            short: { year: 'numeric', month: 'short', day: 'numeric' },
            relative: { year: 'numeric', month: 'short', day: 'numeric' }
        };
        
        return date.toLocaleDateString('en-US', options[format]);
    },
    
    // Debounce utility
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            
            if (callNow) func.apply(context, args);
        };
    },
    
    // Show/hide loading states
    showLoading: function(element) {
        if (element) {
            element.classList.add('loading');
            element.setAttribute('aria-busy', 'true');
        }
    },
    
    hideLoading: function(element) {
        if (element) {
            element.classList.remove('loading');
            element.setAttribute('aria-busy', 'false');
        }
    }
};

// Gallery functionality for journal images
window.ThanhDaoArchive.Gallery = {
    currentIndex: 0,
    images: [],
    
    init: function() {
        this.bindEvents();
        this.setupKeyboardNavigation();
    },
    
    bindEvents: function() {
        // Journal image clicks
        const journalImages = document.querySelectorAll('.journal-image');
        journalImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                this.openLightbox(img, index);
            });
        });
    },
    
    openLightbox: function(img, index) {
        this.currentIndex = index;
        this.images = Array.from(document.querySelectorAll('.journal-image'));
        
        // Create lightbox overlay
        const overlay = this.createLightboxOverlay(img);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        
        // Show with animation
        requestAnimationFrame(() => {
            overlay.classList.add('active');
        });
    },
    
    createLightboxOverlay: function(img) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                <img src="${img.src}" alt="${img.alt}" class="lightbox-image">
                <div class="lightbox-controls">
                    <button class="lightbox-prev" aria-label="Previous image">‹</button>
                    <span class="lightbox-counter">${this.currentIndex + 1} / ${this.images.length}</span>
                    <button class="lightbox-next" aria-label="Next image">›</button>
                </div>
            </div>
        `;
        
        // Bind lightbox events
        this.bindLightboxEvents(overlay);
        
        return overlay;
    },
    
    bindLightboxEvents: function(overlay) {
        // Close button
        const closeBtn = overlay.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => this.closeLightbox(overlay));
        
        // Navigation buttons
        const prevBtn = overlay.querySelector('.lightbox-prev');
        const nextBtn = overlay.querySelector('.lightbox-next');
        
        prevBtn.addEventListener('click', () => this.showPrevious(overlay));
        nextBtn.addEventListener('click', () => this.showNext(overlay));
        
        // Click outside to close
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeLightbox(overlay);
            }
        });
        
        // Update navigation state
        this.updateNavigationState(overlay);
    },
    
    showPrevious: function(overlay) {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateLightboxImage(overlay);
        }
    },
    
    showNext: function(overlay) {
        if (this.currentIndex < this.images.length - 1) {
            this.currentIndex++;
            this.updateLightboxImage(overlay);
        }
    },
    
    updateLightboxImage: function(overlay) {
        const img = overlay.querySelector('.lightbox-image');
        const counter = overlay.querySelector('.lightbox-counter');
        const currentImg = this.images[this.currentIndex];
        
        img.src = currentImg.src;
        img.alt = currentImg.alt;
        counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
        
        this.updateNavigationState(overlay);
    },
    
    updateNavigationState: function(overlay) {
        const prevBtn = overlay.querySelector('.lightbox-prev');
        const nextBtn = overlay.querySelector('.lightbox-next');
        
        prevBtn.disabled = this.currentIndex === 0;
        nextBtn.disabled = this.currentIndex === this.images.length - 1;
    },
    
    closeLightbox: function(overlay) {
        overlay.classList.remove('active');
        
        setTimeout(() => {
            document.body.removeChild(overlay);
            document.body.style.overflow = '';
        }, 200);
    },
    
    setupKeyboardNavigation: function() {
        document.addEventListener('keydown', (e) => {
            const lightbox = document.querySelector('.lightbox-overlay.active');
            if (!lightbox) return;
            
            switch (e.key) {
                case 'Escape':
                    this.closeLightbox(lightbox);
                    break;
                case 'ArrowLeft':
                    this.showPrevious(lightbox);
                    break;
                case 'ArrowRight':
                    this.showNext(lightbox);
                    break;
            }
        });
    }
};

// Search functionality (for future enhancement)
window.ThanhDaoArchive.Search = {
    init: function() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            this.bindSearchEvents(searchInput);
        }
    },
    
    bindSearchEvents: function(input) {
        const debouncedSearch = window.ThanhDaoArchive.Utils.debounce(
            this.performSearch.bind(this), 
            300
        );
        
        input.addEventListener('input', debouncedSearch);
    },
    
    performSearch: function(e) {
        const query = e.target.value.toLowerCase();
        const searchResults = document.querySelector('.search-results');
        
        if (query.length < 2) {
            if (searchResults) {
                searchResults.innerHTML = '';
            }
            return;
        }
        
        // Simple client-side search implementation
        // In a real implementation, you might use a search index
        console.log('Searching for:', query);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.ThanhDaoArchive.init();
    
    // Initialize gallery if journal images exist
    if (document.querySelector('.journal-image')) {
        window.ThanhDaoArchive.Gallery.init();
    }
    
    // Initialize search if search input exists
    if (document.querySelector('.search-input')) {
        window.ThanhDaoArchive.Search.init();
    }
});