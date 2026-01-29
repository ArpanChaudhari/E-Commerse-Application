// ===============================
// BOOTSTRAP
// ===============================
loadFromLocalStorage();
recalculateCartCount();

// ===============================
// PRODUCT CONTAINER
// ===============================
const productsContainer = document.getElementById('productsContainer');
const productsGrid = document.createElement("div");
productsGrid.className = "products-grid";
productsContainer.appendChild(productsGrid);

// ===============================
// RENDER PRODUCTS (UNCHANGED)
// ===============================
function renderProduct(productList) {
    productsGrid.innerHTML = "";

    productList.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-card">

               <div class="product-image">
                  <img src="${product.image}" alt="${product.name}">

                  <!-- Category -->
                  <span class="product-tag">${product.category}</span>

                  <!-- Top-right action icons -->
                  <div class="product-actions">
                    <button class="icon-btn edit-btn" data-id="${product.id}">
                    <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="icon-btn delete">
                    <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>

                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>

                    <div class="product-meta">
                    <span class="price">₹${product.price}</span>
                    <span class="stock">Quantity: ${product.Quantity}</span>
                    </div>

                    <button 
                       class="add-btn" 
                       data-id="${product.id}"
                       ${product.Quantity === 0 ? "disabled" : ""}
                       >
                       <i class="fa-solid fa-cart-shopping"></i>
                       Add to Cart
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
// FILTERING LOGIC (UNCHANGED)
// ===============================
let selectCategory = "All";
let searchText = "";

function applyFilter() {
    let filterProducts = products;

    if (selectCategory !== "All") {
        filterProducts = filterProducts.filter(
            product => product.category === selectCategory
        );
    }

    if (searchText.trim() !== "") {
        filterProducts = filterProducts.filter(
            product => product.name.toLowerCase().includes(searchText)
        );
    }

    renderProduct(filterProducts);
}

// SEARCH
const productSearchInput = document.getElementById('searchInput');
productSearchInput.addEventListener('input', () => {
    searchText = productSearchInput.value.toLowerCase();
    applyFilter();
});

// CATEGORY
function setupCategoryFilter() {
    const categorySelect = document.getElementById('category');
    categorySelect.addEventListener('change', (e) => {
        selectCategory = e.target.value;
        applyFilter();
    });
}

// ===============================
// CART COUNT (HEADER)
// ===============================
const cartCountSpan = document.getElementById('cartCountBadge');

function updateCartCount() {
    cartCountSpan.textContent = cartItemCount;
}
updateCartCount();

// ===============================
// ADD TO CART (UNCHANGED LOGIC)
// ===============================
function handleAddToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            quantity: 1
        });
    }

    product.Quantity -= 1;
    recalculateCartCount();
    updateCartCount();
    saveToLocalStorage();
    // renderProduct(products);
    applyFilter();
}

// ===============================
// CART PAGE REDIRECT
// ===============================
document.getElementById("opencartBtn")
    ?.addEventListener("click", () => {
        window.location.href = "cart.html";
    });


document.addEventListener('click',(e)=>{
    if(e.target.closest('.edit-btn')){
        const id=e.target.closest('.edit-btn').dataset.id;
        window.location.href=`edit.html?id=${id}`;
    }
});
// ===============================
// INIT
// ===============================
renderProduct(products);
setupCategoryFilter();
