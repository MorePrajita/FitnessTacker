export default {
  async beforeCreate(event) {
    calculate(event);
  },
  async beforeUpdate(event) {
    calculate(event);
  },
};

function calculate(event: any) {
  const data = event.params.data;

  const weight = Number(data.weight);
  const height = Number(data.height);
  const age = Number(data.age);
  const gender = data.gender || "female";
  const goal = data.goal || "maintain";

  if (!weight || !height || !age) return;

  // ✅ 1. BMR
  let bmr = 0;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // ✅ 2. TDEE
  const tdee = bmr * 1.5;

  // ✅ 3. Goal adjustment
  let dailyChange = 0;
  if (goal === "lose") dailyChange = -500;
  if (goal === "gain") dailyChange = 500;

  const weeklyCalories = dailyChange * 7;

  // ✅ Store calories
  if (weeklyCalories > 0) {
    data.weeklyCalorieSurplus = weeklyCalories;
    data.weeklyCalorieDeficit = 0;
  } else {
    data.weeklyCalorieDeficit = Math.abs(weeklyCalories);
    data.weeklyCalorieSurplus = 0;
  }

  // ❗ Prevent divide by zero
  if (weeklyCalories === 0) {
    data.weeklyWeightChange = 0;
    data.daysNeeded = 0;
    data.goalEndDate = new Date().toISOString().split("T")[0];
    return;
  }

  // ✅ 4. Weekly Weight Change
  const weeklyWeightChange = weeklyCalories / 7700;
  data.weeklyWeightChange = Number(weeklyWeightChange.toFixed(2));

  // ✅ 5. Target Weight from BMI
  const heightM = height / 100;
  const targetWeight = 22 * heightM * heightM;
  data.targetWeight = Number(targetWeight.toFixed(1));

  // ✅ 6. Days Needed
  const weightDiff = targetWeight - weight;
  const daysNeeded = Math.abs(weightDiff / weeklyWeightChange) * 7;

  data.daysNeeded = Math.ceil(daysNeeded);

  // ✅ 7. Goal End Date
  const today = new Date();
  today.setDate(today.getDate() + data.daysNeeded);

  data.goalEndDate = today.toISOString().split("T")[0];
}
