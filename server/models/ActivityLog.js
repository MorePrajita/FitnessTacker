// const mongoose = require("mongoose");

// const activityLogSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   name: { type: String, required: true },
//   duration: { type: Number, required: true },
//   caloriesBurned: { type: Number, required: true },
//   date: { type: String, required: true } // YYYY-MM-DD
// }, { timestamps: true });

// module.exports = mongoose.model("ActivityLog", activityLogSchema);
// const mongoose = require("mongoose");

// const activitySchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   exerciseType: { type: String, required: true }, // e.g., Running, Cycling
//   duration: { type: Number, required: true },    // in minutes
//   caloriesBurned: { type: Number, required: true },
//   date: { type: Date, default: Date.now }
// }, { timestamps: true });

// module.exports = mongoose.model("Activity", activitySchema);
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true }, 
  duration: { type: Number, required: true },    
  caloriesBurned: { type: Number, required: true },
  date: { type: String }
}, { 
  timestamps: true,
  // This MUST match the name you saw in Compass exactly
  collection: 'activitylogs' 
});

module.exports = mongoose.model("Activity", activitySchema);