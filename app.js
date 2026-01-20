

//============ Section Heading ================
const productSectionInfo = {
    title: "Featured Products",
    tagline: "Discover our handpicked selection of premium products"
};


//=========== Category Button ================
const categories = [
    "All",
    "Clothing",
    "Electronics",
    "Stationary",
    "Home",
    "Sports"
];


//=========== Product Data ===============
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


//============= first select product container ================
const productsContainer = document.getElementById('productsContainer');


//====== Render Section header ===========
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

function renderProduct(productList) {
    const grid = document.createElement("div");
    grid.className = "products-grid";

    productList.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
        <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        <span class="product-tag">${product.category}</span>
        <span class="product-price">$${product.price}</span>
        </div>

        <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="stock-row">
        <span class="stock-badge">In Stock: ${product.stock}</span>
        <button class="add-btn">
        <i data-lucide="shopping-cart"></i>
        Add to cart
        </button>
        </div>
        </div>
        `;
        grid.appendChild(card);
    });
    productsContainer.appendChild(grid);
};
renderProductHeader();
renderCategory();
renderProduct(products);