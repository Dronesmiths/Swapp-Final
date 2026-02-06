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

    // Mobile Menu Toggle (Now Global Sidebar)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }

    if (mobileBtn && navMenu) {
        const toggleMenu = (show) => {
            const isActive = show !== undefined ? show : !navMenu.classList.contains('active');
            navMenu.classList.toggle('active', isActive);
            overlay.classList.toggle('active', isActive);
            document.body.style.overflow = isActive ? 'hidden' : ''; // Prevent scroll
        };

        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        overlay.addEventListener('click', () => toggleMenu(false));

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu(false);
            }
        });
    }


    // Dynamic Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // GHOST SECTION KILLER (Removes legacy HVAC popups from server cache or 3rd party injections)
    const killGhostSections = () => {
        const keywords = [
            'lose your cool',
            'technician',
            '6614948075',
            'call tech now',
            'working class hvac',
            'in the neighborhood',
            'not before they fill up',
            'service call',
            'ac repair',
            'heating maintenance'
        ];

        // Target common 3rd party popup containers and keyword matches
        // Also target common auto-generated IDs/classes from popular popup builders
        const elements = document.querySelectorAll('h1, h2, h3, h4, p, a, div, span, [class*="elfsight"], [id*="elfsight"], [class*="popup"], [id*="popup"]');

        elements.forEach(el => {
            const content = (el.innerText || el.textContent || '').toLowerCase();
            const hasLegacyKeyword = keywords.some(k => content.includes(k));
            const isLegacyLink = el.tagName === 'A' && (el.href.includes('6614948075') || el.href.includes('workingclasshvac'));
            const isElfsight = el.classList.contains('elfsight-app') || (el.id && el.id.includes('elfsight'));

            if (hasLegacyKeyword || isLegacyLink || isElfsight) {
                // Find the highest-level parent that is likely the popup container
                let container = el;
                // We want to kill the whole widget, but stop before killing the theme containers
                const stopSelectors = ['.container', '.aw-footer', 'header', 'main', 'body', 'html'];

                while (container.parentElement &&
                    !stopSelectors.some(s => container.classList.contains(s.substring(1)) || container.tagName === s.toUpperCase())) {
                    container = container.parentElement;
                }

                if (container && container !== document.body && container !== document.documentElement) {
                    console.log('Ghost Section Killed:', content.substring(0, 30));
                    container.style.display = 'none'; // Hide immediately
                    container.remove(); // Then remove
                } else if (el && el.parentElement) {
                    el.remove();
                }
            }
        });
    };

    // Run immediately and again after a short delay
    killGhostSections();

    // Persistent monitoring for late-injected scripts (like Elfsight)
    const observer = new MutationObserver((mutations) => {
        killGhostSections();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Final fallback cleanup
    setTimeout(killGhostSections, 1000);
    setTimeout(killGhostSections, 3000);
    setTimeout(killGhostSections, 5000);
});

