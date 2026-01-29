document.querySelector('.header-btn').addEventListener('click', () => {
    window.location.href = "index.html#productsContainer";
});
console.log(window.location.search);

const data = new URLSearchParams(window.location.search);
const productId = Number(data.get("id"));


let products = JSON.parse(localStorage.getItem("products"));
console.log(products);

const product = products.find(p => p.id === productId);

document.getElementById('productName').value = product.name;
document.getElementById('category').value = product.category;
document.getElementById('price').value = product.price;
document.getElementById('quantity').value = product.Quantity;


document.getElementById('editProduct').addEventListener('submit', (e) => {
    e.preventDefault();

    product.name = document.getElementById('productName').value;
    product.category = document.getElementById('category').value;
    product.price = parseFloat(document.getElementById('price').value);
    product.Quantity = Number(document.getElementById('quantity').value);

    localStorage.setItem("products", JSON.stringify(products));

    alert("Product Updated Successfully");

    window.location.href = "index.html#productsContainer";
});