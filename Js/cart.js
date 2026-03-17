// ===============================
// BOOTSTRAP
// ===============================
loadFromLocalStorage();
recalculateCartCount();

// ===============================
// DOM REFERENCES
// ===============================
const cartItemContainer = document.getElementById('cartItems');
const cartEmptyState = document.getElementById('cartEmpty');
const cartHeaderSubTitle = document.getElementById('cartSubtitle');
const totalAmount = document.getElementById('totalAmount');
const template = document.getElementById('cartItemTemplate');

// ===============================
// CHECK EMPTY STATE
// ===============================
function checkCartState() {
    if (cart.length) {
        cartEmptyState.hidden = true;
        return true;
    }
    cartEmptyState.hidden = false;
    cartItemContainer.innerHTML = "";
    cartHeaderSubTitle.textContent = "0 items";
    totalAmount.textContent = "₹0.00";
    return false;
}

// ===============================
// RENDER CART USING TEMPLATE
// ===============================
function renderCart() {

    cartItemContainer.innerHTML = "";

    let total = 0;
    let totalItem = 0;

    if (!checkCartState()) return;

    cart.forEach(item => {

        const product = products.find(p => p.id === item.id);
        const itemTotalPrice = item.price * item.quantity;

        total += itemTotalPrice;
        totalItem += item.quantity;

        // ✅ TEMPLATE CLONE
        const clone = template.content.cloneNode(true);

        // Fill data
        clone.querySelector('.item-image').src = item.image;
        clone.querySelector('.item-image').alt = item.name;
        clone.querySelector('.cart-item-name').textContent = item.name;
        clone.querySelector('.cart-item-category').textContent =
            `${item.category} - ₹${item.price}`;
        clone.querySelector('.cart-item-totalItem').textContent = item.quantity;
        clone.querySelector('.cart-item-totalPrice').textContent =
            `₹${itemTotalPrice.toFixed(2)}`;

        // Buttons
        const itemAdd = clone.querySelector('.cart-item-Plus');
        const itemMinus = clone.querySelector('.cart-item-Minus');
        const itemRemove = clone.querySelector('.cart-item-remove');

        // Disable if no stock
        if (product.Quantity === 0) {
            itemAdd.disabled = true;
        }

        // EVENTS
        itemAdd.onclick = () => {
            if (product.Quantity === 0) return;
            item.quantity++;
            product.Quantity--;
            updateCart();
        };

        itemMinus.onclick = () => {
            if (item.quantity > 1) {
                item.quantity--;
                product.Quantity++;
            } else {
                product.Quantity += 1;
                cart = cart.filter(ci => ci.id !== item.id);
            }
            updateCart();
        };

        itemRemove.onclick = () => {
            product.Quantity += item.quantity;
            cart = cart.filter(ci => ci.id !== item.id);
            updateCart();
        };

        cartItemContainer.appendChild(clone);
    });

    cartHeaderSubTitle.textContent = `${totalItem} items`;
    totalAmount.textContent = `₹${total.toFixed(2)}`;

    setupButtons();
}

// ===============================
// COMMON UPDATE FUNCTION (BEST PRACTICE)
// ===============================
function updateCart() {
    recalculateCartCount();
    saveToLocalStorage();
    renderCart();
}

// ===============================
// BUTTON HANDLING
// ===============================
function setupButtons() {

    const clearCart = document.getElementById('clearCart');
    const checkOut = document.getElementById('checkOut');

    clearCart.onclick = clearCartAndRestoreQuantity;
    checkOut.onclick = checkOutAndUpdateQuantity;

    if (cart.length === 0) {
        clearCart.disabled = true;
        checkOut.disabled = true;
    } else {
        clearCart.disabled = false;
        checkOut.disabled = false;
    }
}

// ===============================
// CLEAR CART
// ===============================
function clearCartAndRestoreQuantity() {
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.Quantity += item.quantity;
        }
    });

    cart = [];
    localStorage.removeItem('cart');
    localStorage.removeItem('products');

    updateCart();
}

// ===============================
// CHECKOUT
// ===============================
function checkOutAndUpdateQuantity() {
    cart = [];
    updateCart();
}

// ===============================
// NAVIGATION
// ===============================
document.querySelector('.header-btn').addEventListener('click', () => {
    window.location.href = "index.html#productsContainer";
});

// ===============================
// INIT
// ===============================
renderCart();