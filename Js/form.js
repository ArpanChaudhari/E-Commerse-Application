// ===============================
// CATEGORY IMAGES
// ===============================
const categoryImages = {
    Clothing: "./Images/Clothing/default.png",
    Electronics: "./Images/Electronics/default.png",
    Stationary: "./Images/Stationary/default.png",
    Home: "./Images/Home/default.png",
    Sports: "./Images/Sports/default.png"
};

// ===============================
// CONTINUE SHOPPING BUTTON
// ===============================
document.querySelector('.header-btn').addEventListener('click', () => {
    window.location.href = "index.html#productsContainer";
});

// ===============================
// GET NEXT ID FUNCTION
// ===============================
function getNextId(items) {
    if (items.length === 0) return 1;
    return Math.max(...items.map(item => item.id)) + 1;
}

// ===============================
// DETECT MODE (ADD OR EDIT)
// ===============================
const params = new URLSearchParams(window.location.search);
const editId = Number(params.get("id"));

let products = JSON.parse(localStorage.getItem("products")) || [];

// ===============================
// EDIT MODE SETUP
// ===============================
let editProduct = null;

if (editId) {
    editProduct = products.find(p => p.id === editId);

    if (!editProduct) {
        alert("Product not found");
        window.location.href = "index.html";
    }

    // fill form
    document.getElementById('productName').value = editProduct.name;
    document.getElementById('category').value = editProduct.category;
    document.getElementById('price').value = editProduct.price;
    document.getElementById('quantity').value = editProduct.Quantity;

    // change UI
    document.getElementById('formBtn').textContent = "Update Product";
    document.querySelector('.form-container h2').textContent = "Edit Product";
}

// ===============================
// FORM SUBMIT (COMMON)
// ===============================
document.getElementById('AddProduct').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('category').value;
    const price = Number(document.getElementById('price').value);
    const qty = Number(document.getElementById('quantity').value);

    // validation
    if (!name || !category || price <= 0 || qty <= 0) {
        alert("⚠ Enter valid details (price & qty > 0)");
        return;
    }

    // ===============================
    // EDIT PRODUCT
    // ===============================
    if (editProduct) {
        editProduct.name = name;
        editProduct.category = category;
        editProduct.price = price;
        editProduct.Quantity = qty;

        localStorage.setItem("products", JSON.stringify(products));
        alert("✅ Product Updated Successfully");

    } 
    // ===============================
    // ADD PRODUCT
    // ===============================
    else {
        const newProduct = {
            id: getNextId(products),
            name,
            category,
            price,
            Quantity: qty,
            image: categoryImages[category] || "./Images/default.png"
        };

        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));
        alert("✅ Product Added Successfully");
    }

    window.location.href = "index.html#productsContainer";
});
