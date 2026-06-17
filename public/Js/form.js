let currentUser = null;
let existingImage = "";

const params = new URLSearchParams(window.location.search);
const editId = params.get("id");

const getCurrentUser = async () => {
    try {
        const res = await fetch("/api/auth/me", { credentials: "include" });

        if (res.ok) {
            currentUser = await res.json();
        } else {
            throw new Error();
        }
    } catch {
        showToast("Access Denied", "error");
        setTimeout(() => { window.location.href = "admin.html"; }, 1500);
    }
};

const loadEditData = async () => {
    if (!editId) return;

    const res = await fetch(`/api/products/${editId}`);
    const product = await res.json();

    existingImage = product.image;

    document.getElementById("productName").value = product.name;
    document.getElementById("category").value = product.category;
    document.getElementById("price").value = product.price;
    document.getElementById("quantity").value = product.Quantity;
};

const init = async () => {
    await getCurrentUser();

    if (!currentUser || currentUser.role !== "admin") {
        showToast("Admin Only Access", "error");
        setTimeout(() => { window.location.href = "admin.html"; }, 1500);
        return;
    }

    await loadEditData();
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", document.getElementById("productName").value);
    formData.append("category", document.getElementById("category").value);
    formData.append("price", document.getElementById("price").value);
    formData.append("Quantity", document.getElementById("quantity").value);

    const file = document.getElementById("image").files[0];
    if (file) formData.append("image", file);

    const url = editId ? `/api/products/${editId}` : "/api/products";
    const method = editId ? "PUT" : "POST";

    const res = await fetch(url, {
    method,
    credentials: "include",
    body: formData
});

if (res.ok) {
    showToast(editId ? "Updated" : "Added", "success");
    setTimeout(() => { window.location.href = "admin.html"; }, 1500);
} else {
    const err = await res.json();
    showToast("Error: " + err.message, "error");
}
};

document.getElementById("AddProduct").addEventListener("submit", handleSubmit);

init();