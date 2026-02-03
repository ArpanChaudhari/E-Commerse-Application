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
                    <button class="icon-btn delete-btn" data-id="${product.id}">
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

function applyFilter() {
    let filterProducts = products;

    if (selectCategory !== "All") {
        filterProducts = filterProducts.filter(
            product => product.category === selectCategory
        );
    }
    renderProduct(filterProducts);
}
// CATEGORY
function setupCategoryFilter() {
    const categorySelect = document.getElementById('category');
    categorySelect.addEventListener('change', (e) => {
        selectCategory = e.target.value;

        //reset search Input
        productSearchInput.value = "";
        suggestionBox.classList.add("hidden");
        applyFilter();
    });
}

// Search Input
const productSearchInput = document.getElementById("searchInput");
const suggestionBox = document.getElementById("searchSuggestions");

productSearchInput.addEventListener('input', () => {
    const value = productSearchInput.value.toLowerCase().trim();

    suggestionBox.innerHTML = ""; // prevent from override

    if (value === "") { //fot null search
        suggestionBox.classList.add("hidden");
        applyFilter();
        return;
    }

    // if want show only selected category product then use this  otherwise remove this and use product array in find product
    let searchBase = products;
    if (selectCategory !== "All") {
        searchBase = searchBase.filter(p => p.category === selectCategory);
    }

    // find product (product-->search)
    const matches = searchBase.filter(p => p.name.toLowerCase().includes(value)).slice(0, 3);

    // for not finding any product
    if (matches.length === 0) {
        suggestionBox.classList.add("hidden");
        return;
    }

    matches.forEach(product => {
        const li = document.createElement("li"); //create list 
        li.textContent = product.name; // show list item with product name

        li.addEventListener("click", () => {
            productSearchInput.value = product.name;

            suggestionBox.classList.add("hidden");

            renderProduct([product]);
        });

        suggestionBox.appendChild(li);
    });
    suggestionBox.classList.remove("hidden");
});

document.addEventListener('click', (e) => {
    if (!e.target.closest(".search-wrapper")) {
        suggestionBox.classList.add("hidden");
    }
});

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
    .addEventListener("click", () => {
        window.location.href = "cart.html";
    });


document.addEventListener('click', (e) => {
    if (e.target.closest('.edit-btn')) {
        const id = e.target.closest('.edit-btn').dataset.id;
        window.location.href = `edit.html?id=${id}`;
    }
});

document.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-btn');
    if (!deleteBtn) return;

    const productId = Number(deleteBtn.dataset.id);

    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    products = products.filter(p => p.id !== productId);

    cart = cart.filter(item => item.id !== productId);

    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("cart", JSON.stringify(cart));

    recalculateCartCount();
    updateCartCount();
    applyFilter();
});


// ===============================
// INIT
// ===============================
renderProduct(products);
setupCategoryFilter();
