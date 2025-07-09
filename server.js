const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Swagger setup
const { swaggerUi, swaggerSpec } = require('./utils/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Mount routes with proper prefixes
app.use('/api/users', authRoutes);        // /api/users/register, /api/users/login
app.use('/api/users', userRoutes);           // e.g., /user/profile
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
 
app.use('/api/users', authRoutes); 

// Database connection and server start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
  })
  .catch(err => console.error("❌ MongoDB Connection Error:", err));
