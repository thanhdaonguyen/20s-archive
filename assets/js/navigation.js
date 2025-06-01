/**
 * Navigation Module for Thanhdao's Archive
 * Handles all navigation-related functionality
 */

const Navigation = {
    // State
    state: {
        mobileMenuOpen: false,
        currentSection: null,
        scrollPosition: 0
    },
    
    // Configuration
    config: {
        mobileBreakpoint: 768,
        scrollThreshold: 10,
        animationDuration: 200
    },
    
    // Initialize navigation
    init() {
        this.cacheElements();
        this.bindEvents();
        this.updateActiveLink();
        this.detectCurrentSection();
        console.log('Navigation module initialized');
    },
    
    // Cache DOM elements for performance
    cacheElements() {
        this.elements = {
            header: document.querySelector('.site-header'),
            menuToggle: document.querySelector('.menu-toggle'),
            navMenu: document.getElementById('navMenu'),
            navLinks: document.querySelectorAll('.nav-link'),
            body: document.body
        };
    },
    
    // Bind all event listeners
    bindEvents() {
        // Mobile menu toggle
        if (this.elements.menuToggle) {
            this.elements.menuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMobileMenu();
            });
        }
        
        // Navigation link clicks
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavClick(e, link);
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.state.mobileMenuOpen && !this.elements.header.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.mobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
        
        // Window resize handler
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 100);
        });
        
        // Scroll handler for header effects
        let scrollTimer;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                this.handleScroll();
            }, 16); // ~60fps
        });
    },
    
    // Handle navigation link clicks
    handleNavClick(e, link) {
        const href = link.getAttribute('href');
        
        // Close mobile menu on navigation
        if (this.state.mobileMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Add loading state
        this.showNavigationLoading(link);
        
        // If it's an internal link, handle smooth transition
        if (href && href.startsWith('/')) {
            // Add custom navigation logic here if needed
            // For now, let default behavior handle it
        }
    },
    
    // Toggle mobile menu
    toggleMobileMenu() {
        if (this.state.mobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    },
    
    // Open mobile menu
    openMobileMenu() {
        if (!this.elements.navMenu) return;
        
        this.elements.navMenu.classList.add('active');
        this.elements.menuToggle?.classList.add('active');
        this.elements.body.classList.add('menu-open');
        
        this.state.mobileMenuOpen = true;
        this.state.scrollPosition = window.pageYOffset;
        
        // Prevent body scroll on mobile
        this.elements.body.style.position = 'fixed';
        this.elements.body.style.top = `-${this.state.scrollPosition}px`;
        this.elements.body.style.width = '100%';
        
        // Focus management for accessibility
        const firstLink = this.elements.navMenu.querySelector('.nav-link');
        if (firstLink) {
            firstLink.focus();
        }
        
        // Announce to screen readers
        this.announceToScreenReader('Navigation menu opened');
    },
    
    // Close mobile menu
    closeMobileMenu() {
        if (!this.elements.navMenu) return;
        
        this.elements.navMenu.classList.remove('active');
        this.elements.menuToggle?.classList.remove('active');
        this.elements.body.classList.remove('menu-open');
        
        this.state.mobileMenuOpen = false;
        
        // Restore body scroll
        this.elements.body.style.position = '';
        this.elements.body.style.top = '';
        this.elements.body.style.width = '';
        window.scrollTo(0, this.state.scrollPosition);
        
        // Return focus to menu toggle
        if (this.elements.menuToggle) {
            this.elements.menuToggle.focus();
        }
        
        // Announce to screen readers
        this.announceToScreenReader('Navigation menu closed');
    },
    
    // Handle window resize
    handleResize() {
        const isMobile = window.innerWidth <= this.config.mobileBreakpoint;
        
        // Close mobile menu if resizing to desktop
        if (!isMobile && this.state.mobileMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Update menu visibility
        this.updateMenuVisibility();
    },
    
    // Handle scroll events
    handleScroll() {
        const scrollTop = window.pageYOffset;
        
        // Add/remove header shadow based on scroll position
        if (this.elements.header) {
            if (scrollTop > this.config.scrollThreshold) {
                this.elements.header.classList.add('scrolled');
            } else {
                this.elements.header.classList.remove('scrolled');
            }
        }
        
        // Update scroll direction for potential animations
        const scrollDirection = scrollTop > this.state.scrollPosition ? 'down' : 'up';
        this.elements.header?.setAttribute('data-scroll-direction', scrollDirection);
        this.state.scrollPosition = scrollTop;
    },
    
    // Update active navigation link
    updateActiveLink() {
        const currentPath = window.location.pathname;
        
        this.elements.navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            // Check if current path matches the link
            if (href && this.isCurrentPage(currentPath, href)) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    },
    
    // Check if current page matches navigation link
    isCurrentPage(currentPath, linkHref) {
        // Handle root path
        if (linkHref === '/' && currentPath === '/') {
            return true;
        }
        
        // Handle section paths
        if (linkHref !== '/' && currentPath.includes(linkHref)) {
            return true;
        }
        
        return false;
    },
    
    // Detect current section for breadcrumbs or other UI updates
    detectCurrentSection() {
        const path = window.location.pathname;
        
        if (path.includes('/journal')) {
            this.state.currentSection = 'journal';
        } else if (path.includes('/blog')) {
            this.state.currentSection = 'blog';
        } else if (path.includes('/work')) {
            this.state.currentSection = 'work';
        } else {
            this.state.currentSection = 'home';
        }
        
        // Add section class to body for styling
        this.elements.body.className = this.elements.body.className
            .replace(/section-\w+/g, '') + ` section-${this.state.currentSection}`;
    },
    
    // Update menu visibility based on screen size
    updateMenuVisibility() {
        const isMobile = window.innerWidth <= this.config.mobileBreakpoint;
        
        if (this.elements.navMenu) {
            if (isMobile) {
                this.elements.navMenu.setAttribute('aria-hidden', 
                    this.state.mobileMenuOpen ? 'false' : 'true');
            } else {
                this.elements.navMenu.removeAttribute('aria-hidden');
            }
        }
    },
    
    // Show loading state for navigation
    showNavigationLoading(link) {
        link.classList.add('loading');
        
        // Remove loading state after a short delay
        setTimeout(() => {
            link.classList.remove('loading');
        }, 500);
    },
    
    // Announce messages to screen readers
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'visually-hidden';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    },
    
    // Get current section
    getCurrentSection() {
        return this.state.currentSection;
    },
    
    // Navigate to section programmatically
    navigateToSection(section) {
        const link = document.querySelector(`.nav-link[href*="${section}"]`);
        if (link) {
            window.location.href = link.getAttribute('href');
        }
    },
    
    // Add custom navigation animations
    addNavigationAnimation(link, type = 'pulse') {
        link.classList.add(`nav-animation-${type}`);
        
        setTimeout(() => {
            link.classList.remove(`nav-animation-${type}`);
        }, this.config.animationDuration);
    }
};

// Export for use in main.js or other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navigation;
} else {
    window.Navigation = Navigation;
}