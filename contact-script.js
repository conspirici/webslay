// Load environment variables from .env file
require('dotenv').config();

document.addEventListener('DOMContentLoaded', function() {
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
            navLinks.style.background = 'var(--background-color)';
            navLinks.style.padding = '1rem';
            menuBtn.classList.add('active');
        } else {
            navLinks.style.display = 'none';
            menuBtn.classList.remove('active'); 
        }
    });

    // EmailJS configuration from environment variables
    const EMAILJS_USER_ID = process.env.EMAILJS_USER_ID;
    const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;

    // Initialize EmailJS
    (function() {
        emailjs.init(EMAILJS_USER_ID); // Use the variable for Public API Key
    })();

    // Form submission
    const contactForm = document.getElementById('contactForm');
    const successAlert = document.getElementById('successAlert');
    const errorAlert = document.getElementById('errorAlert');

    function showAlert(type) {
        const alert = type === 'success' ? successAlert : errorAlert;
        alert.style.display = 'block';
        alert.style.opacity = '1';
        setTimeout(() => {
            alert.style.opacity = '0'; 
            setTimeout(() => {
                alert.style.display = 'none'; 
            }, 0); 
        }, 500);
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Send the email using EmailJS
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this) // Use variables for service ID and template ID
            .then(() => {
                // Success message
                showAlert('success');
                contactForm.reset(); // Clear the form
            }, (error) => {
                // Error message
                showAlert('failure');
            });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
});
