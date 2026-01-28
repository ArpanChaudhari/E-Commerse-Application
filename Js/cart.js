// ===============================
// BOOTSTRAP
// ===============================
loadFromLocalStorage();
recalculateCartCount();

// ===============================
// CART DOM REFERENCES
// ===============================
const cartItemContainer = document.getElementById('cartItems');
const cartEmptyState = document.getElementById('cartEmpty');
const cartHeaderSubTitle = document.getElementById('cartSubtitle');
const totalAmount = document.getElementById('totalAmount');

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
// RENDER CART (UNCHANGED STRUCTURE)
// ===============================
function renderCart() {
    cartItemContainer.innerHTML = "";

    let total = 0;
    let totalItem = 0;

    if (cart.length === 0) {
        checkCartState();
    } else {
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            const itemTotalPrice = item.price * item.quantity;

            total += itemTotalPrice;
            totalItem += item.quantity;

            const cartItemDiv = document.createElement("div");
            cartItemDiv.className = "cart-item";

            cartItemDiv.innerHTML = `
            <div class="cart-item-grid">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>

                <div class="cart-item-content">
                    <div class="cart-item-content-rowOne">
                        <div class="cart-item-content-rowOne-left">
                            <h3 class="cart-item-name">${item.name}</h3>
                            <span class="cart-item-category">
                                ${item.category} - ₹${item.price}
                            </span>
                        </div>

                        <div class="cart-item-content-rowOne-right">
                            <button class="cart-item-remove">Remove</button>
                        </div>
                    </div>

                    <div class="cart-item-content-rowTwo">
                        <div class="cart-item-content-rowTwo-left">
                            <button class="cart-item-Plus" ${product.Quantity === 0 ? "disabled" : ""}>+</button>
                            <span class="cart-item-totalItem">${item.quantity}</span>
                            <button class="cart-item-Minus">-</button>
                        </div>

                        <div class="cart-item-content-rowTwo-right">
                            <span class="cart-item-totalPrice">
                                ₹${itemTotalPrice.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;

            // EVENTS
            const itemAdd = cartItemDiv.querySelector('.cart-item-Plus');
            const itemMinus = cartItemDiv.querySelector('.cart-item-Minus');
            const itemRemove = cartItemDiv.querySelector('.cart-item-remove');

            itemAdd.onclick = () => {
                if (product.Quantity === 0) return;
                item.quantity++;
                product.Quantity--;
                recalculateCartCount();
                saveToLocalStorage();
                renderCart();
            };

            itemMinus.onclick = () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    product.Quantity++;
                } else {
                    product.Quantity += 1;
                    cart = cart.filter(ci => ci.id !== item.id);
                }
                recalculateCartCount();
                saveToLocalStorage();
                renderCart();
            };

            itemRemove.onclick = () => {
                product.Quantity += item.quantity;
                cart = cart.filter(ci => ci.id !== item.id);
                recalculateCartCount();
                saveToLocalStorage();
                renderCart();
            };

            cartItemContainer.appendChild(cartItemDiv);
        });
    }

    cartHeaderSubTitle.textContent = `${totalItem} items`;
    totalAmount.textContent = `₹${total.toFixed(2)}`;

    //--------------------------
    //====== ClearCart & CheckOut logic ======
    //--------------------------
    const clearCart = document.getElementById('clearCart');
    const checkOut = document.getElementById('checkOut');

    clearCart.addEventListener('click', clearCartAndRestoreQuantity);
    checkOut.addEventListener('click', checkOutAndUpdateQuantity);

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
    recalculateCartCount();
    saveToLocalStorage();
    renderCart(); // ✅ cart page ko redraw karna enough hai
}

function checkOutAndUpdateQuantity() {
    cart = [];
    recalculateCartCount();
    saveToLocalStorage();
    renderCart(); // ✅
}


// ===============================
// INIT
// ===============================
renderCart();
