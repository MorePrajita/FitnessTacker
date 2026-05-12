// // const express = require("express");
// // const router = express.Router();
// // const ActivityLog = require("../models/ActivityLog");
// // const auth = require("../middleware/auth");

// // // @route   GET /api/activity-logs/:date
// // // @desc    Fetch activities for a specific day
// // router.get("/:date", auth, async (req, res) => {
// //   try {
// //     const logs = await ActivityLog.find({ 
// //       userId: req.userId, 
// //       date: req.params.date // This catches the '2026-04-29' from the URL
// //     });
// //     res.json(logs);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // @route   POST /api/activity-logs
// // router.post("/", auth, async (req, res) => {
// //   try {
// //     const { name, duration, caloriesBurned, date } = req.body;

// //     const newLog = new ActivityLog({
// //       userId: req.userId,
// //       name,
// //       duration: Number(duration),
// //       caloriesBurned: Number(caloriesBurned),
// //       date: date || new Date().toISOString().split('T')[0]
// //     });

// //     const savedLog = await newLog.save();
// //     res.status(201).json(savedLog);
// //   } catch (err) {
// //     console.error("Activity Save Error:", err.message);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // @route   DELETE /api/activity-logs/:id
// // router.delete("/:id", auth, async (req, res) => {
// //   try {
// //     await ActivityLog.findOneAndDelete({ _id: req.params.id, userId: req.userId });
// //     res.json({ message: "Activity deleted" });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // module.exports = router;const express = require("express");
// const express = require("express"); // <--- THIS MUST BE AT THE TOP
// const router = express.Router()
// const ActivityLog = require("../models/ActivityLog");
// const auth = require("../middleware/auth");

// // GET Activities for a specific date
// router.get("/:date", auth, async (req, res) => {
//   try {
//     const logs = await ActivityLog.find({ 
//       userId: req.user.id, 
//       date: req.params.date 
//     });
//     res.json(logs); // Returns [] if no data, which prevents the 404
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // POST New Activity
// router.post("/", auth, async (req, res) => {
//   try {
// const { name, duration, caloriesBurned, date } = req.body;

// if (!name || !duration || !caloriesBurned) {
//   return res.status(400).json({ error: 'Missing required activity fields' });
// }
// const newActivity = new ActivityLog({
//   userId: req.user.id,
//   name: req.body.name,
//   duration: req.body.duration,
//   caloriesBurned: req.body.caloriesBurned, // Ensure this matches req.body
//   date: req.body.date
// });

//     await newActivity.save();
//     res.status(201).json(newActivity);
//   } catch (err) {
//     console.error("Activity Log Error:", err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // DELETE Activity
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const deletedActivity = await ActivityLog.findOneAndDelete({ 
//       _id: req.params.id, 
//       userId: req.user.id 
//     });
//     if (!deletedActivity) return res.status(404).json({ message: "Not found" });
//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

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