require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// Route & DB Config Imports
const ConnectDB = require("./config/db");
const incomeRoutes = require("./routers/incomeRoutes");
const authRoutes = require("./routers/authRoutes");
const expenseRoutes = require("./routers/expensesRoutes");
const dashboardRoutes = require("./routers/dashboardRoutes");

const app = express();

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON parser middleware
app.use(express.json());

// Connect to MongoDB
ConnectDB();

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Static file serving (e.g. for images or files)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
