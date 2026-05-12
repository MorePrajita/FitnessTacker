// const express = require('express');
// const router = express.Router();
// const mongoose = require("mongoose");
// const { Parser } = require("json2csv");
// const auth = require("../middleware/auth");

// /**
//  * @route   GET /api/user/profile
//  * @desc    Get the current user's data and profile
//  */
// router.get("/profile", auth, async (req, res) => {
//     try {
//         // Find user basic info
//         const user = await mongoose.connection.db
//             .collection("users") 
//             .findOne({ _id: new mongoose.Types.ObjectId(req.user.id) });

//         if (!user) return res.status(404).json({ error: "User not found" });

//         // Find user profile info (onboarding data)
//         const profile = await mongoose.connection.db
//             .collection("profiles")
//             .findOne({ userId: req.user.id });

//         // Combine data
//         const { password, ...userData } = user;
//         res.json({ ...userData, profile: profile || null });
//     } catch (err) {
//         console.error("Profile Fetch Error:", err);
//         res.status(500).json({ error: "Server error" });
//     }
// });

// /**
//  * @route   POST /api/user/profile
//  * @desc    Save onboarding data
//  */
// router.post("/profile", auth, async (req, res) => {
//     try {
//         const { age, gender, height, weight, goal, bmi } = req.body;

//         const profileData = {
//             userId: req.user.id,
//             age: Number(age),
//             gender,
//             height: Number(height),
//             weight: Number(weight),
//             goal,
//             bmi: Number(bmi),
//             updatedAt: new Date()
//         };

//         await mongoose.connection.db
//             .collection("profiles")
//             .updateOne(
//                 { userId: req.user.id }, 
//                 { $set: profileData }, 
//                 { upsert: true }
//             );

//         res.status(201).json({ message: "Profile saved successfully!", profile: profileData });
//     } catch (err) {
//         console.error("Profile Save Error:", err);
//         res.status(500).json({ error: "Failed to save profile" });
//     }
// });

// /**
//  * @route   GET /api/user/all
//  */
// router.get("/all", auth, async (req, res) => {
//     try {
//         const users = await mongoose.connection.db
//             .collection("AdminMasterReport")
//             .find({})
//             .toArray();
//         res.json(users);
//     } catch (err) {
//         console.error("FETCH ALL ERROR:", err);
//         res.status(500).json({ error: "Failed to fetch users" });
//     }
// });

// /**
//  * @route   GET /api/user/export-admin-data
//  */
// router.get("/export-admin-data", auth, async (req, res) => {
//     try {
//         const reportData = await mongoose.connection.db
//             .collection("AdminMasterReport")
//             .find({})
//             .toArray();

//         if (!reportData || reportData.length === 0) {
//             return res.status(404).json({ error: "No data found to export" });
//         }

//         const json2csvParser = new Parser();
//         const csv = json2csvParser.parse(reportData);

//         res.header("Content-Type", "text/csv");
//         res.attachment(`Fitness_Report_${new Date().toISOString().split('T')[0]}.csv`);
//         return res.send(csv);

//     } catch (err) {
//         console.error("EXPORT ERROR:", err);
//         res.status(500).json({ error: "Failed to generate CSV" });
//     }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const ActivityLog = require("../models/ActivityLog");
const FoodLog = require("../models/FoodLog");

// HELPER: Fetch current profile or return 404
const getActiveProfile = async (userId) => {
  return await Profile.findOne({ userId });
};

// 1. GOAL CHART DATA
router.get("/goal", auth, async (req, res) => {
  try {
    const profile = await getActiveProfile(req.user.id);
    // If no profile exists, they need to finish onboarding
    if (!profile) return res.status(200).json({ trend: [], needsOnboarding: true });

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const trend = days.map((day) => ({
      date: day,
      targetCalories: profile.dailyCalorieIntake || 2000,
      targetSteps: 10000, 
    }));
    res.json({ trend });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. ACTIVITY CHART DATA (Actual Calories Burned)
router.get("/activity", auth, async (req, res) => {
  try {
    // Get logs from the last 14 entries
    const logs = await ActivityLog.find({ userId: req.user.id }).sort({ date: -1 }).limit(14);
    
    const dataMap = {};
    logs.forEach(log => {
      // Format date to YYYY-MM-DD for grouping
      const dateKey = new Date(log.date).toLocaleDateString();
      dataMap[dateKey] = (dataMap[dateKey] || 0) + log.caloriesBurned;
    });

    const trend = Object.keys(dataMap).map(date => ({
      date,
      caloriesBurned: dataMap[date]
    })).reverse();

    res.json({ trend });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. BODY/WEIGHT TREND
router.get("/body", auth, async (req, res) => {
  try {
    const profile = await getActiveProfile(req.user.id);
    if (!profile) return res.json({ trend: [] });

    res.json({
      trend: [
        { 
          date: new Date().toLocaleDateString(), 
          weight: profile.weight || 0, 
          bmi: profile.bmi || 0 
        }
      ]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. CONSISTENCY (Food Logging Frequency)
router.get("/consistency", auth, async (req, res) => {
  try {
    const logs = await FoodLog.find({ userId: req.user.id });
    
    const consistencyMap = {};
    logs.forEach(log => {
      const dateStr = log.createdAt.toISOString().split('T')[0];
      consistencyMap[dateStr] = (consistencyMap[dateStr] || 0) + 1;
    });

    const trend = Object.keys(consistencyMap).map(date => ({
      date,
      count: consistencyMap[date]
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    res.json({ trend });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;