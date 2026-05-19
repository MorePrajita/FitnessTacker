const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, 
  // Add these fields to match your Admin Panel requirements:
  age: { type: Number },
  weight: { type: Number },
  goal: { type: String },
  height: { type: Number }
}, { timestamps: true, collection: "users" }); // Ensure this matches your MongoDB collection name

module.exports = mongoose.model("User", userSchema);
