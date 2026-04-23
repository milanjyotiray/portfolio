document.addEventListener('DOMContentLoaded', () => {

    // Intersection Observer for scroll animations
    const defaultOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, defaultOptions);

    // Initial setup: gather elements to observe and apply base fade-in class if not present
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in'); // ensures base transition classes exist
        observer.observe(el);
    });

    // Mobile Navbar Toggle Logic
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Typewriter Effect
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    // Words to type out
    const textArray = [
        "developing real-world digital products.",
        "exploring Artificial Intelligence.",
        "securing complex technical systems.",
        "founding AstraNex Defence.",
        "writing books on life challenges."
    ];
    const typingDelay = 80;
    const erasingDelay = 40;
    const newTextDelay = 2500; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex + 1);
            charIndex++;
            setTimeout(type, typingDelay);
        }
        else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        }
        else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start the typewriter loop
    if (textArray.length) setTimeout(type, newTextDelay + 250);

    // Google Sheets Form Submission
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    // Replace with your actual deployed App Script URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzwHCinWDfBkGdFe5l9U0ew7AjqnDNBL13bG67I3ir4rfpG0fGVmswndepOjUO-MW6U/exec';

    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();

            // UI Loading state
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            formStatus.style.display = 'block';
            formStatus.innerText = 'Submitting your message...';
            formStatus.style.color = 'var(--text-secondary)';

            const formData = new FormData(contactForm);

            fetch(scriptURL, {
                method: 'POST',
                body: formData
            })
                .then(response => response.text())
                .then(data => {
                    formStatus.innerText = 'Success! Your message has been sent.';
                    formStatus.style.color = '#10b981'; // success green
                    contactForm.reset();

                    setTimeout(() => {
                        submitBtn.innerText = 'Send Message';
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '1';
                    }, 3000);
                })
                .catch(error => {
                    formStatus.innerText = 'Oops! Something went wrong.';
                    formStatus.style.color = '#ef4444'; // error red
                    console.error('Error!', error.message);

                    submitBtn.innerText = 'Send Message';
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                });
        });
    }
});
