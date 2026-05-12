// // require('dotenv').config(); 
// // const express = require('express');
// // const cors = require("cors");
// // const mongoose = require('mongoose');
// // const reportRoutes = require("./routes/reports");

// // const app = express();

// // // 1. MIDDLEWARE
// // app.use(cors({
// //   origin: "http://localhost:5173", 
// //   allowedHeaders: ["Content-Type", "Authorization"]
// // }));
// // app.use(express.json());

// // // 2. ROUTES 

// // // Auth: Handles /api/auth/register and /api/auth/login
// // app.use("/api/auth", require("./routes/auth"));

// // // User & Profile: Handles /api/user/profile, /api/user/all, etc.
// // app.use("/api/user", require("./routes/user"));

// // // Features
// // app.use("/api/food-log", require("./routes/foodRoutes"));
// // app.use("/api/activity-logs", require("./routes/activityRoutes"));
// // app.use("/api/reports", reportRoutes);

// // // 3. DATABASE CONNECTION
// // const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fitness";

// // mongoose.connect(dbURI)
// //   .then(() => console.log("✅ MongoDB Connected Successfully")) 
// //   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // // 4. CATCH-ALL 404
// // app.use((req, res) => {
// //     console.log(`🚫 404 - Not Found: ${req.method} ${req.originalUrl}`);
// //     res.status(404).json({ message: `Route ${req.originalUrl} not found` });
// // });

// // // 5. SERVER START
// // const PORT = 5000;
// // app.listen(PORT, () => {
// //     console.log(`🚀 Server is live on http://localhost:${PORT}`);
// // });

// // require('dotenv').config(); 
// // const express = require('express');
// // const cors = require("cors");
// // const mongoose = require('mongoose');

// // const app = express();

// // // 1. MIDDLEWARE
// // app.use(cors({
// //   origin: "http://localhost:5173", // Matching your Vite frontend port
// //   allowedHeaders: ["Content-Type", "Authorization"]
// // }));
// // app.use(express.json());

// // // Request Logger (Helpful for debugging chart data)
// // app.use((req, res, next) => {
// //   console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
// //   next();
// // });

// // // 2. ROUTES 
// // // Auth: Handles /api/auth/register and /api/auth/login
// // app.use("/api/auth", require("./routes/auth"));

// // // User & Profile: Handles /api/user/profile, /api/user/all, etc.
// // app.use("/api/user", require("./routes/user"));
// // app.use('/api/profile', require('./routes/profile'));

// // // Features
// // app.use("/api/food-log", foodLogRoutes); // Routes first
// // app.use((req, res) => res.status(404).json({ message: "Route not found" })); // 404 handler last
// // app.use("/api/activity-logs", require("./routes/activityRoutes"));

// // // Reports: The main engine for your charts
// // app.use("/api/reports", require("./routes/reports"));

// // // 3. DATABASE CONNECTION
// // const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fitness";

// // mongoose.connect(dbURI)
// //   .then(() => console.log("✅ MongoDB Connected Successfully")) 
// //   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // // 4. CATCH-ALL 404
// // app.use((req, res) => {
// //     console.log(`🚫 404 - Not Found: ${req.method} ${req.originalUrl}`);
// //     res.status(404).json({ message: `Route ${req.originalUrl} not found` });
// // });

// // // 5. SERVER START
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //     console.log(`🚀 Server is live on http://localhost:${PORT}`);
// // });
// require('dotenv').config(); 
// const express = require('express');
// const cors = require("cors");
// const mongoose = require('mongoose');
// const adminRoutes = require("./routes/adminRoutes");

// const app = express();

// // 1. MIDDLEWARE
// app.use(cors({
//   origin: "http://localhost:5173",
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));
// app.use(express.json());

// // Request Logger
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
//   next();
// });

// // 2. ROUTES 
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/user", require("./routes/user"));
// app.use('/api/profile', require('./routes/profile'));


// // FIXED: Defined the route correctly and moved it ABOVE the 404 handler
// app.use("/api/food-log", require("./routes/foodRoutes")); // Ensure this filename matches your file
// app.use("/api/activity-logs", require("./routes/activityRoutes"));
// app.use("/api/reports", require("./routes/reports"));

// app.use("/api/admin", adminRoutes); 

// // 3. DATABASE CONNECTION
// const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fitness";
// mongoose.connect(dbURI)
//   .then(() => console.log("✅ MongoDB Connected")) 
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // 4. CATCH-ALL 404 (Moved to the VERY bottom)
// app.use((req, res) => {
//     console.log(`🚫 404 - Not Found: ${req.method} ${req.originalUrl}`);
//     res.status(404).json({ message: `Route ${req.originalUrl} not found` });
// });

// // 5. SERVER START
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
// });


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