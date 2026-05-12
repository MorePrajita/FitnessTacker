// // // // // const express = require("express");
// // // // // const router = express.Router();
// // // // // const User = require("../models/User");
// // // // // const FoodLog = require("../models/FoodLog");
// // // // // const userCount = await User.countDocuments({});
// // // // // router.get("/dashboard-stats", async (req, res) => {
// // // // //   try {
// // // // //     const userCount = await User.countDocuments({ isAdmin: false });
// // // // //     const logCount = await FoodLog.countDocuments();
    
// // // // //     // Join User with Profile to get Goal distribution
// // // // // router.get("/dashboard-stats", async (req, res) => {
// // // // //   try {
// // // // //     const userCount = await User.countDocuments({});
// // // // //     const logCount = await FoodLog.countDocuments({});
    
// // // // //     const goalStats = await User.aggregate([
// // // // //       {
// // // // //         $lookup: {
// // // // //           from: "profiles", // double check this collection name in MongoDB Compass
// // // // //           localField: "_id",
// // // // //           foreignField: "userId",
// // // // //           as: "userProfile"
// // // // //         }
// // // // //       },
// // // // //       // If a user hasn't completed onboarding, they won't have a profile.
// // // // //       // We only want to count users who actually have a goal set.
// // // // //       { $unwind: "$userProfile" }, 
// // // // //       { 
// // // // //         $group: { 
// // // // //           _id: "$userProfile.goal", 
// // // // //           count: { $sum: 1 } 
// // // // //         } 
// // // // //       }
// // // // //     ]);

// // // // //     res.json({ userCount, logCount, goalStats });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ error: err.message });
// // // // //   }
// // // // // });

// // // // // const goalStats = await User.aggregate([
// // // // //   { $match: { isAdmin: false } },
// // // // //   {
// // // // //     $lookup: {
// // // // //       from: "profiles", // <--- CHECK THIS: Is it "profiles", "onboardings", or "userdetails"?
// // // // //       localField: "_id",
// // // // //       foreignField: "userId",
// // // // //       as: "profile"
// // // // //     }
// // // // //   },
// // // // //   { $unwind: "$profile" },
// // // // //   { $group: { _id: "$profile.goal", count: { $sum: 1 } } }
// // // // // ]);

// // // // // router.get("/users", async (req, res) => {
// // // // //   try {
// // // // //     const usersWithProfiles = await User.aggregate([
// // // // //       {
// // // // //         $lookup: {
// // // // //           from: "profiles", 
// // // // //           localField: "_id",
// // // // //           foreignField: "userId",
// // // // //           as: "physicalData"
// // // // //         }
// // // // //       },
// // // // //       {
// // // // //         $unwind: {
// // // // //           path: "$physicalData",
// // // // //           preserveNullAndEmptyArrays: true 
// // // // //         }
// // // // //       }
// // // // //     ]);
// // // // //     res.json(usersWithProfiles);
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ error: err.message });
// // // // //   }
// // // // // });

// // // // // module.exports = router;
// // // // const express = require("express");
// // // // const router = express.Router();
// // // // const User = require("../models/User");
// // // // const FoodLog = require("../models/FoodLog");
// // // // const Activity = require("../models/ActivityLog");


// // // // // --- 1. DASHBOARD STATS ROUTE ---
// // // // router.get("/dashboard-stats", async (req, res) => {
// // // //   try {
// // // //     // We fetch counts inside the async function
// // // //     const userCount = await User.countDocuments({}); 
// // // //     const logCount = await FoodLog.countDocuments({});
    
// // // //     const goalStats = await User.aggregate([
// // // //       {
// // // //         $lookup: {
// // // //           from: "profiles", // Ensure this matches your MongoDB collection name
// // // //           localField: "_id",
// // // //           foreignField: "userId",
// // // //           as: "userProfile"
// // // //         }
// // // //       },
// // // //       // We unwind to access the goal, but keep users who haven't finished onboarding
// // // //       { $unwind: { path: "$userProfile", preserveNullAndEmptyArrays: false } }, 
// // // //       { 
// // // //         $group: { 
// // // //           _id: "$userProfile.goal", 
// // // //           count: { $sum: 1 } 
// // // //         } 
// // // //       }
// // // //     ]);

// // // //     res.json({ userCount, logCount, goalStats });
// // // //   } catch (err) {
// // // //     console.error("Dashboard Stats Error:", err);
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // });

// // // // // --- 2. USER MANAGEMENT ROUTE ---
// // // // router.get("/users", async (req, res) => {
// // // //   try {
// // // //     const users = await User.aggregate([
// // // //       {
// // // //         $lookup: {
// // // //           from: "profiles", // Verify this name in MongoDB Compass!
// // // //           localField: "_id",
// // // //           foreignField: "userId",
// // // //           as: "physicalData"
// // // //         }
// // // //       },
// // // //       {
// // // //         $addFields: {
// // // //           // If profile exists, take the first element, otherwise null
// // // //           physicalData: { $arrayElemAt: ["$physicalData", 0] }
// // // //         }
// // // //       }
// // // //     ]);
// // // //     res.json(users);
// // // //   } catch (err) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // });
// // // // router.get("/test-debug", async (req, res) => {
// // // //   try {
// // // //     const rawUsers = await User.find({});
// // // //     const count = await User.countDocuments({});
// // // //     res.json({
// // // //       message: "Checking database...",
// // // //       countFromMongoose: count,
// // // //       firstUserFound: rawUsers[0] || "No users found in this collection",
// // // //       dbName: User.db.name,
// // // //       collectionName: User.collection.name
// // // //     });
// // // //   } catch (err) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // });
// // // // // --- 3. GLOBAL FOOD LOGS ROUTE ---
// // // // router.get("/food-logs", async (req, res) => {
// // // //   try {
// // // //     // This fetches all food logs and "populates" the user field 
// // // //     // so you can see WHO logged the food.
// // // //     const logs = await FoodLog.find({})
// // // //       .populate("userId", "name email username") // Optional: pulls user details into the log
// // // //       .sort({ createdAt: -1 }); // Newest first

// // // //     res.json(logs);
// // // //   } catch (err) {
// // // //     console.error("Food Log Fetch Error:", err);
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // });
// // // // // --- 4. GLOBAL ACTIVITY LOGS ROUTE ---
// // // // router.get("/activity-logs", async (req, res) => {
// // // //   try {
// // // //     // Try this first to see if data appears
// // // //     const activities = await Activity.find({}).sort({ createdAt: -1 });
    
// // // //     // Once you see data, you can add .populate("userId") back 
// // // //     // but ensure the 'ref' in the model matches the User model name.
    
// // // //     res.json(activities);
// // // //   } catch (err) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // });
// // // // router.get("/users-status", async (req, res) => {
// // // //   try {
// // // //     const today = new Date().toISOString().split('T')[0];

// // // //     const userStatus = await User.aggregate([
// // // //       // 1. Prepare both ID formats to ensure a match
// // // //       {
// // // //         $addFields: {
// // // //           stringId: { $toString: "$_id" }
// // // //         }
// // // //       },
// // // //       // 2. Join with your new collection
// // // //       {
// // // //         $lookup: {
// // // //           from: "userreports", // The name of the collection you just created
// // // //           let: { user_id: "$_id", user_str: "$stringId" },
// // // //           pipeline: [
// // // //             {
// // // //               $match: {
// // // //                 $expr: {
// // // //                   $or: [
// // // //                     { $eq: ["$userId", "$$user_id"] }, // Try matching as ObjectId
// // // //                     { $eq: ["$userId", "$$user_str"] }  // Try matching as String
// // // //                   ]
// // // //                 }
// // // //               }
// // // //             }
// // // //           ],
// // // //           as: "reportData"
// // // //         }
// // // //       },
// // // //       { $unwind: { path: "$reportData", preserveNullAndEmptyArrays: true } },
// // // //       // 3. Map the fields (using $ifNull to catch N/A)
// // // //       {
// // // //         $project: {
// // // //           username: 1,
// // // //           email: 1,
// // // //           createdAt: 1,
// // // //           goal: { $ifNull: ["$reportData.Goal", "$reportData.goal", "No Goal"] },
// // // //           startDate: { $ifNull: ["$reportData.StartDate", "$reportData.startDate", "N/A"] },
// // // //           estimatedEndDate: { $ifNull: ["$reportData.EstimatedEndDate", "$reportData.estimatedEndDate", "N/A"] },
// // // //           status: {
// // // //             $cond: {
// // // //               if: { 
// // // //                 $and: [
// // // //                   { $ifNull: ["$reportData.EstimatedEndDate", false] },
// // // //                   { $gt: ["$reportData.EstimatedEndDate", today] }
// // // //                 ]
// // // //               },
// // // //               then: "Active",
// // // //               else: "Inactive"
// // // //             }
// // // //           }
// // // //         }
// // // //       }
// // // //     ]);

// // // //     res.json(userStatus);
// // // //   } catch (err) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // });

// // // // // Example Express Backend Route
// // // // // Example Express Backend Route
// // // // // Ensure isAdmin is defined or imported before this line
// // // // router.delete('/users/:id', isAdmin, async (req, res) => {
// // // //   try {
// // // //     const userId = req.params.id;
// // // //     // Perform the deletion
// // // //     await User.findByIdAndDelete(userId);
    
// // // //     res.status(200).json({ message: "User deleted successfully" });
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: "Server error during deletion" });
// // // //   }
// // // // });
// // // // module.exports = router;
// // // const express = require("express");
// // // const router = express.Router();
// // // const User = require("../models/User");
// // // const FoodLog = require("../models/FoodLog");
// // // const Activity = require("../models/ActivityLog");

// // // // --- MIDDLEWARE: Define isAdmin logic ---
// // // // If you have a separate auth file, import 'protect' and use it before isAdmin
// // // const isAdmin = async (req, res, next) => {
// // //    console.log("Development Bypass: Allowing Delete Request");
// // //     next();
// // //     try {
// // //         // In a real app, you'd get the user ID from the JWT (req.user.id)
// // //         // For now, we assume you have a 'protect' middleware running before this 
// // //         // that attaches the user to the request.
// // //         if (req.user && req.user.isAdmin) {
// // //             next();
// // //         } else {
// // //             return res.status(403).json({ message: "Access denied. Admins only." });
// // //         }
// // //     } catch (error) {
// // //         res.status(500).json({ message: "Internal Server Error" });
// // //     }
   
// // //     console.warn("Security Bypass: isAdmin check skipped for testing.");
// // //     next();
// // // };

// // // const protect = require("../middleware/adminAuth"); // Adjust the path as needed

// // // // NOTE: If you use JWT tokens, make sure to add your 'protect' middleware here too:
// // // // Example: router.delete('/users/:id', protect, isAdmin, async (req, res) => { ... })

// // // // --- 1. DELETE USER ROUTE ---
// // // router.delete('/users/:id', protect, isAdmin, async (req, res) => {
// // //     try {
// // //         const userId = req.params.id;

// // //         // 1. Check if user exists
// // //         const user = await User.findById(userId);
// // //         if (!user) {
// // //             return res.status(404).json({ message: "User not found" });
// // //         }

// // //         // 2. Prevent Admin from deleting themselves (Safety check)
// // //         // if (userId === req.user._id.toString()) {
// // //         //     return res.status(400).json({ message: "You cannot delete your own admin account." });
// // //         // }

// // //         // 3. Perform the deletion
// // //         await User.findByIdAndDelete(userId);

// // //         // 4. (Optional) Cleanup related data
// // //         // await FoodLog.deleteMany({ userId: userId });
// // //         // await Activity.deleteMany({ userId: userId });

// // //         res.status(200).json({ message: "User deleted successfully" });
// // //     } catch (error) {
// // //         console.error("Delete Error:", error);
// // //         res.status(500).json({ message: "Server error during deletion" });
// // //     }
// // // });

// // // // --- 2. DASHBOARD STATS ROUTE ---
// // // router.get("/dashboard-stats", async (req, res) => {
// // //     try {
// // //         const userCount = await User.countDocuments({});
// // //         const logCount = await FoodLog.countDocuments({});

// // //         const goalStats = await User.aggregate([
// // //             {
// // //                 $lookup: {
// // //                     from: "profiles",
// // //                     localField: "_id",
// // //                     foreignField: "userId",
// // //                     as: "userProfile"
// // //                 }
// // //             },
// // //             { $unwind: { path: "$userProfile", preserveNullAndEmptyArrays: false } },
// // //             {
// // //                 $group: {
// // //                     _id: "$userProfile.goal",
// // //                     count: { $sum: 1 }
// // //                 }
// // //             }
// // //         ]);

// // //         res.json({ userCount, logCount, goalStats });
// // //     } catch (err) {
// // //         console.error("Dashboard Stats Error:", err);
// // //         res.status(500).json({ error: err.message });
// // //     }
// // // });

// // // // --- 3. USER MANAGEMENT ROUTE ---
// // // router.get("/users", async (req, res) => {
// // //     try {
// // //         const users = await User.aggregate([
// // //             {
// // //                 $lookup: {
// // //                     from: "profiles",
// // //                     localField: "_id",
// // //                     foreignField: "userId",
// // //                     as: "physicalData"
// // //                 }
// // //             },
// // //             {
// // //                 $addFields: {
// // //                     physicalData: { $arrayElemAt: ["$physicalData", 0] }
// // //                 }
// // //             }
// // //         ]);
// // //         res.json(users);
// // //     } catch (err) {
// // //         res.status(500).json({ error: err.message });
// // //     }
// // // });

// // // // ... Keep your other routes (test-debug, food-logs, activity-logs, etc.) here ...

// // // module.exports = router;

// // const express = require("express");
// // const router = express.Router();
// // const User = require("../models/User");
// // const FoodLog = require("../models/FoodLog");
// // const Activity = require("../models/ActivityLog");
// // const protect = require("../middleware/adminAuth"); // Ensure this file exists and exports a function

// // // --- 1. FIXED MIDDLEWARE ---
// // const isAdmin = (req, res, next) => {
// //     // Check if user exists (attached by 'protect' middleware) and is an admin
// //     if (req.user && req.user.isAdmin) {
// //         next(); // User is admin, proceed to the route handler
// //     } else {
// //         return res.status(403).json({ message: "Access denied. Admins only." });
// //     }
// // };

// // // --- 2. DELETE USER ROUTE ---
// // // Ensure 'protect' and 'isAdmin' are both valid functions
// // // router.delete('/users/:id', protect, isAdmin, async (req, res) => {
// // //     try {
// // //         const userId = req.params.id;

// // //         // 1. Check if user exists
// // //         const user = await User.findById(userId);
// // //         if (!user) {
// // //             return res.status(404).json({ message: "User not found" });
// // //         }

// // //         // 2. Safety: Prevent admin from deleting themselves
// // //         if (req.user && userId === req.user._id.toString()) {
// // //             return res.status(400).json({ message: "You cannot delete your own admin account." });
// // //         }

// // //         // 3. Perform the deletion
// // //         await User.findByIdAndDelete(userId);

// // //         // 4. Cleanup (Optional but recommended)
// // //         await FoodLog.deleteMany({ userId: userId });
// // //         await Activity.deleteMany({ userId: userId });

// // //         res.status(200).json({ message: "User deleted successfully" });
// // //     } catch (error) {
// // //         console.error("Delete Error:", error);
// // //         res.status(500).json({ message: "Server error during deletion" });
// // //     }
// // // });

// // // --- 3. DASHBOARD STATS ROUTE ---
// // router.get("/dashboard-stats", protect, isAdmin, async (req, res) => {
// //     try {
// //         const userCount = await User.countDocuments({});
// //         const logCount = await FoodLog.countDocuments({});

// //         const goalStats = await User.aggregate([
// //             {
// //                 $lookup: {
// //                     from: "profiles",
// //                     localField: "_id",
// //                     foreignField: "userId",
// //                     as: "userProfile"
// //                 }
// //             },
// //             { $unwind: { path: "$userProfile", preserveNullAndEmptyArrays: false } },
// //             {
// //                 $group: {
// //                     _id: "$userProfile.goal",
// //                     count: { $sum: 1 }
// //                 }
// //             }
// //         ]);

// //         res.json({ userCount, logCount, goalStats });
// //     } catch (err) {
// //         console.error("Dashboard Stats Error:", err);
// //         res.status(500).json({ error: err.message });
// //     }
// // });

// // // --- 4. USER MANAGEMENT ROUTE ---
// // router.get("/users", protect, isAdmin, async (req, res) => {
// //     try {
// //         const users = await User.aggregate([
// //             {
// //                 $lookup: {
// //                     from: "profiles",
// //                     localField: "_id",
// //                     foreignField: "userId",
// //                     as: "physicalData"
// //                 }
// //             },
// //             {
// //                 $addFields: {
// //                     physicalData: { $arrayElemAt: ["$physicalData", 0] }
// //                 }
// //             }
// //         ]);
// //         res.json(users);
// //     } catch (err) {
// //         res.status(500).json({ error: err.message });
// //     }
// // });

// // // --- 5. GLOBAL FOOD LOGS ---
// // router.get("/food-logs", protect, isAdmin, async (req, res) => {
// //     try {
// //         const logs = await FoodLog.find({})
// //             .populate("userId", "name email")
// //             .sort({ createdAt: -1 });
// //         res.json(logs);
// //     } catch (err) {
// //         res.status(500).json({ error: err.message });
// //     }
// // });

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const FoodLog = require("../models/FoodLog");
// const Activity = require("../models/ActivityLog");

// // --- 1. SAFE MIDDLEWARE IMPORT ---
// const adminAuth = require("../middleware/adminAuth");
// // This check handles both 'module.exports = function' AND 'module.exports = { protect }'
// const protect = typeof adminAuth === 'function' ? adminAuth : (adminAuth.protect || ((req, res, next) => next()));

// const isAdmin = (req, res, next) => {
//     // If protect middleware is working, it attaches user to req.user
//     if (req.user && req.user.isAdmin) {
//         next();
//     } else {
//         // For development: if you aren't logged in as admin yet, 
//         // you can change this to next() to bypass security and test.
//         return res.status(403).json({ message: "Access denied. Admins only." });
//     }
// };

// // --- 2. DASHBOARD STATS ROUTE ---
// router.get("/dashboard-stats", protect, isAdmin, async (req, res) => {
//     try {
//         const userCount = await User.countDocuments({});
//         const logCount = await FoodLog.countDocuments({});

//         const goalStats = await User.aggregate([
//             {
//                 $lookup: {
//                     from: "profiles",
//                     localField: "_id",
//                     foreignField: "userId",
//                     as: "userProfile"
//                 }
//             },
//             { $unwind: { path: "$userProfile", preserveNullAndEmptyArrays: false } },
//             {
//                 $group: {
//                     _id: "$userProfile.goal",
//                     count: { $sum: 1 }
//                 }
//             }
//         ]);

//         res.json({ userCount, logCount, goalStats });
//     } catch (err) {
//         console.error("Dashboard Stats Error:", err);
//         res.status(500).json({ error: err.message });
//     }
// });

// // --- 3. USER MANAGEMENT ROUTE ---
// router.get("/users", protect, isAdmin, async (req, res) => {
//     try {
//         const users = await User.aggregate([
//             {
//                 $lookup: {
//                     from: "profiles",
//                     localField: "_id",
//                     foreignField: "userId",
//                     as: "physicalData"
//                 }
//             },
//             {
//                 $addFields: {
//                     physicalData: { $arrayElemAt: ["$physicalData", 0] }
//                 }
//             }
//         ]);
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // --- 4. GLOBAL FOOD LOGS ---
// router.get("/food-logs", protect, isAdmin, async (req, res) => {
//     try {
//         const logs = await FoodLog.find({})
//             .populate("userId", "name email")
//             .sort({ createdAt: -1 });
//         res.json(logs);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // --- 5. DELETE USER ROUTE (Uncommented and Fixed) ---
// router.delete('/users/:id', protect, isAdmin, async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const user = await User.findById(userId);
        
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         await User.findByIdAndDelete(userId);
//         // Optional: clean up logs
//         await FoodLog.deleteMany({ userId: userId });
        
//         res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Server error during deletion" });
//     }
// });

// module.exports = router;

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