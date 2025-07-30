// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all functionality
    initThemeToggle();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initScrollToTop();
    initPipelineAnimation();
    initTypingAnimation();
    initParallaxEffects();
    initExternalLinks();
}

// Theme Toggle Functionality - Fixed
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
    }
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Smooth Scrolling for Navigation Links - Fixed
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.nav-glass').offsetHeight || 80;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-links a').forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Handle other internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]:not(.nav-links a)');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.nav-glass').offsetHeight || 80;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// External Links Functionality - Fixed
function initExternalLinks() {
    // Handle GitHub links
    const githubLinks = document.querySelectorAll('a[href*="github.com"]');
    githubLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href) {
                window.open(href, '_blank', 'noopener,noreferrer');
            }
        });
    });
    
    // Handle LinkedIn links
    const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
    linkedinLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href) {
                window.open(href, '_blank', 'noopener,noreferrer');
            }
        });
    });
    
    // Handle email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
        });
    });
    
    // Handle Download Resume button
    const downloadResumeBtn = document.querySelector('a[href="#contact"]');
    if (downloadResumeBtn && downloadResumeBtn.textContent.includes('Download Resume')) {
        downloadResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a mock resume download
            const resumeData = `
Alex Thompson - DevOps Engineer Resume

CONTACT INFORMATION
Email: alex.thompson@email.com
GitHub: https://github.com/alexthompson
LinkedIn: https://linkedin.com/in/alexthompson

PROFESSIONAL SUMMARY
Mid-level DevOps Engineer with 4 years of experience in implementing production-grade CI/CD pipelines, managing cloud infrastructure (AWS), and container orchestration using Kubernetes. I specialize in delivering secure, observable, and automated platforms that enable rapid development cycles.

KEY ACHIEVEMENTS
• 15+ pipelines optimized across teams
• 3+ AWS environments migrated to IaC
• Implemented security scanning via CodeQL/Snyk

TECHNICAL SKILLS
CI/CD: GitHub Actions (Advanced), Jenkins (Intermediate)
Cloud & IaC: AWS ECS/Lambda (Advanced), Terraform (Advanced), CloudFormation (Intermediate)
Containers: Docker (Advanced), Kubernetes (Intermediate)
Monitoring: Prometheus (Intermediate), Grafana (Intermediate), CloudWatch (Advanced)
Scripting: Python (Advanced), Bash (Advanced)
Dev Tools: Git (Advanced), GitHub (Advanced), GitLab (Intermediate), VSCode (Advanced)

FEATURED PROJECTS
1. Multi-Environment CI/CD Pipeline - Reduced deployment time by 70%
2. AWS Infrastructure Automation - Automated provisioning of 3 production environments
3. Kubernetes Cluster Management - Achieved 99.9% uptime with auto-scaling
4. Security-First DevOps - Identified and resolved 150+ security vulnerabilities

Generated on: ${new Date().toLocaleDateString()}
            `;
            
            const blob = new Blob([resumeData], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Alex_Thompson_DevOps_Resume.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            showNotification('Resume downloaded successfully!', 'success');
        });
    }
}

// Scroll-triggered Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for skill cards and project cards
                if (entry.target.classList.contains('skills-grid') || 
                    entry.target.classList.contains('projects-grid')) {
                    const cards = entry.target.querySelectorAll('.glass-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach(element => {
        observer.observe(element);
    });
    
    // Observe navigation for active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeNavLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                
                // Remove active class from all nav links
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current nav link
                if (activeNavLink) {
                    activeNavLink.classList.add('active');
                }
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        navObserver.observe(section);
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Validate form
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handler)
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
            // Reset button state
            btnText.classList.remove('hidden');
            btnLoading.classList.add('hidden');
            submitBtn.disabled = false;
        }, 2000);
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Show Notification Function
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : '❌'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-glass);
        backdrop-filter: blur(10px);
        border: 1px solid var(--border-glass);
        border-radius: 10px;
        padding: 1rem 1.5rem;
        z-index: 1001;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        box-shadow: var(--shadow-glass);
        max-width: 350px;
        color: var(--text-primary);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.remove('hidden');
        } else {
            scrollTopBtn.classList.add('hidden');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Pipeline Animation
function initPipelineAnimation() {
    const pipelineStages = document.querySelectorAll('.pipeline-stage');
    let currentStage = 0;
    let pipelineInterval;
    
    function animatePipeline() {
        // Reset all stages
        pipelineStages.forEach(stage => {
            const progress = stage.querySelector('.stage-progress');
            if (progress) {
                progress.style.width = '0';
            }
            stage.classList.remove('active');
        });
        
        // Animate current stage
        if (pipelineStages[currentStage]) {
            const currentStageElement = pipelineStages[currentStage];
            const progress = currentStageElement.querySelector('.stage-progress');
            
            currentStageElement.classList.add('active');
            setTimeout(() => {
                if (progress) {
                    progress.style.width = '100%';
                }
            }, 100);
            
            currentStage = (currentStage + 1) % pipelineStages.length;
        }
    }
    
    // Start pipeline animation when section is visible
    const pipelineSection = document.getElementById('pipeline');
    if (pipelineSection) {
        const pipelineObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animatePipeline();
                    pipelineInterval = setInterval(animatePipeline, 3000);
                } else {
                    if (pipelineInterval) {
                        clearInterval(pipelineInterval);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        pipelineObserver.observe(pipelineSection);
    }
}

// Typing Animation for Hero Section
function initTypingAnimation() {
    const typingTexts = document.querySelectorAll('.typing-text');
    
    // Add cursor effect to the last typing text
    if (typingTexts.length > 0) {
        const lastText = typingTexts[typingTexts.length - 1];
        
        function addCursor() {
            lastText.style.borderRight = '3px solid var(--text-accent)';
            lastText.style.animation = 'typing 1s steps(40) infinite, fadeInUp 0.8s ease-out 1s both';
        }
        
        setTimeout(addCursor, 2000);
        
        // Remove cursor after animation
        setTimeout(() => {
            lastText.style.borderRight = 'none';
        }, 5000);
    }
}

// Parallax Effects
function initParallaxEffects() {
    const heroBackground = document.querySelector('.hero-background');
    
    const parallaxHandler = debounce(function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${parallax}px)`;
        }
    }, 10);
    
    window.addEventListener('scroll', parallaxHandler);
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // ESC key functionality
    if (e.key === 'Escape') {
        // Close any open modals or reset states
        const activeElements = document.querySelectorAll('.active');
        activeElements.forEach(element => {
            element.classList.remove('active');
        });
    }
    
    // Arrow key navigation for pipeline
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const pipelineStages = document.querySelectorAll('.pipeline-stage');
        const focusedStage = document.activeElement;
        
        if (pipelineStages.length > 0 && Array.from(pipelineStages).includes(focusedStage)) {
            e.preventDefault();
            const currentIndex = Array.from(pipelineStages).indexOf(focusedStage);
            let nextIndex;
            
            if (e.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % pipelineStages.length;
            } else {
                nextIndex = (currentIndex - 1 + pipelineStages.length) % pipelineStages.length;
            }
            
            pipelineStages[nextIndex].focus();
        }
    }
});

// Debounce function for performance optimization
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

// Add focus styles and additional functionality
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .pipeline-stage:focus {
            outline: 2px solid var(--text-accent);
            outline-offset: 4px;
            border-radius: 10px;
        }
        
        .nav-links a:focus,
        .btn:focus,
        .theme-toggle:focus {
            outline: 2px solid var(--text-accent);
            outline-offset: 2px;
        }
        
        .active {
            color: var(--text-accent) !important;
        }
        
        .active::after {
            width: 100% !important;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: var(--text-primary);
        }
        
        .notification-icon {
            font-size: 1.25rem;
        }
        
        .notification-message {
            font-weight: 500;
        }
        
        .loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});

// Performance and UX improvements
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Hide any loading indicators
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
        element.style.display = 'none';
    });
});

// Error handling for failed resource loads
window.addEventListener('error', function(e) {
    console.error('Resource failed to load:', e.target);
    
    // Fallback for failed external resources
    if (e.target.tagName === 'LINK' && e.target.rel === 'stylesheet') {
        // Fallback for failed Google Fonts
        document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    }
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', debounce(function() {
    // Recalculate any size-dependent animations
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && window.innerWidth <= 768) {
        // Mobile-specific adjustments
        heroSection.style.minHeight = window.innerHeight + 'px';
    }
}, 250));