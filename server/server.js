require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const adminRoutes = require("./routes/adminRoutes");

const app = express();


// =============================
// MIDDLEWARE
// =============================

app.use(cors({
  origin: "http://localhost:5173",
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// =============================
// REQUEST LOGGER
// =============================

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});


// =============================
// ROUTES
// =============================

app.use("/api/auth", require("./routes/auth"));

app.use("/api/user", require("./routes/user"));

app.use("/api/profile", require("./routes/profile"));

app.use("/api/food-log", require("./routes/foodRoutes"));

app.use("/api/activity-logs", require("./routes/activityRoutes"));

app.use("/api/reports", require("./routes/reports"));

app.use("/api/admin", adminRoutes);


// =============================
// DATABASE CONNECTION
// =============================

const dbURI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/fitness";

mongoose.connect(dbURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));


// =============================
// 404 HANDLER
// =============================

app.use((req, res) => {
  console.log(`🚫 404 - ${req.method} ${req.originalUrl}`);

  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});


// =============================
// SERVER START
// =============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
