# 🛒 Mini E-Commerce Web App 

A fully functional **mini e-commerce web application** built using **HTML, CSS, and pure JavaScript** (no frameworks).  
This project focuses on **real-world cart logic, stock management, and UI re-rendering**, similar to how production e-commerce systems work internally.

---

## 🚀 Features

### 🧩 Product System
- Dynamic product listing from JavaScript data
- Category filtering (All, Clothing, Electronics, Stationary, Home, Sports)
- Real-time stock display
- “Out of stock” handling with disabled button

---

### 🛒 Cart System
- Add products to cart
- Increase / decrease quantity using `+ / -`
- Auto remove item when quantity becomes `0`
- Remove item button
- Header cart count updates live
- Cart sidebar (drawer) UI
- Empty cart state handling
- Total amount calculation (no subtotal clutter)

---

### 📦 Stock Management (Real Logic)
- Product stock decreases when item is added
- Stock restores when:
  - Quantity is decreased
  - Item is removed
  - Cart is cleared
- Prevents adding more items than available stock

---

### 💾 Data Persistence
- Cart data stored in `localStorage`
- Product stock stored in `localStorage`
- Cart and stock restore correctly after page refresh

---

## 🧠 Core Concepts Implemented

This project is **logic-focused**, not just UI:

- Single source of truth (`products[]`, `cart[]`)
- UI always re-rendered from data
- No direct DOM manipulation hacks
- Dynamic event binding inside render functions
- Clear separation of:
  - Data
  - Logic
  - UI

---

## 🏗️ Project Structure

/project

│── index.html

│── style.css

│── app.js

│── /Images

│ ├── Clothing

│ ├── Electronics

│ ├── Stationary

│ ├── Home

│ └── Sports

---

## ⚙️ How It Works (High Level)

### 1️⃣ Products Render
- Products are rendered dynamically using `renderProduct()`
- Every stock change triggers a re-render

### 2️⃣ Add to Cart
- Updates:
  - `cart[]`
  - `product.stock`
  - cart count
- Triggers UI refresh

### 3️⃣ Cart Render
- Cart items are created dynamically
- `+ / - / Remove` buttons are bound inside the render loop
- Ensures correct event binding after every re-render

### 4️⃣ Stock Safety
- Prevents adding beyond available stock
- Automatically disables add button when stock is `0`

### 5️⃣ Local Storage
- Cart and product data persist after refresh
- Data is synced after every change

---

## 🧪 Example Logic (Minus Button)

```js
if (item.quantity > 1) {
    item.quantity -= 1;
    product.stock += 1;
} else {
    product.stock += 1;
    cart = cart.filter(ci => ci.id !== item.id);
}
