// Non-critical JavaScript - Enhanced features and animations loaded after initial page load

// DOM Elements
const backToTop = document.getElementById('backToTop');
const countdownTimer = document.getElementById('countdownTimer');

// Back to Top Button
function toggleBackToTop() {
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
}

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Active Navigation Link Update
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
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

// Scroll Animations (non-critical)
function handleScrollAnimations() {
    const animationElements = document.querySelectorAll('.scroll-animation');
    
    animationElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Countdown Timer for Release Date
function initCountdown() {
    if (!countdownTimer) return;
    
    const countDownDate = new Date("Aug 29, 2025 00:00:00").getTime();
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        
        if (elements.days) elements.days.textContent = String(days).padStart(3, '0');
        if (elements.hours) elements.hours.textContent = String(hours).padStart(2, '0');
        if (elements.minutes) elements.minutes.textContent = String(minutes).padStart(2, '0');
        if (elements.seconds) elements.seconds.textContent = String(seconds).padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(timer);
            if (countdownTimer) {
                countdownTimer.innerHTML = "<div class='countdown-finished'>🎉 Launch Day is Here! 🎉</div>";
            }
        }
    }, 1000);
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for Scroll Animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.collection-item, .character-card, .celebrity-card, .step, .tip').forEach(el => {
        el.classList.add('scroll-animation');
        observer.observe(el);
    });
}

// Navbar Background Change on Scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}

// Enhanced Card Effects (non-critical animations)
function initCardEffects() {
    const cards = document.querySelectorAll('.labubu-card, .collection-item, .character-card, .celebrity-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Accessibility Improvements
function initAccessibility() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('using-keyboard');
    });
    
    const interactiveElements = document.querySelectorAll('button, a, input');
    interactiveElements.forEach(element => {
        if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
            element.setAttribute('aria-label', 'Interactive element');
        }
    });
}

// PWA Support
function initPWA() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    }
}

// Analytics (if gtag is available)
function initAnalytics() {
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if (maxScroll % 25 === 0 && typeof gtag !== 'undefined') {
                gtag('event', 'scroll', {
                    event_category: 'engagement',
                    event_label: `${maxScroll}%`,
                    value: maxScroll
                });
            }
        }
    }, { passive: true });
}

// Debounced scroll events for performance
function debounce(func, wait) {
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

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    toggleBackToTop();
    updateActiveNavLink();
    handleScrollAnimations();
    handleNavbarScroll();
}, 16); // ~60fps

// Initialize non-critical features
function initNonCritical() {
    initCountdown();
    initSmoothScrolling();
    initIntersectionObserver();
    initCardEffects();
    initAccessibility();
    initPWA();
    initAnalytics();
    
    // Initial calls
    toggleBackToTop();
    updateActiveNavLink();
    handleNavbarScroll();
    
    // Add enhanced scroll listener
    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNonCritical);
} else {
    initNonCritical();
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});