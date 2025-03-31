// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const closeMenuBtn = document.querySelector('.close-menu');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Open menu
    hamburgerBtn.addEventListener('click', function() {
        navMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
    
    // Close menu
    function closeMenu() {
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    closeMenuBtn.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);
    
    // Page navigation
    const pageSections = document.querySelectorAll('.page-section');
    const backToHomeLinks = document.querySelectorAll('.back-to-home a');
    const featuresBtn = document.querySelector('.features-btn');
    
    function navigateToPage(targetId) {
        // Hide all sections
        pageSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Close menu if open
        closeMenu();
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            navigateToPage(targetId);
            
            // Update active state in navigation
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Back to home links
    backToHomeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToPage('home');
            
            // Update active state in navigation
            navLinks.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === '#home') {
                    item.classList.add('active');
                }
            });
        });
    });
    
    // Features button
    if (featuresBtn) {
        featuresBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToPage('features');
            
            // Update active state in navigation
            navLinks.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === '#features') {
                    item.classList.add('active');
                }
            });
        });
    }
    
    // Footer navigation links
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            navigateToPage(targetId);
            
            // Update active state in navigation
            navLinks.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === '#' + targetId) {
                    item.classList.add('active');
                }
            });
        });
    });
    
    // Download button
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToPage('home');
            
            // Update active state in navigation
            navLinks.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === '#home') {
                    item.classList.add('active');
                }
            });
        });
    }
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Check if current item is already active
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active, make it active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.feature-card, .app-content, .app-screenshot, .hero-content, .hero-image, .download-content, .download-image');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Add animation class when element is in viewport
    function animateOnScroll() {
        animateElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animate')) {
                element.classList.add('animate');
            }
        });
    }
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Copy code functionality
    const codeValues = document.querySelectorAll('.code-value');
    
    if (codeValues.length > 0) {
        codeValues.forEach(code => {
            code.addEventListener('click', function() {
                // Create temporary textarea
                const textarea = document.createElement('textarea');
                textarea.value = this.innerText;
                document.body.appendChild(textarea);
                
                // Select and copy text
                textarea.select();
                document.execCommand('copy');
                
                // Remove textarea
                document.body.removeChild(textarea);
                
                // Show copied feedback
                const originalText = this.innerText;
                this.innerText = 'Copied!';
                
                // Reset after a short delay
                setTimeout(() => {
                    this.innerText = originalText;
                }, 1500);
            });
            
            // Add cursor pointer style
            code.style.cursor = 'pointer';
            code.setAttribute('title', 'Click to copy');
        });
    }
    
    // Add mobile-specific styling on smaller screens
    function checkMobileView() {
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
        }
    }
    
    // Initial check
    checkMobileView();
    
    // Check on resize
    window.addEventListener('resize', checkMobileView);
    
    // Add animation styles
    function addAnimationStyles() {
        if (!document.getElementById('animation-styles')) {
            const style = document.createElement('style');
            style.id = 'animation-styles';
            style.innerHTML = `
                .app-content, .app-screenshot, .feature-card, .hero-content, .hero-image, .download-content, .download-image {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.6s ease, transform 0.6s ease;
                }
                
                .animate {
                    opacity: 1;
                    transform: translateY(0);
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    addAnimationStyles();
}); 