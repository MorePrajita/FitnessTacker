// // const mongoose = require("mongoose");

// // const userSchema = new mongoose.Schema({
// //   username: String,
// //   email: String,
// //   password: String,
// // });

// // module.exports = mongoose.model("User", userSchema);
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   // ADD THIS LINE:
//   isAdmin: { type: Boolean, default: false }, 
// }, { timestamps: true });

// module.exports = mongoose.model("User", userSchema);
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