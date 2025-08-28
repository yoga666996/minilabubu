// Critical JavaScript - Only essential functionality for initial page load
// Performance optimized version

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const progressBar = document.getElementById('progressBar');

// Mobile Navigation Toggle (Critical for mobile UX)
if (hamburger && navMenu) {
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
}

// Critical lazy loading for images
function initCriticalLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Basic progress bar (lightweight version)
function updateProgressBar() {
    if (progressBar) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    }
}

// Debounced scroll handler for performance
let scrollTimeout;
function debouncedScroll() {
    if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = requestAnimationFrame(updateProgressBar);
}

// Essential initialization
document.addEventListener('DOMContentLoaded', () => {
    initCriticalLazyLoading();
    updateProgressBar();
});

// Lightweight scroll listener
window.addEventListener('scroll', debouncedScroll, { passive: true });

// Preload non-critical JavaScript after critical content is loaded
window.addEventListener('load', () => {
    const script = document.createElement('script');
    script.src = 'non-critical.js';
    script.defer = true;
    document.head.appendChild(script);
});