
const express = require("express");
const router = express.Router();

const ActivityLog = require("../models/ActivityLog");
const auth = require("../middleware/auth");



// ==============================
// GET ALL ACTIVITY LOGS
// ==============================
router.get("/", auth, async (req, res) => {
  try {
    const logs = await ActivityLog.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      logs,
    });
  } catch (err) {
    console.error("GET ACTIVITIES ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});



// ==============================
// GET ACTIVITIES BY DATE
// ==============================
router.get("/:date", auth, async (req, res) => {
  try {
    const logs = await ActivityLog.find({
      userId: req.user.id,
      date: req.params.date,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      logs,
    });
  } catch (err) {
    console.error("GET ACTIVITIES BY DATE ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});



// ==============================
// ADD ACTIVITY
// ==============================
router.post("/", auth, async (req, res) => {
  try {
    const { name, duration, caloriesBurned, date } = req.body;

    if (!name || !duration || !caloriesBurned) {
      return res.status(400).json({
        success: false,
        error: "Missing required activity fields",
      });
    }

    const newActivity = new ActivityLog({
      userId: req.user.id,
      name,
      duration: Number(duration),
      caloriesBurned: Number(caloriesBurned),
      date: date || new Date().toISOString().split("T")[0],
    });

    await newActivity.save();

    res.status(201).json({
      success: true,
      log: newActivity,
    });
  } catch (err) {
    console.error("POST ACTIVITY ERROR:", err);

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});



// ==============================
// DELETE ACTIVITY
// ==============================
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedActivity = await ActivityLog.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedActivity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    res.json({
      success: true,
      message: "Activity deleted",
    });
  } catch (err) {
    console.error("DELETE ACTIVITY ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;
