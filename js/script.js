// Basic interactions scripts
document.addEventListener('DOMContentLoaded', () => {
    console.log('SWAPP site loaded');

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const icon = mobileBtn ? mobileBtn.querySelector('i') : null;

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling
            navMenu.classList.toggle('active');

            // Toggle icon
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }


    // Dynamic Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // GHOST SECTION KILLER (Removes legacy HVAC popups from server cache)
    const killGhostSections = () => {
        const keywords = ['lose your cool', 'technician', '6614948075', 'call tech now'];
        document.querySelectorAll('h1, h2, h3, h4, p, a, div, span').forEach(el => {
            const content = el.innerText.toLowerCase();
            if (keywords.some(k => content.includes(k))) {
                // Find the highest-level parent that is likely the popup container
                let container = el;
                while (container.parentElement &&
                    !container.classList.contains('container') &&
                    !['BODY', 'HTML'].includes(container.parentElement.tagName)) {
                    container = container.parentElement;
                }
                container.remove();
                console.log('Ghost Section Killed:', content.substring(0, 20));
            }
        });
    };

    // Run immediately and again after a short delay for late-injecting scripts
    killGhostSections();
    setTimeout(killGhostSections, 1000);
    setTimeout(killGhostSections, 3000);
});

