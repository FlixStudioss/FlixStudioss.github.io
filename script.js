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
    
    // Maintenance buttons
    const maintenanceButtons = document.querySelectorAll('.maintenance-btn');
    if (maintenanceButtons.length > 0) {
        maintenanceButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create and show maintenance message
                const message = document.createElement('div');
                message.className = 'maintenance-message';
                message.innerHTML = `
                    <div class="maintenance-content">
                        <i class="fas fa-tools"></i>
                        <h3>Under Maintenance</h3>
                        <p>We're currently updating FlixStore to serve you better. Please check back later.</p>
                        <button class="close-message">OK</button>
                    </div>
                `;
                
                document.body.appendChild(message);
                
                // Prevent scrolling while message is shown
                document.body.style.overflow = 'hidden';
                
                // Add animation
                setTimeout(() => {
                    message.classList.add('active');
                }, 10);
                
                // Close message when button is clicked
                const closeButton = message.querySelector('.close-message');
                closeButton.addEventListener('click', function() {
                    message.classList.remove('active');
                    
                    // Remove message after animation completes
                    setTimeout(() => {
                        document.body.removeChild(message);
                        document.body.style.overflow = '';
                    }, 300);
                });
            });
        });
        
        // Add maintenance message styles
        const style = document.createElement('style');
        style.innerHTML = `
            .maintenance-message {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            }
            
            .maintenance-message.active {
                opacity: 1;
                visibility: visible;
            }
            
            .maintenance-content {
                background: white;
                border-radius: 15px;
                padding: 30px;
                max-width: 400px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                transform: translateY(20px);
                transition: transform 0.3s ease;
            }
            
            .maintenance-message.active .maintenance-content {
                transform: translateY(0);
            }
            
            .maintenance-content i {
                font-size: 3rem;
                color: #ff6b6b;
                margin-bottom: 15px;
            }
            
            .maintenance-content h3 {
                font-size: 1.5rem;
                margin-bottom: 10px;
            }
            
            .maintenance-content p {
                color: #636e72;
                margin-bottom: 20px;
            }
            
            .close-message {
                background: linear-gradient(135deg, #ff9f43 0%, #ff6b6b 100%);
                color: white;
                border: none;
                padding: 10px 30px;
                border-radius: 50px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .close-message:hover {
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
            }
        `;
        document.head.appendChild(style);
    }
}); 