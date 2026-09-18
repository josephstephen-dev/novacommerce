/* =========================================
   NOVA COMMERCE — ADMIN.JS
   Enterprise Admin Dashboard Logic
========================================= */


/* =========================
   SIDEBAR TOGGLE
========================= */

const sidebarToggle = document.querySelector(".sidebar-toggle");
const adminSidebar = document.querySelector(".admin-sidebar");

if (sidebarToggle && adminSidebar) {

    sidebarToggle.addEventListener("click", () => {

        adminSidebar.classList.toggle("sidebar-open");

    });

}


/* =========================
   ACTIVE SIDEBAR LINK
========================= */

const sidebarLinks = document.querySelectorAll(".sidebar-link");

sidebarLinks.forEach(link => {

    link.addEventListener("click", () => {

        sidebarLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


/* =========================
   DASHBOARD COUNTER ANIMATION
========================= */

const statCounters = document.querySelectorAll(".stat-number");

function animateCounter(counter) {

    const target = +counter.dataset.target;

    let current = 0;

    const increment = target / 80;

    function updateCounter() {

        current += increment;

        if (current < target) {

            counter.innerText = Math.floor(current).toLocaleString();

            requestAnimationFrame(updateCounter);

        } else {

            counter.innerText = target.toLocaleString();

        }

    }

    updateCounter();

}

const counterObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                counterObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.4
    }

);

statCounters.forEach(counter => {
    counterObserver.observe(counter);
});


/* =========================
   SALES CHART
========================= */

const salesCanvas = document.getElementById("salesChart");

if (salesCanvas) {

    const ctx = salesCanvas.getContext("2d");

    const salesData = [1200, 1900, 1700, 2500, 3100, 2800, 3900];
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    function drawChart() {

        ctx.clearRect(0, 0, salesCanvas.width, salesCanvas.height);

        const chartHeight = 220;
        const chartWidth = 600;
        const padding = 40;

        const maxValue = Math.max(...salesData);

        /* GRID */

        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth = 1;

        for (let i = 0; i <= 5; i++) {

            const y = padding + (chartHeight / 5) * i;

            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(chartWidth, y);
            ctx.stroke();

        }

        /* LINE */

        ctx.beginPath();
        ctx.strokeStyle = "#ff9f1c";
        ctx.lineWidth = 4;

        salesData.forEach((value, index) => {

            const x =
                padding +
                (index * ((chartWidth - padding * 2) / (salesData.length - 1)));

            const y =
                chartHeight -
                (value / maxValue) * 160 +
                padding;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

        });

        ctx.stroke();

        /* POINTS */

        salesData.forEach((value, index) => {

            const x =
                padding +
                (index * ((chartWidth - padding * 2) / (salesData.length - 1)));

            const y =
                chartHeight -
                (value / maxValue) * 160 +
                padding;

            ctx.beginPath();
            ctx.fillStyle = "#ffffff";
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();

        });

        /* LABELS */

        ctx.fillStyle = "#999";
        ctx.font = "14px Inter";

        labels.forEach((label, index) => {

            const x =
                padding +
                (index * ((chartWidth - padding * 2) / (labels.length - 1)));

            ctx.fillText(label, x - 10, chartHeight + 30);

        });

    }

    drawChart();

}


/* =========================
   PRODUCT UPLOAD MODAL
========================= */

const uploadBtn = document.querySelector(".open-upload-modal");
const uploadModal = document.querySelector(".upload-modal");
const closeModalBtn = document.querySelector(".close-modal");

if (uploadBtn && uploadModal) {

    uploadBtn.addEventListener("click", () => {

        uploadModal.classList.add("modal-show");

    });

}

if (closeModalBtn && uploadModal) {

    closeModalBtn.addEventListener("click", () => {

        uploadModal.classList.remove("modal-show");

    });

}


/* CLOSE MODAL OUTSIDE CLICK */

window.addEventListener("click", (e) => {

    if (e.target === uploadModal) {

        uploadModal.classList.remove("modal-show");

    }

});


/* =========================
   PRODUCT IMAGE PREVIEW
========================= */

const imageInput = document.querySelector("#productImage");
const previewImage = document.querySelector(".image-preview");

if (imageInput && previewImage) {

    imageInput.addEventListener("change", () => {

        const file = imageInput.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            previewImage.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
            `;

        };

        reader.readAsDataURL(file);

    });

}


/* =========================
   ORDER STATUS FILTER
========================= */

const statusFilter = document.querySelector("#statusFilter");
const orderRows = document.querySelectorAll(".order-row");

if (statusFilter) {

    statusFilter.addEventListener("change", () => {

        const value = statusFilter.value;

        orderRows.forEach(row => {

            const status = row.dataset.status;

            if (value === "all" || status === value) {

                row.style.display = "grid";

            } else {

                row.style.display = "none";

            }

        });

    });

}


/* =========================
   SEARCH TABLE
========================= */

const tableSearch = document.querySelector("#tableSearch");

if (tableSearch) {

    tableSearch.addEventListener("keyup", () => {

        const query = tableSearch.value.toLowerCase();

        const rows = document.querySelectorAll(".inventory-row");

        rows.forEach(row => {

            const text = row.innerText.toLowerCase();

            row.style.display =
                text.includes(query) ? "grid" : "none";

        });

    });

}


/* =========================
   NOTIFICATION SYSTEM
========================= */

function showAdminNotification(message, type = "success") {

    let container = document.querySelector(".admin-notifications");

    if (!container) {

        container = document.createElement("div");
        container.className = "admin-notifications";

        document.body.appendChild(container);

    }

    const notification = document.createElement("div");

    notification.className = `admin-toast ${type}`;

    notification.innerHTML = `
        <i class="fa-solid fa-bell"></i>
        <span>${message}</span>
    `;

    container.appendChild(notification);

    setTimeout(() => {

        notification.classList.add("show");

    }, 50);

    setTimeout(() => {

        notification.classList.remove("show");

        setTimeout(() => {
            notification.remove();
        }, 300);

    }, 3500);

}


/* =========================
   SAVE PRODUCT FORM
========================= */

const uploadForm = document.querySelector(".upload-form");

if (uploadForm) {

    uploadForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const productName =
            document.querySelector("#productName").value;

        showAdminNotification(
            `${productName} uploaded successfully`
        );

        uploadForm.reset();

        if (previewImage) {
            previewImage.innerHTML = "";
        }

        uploadModal.classList.remove("modal-show");

    });

}


/* =========================
   LIVE CLOCK
========================= */

const liveClock = document.querySelector(".live-clock");

function updateClock() {

    if (!liveClock) return;

    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    liveClock.textContent = time;

}

setInterval(updateClock, 1000);

updateClock();


/* =========================
   TRAFFIC BARS ANIMATION
========================= */

const trafficBars = document.querySelectorAll(".traffic-bar-fill");

trafficBars.forEach(bar => {

    const width = bar.dataset.width;

    setTimeout(() => {

        bar.style.width = width + "%";

    }, 500);

});


/* =========================
   RECENT ACTIVITY FADE-IN
========================= */

const activities = document.querySelectorAll(".activity-item");

activities.forEach((item, index) => {

    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";

    setTimeout(() => {

        item.style.transition = "all 0.5s ease";

        item.style.opacity = "1";
        item.style.transform = "translateY(0px)";

    }, index * 120);

});


/* =========================
   DARK MODE SUPPORT
========================= */

const adminThemeToggle = document.querySelector(".admin-theme-toggle");

if (adminThemeToggle) {

    adminThemeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const icon = adminThemeToggle.querySelector("i");

        if (document.body.classList.contains("light-theme")) {

            icon.className = "fa-solid fa-sun";

            localStorage.setItem("novaAdminTheme", "light");

        } else {

            icon.className = "fa-solid fa-moon";

            localStorage.setItem("novaAdminTheme", "dark");

        }

    });

}


/* LOAD SAVED THEME */

const savedTheme = localStorage.getItem("novaAdminTheme");

if (savedTheme === "light") {

    document.body.classList.add("light-theme");

}


/* =========================
   AUTO REFRESH DASHBOARD
========================= */

function fakeRealtimeUpdate() {

    const revenueElement =
        document.querySelector(".live-revenue");

    if (!revenueElement) return;

    let current =
        parseInt(revenueElement.dataset.amount);

    current += Math.floor(Math.random() * 300);

    revenueElement.dataset.amount = current;

    revenueElement.innerText =
        "$" + current.toLocaleString();

}

setInterval(fakeRealtimeUpdate, 6000);


/* =========================
   EXPORT REPORT BUTTON
========================= */

const exportBtn = document.querySelector(".export-report-btn");

if (exportBtn) {

    exportBtn.addEventListener("click", () => {

        showAdminNotification(
            "Sales report exported successfully"
        );

    });

}


/* =========================
   DELETE PRODUCT
========================= */

document.querySelectorAll(".delete-product-btn")
.forEach(btn => {

    btn.addEventListener("click", () => {

        const row = btn.closest(".inventory-row");

        row.style.opacity = "0";

        setTimeout(() => {

            row.remove();

        }, 300);

        showAdminNotification(
            "Product removed",
            "danger"
        );

    });

});


/* =========================
   MOBILE RESPONSIVENESS
========================= */

window.addEventListener("resize", () => {

    if (window.innerWidth > 992) {

        adminSidebar?.classList.remove("sidebar-open");

    }

});


/* =========================
   PAGE LOADED
========================= */

window.addEventListener("load", () => {

    document.body.classList.add("dashboard-loaded");

});


/* =========================================
   END OF ADMIN.JS
========================================= */