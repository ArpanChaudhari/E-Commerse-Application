// ================= FETCH CONFIG =================
let allOrdersData = [];

const fetchConfig = {
    credentials: "include",
    headers: { "Content-Type": "application/json" }
};

// ================= DOM ELEMENTS =================
const logoutBtn = document.getElementById("logoutBtn");
const tabBtns = document.querySelectorAll(".sidebar-btn");
const tabContents = document.querySelectorAll(".admin-tab");

// ================= TAB SWITCHING =================
tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        tabContents.forEach(c => c.classList.remove("active"));

        btn.classList.add("active");
        const targetId = btn.getAttribute("data-tab");
        document.getElementById(targetId).classList.add("active");

        // Fetch data based on active tab
        if (targetId === "tab-products") fetchProducts();
        if (targetId === "tab-orders") fetchOrders();
        if (targetId === "tab-users") fetchUsers();
    });
});

// ================= DASHBOARD STATS =================
const fetchStats = async () => {
    try {
        const res = await fetch("/api/admin/stats", fetchConfig);
        if (!res.ok) {
            if (res.status === 401 || res.status === 403) window.location.href = "index.html";
            return;
        }
        const data = await res.json();
        
        // Render Stat Cards (Mockup format)
        document.getElementById("statsGrid").innerHTML = `
            <div class="stat-card">
                <div class="stat-card-top">
                    <div class="stat-icon icon-blue"><i class="fa-solid fa-dollar-sign"></i></div>
                    <div class="trend trend-up"><i class="fa-solid fa-arrow-trend-up"></i> 12.5%</div>
                </div>
                <div class="stat-title">Total Revenue</div>
                <div class="stat-value">₹58,392</div>
                <div class="stat-subtitle">This month</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-top">
                    <div class="stat-icon icon-purple"><i class="fa-solid fa-cart-shopping"></i></div>
                    <div class="trend trend-up"><i class="fa-solid fa-arrow-trend-up"></i> 8.2%</div>
                </div>
                <div class="stat-title">Total Orders</div>
                <div class="stat-value">1,247</div>
                <div class="stat-subtitle">This month</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-top">
                    <div class="stat-icon icon-green"><i class="fa-solid fa-users"></i></div>
                    <div class="trend trend-up"><i class="fa-solid fa-arrow-trend-up"></i> 15.3%</div>
                </div>
                <div class="stat-title">Total Customers</div>
                <div class="stat-value">3,842</div>
                <div class="stat-subtitle">Active users</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-top">
                    <div class="stat-icon icon-orange"><i class="fa-solid fa-box"></i></div>
                    <div class="trend trend-down"><i class="fa-solid fa-arrow-trend-down"></i> 3.1%</div>
                </div>
                <div class="stat-title">Products</div>
                <div class="stat-value">${data.totalProducts || '892'}</div>
                <div class="stat-subtitle">In stock</div>
            </div>
        `;

        // Render Recent Orders (Interactive)
        allOrdersData = [...data.recentOrders]; // Cache for modal
        const tbody = document.querySelector("#recentOrdersTable tbody");
        if (!data.recentOrders || data.recentOrders.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No recent orders</td></tr>`;
        } else {
            tbody.innerHTML = data.recentOrders.map(order => {
                const statusColors = { pending: '#f3f4f6', processing: '#ffedd5', shipped: '#dbeafe', delivered: '#dcfce7', cancelled: '#fee2e2' };
                const bg = statusColors[order.status] || '#fff';
                return `
                <tr>
                    <td>#${order._id.substring(0, 8)}</td>
                    <td>${order.userId ? order.userId.name : 'Unknown User'}</td>
                    <td>₹${(order.totalAmount || 0).toLocaleString()}</td>
                    <td>
                        <select class="status-select" style="background-color: ${bg};" onchange="updateOrderStatus('${order._id}', this.value, this)">
                            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                            <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                            <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                    </td>
                    <td><button class="action-btn" onclick="viewOrderDetails('${order._id}')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>
                `;
            }).join('');
        }

        // Render Top Products (Dummy data matching mockup)
        const productsTbody = document.querySelector("#topProductsTable tbody");
        const dummyTopProducts = [
            { name: 'Wireless Earbuds Pro', sales: '1245', rev: '₹124,500' },
            { name: 'Smart Fitness Watch', sales: '892', rev: '₹267,600' },
            { name: 'Laptop Backpack', sales: '756', rev: '₹45,360' },
            { name: 'Bluetooth Speaker', sales: '634', rev: '₹50,720' },
            { name: 'Phone Stand', sales: '523', rev: '₹15,690' }
        ];
        productsTbody.innerHTML = dummyTopProducts.map(p => `
            <tr>
                <td style="color: #4b5563;">${p.name}</td>
                <td>${p.sales}</td>
                <td>${p.rev}</td>
                <td><button class="action-btn"><i class="fa-solid fa-pen-to-square"></i></button></td>
            </tr>
        `).join('');

        // Initialize Charts
        initCharts(data.categoryData || []);
    } catch (err) {
        console.error("Failed to fetch stats:", err);
    }
};

// ================= PRODUCTS =================
const fetchProducts = async () => {
    try {
        const res = await fetch("/api/products", fetchConfig);
        const data = await res.json();
        
        const tbody = document.querySelector("#productsTable tbody");
        if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No products found</td></tr>`;
            return;
        }

        tbody.innerHTML = data.map(product => `
            <tr>
                <td><img src="${product.image}" class="product-img" alt="${product.name}"></td>
                <td>${product.name}</td>
                <td>${product.category || 'N/A'}</td>
                <td>₹${product.price}</td>
                <td>
                    <button class="action-btn edit" onclick="editProduct('${product._id}')"><i class="fa-solid fa-pen"></i></button>
                    <button class="action-btn delete" onclick="deleteProduct('${product._id}')"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    } catch (err) {
        console.error(err);
    }
};

window.editProduct = (id) => {
    localStorage.setItem("editProductId", id);
    window.location.href = "form.html";
};

window.deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
        const res = await fetch(`/api/products/${id}`, {
            ...fetchConfig,
            method: "DELETE"
        });
        if (res.ok) {
            showToast("Product deleted successfully", "success");
            fetchProducts(); // Refresh list
        } else {
            showToast("Failed to delete product", "error");
        }
    } catch (err) {
        console.error(err);
        showToast("Error deleting product", "error");
    }
};

// ================= ORDERS =================
const fetchOrders = async () => {
    try {
        const res = await fetch("/api/admin/orders", fetchConfig);
        const data = await res.json();
        
        allOrdersData = data; // Full cache for modal
        const tbody = document.querySelector("#allOrdersTable tbody");
        if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No orders found</td></tr>`;
            return;
        }

        tbody.innerHTML = data.map(order => {
            const statusColors = { pending: '#f3f4f6', processing: '#ffedd5', shipped: '#dbeafe', delivered: '#dcfce7', cancelled: '#fee2e2' };
            const bg = statusColors[order.status] || '#fff';
            return `
            <tr>
                <td>#${order._id.substring(0, 8)}...</td>
                <td>${order.userId ? order.userId.name : 'Unknown User'}<br><small style="color:#6b7280">${order.userId ? order.userId.email : ''}</small></td>
                <td>${new Date(order.createdAt).toLocaleDateString()}</td>
                <td>₹${(order.totalAmount || 0).toLocaleString()}</td>
                <td>
                    <select class="status-select" style="background-color: ${bg};" onchange="updateOrderStatus('${order._id}', this.value, this)">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                        <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td>
                    <button class="action-btn" onclick="viewOrderDetails('${order._id}')"><i class="fa-solid fa-eye"></i></button>
                </td>
            </tr>
            `;
        }).join('');
    } catch (err) {
        console.error(err);
    }
};

// ================= USERS =================
const fetchUsers = async () => {
    try {
        const res = await fetch("/api/admin/users", fetchConfig);
        const data = await res.json();
        
        const tbody = document.querySelector("#usersTable tbody");
        if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No users found</td></tr>`;
            return;
        }

        tbody.innerHTML = data.map(user => `
            <tr>
                <td>${user.firstName ? user.firstName + ' ' + user.lastName : user.name}</td>
                <td>${user.email}</td>
                <td><span class="badge ${user.role === 'admin' ? 'badge-success' : 'badge-pending'}">${user.role.toUpperCase()}</span></td>
                <td>${new Date(user.createdAt || Date.now()).toLocaleDateString()}</td>
            </tr>
        `).join('');
    } catch (err) {
        console.error(err);
    }
};

// ================= CHARTS =================
const initCharts = (categoryData = []) => {
    // Check if charts already exist to prevent re-initialization errors
    if(window.salesChartInstance) window.salesChartInstance.destroy();
    if(window.categoryChartInstance) window.categoryChartInstance.destroy();

    const salesCtx = document.getElementById('salesChart').getContext('2d');
    
    // Gradient for the area chart
    const gradient = salesCtx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(147, 197, 253, 0.5)'); // light blue
    gradient.addColorStop(1, 'rgba(147, 197, 253, 0.0)');

    // Plugin for drawing vertical line on hover
    const verticalLinePlugin = {
        id: 'verticalLine',
        beforeDraw: chart => {
            if (chart.tooltip?._active?.length) {
                const activePoint = chart.tooltip._active[0];
                const ctx = chart.ctx;
                const x = activePoint.element.x;
                const topY = chart.scales.y.top;
                const bottomY = chart.scales.y.bottom;

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, topY);
                ctx.lineTo(x, bottomY);
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#d1d5db';
                ctx.stroke();
                ctx.restore();
            }
        }
    };

    window.salesChartInstance = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Sales Overview',
                data: [45000, 52000, 48000, 61000, 59000],
                borderColor: '#3b82f6',
                backgroundColor: gradient,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#3b82f6',
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#3b82f6',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2
            }]
        },
        plugins: [verticalLinePlugin],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: { 
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#ffffff',
                    titleColor: '#374151',
                    titleFont: { size: 14, weight: 'normal' },
                    bodyColor: '#3b82f6',
                    bodyFont: { size: 14 },
                    borderColor: '#d1d5db',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return 'sales : ' + context.parsed.y;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 80000,
                    grid: { borderDash: [2, 4], color: '#f3f4f6' },
                    border: { color: '#9ca3af' },
                    ticks: { color: '#6b7280', font: { size: 12 } }
                },
                x: {
                    grid: { display: false },
                    border: { color: '#9ca3af' },
                    ticks: { color: '#6b7280', font: { size: 12 } }
                }
            }
        }
    });

    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    
    // Process real category data
    const labels = categoryData.map(c => c._id || 'Uncategorized');
    const dataCounts = categoryData.map(c => c.count);
    // Generate some dynamic colors based on how many categories we have
    const baseColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4'];
    const colors = labels.map((_, i) => baseColors[i % baseColors.length]);

    // Fallback if empty
    const finalLabels = labels.length > 0 ? labels : ['No Data'];
    const finalData = dataCounts.length > 0 ? dataCounts : [1];

    window.categoryChartInstance = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: finalLabels,
            datasets: [{
                data: finalData,
                backgroundColor: colors,
                borderWidth: 3,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { boxWidth: 10, usePointStyle: true, padding: 20, font: { size: 11 } }
                }
            }
        }
    });
};

// ================= AUTH =================
if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            await fetch("/api/auth/logout", { ...fetchConfig, method: "POST" });
            window.location.href = "login.html";
        } catch (err) {
            console.error("Logout failed:", err);
        }
    });
}

// ================= ORDER MODAL & STATUS =================
window.updateOrderStatus = async (id, status, selectElement) => {
    try {
        const res = await fetch(`/api/admin/orders/${id}/status`, {
            ...fetchConfig,
            method: "PUT",
            body: JSON.stringify({ status })
        });
        if (res.ok) {
            showToast("Order status updated", "success");
            const statusColors = { pending: '#f3f4f6', processing: '#ffedd5', shipped: '#dbeafe', delivered: '#dcfce7', cancelled: '#fee2e2' };
            selectElement.style.backgroundColor = statusColors[status] || '#fff';
            // Update cache
            const order = allOrdersData.find(o => o._id === id);
            if(order) order.status = status;
        } else {
            showToast("Failed to update status", "error");
        }
    } catch (err) {
        showToast("Error updating status", "error");
    }
};

window.viewOrderDetails = (id) => {
    const order = allOrdersData.find(o => o._id === id);
    if (!order) return;

    document.getElementById("modalOrderId").textContent = `#${order._id}`;
    document.getElementById("modalOrderTotal").textContent = `₹${(order.totalAmount || 0).toLocaleString()}`;
    
    const itemsContainer = document.getElementById("modalOrderItems");
    if (!order.items || order.items.length === 0) {
        itemsContainer.innerHTML = "<p>No items found</p>";
    } else {
        itemsContainer.innerHTML = order.items.map(item => {
            const prod = item.productId;
            if (!prod) return `<div class="order-item"><p>Product Removed</p></div>`;
            return `
                <div class="order-item">
                    <img src="${prod.image}" alt="${prod.name}">
                    <div class="order-item-details">
                        <h4>${prod.name}</h4>
                        <p>Qty: ${item.quantity}</p>
                    </div>
                    <div class="order-item-price">₹${(prod.price * item.quantity).toLocaleString()}</div>
                </div>
            `;
        }).join('');
    }

    document.getElementById("orderModal").classList.add("show");
};

document.getElementById("closeModalBtn")?.addEventListener("click", () => {
    document.getElementById("orderModal").classList.remove("show");
});

// Init Dashboard
fetchStats();
