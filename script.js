// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const progressBar = document.getElementById('progressBar');
const backToTop = document.getElementById('backToTop');
const countdownTimer = document.getElementById('countdownTimer');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Progress Bar
function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
}

// Back to Top Button
function toggleBackToTop() {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll Event Listeners
window.addEventListener('scroll', () => {
    updateProgressBar();
    toggleBackToTop();
    updateActiveNavLink();
    handleScrollAnimations();
});

// Active Navigation Link Update
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
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

// Scroll Animations
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
    // Set the date we're counting down to (August 29, 2025)
    const countDownDate = new Date("Aug 29, 2025 00:00:00").getTime();
    
    // Update the count down every 1 second
    const timer = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the countdown date
        const distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result in the elements
        if (document.getElementById('days')) {
            document.getElementById('days').textContent = String(days).padStart(3, '0');
        }
        if (document.getElementById('hours')) {
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        }
        if (document.getElementById('minutes')) {
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        }
        if (document.getElementById('seconds')) {
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }
        
        // If the countdown is finished, display a message
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

    // Observe all elements that need animation
    document.querySelectorAll('.collection-item, .character-card, .celebrity-card, .step, .tip').forEach(el => {
        el.classList.add('scroll-animation');
        observer.observe(el);
    });
}

// Navbar Background Change on Scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}

// Add scroll event for navbar
window.addEventListener('scroll', handleNavbarScroll);

// Floating Labubu Animation Enhancement
function enhanceFloatingAnimations() {
    const floatingElements = document.querySelectorAll('.floating-labubu');
    
    floatingElements.forEach((element, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10; // -10 to 10
            const randomY = Math.random() * 20 - 10; // -10 to 10
            element.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + (index * 500)); // Stagger the animations
    });
}

// Card Hover Effects
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

// Parallax Effect for Hero Section
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-labubu');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1); // Different speeds for each element
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Loading Animation
function showLoadingAnimation() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class after page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 500);
    });
}

// Type Writer Effect for Hero Title
function initTypeWriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typewriter effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Easter Egg: Konami Code
function initKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    let userInput = [];
    
    document.addEventListener('keydown', (e) => {
        userInput.push(e.code);
        
        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }
        
        if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 1s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
                alert('🎉 You found the secret Labubu code! 🧸✨');
            }, 3000);
        }
    });
}

// Performance Optimization: Debounce Scroll Events
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
    updateProgressBar();
    toggleBackToTop();
    updateActiveNavLink();
    handleScrollAnimations();
    handleNavbarScroll();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Accessibility Improvements
function initAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('using-keyboard');
    });
    
    // Add aria-labels to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input');
    interactiveElements.forEach(element => {
        if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
            element.setAttribute('aria-label', 'Interactive element');
        }
    });
}

// PWA Support (Future Enhancement)
function initPWA() {
    // Register service worker if available
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Analytics (Placeholder for Google Analytics)
function initAnalytics() {
    // Track page views
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    // Track scroll depth
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
    });
}

// Image Lazy Loading (for future images)
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
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

// Dark Mode Toggle (Future Enhancement)
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // Load saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initSmoothScrolling();
    initIntersectionObserver();
    enhanceFloatingAnimations();
    initCardEffects();
    initParallaxEffect();
    initTypeWriter();
    initKonamiCode();
    initAccessibility();
    initPWA();
    initAnalytics();
    initLazyLoading();
    initDarkMode();
    
    // Initial calls
    updateProgressBar();
    toggleBackToTop();
    updateActiveNavLink();
    handleNavbarScroll();
});

// Window load event for final optimizations
window.addEventListener('load', () => {
    // Preload critical resources
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Fredoka+One:wght@400&display=swap';
    link.as = 'style';
    document.head.appendChild(link);
    
    // Remove any loading states
    document.body.classList.remove('loading');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.scroll-animation').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);
});

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You could send this to your analytics or error tracking service
});

// Unhandled Promise Rejection Handling
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // You could send this to your analytics or error tracking service
});

// Export functions for potential external use
window.miniLabubu = {
    updateProgressBar,
    toggleBackToTop,
    initCountdown,
    initSmoothScrolling,
    debounce
};