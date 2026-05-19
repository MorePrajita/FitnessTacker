const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose"); // Added requirement
const User = require("../models/User");

const SECRET = process.env.JWT_SECRET || "supersecret";

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: userEmail });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: userEmail,
      password: hashedPassword,
      role: "user"
    });

    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET, { expiresIn: "7d" });

    // New users definitely don't have a profile yet
    res.status(201).json({ 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        onboardingCompleted: false 
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
  { 
    id: user._id, 
    isAdmin: user.isAdmin, // 👈 MUST INCLUDE THIS
    role: user.isAdmin ? 'admin' : 'user' 
  }, 
  process.env.JWT_SECRET, 
  { expiresIn: '1d' }
);
    // ✅ CHECK IF PROFILE EXISTS
    const profile = await mongoose.connection.db
      .collection("profiles")
      .findOne({ userId: user._id });

    res.json({ 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        onboardingCompleted: !!profile // true if exists
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
