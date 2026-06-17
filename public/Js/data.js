let products = [];

const fetchProducts = async (search = "", category = "All") => {
    try {
        let url = "/api/products?";
        if (search) url += `search=${encodeURIComponent(search)}&`;
        if (category !== "All") url += `category=${encodeURIComponent(category)}`;

        const res = await fetch(url);

        if (!res.ok) throw new Error("Failed to fetch");

        products = await res.json();
        return products;

    } catch (err) {
        console.error("Error fetching products:", err);
    }
};

export { fetchProducts, products };