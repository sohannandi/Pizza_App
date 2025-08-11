import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ user, logout, cartCount }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <img
            src="logo_pizza_crust.jpeg"
            alt="SQUID CRUST"
            className="logo-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'inline-flex';
            }}
            onLoad={(e) => {
              e.target.nextSibling.style.display = 'none';
            }}
          />
          <span className="logo-text" style={{ display: 'none' }}>
            🍕 SQUID CRUST
          </span>
        </Link>

        {user && (
          <nav className="nav">
            <Link to="/menu" className="nav-link">Menu</Link>
            <Link to="/cart" className="nav-link">
              Cart ({cartCount})
            </Link>
            <Link to="/orders" className="nav-link">Orders</Link>
            <div className="user-info">
              <span>Hello, {user.name}!</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;