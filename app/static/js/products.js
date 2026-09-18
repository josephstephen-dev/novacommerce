/* =========================================================
PRODUCTS JAVASCRIPT
FILE: /static/js/products.js
========================================================= */


/* =========================================================
PRODUCT DATA
========================================================= */

const products = [

{
id:1,
name:"Nova X Headphones",
category:"electronics",
price:129,
rating:4.8,
image:"/static/images/products/headphone.jpg",
badge:"HOT",
stock:true
},

{
id:2,
name:"RGB Gaming Keyboard",
category:"gaming",
price:89,
rating:4.7,
image:"/static/images/products/keyboard.jpg",
badge:"NEW",
stock:true
},

{
id:3,
name:"Premium Smart Watch",
category:"mobiles",
price:159,
rating:4.9,
image:"/static/images/products/watch.jpg",
badge:"TRENDING",
stock:true
},

{
id:4,
name:"Luxury Fashion Hoodie",
category:"fashion",
price:74,
rating:4.5,
image:"/static/images/products/fashion.jpg",
badge:"SALE",
stock:true
},

{
id:5,
name:"Professional Gaming Chair",
category:"gaming",
price:219,
rating:4.6,
image:"/static/images/products/chair.jpg",
badge:"BEST",
stock:true
},

{
id:6,
name:"Beauty Essentials Kit",
category:"beauty",
price:55,
rating:4.4,
image:"/static/images/products/beauty.jpg",
badge:"POPULAR",
stock:true
},

{
id:7,
name:"Kitchen Blender Pro",
category:"kitchen",
price:98,
rating:4.5,
image:"/static/images/products/kitchen.jpg",
badge:"LIMITED",
stock:true
},

{
id:8,
name:"Modern Business Book",
category:"books",
price:28,
rating:4.9,
image:"/static/images/products/book.jpg",
badge:"TOP",
stock:true
}

];


/* =========================================================
DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

initializeProducts();
initializeFilters();
initializeSorting();
initializePriceSlider();
initializePagination();
initializeQuickView();
initializeWishlist();
initializeSearchFilter();
initializeViewToggle();

});


/* =========================================================
GLOBAL VARIABLES
========================================================= */

let filteredProducts = [...products];
let currentPage = 1;
const productsPerPage = 6;


/* =========================================================
RENDER PRODUCTS
========================================================= */

function initializeProducts(){

renderProducts(filteredProducts);

}


function renderProducts(productList){

const grid = document.querySelector(".products-grid");

if(!grid) return;

grid.innerHTML = "";

const start = (currentPage - 1) * productsPerPage;
const end = start + productsPerPage;

const paginatedProducts = productList.slice(start, end);

if(paginatedProducts.length === 0){

grid.innerHTML = `
<div class="empty-products">
<i class="fa-solid fa-box-open"></i>
<h3>No Products Found</h3>
<p>Try adjusting your filters.</p>
</div>
`;

return;

}

paginatedProducts.forEach(product => {

const productCard = document.createElement("div");

productCard.className = "product-card fade-in";

productCard.innerHTML = `

<div class="product-image">

<img src="${product.image}" alt="${product.name}">

<span class="product-badge">
${product.badge}
</span>

<div class="product-actions">

<button class="wishlist-btn" data-id="${product.id}">
<i class="fa-regular fa-heart"></i>
</button>

<button class="quick-view-btn" data-id="${product.id}">
<i class="fa-solid fa-eye"></i>
</button>

</div>

</div>

<div class="product-content">

<div class="product-category">
${product.category}
</div>

<h3>
${product.name}
</h3>

<div class="product-rating">

<div class="stars">
${generateStars(product.rating)}
</div>

<span>
${product.rating}
</span>

</div>

<div class="product-footer">

<div class="product-price">
$${product.price}
</div>

<button class="add-cart-btn">
<i class="fa-solid fa-cart-shopping"></i>
Add
</button>

</div>

</div>

`;

grid.appendChild(productCard);

});

updateProductCount(productList.length);

renderPagination(productList.length);

}


/* =========================================================
STAR GENERATOR
========================================================= */

function generateStars(rating){

let stars = "";

for(let i = 1; i <= 5; i++){

if(i <= Math.floor(rating)){

stars += `<i class="fa-solid fa-star"></i>`;

}else{

stars += `<i class="fa-regular fa-star"></i>`;

}

}

return stars;

}


/* =========================================================
UPDATE PRODUCT COUNT
========================================================= */

function updateProductCount(count){

const countElement = document.querySelector(".products-count");

if(countElement){

countElement.textContent = `${count} Products Found`;

}

}


/* =========================================================
CATEGORY FILTERS
========================================================= */

function initializeFilters(){

const filterButtons = document.querySelectorAll("[data-category]");

filterButtons.forEach(button => {

button.addEventListener("click", () => {

filterButtons.forEach(btn => {
btn.classList.remove("active");
});

button.classList.add("active");

const category = button.dataset.category;

if(category === "all"){

filteredProducts = [...products];

}else{

filteredProducts = products.filter(product =>
product.category === category
);

}

currentPage = 1;

renderProducts(filteredProducts);

showToast(
`${category.toUpperCase()} products loaded`,
"success"
);

});

});

}


/* =========================================================
SORTING SYSTEM
========================================================= */

function initializeSorting(){

const sortSelect = document.getElementById("sortProducts");

if(!sortSelect) return;

sortSelect.addEventListener("change", () => {

const value = sortSelect.value;

switch(value){

case "low-high":

filteredProducts.sort((a,b) => a.price - b.price);
break;

case "high-low":

filteredProducts.sort((a,b) => b.price - a.price);
break;

case "rating":

filteredProducts.sort((a,b) => b.rating - a.rating);
break;

case "name":

filteredProducts.sort((a,b) =>
a.name.localeCompare(b.name)
);
break;

default:

filteredProducts = [...filteredProducts];

}

renderProducts(filteredProducts);

showToast(
`Products sorted by ${value}`,
"default"
);

});

}


/* =========================================================
PRICE RANGE SLIDER
========================================================= */

function initializePriceSlider(){

const slider = document.getElementById("priceRange");
const priceText = document.getElementById("priceValue");

if(!slider || !priceText) return;

priceText.textContent = `$${slider.value}`;

slider.addEventListener("input", () => {

priceText.textContent = `$${slider.value}`;

const maxPrice = parseInt(slider.value);

filteredProducts = products.filter(product =>
product.price <= maxPrice
);

currentPage = 1;

renderProducts(filteredProducts);

});

}


/* =========================================================
SEARCH FILTER
========================================================= */

function initializeSearchFilter(){

const searchInput = document.getElementById("productSearch");

if(!searchInput) return;

searchInput.addEventListener("input", () => {

const value = searchInput.value.toLowerCase().trim();

filteredProducts = products.filter(product =>
product.name.toLowerCase().includes(value)
||
product.category.toLowerCase().includes(value)
);

currentPage = 1;

renderProducts(filteredProducts);

});

}


/* =========================================================
PAGINATION
========================================================= */

function initializePagination(){

renderPagination(filteredProducts.length);

}


function renderPagination(totalProducts){

const pagination = document.querySelector(".pagination");

if(!pagination) return;

pagination.innerHTML = "";

const totalPages = Math.ceil(
totalProducts / productsPerPage
);

if(totalPages <= 1) return;

for(let i = 1; i <= totalPages; i++){

const button = document.createElement("button");

button.textContent = i;

if(i === currentPage){
button.classList.add("active");
}

button.addEventListener("click", () => {

currentPage = i;

renderProducts(filteredProducts);

window.scrollTo({
top:0,
behavior:"smooth"
});

});

pagination.appendChild(button);

}

}


/* =========================================================
QUICK VIEW MODAL
========================================================= */

function initializeQuickView(){

document.addEventListener("click", (e) => {

const button = e.target.closest(".quick-view-btn");

if(!button) return;

const productId = parseInt(button.dataset.id);

const product = products.find(p => p.id === productId);

if(!product) return;

openQuickView(product);

});

}


function openQuickView(product){

let modal = document.querySelector(".quick-view-modal");

if(!modal){

modal = document.createElement("div");

modal.className = "quick-view-modal";

document.body.appendChild(modal);

}

modal.innerHTML = `

<div class="quick-view-content">

<button class="close-quick-view">
<i class="fa-solid fa-xmark"></i>
</button>

<div class="quick-view-grid">

<div class="quick-view-image">
<img src="${product.image}" alt="${product.name}">
</div>

<div class="quick-view-info">

<span class="quick-category">
${product.category}
</span>

<h2>
${product.name}
</h2>

<div class="quick-rating">
${generateStars(product.rating)}
<span>${product.rating}</span>
</div>

<p class="quick-description">
Premium quality product built with modern technology and luxury design experience.
</p>

<div class="quick-price">
$${product.price}
</div>

<div class="quick-buttons">

<a href="product-details.html" class="view-details-btn">
View Details
</a>

<button class="add-cart-btn">
Add To Cart
</button>

</div>

</div>

</div>

</div>

`;

modal.classList.add("active");

document.body.style.overflow = "hidden";

const closeBtn = modal.querySelector(".close-quick-view");

closeBtn.addEventListener("click", closeQuickView);

modal.addEventListener("click", (e) => {

if(e.target === modal){
closeQuickView();
}

});

}


function closeQuickView(){

const modal = document.querySelector(".quick-view-modal");

if(!modal) return;

modal.classList.remove("active");

document.body.style.overflow = "";

}


/* =========================================================
WISHLIST SYSTEM
========================================================= */

function initializeWishlist(){

document.addEventListener("click", (e) => {

const button = e.target.closest(".wishlist-btn");

if(!button) return;

button.classList.toggle("active");

const icon = button.querySelector("i");

if(button.classList.contains("active")){

icon.className = "fa-solid fa-heart";

showToast(
"Added to wishlist",
"success"
);

}else{

icon.className = "fa-regular fa-heart";

showToast(
"Removed from wishlist",
"default"
);

}

});

}


/* =========================================================
GRID / LIST VIEW
========================================================= */

function initializeViewToggle(){

const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");
const grid = document.querySelector(".products-grid");

if(!gridBtn || !listBtn || !grid) return;

gridBtn.addEventListener("click", () => {

grid.classList.remove("list-view");

gridBtn.classList.add("active");
listBtn.classList.remove("active");

});

listBtn.addEventListener("click", () => {

grid.classList.add("list-view");

listBtn.classList.add("active");
gridBtn.classList.remove("active");

});

}


/* =========================================================
FILTER SIDEBAR TOGGLE
========================================================= */

const filterToggle = document.getElementById("filterToggle");
const filterSidebar = document.getElementById("filterSidebar");
const closeFilters = document.getElementById("closeFilters");

filterToggle.addEventListener("click", () => {
    filterSidebar.classList.add("active");
});

closeFilters.addEventListener("click", () => {
    filterSidebar.classList.remove("active");
});



/* =========================================================
LOAD MORE BUTTON
========================================================= */

const loadMoreBtn = document.getElementById("loadMoreBtn");

if(loadMoreBtn){

loadMoreBtn.addEventListener("click", () => {

loadMoreBtn.innerHTML = `
<i class="fa-solid fa-spinner fa-spin"></i>
Loading...
`;

setTimeout(() => {

loadMoreBtn.innerHTML = `
<i class="fa-solid fa-check"></i>
Products Loaded
`;

showToast(
"More products loaded",
"success"
);

}, 1500);

});

}


/* =========================================================
PRODUCT CARD HOVER PHYSICS
========================================================= */

document.addEventListener("mousemove", (e) => {

const cards = document.querySelectorAll(".product-card");

cards.forEach(card => {

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

if(
x >= 0 &&
y >= 0 &&
x <= rect.width &&
y <= rect.height
){

const rotateY = ((x / rect.width) - 0.5) * 10;
const rotateX = ((y / rect.height) - 0.5) * -10;

card.style.transform = `
perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-6px)
`;

}else{

card.style.transform = "";

}

});

});


/* =========================================================
RESET CARD POSITION
========================================================= */

document.addEventListener("mouseleave", () => {

document.querySelectorAll(".product-card").forEach(card => {
card.style.transform = "";
});

});


/* =========================================================
INFINITE SCROLL EFFECT
========================================================= */

const revealObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("revealed");

}

});

},{
threshold:.15
});

document.querySelectorAll(".product-card").forEach(card => {
revealObserver.observe(card);
});


/* =========================================================
COMPARE FEATURE
========================================================= */

let compareList = [];

document.addEventListener("click", (e) => {

const compareBtn = e.target.closest(".compare-btn");

if(!compareBtn) return;

const productId = parseInt(compareBtn.dataset.id);

if(compareList.includes(productId)){

compareList = compareList.filter(id => id !== productId);

showToast(
"Removed from compare",
"default"
);

}else{

compareList.push(productId);

showToast(
"Added to compare",
"success"
);

}

});


/* =========================================================
SAVE FILTERS
========================================================= */

window.addEventListener("beforeunload", () => {

localStorage.setItem(
"nova-products",
JSON.stringify(filteredProducts)
);

});


/* =========================================================
RESTORE FILTERS
========================================================= */

window.addEventListener("load", () => {

const saved = localStorage.getItem("nova-products");

if(saved){

try{

filteredProducts = JSON.parse(saved);

renderProducts(filteredProducts);

}catch(error){

console.warn("Could not restore products");

}

}

});
