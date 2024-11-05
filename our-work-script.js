document.addEventListener('DOMContentLoaded', function() {
    // Service navigation functionality
    const serviceLinks = document.querySelectorAll('.service-link');
    const contentSections = document.querySelectorAll('.content-section');
    const mainTitle = document.querySelector('.main-title');
    const serviceDescription = document.querySelector('.service-description');

    const serviceContent = {
        'websites': {
            title: 'Websites',
            description: 'We create responsive, user-friendly websites that seamlessly blend functionality and design to elevate your online presence.'
        },
        'marketing': {
            title: 'Marketing',
            description: 'We blend strategy, creativity, and analytics to deliver marketing solutions that drive growth and engagement.'
        },
        'content-writing': {
            title: 'Content',
            description: "Whether you're looking to build a brand voice, drive organic traffic, or create engaging content that resonates with your target audience, we're here to help every step of the way."
        }
    };

    function updateContent(serviceId) {
        // Update navigation
        serviceLinks.forEach(link => {
            link.classList.remove('active');
            if(link.dataset.service === serviceId) {
                link.classList.add('active');
            }
        });

        // Update content sections
        contentSections.forEach(section => {
            section.classList.remove('active');
            if(section.classList.contains(`${serviceId}-content`)) {
                section.classList.add('active');
            }
        });

        // Update title and description
        mainTitle.textContent = serviceContent[serviceId].title;
        serviceDescription.textContent = serviceContent[serviceId].description;

        // Update URL hash without scrolling
        history.pushState(null, null, `#${serviceId}`);
    }

    // Event listeners for service links
    serviceLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceId = link.dataset.service;
            updateContent(serviceId);
        });
    });

    // Mobile menu functionality
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;

    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'var(--background-dark)';
            navLinks.style.padding = '1rem';
            menuBtn.classList.add('active');
        } else {
            navLinks.style.display = 'none';
            menuBtn.classList.remove('active');
        }
    });

    // Check URL hash on page load
    const hash = window.location.hash.slice(1);
    if (hash && serviceContent[hash]) {
        updateContent(hash);
    }

    // Add smooth transitions when switching content
    contentSections.forEach(section => {
        section.addEventListener('transitionend', function() {
            if (!this.classList.contains('active')) {
                this.style.display = 'none';
            }
        });
    });
});