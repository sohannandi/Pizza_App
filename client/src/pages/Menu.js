import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = ({ addToCart }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const response = await axios.get('/api/payment/pizzas');
      setPizzas(response.data);
    } catch (error) {
      setError('Failed to load menu');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (pizza, size, quantity) => {
    addToCart(pizza, size, quantity);
    alert(`Added ${quantity} ${size} ${pizza.name} to cart!`);
  };

  if (loading) return <div className="loading">Loading menu...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="menu-container">
      <h1>🎯 All Your Favorites in One Place</h1>

      {pizzas.length === 0 ? (
        <div className="no-pizzas">
          <h2>🔺 Game Over</h2>
          <p>No pizzas available at the moment.</p>
          <p>Please check back later!</p>
        </div>
      ) : (
        <div className="pizza-grid">
          {pizzas.map((pizza) => (
            <PizzaCard
              key={pizza._id}
              pizza={pizza}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const PizzaCard = ({ pizza, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('medium');
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="pizza-card">
      <div className="pizza-image">
        {pizza.image && (
          <img
            src={pizza.image}
            alt={pizza.name}
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              const placeholder = e.target.parentNode.querySelector('.placeholder-image');
              if (placeholder) {
                placeholder.style.display = 'flex';
                placeholder.innerHTML = `🍕<br><small>Image loading failed</small>`;
              }
            }}
            onLoad={(e) => {
              const placeholder = e.target.parentNode.querySelector('.placeholder-image');
              if (placeholder) placeholder.style.display = 'none';
            }}
          />
        )}
        <div className="placeholder-image" style={{ display: pizza.image ? 'none' : 'flex' }}>
          🍕
        </div>
      </div>

      <div className="pizza-info">
        <h3>{pizza.name}</h3>
        <p className="pizza-description">{pizza.description}</p>
        <p className="pizza-ingredients">
          <strong>Ingredients:</strong> {pizza.ingredients.join(', ')}
        </p>
        <div className="pizza-category">
          <span className={`category-badge ${pizza.category}`}>
            {pizza.category}
          </span>
        </div>
      </div>

      <div className="pizza-order">
        <div className="size-selection">
          <label>Size:</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="small">Small - ₹{pizza.price.small}</option>
            <option value="medium">Medium - ₹{pizza.price.medium}</option>
            <option value="large">Large - ₹{pizza.price.large}</option>
          </select>
        </div>

        <div className="quantity-selection">
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>

        <div className="price-display">
          <strong>
            Total: ₹{(pizza.price[selectedSize] * quantity).toFixed(2)}
          </strong>
        </div>

        <button
          className="add-to-cart-btn"
          onClick={() => onAddToCart(pizza, selectedSize, quantity)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Menu;