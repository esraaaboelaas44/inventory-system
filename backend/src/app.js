const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require('./routes/auth.Routes');
const userRoutes = require('./routes/user.Routes');
const productRoutes = require("./routes/product.route.js");
const categoryRoutes = require('./routes/category.route.js');
const supplierRoutes = require("./routes/supplier.route");
const stockRouter  = require("./routes/stock.route.js");

// TODO (Dev 3): const orderRoutes = require('./routes/orderRoutes');

const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// Core middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Health check
app.get("/api/health", (req, res) =>
  res.status(200).json({ success: true, message: "API is running" }),
);

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/products", productRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/stocks", stockRouter);
// app.use('/api/orders', orderRoutes);

// 404 + centralized error handling (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
