// Theme switching functionality
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle-icon');

    if (!themeToggle || !themeIcon) return;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Update icon and aria-label based on current theme
    updateThemeIcon(currentTheme, themeIcon);
    themeToggle.setAttribute(
        'aria-label',
        currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );

    // Add click event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);

        // Update aria-label
        this.setAttribute('aria-label',
            newTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        );
    });
}

function updateThemeIcon(theme, iconElement) {
    iconElement.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // Account for fixed header
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Basic validation
            if (!data.name || !data.email || !data.message || !data['issue-type']) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate API call delay
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you within our stated response times.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-card, .testimonial, .help-card, .contact-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Add CSS for fade-in animation
const fadeInCSS = `
    .feature-card,
    .testimonial,
    .help-card,
    .contact-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .header.scrolled {
        background: var(--bg);
        backdrop-filter: blur(10px);
    }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = fadeInCSS;
document.head.appendChild(style);

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.getElementById('hamburger');
    const backdrop = document.querySelector('.nav-menu-backdrop');

    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');

    if (backdrop) {
        backdrop.classList.toggle('active');
    }
}

// Initialize hamburger menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Create backdrop element
    const backdrop = document.createElement('div');
    backdrop.className = 'nav-menu-backdrop';
    document.body.appendChild(backdrop);

    // Add click event to backdrop to close menu
    backdrop.addEventListener('click', toggleMobileMenu);

    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMobileMenu();
            }
        });
    });

    // Close menu when clicking outside (disabled since backdrop handles this)
    // The backdrop click event now handles closing the menu
});

// Age verification notice
function showAgeNotice() {
    const notice = document.querySelector('.age-notice');
    if (notice) {
        notice.style.animation = 'pulse 2s ease-in-out';
    }
}

// Initialize age notice animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(showAgeNotice, 2000);
});

// Add pulse animation CSS
const pulseCSS = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;

const pulseStyle = document.createElement('style');
pulseStyle.textContent = pulseCSS;
document.head.appendChild(pulseStyle);

// Simple analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // This would integrate with your analytics service
    console.log('Event tracked:', eventName, properties);
}

// Track download button clicks
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.coming-soon-btn, .btn-primary');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            if (buttonText.includes('Download') || buttonText.includes('Coming Soon') || this.classList.contains('coming-soon-btn')) {
                trackEvent('download_button_clicked', {
                    button_text: buttonText,
                    button_type: this.classList.contains('coming-soon-btn') ? 'coming_soon' : 'download',
                    page: window.location.pathname
                });
            }
        });
    });
});

// Track form submissions
document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('contact-form')) {
        const formData = new FormData(e.target);
        trackEvent('contact_form_submitted', {
            issue_type: formData.get('issue-type'),
            age_group: formData.get('age-group'),
            page: window.location.pathname
        });
    }
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
});

// Keyboard accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for FAQ items
    const faqQuestions = document.querySelectorAll('.faq-item h4');
    faqQuestions.forEach(question => {
        question.setAttribute('tabindex', '0');
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add focus indicators
    const focusCSS = `
        .faq-item h4:focus,
        .help-card:focus,
        .contact-card:focus {
            outline: 2px solid var(--primary);
            outline-offset: 2px;
        }

        .btn-primary:focus,
        .btn-secondary:focus {
            outline: 2px solid var(--primary-dark);
            outline-offset: 2px;
        }
    `;

    const focusStyle = document.createElement('style');
    focusStyle.textContent = focusCSS;
    document.head.appendChild(focusStyle);
});

// Simple feature detection and fallbacks
function initializeFeatures() {
    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
        // Fallback: just add fade-in class to all elements
        document.querySelectorAll('.feature-card, .testimonial, .help-card, .contact-card').forEach(el => {
            el.classList.add('fade-in');
        });
    }

    // Check for smooth scroll support
    if (!CSS.supports('scroll-behavior', 'smooth')) {
        // Fallback handled by the manual smooth scroll implementation above
        console.log('Using JavaScript smooth scroll fallback');
    }
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initializeFeatures();
});
