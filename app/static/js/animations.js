/* =========================================
   NOVA COMMERCE — ANIMATIONS.JS
   Premium UI Interaction Engine
========================================= */


/* =========================
   SCROLL REVEAL ANIMATIONS
========================= */

const revealElements = document.querySelectorAll(`
    .reveal,
    .product-card,
    .category-card,
    .review-card,
    .feature-card,
    .deal-card,
    .brand-card,
    .cart-item-card,
    .dashboard-card,
    .analytics-card,
    .section-title
`);

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active-reveal");

            }

        });

    },

    {
        threshold: 0.15
    }

);

revealElements.forEach(el => {
    revealObserver.observe(el);
});


/* =========================
   FLOATING HOVER EFFECT
========================= */

const hoverCards = document.querySelectorAll(`
    .product-card,
    .category-card,
    .feature-card,
    .dashboard-card,
    .analytics-card,
    .review-card
`);

hoverCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / 20) * -1;
        const rotateY = (x - centerX) / 20;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0px)
        `;

    });

});


/* =========================
   BUTTON RIPPLE EFFECT
========================= */

const rippleButtons = document.querySelectorAll(`
    button,
    .primary-btn,
    .secondary-btn,
    .add-cart-btn,
    .wishlist-btn
`);

rippleButtons.forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const rect = button.getBoundingClientRect();

        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 700);

    });

});


/* =========================
   PARALLAX HERO EFFECT
========================= */

const hero = document.querySelector(".hero-section");

window.addEventListener("scroll", () => {

    if (!hero) return;

    const scrollY = window.scrollY;

    hero.style.backgroundPositionY = `${scrollY * 0.4}px`;

});


/* =========================
   COUNTER ANIMATION
========================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const counter = entry.target;

                const target = +counter.dataset.target;

                let current = 0;

                const increment = target / 100;

                const updateCounter = () => {

                    current += increment;

                    if (current < target) {

                        counter.innerText = Math.floor(current);

                        requestAnimationFrame(updateCounter);

                    } else {

                        counter.innerText = target;

                    }

                };

                updateCounter();

                counterObserver.unobserve(counter);

            }

        });

    },

    {
        threshold: 0.5
    }

);

counters.forEach(counter => {
    counterObserver.observe(counter);
});


/* =========================
   MAGNETIC BUTTON EFFECT
========================= */

const magneticButtons = document.querySelectorAll(`
    .primary-btn,
    .secondary-btn,
    .checkout-btn
`);

magneticButtons.forEach(button => {

    button.addEventListener("mousemove", (e) => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `
            translate(${x * 0.15}px, ${y * 0.25}px)
        `;

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translate(0px,0px)";

    });

});


/* =========================
   IMAGE HOVER ZOOM
========================= */

const zoomImages = document.querySelectorAll(`
    .product-card img,
    .category-card img,
    .deal-card img
`);

zoomImages.forEach(image => {

    image.addEventListener("mouseenter", () => {

        image.style.transform = "scale(1.08)";

    });

    image.addEventListener("mouseleave", () => {

        image.style.transform = "scale(1)";

    });

});


/* =========================
   SMOOTH DROPDOWN MENUS
========================= */

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {

    dropdown.addEventListener("mouseenter", () => {

        dropdown.classList.add("dropdown-active");

    });

    dropdown.addEventListener("mouseleave", () => {

        dropdown.classList.remove("dropdown-active");

    });

});


/* =========================
   LOADING SCREEN
========================= */

window.addEventListener("load", () => {

    const loader = document.querySelector(".page-loader");

    if (!loader) return;

    loader.classList.add("loader-hidden");

    setTimeout(() => {

        loader.style.display = "none";

    }, 700);

});


/* =========================
   SCROLL PROGRESS BAR
========================= */

const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

    if (!progressBar) return;

    const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (window.pageYOffset / totalHeight) * 100;

    progressBar.style.width = `${progress}%`;

});


/* =========================
   AUTO HIDE HEADER
========================= */

let lastScroll = 0;

const header = document.querySelector(".main-header");

window.addEventListener("scroll", () => {

    if (!header) return;

    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {

        header.classList.add("header-hidden");

    } else {

        header.classList.remove("header-hidden");

    }

    lastScroll = currentScroll;

});


/* =========================
   TYPING EFFECT
========================= */

const typingElement = document.querySelector(".typing-text");

if (typingElement) {

    const words = [
        "Premium Electronics",
        "Luxury Fashion",
        "Next-Gen Gaming",
        "Modern Commerce"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingElement.textContent =
                currentWord.substring(0, charIndex++);

            if (charIndex > currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1200);
                return;
            }

        } else {

            typingElement.textContent =
                currentWord.substring(0, charIndex--);

            if (charIndex < 0) {

                deleting = false;

                wordIndex = (wordIndex + 1) % words.length;

            }

        }

        setTimeout(typeEffect, deleting ? 50 : 100);

    }

    typeEffect();

}


/* =========================
   CUSTOM CURSOR GLOW
========================= */

const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    if (!cursorGlow) return;

    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;

});


/* =========================
   STAGGER GRID ANIMATION
========================= */

const staggerItems = document.querySelectorAll(`
    .products-grid .product-card,
    .categories-grid .category-card
`);

staggerItems.forEach((item, index) => {

    item.style.transitionDelay = `${index * 0.08}s`;

});


/* =========================
   TOAST ENTRY ANIMATION
========================= */

const toastObserver = new MutationObserver(() => {

    const toast = document.querySelector(".toast.show");

    if (!toast) return;

    toast.animate(
        [
            {
                transform: "translateY(30px)",
                opacity: 0
            },
            {
                transform: "translateY(0px)",
                opacity: 1
            }
        ],
        {
            duration: 400,
            easing: "ease-out"
        }
    );

});

toastObserver.observe(document.body, {
    childList: true,
    subtree: true
});


/* =========================
   MODAL OPEN ANIMATION
========================= */

const modals = document.querySelectorAll(".modal");

modals.forEach(modal => {

    modal.addEventListener("show", () => {

        modal.classList.add("modal-active");

    });

});


/* =========================
   NAVBAR GLOW ON SCROLL
========================= */

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("header-glow");

    } else {

        header.classList.remove("header-glow");

    }

});


/* =========================
   END
========================= */