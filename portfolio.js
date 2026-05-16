document.addEventListener('DOMContentLoaded', () => {
    /* --- 1. Theme Switcher Logic --- */
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check saved theme from localStorage
    const savedTheme = localStorage.getItem('sahil-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }

    themeToggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-mode');
        localStorage.setItem('sahil-theme', isLight ? 'light' : 'dark');
        updateThemeIcon(isLight);
    });

    function updateThemeIcon(isLight) {
        if (isLight) {
            themeIcon.className = 'fa-solid fa-sun';
            themeIcon.style.color = 'hsl(35, 100%, 50%)';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
            themeIcon.style.color = 'inherit';
        }
    }

    /* --- 2. Dynamic Typing Effect --- */
    const typedTextSpan = document.getElementById('typed-text');
    const taglineWords = ["Aspiring Developer", "AI Enthusiast", "Engineering Student", "Aspiring Developer | AI Enthusiast | Engineering Student"];
    const fullPhrase = "Aspiring Developer | AI Enthusiast | Engineering Student";
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
        const currentText = fullPhrase.substring(0, charIdx);
        typedTextSpan.textContent = currentText;

        if (!isDeleting && charIdx < fullPhrase.length) {
            charIdx++;
            setTimeout(typeEffect, typingSpeed);
        } else if (charIdx === fullPhrase.length) {
            // Pause at the end before deleting slightly or keeping static
            // Let's make it elegant: hold full text for 5 seconds, then refresh loop
            setTimeout(() => {
                isDeleting = true;
                setTimeout(typeEffect, 40);
            }, 5000);
        } else if (isDeleting && charIdx > 0) {
            charIdx--;
            setTimeout(typeEffect, 30);
        } else {
            isDeleting = false;
            setTimeout(typeEffect, 500);
        }
    }

    // Initialize Typing Effect
    setTimeout(typeEffect, 600);

    /* --- 3. Scroll Reveal via IntersectionObserver --- */
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger Progress bar and Radial Chart fill when academics section comes into view
                if (entry.target.classList.contains('academics-grid')) {
                    triggerAcademicsAnimation();
                }
                
                // Optional: unobserve if animation should run only once
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* --- 4. Academics Progress Animation Logic --- */
    let academicsAnimated = false;
    function triggerAcademicsAnimation() {
        if (academicsAnimated) return;
        academicsAnimated = true;

        const radialCharts = document.querySelectorAll('.radial-progress');
        radialCharts.forEach(chart => {
            const targetPct = chart.getAttribute('data-percentage');
            // reset initially
            chart.style.setProperty('--percentage', '0%');
            setTimeout(() => {
                chart.style.setProperty('--percentage', `${targetPct}%`);
            }, 200);
        });
    }

    /* --- 5. Active Navigation Link on Scroll --- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#nav-links a');

    function highlightActiveNavLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNavLink);

    /* --- 6. Scroll-to-Top Button Behavior --- */
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
