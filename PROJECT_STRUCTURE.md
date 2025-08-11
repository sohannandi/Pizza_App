# Pizza Ordering Website - Project Structure

## 🍕 Overview
A complete pizza ordering application with React frontend and Node.js backend, featuring a Squid Game-inspired dark theme.

## 📁 Project Structure

### Backend (Root Directory)
```
├── app.js                 # Main Express server
├── package.json           # Backend dependencies
├── .env                   # Environment variables
├── seed.js               # Database seeding script
├── models/               # MongoDB models
│   ├── User.js           # User schema
│   ├── Admin.js          # Admin schema
│   ├── PizzaBase.js      # Pizza schema
│   └── Order.js          # Order schema
└── routes/               # API routes
    ├── auth.js           # Authentication routes
    └── Payment.js        # Order/payment routes
```

### Frontend (client/ Directory)
```
client/
├── package.json          # Frontend dependencies
├── public/               # Static files
│   ├── index.html        # Main HTML template
│   ├── favicon.ico       # Website icon
│   ├── logo_pizza_crust.jpeg # Logo image
│   └── squid-crust-logo.png  # Alternative logo
└── src/                  # React source code
    ├── App.js            # Main React component
    ├── App.css           # Main stylesheet
    ├── index.js          # React entry point
    ├── components/       # Reusable components
    │   ├── Header.js     # Navigation header
    │   ├── GeometricBackground.js # Background effects
    │   └── ScrollAnimations.js   # Scroll animations
    └── pages/            # Page components
        ├── Home.js       # Landing page
        ├── Login.js      # User login
        ├── Register.js   # User registration
        ├── Menu.js       # Pizza menu
        ├── Cart.js       # Shopping cart
        └── Orders.js     # Order history
```

## 🚀 Features

### ✅ Implemented Features
- **User Authentication**: Registration, login, JWT tokens
- **Pizza Menu**: 18 different pizzas with images and pricing
- **Shopping Cart**: Add/remove items, quantity management
- **Order Placement**: Complete checkout process
- **Order History**: View past orders with details
- **Responsive Design**: Works on desktop and mobile
- **Dark Theme**: Squid Game-inspired UI with neon effects
- **Indian Currency**: All prices displayed in INR (₹)

### 🎨 Design Features
- **Squid Game Theme**: Dark background with neon pink/red highlights
- **Geometric Shapes**: Triangle, circle, square symbols throughout
- **Smooth Animations**: Scroll effects and hover animations
- **Professional Typography**: Clean, modern fonts
- **Image Fallbacks**: Graceful handling of missing images

## 🔧 Technical Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** for cross-origin requests

### Frontend
- **React 18** with functional components
- **React Router** for navigation
- **Axios** for API calls
- **CSS3** with custom animations
- **Responsive design** with flexbox/grid

## 🗄️ Database Schema

### Users Collection
- name, email, password (hashed), phone
- address (street, city, zipCode)
- role (customer/admin)

### Orders Collection
- user reference, items array, totalAmount
- deliveryAddress, paymentMethod, status
- timestamps, estimatedDeliveryTime

### PizzaBase Collection
- name, description, price (by size)
- image URL, category, available flag

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Orders & Menu
- `GET /api/payment/pizzas` - Get all pizzas
- `POST /api/payment/order` - Place new order
- `GET /api/payment/orders` - Get user orders

## 🎯 Test Account
- **Email**: testuser@example.com
- **Password**: password123

## 🚀 How to Run
1. Install backend dependencies: `npm install`
2. Install frontend dependencies: `cd client && npm install`
3. Seed database: `npm run seed`
4. Start backend: `npm start` (Port 5000)
5. Start frontend: `cd client && npm start` (Port 3000)
6. Visit: http://localhost:3000

## 📝 Notes
- All console.log statements removed for production
- Unused components and files cleaned up
- Error handling implemented throughout
- Image loading with fallbacks
- Responsive design for all screen sizes