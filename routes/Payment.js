const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const PizzaBase = require('../models/PizzaBase');

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Get all pizzas
router.get('/pizzas', async (req, res) => {
  try {
    const pizzas = await PizzaBase.find({ available: true });
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create order
router.post('/order', authenticateToken, async (req, res) => {
  try {
    const { items, deliveryAddress, paymentMethod, notes } = req.body;

    let totalAmount = 0;
    const orderItems = [];

    // Calculate total amount and prepare order items
    for (const item of items) {
      const pizza = await PizzaBase.findById(item.pizzaId);
      if (!pizza) {
        return res.status(400).json({ message: `Pizza not found: ${item.pizzaId}` });
      }

      const price = pizza.price[item.size] * item.quantity;
      totalAmount += price;

      orderItems.push({
        pizza: item.pizzaId,
        size: item.size,
        quantity: item.quantity,
        price: price
      });
    }

    // Create order
    const order = new Order({
      user: req.user.userId,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      paymentMethod,
      notes
    });

    await order.save();
    await order.populate('items.pizza');

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user orders
router.get('/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate('items.pizza')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status (admin only)
router.patch('/order/:orderId/status', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    ).populate('items.pizza');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      message: 'Order status updated',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Process payment (mock implementation)
router.post('/process-payment', authenticateToken, async (req, res) => {
  try {
    const { orderId, paymentDetails } = req.body;

    // Mock payment processing
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Simulate payment processing
    const paymentSuccess = Math.random() > 0.1; // 90% success rate

    if (paymentSuccess) {
      order.paymentStatus = 'completed';
      order.status = 'confirmed';
      await order.save();

      res.json({
        message: 'Payment processed successfully',
        paymentStatus: 'completed'
      });
    } else {
      order.paymentStatus = 'failed';
      await order.save();

      res.status(400).json({
        message: 'Payment failed',
        paymentStatus: 'failed'
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;