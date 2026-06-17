import { fetchProducts } from "./data.js";

const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

// ================= STATE =================
let cart = [];

// ================= DOM =================
const cartItemContainer = document.getElementById('cartItems');
const cartEmptyState = document.getElementById('cartEmpty');
const cartHeaderSubTitle = document.getElementById('cartSubtitle');
const totalAmount = document.getElementById('totalAmount');
const template = document.getElementById('cartItemTemplate');

const clearCartBtn = document.getElementById('clearCart');
const checkOutBtn = document.getElementById('checkOut');

// ================= FETCH CONFIG =================
const fetchConfig = {
    credentials: "include",
    headers: { "Content-Type": "application/json" }
};

// ================= API =================
const api = {
    getCart: () => fetch("/api/cart", fetchConfig),
    add: (id) => fetch("/api/cart/add", {
        ...fetchConfig,
        method: "POST",
        body: JSON.stringify({ productId: id })
    }),
    update: (id, qty) => fetch("/api/cart/update", {
        ...fetchConfig,
        method: "PUT",
        body: JSON.stringify({ productId: id, quantity: qty })  // 57 objectId
    }),
    remove: (id) => fetch(`/api/cart/remove/${id}`, {  //96 objectId
        ...fetchConfig,
        method: "DELETE"
    }),
    clear: () => fetch("/api/cart/clear", {
        ...fetchConfig,
        method: "DELETE"
    }),
    checkout: () => fetch("/api/cart/create-razorpay-order", {
        ...fetchConfig,
        method: "POST"
    }),
    verifyPayment: (data) => fetch("/api/cart/verify-payment", {
        ...fetchConfig,
        method: "POST",
        body: JSON.stringify(data)
    }),

};

// ================= FETCH CART =================
const fetchCart = async () => {
    try {
        const res = await api.getCart();
        const data = await res.json();
        cart = data.items || [];
    } catch (err) {
        console.log("Error fetching cart:", err);
    }
};

// ================= EMPTY STATE =================
const handleEmptyState = () => {
    if (cart.length > 0) {
        cartEmptyState.hidden = true;
        return true;
    }

    cartEmptyState.hidden = false;
    cartItemContainer.innerHTML = "";
    cartHeaderSubTitle.textContent = "0 items";
    totalAmount.textContent = "₹0.00";

    return false;
};

// ================= RENDER CART =================
const renderCart = () => {
    if (!cartItemContainer) return;

    cartItemContainer.innerHTML = "";

    if (!handleEmptyState()) return;

    let total = 0;
    let totalItems = 0;

    cart.forEach(item => {
        const product = item.productId;
        const itemTotal = product.price * item.quantity;

        total += itemTotal;
        totalItems += item.quantity;

        const clone = template.content.cloneNode(true);

        clone.querySelector('.item-image').src = product.image;
        clone.querySelector('.item-image').alt = product.name;
        clone.querySelector('.cart-item-name').textContent = product.name;
        clone.querySelector('.cart-item-category').textContent =
            `${product.category} - ₹${product.price}`;
        clone.querySelector('.cart-item-totalItem').textContent = item.quantity;
        clone.querySelector('.cart-item-totalPrice').textContent =
            `₹${itemTotal.toFixed(2)}`;

        const btnPlus = clone.querySelector('.cart-item-Plus');
        const btnMinus = clone.querySelector('.cart-item-Minus');
        const btnRemove = clone.querySelector('.cart-item-remove');

        if (product.Quantity === 0) btnPlus.disabled = true;

        btnPlus.onclick = async () => {
            const res = await api.add(product.productId);
            if (!res.ok) {
                const data = await res.json();
                showToast(data.message || "Failed to add to cart");
            }
            await refreshCart();
        };

        btnMinus.onclick = async () => {
            if (item.quantity > 1) {
                await api.update(product.productId, item.quantity - 1);
            } else {
                await api.remove(product.productId);
            }
            await refreshCart();
        };

        btnRemove.onclick = async () => {
            await api.remove(product.productId);
            await refreshCart();
        };

        cartItemContainer.appendChild(clone);
    });

    cartHeaderSubTitle.textContent = `${totalItems} items`;
    totalAmount.textContent = `₹${total.toFixed(2)}`;

    updateButtons();
};

// ================= BUTTONS =================
const updateButtons = () => {
    if (!clearCartBtn || !checkOutBtn) return;

    clearCartBtn.disabled = cart.length === 0;
    checkOutBtn.disabled = cart.length === 0;

    clearCartBtn.onclick = async () => {
        await api.clear();
        await refreshCart();
    };

    checkOutBtn.onclick = async () => {
        checkOutBtn.disabled = true;
        checkOutBtn.textContent = "Processing...";
        try {
            const res = await api.checkout();
            const order = await res.json();
            
            if (!order.order_id) {
                showToast(order.message || "Failed to create order");
                checkOutBtn.disabled = false;
                checkOutBtn.textContent = "Checkout";
                return;
            }

            const options = {
                key: order.key_id,
                amount: order.amount,
                currency: order.currency,
                name: "ShopEase",
                description: "Purchase Transaction",
                order_id: order.order_id,
                handler: async function (response) {
                    try {
                        const verifyRes = await api.verifyPayment(response);
                        if (verifyRes.ok) {
                            showToast("Payment Successful! Order placed.");
                            await refreshCart();
                        } else {
                            showToast("Payment verification failed.");
                        }
                    } catch (error) {
                        console.error(error);
                        showToast("Error verifying payment.");
                    }
                },
                theme: {
                    color: "#3399cc"
                }
            };
            
            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response){
                showToast("Payment Failed: " + response.error.description);
            });
            rzp.open();
            
            checkOutBtn.disabled = false;
            checkOutBtn.textContent = "Checkout";
            
        } catch (err) {
            console.error(err);
            showToast("Error during checkout");
            checkOutBtn.disabled = false;
            checkOutBtn.textContent = "Checkout";
        }
    };
};

// ================= REFRESH =================
const refreshCart = async () => {
    await fetchProducts();
    await fetchCart();
    renderCart();
};

// ================= NAVIGATION =================
document.querySelector('.header-btn')?.addEventListener('click', () => {
    window.location.href = "index.html#productsContainer";
});

// ================= INIT =================
const init = async () => {
    await loadRazorpay();
    await fetchProducts();
    await fetchCart();
    renderCart();
};

init();