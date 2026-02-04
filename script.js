/**
 * ============================================
 * UMANG PORTFOLIO - SCRIPT.JS
 * Modern Single Page Portfolio
 * ============================================
 */

// ============ CONFIGURATION ============
const CONFIG = {
    typingWords: [
        "AI/ML Developer",
        "Building Automations",
        "Algorithmic Trading",
        "Python Developer",
        "Exploring Quantum ML"
    ],
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseBeforeDelete: 2000,
    pauseBeforeType: 500,
    preloaderDelay: 1500
};

// ============ DOM ELEMENTS ============
const DOM = {
    preloader: document.getElementById('preloader'),
    cursor: document.getElementById('cursor'),
    cursorFollower: document.getElementById('cursor-follower'),
    header: document.getElementById('header'),
    navMenu: document.getElementById('nav-menu'),
    navToggle: document.getElementById('nav-toggle'),
    navClose: document.getElementById('nav-close'),
    navLinks: document.querySelectorAll('.nav-link'),
    themeToggle: document.getElementById('theme-toggle'),
    themeIcon: document.getElementById('theme-icon'),
    typingText: document.getElementById('typing-text'),
    scrollIndicator: document.getElementById('scroll-indicator'),
    contactForm: document.getElementById('contact-form')
};

// ============ PRELOADER ============
function initPreloader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (DOM.preloader) {
                DOM.preloader.classList.add('hidden');
                document.body.classList.remove('no-scroll');
            }
        }, CONFIG.preloaderDelay);
    });
}

// ============ CUSTOM CURSOR ============
function initCustomCursor() {
    if (!DOM.cursor || !DOM.cursorFollower) return;

    // Performance & Accessibility: Disable on touch devices and reduced motion
    const isTouch = window.matchMedia('(hover: none)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || isReducedMotion) {
        DOM.cursor.style.display = 'none';
        DOM.cursorFollower.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        DOM.cursor.style.left = `${cursorX}px`;
        DOM.cursor.style.top = `${cursorY}px`;
        DOM.cursorFollower.style.left = `${followerX}px`;
        DOM.cursorFollower.style.top = `${followerY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card, .social-card, .journey-card, .tag');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            DOM.cursor.classList.add('hover');
            DOM.cursorFollower.classList.add('hover');
        });

        el.addEventListener('mouseleave', () => {
            DOM.cursor.classList.remove('hover');
            DOM.cursorFollower.classList.remove('hover');
        });
    });
}

// ============ 3D TILT EFFECT ============
function init3DTilt() {
    const cards = document.querySelectorAll('.skill-card, .project-card');

    // Performance check: Disable on touch or reduced motion
    if (window.matchMedia('(hover: none)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ============ MOBILE NAVIGATION ============
function initMobileNav() {
    // Open menu
    if (DOM.navToggle) {
        DOM.navToggle.addEventListener('click', () => {
            DOM.navMenu.classList.add('show');
            DOM.navToggle.classList.add('active');
            document.body.classList.add('no-scroll');
        });
    }

    // Close menu
    if (DOM.navClose) {
        DOM.navClose.addEventListener('click', () => {
            closeMenu();
        });
    }

    // Close menu on link click
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && DOM.navMenu.classList.contains('show')) {
            closeMenu();
        }
    });

    function closeMenu() {
        DOM.navMenu.classList.remove('show');
        DOM.navToggle.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
}

// ============ SMOOTH SCROLLING ============
function initSmoothScroll() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = DOM.header ? DOM.header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============ ACTIVE NAVIGATION LINK ============
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.scrollY;
        const headerHeight = DOM.header ? DOM.header.offsetHeight : 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                DOM.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', throttle(updateActiveLink, 100));
    updateActiveLink(); // Initial check
}

// ============ HEADER HIDE ON SCROLL ============
function initHeaderScroll() {
    let lastScrollY = 0;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;

        if (scrollY > lastScrollY && scrollY > 100) {
            // Scrolling down
            DOM.header.classList.add('hidden');
        } else {
            // Scrolling up
            DOM.header.classList.remove('hidden');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// ============ THEME TOGGLE ============
function initThemeToggle() {
    if (!DOM.themeToggle) return;

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    setTheme(initialTheme);

    DOM.themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    function setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        if (DOM.themeIcon) {
            DOM.themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

// ============ TYPING EFFECT ============
function initTypingEffect() {
    if (!DOM.typingText) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = CONFIG.typingWords[wordIndex];

        if (isDeleting) {
            // Deleting
            DOM.typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing
            DOM.typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Determine next timeout
        let timeout = isDeleting ? CONFIG.deletingSpeed : CONFIG.typingSpeed;

        // Word complete
        if (!isDeleting && charIndex === currentWord.length) {
            timeout = CONFIG.pauseBeforeDelete;
            isDeleting = true;
        }

        // Deletion complete
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % CONFIG.typingWords.length;
            timeout = CONFIG.pauseBeforeType;
        }

        setTimeout(type, timeout);
    }

    // Start typing after preloader
    setTimeout(type, CONFIG.preloaderDelay + 500);
}

// ============ SCROLL ANIMATIONS ============
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .social-card, .journey-card, .section-header');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// ============ FORM HANDLING ============
function initFormHandling() {
    if (!DOM.contactForm) return;

    DOM.contactForm.addEventListener('submit', function (e) {
        const submitBtn = this.querySelector('.btn-submit');
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
            submitBtn.disabled = true;
        }
    });
}

// ============ UTILITY FUNCTIONS ============
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// ============ 3D TILT EFFECT ============
function init3DTilt() {
    const cards = document.querySelectorAll('.skill-card, .project-card');

    // Check if device supports hover
    if (window.matchMedia('(hover: none)').matches) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ============ GITHUB STATS HANDLING ============
function initGithubStats() {
    const githubImg = document.getElementById('github-stats-img');
    const skeleton = document.getElementById('github-skeleton');

    if (githubImg && skeleton) {
        githubImg.onload = () => {
            githubImg.classList.add('loaded');
            skeleton.style.display = 'none';
        };

        githubImg.onerror = () => {
            skeleton.innerHTML = `<p class="stats-fallback">📊 Check my GitHub for live stats</p>`;
        };

        // Check if image is already cached/loaded
        if (githubImg.complete && githubImg.naturalHeight !== 0) {
            githubImg.classList.add('loaded');
            skeleton.style.display = 'none';
        }
    }
}

// ============ INITIALIZE ALL ============
function init() {
    // Add no-scroll class initially for preloader
    document.body.classList.add('no-scroll');

    // Initialize all features
    initPreloader();
    initCustomCursor();
    initMobileNav();
    initSmoothScroll();
    initActiveNavLink();
    initHeaderScroll();
    initThemeToggle();
    initTypingEffect();
    initScrollAnimations();
    initFormHandling();
    init3DTilt();
    initGithubStats();

    console.log('🚀 Portfolio initialized successfully!');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
