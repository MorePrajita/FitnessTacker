const express = require("express");
const router = express.Router();

const User = require("../models/User");
const FoodLog = require("../models/FoodLog");
const ActivityLog = require("../models/ActivityLog");

const protect = require("../middleware/adminAuth");


// =====================================
// ADMIN CHECK MIDDLEWARE
// =====================================
const isAdmin = (req, res, next) => {

  console.log("========== ADMIN CHECK ==========");
  console.log("REQ.USER:", req.user);
  console.log("IS ADMIN:", req.user?.isAdmin);

  try {

    if (req.user && req.user.isAdmin === true) {

      console.log("✅ ADMIN ACCESS GRANTED");

      return next();
    }

    console.log("❌ ADMIN ACCESS DENIED");

    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only.",
    });

  } catch (err) {

    console.log("ADMIN ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// =====================================
// DASHBOARD STATS
// =====================================
router.get(
  "/dashboard-stats",
  protect,
  isAdmin,
  async (req, res) => {
    try {

      const userCount = await User.countDocuments({});

      const foodLogCount = await FoodLog.countDocuments({});

      const activityCount = await ActivityLog.countDocuments({});


      // Goal Analytics
      const goalStats = await User.aggregate([
        {
          $lookup: {
            from: "profiles",
            localField: "_id",
            foreignField: "userId",
            as: "userProfile",
          },
        },

        {
          $unwind: {
            path: "$userProfile",
            preserveNullAndEmptyArrays: false,
          },
        },

        {
          $group: {
            _id: "$userProfile.goal",
            count: { $sum: 1 },
          },
        },
      ]);


      res.status(200).json({
        success: true,
        stats: {
          userCount,
          foodLogCount,
          activityCount,
          goalStats,
        },
      });

    } catch (err) {
      console.error("DASHBOARD STATS ERROR:", err);

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
);


// =====================================
// GET ALL USERS
// =====================================
router.get(
  "/users",
  protect,
  isAdmin,
  async (req, res) => {
    try {

      const users = await User.aggregate([
        {
          $lookup: {
            from: "profiles",
            localField: "_id",
            foreignField: "userId",
            as: "physicalData",
          },
        },

        {
          $addFields: {
            physicalData: {
              $arrayElemAt: ["$physicalData", 0],
            },
          },
        },
      ]);


      res.status(200).json({
        success: true,
        users,
      });

    } catch (err) {
      console.error("GET USERS ERROR:", err);

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
);


// =====================================
// GET ALL FOOD LOGS
// =====================================
router.get(
  "/food-logs",
  protect,
  isAdmin,
  async (req, res) => {
    try {

      const logs = await FoodLog.find({})
        .populate("userId", "name email")
        .sort({ createdAt: -1 });


      res.status(200).json({
        success: true,
        logs,
      });

    } catch (err) {
      console.error("GET FOOD LOGS ERROR:", err);

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
);


// =====================================
// GET ALL ACTIVITY LOGS
// =====================================
router.get(
  "/activity-logs",
  protect,
  isAdmin,
  async (req, res) => {
    try {

      const logs = await ActivityLog.find({})
        .populate("userId", "name email")
        .sort({ createdAt: -1 });


      res.status(200).json({
        success: true,
        logs,
      });

    } catch (err) {
      console.error("GET ACTIVITY LOGS ERROR:", err);

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
);


// =====================================
// DELETE USER
// =====================================
router.delete(
  "/users/:id",
  protect,
  isAdmin,
  async (req, res) => {
    try {

      const userId = req.params.id;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }


      // Delete user
      await User.findByIdAndDelete(userId);

      // Delete related food logs
      await FoodLog.deleteMany({
        userId: userId,
      });

      // Delete related activity logs
      await ActivityLog.deleteMany({
        userId: userId,
      });


      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });

    } catch (err) {
      console.error("DELETE USER ERROR:", err);

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
);

module.exports = router;
