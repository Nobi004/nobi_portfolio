// AI Portfolio Advanced Animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Particles.js background
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#00D9FF'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00D9FF',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // Cursor Trail Effect
    const cursorTrail = [];
    const trailLength = 20;
    let mouseX = 0;
    let mouseY = 0;
    
    for (let i = 0; i < trailLength; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = (1 - i / trailLength) * 0.5;
        trail.style.transform = `scale(${1 - i / trailLength})`;
        document.body.appendChild(trail);
        cursorTrail.push(trail);
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursorTrail() {
        let x = mouseX;
        let y = mouseY;
        
        cursorTrail.forEach((trail, index) => {
            trail.style.left = x - 10 + 'px';
            trail.style.top = y - 10 + 'px';
            
            const nextTrail = cursorTrail[index + 1] || cursorTrail[0];
            x += (nextTrail.offsetLeft - trail.offsetLeft) * 0.4;
            y += (nextTrail.offsetTop - trail.offsetTop) * 0.4;
        });
        
        requestAnimationFrame(animateCursorTrail);
    }
    
    animateCursorTrail();
    
    // Water Ripple Effect on Click
    function createRipple(e, element) {
        const rippleContainer = element;
        rippleContainer.classList.add('ripple-container');
        
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
        
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }
    
    // Add ripple effect to all clickable elements
    document.querySelectorAll('.project-card-glass, .publication-card, .blog-card-glass, .btn-glass, .skill-badge, button').forEach(element => {
        element.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
    
    // Typing Effect
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(element => {
        const text = element.getAttribute('data-text');
        element.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
    
    // Scroll Animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight) && (elementBottom > 0);
            
            if (isVisible) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Check on load
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar-glass');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Skill Bars Animation
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.classList.contains('animated')) {
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';
                bar.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars();
    
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
    
    // Loading Animation
    window.addEventListener('load', () => {
        const loadingContainer = document.querySelector('.loading-container');
        if (loadingContainer) {
            setTimeout(() => {
                loadingContainer.style.opacity = '0';
                setTimeout(() => {
                    loadingContainer.style.display = 'none';
                }, 500);
            }, 1000);
        }
    });
    
    // Project Card 3D Tilt Effect
    const tiltElements = document.querySelectorAll('.project-card-glass, .publication-card');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // Auto-hide messages
    const messages = document.querySelectorAll('.alert');
    messages.forEach(message => {
        setTimeout(() => {
            message.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 5000);
    });
    
    // CV Download Animation
    const cvButtons = document.querySelectorAll('.cv-download-btn');
    
    cvButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('downloading');
            
            // Create success checkmark
            const checkmark = document.createElement('span');
            checkmark.innerHTML = '✓';
            checkmark.style.position = 'absolute';
            checkmark.style.fontSize = '2rem';
            checkmark.style.color = 'white';
            checkmark.style.opacity = '0';
            checkmark.style.transform = 'scale(0)';
            checkmark.style.transition = 'all 0.3s ease';
            
            this.appendChild(checkmark);
            
            setTimeout(() => {
                checkmark.style.opacity = '1';
                checkmark.style.transform = 'scale(1)';
            }, 1000);
            
            setTimeout(() => {
                this.classList.remove('downloading');
                checkmark.remove();
            }, 2000);
        });
    });
    
    // Mobile Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Publication Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publications = document.querySelectorAll('.publication-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter publications
            publications.forEach(pub => {
                if (filter === 'all' || pub.getAttribute('data-year') === filter) {
                    pub.style.display = 'block';
                    pub.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    pub.style.display = 'none';
                }
            });
        });
    });
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
    }
    
    .downloading {
        pointer-events: none;
        animation: pulse 0.5s ease infinite;
    }
    
    .animated {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
    }
`;
document.head.appendChild(style);