const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Prometheus Metrics Setup
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

// Basic Route
app.get('/', (req, res) => {
  res.send('E-commerce API is running...');
});

// Mock Products Data (To be replaced with real DB later if needed)
const mockProducts = [
  {
    _id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    description: 'High-quality wireless headphones with active noise cancellation.',
    brand: 'AudioTech',
    category: 'Electronics',
    price: 299.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    _id: '2',
    name: 'Smart Watch Series 8',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80',
    description: 'Latest smartwatch with fitness tracking and health monitoring.',
    brand: 'TechGadget',
    category: 'Electronics',
    price: 399.99,
    countInStock: 7,
    rating: 4.8,
    numReviews: 8,
  },
  {
    _id: '3',
    name: 'Minimalist Leather Backpack',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    description: 'Stylish and durable leather backpack for everyday use.',
    brand: 'UrbanStyle',
    category: 'Fashion',
    price: 120.00,
    countInStock: 5,
    rating: 4.3,
    numReviews: 15,
  },
  {
    _id: '4',
    name: 'Mechanical Gaming Keyboard',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80',
    description: 'RGB mechanical keyboard with tactile switches.',
    brand: 'GamePro',
    category: 'Electronics',
    price: 149.99,
    countInStock: 15,
    rating: 4.6,
    numReviews: 24,
  },
  {
    _id: '5',
    name: 'Ceramic Coffee Mug set',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80',
    description: 'Set of two handmade ceramic coffee mugs.',
    brand: 'HomeGoods',
    category: 'Home',
    price: 35.00,
    countInStock: 20,
    rating: 4.9,
    numReviews: 30,
  },
  {
    _id: '6',
    name: '4K Action Camera',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80',
    description: 'Waterproof 4k action camera with accessories.',
    brand: 'CamX',
    category: 'Electronics',
    price: 199.99,
    countInStock: 0,
    rating: 4.2,
    numReviews: 10,
  }
];

// Mock Users Data
let mockUsers = [];

// API Routes
app.get('/api/products', (req, res) => {
  const keyword = req.query.keyword
    ? req.query.keyword.toLowerCase()
    : '';
  
  if (keyword) {
    const filteredProducts = mockProducts.filter((p) => 
      p.name.toLowerCase().includes(keyword) || 
      p.description.toLowerCase().includes(keyword)
    );
    res.json(filteredProducts);
  } else {
    res.json(mockProducts);
  }
});

app.get('/api/products/:id', (req, res) => {
  const product = mockProducts.find((p) => p._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Auth Routes
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = mockUsers.find((u) => u.email === email);

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    _id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
    isAdmin: false,
  };

  mockUsers.push(user);

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  const user = mockUsers.find((u) => u.email === email);

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb:27017/ecommerce', {
}).then(() => {
  console.log('MongoDB Connected');
}).catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
