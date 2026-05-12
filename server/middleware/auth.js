const jwt = require("jsonwebtoken");

/**
 * Authentication Middleware
 * Verifies the JWT token from the Authorization header
 */
const auth = (req, res, next) => {
  // 1. Get header (handling both cases for safety)
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // 2. Check if the header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("Auth Failed: No Bearer token provided");
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // 3. Extract the token
  const token = authHeader.split(" ")[1];

  try {
    // 4. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecret");

    /**
     * 5. ATTACH DATA
     * IMPORTANT: We ensure req.user.id is set regardless of whether the 
     * token payload used 'id' or 'userId'.
     */
    req.user = {
      id: decoded.userId || decoded.id || decoded.sub,
      role: decoded.role || 'user'
    };
    
    // For backward compatibility with your other routes:
    req.userId = req.user.id;
    req.userRole = req.user.role;

    // Safety check: if no ID was found in the token at all
    if (!req.user.id) {
      throw new Error("Token payload missing user identification");
    }

    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    
    // Distinguish between expired tokens and just plain bad ones
    const message = err.name === "TokenExpiredError" 
      ? "Session expired, please login again" 
      : "Token is not valid";
      
    res.status(401).json({ message });
  }
};

module.exports = auth