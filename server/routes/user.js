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
