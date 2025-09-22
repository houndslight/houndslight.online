// Modern Portfolio JavaScript - Enhanced UX & Performance
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupPerformanceOptimizations();
        this.setupAccessibilityFeatures();
    }

    setupEventListeners() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        }

        // Navigation toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => this.toggleMobileMenu(hamburger, navMenu));
        }

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu(hamburger, navMenu));
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger?.contains(e.target) && !navMenu?.contains(e.target)) {
                this.closeMobileMenu(hamburger, navMenu);
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());

        // Handle scroll events
        window.addEventListener('scroll', () => this.handleScroll());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
    }

    initializeComponents() {
        this.initializeScrollAnimations();
        this.initializeCounters();
        this.initializeLazyLoading();
        this.initializeFormValidation();
        this.initializeTooltips();
        this.initializePreloader();
    }

    toggleMobileMenu(hamburger, navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        // Update ARIA attributes for accessibility
        const isOpen = navMenu.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isOpen);
        navMenu.setAttribute('aria-hidden', !isOpen);
    }

    closeMobileMenu(hamburger, navMenu) {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
        }
    }

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            this.closeMobileMenu(
                document.querySelector('.hamburger'),
                document.querySelector('.nav-menu')
            );
        }
    }

    handleScroll() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            // Add/remove scrolled class based on scroll position
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Update active navigation link
        this.updateActiveNavigation();
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');

                    // Trigger counter animations
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.animate-on-scroll, .stat-number');
        animatedElements.forEach(el => observer.observe(el));
    }

    setupSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));

                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    initializeScrollAnimations() {
        // Add CSS classes for scroll animations
        const elementsToAnimate = document.querySelectorAll(
            '.about-text, .about-highlights, .skill-category, .timeline-item, .project-card, .process-step, .contact-item'
        );

        elementsToAnimate.forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    initializeCounters() {
        const counters = document.querySelectorAll('.stat-number');

        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const suffix = counter.textContent.replace(/\d/g, '');

            counter.setAttribute('data-target', target);
            counter.setAttribute('data-suffix', suffix);
            counter.textContent = '0' + suffix;
        });
    }

    animateCounter(counter) {
        if (counter.classList.contains('animated')) return;

        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        counter.classList.add('animated');

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }

    initializeLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    initializeFormValidation() {
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });

            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const isRequired = field.hasAttribute('required');

        // Clear previous errors
        this.clearFieldError(field);

        // Check required fields
        if (isRequired && !value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }

        // Email validation
        if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        // Phone validation
        if (fieldType === 'tel' && value) {
            const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
        }

        return true;
    }

    showFieldError(field, message) {
        field.classList.add('error');

        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }

        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    initializeTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');

        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => this.showTooltip(e));
            element.addEventListener('mouseleave', () => this.hideTooltip());
            element.addEventListener('focus', (e) => this.showTooltip(e));
            element.addEventListener('blur', () => this.hideTooltip());
        });
    }

    showTooltip(e) {
        const text = e.target.getAttribute('data-tooltip');
        if (!text) return;

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;

        document.body.appendChild(tooltip);

        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    }

    hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    initializePreloader() {
        // Create preloader
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = '<div class="preloader-spinner"></div>';

        document.body.appendChild(preloader);

        // Hide preloader when page is loaded
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.remove();
            }, 300);
        });
    }

    setupPerformanceOptimizations() {
        // Debounce scroll events
        this.handleScroll = this.debounce(this.handleScroll.bind(this), 16);

        // Optimize images loading
        this.optimizeImages();

        // Setup service worker for caching (if supported)
        if ('serviceWorker' in navigator) {
            this.registerServiceWorker();
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    optimizeImages() {
        const images = document.querySelectorAll('img');

        images.forEach(img => {
            // Add loading attribute for native lazy loading
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            // Add decode for better performance
            if (img.complete) {
                img.decode();
            }
        });
    }

    async registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registered successfully:', registration);
        } catch (error) {
            console.log('Service Worker registration failed:', error);
        }
    }

    setupAccessibilityFeatures() {
        // Skip to main content link
        this.addSkipLink();

        // Focus management
        this.setupFocusManagement();

        // ARIA live regions
        this.setupAriaLiveRegions();

        // Keyboard navigation improvements
        this.setupKeyboardNavigation();
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    setupFocusManagement() {
        // Focus trap for mobile menu
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && navMenu.classList.contains('active')) {
                    this.trapFocus(e, navMenu);
                }
            });
        }
    }

    trapFocus(e, container) {
        const focusableElements = container.querySelectorAll(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }

    setupAriaLiveRegions() {
        // Create live region for dynamic content announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';

        document.body.appendChild(liveRegion);
    }

    setupKeyboardNavigation() {
        // Escape key to close mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu(
                    document.querySelector('.hamburger'),
                    document.querySelector('.nav-menu')
                );
            }
        });
    }

    handleKeyboardNavigation(e) {
        // Handle keyboard navigation for custom elements
        if (e.key === 'Enter' || e.key === ' ') {
            const target = e.target;

            if (target.classList.contains('hamburger')) {
                e.preventDefault();
                this.toggleMobileMenu(target, document.querySelector('.nav-menu'));
            }
        }
    }

    // Utility method to announce to screen readers
    announce(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }
}

// Initialize the application
const portfolioApp = new PortfolioApp();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}
