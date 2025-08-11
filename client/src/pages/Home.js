import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="brand-highlight">SQUID CRUST</span>
            </h1>
            <p className="hero-subtitle">
              🎯 All Your Favorites in One Place
            </p>
            <p className="hero-description">
              Experience the ultimate pizza adventure with our handcrafted pizzas. 
              From classic favorites to specialty creations, every bite is a winning move.
            </p>
            <div className="hero-buttons">
              <Link to="/menu" className="cta-button primary">
                🍕 Order Now
              </Link>
              <Link to="/register" className="cta-button secondary">
                ○ Join SQUID CRUST
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="pizza-showcase">
              <div className="floating-pizza">🍕</div>
              <div className="game-symbols">
                <span className="symbol circle">○</span>
                <span className="symbol triangle">△</span>
                <span className="symbol square">□</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose SQUID CRUST?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Premium Quality</h3>
              <p>Hand-selected ingredients and artisan craftsmanship in every pizza</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery to your safe house location</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Award Winning</h3>
              <p>Recognized for excellence in taste and customer satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Pizzas Section */}
      <section className="popular-section">
        <div className="container">
          <h2 className="section-title">Customer Favorites</h2>
          <div className="popular-grid">
            <div className="popular-item">
              <div className="popular-image">🍕</div>
              <h3>Margherita Classic</h3>
              <p>Fresh tomatoes, mozzarella, and basil</p>
              <span className="price">From ₹299</span>
            </div>
            <div className="popular-item">
              <div className="popular-image">🍕</div>
              <h3>Pepperoni Supreme</h3>
              <p>America's favorite with premium pepperoni</p>
              <span className="price">From ₹349</span>
            </div>
            <div className="popular-item">
              <div className="popular-image">🍕</div>
              <h3>Chicken Tikka</h3>
              <p>Spicy Indian-style chicken tikka with onions</p>
              <span className="price">From ₹419</span>
            </div>
          </div>
          <div className="popular-cta">
            <Link to="/menu" className="cta-button primary">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Pizza Adventure?</h2>
            <p>Join thousands of satisfied customers who have made SQUID CRUST their go-to pizza destination</p>
            <div className="cta-buttons">
              <Link to="/register" className="cta-button primary">
                □ Create Account
              </Link>
              <Link to="/menu" className="cta-button secondary">
                🍕 Browse Menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;