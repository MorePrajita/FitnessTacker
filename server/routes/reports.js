const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const ActivityLog = require("../models/ActivityLog");
const FoodLog = require("../models/FoodLog");

// 1. GOAL CHART DATA
router.get("/goal", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

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
    // Get logs from the last 7 days
    const logs = await ActivityLog.find({ userId: req.user.id }).sort({ date: -1 }).limit(14);
    
    // Group by date and sum calories
    const dataMap = {};
    logs.forEach(log => {
      dataMap[log.date] = (dataMap[log.date] || 0) + log.caloriesBurned;
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
    const profile = await Profile.findOne({ userId: req.user.id });
    // Since we don't have a separate WeightHistory model yet, 
    // we return the profile weight as the current data point
    res.json({
      trend: [
        { date: "Current", weight: profile?.weight || 0, bmi: profile?.bmi || 0 }
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
    
    // Count how many entries exist per day
    const consistencyMap = {};
    logs.forEach(log => {
      const dateStr = log.createdAt.toISOString().split('T')[0];
      consistencyMap[dateStr] = (consistencyMap[dateStr] || 0) + 1;
    });

    const trend = Object.keys(consistencyMap).map(date => ({
      date,
      logs: consistencyMap[date]
    }));

    res.json({ trend });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;