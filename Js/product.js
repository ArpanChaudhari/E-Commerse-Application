// ===============================
// BOOTSTRAP
// ===============================
loadFromLocalStorage();
recalculateCartCount();

// ===============================
// PRODUCT CONTAINER
// ===============================
const productsGrid = document.querySelector(".products-grid");
const template = document.getElementById("productCard");

// ===============================
// RENDER PRODUCTS (UNCHANGED)
// ===============================
function renderProduct(productList) {
    productsGrid.innerHTML = "";

    productList.forEach(product => {
        const isInCart = cart.some(item => item.id === product.id);
        const clone = template.content.cloneNode(true);
        const img = clone.querySelector(".product-image img")
        const edit = clone.querySelector(".edit-btn");
        const deleteBtn = clone.querySelector(".delete-btn");
        const addProduct = clone.querySelector(".add-btn");


        img.alt = product.name;
        img.src = product.image;

        clone.querySelector(".product-tag").textContent = product.category;

        edit.dataset.id = product.id;
        deleteBtn.dataset.id = product.id;

        if (isInCart) {
            deleteBtn.disabled=true;
        }

        clone.querySelector(".product-name").textContent = product.name;
        clone.querySelector(".price").textContent = `₹${product.price}`;
        clone.querySelector(".stock").textContent = `Quantity: ${product.Quantity}`;

        addProduct.dataset.id = product.id;
        if (product.Quantity === 0) {
            addProduct.disabled=true;
        }
        addProduct.addEventListener("click", () => {
            handleAddToCart(product.id);
        });

        productsGrid.appendChild(clone);
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
    const matches = searchBase.filter(p => p.name.toLowerCase().includes(value)).slice(0, 3);//only three matches

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

//outside click
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
        window.location.href = `form.html?id=${id}`;
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
