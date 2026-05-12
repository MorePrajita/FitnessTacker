// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const Profile = require("../models/Profile");

// /* ================= GET PROFILE ================= */
// router.get("/profile", auth, async (req, res) => {
//   try {
//     console.log("🔍 Fetching profile for User ID:", req.user.id);

//     // Ensure we are searching by the field "userId" using the ID from our token
//     const profile = await Profile.findOne({ userId: req.user.id });

//     if (!profile) {
//       console.log("❌ No profile found in DB for this ID");
//       return res.status(404).json({ message: "No profile found" });
//     }

//     console.log("✅ Profile found!");
//     res.json(profile);
//   } catch (err) {
//     console.error("🔥 Server Error:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// /* ================= CREATE/UPDATE PROFILE ================= */
// router.post("/profile", auth, async (req, res) => {
//   try {
//     const profileData = {
//       ...req.body,
//       userId: req.user.id,
//     };

//     // Fix the Warning: change 'new: true' to 'returnDocument: "after"'
//     const profile = await Profile.findOneAndUpdate(
//       { userId: req.user.id },
//       profileData,
//       { 
//         returnDocument: "after", // ✅ Fixes Mongoose Warning
//         upsert: true 
//       }
//     );

//     res.json(profile);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");

/* ================= GET PROFILE ================= */
// @route   GET /api/profile
// @desc    Get current user's fitness profile
router.get("/", auth, async (req, res) => {
  try {
    // req.user.id is extracted from the JWT by your auth middleware
    const profile = await Profile.findOne({ userId: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: "No profile found. Please create one." });
    }

    res.json(profile);
  } catch (err) {
    console.error("Profile Fetch Error:", err.message);
    res.status(500).json({ error: "Server error while fetching profile." });
  }
});

/* ================= CREATE/UPDATE PROFILE ================= */
// @route   POST /api/profile
// @desc    Create or Update user profile (upsert)
/* ================= CREATE/UPDATE PROFILE ================= */
// @route   POST /api/profile
// @desc    Create or Update user profile (upsert)

router.post("/", auth, async (req, res) => {

  try {

    const {
      weight,
      height,
      age,
      gender,
      goal,
      activityLevel,
      targetCalories,
      targetSteps
    } = req.body;

    // BMI Calculation
    let bmi = null;

    if (weight && height) {

      const heightInMeters = height / 100;

      bmi = (
        weight /
        (heightInMeters * heightInMeters)
      ).toFixed(1);
    }

    const profileFields = {

      userId: req.user.id,

      weight: Number(weight),

      height: Number(height),

      age: Number(age),

      gender,

      goal,

      activityLevel,

      targetCalories: Number(targetCalories),

      targetSteps: Number(targetSteps),

      bmi: bmi ? Number(bmi) : undefined,
    };

    const profile = await Profile.findOneAndUpdate(

      { userId: req.user.id },

      { $set: profileFields },

      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.json(profile);

  } catch (err) {

    console.error("Profile Update Error:", err.message);

    res.status(500).json({
      error: "Failed to save profile settings."
    });
  }
});
module.exports = router;