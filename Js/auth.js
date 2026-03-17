function saveAdmin() {
    if (!localStorage.getItem("Admin")) {
        const admin = {
            name: "Arpan",
            email: "admin2410@gmail.com",
            password: "810@Admin"
        };

        localStorage.setItem("Admin", JSON.stringify(admin));
    }
}

saveAdmin();