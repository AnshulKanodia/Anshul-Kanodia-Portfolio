// --- 1. Typed Roles Subtitle Script ---
const roles = [
    "AI & Backend Systems Engineer",
    "Certified MongoDB Database Administrator",
    "Machine Learning Pipeline Developer",
    "Computer Science Engineering Student"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedRolesEl = document.getElementById("typed-roles");

function typeEffect() {
    if (!typedRolesEl) return;
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typedRolesEl.textContent = currentRole.substring(0, charIndex);

    let typingSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Hold role for 2s
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing next role
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect on load
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 1000);
});

// --- 2. Mobile Menu Toggle ---
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

// Hamburger parts
const hamTop = document.getElementById("hamburger-top");
const hamMid = document.getElementById("hamburger-mid");
const hamBot = document.getElementById("hamburger-bot");

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
        const isClosed = mobileMenu.classList.contains("hidden");
        if (isClosed) {
            // Open menu
            mobileMenu.classList.remove("hidden");
            setTimeout(() => {
                mobileMenu.classList.remove("scale-95", "opacity-0");
            }, 10);
            
            // Toggle Hamburger icon to X
            if (hamTop) hamTop.classList.add("rotate-45", "translate-y-2");
            if (hamMid) hamMid.classList.add("opacity-0");
            if (hamBot) hamBot.classList.add("-rotate-45", "-translate-y-2");
        } else {
            // Close menu
            mobileMenu.classList.add("scale-95", "opacity-0");
            setTimeout(() => {
                mobileMenu.classList.add("hidden");
            }, 300);
            
            // Reset Hamburger icon
            if (hamTop) hamTop.classList.remove("rotate-45", "translate-y-2");
            if (hamMid) hamMid.classList.remove("opacity-0");
            if (hamBot) hamBot.classList.remove("-rotate-45", "-translate-y-2");
        }
    });

    // Close mobile menu when clicking links
    document.querySelectorAll(".mobile-nav-link").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("scale-95", "opacity-0");
            setTimeout(() => {
                mobileMenu.classList.add("hidden");
            }, 300);
            if (hamTop) hamTop.classList.remove("rotate-45", "translate-y-2");
            if (hamMid) hamMid.classList.remove("opacity-0");
            if (hamBot) hamBot.classList.remove("-rotate-45", "-translate-y-2");
        });
    });
}

// --- 3. Hide Scroll Arrow & Change Header Nav styling on scroll ---
const scrollArrow = document.getElementById('scroll-down-arrow');
const headerNav = document.getElementById('header-nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        if (scrollArrow) scrollArrow.classList.add('opacity-0', 'pointer-events-none');
        if (headerNav) headerNav.classList.add('py-2');
    } else {
        if (scrollArrow) scrollArrow.classList.remove('opacity-0', 'pointer-events-none');
        if (headerNav) headerNav.classList.remove('py-2');
    }
});

// --- 4. Smooth Scrolling Interceptor ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// --- 5. Active Navigation Indicator ---
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 120)) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("text-white", "bg-white/10");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("text-white", "bg-white/10");
        }
    });
});

// --- 6. Set Current Year ---
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// --- 7. Reveal Elements on Scroll ---
const reveals = document.querySelectorAll(".reveal");

function revealElements() {
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealElements);
revealElements(); // Trigger initially

// --- 8. Certificate Filtering Logic ---
function filterCertificates(category) {
    const cards = document.querySelectorAll(".cert-card");
    
    // Toggle active classes on tabs
    document.querySelectorAll(".cert-tab").forEach(tab => {
        tab.classList.remove("bg-gradient-to-r", "from-indigo-500", "to-violet-500", "text-white", "border-transparent");
        tab.classList.add("border-white/10", "text-slate-400", "hover:text-white", "hover:border-white/20");
    });

    const activeTab = document.getElementById(`tab-${category}`);
    if (activeTab) {
        activeTab.classList.remove("border-white/10", "text-slate-400", "hover:text-white", "hover:border-white/20");
        activeTab.classList.add("bg-gradient-to-r", "from-indigo-500", "to-violet-500", "text-white", "border-transparent");
    }

    // Animate card heights/visibility
    cards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        
        if (category === "all" || cardCategory === category) {
            card.style.display = "block";
            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "scale(1)";
            }, 50);
        } else {
            card.style.opacity = "0";
            card.style.transform = "scale(0.95)";
            setTimeout(() => {
                card.style.display = "none";
            }, 200);
        }
    });
}

// Global scope bindings for inline calls
window.filterCertificates = filterCertificates;

// --- 9. Fullscreen Certificate Viewer Modal ---
const certModal = document.getElementById("cert-modal");
const certModalImg = document.getElementById("cert-modal-img");
const certModalTitle = document.getElementById("cert-modal-title");

function openCertificateModal(imgSrc, titleText) {
    if (!certModal || !certModalImg || !certModalTitle) return;
    certModalImg.src = imgSrc;
    certModalTitle.textContent = titleText;
    
    certModal.classList.remove("pointer-events-none", "opacity-0");
    certModal.classList.add("opacity-100");
    document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeCertificateModal() {
    if (!certModal) return;
    certModal.classList.remove("opacity-100");
    certModal.classList.add("pointer-events-none", "opacity-0");
    document.body.style.overflow = ""; // Restore background scroll
}

window.openCertificateModal = openCertificateModal;
window.closeCertificateModal = closeCertificateModal;

// Close on ESC keypress
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeCertificateModal();
    }
});

// --- 10. AJAX Form Submission for Formspree ---
async function handleFormSubmit(event, formElement) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const status = document.getElementById('form-message');
    const data = new FormData(formElement);
    
    if (status) {
        status.textContent = 'Sending message...';
        status.className = 'mt-4 text-center text-sm font-semibold text-indigo-400';
    }
    
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner animate-spin"></i>';
    }
    
    try {
        const response = await fetch(formElement.action, {
            method: formElement.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
            if (status) {
                status.textContent = "Thank you! Your message was sent successfully.";
                status.className = 'mt-4 text-center text-sm font-semibold text-emerald-400';
            }
            formElement.reset();
        } else {
            const responseData = await response.json();
            if (status) {
                if (responseData && responseData.errors) {
                    status.textContent = responseData.errors.map(error => error.message).join(", ");
                } else {
                    status.textContent = "Oops! There was a problem submitting your form.";
                }
                status.className = 'mt-4 text-center text-sm font-semibold text-red-400';
            }
        }
    } catch (error) {
        if (status) {
            status.textContent = "Oops! Network error. Please try again.";
            status.className = 'mt-4 text-center text-sm font-semibold text-red-400';
        }
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane text-xs"></i>';
        }
    }
    
    return false;
}

window.handleFormSubmit = handleFormSubmit;
