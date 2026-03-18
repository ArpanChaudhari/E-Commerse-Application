import {
    cart,
    products,
    initProducts,
    loadFromLocalStorage,
    saveToLocalStorage
} from "./data.js";

// ===============================
// INIT
// ===============================
initProducts();
loadFromLocalStorage();

// ===============================
// CART COUNT
// ===============================
let cartItemCount = 0;

function recalculateCartCount() {
    cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// ===============================
// DOM
// ===============================
const productsGrid = document.querySelector(".products-grid");
const template = document.getElementById("productCard");
const cartCountSpan = document.getElementById("cartCountBadge");

const productSearchInput = document.getElementById("searchInput");
const suggestionBox = document.getElementById("searchSuggestions");

// ===============================
// RENDER PRODUCTS
// ===============================
function renderProduct(productList) {
    if (!productsGrid) return;

    productsGrid.innerHTML = "";

    productList.forEach(product => {
        const clone = template.content.cloneNode(true);

        clone.querySelector("img").src = product.image;
        clone.querySelector(".product-name").textContent = product.name;
        clone.querySelector(".price").textContent = `₹${product.price}`;
        clone.querySelector(".stock").textContent = `Qty: ${product.Quantity}`;

        const btn = clone.querySelector(".add-btn");

        if (product.Quantity === 0) btn.disabled = true;

        btn.onclick = () => handleAddToCart(product.id);

        productsGrid.appendChild(clone);
    });
}

// ===============================
// ADD TO CART
// ===============================
function handleAddToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    product.Quantity--;

    recalculateCartCount();
    updateCartCount();
    saveToLocalStorage();
    renderProduct(products);
}

// ===============================
// CART COUNT UI
// ===============================
function updateCartCount() {
    if (cartCountSpan)
        cartCountSpan.textContent = cartItemCount;
}

// ===============================
// SEARCH
// ===============================
if (productSearchInput && suggestionBox) {
    productSearchInput.addEventListener("input", () => {
        const value = productSearchInput.value.toLowerCase();

        suggestionBox.innerHTML = "";

        if (!value) {
            suggestionBox.classList.add("hidden");
            renderProduct(products);
            return;
        }

        const matches = products.filter(p =>
            p.name.toLowerCase().includes(value)
        ).slice(0, 3);

        matches.forEach(p => {
            const li = document.createElement("li");
            li.textContent = p.name;

            li.onclick = () => {
                renderProduct([p]);
                suggestionBox.classList.add("hidden");
            };

            suggestionBox.appendChild(li);
        });

        suggestionBox.classList.remove("hidden");
    });
}

// ===============================
// NAVIGATION
// ===============================
document.getElementById("opencartBtn")?.addEventListener("click", () => {
    window.location.href = "cart.html";
});

// ===============================
// START
// ===============================
recalculateCartCount();
updateCartCount();
renderProduct(products);