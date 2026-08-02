// Set Current Year
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Mobile Hamburger menu toggle script
const mobileMenuBtn = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const hamTop = document.getElementById("hamburger-top");
const hamMid = document.getElementById("hamburger-mid");
const hamBot = document.getElementById("hamburger-bot");

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
        const isClosed = mobileMenu.classList.contains("hidden");
        if (isClosed) {
            mobileMenu.classList.remove("hidden");
            setTimeout(() => {
                mobileMenu.classList.remove("scale-95", "opacity-0");
            }, 10);
            if (hamTop) hamTop.classList.add("rotate-45", "translate-y-2");
            if (hamMid) hamMid.classList.add("opacity-0");
            if (hamBot) hamBot.classList.add("-rotate-45", "-translate-y-2");
        } else {
            mobileMenu.classList.add("scale-95", "opacity-0");
            setTimeout(() => {
                mobileMenu.classList.add("hidden");
            }, 300);
            if (hamTop) hamTop.classList.remove("rotate-45", "translate-y-2");
            if (hamMid) hamMid.classList.remove("opacity-0");
            if (hamBot) hamBot.classList.remove("-rotate-45", "-translate-y-2");
        }
    });

    // Close dropdown when nav links clicked
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
