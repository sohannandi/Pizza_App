import React, { useState } from 'react';
import axios from 'axios';

const Cart = ({ cart, removeFromCart, clearCart, user }) => {
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: user.address?.street || '',
    city: user.address?.city || '',
    zipCode: user.address?.zipCode || ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [notes, setNotes] = useState('');

  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleAddressChange = (e) => {
    setDeliveryAddress({
      ...deliveryAddress,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.zipCode) {
      alert('Please fill in all delivery address fields!');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        items: cart,
        deliveryAddress,
        paymentMethod,
        notes
      };

      const response = await axios.post('/api/payment/order', orderData);

      if (response.data.order) {
        setOrderPlaced(true);
        clearCart();
        alert('Order placed successfully! You will receive a confirmation shortly.');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="cart-container">
        <div className="order-success">
          <h2>○ Order Placed Successfully!</h2>
          <p>Congratulations! You've orderd your pizza.</p>
          <p>Your order will arrive in 45 minutes.</p>
          <button onClick={() => setOrderPlaced(false)} className="continue-shopping-btn">
            ○ Continue Playing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>🍕 PIZZA CART</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>□ Empty order dashboard</h2>
          <p>Your cart is empty! No items selected.</p>
          <p>Return to the menu to choose your favourite pizzas.</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div
                key={`${item.pizzaId}-${item.size}`}
                className="cart-item"
              >
                <div className="item-info">
                  <h3>○ {item.name}</h3>
                  <p>Size: {item.size.toUpperCase()}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Prize: ₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.pizzaId, item.size)}
                  className="remove-btn"
                >
                  □ Eliminate
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>🏆 TOTAL PRIZE: ₹{totalAmount.toFixed(2)}</h3>
          </div>

          <div className="order-form">
            <h3>△ DELIVERY COORDINATES</h3>

            <div className="form-group">
              <label htmlFor="street">Street Address:</label>
              <input
                type="text"
                id="street"
                name="street"
                value={deliveryAddress.street}
                onChange={handleAddressChange}
                placeholder="Enter your safe house location..."
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={deliveryAddress.city}
                  onChange={handleAddressChange}
                  placeholder="City zone..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">Zip Code:</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={deliveryAddress.zipCode}
                  onChange={handleAddressChange}
                  placeholder="Security code..."
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method:</label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="cash">○ Cash on Delivery</option>
                <option value="card">△ Credit/Debit Card</option>
                <option value="online">□ Online Payment</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="notes">More special Instructions:</label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special survival requests or delivery tactics..."
              />
            </div>

            <div className="cart-actions">
              <button onClick={clearCart} className="clear-cart-btn">
                △ Cancel Order
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="place-order-btn"
              >
                {loading ? '○ Processing Order...' : '○ Proceed Order'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;