const mongoose = require("mongoose"); // Corrected spelling

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {}); // Using correct mongoose reference
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = ConnectDB;
