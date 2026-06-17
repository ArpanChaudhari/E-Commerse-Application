function togglePassword() {

    const password = document.getElementById("password");
    const icon = document.querySelector(".toggle-password");

    if (password.type === "password") {
        password.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        password.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }

}
const handleLogin = async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) return showToast(data.message, "error");

        showToast("Login successful!", "success");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);

    } catch (err) {
        console.error(err);
        showToast("Error occurred", "error");
    }
};

document.getElementById('login')
    .addEventListener('submit', handleLogin);