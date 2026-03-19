// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // SIDE NAVIGATION TOGGLE
    // ==========================================

    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sideNav = document.getElementById('sideNav');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('closeBtn');

    // Open side navigation
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sideNav.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
    }

    // Close side navigation - Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            sideNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Close side navigation - Overlay click
    if (overlay) {
        overlay.addEventListener('click', function() {
            sideNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking a side nav link
    const sideNavLinks = document.querySelectorAll('.side-nav-links a');
    sideNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            sideNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ==========================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ==========================================

    const navLinks = document.querySelectorAll('.desktop-nav a, .side-nav-links a, .cta-button[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculate offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active link
                navLinks.forEach(link => link.classList.remove('active'));
                if(this.classList.contains('nav-links')) {
                    this.classList.add('active');
                }
            }
        });
    });

    // ==========================================
    // HEADER SHADOW ON SCROLL
    // ==========================================

    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
    });

    // ==========================================
    // ACTIVE LINK UPDATE ON SCROLL
    // ==========================================

    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = document.querySelectorAll('.desktop-nav a, .side-nav-links a');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                allNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // ==========================================
    // CONTACT FORM HANDLING
    // ==========================================

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const formData = {
                name: contactForm.querySelector('[name="name"]').value,
                email: contactForm.querySelector('[name="email"]').value,
                phone: contactForm.querySelector('[name="phone"]').value,
                message: contactForm.querySelector('[name="message"]').value
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            console.log('Form Data:', formData);

            // Show success message
            alert('Thank you for your enquiry! We will contact you shortly.');

            // Reset form
            contactForm.reset();

            // In a real application, you would send this data to a server:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // });
        });
    }

    // ==========================================
    // ANIMATION ON SCROLL (Optional Enhancement)
    // ==========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and process steps for fade-in animation
    const animatedElements = document.querySelectorAll('.service-card, .process-step');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

});
