// ================= FETCH CONFIG =================
const fetchConfig = {
    credentials: "include",
    headers: { "Content-Type": "application/json" }
};

// ================= STATE =================
let currentUser = null;
let currentOrders = [];

// ================= DOM =================
const profileRoot = document.getElementById("profileRoot");
const homeBtn = document.getElementById("homeBtn");
const logoutBtn = document.getElementById("logoutBtn");

// ================= FETCH USER =================
const fetchCurrentUser = async () => {
    try {
        const res = await fetch("/api/user", fetchConfig);
        if (res.ok) {
            const data = await res.json();
            currentUser = data.user;
            currentOrders = data.orders || [];
            renderLayout();
        } else {
            window.location.href = "login.html";
        }
    } catch (err) {
        console.error("Error fetching user profile:", err);
        profileRoot.innerHTML = `<div class="error-msg">Failed to load profile details. Please try again.</div>`;
    }
};

// ================= RENDER =================
const renderLayout = () => {
    if (!currentUser) return;

    // Fallbacks
    const fName = currentUser.firstName || currentUser.name.split(' ')[0] || "";
    const lName = currentUser.lastName || (currentUser.name.split(' ').slice(1).join(' ')) || "";
    const memberSince = currentUser.createdAt ? new Date(currentUser.createdAt).getFullYear() : "2023";

    profileRoot.innerHTML = `
        <!-- Top Card -->
        <div class="profile-card-top">
            <div class="profile-user-info">
                <div class="profile-avatar-img">
                    ${currentUser.firstName ? currentUser.firstName.charAt(0).toUpperCase() : currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h2 class="profile-name">${currentUser.firstName ? currentUser.firstName + ' ' + currentUser.lastName : currentUser.name}</h2>
                    <div class="profile-email">${currentUser.email}</div>
                    <div class="profile-badges">
                        <span class="badge-premium">${currentUser.role === 'admin' ? 'Admin User' : 'Premium Member'}</span>
                        <span class="badge-member-since">Member since ${memberSince}</span>
                    </div>
                </div>
            </div>
            <button class="edit-profile-btn">
                <i class="fa-regular fa-pen-to-square"></i> EDIT PROFILE
            </button>
        </div>

        <!-- Bottom Card -->
        <div class="profile-card-bottom">
            <!-- Tabs -->
            <div class="profile-tabs">
                <button class="tab-btn active" data-tab="tab-profile">
                    <i class="fa-regular fa-user"></i> PROFILE
                </button>
                <button class="tab-btn" data-tab="tab-orders">
                    <i class="fa-solid fa-box"></i> ORDERS
                </button>
                <button class="tab-btn" data-tab="tab-addresses">
                    <i class="fa-solid fa-location-dot"></i> ADDRESSES
                </button>
                <button class="tab-btn" data-tab="tab-payment">
                    <i class="fa-regular fa-credit-card"></i> PAYMENT
                </button>
                <button class="tab-btn" data-tab="tab-security">
                    <i class="fa-solid fa-lock"></i> SECURITY
                </button>
            </div>

            <!-- Tab Content: Profile -->
            <div class="tab-content active" id="tab-profile">
                <form id="profileUpdateForm" class="profile-form">
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" id="firstName" value="${fName}">
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" id="lastName" value="${lName}">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="email" value="${currentUser.email}" readonly style="background: #f9fafb; color: #6b7280; cursor: not-allowed;">
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="text" id="phone" value="${currentUser.phone || ''}">
                    </div>
                    <div class="form-group form-group-full">
                        <label>Bio</label>
                        <textarea id="bio">${currentUser.bio || ''}</textarea>
                    </div>
                    
                    <div class="form-group-full">
                        <button type="submit" class="save-btn">SAVE CHANGES</button>
                    </div>
                </form>
            </div>

            <!-- Tab Content: Orders -->
            <div class="tab-content" id="tab-orders">
                <div id="ordersContainer"></div>
            </div>

            <!-- Tab Content: Addresses -->
            <div class="tab-content" id="tab-addresses">
                <div class="address-header">
                    <h3 class="security-title" style="margin:0;">Saved Addresses</h3>
                    <button class="btn-outline" id="addNewAddressBtn" type="button"><i class="fa-solid fa-plus"></i> ADD NEW ADDRESS</button>
                </div>
                <div id="addressesContainer" class="addresses-container"></div>
            </div>

            <!-- Tab Content: Payment (Coming Soon) -->
            <div class="tab-content" id="tab-payment">
                <div class="coming-soon">Payment methods coming soon.</div>
            </div>

            <!-- Tab Content: Security -->
            <div class="tab-content" id="tab-security">
                <div class="security-section">
                    <h3 class="security-title">Change Password</h3>
                    <form id="changePasswordForm" class="security-form">
                        <input type="password" id="currentPassword" placeholder="Current Password" required>
                        <input type="password" id="newPassword" placeholder="New Password" required>
                        <input type="password" id="confirmPassword" placeholder="Confirm New Password" required>
                        <button type="submit" class="save-btn">UPDATE PASSWORD</button>
                    </form>
                </div>
                
                <hr class="security-divider">
                
                <div class="security-section">
                    <h3 class="security-title">Two-Factor Authentication</h3>
                    <p class="security-subtitle">Add an extra layer of security to your account</p>
                    <button class="btn-outline" id="enable2faBtn" type="button">ENABLE 2FA</button>
                </div>
            </div>
        </div>

        <!-- Address Modal Overlay -->
        <div class="modal-overlay hidden" id="addressModal">
            <div class="modal-content">
                <h3 class="modal-title" id="addressModalTitle">Add New Address</h3>
                <form id="addressForm" class="profile-form" style="display: flex; flex-direction: column;">
                    <input type="hidden" id="addrId">
                    <div class="form-group">
                        <label>Label (e.g. Home, Work)</label>
                        <input type="text" id="addrLabel" required>
                    </div>
                    <div class="form-group">
                        <label>Address Line 1</label>
                        <input type="text" id="addrLine1" required>
                    </div>
                    <div class="form-group">
                        <label>Address Line 2 (City, State, Zip)</label>
                        <input type="text" id="addrLine2" required>
                    </div>
                    <div class="form-group" style="flex-direction: row; align-items: center; gap: 10px;">
                        <input type="checkbox" id="addrDefault" style="width: auto;">
                        <label style="margin: 0; background: none;">Set as default address</label>
                    </div>
                    <div class="form-group" style="flex-direction: row; justify-content: flex-end; gap: 10px; margin-top: 15px;">
                        <button type="button" class="btn-outline" id="closeAddressModal">CANCEL</button>
                        <button type="submit" class="save-btn" style="margin-top: 0;">SAVE ADDRESS</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    renderOrders(currentOrders);
    renderAddresses(currentUser.addresses || []);
    attachEventListeners();
};

const renderAddresses = (addresses) => {
    const container = document.getElementById("addressesContainer");
    if (!container) return;

    if (!addresses || addresses.length === 0) {
        container.innerHTML = `<div class="coming-soon">No saved addresses found.</div>`;
        return;
    }

    let html = '';
    addresses.forEach(addr => {
        html += `
            <div class="address-card">
                <div>
                    <div class="address-label-wrap">
                        <span class="address-label">${addr.label}</span>
                        ${addr.isDefault ? '<span class="badge-default">Default</span>' : ''}
                    </div>
                    <div class="address-lines">
                        ${addr.addressLine1}<br>
                        ${addr.addressLine2}
                    </div>
                </div>
                <div class="address-actions">
                    <button type="button" class="btn-edit" onclick="window.editAddress('${addr._id}')">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button type="button" class="btn-delete" onclick="window.deleteAddress('${addr._id}')">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
};

const renderOrders = (orders) => {
    const ordersContainer = document.getElementById("ordersContainer");
    if (!ordersContainer) return;
    
    if (!orders || orders.length === 0) {
        ordersContainer.innerHTML = `<div style="text-align: center; color: #6b7280; padding: 20px;">No orders found.</div>`;
        return;
    }

    let html = '';
    orders.forEach(order => {
        const date = new Date(order.createdAt).toLocaleDateString();
        let itemsHtml = '';
        order.items.forEach(item => {
            const product = item.productId;
            if (product) {
                itemsHtml += `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9rem;">
                        <span>${product.name} (x${item.quantity})</span>
                        <span>₹${(product.price * item.quantity).toFixed(2)}</span>
                    </div>
                `;
            }
        });

        html += `
            <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 10px;">
                    <div>
                        <span style="font-weight: 600;">Order ID: ${order._id}</span><br>
                        <span style="font-size: 0.8rem; color: #6b7280;">${date}</span>
                    </div>
                    <span style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase;">${order.status}</span>
                </div>
                <div>${itemsHtml}</div>
                <div style="display: flex; justify-content: space-between; border-top: 1px solid #e5e7eb; padding-top: 10px; margin-top: 10px; font-weight: 600;">
                    <span>Total Amount</span>
                    <span>₹${(order.totalAmount || 0).toFixed(2)}</span>
                </div>
            </div>
        `;
    });

    ordersContainer.innerHTML = html;
};

// ================= EVENTS =================
const attachEventListeners = () => {
    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const target = btn.getAttribute('data-tab');
            document.getElementById(target).classList.add('active');
        });
    });

    // Form Submit
    const form = document.getElementById("profileUpdateForm");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.save-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'SAVING...';
            submitBtn.disabled = true;

            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            const phone = document.getElementById("phone").value;
            const bio = document.getElementById("bio").value;
            const name = firstName + " " + lastName; // fallback for legacy logic

            try {
                const res = await fetch("/api/user/update", {
                    ...fetchConfig,
                    method: "PUT",
                    body: JSON.stringify({ name, firstName, lastName, phone, bio })
                });

                if (res.ok) {
                    showToast("Profile updated successfully!", "success");
                    await fetchCurrentUser(); // re-fetch to update top card
                } else {
                    const err = await res.json();
                    showToast("Error: " + err.message, "error");
                }
            } catch (err) {
                console.error(err);
                showToast("Error updating profile", "error");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Change Password
    const changePasswordForm = document.getElementById("changePasswordForm");
    if (changePasswordForm) {
        changePasswordForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const currentPassword = document.getElementById("currentPassword").value;
            const newPassword = document.getElementById("newPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (newPassword !== confirmPassword) {
                return showToast("New passwords do not match", "error");
            }
            if (newPassword.length < 6) {
                return showToast("New password must be at least 6 characters", "error");
            }

            const submitBtn = changePasswordForm.querySelector('.save-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'UPDATING...';
            submitBtn.disabled = true;

            try {
                const res = await fetch("/api/user/change-password", {
                    ...fetchConfig,
                    method: "PUT",
                    body: JSON.stringify({ currentPassword, newPassword })
                });

                if (res.ok) {
                    showToast("Password updated successfully!", "success");
                    changePasswordForm.reset();
                } else {
                    const err = await res.json();
                    showToast("Error: " + err.message, "error");
                }
            } catch (err) {
                console.error(err);
                showToast("Error updating password", "error");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // 2FA Button
    const enable2faBtn = document.getElementById("enable2faBtn");
    if (enable2faBtn) {
        enable2faBtn.addEventListener("click", () => {
            showToast("2FA implementation coming soon!", "success");
        });
    }

    // Address Modal Logic
    const addressModal = document.getElementById("addressModal");
    const addressForm = document.getElementById("addressForm");
    const addNewAddressBtn = document.getElementById("addNewAddressBtn");
    const closeAddressModalBtn = document.getElementById("closeAddressModal");
    const addressModalTitle = document.getElementById("addressModalTitle");

    if (addNewAddressBtn) {
        addNewAddressBtn.addEventListener("click", () => {
            addressForm.reset();
            document.getElementById("addrId").value = "";
            addressModalTitle.textContent = "Add New Address";
            addressModal.classList.remove("hidden");
        });
    }

    if (closeAddressModalBtn) {
        closeAddressModalBtn.addEventListener("click", () => {
            addressModal.classList.add("hidden");
        });
    }

    if (addressForm) {
        addressForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const id = document.getElementById("addrId").value;
            const label = document.getElementById("addrLabel").value;
            const addressLine1 = document.getElementById("addrLine1").value;
            const addressLine2 = document.getElementById("addrLine2").value;
            const isDefault = document.getElementById("addrDefault").checked;

            const url = id ? `/api/user/address/${id}` : "/api/user/address";
            const method = id ? "PUT" : "POST";

            try {
                const res = await fetch(url, {
                    ...fetchConfig,
                    method,
                    body: JSON.stringify({ label, addressLine1, addressLine2, isDefault })
                });

                if (res.ok) {
                    const updatedAddresses = await res.json();
                    currentUser.addresses = updatedAddresses;
                    renderAddresses(updatedAddresses);
                    addressModal.classList.add("hidden");
                    showToast(id ? "Address updated" : "Address added", "success");
                } else {
                    const err = await res.json();
                    showToast("Error: " + err.message, "error");
                }
            } catch (err) {
                console.error(err);
                showToast("Error saving address", "error");
            }
        });
    }
};

// Global expose for inline onclick handlers
window.editAddress = (id) => {
    const addr = currentUser.addresses.find(a => a._id === id);
    if (!addr) return;

    document.getElementById("addrId").value = addr._id;
    document.getElementById("addrLabel").value = addr.label;
    document.getElementById("addrLine1").value = addr.addressLine1;
    document.getElementById("addrLine2").value = addr.addressLine2;
    document.getElementById("addrDefault").checked = addr.isDefault;
    
    document.getElementById("addressModalTitle").textContent = "Edit Address";
    document.getElementById("addressModal").classList.remove("hidden");
};

window.deleteAddress = async (id) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
        const res = await fetch(`/api/user/address/${id}`, {
            ...fetchConfig,
            method: "DELETE"
        });

        if (res.ok) {
            const updatedAddresses = await res.json();
            currentUser.addresses = updatedAddresses;
            renderAddresses(updatedAddresses);
            showToast("Address deleted", "success");
        } else {
            showToast("Failed to delete address", "error");
        }
    } catch (err) {
        console.error(err);
        showToast("Error deleting address", "error");
    }
};

if (homeBtn) {
    homeBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            await fetch("/api/auth/logout", {
                ...fetchConfig,
                method: "POST"
            });
            window.location.href = "login.html";
        } catch (err) {
            console.error("Logout failed:", err);
        }
    });
}

// ================= INIT =================
const init = async () => {
    await fetchCurrentUser();
};

init();
