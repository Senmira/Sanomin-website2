/**
 * SANOMIN PRESCHOOL & DAYCARE - JAVASCRIPT
 * Interactive features: slider, form validation, smooth scroll, animations
 */

// ============================================
// DOM CONTENT LOADED - Initialize All Features
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initHeroSlider();
    initSmoothScroll();
    initScrollAnimations();
    initLightbox();
    initContactForm();
    initScrollToTop();
    initMobileMenu();
});

// ============================================
// NAVIGATION BAR - Sticky & Scroll Effects
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Add scroll class to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Update active nav link
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ============================================
// MOBILE MENU - Toggle & Close
// ============================================
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// HERO IMAGE SLIDER - Auto-play & Controls
// ============================================
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    
    let currentSlide = 0;
    let slideInterval;
    const autoPlayDelay = 5000; // 5 seconds
    
    // Show specific slide
    function showSlide(index) {
        // Handle wrap-around
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;
        
        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetAutoPlay();
    });
    
    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetAutoPlay();
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetAutoPlay();
        });
    });
    
    // Auto-play
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, autoPlayDelay);
    }
    
    function stopAutoPlay() {
        clearInterval(slideInterval);
    }
    
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }
    
    // Start auto-play
    startAutoPlay();
    
    // Pause on hover
    const sliderContainer = document.querySelector('.hero-slider');
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
}

// ============================================
// SMOOTH SCROLL - Navigation Links
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS - Fade In Elements
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.about-card, .program-card, .facility-card, .teacher-card, ' +
        '.gallery-item, .info-card, .section-header'
    );
    
    // Add initial state
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Stagger animation for grids
    const grids = document.querySelectorAll('.teachers-grid, .facilities-grid, .gallery-grid');
    
    grids.forEach(grid => {
        const items = grid.children;
        
        for (let i = 0; i < items.length; i++) {
            items[i].style.transitionDelay = `${i * 0.1}s`;
        }
    });
}

// ============================================
// LIGHTBOX - Gallery Image Preview
// ============================================
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    const images = [];
    let currentIndex = 0;
    
    // Collect all gallery images
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-overlay p');
        
        images.push({
            src: img.src,
            alt: img.alt,
            caption: caption ? caption.textContent : img.alt
        });
        
        // Open lightbox on click
        item.addEventListener('click', function() {
            openLightbox(index);
        });
    });
    
    // Open lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Update lightbox image
    function updateLightboxImage() {
        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt;
        lightboxCaption.textContent = images[currentIndex].caption;
    }
    
    // Next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage();
    }
    
    // Previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    }
    
    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', nextImage);
    lightboxPrev.addEventListener('click', prevImage);
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
        }
    });
}

// ============================================
// CONTACT FORM - Validation & Submission
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const formSuccess = document.getElementById('formSuccess');
    
    // Validation patterns
    const patterns = {
        name: /^[a-zA-Z\s]{2,50}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[\d\s\-\(\)\+]{10,20}$/
    };
    
    // Error messages
    const errorMessages = {
        name: 'Please enter a valid name (2-50 characters)',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number',
        message: 'Please enter a message (at least 10 characters)'
    };
    
    // Validate individual field
    function validateField(input, pattern, errorId) {
        const value = input.value.trim();
        const errorElement = document.getElementById(errorId);
        let isValid = true;
        
        // Clear previous error
        input.classList.remove('error');
        errorElement.textContent = '';
        
        // Check if required and empty
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorElement.textContent = 'This field is required';
        }
        // Check pattern
        else if (pattern && value && !pattern.test(value)) {
            isValid = false;
            errorElement.textContent = errorMessages[input.name];
        }
        // Check message length
        else if (input.name === 'message' && value.length < 10) {
            isValid = false;
            errorElement.textContent = errorMessages.message;
        }
        
        if (!isValid) {
            input.classList.add('error');
        }
        
        return isValid;
    }
    
    // Real-time validation
    nameInput.addEventListener('blur', function() {
        validateField(this, patterns.name, 'nameError');
    });
    
    emailInput.addEventListener('blur', function() {
        validateField(this, patterns.email, 'emailError');
    });
    
    messageInput.addEventListener('blur', function() {
        validateField(this, null, 'messageError');
    });
    
    // Clear error on input
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            document.getElementById(this.name + 'Error').textContent = '';
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateField(nameInput, patterns.name, 'nameError');
        const isEmailValid = validateField(emailInput, patterns.email, 'emailError');
        const isMessageValid = validateField(messageInput, null, 'messageError');
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(function() {
                // Reset button
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
                
                // Show success message
                formSuccess.classList.add('show');
                
                // Reset form
                form.reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    formSuccess.classList.remove('show');
                }, 5000);
            }, 1500);
        }
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// ADDITIONAL UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add parallax effect to hero shapes (optional enhancement)
window.addEventListener('mousemove', throttle(function(e) {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 10;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        
        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
}, 50));

// Console greeting
console.log('%c🌈 Welcome to SANOMIN Preschool & Daycare! 🌈', 'color: #8ECAE6; font-size: 16px; font-weight: bold;');
console.log('%cLearn • Play • Grow', 'color: #FFB384; font-size: 14px;');
