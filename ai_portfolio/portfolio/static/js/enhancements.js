// Cursor Water Effect Enhancement
(function() {
    // Create cursor water element
    const cursorWater = document.createElement('div');
    cursorWater.id = 'cursor-water-effect';
    cursorWater.innerHTML = `
        <div class="water-wave"></div>
        <div class="water-wave"></div>
        <div class="water-wave"></div>
    `;
    document.body.appendChild(cursorWater);

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isMoving = false;

    // Smooth cursor follow
    function animateCursor() {
        if (!isMoving) return;
        
        // Lerp for smooth movement
        currentX += (mouseX - currentX) * 0.15;
        currentY += (mouseY - currentY) * 0.15;
        
        cursorWater.style.left = currentX - 60 + 'px';
        cursorWater.style.top = currentY - 60 + 'px';
        
        requestAnimationFrame(animateCursor);
    }

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isMoving) {
            isMoving = true;
            cursorWater.style.opacity = '1';
            animateCursor();
        }
        
        // Create ripple trail
        createRipple(e.clientX, e.clientY);
    });

    // Hide on mouse leave
    document.addEventListener('mouseleave', () => {
        cursorWater.style.opacity = '0';
        isMoving = false;
    });

    // Create ripple trail
    let lastRippleTime = 0;
    function createRipple(x, y) {
        const now = Date.now();
        if (now - lastRippleTime < 100) return; // Throttle
        lastRippleTime = now;
        
        const ripple = document.createElement('div');
        ripple.className = 'water-ripple';
        ripple.style.left = x - 10 + 'px';
        ripple.style.top = y - 10 + 'px';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 800);
    }

    // Enhanced hover effect
    document.addEventListener('mouseover', (e) => {
        if (e.target.matches('a, button, .glass-panel, .nav-glass-item')) {
            cursorWater.style.transform = 'scale(1.3)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.matches('a, button, .glass-panel, .nav-glass-item')) {
            cursorWater.style.transform = 'scale(1)';
        }
    });
})();

// Add dark glass background
document.addEventListener('DOMContentLoaded', function() {
    // Create and add dark glass background
    const darkBg = document.createElement('div');
    darkBg.className = 'dark-glass-bg';
    document.body.insertBefore(darkBg, document.body.firstChild);
    
    // Enhance existing navbar
    const navbar = document.querySelector('.navbar, nav');
    if (navbar) {
        navbar.classList.add('enhanced-navbar');
        
        // Wrap nav items in glass cards
        const navLinks = navbar.querySelectorAll('.nav-link, .nav-menu a');
        navLinks.forEach(link => {
            if (!link.classList.contains('nav-glass-item')) {
                link.classList.add('nav-glass-item');
            }
        });
    }
    
    // Add enhanced text class to headings
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p').forEach(el => {
        if (!el.closest('.navbar')) {
            el.classList.add('enhanced-text');
        }
    });
});