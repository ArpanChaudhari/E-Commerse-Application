const categoryImages = {
    Clothing: "./Images/Clothing/default.png",
    Electronics: "./Images/Electronics/default.png",
    Stationary: "./Images/Stationary/default.png",
    Home: "./Images/Home/default.png",
    Sports: "./Images/Sports/default.png"
};
document.querySelector('.header-btn').addEventListener('click', () => {
    window.location.href = "index.html#productsContainer";
});

function getNextId(items) {
    if (items.length === 0) return 1;

    const maxId = items.reduce((max, item) =>
        item.id > max ? item.id : max, 0
    );

    return maxId + 1;
}


document.getElementById('AddProduct').addEventListener('submit', function (e) {
    e.preventDefault();

    let products = JSON.parse(localStorage.getItem("products")) || [];

    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('category').value;
    const price = Number(document.getElementById('price').value);
    const Quantity = Number(document.getElementById('quantity').value);

    // ✅ Validation
    if (!name || !category || price <= 0 || Quantity <= 0) {
        alert("Please fill all fields correctly");
        return;
    }

    const newProduct = {
        id: getNextId(products),
        name,
        category,
        price,
        Quantity,
        image: categoryImages[category] || "./Images/default.png"
    };

    products.push(newProduct);

    localStorage.setItem("products", JSON.stringify(products));

    this.reset();
    // renderProduct(products);
    window.location.href = "index.html#productsContainer";
})