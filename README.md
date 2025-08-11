# 🍕 Pizza Ordering Application

A full-stack pizza ordering application with a **Squid Game-inspired dark theme**, built with React and Node.js.

![Pizza App](https://img.shields.io/badge/Pizza-App-red?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## ✨ Features

- 🔐 **User Authentication** - Secure registration and login with JWT
- 🍕 **Pizza Menu** - Browse 18 different pizzas with images and descriptions
- 🛒 **Shopping Cart** - Add/remove items with size and quantity selection
- 📦 **Order Management** - Complete checkout process with delivery details
- 📋 **Order History** - View past orders with status tracking
- 🎨 **Squid Game Theme** - Dark UI with neon pink highlights and geometric shapes
- 💰 **Indian Currency** - All prices displayed in INR (₹)
- 📱 **Responsive Design** - Works perfectly on desktop and mobile

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Custom animations and responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/sohannandi/Pizza_App.git
   cd Pizza_App
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/pizzaapp
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   ```

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the application**
   
   **Backend (Terminal 1):**
   ```bash
   npm start
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd client
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🎯 Usage

### For Users:
1. **Register** a new account or **login** with existing credentials
2. **Browse** the pizza menu with 18 delicious options
3. **Add pizzas** to your cart with preferred size and quantity
4. **Place orders** with delivery address and payment method
5. **Track orders** in your order history

### Test Account:
- **Email:** testuser@example.com
- **Password:** password123

## 🗄️ Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: {
    street: String,
    city: String,
    zipCode: String
  },
  role: String (customer/admin)
}
```

### Orders Collection
```javascript
{
  user: ObjectId (ref: User),
  items: [{
    pizza: ObjectId (ref: PizzaBase),
    size: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  deliveryAddress: Object,
  paymentMethod: String,
  status: String,
  paymentStatus: String
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Menu & Orders
- `GET /api/payment/pizzas` - Get all available pizzas
- `POST /api/payment/order` - Place a new order (requires auth)
- `GET /api/payment/orders` - Get user's order history (requires auth)

## 🎨 Design Features

- **Dark Theme** - Squid Game-inspired color scheme
- **Neon Highlights** - Pink and red accent colors
- **Geometric Shapes** - Triangle, circle, square symbols
- **Smooth Animations** - Hover effects and transitions
- **Responsive Layout** - Mobile-first design approach

## 📁 Project Structure

```
Pizza_App/
├── client/                 # React frontend
│   ├── public/            # Static files
│   └── src/               # React components
│       ├── components/    # Reusable components
│       └── pages/         # Page components
├── models/                # MongoDB schemas
├── routes/                # Express API routes
├── app.js                 # Express server
├── seed.js               # Database seeding
└── package.json          # Dependencies
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sohan Nandi**
- GitHub: [@sohannandi](https://github.com/sohannandi)

## 🙏 Acknowledgments

- Inspired by the Squid Game series for the dark theme design
- Pizza images from Unsplash
- Icons and emojis for enhanced user experience

---

⭐ **Star this repository if you found it helpful!** ⭐