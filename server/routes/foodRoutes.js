const express = require("express");
const router = express.Router();

const FoodLog = require("../models/FoodLog");
const auth = require("../middleware/auth");

// Helper for local date
const getLocalToday = () => {
  const date = new Date();

  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];
};



// ==============================
// GET ALL FOOD LOGS
// ==============================
router.get("/", auth, async (req, res) => {
  try {
    const logs = await FoodLog.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

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
});



// ==============================
// GET FOOD LOGS BY DATE
// ==============================
router.get("/:date", auth, async (req, res) => {
  try {
    const logs = await FoodLog.find({
      userId: req.user.id,
      date: req.params.date,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      logs,
    });
  } catch (err) {
    console.error("GET FOOD BY DATE ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});



// ==============================
// ADD NEW FOOD LOG
// ==============================
router.post("/", auth, async (req, res) => {
  try {
    const { name, calories, mealType } = req.body;

    if (!name || !calories || !mealType) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    const newFoodEntry = new FoodLog({
      userId: req.user.id,
      name,
      calories: Number(calories),
      mealType,
      date: getLocalToday(),
    });

    await newFoodEntry.save();

    res.status(201).json({
      success: true,
      log: newFoodEntry,
    });
  } catch (err) {
    console.error("POST FOOD ERROR:", err);

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});



// ==============================
// DELETE FOOD LOG
// ==============================
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedEntry = await FoodLog.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedEntry) {
      return res.status(404).json({
        success: false,
        message: "Food log not found",
      });
    }

    res.json({
      success: true,
      message: "Food log deleted",
    });
  } catch (err) {
    console.error("DELETE FOOD ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;
