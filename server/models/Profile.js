// // // const mongoose = require("mongoose");

// // // const profileSchema = new mongoose.Schema({
// // //   userId: mongoose.Schema.Types.ObjectId,

// // //   age: Number,
// // //   gender: String,
// // //   height: Number,
// // //   weight: Number,

// // //   goal: String, // lose / gain / maintain

// // //   bmi: Number,
// // //   bmiCategory: String,

// // //   targetWeight: Number,
// // //   weightDifference: Number,

// // //   daysNeeded: Number,
// // //   startDate: Date,
// // //   endDate: Date,

// // //   dailyCalorieIntake: Number,
// // //   dailyCalorieBurn: Number,

// // //   createdAt: {
// // //     type: Date,
// // //     default: Date.now,
// // //   },
// // // });

// // // module.exports = mongoose.model("Profile", profileSchema);
// // const mongoose = require("mongoose");

// // const profileSchema = new mongoose.Schema({
// //   userId: { 
// //     type: mongoose.Schema.Types.ObjectId, 
// //     ref: "User", 
// //     required: true 
// //   },
// //   age: Number,
// //   gender: String,
// //   height: Number,
// //   weight: Number,
// //   goal: String,
// //   bmi: Number,
// //   dailyCalorieIntake: { type: Number, default: 2000 },
// //   dailyCalorieBurn: { type: Number, default: 400 },
// //   createdAt: { type: Date, default: Date.now }
// // });

// // module.exports = mongoose.model("Profile", profileSchema);

// const mongoose = require("mongoose");

// const profileSchema = new mongoose.Schema({
//   userId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "User", 
//     required: true 
//   },
//   age: Number,
//   gender: String,
//   height: Number,
//   weight: Number,
//   goal: String,
//   bmi: Number,
//   dailyCalorieIntake: { type: Number, default: 2000 },
//   dailyCalorieBurn: { type: Number, default: 400 },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Profile", profileSchema);
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    unique: true // One profile per user
  },
  age: { type: Number },
  gender: { type: String },
  height: { type: Number }, // in cm
  weight: { type: Number }, // in kg
  goal: { 
    type: String, 
    enum: ["lose", "maintain", "gain"], 
    
  },
  bmi: { type: Number },
  bmiCategory: { type: String },
  
  // Goals for calculations and charts
  dailyCalorieIntake: { type: Number, default: 2000 },
  dailyCalorieBurn: { type: Number, default: 400 },
  targetSteps: { type: Number, default: 10000 },
  targetWeight: { type: Number },

  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Automatically update the 'updatedAt' field on save
profileSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Profile", profileSchema);