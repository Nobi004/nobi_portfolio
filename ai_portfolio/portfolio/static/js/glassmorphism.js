// Glassmorphism JavaScript - Water Animations and Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin();
    
    // Water Ripple Effect
    function createRipple(e, element) {
        const rippleContainer = element;
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = rippleContainer.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        rippleContainer.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple effect to all clickable elements
    document.querySelectorAll('.water-ripple, .glass-button, .glass-card, a, button').forEach(element => {
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        
        element.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
    
    // Page Transition Effect
    const pageTransition = document.getElementById('page-transition');
    const transitionRipple = pageTransition.querySelector('.transition-ripple');
    
    document.querySelectorAll('a[href^="/"]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.target && !this.href.includes('#')) {
                e.preventDefault();
                const href = this.href;
                
                // Get click position
                const x = e.clientX;
                const y = e.clientY;
                
                // Position and animate transition ripple
                transitionRipple.style.left = x + 'px';
                transitionRipple.style.top = y + 'px';
                transitionRipple.classList.add('active');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 600);
            }
        });
    });
    
    // Mobile Menu Toggle with Animation
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const navMenuItems = mobileMenu.querySelectorAll('a');
    
    navToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        setTimeout(() => {
            mobileMenu.classList.toggle('show');
        }, 10);
        
        // Animate menu items
        if (mobileMenu.classList.contains('show')) {
            gsap.from(navMenuItems, {
                opacity: 0,
                y: 20,
                stagger: 0.05,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
        }
    });
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animate Elements on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.from(entry.target, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: "power2.out"
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all glass cards
    document.querySelectorAll('.glass-card').forEach(card => {
        observer.observe(card);
    });
    
    // Animate Skill Bars
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    const level = bar.getAttribute('data-level');
                    gsap.to(bar, {
                        width: level + '%',
                        duration: 1.5,
                        delay: index * 0.1,
                        ease: "power2.out"
                    });
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.skills-container').forEach(container => {
        skillObserver.observe(container);
    });
    
    // Auto-hide messages with animation
    const messages = document.querySelectorAll('.alert');
    messages.forEach((message, index) => {
        gsap.from(message, {
            x: 100,
            opacity: 0,
            duration: 0.5,
            delay: index * 0.1
        });
        
        setTimeout(() => {
            gsap.to(message, {
                x: 100,
                opacity: 0,
                duration: 0.3,
                onComplete: () => message.remove()
            });
        }, 5000);
    });
    
    // Mouse Parallax Effect for Background Elements
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        gsap.to('.animate-float', {
            x: mouseX * 50,
            y: mouseY * 50,
            duration: 1
        });
        
        gsap.to('.animate-float-delayed', {
            x: mouseX * -50,
            y: mouseY * -50,
            duration: 1.5
        });
    });
    
    // Add Loading Animation
    window.addEventListener('beforeunload', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
    });
});

// Utility function to add water hover effect dynamically
function addWaterHover(element) {
    element.classList.add('water-hover');
}

// Export functions for use in other scripts
window.GlassmorphismEffects = {
    createRipple,
    addWaterHover
};