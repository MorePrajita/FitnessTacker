
// // const express = require('express');
// // const router = express.Router();
// // const FoodLog = require("../models/FoodLog"); // Ensure your model name is correct
// // const auth = require("../middleware/auth");

// // // POST New Food Item
// // router.post("/", auth, async (req, res) => {
// //   try {
// //     const { name, calories, mealType } = req.body;

// //     // VALIDATION: Check for food fields
// //     if (!name || !calories || !mealType) {
// //       return res.status(400).json({ error: 'Missing required food fields: name, calories, and mealType' });
// //     }

// //     const newFoodEntry = new FoodLog({
// //       userId: req.user.id,
// //       name,
// //       calories,
// //       mealType,
// //       date: new Date().toISOString().split('T')[0]
// //     });

// //     await newFoodEntry.save();
// //     res.status(201).json(newFoodEntry);
// //   } catch (err) {
// //     console.error("Food Log Backend Error:", err);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // });
// // // @route   GET /api/food-log/:date
// // // @desc    Fetch food logs for a specific day
// // router.get("/:date", auth, async (req, res) => {
// //   try {
// //     const logs = await FoodLog.find({ 
// //       userId: req.user.id, 
// //       date: req.params.date 
// //     }).sort({ createdAt: -1 });

// //     res.json(logs); // Send the array (even if empty)
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // @route   DELETE /api/food-log/:id
// // router.delete("/:id", auth, async (req, res) => {
// //   try {
// //     const deletedEntry = await FoodLog.findOneAndDelete({ 
// //       _id: req.params.id, 
// //       userId: req.userId 
// //     });

// //     if (!deletedEntry) {
// //       return res.status(404).json({ message: "Entry not found or unauthorized" });
// //     }

// //     res.json({ message: "Entry deleted successfully" });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // Add GET and DELETE routes for food here as well...

// // // module.exports = router;

// // const express = require('express');
// // const router = express.Router();
// // const FoodLog = require("../models/FoodLog");
// // const auth = require("../middleware/auth");

// // // 1. GET ALL LOGS
// // router.get("/", auth, async (req, res) => {
// //   try {
// //     const logs = await FoodLog.find({ userId: req.user.id }).sort({ createdAt: -1 });
// //     res.json(logs);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // 2. GET LOGS BY DATE (Fixes your Dashboard)
// // router.get("/:date", auth, async (req, res) => {
// //   console.log("--- Dashboard Fetching Data ---");
// //   console.log("Date requested by Frontend:", req.params.date);
// //   console.log("User ID:", req.user.id);

// //   try {
// //     const logs = await FoodLog.find({ 
// //       userId: req.user.id, 
// //       date: req.params.date 
// //     });
    
// //     console.log("Found in Database:", logs.length, "items");
// //     res.json(logs);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });
// // // router.get("/:date", auth, async (req, res) => {
// // //   try {
// // //     const logs = await FoodLog.find({ 
// // //       userId: req.user.id, 
// // //       date: req.params.date 
// // //     }).sort({ createdAt: -1 });
// // //     res.json(logs);
// // //   } catch (err) {
// // //     res.status(500).json({ error: err.message });
// // //   }
// // // });

// // // 3. POST NEW LOG
// // router.post("/", auth, async (req, res) => {
// //   try {
// //     const { name, calories, mealType } = req.body;
// //     if (!name || !calories || !mealType) {
// //       return res.status(400).json({ error: 'Missing fields' });
// //     }
// //     const newFoodEntry = new FoodLog({
// //       userId: req.user.id,
// //       name,
// //       calories,
// //       mealType,
// //       date: new Date().toISOString().split('T')[0]
// //     });
// //     await newFoodEntry.save();
// //     res.status(201).json(newFoodEntry);
// //   } catch (err) {
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // });

// // // 4. DELETE LOG
// // router.delete("/:id", auth, async (req, res) => {
// //   try {
// //     const deletedEntry = await FoodLog.findOneAndDelete({ 
// //       _id: req.params.id, 
// //       userId: req.user.id 
// //     });
// //     if (!deletedEntry) return res.status(404).json({ message: "Not found" });
// //     res.json({ message: "Deleted" });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const FoodLog = require("../models/FoodLog");
// const auth = require("../middleware/auth");

// // Helper to match the Frontend local date
// const getLocalToday = () => {
//   const date = new Date();
//   return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
//          .toISOString().split('T')[0];
// };

// // GET logs for a specific date
// router.get("/:date", auth, async (req, res) => {
//   try {
//     const logs = await FoodLog.find({ 
//       userId: req.user.id, 
//       date: req.params.date 
//     }).sort({ createdAt: -1 });
//     res.json(logs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // POST new log
// router.post("/", auth, async (req, res) => {
//   try {
//     const { name, calories, mealType } = req.body;
//     if (!name || !calories || !mealType) {
//       return res.status(400).json({ error: 'Missing fields' });
//     }

//     const newFoodEntry = new FoodLog({
//       userId: req.user.id,
//       name,
//       calories: Number(calories),
//       mealType,
//       date: getLocalToday() // ✅ This matches your frontend!
//     });

//     await newFoodEntry.save();
//     res.status(201).json(newFoodEntry);
//   } catch (err) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// module.exports = router;



// const express = require("express");

// const router = express.Router();


// // TEST ROUTE
// router.get("/", async (req, res) => {
//   res.json({
//     success: true,
//     message: "Food route working"
//   });
// });


// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const FoodLog = require("../models/FoodLog");
// const auth = require("../middleware/auth");

// // Helper for local date
// const getLocalToday = () => {
//   const date = new Date();
//   return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
//            .toISOString().split('T')[0];
// };

// // ✅ FIX 1: Add a route for "/" to get all user logs
// // This stops the 404 error when calling api.get("/food-log")
// router.get("/:date", async (req, res) => {
//   try {
//     const { date } = req.params;

//     const logs = await FoodLog.find({
//       date: date,
//     });

//     res.status(200).json(logs || []);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// });

// // GET logs for a specific date (Keep this for the dashboard)
// router.get("/by-date/:date", auth, async (req, res) => {
//   try {
//     const logs = await FoodLog.find({ 
//       userId: req.user.id, 
//       date: req.params.date 
//     }).sort({ createdAt: -1 });
//     res.json(logs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// // POST new log
// router.post("/", auth, async (req, res) => {
//   try {
//     const { name, calories, mealType } = req.body;
//     if (!name || !calories || !mealType) {
//       return res.status(400).json({ error: 'Missing fields' });
//     }

//     const newFoodEntry = new FoodLog({
//       userId: req.user.id,
//       name,
//       calories: Number(calories),
//       mealType,
//       date: getLocalToday() 
//     });

//     await newFoodEntry.save();
//     res.status(201).json(newFoodEntry);
//   } catch (err) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // DELETE log
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const deletedEntry = await FoodLog.findOneAndDelete({ 
//       _id: req.params.id, 
//       userId: req.user.id 
//     });
//     if (!deletedEntry) return res.status(404).json({ message: "Not found" });
//     res.json({ message: "Deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

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