/* =========================================
   NOVA COMMERCE — CART.JS
   Professional Cart System
========================================= */


/* =========================
   CART STATE
========================= */

let cart = JSON.parse(localStorage.getItem("novaCart")) || [];


/* =========================
   SAVE CART
========================= */

function saveCart() {
    localStorage.setItem("novaCart", JSON.stringify(cart));
}


/* =========================
   FORMAT CURRENCY
========================= */

function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
}


/* =========================
   UPDATE CART COUNT
========================= */

function updateCartCount() {

    const count = cart.reduce((total, item) => total + item.quantity, 0);

    document.querySelectorAll(".cart-count").forEach(counter => {
        counter.textContent = count;
    });
}


/* =========================
   RENDER CART ITEMS
========================= */

function renderCart() {

    const cartContainer = document.querySelector(".cart-items-container");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
        <div class="empty-cart">
            <i class="fa-solid fa-cart-shopping"></i>
            <h2>Your Cart Is Empty</h2>
            <p>Add products to start shopping.</p>
            <a href="products.html" class="shop-btn">
                Browse Products
            </a>
        </div>
        `;

        updateSummary();
        return;
    }

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item-card");

        cartItem.innerHTML = `
        
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>

        <div class="cart-item-info">

            <div class="cart-item-top">

                <div>
                    <h3>${item.name}</h3>
                    <p>${item.category || "Premium Product"}</p>
                </div>

                <button class="remove-btn" data-id="${item.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>

            <div class="cart-item-bottom">

                <div class="quantity-controls">

                    <button class="decrease-btn" data-id="${item.id}">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button class="increase-btn" data-id="${item.id}">
                        +
                    </button>

                </div>

                <div class="cart-pricing">

                    <h4>${formatCurrency(item.price)}</h4>

                    <strong>
                        ${formatCurrency(itemTotal)}
                    </strong>

                </div>

            </div>

        </div>
        `;

        cartContainer.appendChild(cartItem);

    });

    attachCartEvents();

    updateSummary();
}


/* =========================
   UPDATE SUMMARY
========================= */

function updateSummary() {

    const subtotalElement = document.querySelector(".subtotal-price");
    const shippingElement = document.querySelector(".shipping-price");
    const taxElement = document.querySelector(".tax-price");
    const totalElement = document.querySelector(".total-price");

    if (!subtotalElement) return;

    const subtotal = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const shipping = subtotal > 300 ? 0 : 25;

    const tax = subtotal * 0.075;

    const total = subtotal + shipping + tax;

    subtotalElement.textContent = formatCurrency(subtotal);

    shippingElement.textContent =
        shipping === 0 ? "FREE" : formatCurrency(shipping);

    taxElement.textContent = formatCurrency(tax);

    totalElement.textContent = formatCurrency(total);
}


/* =========================
   ADD TO CART
========================= */

function addToCart(product) {

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();

    updateCartCount();

    renderCart();

    showToast(`${product.name} added to cart`);
}


/* =========================
   REMOVE ITEM
========================= */

function removeItem(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();

    renderCart();

    updateCartCount();

    showToast("Item removed from cart");
}


/* =========================
   INCREASE QUANTITY
========================= */

function increaseQuantity(id) {

    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += 1;

    saveCart();

    renderCart();

    updateCartCount();
}


/* =========================
   DECREASE QUANTITY
========================= */

function decreaseQuantity(id) {

    const item = cart.find(item => item.id === id);

    if (!item) return;

    if (item.quantity > 1) {

        item.quantity -= 1;

    } else {

        removeItem(id);
        return;
    }

    saveCart();

    renderCart();

    updateCartCount();
}


/* =========================
   ATTACH EVENTS
========================= */

function attachCartEvents() {

    document.querySelectorAll(".increase-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            increaseQuantity(btn.dataset.id);

        });

    });

    document.querySelectorAll(".decrease-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            decreaseQuantity(btn.dataset.id);

        });

    });

    document.querySelectorAll(".remove-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            removeItem(btn.dataset.id);

        });

    });
}


/* =========================
   TOAST NOTIFICATIONS
========================= */

function showToast(message) {

    let toast = document.querySelector(".toast");

    if (!toast) {

        toast = document.createElement("div");
        toast.classList.add("toast");

        document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


/* =========================
   PROMO CODE
========================= */

const promoForm = document.querySelector(".promo-form");

if (promoForm) {

    promoForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const promoInput = document.querySelector(".promo-input");

        const code = promoInput.value.trim().toUpperCase();

        if (code === "NOVA20") {

            showToast("Promo code applied successfully!");

        } else {

            showToast("Invalid promo code");
        }

    });

}


/* =========================
   CHECKOUT BUTTON
========================= */

const checkoutBtn = document.querySelector(".checkout-btn");

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) {

            showToast("Your cart is empty");
            return;
        }

        showToast("Redirecting to secure checkout...");

        setTimeout(() => {

            window.location.href = "checkout.html";

        }, 1500);

    });

}


/* =========================
   CONTINUE SHOPPING
========================= */

const continueShoppingBtn =
    document.querySelector(".continue-shopping-btn");

if (continueShoppingBtn) {

    continueShoppingBtn.addEventListener("click", () => {

        window.location.href = "products.html";

    });

}


/* =========================
   FAKE INITIAL PRODUCTS
   FOR DEMO PORTFOLIO
========================= */

if (cart.length === 0) {

    cart = [

        {
            id: "1",
            name: "Nova Gaming Headset",
            category: "Gaming",
            image: "/static/images/products/headphone.jpg",
            price: 129,
            quantity: 1
        },

        {
            id: "2",
            name: "Ultra Mechanical Keyboard",
            category: "Electronics",
            image: "/static/images/products/keyboard.jpg",
            price: 89,
            quantity: 2
        }

    ];

    saveCart();
}


/* =========================
   INITIALIZE
========================= */

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    renderCart();

});