/* =========================================================
GLOBAL APP JAVASCRIPT
FILE: /static/js/app.js
========================================================= */


/* =========================================================
DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

initializeTheme();
initializeCartDrawer();
initializeDropdowns();
initializeSmartHeader();
initializeSearchSuggestions();
initializeToastSystem();
initializeMobileMenu();
initializeMegaMenus();
initializeNewsletterForm();
initializeQuantityButtons();
initializeSmoothScroll();
initializeTooltips();
});


/* =========================================================
THEME TOGGLE
========================================================= */

function initializeTheme(){

const themeToggle = document.getElementById("themeToggle");

if(themeToggle){

themeToggle.addEventListener("click", () => {

document.body.classList.toggle("dark-mode");

const icon = themeToggle.querySelector("i");

if(document.body.classList.contains("dark-mode")){

icon.classList.remove("fa-moon");
icon.classList.add("fa-sun");

localStorage.setItem("theme", "dark");

}else{

icon.classList.remove("fa-sun");
icon.classList.add("fa-moon");

localStorage.setItem("theme", "light");

}

});

}


window.addEventListener("DOMContentLoaded", () => {

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){

document.body.classList.add("dark-mode");

const icon = themeToggle.querySelector("i");

icon.classList.remove("fa-moon");
icon.classList.add("fa-sun");

}

});

}


/* =========================================================
CART DRAWER
========================================================= */

function initializeCartDrawer(){

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");

if(!cartBtn || !cartDrawer) return;


/* CREATE OVERLAY */
const overlay = document.createElement("div");
overlay.className = "cart-overlay";
document.body.appendChild(overlay);


/* OPEN CART */
function openCart(){

cartDrawer.classList.add("active");
overlay.classList.add("active");

document.body.style.overflow = "hidden";

}


/* CLOSE CART */
function closeCartDrawer(){

cartDrawer.classList.remove("active");
overlay.classList.remove("active");

document.body.style.overflow = "";

}


/* BUTTON EVENTS */
cartBtn.addEventListener("click", openCart);

if(closeCart){

closeCart.addEventListener("click", closeCartDrawer);

}


/* CLOSE ON OVERLAY CLICK */
overlay.addEventListener("click", closeCartDrawer);


/* ESCAPE KEY CLOSE */
document.addEventListener("keydown", (e) => {

if(e.key === "Escape"){

closeCartDrawer();

}

});


/* IMPORTANT FIX */
/* ENSURE CART NEVER AUTO OPENS ON RESIZE */
window.addEventListener("resize", () => {

if(window.innerWidth <= 1024){

cartDrawer.classList.remove("active");
overlay.classList.remove("active");

document.body.style.overflow = "";

}

});

}


/* =========================================================
HEADER DROPDOWNS
========================================================= */

function initializeDropdowns(){

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {

const menu = dropdown.querySelector(".dropdown-content");

if(!menu) return;

dropdown.addEventListener("mouseenter", () => {
menu.classList.add("active");
});

dropdown.addEventListener("mouseleave", () => {
menu.classList.remove("active");
});

});

}
function initializeSmartHeader(){

const header = document.querySelector(".main-header");

if(!header) return;

let lastScroll = 0;

window.addEventListener("scroll", () => {

const currentScroll = window.pageYOffset;


/* ADD SCROLLED STYLE */
if(currentScroll > 40){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}


/* HIDE ON SCROLL DOWN */
if(currentScroll > lastScroll && currentScroll > 120){

header.classList.add("hide-header");

}

/* SHOW ON SCROLL UP */
else{

header.classList.remove("hide-header");

}

lastScroll = currentScroll;

});

}


/* =========================================================
MEGA MENUS
========================================================= */

function initializeMegaMenus(){

const navDropdowns = document.querySelectorAll(".nav-dropdown");

navDropdowns.forEach(item => {

const megaMenu = item.querySelector(".mega-menu");

if(!megaMenu) return;

item.addEventListener("mouseenter", () => {
menu.style.display = "flex";
menu.classList.add("active");
});

item.addEventListener("mouseleave", () => {
menu.style.display = "none";
menu.classList.remove("active");
});

});

}

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

function openMenu(){

    sidebar.classList.add("active");
    overlay.classList.add("active");

    document.body.classList.add("menu-open");
}

function closeMenu(){

    sidebar.classList.remove("active");
    overlay.classList.remove("active");

    document.body.classList.remove("menu-open");
}

menuBtn.addEventListener("click", openMenu);

closeBtn.addEventListener("click", closeMenu);

overlay.addEventListener("click", closeMenu);


/* =========================================================
SLIDE BANNER
========================================================= */

const slides = document.querySelectorAll(".slide");
const nextSlide = document.getElementById("nextSlide");

let currentSlide = 0;

function showSlide(index){

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");
}

nextSlide.addEventListener("click", () => {

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);

});

/* AUTO SLIDE */
setInterval(() => {

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);

}, 5000);

/* =========================================================
SEARCH SUGGESTIONS
========================================================= */

function initializeSearchSuggestions(){

const searchInput = document.querySelector(".search-container input");

if(!searchInput) return;

const suggestions = [
"Gaming Keyboard",
"Wireless Headphones",
"Smart Watch",
"4K Monitor",
"Mechanical Keyboard",
"Luxury Fashion",
"Gaming Chair",
"iPhone Accessories",
"Beauty Essentials",
"Kitchen Appliances"
];

const suggestionBox = document.createElement("div");
suggestionBox.className = "search-suggestions";

searchInput.parentElement.appendChild(suggestionBox);

searchInput.addEventListener("input", () => {

const value = searchInput.value.toLowerCase().trim();

suggestionBox.innerHTML = "";

if(value.length < 1){
suggestionBox.classList.remove("active");
return;
}

const filtered = suggestions.filter(item =>
item.toLowerCase().includes(value)
);

if(filtered.length === 0){
suggestionBox.classList.remove("active");
return;
}

filtered.forEach(item => {

const div = document.createElement("div");
div.className = "suggestion-item";
div.innerHTML = `
<i class="fa-solid fa-magnifying-glass"></i>
<span>${item}</span>
`;

div.addEventListener("click", () => {
searchInput.value = item;
suggestionBox.classList.remove("active");
});

suggestionBox.appendChild(div);

});

suggestionBox.classList.add("active");

});

document.addEventListener("click", (e) => {

if(!e.target.closest(".search-container")){
suggestionBox.classList.remove("active");
}

});

}


/* =========================================================
TOAST NOTIFICATIONS
========================================================= */

function initializeToastSystem(){

if(document.querySelector(".toast-container")) return;

const toastContainer = document.createElement("div");
toastContainer.className = "toast-container";

document.body.appendChild(toastContainer);

}

function showToast(message, type = "default"){

const container = document.querySelector(".toast-container");

if(!container) return;

const toast = document.createElement("div");
toast.className = `toast toast-${type}`;

let icon = "fa-circle-info";

if(type === "success"){
icon = "fa-circle-check";
}

if(type === "error"){
icon = "fa-circle-xmark";
}

toast.innerHTML = `
<i class="fa-solid ${icon}"></i>
<span>${message}</span>
`;

container.appendChild(toast);

setTimeout(() => {
toast.classList.add("show");
}, 100);

setTimeout(() => {

toast.classList.remove("show");

setTimeout(() => {
toast.remove();
}, 300);

}, 3500);

}


/* =========================================================
MOBILE MENU
========================================================= */

function initializeMobileMenu(){

const mobileBtn = document.getElementById("mobileMenuBtn");
const nav = document.querySelector(".main-nav");

if(!mobileBtn || !nav) return;

mobileBtn.addEventListener("click", () => {

nav.classList.toggle("mobile-active");

const icon = mobileBtn.querySelector("i");

if(nav.classList.contains("mobile-active")){
icon.className = "fa-solid fa-xmark";
}else{
icon.className = "fa-solid fa-bars";
}

});

}


/* =========================================================
NEWSLETTER FORM
========================================================= */

function initializeNewsletterForm(){

const forms = document.querySelectorAll(".newsletter-content form");

forms.forEach(form => {

form.addEventListener("submit", (e) => {

e.preventDefault();

const input = form.querySelector("input");

if(!input.value.trim()){

showToast(
"Please enter a valid email",
"error"
);

return;

}

showToast(
"Successfully subscribed to Nova Commerce",
"success"
);

input.value = "";

});

});

}


/* =========================================================
QUANTITY BUTTONS
========================================================= */

function initializeQuantityButtons(){

const quantityWrappers = document.querySelectorAll(".quantity-selector");

quantityWrappers.forEach(wrapper => {

const minusBtn = wrapper.querySelector(".minus");
const plusBtn = wrapper.querySelector(".plus");
const input = wrapper.querySelector("input");

if(!minusBtn || !plusBtn || !input) return;

minusBtn.addEventListener("click", () => {

let current = parseInt(input.value);

if(current > 1){
input.value = current - 1;
}

});

plusBtn.addEventListener("click", () => {

let current = parseInt(input.value);

input.value = current + 1;

});

});

}


/* =========================================================
ADD TO CART BUTTONS
========================================================= */

document.addEventListener("click", (e) => {

const button = e.target.closest(".add-cart-btn");

if(!button) return;

button.classList.add("loading");

const originalText = button.innerHTML;

button.innerHTML = `
<i class="fa-solid fa-spinner fa-spin"></i>
Adding...
`;

setTimeout(() => {

button.classList.remove("loading");

button.innerHTML = `
<i class="fa-solid fa-check"></i>
Added
`;

showToast(
"Product added to cart",
"success"
);

setTimeout(() => {
button.innerHTML = originalText;
}, 1800);

}, 1200);

});


/* =========================================================
WISHLIST BUTTONS
========================================================= */

document.addEventListener("click", (e) => {

const wishlistBtn = e.target.closest(".wishlist-btn");

if(!wishlistBtn) return;

wishlistBtn.classList.toggle("active");

if(wishlistBtn.classList.contains("active")){

wishlistBtn.innerHTML = `
<i class="fa-solid fa-heart"></i>
`;

showToast(
"Added to wishlist",
"success"
);

}else{

wishlistBtn.innerHTML = `
<i class="fa-regular fa-heart"></i>
`;

showToast(
"Removed from wishlist",
"default"
);

}

});


/* =========================================================
SMOOTH SCROLL
========================================================= */

function initializeSmoothScroll(){

const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {

link.addEventListener("click", (e) => {

const targetId = link.getAttribute("href");

if(targetId === "#") return;

const target = document.querySelector(targetId);

if(target){

e.preventDefault();

target.scrollIntoView({
behavior:"smooth",
block:"start"
});

}

});

});

}


/* =========================================================
TOOLTIPS
========================================================= */

function initializeTooltips(){

const tooltipItems = document.querySelectorAll("[data-tooltip]");

tooltipItems.forEach(item => {

item.addEventListener("mouseenter", () => {

const tooltip = document.createElement("div");
tooltip.className = "tooltip";

tooltip.textContent = item.dataset.tooltip;

document.body.appendChild(tooltip);

const rect = item.getBoundingClientRect();

tooltip.style.left = `${rect.left + rect.width / 2}px`;
tooltip.style.top = `${rect.top - 12}px`;

setTimeout(() => {
tooltip.classList.add("show");
}, 50);

item._tooltip = tooltip;

});

item.addEventListener("mouseleave", () => {

if(item._tooltip){

item._tooltip.remove();

}

});

});

}


/* =========================================================
PRODUCT QUICK VIEW
========================================================= */

document.addEventListener("click", (e) => {

const quickView = e.target.closest(".quick-view-btn");

if(!quickView) return;

showToast(
"Quick view feature opened",
"default"
);

});


/* =========================================================
PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

const loader = document.querySelector(".page-loader");

if(loader){

loader.classList.add("hidden");

setTimeout(() => {
loader.remove();
}, 500);

}

});


/* =========================================================
SCROLL HEADER EFFECT
========================================================= */

window.addEventListener("scroll", () => {

const header = document.querySelector(".main-header");

if(!header) return;

if(window.scrollY > 40){
header.classList.add("scrolled");
}else{
header.classList.remove("scrolled");
}

});


/* =========================================================
ANIMATED COUNTERS
========================================================= */

function animateCounter(element, target){

let current = 0;

const increment = target / 80;

const interval = setInterval(() => {

current += increment;

if(current >= target){

element.textContent = target;
clearInterval(interval);

}else{

element.textContent = Math.floor(current);

}

}, 20);

}

const counters = document.querySelectorAll("[data-counter]");

const counterObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

const element = entry.target;
const target = parseInt(element.dataset.counter);

animateCounter(element, target);

counterObserver.unobserve(element);

}

});

},{
threshold:.5
});

counters.forEach(counter => {
counterObserver.observe(counter);
});


/* =========================================================
PRODUCT IMAGE HOVER EFFECT
========================================================= */

const productImages = document.querySelectorAll(".product-card img");

productImages.forEach(image => {

image.addEventListener("mousemove", (e) => {

const rect = image.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

image.style.transformOrigin = `${x}px ${y}px`;
image.style.transform = "scale(1.08)";

});

image.addEventListener("mouseleave", () => {
image.style.transform = "scale(1)";
});

});


/* =========================================================
ESC CLOSE MODALS
========================================================= */

document.addEventListener("keydown", (e) => {

if(e.key === "Escape"){

document
.querySelectorAll(".modal.active")
.forEach(modal => {
modal.classList.remove("active");
});

}

});


/* =========================================================
GLOBAL ERROR HANDLER
========================================================= */

window.addEventListener("error", (e) => {

console.warn(
"Nova Commerce handled an error:",
e.message
);

});