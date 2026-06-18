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

function toggleConfirmPassword() {

    const password = document.getElementById("confirmPassword");
    const icon = document.querySelector(".toggle-password2");

    if (password.type === "password") {
        password.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        password.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }

}

const isValidEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const isValidPassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/.test(password);

const handleSignup = async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!isValidEmail(email)) return showToast("Invalid email", "error");
    if (!isValidPassword(password)) return showToast("Weak password", "error");

    try {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        if (!res.ok) return showToast(data.message, "error");

        showToast("Signup successful!", "success");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

    } catch (err) {
        console.error(err);
        showToast("Error occurred", "error");
    }
};

document.getElementById("signup")
    .addEventListener("submit", handleSignup);