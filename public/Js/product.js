import { products, fetchProducts } from "./data.js";

// ================= STATE =================
let currentUser = null;

let cartData = [];

const fetchCartData = async () => {
    try {
        const res = await fetch("/api/cart", fetchConfig);
        const data = await res.json();
        cartData = data.items || [];
    } catch (err) {
        console.log("Cart fetch error:", err);
    }
};

// ================= DOM =================
const productsGrid = document.querySelector(".products-grid");
const template = document.getElementById("productCard");
const cartCountSpan = document.getElementById("cartCountBadge");

const categorySelect = document.getElementById("category");
const searchInput = document.getElementById("searchInput");
const suggestionBox = document.getElementById("searchSuggestions");

// ================= COMMON FETCH =================
const fetchConfig = {
    credentials: "include",
    headers: { "Content-Type": "application/json" }
};

// ================= USER =================
const getCurrentUser = async () => {
    try {
        const res = await fetch("/api/auth/me", fetchConfig);
        if (res.ok) currentUser = await res.json();
    } catch {
        console.log("Not logged in");
    }
};

// ================= CART COUNT =================
const fetchCartCount = async () => {
    try {
        const res = await fetch("/api/cart", fetchConfig);
        const data = await res.json();

        const count = (data.items || []).reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        if (cartCountSpan) cartCountSpan.textContent = count;

    } catch (err) {
        console.log("Cart count error:", err);
    }
};

// ================= ADD TO CART =================
const handleAddToCart = async (id) => {
    try {
        const response = await fetch("/api/cart/add", {
            ...fetchConfig,
            method: "POST",
            body: JSON.stringify({ productId: id })
        });

        if (!response.ok) {
            const data = await response.json();
            showToast(data.message || "Failed to add to cart");
            return;
        }

        await fetchCartData();
        await fetchCartCount();
        renderProducts(products);

    } catch (err) {
        console.log("Error adding to cart:", err);
    }
};

// ================= RENDER PRODUCTS =================
const renderProducts = (list) => {
    if (!productsGrid) return;

    productsGrid.innerHTML = "";

    list.forEach(product => {
        const clone = template.content.cloneNode(true);

        clone.querySelector("img").src = product.image;
        clone.querySelector(".product-name").textContent = product.name;
        clone.querySelector(".price").textContent = `₹${product.price}`;
        clone.querySelector(".product-tag").textContent = product.category;

        const cartItem = cartData.find(item => item.productId && item.productId.productId === product.productId);
        const cartQty = cartItem ? cartItem.quantity : 0;
        const availableQty = product.Quantity - cartQty;

        clone.querySelector(".stock").textContent = `Qty: ${availableQty}`;

        const addBtn = clone.querySelector(".add-btn");
        if (availableQty <= 0) {
            addBtn.disabled = true;
            addBtn.innerHTML = "Out of Stock";
        } else {
            addBtn.onclick = () => handleAddToCart(product.productId);
        }

        productsGrid.appendChild(clone);
    });
};

// ================= FILTER & SEARCH STATE =================
let currentCategory = "All";
let currentSearch = "";
let searchTimeout = null;

// ================= FILTER =================
categorySelect?.addEventListener("change", async (e) => {
    currentCategory = e.target.value;
    await fetchProducts(currentSearch, currentCategory);
    renderProducts(products);
});

// ================= SEARCH =================
searchInput?.addEventListener("input", (e) => {
    currentSearch = e.target.value;

    if (searchTimeout) clearTimeout(searchTimeout);

    searchTimeout = setTimeout(async () => {
        await fetchProducts(currentSearch, currentCategory);
        renderProducts(products);
        
        // Hide suggestion box since we update the main grid directly
        suggestionBox.classList.add("hidden");
    }, 300);
});

// ================= NAVIGATION =================
document.getElementById("opencartBtn")?.addEventListener("click", () => {
    window.location.href = "cart.html";
});

// ================= AUTH UI =================
const updateAuthUI = () => {
    const authContainer = document.getElementById("authContainer");

    if (!currentUser) {
        authContainer.innerHTML = `<button id="loginBtn" class="btn">Login</button>`;

        document.getElementById("loginBtn").onclick = () => {
            window.location.href = "login.html";
        };

    } else {
        authContainer.innerHTML = `
        <div class="dropdown">
            <button class="btn header-btn">${currentUser.name}</button>
            <div class="dropdown-content">
                ${currentUser.role === 'admin' ? '<a href="admin.html"><i class="fa-solid fa-gauge"></i> Admin Dashboard</a>' : ''}
                <a href="profile.html"><i class="fa-solid fa-user"></i> Profile</a>
                <a href="#" id="logoutBtn"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a>
            </div>
        </div>
        `;
        document.getElementById("logoutBtn").addEventListener("click", handleLogout);
    }
};

const handleLogout = async () => {
    await fetch("/api/auth/logout", {
        ...fetchConfig,
        method: "POST"
    });
    window.location.href = "login.html";
};

// ================= INIT =================
const init = async () => {
    await getCurrentUser();
    await fetchProducts();
    await fetchCartData();

    renderProducts(products);
    await fetchCartCount();
    updateAuthUI();
};

init();