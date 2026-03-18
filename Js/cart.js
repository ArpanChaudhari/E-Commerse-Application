// ===============================
// IMPORTS (IMPORTANT)
// ===============================
import {
    cart,
    products,
    loadFromLocalStorage,
    saveToLocalStorage
} from "./data.js";

// ===============================
// BOOTSTRAP
// ===============================
loadFromLocalStorage();

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
// REMOVE ITEM (FIXED)
// ===============================
function removeItem(id) {
    const index = cart.findIndex(ci => ci.id === id);
    if (index !== -1) cart.splice(index, 1);
}

// ===============================
// RENDER CART (YOUR DESIGN KEPT)
// ===============================
function renderCart() {

    if (!cartItemContainer) return;

    cartItemContainer.innerHTML = "";

    let total = 0;
    let totalItem = 0;

    if (!checkCartState()) return;

    cart.forEach(item => {

        const product = products.find(p => p.id === item.id);
        const itemTotalPrice = item.price * item.quantity;

        total += itemTotalPrice;
        totalItem += item.quantity;

        // ✅ TEMPLATE CLONE (UNCHANGED)
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
        if (product && product.Quantity === 0) {
            itemAdd.disabled = true;
        }

        // ===============================
        // EVENTS (FIXED LOGIC)
        // ===============================
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
                removeItem(item.id);
            }

            updateCart();
        };

        itemRemove.onclick = () => {
            product.Quantity += item.quantity;
            removeItem(item.id);

            updateCart();
        };

        cartItemContainer.appendChild(clone);
    });

    cartHeaderSubTitle.textContent = `${totalItem} items`;
    totalAmount.textContent = `₹${total.toFixed(2)}`;

    setupButtons();
}

// ===============================
// UPDATE FUNCTION
// ===============================
function updateCart() {
    saveToLocalStorage();
    renderCart();
}

// ===============================
// BUTTON HANDLING
// ===============================
function setupButtons() {

    const clearCart = document.getElementById('clearCart');
    const checkOut = document.getElementById('checkOut');

    if (!clearCart || !checkOut) return;

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
// CLEAR CART (FIXED)
// ===============================
function clearCartAndRestoreQuantity() {
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) product.Quantity += item.quantity;
    });

    cart.length = 0; // ✅ FIXED (NO reassignment)

    saveToLocalStorage();
    renderCart();
}

// ===============================
// CHECKOUT
// ===============================
function checkOutAndUpdateQuantity() {
    cart.length = 0; // ✅ FIXED

    saveToLocalStorage();
    renderCart();
}

// ===============================
// NAVIGATION
// ===============================
document.querySelector('.header-btn')?.addEventListener('click', () => {
    window.location.href = "index.html#productsContainer";
});

// ===============================
// INIT
// ===============================
renderCart();