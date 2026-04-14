// Mobile Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Sticky Header Scroll Effects
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Form Validation and Submission Handling
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value;
    const email = form.email.value;
    // Add more validation as needed
    if (name && email) {
        // Submit to email backend (e.g., Formspree)
        fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: JSON.stringify({ name, email }),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json()).then(data => {
            console.log('Success:', data);
        }).catch((error) => {
            console.error('Error:', error);
        });
    } else {
        alert('Please fill out all fields.');
    }
});

// Testimonials Auto-carousel with Manual Navigation Controls
let index = 0;
const testimonials = document.querySelectorAll('.testimonial');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

function showTestimonial(i) {
    testimonials.forEach((testimonial, idx) => {
        testimonial.style.display = idx === i ? 'block' : 'none';
    });
}

showTestimonial(index);
nextButton.addEventListener('click', () => {
    index = (index + 1) % testimonials.length;
    showTestimonial(index);
});
prevButton.addEventListener('click', () => {
    index = (index - 1 + testimonials.length) % testimonials.length;
    showTestimonial(index);
});

// Before/After Image Slider with Drag/Swipe Support
const slider = document.querySelector('.image-slider');
const beforeImage = slider.querySelector('.before');
const afterImage = slider.querySelector('.after');

let isMouseDown = false;
let startX;
let startWidth;

slider.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    startWidth = beforeImage.offsetWidth;
});

slider.addEventListener('mouseleave', () => isMouseDown = false);
slider.addEventListener('mouseup', () => isMouseDown = false);
slider.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    const x = e.pageX - slider.offsetLeft;
    const newWidth = (x / slider.offsetWidth) * 100;
    beforeImage.style.width = newWidth + '%';
});

// Smooth Scrolling for Navigation Links
const scrollLinks = document.querySelectorAll('a.scroll-link');
scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Animations with Fade-in Effects on View
const fadeElements = document.querySelectorAll('.fade-in');
function handleScroll() {
    fadeElements.forEach(elem => {
        const rect = elem.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            elem.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', handleScroll);
handleScroll(); // Check on load

// Counter Animations for Statistics
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 10);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
});

// WhatsApp Link Generation from Contact Form
const whatsappButton = document.querySelector('.whatsapp-button');
whatsappButton.addEventListener('click', () => {
    const message = encodeURIComponent(`Hello, I would like to contact you.`);
    const whatsappLink = `https://wa.me/YOUR_NUMBER?text=${message}`;
    window.open(whatsappLink, '_blank');
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextButton.click();
    } else if (e.key === 'ArrowLeft') {
        prevButton.click();
    }
});