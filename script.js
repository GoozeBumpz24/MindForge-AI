document.addEventListener('DOMContentLoaded', () => {

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });

    document.querySelectorAll('a[href^="#"], button[data-target^="#"]').forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = element.getAttribute('href') || element.getAttribute('data-target');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });

    document.querySelectorAll('button[data-url]').forEach(button => {
        button.addEventListener('click', () => {
            window.open(button.getAttribute('data-url'), '_blank');
        });
    });
    const header = document.querySelector('header');
    const checkHeader = () => {
        header.classList.toggle('scrolled', window.scrollY > 100);
    };

    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(element => revealObserver.observe(element));

    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    const updateActiveNav = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    };
    const contactForm = document.querySelector('#contact-form');
    const formMessage = document.querySelector('#form-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const service = document.querySelector('#service').value;
        const message = document.querySelector('#message').value.trim();

        if (name && email && service && message) {
            formMessage.textContent = 'Thank you for your message! We’ll get back to you soon.';
            formMessage.classList.add('show');
            contactForm.reset();
            setTimeout(() => {
                formMessage.classList.remove('show');
                formMessage.textContent = '';
            }, 3000);
        } else {
            formMessage.textContent = 'Please fill out all fields.';
            formMessage.classList.add('show');
            setTimeout(() => {
                formMessage.classList.remove('show');
                formMessage.textContent = '';
            }, 3000);
        }
    });

    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.toggle('filled', input.value.trim() !== '');
        });
    });
    const gradientBg = document.querySelector('.gradient-bg');
    const handleParallax = () => {
        gradientBg.style.transform = `translateY(${window.scrollY * 0.05}px)`;
    };

    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.animationDelay = `${0.2 * (index + 1)}s`;
    });
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.transitionDelay = `${0.1 * index}s`;
    });
    document.querySelectorAll('.form-group').forEach((group, index) => {
        group.style.transitionDelay = `${0.1 * index}s`;
    });

    window.addEventListener('scroll', () => {
        checkHeader();
        updateActiveNav();
        handleParallax();
    });

    checkHeader();
    updateActiveNav();
});