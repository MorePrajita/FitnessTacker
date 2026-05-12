const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  age: Number,
  gender: String,
  height: Number,
  weight: Number,

  goal: String,
  bmi: Number,
  bmiCategory: String,

  targetBmi: Number,
  targetWeight: Number,
  weightDifference: Number,

  daysNeeded: Number,
  goalStartDate: String,
  goalEndDate: String,
});

module.exports = mongoose.model("UserProfile", schema);
