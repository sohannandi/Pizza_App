import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Components
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import ScrollAnimations from './components/ScrollAnimations';
import GeometricBackground from './components/GeometricBackground';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  const addToCart = (pizza, size, quantity) => {
    const existingItem = cart.find(item => 
      item.pizzaId === pizza._id && item.size === size
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item.pizzaId === pizza._id && item.size === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, {
        pizzaId: pizza._id,
        name: pizza.name,
        size,
        quantity,
        price: pizza.price[size]
      }]);
    }
  };

  const removeFromCart = (pizzaId, size) => {
    setCart(cart.filter(item => !(item.pizzaId === pizzaId && item.size === size)));
  };

  const clearCart = () => {
    setCart([]);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <GeometricBackground />
        <ScrollAnimations />
        <Header user={user} logout={logout} cartCount={cart.length} />
        <main className="main-content parallax-container">
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login onLogin={login} /> : <Navigate to="/menu" />} 
            />
            <Route 
              path="/register" 
              element={!user ? <Register onLogin={login} /> : <Navigate to="/menu" />} 
            />
            <Route 
              path="/menu" 
              element={user ? <Menu addToCart={addToCart} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/cart" 
              element={user ? 
                <Cart 
                  cart={cart} 
                  removeFromCart={removeFromCart} 
                  clearCart={clearCart}
                  user={user}
                /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/orders" 
              element={user ? <Orders /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
