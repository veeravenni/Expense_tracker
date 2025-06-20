require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");


exports.protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
   console.log("Extracted token:", token); 

  if (!token)
    return res.status(401).json({ message: "Not authorized, no token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    res
      .status(401)
      .json({ message: "Not authorized, token failed", error: err.message });
  }
};
