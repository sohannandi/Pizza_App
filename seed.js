const mongoose = require('mongoose');
const PizzaBase = require('./models/PizzaBase');
const Admin = require('./models/Admin');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pizzaapp';

const samplePizzas = [
  {
    name: "Margherita",
    description: "Classic pizza with fresh tomatoes, mozzarella cheese, and basil",
    price: {
      small: 299,
      medium: 399,
      large: 499
    },
    ingredients: ["Tomato sauce", "Mozzarella cheese", "Fresh basil", "Olive oil"],
    category: "vegetarian",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop",
    available: true,
    preparationTime: 15
  },
  {
    name: "Pepperoni",
    description: "America's favorite with pepperoni and mozzarella cheese",
    price: {
      small: 349,
      medium: 449,
      large: 549
    },
    ingredients: ["Tomato sauce", "Mozzarella cheese", "Pepperoni"],
    category: "non-vegetarian",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
    available: true,
    preparationTime: 18
  },
  {
    name: "Veggie Supreme",
    description: "Loaded with fresh vegetables and cheese",
    price: {
      small: 379,
      medium: 479,
      large: 579
    },
    ingredients: ["Tomato sauce", "Mozzarella cheese", "Bell peppers", "Mushrooms", "Onions", "Olives", "Tomatoes"],
    category: "vegetarian",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&auto=format&q=80",
    available: true,
    preparationTime: 20
  },
  {
    name: "Meat Lovers",
    description: "For the carnivores - loaded with multiple meats",
    price: {
      small: 429,
      medium: 529,
      large: 629
    },
    ingredients: ["Tomato sauce", "Mozzarella cheese", "Pepperoni", "Sausage", "Ham", "Bacon"],
    category: "non-vegetarian",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    available: true,
    preparationTime: 25
  },
  {
    name: "Hawaiian",
    description: "Sweet and savory with ham and pineapple",
    price: {
      small: 379,
      medium: 479,
      large: 579
    },
    ingredients: ["Tomato sauce", "Mozzarella cheese", "Ham", "Pineapple"],
    category: "non-vegetarian",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop",
    available: true,
    preparationTime: 18
  },
  {
    name: "BBQ Chicken",
    description: "Grilled chicken with BBQ sauce and red onions",
    price: {
      small: 399,
      medium: 499,
      large: 599
    },
    ingredients: ["BBQ sauce", "Mozzarella cheese", "Grilled chicken", "Red onions", "Cilantro"],
    category: "non-vegetarian",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop",
    available: true,
    preparationTime: 22
  },
  {
    name: "Vegan Delight",
    description: "Plant-based pizza with vegan cheese and vegetables",
    price: {
      small: 399,
      medium: 499,
      large: 599
    },
    ingredients: ["Tomato sauce", "Vegan cheese", "Bell peppers", "Mushrooms", "Spinach", "Cherry tomatoes"],
    category: "vegan",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
    available: true,
    preparationTime: 20
  },
  {
    name: "Four Cheese",
    description: "Cheese lover's dream with four different cheeses",
    price: {
      small: 429,
      medium: 529,
      large: 629
    },
    ingredients: ["White sauce", "Mozzarella", "Parmesan", "Gorgonzola", "Ricotta", "Fresh herbs"],
    category: "specialty",
    image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=400&h=300&fit=crop",
    available: true,
    preparationTime: 20
  },
  {
    name: "Chicken Tikka",
    description: "Spicy Indian-style chicken tikka with onions and peppers",
    price: {
      small: 419,
      medium: 519,
      large: 619
    },
    ingredients: ["Tomato sauce", "Mozzarella cheese", "Chicken tikka", "Red onions", "Bell peppers", "Cilantro"],
    category: "non-vegetarian",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format&q=80",
    available: true,
    preparationTime: 22
  },
  {
    name: "Mushroom Delight",
    description: "Fresh mushrooms with herbs and garlic",
    price: {
      small: 359,
      medium: 459,
      large: 559
    },
    ingredients: ["White sauce", "Mozzarella cheese", "Fresh mushrooms", "Garlic", "Herbs", "Truffle oil"],
    category: "vegetarian",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&auto=format&q=80",
    available: true,
    preparationTime: 18
  },
  {
    name: "Spicy Italian",
    description: "Hot salami, jalapeños, and spicy sauce",
    price: {
      small: 449,
      medium: 549,
      large: 649
    },
    ingredients: ["Spicy tomato sauce", "Mozzarella cheese", "Salami", "Jalapeños", "Red chili flakes", "Italian herbs"],
    category: "non-vegetarian",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&auto=format",
    available: true,
    preparationTime: 20
  },
  {
    name: "Mediterranean",
    description: "Olives, feta cheese, and sun-dried tomatoes",
    price: {
      small: 389,
      medium: 489,
      large: 589
    },
    ingredients: ["Olive oil base", "Mozzarella cheese", "Feta cheese", "Kalamata olives", "Sun-dried tomatoes", "Fresh basil"],
    category: "vegetarian",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&auto=format",
    available: true,
    preparationTime: 19
  },
  {
    name: "Paneer Makhani",
    description: "Indian cottage cheese in rich makhani sauce",
    price: {
      small: 409,
      medium: 509,
      large: 609
    },
    ingredients: ["Makhani sauce", "Mozzarella cheese", "Paneer cubes", "Onions", "Bell peppers", "Fresh coriander"],
    category: "vegetarian",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop&auto=format&q=80",
    available: true,
    preparationTime: 21
  },
  {
    name: "Seafood Special",
    description: "Mixed seafood with garlic and herbs",
    price: {
      small: 479,
      medium: 579,
      large: 679
    },
    ingredients: ["Garlic white sauce", "Mozzarella cheese", "Prawns", "Calamari", "Fresh herbs", "Lemon zest"],
    category: "non-vegetarian",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&auto=format",
    available: true,
    preparationTime: 25
  },
  {
    name: "Farmhouse",
    description: "Fresh vegetables straight from the farm",
    price: {
      small: 369,
      medium: 469,
      large: 569
    },
    ingredients: ["Tomato sauce", "Mozzarella cheese", "Corn", "Broccoli", "Cherry tomatoes", "Red onions", "Green peppers"],
    category: "vegetarian",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&auto=format",
    available: true,
    preparationTime: 17
  },
  {
    name: "Tandoori Chicken",
    description: "Smoky tandoori chicken with Indian spices",
    price: {
      small: 439,
      medium: 539,
      large: 639
    },
    ingredients: ["Tandoori sauce", "Mozzarella cheese", "Tandoori chicken", "Red onions", "Mint leaves", "Yogurt drizzle"],
    category: "non-vegetarian",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format",
    available: true,
    preparationTime: 23
  },
  {
    name: "Pesto Veggie",
    description: "Fresh basil pesto with seasonal vegetables",
    price: {
      small: 379,
      medium: 479,
      large: 579
    },
    ingredients: ["Basil pesto", "Mozzarella cheese", "Zucchini", "Cherry tomatoes", "Pine nuts", "Parmesan"],
    category: "vegetarian",
    image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=400&h=300&fit=crop&auto=format",
    available: true,
    preparationTime: 18
  },
  {
    name: "Butter Chicken Pizza",
    description: "Creamy butter chicken on pizza base",
    price: {
      small: 459,
      medium: 559,
      large: 659
    },
    ingredients: ["Butter chicken sauce", "Mozzarella cheese", "Chicken pieces", "Onions", "Fresh cilantro", "Cream drizzle"],
    category: "non-vegetarian",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop&auto=format",
    available: true,
    preparationTime: 24
  }
];

const sampleAdmin = {
  username: "admin",
  email: "admin@pizzapalace.com",
  password: "admin123",
  permissions: ["manage_orders", "manage_menu", "manage_users", "view_analytics"]
};

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await PizzaBase.deleteMany({});
    await Admin.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample pizzas
    await PizzaBase.insertMany(samplePizzas);
    console.log('Sample pizzas inserted');

    // Insert sample admin
    await Admin.create(sampleAdmin);
    console.log('Sample admin created');

    console.log('Database seeded successfully!');
    console.log('Admin credentials: admin@pizzapalace.com / admin123');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seed function
seedDatabase();