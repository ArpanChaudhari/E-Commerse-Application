<div align="center">
  <img src="https://github.com/ArpanChaudhari/E-Commerse-Application/blob/main/public/Images/logo-footer-ShopEase.png" alt="ShopEase Logo" width="200"/>
</div>

# ShopEase - E-Commerce Application

![Project Banner](public/Images/Hero-image.jpeg)

A full-stack E-Commerce web application built with a modern backend and responsive frontend. It allows users to browse products, add them to their cart, securely check out using Razorpay, and manage their profiles. It also includes an admin dashboard to manage inventory and products.

## 🚀 Features

- **User Authentication**: Secure Login & Registration using JWT and bcrypt.
- **Product Catalog**: Browse through different categories like Electronics, Clothing, Sports, and Stationery.
- **Shopping Cart**: Add, remove, and manage items in the cart.
- **Secure Payments**: Integrated with Razorpay for seamless payment processing.
- **Admin Dashboard**: Specialized protected routes for admins to add, edit, and delete products.
- **Profile Management**: Users can view their profiles and order history.
- **RESTful API**: Fully functional backend API powering the application.

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3
- Vanilla JavaScript
- Responsive UI

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for authentication
- Multer for file/image uploads

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ArpanChaudhari/E-Commerse-Application.git
   cd E-Commerse-Application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/shopease
   JWT_SECRET=your_jwt_secret_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   FRONTEND_URL=http://localhost:8000
   ```

4. **Seed the Database (Optional)**
   If you want to populate the database with some initial product data:
   ```bash
   node seed.js
   ```

5. **Start the Application**
   ```bash
   npm start
   ```
   The server will start on `http://localhost:8000`.

## 📁 Project Structure

- `/public`: Contains all static frontend assets (HTML, CSS, JS, Images).
- `/routes`: Express API routes for authentication, products, cart, users, and admin actions.
- `/controllers`: Logic for handling API requests.
- `/model`: Mongoose schemas for MongoDB (User, Product, Cart, Order).
- `/middleware`: Authentication middleware and error handlers.
- `/config`: Database connection and other configuration setups.

## 📄 License
This project is open-source and available under the ISC License.
