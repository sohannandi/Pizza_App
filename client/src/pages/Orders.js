import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view your orders');
        setLoading(false);
        return;
      }
      const response = await axios.get('/api/payment/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Filter out orders with invalid pizza data
      const validOrders = response.data.filter(order => 
        order.items.every(item => item.pizza && item.pizza.name)
      );
      
      setOrders(validOrders);
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Please log in to view your orders');
      } else if (error.response?.status === 403) {
        setError('Access denied. Please log in again.');
      } else {
        setError(`Failed to load orders: ${error.response?.data?.message || error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffa500',
      confirmed: '#4caf50',
      preparing: '#2196f3',
      ready: '#ff9800',
      delivered: '#8bc34a',
      cancelled: '#f44336'
    };
    return colors[status] || '#666';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getGameStatus = (status) => {
    const gameStatuses = {
      pending: '⏳ WAITING',
      confirmed: '✅ ACCEPTED',
      preparing: '🔥 IN PROGRESS',
      ready: '🎯 READY',
      delivered: '🏆 COMPLETED',
      cancelled: '❌ ELIMINATED'
    };
    return gameStatuses[status] || status.toUpperCase();
  };

  const getPaymentSymbol = (method) => {
    const symbols = {
      cash: '○',
      card: '△',
      online: '□'
    };
    return symbols[method] || '○';
  };

  if (loading) return (
    <div className="orders-container">
      <div className="loading">Loading orders...</div>
    </div>
  );
  
  if (error) return (
    <div className="orders-container">
      <div className="error-message">
        <h2>⚠️ Error Loading Orders</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    </div>
  );

  return (
    <div className="orders-container">
      <h1>📋 ORDER HISTORY</h1>
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>📦 No Orders Placed</h2>
          <p>You haven't placed any pizza orders yet.</p>
          <p>Browse our menu and order some delicious pizzas!</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div 
              key={order._id} 
              className="order-card"
            >
              <div className="order-header">
                <div className="order-info">
                  <h3>📋 Order #{order._id.slice(-8)}</h3>
                  <p className="order-date">Started: {formatDate(order.createdAt)}</p>
                </div>
                <div className="order-status">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getGameStatus(order.status)}
                  </span>
                </div>
              </div>
              
              <div className="order-items">
                <h4>△ Selected Items:</h4>
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="order-item">
                    <span>○ {item.pizza?.name || 'Pizza Name Not Available'}</span>
                    <span>{item.size.toUpperCase()}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>₹{item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="order-details">
                <div className="delivery-info">
                  <h4>□ Safe House Location:</h4>
                  <p>
                    {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.zipCode}
                  </p>
                </div>
                
                <div className="payment-info">
                  <p><strong>Payment Method:</strong> {getPaymentSymbol(order.paymentMethod)} {order.paymentMethod}</p>
                  <p><strong>Payment Status:</strong> {order.paymentStatus.toUpperCase()}</p>
                </div>
                
                {order.estimatedDeliveryTime && (
                  <div className="delivery-time">
                    <p><strong>Estimated Arrival:</strong> {formatDate(order.estimatedDeliveryTime)}</p>
                  </div>
                )}
                
                {order.notes && (
                  <div className="order-notes">
                    <p><strong>Order Instructions:</strong> {order.notes}</p>
                  </div>
                )}
              </div>
              
              <div className="order-total">
                <h3>🏆 TOTAL PRIZE: ₹{order.totalAmount.toFixed(2)}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;