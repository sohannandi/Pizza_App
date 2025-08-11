const mongoose = require('mongoose');

const pizzaBaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    small: {
      type: Number,
      required: true
    },
    medium: {
      type: Number,
      required: true
    },
    large: {
      type: Number,
      required: true
    }
  },
  ingredients: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    enum: ['vegetarian', 'non-vegetarian', 'vegan', 'specialty'],
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  available: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number, // in minutes
    default: 20
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PizzaBase', pizzaBaseSchema);