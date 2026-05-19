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
