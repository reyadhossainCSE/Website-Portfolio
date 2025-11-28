// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-md');
    } else {
        navbar.classList.remove('shadow-md');
    }
});

// Active navigation link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-accent', 'font-semibold');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-accent', 'font-semibold');
        }
    });
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.remove('opacity-0', 'invisible');
        scrollTopBtn.classList.add('opacity-100', 'visible');
    } else {
        scrollTopBtn.classList.add('opacity-0', 'invisible');
        scrollTopBtn.classList.remove('opacity-100', 'visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-bar');
const animateSkills = () => {
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (barTop < windowHeight - 100) {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
};

let skillsAnimated = false;
window.addEventListener('scroll', () => {
    if (!skillsAnimated) {
        const skillsSection = document.getElementById('skills');
        const skillsTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (skillsTop < windowHeight - 200) {
            animateSkills();
            skillsAnimated = true;
        }
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show success message (In production, you would send this to a server)
    formMessage.innerHTML = '<p class="text-green-600 font-semibold">Thank you for your message! I\'ll get back to you soon.</p>';
    
    // Reset form
    contactForm.reset();
    
    // Clear message after 5 seconds
    setTimeout(() => {
        formMessage.innerHTML = '';
    }, 5000);
    
    // In production, you would send the form data to your server:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     formMessage.innerHTML = '<p class="text-green-600 font-semibold">Message sent successfully!</p>';
    //     contactForm.reset();
    // })
    // .catch(error => {
    //     formMessage.innerHTML = '<p class="text-red-600 font-semibold">Error sending message. Please try again.</p>';
    // });
});

// CV Upload Handling
const cvFileInput = document.getElementById('cv-file-input');
const uploadMessage = document.getElementById('upload-message');

cvFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    
    if (file) {
        // Check file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            uploadMessage.innerHTML = '<p class="text-red-600 font-semibold">File size exceeds 5MB limit.</p>';
            cvFileInput.value = '';
            return;
        }
        
        // Check file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            uploadMessage.innerHTML = '<p class="text-red-600 font-semibold">Please upload a PDF, DOC, or DOCX file.</p>';
            cvFileInput.value = '';
            return;
        }
        
        // Show success message
        uploadMessage.innerHTML = `<p class="text-green-600 font-semibold">File "${file.name}" ready to upload. (Note: Upload functionality requires backend integration)</p>`;
        
        // In production, you would upload the file to your server:
        // const formData = new FormData();
        // formData.append('cv', file);
        // 
        // fetch('/api/upload-cv', {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(response => response.json())
        // .then(data => {
        //     uploadMessage.innerHTML = '<p class="text-green-600 font-semibold">CV uploaded successfully!</p>';
        // })
        // .catch(error => {
        //     uploadMessage.innerHTML = '<p class="text-red-600 font-semibold">Error uploading CV. Please try again.</p>';
        // });
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.card-hover').forEach(el => observer.observe(el));

// Typing effect for hero section (optional enhancement)
const typingText = document.querySelector('.gradient-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Uncomment to enable typing effect
    // setTimeout(typeWriter, 500);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Console message for developers
console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #667EEA;');
console.log('%cInterested in the code? This portfolio is built with HTML, Tailwind CSS, and vanilla JavaScript.', 'font-size: 14px; color: #4A5568;');
console.log('%cFeel free to reach out for collaborations!', 'font-size: 14px; color: #764BA2;');