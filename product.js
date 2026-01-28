// ===============================
// BOOTSTRAP
// ===============================
loadFromLocalStorage();

// ===============================
// PRODUCT CONTAINER
// ===============================
const productsContainer = document.getElementById('productsContainer');
const productsGrid = document.createElement("div");
productsGrid.className = "products-grid";
productsContainer.appendChild(productsGrid);

// ===============================
// RENDER PRODUCTS
// ===============================
function renderProduct(productList) {
    productsGrid.innerHTML = "";

    productList.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const stockText = product.stock ? `In Stock: ${product.stock}` : "Out of stock";
        const stockClass = product.stock ? "stock-badge" : "stock-badge-out";

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}">
                <span class="product-tag">${product.category}</span>
                <span class="product-price">₹${product.price}</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="stock-row">
                    <span class="${stockClass}">${stockText}</span>
                    <button class="add-btn" ${product.stock === 0 ? "disabled" : ""}>
                        Add to cart
                    </button>
                </div>
            </div>
        `;

        card.querySelector(".add-btn").addEventListener("click", () => {
            handleAddToCart(product.id);
        });

        productsGrid.appendChild(card);
    });
}

// ===============================
// ADD TO CART
// ===============================
const cartCountSpan = document.getElementById("cartCountBadge");

function updateCartCountUI() {
    cartCountSpan.textContent = cartItemCount;
}

function handleAddToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(c => c.id === productId);

    if (cartItem) cartItem.quantity++;
    else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            quantity: 1
        });
    }

    product.stock--;
    recalculateCartCount();
    updateCartCountUI();
    saveToLocalStorage();
    renderProduct(products);
}

// ===============================
// REDIRECT TO CART
// ===============================
document.getElementById("opencartBtn")
    ?.addEventListener("click", () => window.location.href = "cart.html");

// ===============================
// INIT
// ===============================
recalculateCartCount();
updateCartCountUI();
renderProduct(products);
