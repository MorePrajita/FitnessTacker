// // const adminAuth = (req, res, next) => {
// //     console.log("User in middleware:", req.user);
// //     console.log("Is Admin value:", req.user.isAdmin);
// //   if (req.user && (req.user.isAdmin === true || req.user.role === 'admin')) {
// //     next();
// //   } else {
// //     res.status(403).json({ message: "Access denied. Admins only." });
// //   }
// // };
// // module.exports = adminAuth;
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       // 1. Get token from header
//       token = req.headers.authorization.split(' ')[1];

//       // 2. Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // 3. Get user from the token (excluding password) and attach to req.user
//       req.user = await User.findById(decoded.id).select('-password');

//       next();
//     } catch (error) {
//       res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };


const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {

      // Get token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // Attach user to request
      req.user = await User.findById(decoded.id)
        .select("-password");

      next();

    } catch (error) {
      console.error("AUTH ERROR:", error);

      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};

module.exports = protect;