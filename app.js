//-------------------------------
//====== Cart State-> Cart array holds selected products ======
//-------------------------------
let cart = [];

//-------------------------------
//====== Section Heading ======
//-------------------------------
const productSectionInfo = {
    title: "Featured Products",
    tagline: "Discover our handpicked selection of premium products"
};


//-------------------------------
//====== Category Button ======
//-------------------------------
const categories = [
    "All",
    "Clothing",
    "Electronics",
    "Stationary",
    "Home",
    "Sports"
];


//-------------------------------
//====== Product Data ======
//-------------------------------
const products = [
    // Clothing - 8 products
    {
        id: 1,
        name: 'Premium Cotton T-Shirt',
        category: 'Clothing',
        price: 29.99,
        stock: 18,
        image: './Images/Clothing/clothing  (1).jpeg',
    },
    {
        id: 2,
        name: 'Classic Denim Jeans',
        category: 'Clothing',
        price: 79.99,
        stock: 18,
        image: './Images/Clothing/clothing  (2).jpeg',
    },
    {
        id: 3,
        name: 'Sport Sneakers',
        category: 'Clothing',
        price: 89.99,
        stock: 18,
        image: './Images/Clothing/clothing  (3).jpeg',
    },
    {
        id: 4,
        name: 'Elegant Summer Dress',
        category: 'Clothing',
        price: 69.99,
        stock: 18,
        image: './Images/Clothing/clothing  (4).jpeg',
    },
    {
        id: 5,
        name: 'Cozy Hoodie',
        category: 'Clothing',
        price: 54.99,
        stock: 18,
        image: './Images/Clothing/clothing  (5).jpeg',
    },
    {
        id: 6,
        name: 'Winter Jacket',
        category: 'Clothing',
        price: 129.99,
        stock: 18,
        image: './Images/Clothing/clothing  (6).jpeg',
    },
    {
        id: 7,
        name: 'Stylish Baseball Cap',
        category: 'Clothing',
        price: 24.99,
        stock: 18,
        image: './Images/Clothing/clothing  (7).jpeg',
    },
    {
        id: 8,
        name: 'Designer Sunglasses',
        category: 'Clothing',
        price: 149.99,
        stock: 15,
        image: './Images/Clothing/clothing  (8).jpeg',
    },

    // Electronics - 8 products
    {
        id: 9,
        name: 'Smartphone Pro',
        category: 'Electronics',
        price: 899.99,
        stock: 17,
        image: './Images/Electronics/Electronics (1).jpeg',
    },
    {
        id: 10,
        name: 'Laptop Ultra',
        category: 'Electronics',
        price: 1299.99,
        stock: 10,
        image: './Images/Electronics/Electronics (2).jpeg',
    },
    {
        id: 11,
        name: 'Tablet Device',
        category: 'Electronics',
        price: 499.99,
        stock: 9,
        image: './Images/Electronics/Electronics (3).jpeg',
    },
    {
        id: 12,
        name: 'DSLR Camera',
        category: 'Electronics',
        price: 1599.99,
        stock: 10,
        image: './Images/Electronics/Electronics (4).jpeg',
    },
    {
        id: 13,
        name: 'Gaming Console',
        category: 'Electronics',
        price: 499.99,
        stock: 15,
        image: './Images/Electronics/Electronics (5).jpeg',
    },
    {
        id: 14,
        name: 'Wireless Speaker',
        category: 'Electronics',
        price: 199.99,
        stock: 13,
        image: './Images/Electronics/Electronics (6).jpeg',
    },
    {
        id: 15,
        name: 'Mechanical Keyboard',
        category: 'Electronics',
        price: 149.99,
        stock: 17,
        image: './Images/Electronics/Electronics (7).jpeg',
    },
    {
        id: 16,
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 249.99,
        stock: 21,
        image: './Images/Electronics/Electronics (8).avif',
    },

    // Stationary - 8 products
    {
        id: 17,
        name: 'Premium Pen Set',
        category: 'Stationary',
        price: 34.99,
        stock: 20,
        image: './Images/Stationary/Stationary (1).jpeg',
    },
    {
        id: 18,
        name: 'Sticky Notes Pack',
        category: 'Stationary',
        price: 12.99,
        stock: 25,
        image: './Images/Stationary/Stationary (2).jpeg',
    },
    {
        id: 19,
        name: 'Leather Planner',
        category: 'Stationary',
        price: 45.99,
        stock: 25,
        image: './Images/Stationary/Stationary (3).jpeg',
    },
    {
        id: 20,
        name: 'Desk Organizer',
        category: 'Stationary',
        price: 29.99,
        stock: 6,
        image: './Images/Stationary/Stationary (4).jpeg',
    },
    {
        id: 21,
        name: 'Highlighter Set',
        category: 'Stationary',
        price: 15.99,
        stock: 14,
        image: './Images/Stationary/Stationary (5).jpeg',
    },
    {
        id: 22,
        name: 'File Binder',
        category: 'Stationary',
        price: 18.99,
        stock: 5,
        image: './Images/Stationary/Stationary (6).jpeg',
    },
    {
        id: 23,
        name: 'Office Calculator',
        category: 'Stationary',
        price: 24.99,
        stock: 10,
        image: './Images/Stationary/Stationary (7).jpeg',
    },
    {
        id: 24,
        name: 'Premium Notebook Set',
        category: 'Stationary',
        price: 19.99,
        stock: 5,
        image: './Images/Stationary/Stationary (8).jpeg',
    },

    // Home - 8 products
    {
        id: 25,
        name: 'Modern Sofa',
        category: 'Home',
        price: 899.99,
        stock: 3,
        image: './Images/Home/Home (1).jpeg',
    },
    {
        id: 26,
        name: 'Abstract Wall Art',
        category: 'Home',
        price: 129.99,
        stock: 16,
        image: './Images/Home/Home (2).jpeg',
    },
    {
        id: 27,
        name: 'Luxury Bedding Set',
        category: 'Home',
        price: 159.99,
        stock: 4,
        image: './Images/Home/Home (3).jpeg',
    },
    {
        id: 28,
        name: 'Ceramic Vase',
        category: 'Home',
        price: 49.99,
        stock: 10,
        image: './Images/Home/Home (4).jpeg',
    },
    {
        id: 29,
        name: 'Decorative Rug',
        category: 'Home',
        price: 199.99,
        stock: 12,
        image: './Images/Home/Home (5).jpeg',
    },
    {
        id: 30,
        name: 'Wall Mirror',
        category: 'Home',
        price: 89.99,
        stock: 29,
        image: './Images/Home/Home (6).jpeg',
    },
    {
        id: 31,
        name: 'Scented Candles',
        category: 'Home',
        price: 34.99,
        stock: 27,
        image: './Images/Home/Home (7).jpeg',
    },
    {
        id: 32,
        name: 'Modern Table Lamp',
        category: 'Home',
        price: 79.99,
        stock: 20,
        image: './Images/Home/Home (8).jpg',
    },

    // Sports - 8 products
    {
        id: 33,
        name: 'Running Shoes Pro',
        category: 'Sports',
        price: 119.99,
        stock: 29,
        image: './Images/Sports/Sports (1).jpeg',
    },
    {
        id: 34,
        name: 'Adjustable Dumbbells',
        category: 'Sports',
        price: 149.99,
        stock: 14,
        image: './Images/Sports/Sports (2).jpeg',
    },
    {
        id: 35,
        name: 'Basketball',
        category: 'Sports',
        price: 39.99,
        stock: 26,
        image: './Images/Sports/Sports (3).jpeg',
    },
    {
        id: 36,
        name: 'Sports Water Bottle',
        category: 'Sports',
        price: 24.99,
        stock: 24,
        image: './Images/Sports/Sports (4).jpg',
    },
    {
        id: 37,
        name: 'Resistance Bands',
        category: 'Sports',
        price: 29.99,
        stock: 32,
        image: './Images/Sports/Sports (5).jpeg',
    },
    {
        id: 38,
        name: 'Tennis Racket',
        category: 'Sports',
        price: 89.99,
        stock: 18,
        image: './Images/Sports/Sports (6).jpeg',
    },
    {
        id: 39,
        name: 'Mountain Bike',
        category: 'Sports',
        price: 599.99,
        stock: 8,
        image: './Images/Sports/Sports (7).jpeg',
    },
    {
        id: 40,
        name: 'Yoga Mat Pro',
        category: 'Sports',
        price: 39.99,
        stock: 21,
        image: './Images/Sports/Sports (8).jpg',
    },
];


//-------------------------------
//====== first select product container ======
//-------------------------------
const productsContainer = document.getElementById('productsContainer');


//-------------------------------
//====== Render Section header ======
//-------------------------------
function renderProductHeader() {
    const headerDiv = document.createElement("div"); //--> Create div for header content
    headerDiv.className = "products-header"; //--> set class name

    //Set title and tagline inside headerDiv
    headerDiv.innerHTML = `
    <h2>${productSectionInfo.title}</h2>
    <p>${productSectionInfo.tagline}</p>
    `;

    productsContainer.appendChild(headerDiv);//append headerDiv content inside productContainer
}

//-------------------------------
//====== Render Category ======
//-------------------------------
function renderCategory() {
    const categoryDiv = document.createElement("div"); //create div for category button
    categoryDiv.className = "category-filters"; //--> set class name

    // take forEach loop over categories array not applieas logic for each item
    categories.forEach((category, index) => {
        const btn = document.createElement("button"); // create button for each item of array
        btn.className = "category-btn"; //  set class name

        if (index === 0) { // check condition - too active All-category
            btn.classList.add("active");
        }

        btn.textContent = category;  // aasigning category name
        categoryDiv.appendChild(btn);  // append btn inside categoryDiv
    });
    productsContainer.appendChild(categoryDiv); // append categoryDiv inside productsContainer
}
renderProductHeader();
renderCategory();


//-------------------------------
//====== to not UI duplicate ======
//-------------------------------
const productsGrid = document.createElement("div");
productsGrid.className = "products-grid";
productsContainer.appendChild(productsGrid);


//-------------------------------
//====== Render Product ->Dynamic UI → recreated every time stock changes ======
//-------------------------------
function renderProduct(productList) {

    // Clear old product cards before rendering new ones
    productsGrid.innerHTML = "";

    productList.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        // ---------- Stock text & class logic ----------
        const stockText =
            product.stock === 0
                ? "Out of stock"
                : `In Stock: ${product.stock}`;

        const stockClass =
            product.stock === 0
                ? "stock-badge-out"
                : "stock-badge";

        // ---------- Card HTML ----------
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <span class="product-tag">${product.category}</span>
                <span class="product-price">₹${product.price}</span>
            </div>

            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>

                <div class="stock-row">
                    <span class="${stockClass}">${stockText}</span>

                    <button 
                        class="add-btn" 
                        data-id="${product.id}"
                        ${product.stock === 0 ? "disabled" : ""}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        `;

        // ---------- Add to Cart Button Logic ----------
        const addToCartButton = card.querySelector(".add-btn");

        addToCartButton.addEventListener("click", () => {
            handleAddToCart(product.id);
        });
        /*
         WHY listener is here:
         Product cards are recreated every render.
         Buttons do not exist before renderProduct().
        */

        // ---------- Append card to grid ----------
        productsGrid.appendChild(card);
    });
}


//-------------------------------
// CATEGORY FILTER LOGIC -> Buttons are static → listener once
//-------------------------------
function setupCategoryFilter() {
    const categoryButtons = document.querySelectorAll(".category-btn");// querySelecterAll give a list

    // loops over all  button
    categoryButtons.forEach(button => {

        //add event on button
        button.addEventListener('click', () => {

            // loops over all button to stop active state
            categoryButtons.forEach(button => {
                button.classList.remove('active');
            });

            //start active state on current button
            button.classList.add('active');

            // select button name to check condition
            const selectCategory = button.textContent;

            // check if all--> render=>render(products)
            if (selectCategory === "All") {
                renderProduct(products);
            }
            //else applied filter
            else {

                // filter reduce array by condition 
                const filteredProducts = products.filter(product => product.category === selectCategory);

                //render with filter array
                renderProduct(filteredProducts);
            }
        });
    });
}
renderProduct(products);  // To Change content when category button select
setupCategoryFilter();


//-------------------------------
//====== CART COUNT (HEADER) ======
//-------------------------------
const cartCountSpan = document.getElementById('cartCountBadge');
let cartItemCount = 0; // intialize the cart counter
function updateCartCount() {
    cartCountSpan.textContent = cartItemCount;
}
updateCartCount();


//-------------------------------
//====== Add To Cart Logic ->Updates: cart array, product stock, cart count ======
//-------------------------------
function handleAddToCart(productId) {

    const product = products.find(p => p.id === productId); // select perticular product
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

    product.stock -= 1;
    recalculateCartCount();

    updateCartCount();
    saveToLocalStorage();
    renderProduct(products); // Update stock badge
    renderCart(); //update cart UI
}
//-------------------------------
// Recalculate cart count from cart array
//-------------------------------
function recalculateCartCount() {
    cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    updateCartCount();
}


//-------------------------------
//CART UI REFERENCES (STATIC)
//-------------------------------
const cartItemContainer = document.getElementById('cartItems');
const cartEmptyState = document.getElementById('cartEmpty');
const cartHeaderSubTitle = document.getElementById('cartSubtitle');
const totalAmount = document.getElementById('totalAmount');


//-------------------------------
//====== CHECK CART EMPTY STATE ======
//-------------------------------
function checkCartState() {
    if (cart.length === 0) {
        cartEmptyState.hidden = false;
        cartItemContainer.innerHTML = "";
        cartHeaderSubTitle.textContent = "0 items";
        totalAmount.textContent = "₹0.00";
        return false;
    } else {
        cartEmptyState.hidden = true;
        return true;
    }
}

//-------------------------------
//====== RENDER CART ======
//-------------------------------
function renderCart() {

    cartItemContainer.innerHTML = ""; //prevent form duplicate
    if (!checkCartState()) return;
    let total = 0;
    let totalItem = 0;
    cart.forEach(item => {

        const product = products.find(p => p.id === item.id);
        const itemTotalPrice = item.price * item.quantity;
        total += itemTotalPrice;
        totalItem += item.quantity;


        const cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cart-item";
        ///now setup cartitemdiv
        cartItemDiv.innerHTML = `
        <div class="cart-item-grid">
        <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-content">
        <div class="cart-item-content-rowOne">
        <div class="cart-item-content-rowOne-left">
        <h3 class="cart-item-name">${item.name}</h3>
        <span class="cart-item-category">${item.category} - ₹${item.price}</span>
        </div>
        <div class="cart-item-content-rowOne-right">
        <button class="cart-item-remove" id="remove">Remove</button>
        </div>
        </div>
        <div class="cart-item-content-rowTwo">
        <div class="cart-item-content-rowTwo-left">
        <button class="cart-item-Plus" id="plus">+</button>
        <span class="cart-item-totalItem">${item.quantity}</span>
        <button class="cart-item-Minus" id="minus">-</button>
        </div>
        <div class="cart-item-content-rowTwo-right">
        <span class="cart-item-totalPrice">₹${itemTotalPrice.toFixed(2)}</span>
        <div>
        </div>
        </div>
        </div>
        `;

        //-------------------------------
        // Cart +, -, remov logic ->created dynamically->Event listeners inside loop
        //-------------------------------
        const itemAdd = cartItemDiv.querySelector('.cart-item-Plus');
        const itemMinus = cartItemDiv.querySelector('.cart-item-Minus');
        const itemRemove = cartItemDiv.querySelector('.cart-item-remove');

        itemAdd.addEventListener('click', () => {
            if (product.stock === 0) return;
            item.quantity += 1;
            product.stock -= 1;
            recalculateCartCount();
            saveToLocalStorage();
            renderProduct(products);
            renderCart();
        });
        itemMinus.addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity -= 1;
                product.stock += 1;
            } else {
                product.stock += 1;
                cart = cart.filter((ci) => ci.id !== item.id);
            }
            recalculateCartCount();
            saveToLocalStorage();
            renderProduct(products);
            renderCart();
        });
        itemRemove.addEventListener('click', () => {
            product.stock += item.quantity;
            cart = cart.filter((ci) => ci.id !== item.id);
            recalculateCartCount();
            saveToLocalStorage();
            renderProduct(products)
            renderCart();
        });
        cartItemContainer.appendChild(cartItemDiv);
    });
    cartHeaderSubTitle.textContent = `${totalItem} items`;
    totalAmount.textContent = `₹${total.toFixed(2)}`;


    //--------------------------
    //====== ClearCart & CheckOut logic ======
    //--------------------------
    const clearCart = document.getElementById('clearCart');
    const checkOut = document.getElementById('checkOut');

    clearCart.addEventListener('click', clearCartAndRestoreStock);
    checkOut.addEventListener('click', checkOutAndUpdateStock);

    if(cart.length === 0){
        clearCart.disabled=true;
        checkOut.disabled=true;
    }else{
        clearCart.disabled=false;
        checkOut.disabled=false;
    }
}

//-----------------------------
//====== ClearCart - RestoreStock Logic ======
//-----------------------------
function clearCartAndRestoreStock() {
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.stock += item.quantity;
        }
    });
    cart = [];
    localStorage.removeItem('cart');
    localStorage.removeItem('products');
    recalculateCartCount();
    saveToLocalStorage();
    renderProduct(products);
    renderCart();
}


//-----------------------------
//====== CheckOut Logic ======
//-----------------------------
function checkOutAndUpdateStock() {
    cart = [];
    recalculateCartCount();
    saveToLocalStorage();
    renderProduct(products);
    renderCart();
}

//-------------------------------
//====== CART DRAWER OPEN / CLOSE ======
//-------------------------------
const cartBtn = document.getElementById("opencartBtn");
const cartDrawer = document.querySelector(".drawer-panel");
const closeCartBtn = document.getElementById('closeBtn');

if (cartBtn && cartDrawer && closeCartBtn) {
    cartBtn.addEventListener("click", () => {
        cartDrawer.classList.add("open");
    });

    closeCartBtn.addEventListener("click", () => {
        cartDrawer.classList.remove("open");
    });
}



//-------------------------------
// Save cart & products to localStorage
//-------------------------------
function saveToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("products", JSON.stringify(products));
}


//-------------------------------
// Load cart & products from localStorage
//-------------------------------
function loadFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    const savedProducts = localStorage.getItem("products");

    if (savedCart && savedProducts) {
        cart = JSON.parse(savedCart);

        const storedProducts = JSON.parse(savedProducts);

        // Update product stock from stored data
        products.forEach(product => {  // loop over main products array
            const storedProduct = storedProducts.find(p => p.id === product.id);  // find inside localstorage data(storedProducts) that match with products data
            if (storedProduct) {
                product.stock = storedProduct.stock; // then stock update on products data with localstorage data
            }
        });
    }
}


//-------------------------------
// INITIAL PAGE LOAD (BOOTSTRAP)
//-------------------------------
loadFromLocalStorage();     //  restore cart + product stock
recalculateCartCount();    //  update header badge
renderProduct(products);   //  update product stock UI
renderCart();              //  update cart sidebar


