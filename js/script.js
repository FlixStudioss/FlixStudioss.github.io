// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check for saved theme preference or use user's system preference
    const currentTheme = localStorage.getItem('theme') || 
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the saved theme or system preference
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.checked = true;
        }
    }
    
    // Toggle dark mode when the switch is clicked
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }

    // FAQ Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Toggle the active class on the parent element
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
            
            // Change icon
            const icon = question.querySelector('.faq-toggle i');
            if (icon) {
                if (faqItem.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            }
        });
    });

    // Download Modal and GitHub Link
    const downloadBtn = document.getElementById('downloadBtn');
    const modal = document.getElementById('downloadModal');
    const closeModal = document.querySelector('.close-modal');
    const progressBar = document.querySelector('.progress-bar');
    const manualDownload = document.querySelector('.manual-download');
    
    // GitHub release link for FlixInstaller 1.0.2
    const githubLink = 'https://www.dropbox.com/scl/fi/nzgc34a2rfwrg454g0xso/FlixInstaller.apk?rlkey=1nfozbdtdk2j4lhdgii7925ok&st=gcfqb0tv&dl=1';
    
    if (downloadBtn && modal) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show modal
            modal.style.display = 'flex';
            
            // Animate progress bar
            setTimeout(() => {
                progressBar.style.width = '100%';
            }, 100);
            
            // Redirect to GitHub release after delay
            setTimeout(() => {
                window.location.href = githubLink;
            }, 1500);
        });
        
        // Close modal when "X" is clicked
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
                progressBar.style.width = '0';
            });
        }
        
        // Close modal when clicking outside of it
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                progressBar.style.width = '0';
            }
        });
        
        // Manual download button - direct link to GitHub
        if (manualDownload) {
            manualDownload.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = githubLink;
            });
        }
    }

    // Scroll to top button in download page
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add hover effect to feature cards for better interactivity
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Highlight active menu based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('#')[0];
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 