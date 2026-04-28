// // import { PersonStanding, ScaleIcon, Target, CalendarDays, Weight } from "lucide-react";
// // import { useNavigate } from "react-router-dom";
// // import { useMemo, useState } from "react";
// // import toast from "react-hot-toast";
// // import { useAppContext } from "../context/AppContext";
// // import type { ProfileFormData } from "../types";
// // import Input from "../components/ui/Input";
// // import Button from "../components/ui/Button";
// // import Slider from "../components/ui/Slider";
// // import api from "../configs/api";

// // type Gender = "male" | "female" | "other";
// // type Goal = "lose" | "maintain" | "gain";

// // const BMI_CATEGORY = {
// //   underweight: "underweight",
// //   normal: "normal",
// //   overweight: "overweight",
// //   obese: "obese",
// // } as const;

// // const HEALTHY_BMI_MIN = 18.5;
// // const HEALTHY_BMI_MAX = 24.9;
// // const CALORIES_PER_KG = 7700;

// // const Onboarding = () => {
// //   const { user, setOnboardingCompleted, fetchUser } = useAppContext();
// //   const navigate = useNavigate();


// //   const [formData, setFormData] = useState<ProfileFormData & { gender: Gender }>({
// //     age: 0,
// //     weight: 0,
// //     height: 0,
// //     gender: "male",
// //     goal: "maintain",
// //     dailyCalorieIntake: 2000,
// //     dailyCalorieBurn: 400,
// //   });
// // const updateField = (field: keyof typeof formData, value: string | number) => {
// //   const numericFields = ["age", "weight", "height", "dailyCalorieIntake", "dailyCalorieBurn"];

// //   setFormData((prev) => ({
// //     ...prev,
// //     [field]: numericFields.includes(field)
// //       ? Number(value)
// //       : value,
// //   }));
// // };


// //   const bmi = useMemo(() => {
// //     const heightInM = Number(formData.height) / 100;
// //     const weight = Number(formData.weight);
// //     if (!heightInM || !weight) return 0;
// //     return weight / (heightInM * heightInM);
// //   }, [formData.height, formData.weight]);

// //   const bmiCategory = useMemo(() => {
// //     if (!bmi) return null;
// //     if (bmi < 18.5) return BMI_CATEGORY.underweight;
// //     if (bmi < 25) return BMI_CATEGORY.normal;
// //     if (bmi < 30) return BMI_CATEGORY.overweight;
// //     return BMI_CATEGORY.obese;
// //   }, [bmi]);

// //   const recommendedGoal: Goal | null = useMemo(() => {
// //     if (!bmiCategory) return null;
// //     if (bmiCategory === BMI_CATEGORY.underweight) return "gain";
// //     if (bmiCategory === BMI_CATEGORY.normal) return "maintain";
// //     return "lose";
// //   }, [bmiCategory]);

// //   const targetValues = useMemo(() => {
// //     if (!recommendedGoal) {
// //       return { intake: 2000, burn: 400 };
// //     }

// //     if (recommendedGoal === "lose") {
// //       return { intake: 1800, burn: 500 };
// //     }

// //     if (recommendedGoal === "gain") {
// //       return { intake: 2300, burn: 350 };
// //     }

// //     return { intake: 2000, burn: 400 };
// //   }, [recommendedGoal]);

// //   const goalDetails = useMemo(() => {
// //     const heightInM = Number(formData.height) / 100;
// //     const currentWeight = Number(formData.weight);
// //     const dailyNetCalories = targetValues.burn - targetValues.intake;

// //     if (!heightInM || !currentWeight || !bmi) {
// //       return {
// //         targetBmi: 0,
// //         targetWeight: 0,
// //         weightDifference: 0,
// //         daysNeeded: 0,
// //         startDate: "",
// //         endDate: "",
// //       };
// //     }

// //     let targetBmi = bmi;

// //     if (bmi < HEALTHY_BMI_MIN) {
// //       targetBmi = HEALTHY_BMI_MIN;
// //     } else if (bmi > HEALTHY_BMI_MAX) {
// //       targetBmi = HEALTHY_BMI_MAX;
// //     }

// //     const targetWeight = targetBmi * heightInM * heightInM;
// //     const weightDifference = targetWeight - currentWeight;
// //     const absWeightDifference = Math.abs(weightDifference);

// //     let daysNeeded = 0;
// //     if (recommendedGoal !== "maintain" && dailyNetCalories !== 0) {
// //       const totalCaloriesNeeded = absWeightDifference * CALORIES_PER_KG;
// //       daysNeeded = Math.ceil(totalCaloriesNeeded / Math.abs(dailyNetCalories));
// //     }

// //     const startDate = new Date();
// //     const endDate = new Date(startDate);
// //     endDate.setDate(startDate.getDate() + daysNeeded);

// //     return {
// //       targetBmi,
// //       targetWeight,
// //       weightDifference,
// //       daysNeeded,
// //       startDate: startDate.toISOString().split("T")[0],
// //       endDate: endDate.toISOString().split("T")[0],
// //     };
// //   }, [formData.height, formData.weight, bmi, recommendedGoal, targetValues]);

// //   const validateForm = () => {
// //     const age = Number(formData.age);
// //     const weight = Number(formData.weight);
// //     const height = Number(formData.height);

// //     if (!age || age < 13 || age > 120) return "Age must be between 13 and 120.";
// //     if (!formData.gender) return "Gender is required.";
// //     if (!weight || weight < 20 || weight > 300) return "Weight must be between 20 and 300 kg.";
// //     if (!height || height < 100 || height > 250) return "Height must be between 100 and 250 cm.";
// //     return "";
// //   };

// //   // const handleSubmit = async (e: React.FormEvent) => {
// //   //   e.preventDefault();

// //   //   const error = validateForm();
// //   //   if (error) return toast.error(error);
// //   //   if (!recommendedGoal) return toast.error("Unable to determine BMI goal.");

// //   //   const userData = {
// //   //     age: Number(formData.age),
// //   //     gender: formData.gender,
// //   //     weight: Number(formData.weight),
// //   //     height: Number(formData.height),
// //   //     goal: recommendedGoal,
// //   //     dailyCalorieIntake: targetValues.intake,
// //   //     dailyCalorieBurn: targetValues.burn,
// //   //     bmi: Number(bmi.toFixed(1)),
// //   //     bmiCategory,
// //   //     targetBmi: Number(goalDetails.targetBmi.toFixed(1)),
// //   //     targetWeight: Number(goalDetails.targetWeight.toFixed(1)),
// //   //     weightDifference: Number(goalDetails.weightDifference.toFixed(1)),
// //   //     daysNeeded: goalDetails.daysNeeded,
// //   //     goalStartDate: goalDetails.startDate,
// //   //     goalEndDate: goalDetails.endDate,
// //   //     createdAt: new Date().toISOString(),
// //   //   };

// //   //   localStorage.setItem("fitnessUser", JSON.stringify(userData));

// //   //   try {
// //   //     await api.put(`/api/users/${user?.id}`, userData);
// //   //     toast.dismiss();
// //   //     toast.success("Profile updated successfully", { duration: 2000 });
// //   //     setOnboardingCompleted(true);
// //   //     fetchUser(user?.token || "");
// //   //   } catch (error: any) {
// //   //     toast.error(error.message || "Something went wrong");
// //   //   }
// //   // };

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //   e.preventDefault();

// // //   const error = validateForm();
// // //   if (error) return toast.error(error);
// // //   if (!recommendedGoal) return toast.error("Unable to determine BMI goal.");

// // //   const userData = {
// // //     age: Number(formData.age),
// // //     gender: formData.gender,
// // //     weight: Number(formData.weight),
// // //     height: Number(formData.height),
// // //     goal: recommendedGoal,
// // //     dailyCalorieIntake: targetValues.intake,
// // //     dailyCalorieBurn: targetValues.burn,
// // //     bmi: Number(bmi.toFixed(1)),
// // //     bmiCategory,
// // //     targetBmi: Number(goalDetails.targetBmi.toFixed(1)),
// // //     targetWeight: Number(goalDetails.targetWeight.toFixed(1)),
// // //     weightDifference: Number(goalDetails.weightDifference.toFixed(1)),
// // //     daysNeeded: goalDetails.daysNeeded,
// // //     goalStartDate: goalDetails.startDate,
// // //     goalEndDate: goalDetails.endDate,
// // //     createdAt: new Date().toISOString(),
// // //   };

// // //   localStorage.setItem("fitnessUser", JSON.stringify(userData));

// // //   try {
// // //     /* ================= 1. UPDATE USER ================= */
// // //    await api.put(`/api/users/${user?.id}`, userData);


// // //     /* ================= 2. CREATE / UPDATE USER PROFILE ================= */
// // //     await api.post("/api/user-profiles", {
// // //       data: {
// // //         height: Number(formData.height),
// // //         weight: Number(formData.weight),
// // //         age: Number(formData.age),
// // //         gender: formData.gender,
// // //         bmi: Number(bmi.toFixed(1)),
// // //         goal: recommendedGoal,
// // //         targetBmi: Number(goalDetails.targetBmi.toFixed(1)),
// // //         targetWeight: Number(goalDetails.targetWeight.toFixed(1)),
// // //         weightDifference: Number(goalDetails.weightDifference.toFixed(1)),
// // //         daysNeeded: goalDetails.daysNeeded,
// // //         goalStartDate: goalDetails.startDate,
// // //         goalEndDate: goalDetails.endDate,

// // //         // 🔥 THIS IS THE CRITICAL LINK YOU WERE MISSING
// // //         users_permissions_user: user?.id,
// // //       },
// // //     });

// // //     /* ================= 3. REFRESH USER ================= */
// // //     await fetchUser(user?.token || "");

// // //     toast.dismiss();
// // //     toast.success("Profile updated successfully 🎉");

// // //     /* ================= 4. COMPLETE ONBOARDING ================= */
// // //     await fetchUser(user?.token || "");
// // // setOnboardingCompleted(true);
// // // navigate("/app");


// // //   } catch (error: any) {
// // //     console.log(error);
// // //     toast.error(error?.response?.data?.error?.message || "Something went wrong");
// // //   }
// // // };

// // const handleSubmit = async (e: React.FormEvent) => {
// //   e.preventDefault();

// //   const error = validateForm();
// //   if (error) return toast.error(error);
// //   if (!recommendedGoal) return toast.error("Unable to determine BMI goal.");

// //   const payload = {
// //     data: {
// //       height: Number(formData.height),
// //       weight: Number(formData.weight),
// //       age: Number(formData.age),
// //       gender: formData.gender,
// //       bmi: Number(bmi.toFixed(1)),
// //       goal: recommendedGoal,
// //       targetBmi: Number(goalDetails.targetBmi.toFixed(1)),
// //       targetWeight: Number(goalDetails.targetWeight.toFixed(1)),
// //       weightDifference: Number(goalDetails.weightDifference.toFixed(1)),
// //       daysNeeded: goalDetails.daysNeeded,
// //       goalStartDate: goalDetails.startDate,
// //       goalEndDate: goalDetails.endDate,
// //       users_permissions_user: user?.id,
// //     }
// //   };

// //   try {
// //     // ONLY ONE BACKEND CALL (important)
// //     await api.post("/api/user-profiles", payload);

// //     await fetchUser(user?.token || "");

// //     toast.success("Profile updated successfully 🎉");

// //     setOnboardingCompleted(true);
// //     navigate("/app");

// //   } catch (error: any) {
// //     console.log(error);
// //     toast.error(error?.response?.data?.error?.message || "Something went wrong");
// //   }
// // };


// //   return (
// //     <form onSubmit={handleSubmit} className="onboarding-container">
// //       <div className="p-6 pt-12 onboarding-wrapper">
// //         <div className="flex items-center gap-3 mb-2">
// //           <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
// //             <PersonStanding className="w-6 h-6 text-white" />
// //           </div>
// //           <h1 className="text-2xl font-bold text-slate-800 dark:text-white">FitTrack</h1>
// //         </div>
// //         <p className="text-slate-500 dark:text-slate-400 mt-4">
// //           Enter your details once and we will personalize your plan automatically.
// //         </p>
// //       </div>

// //       <div className="px-6 mb-8 onboarding-wrapper">
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
// //           <div>
// //             <Input
// //               label="Age"
// //               type="number"
// //               value={formData.age || ""}
// //               onChange={(v) => updateField("age", v)}
// //               placeholder="Enter your age"
// //               min={13}
// //               max={120}
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">
// //               Gender
// //             </label>
// //             <select
// //               value={formData.gender}
// //               onChange={(e) => updateField("gender", e.target.value as Gender)}
// //               className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-800 dark:text-white"
// //               required
// //             >
// //               <option value="male">Male</option>
// //               <option value="female">Female</option>
// //               <option value="other">Other</option>
// //             </select>
// //           </div>

// //           <div>
// //             <Input
// //               label="Weight (kg)"
// //               type="number"
              
// // value={formData.weight || ""}
// //               onChange={(v) => updateField("weight", v)}
// //               placeholder="Enter your weight"
// //               min={20}
// //               max={300}
// //               required
// //             />
// //           </div>

// //           <div>
// //             <Input
// //               label="Height (cm)"
// //               type="number"
// //               value={formData.height || ""}
// //               onChange={(v) => updateField("height", v)}
// //               placeholder="Enter your height"
// //               min={100}
// //               max={250}
// //               required
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       <div className="px-6 mb-8 onboarding-wrapper">
// //         <div className="flex items-center gap-4 mb-4">
// //           <div className="size-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center">
// //             <ScaleIcon className="size-6 text-emerald-600 dark:text-emerald-400" />
// //           </div>
// //           <div>
// //             <h2 className="text-lg font-semibold text-slate-800 dark:text-white">BMI Result</h2>
// //             <p className="text-slate-500 dark:text-slate-400 text-sm">
// //               Your goal is selected automatically based on BMI.
// //             </p>
// //           </div>
// //         </div>

// //         <div className="max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900 space-y-2">
// //           <p className="text-sm text-slate-500 dark:text-slate-400">BMI</p>
// //           <p className="text-2xl font-bold text-slate-800 dark:text-white">
// //             {bmi ? bmi.toFixed(1) : "--"}
// //           </p>
// //           <p className="text-sm text-slate-600 dark:text-slate-300">
// //             Category: {bmiCategory || "--"}
// //           </p>
// //           <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
// //             Recommended goal: {recommendedGoal || "--"}
// //           </p>
// //         </div>
// //       </div>

// //       <div className="px-6 mb-8 onboarding-wrapper">
// //         <div className="flex items-center gap-4 mb-4">
// //           <div className="size-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center">
// //             <Weight className="size-6 text-emerald-600 dark:text-emerald-400" />
// //           </div>
// //           <div>
// //             <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Goal Details</h2>
// //             <p className="text-slate-500 dark:text-slate-400 text-sm">
// //               Estimated target weight and timeline.
// //             </p>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
// //           <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
// //             <p className="text-sm text-slate-500">Target BMI</p>
// //             <p className="text-xl font-semibold text-slate-800 dark:text-white">
// //               {goalDetails.targetBmi ? goalDetails.targetBmi.toFixed(1) : "--"}
// //             </p>
// //           </div>

// //           <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
// //             <p className="text-sm text-slate-500">Target Weight</p>
// //             <p className="text-xl font-semibold text-slate-800 dark:text-white">
// //               {goalDetails.targetWeight ? `${goalDetails.targetWeight.toFixed(1)} kg` : "--"}
// //             </p>
// //           </div>

// //           <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
// //             <p className="text-sm text-slate-500">Weight to {recommendedGoal === "gain" ? "Gain" : "Lose"}</p>
// //             <p className="text-xl font-semibold text-slate-800 dark:text-white">
// //               {goalDetails.weightDifference
// //                 ? `${Math.abs(goalDetails.weightDifference).toFixed(1)} kg`
// //                 : "--"}
// //             </p>
// //           </div>

// //           <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
// //             <p className="text-sm text-slate-500">Estimated Duration</p>
// //             <p className="text-xl font-semibold text-slate-800 dark:text-white">
// //               {goalDetails.daysNeeded ? `${goalDetails.daysNeeded} days` : "--"}
// //             </p>
// //           </div>

// //           <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
// //             <p className="text-sm text-slate-500">Goal Start Date</p>
// //             <p className="text-xl font-semibold text-slate-800 dark:text-white">
// //               {goalDetails.startDate || "--"}
// //             </p>
// //           </div>

// //           <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
// //             <p className="text-sm text-slate-500">Estimated Completion Date</p>
// //             <p className="text-xl font-semibold text-slate-800 dark:text-white">
// //               {goalDetails.endDate || "--"}
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="px-6 mb-8 onboarding-wrapper">
// //         <div className="flex items-center gap-4 mb-4">
// //           <div className="size-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center">
// //             <Target className="size-6 text-emerald-600 dark:text-emerald-400" />
// //           </div>
// //           <div>
// //             <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Plan</h2>
// //             <p className="text-slate-500 dark:text-slate-400 text-sm">
// //               Only the BMI-based option stays active.
// //             </p>
// //           </div>
// //         </div>

// //         <div className="space-y-4 max-w-lg">
// //           {(["lose", "maintain", "gain"] as Goal[]).map((option) => {
// //             const active = recommendedGoal === option;
// //             const disabled = recommendedGoal !== option;

// //             return (
// //               <button
// //                 key={option}
// //                 type="button"
// //                 disabled={disabled}
// //                 className={`onboarding-option-btn ${
// //                   active
// //                     ? "ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-900/10"
// //                     : "opacity-40 cursor-not-allowed"
// //                 }`}
// //               >
// //                 <span className="text-base text-slate-700 dark:text-slate-200 capitalize">
// //                   {option === "lose"
// //                     ? "Weight loss"
// //                     : option === "gain"
// //                     ? "Weight gain"
// //                     : "Maintain weight"}
// //                 </span>
// //               </button>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       <div className="px-6 mb-8 onboarding-wrapper">
// //         <div className="space-y-6 max-w-lg">
// //           <h3 className="text-md font-medium text-slate-800 dark:text-white mb-4">
// //             Daily Targets
// //           </h3>

// //           <Slider
// //             label="Daily Calorie Intake"
// //             min={120}
// //             max={4000}
// //             step={50}
// //             value={targetValues.intake}
// //             onChange={() => {}}
// //             unit="kcal"
// //             infoText="Automatically set from your BMI-based goal."
// //           />

// //           <Slider
// //             label="Daily Calorie Burn"
// //             min={100}
// //             max={2000}
// //             step={50}
// //             value={targetValues.burn}
// //             onChange={() => {}}
// //             unit="kcal"
// //             infoText="Automatically set from your BMI-based goal."
// //           />

// //           <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
// //             <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
// //               <CalendarDays className="size-4" />
// //               Goal timeline
// //             </div>
// //             <p className="text-slate-800 dark:text-white font-medium">
// //               {goalDetails.daysNeeded
// //                 ? `From ${goalDetails.startDate} to ${goalDetails.endDate}`
// //                 : "--"}
// //             </p>
// //             <p className="text-sm text-slate-500 mt-2">
// //               Based on your daily calorie intake and burn targets.
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="p-6 pb-10 onboarding-wrapper">
// //         <Button type="submit" className="w-full lg:w-auto lg:px-10">
// //           <span className="flex items-center justify-center gap-2">Submit</span>
// //         </Button>
// //       </div>
// //     </form>
// //   );
// // };

// // export default Onboarding;


// import { useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useAppContext } from "../context/AppContext";
// import api from "../configs/api";

// type Gender = "male" | "female" | "other";
// type Goal = "lose" | "maintain" | "gain";

// const BMI_CATEGORY = {
//   underweight: "underweight",
//   normal: "normal",
//   overweight: "overweight",
//   obese: "obese",
// } as const;

// const HEALTHY_BMI_MIN = 18.5;
// const HEALTHY_BMI_MAX = 24.9;
// const CALORIES_PER_KG = 7700;

// const num = (value: string) => {
//   const n = Number(value);
//   return isNaN(n) ? 0 : n;
// };

// type FormData = {
//   age: string;
//   weight: string;
//   height: string;
//   gender: Gender;
//   goal: Goal;
//   dailyCalorieIntake: string;
//   dailyCalorieBurn: string;
// };

// const Onboarding = () => {
//   const { user, setOnboardingCompleted, fetchUser } = useAppContext();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState<FormData>({
//     age: "",
//     weight: "",
//     height: "",
//     gender: "male",
//     goal: "maintain",
//     dailyCalorieIntake: "2000",
//     dailyCalorieBurn: "400",
//   });

//   const updateField = (field: keyof FormData, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const bmi = useMemo(() => {
//     const h = num(formData.height) / 100;
//     const w = num(formData.weight);
//     if (!h || !w) return 0;
//     return w / (h * h);
//   }, [formData.height, formData.weight]);

//   const bmiCategory = useMemo(() => {
//     if (!bmi) return null;
//     if (bmi < 18.5) return BMI_CATEGORY.underweight;
//     if (bmi < 25) return BMI_CATEGORY.normal;
//     if (bmi < 30) return BMI_CATEGORY.overweight;
//     return BMI_CATEGORY.obese;
//   }, [bmi]);

//   const recommendedGoal: Goal | null = useMemo(() => {
//     if (!bmiCategory) return null;
//     if (bmiCategory === BMI_CATEGORY.underweight) return "gain";
//     if (bmiCategory === BMI_CATEGORY.normal) return "maintain";
//     return "lose";
//   }, [bmiCategory]);

//   const targetValues = useMemo(() => {
//     if (recommendedGoal === "lose") return { intake: 1800, burn: 500 };
//     if (recommendedGoal === "gain") return { intake: 2300, burn: 350 };
//     return { intake: 2000, burn: 400 };
//   }, [recommendedGoal]);

//   const goalDetails = useMemo(() => {
//     const h = num(formData.height) / 100;
//     const w = num(formData.weight);

//     if (!h || !w || !bmi) {
//       return {
//         targetBmi: 0,
//         targetWeight: 0,
//         weightDifference: 0,
//         daysNeeded: 0,
//         startDate: "",
//         endDate: "",
//       };
//     }

//     let targetBmi = bmi;
//     if (bmi < HEALTHY_BMI_MIN) targetBmi = HEALTHY_BMI_MIN;
//     else if (bmi > HEALTHY_BMI_MAX) targetBmi = HEALTHY_BMI_MAX;

//     const targetWeight = targetBmi * h * h;
//     const diff = targetWeight - w;
//     const abs = Math.abs(diff);

//     const net = targetValues.burn - targetValues.intake;

//     let daysNeeded = 0;
//     if (recommendedGoal !== "maintain" && net !== 0) {
//       daysNeeded = Math.ceil((abs * CALORIES_PER_KG) / Math.abs(net));
//     }

//     const start = new Date();
//     const end = new Date();
//     end.setDate(start.getDate() + daysNeeded);

//     return {
//       targetBmi,
//       targetWeight,
//       weightDifference: diff,
//       daysNeeded,
//       startDate: start.toISOString().split("T")[0],
//       endDate: end.toISOString().split("T")[0],
//     };
//   }, [formData, bmi, recommendedGoal, targetValues]);

//   const validateForm = () => {
//     const age = num(formData.age);
//     const weight = num(formData.weight);
//     const height = num(formData.height);

//     if (age < 13 || age > 120) return "Invalid age";
//     if (weight < 20 || weight > 300) return "Invalid weight";
//     if (height < 100 || height > 250) return "Invalid height";
//     return "";
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const error = validateForm();
//     if (error) return toast.error(error);
//     if (!recommendedGoal) return toast.error("Goal not determined");

//     const payload = {
//       data: {
//         age: num(formData.age),
//         gender: formData.gender,
//         weight: num(formData.weight),
//         height: num(formData.height),
//         goal: recommendedGoal,
//         dailyCalorieIntake: targetValues.intake,
//         dailyCalorieBurn: targetValues.burn,
//         bmi: Number(bmi.toFixed(1)),
//         bmiCategory,
//         targetBmi: Number(goalDetails.targetBmi.toFixed(1)),
//         targetWeight: Number(goalDetails.targetWeight.toFixed(1)),
//         weightDifference: Number(goalDetails.weightDifference.toFixed(1)),
//         daysNeeded: goalDetails.daysNeeded,
//         goalStartDate: goalDetails.startDate,
//         goalEndDate: goalDetails.endDate,
//         users_permissions_user: user?.id,
//       },
//     };

//     try {
//       await api.post("/api/user-profiles", payload);

//       await fetchUser(user?.token || "");

//       setOnboardingCompleted(true);
//       navigate("/app");

//       toast.success("Profile created 🎉");
//     } catch (err: any) {
//       console.log(err);
//       toast.error(err?.response?.data?.error?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="p-4">
//       <form onSubmit={handleSubmit} className="space-y-3">

//         <input
//           placeholder="Age"
//           value={formData.age}
//           onChange={(e) => updateField("age", e.target.value)}
//         />

//         <input
//           placeholder="Weight"
//           value={formData.weight}
//           onChange={(e) => updateField("weight", e.target.value)}
//         />

//         <input
//           placeholder="Height"
//           value={formData.height}
//           onChange={(e) => updateField("height", e.target.value)}
//         />

//         <select
//           value={formData.gender}
//           onChange={(e) => updateField("gender", e.target.value)}
//         >
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>

//         <button type="submit">Start Journey</button>
//       </form>
//     </div>
//   );
// };

// export default Onboarding;
import {
  PersonStanding,
  ScaleIcon,
  Target,
  CalendarDays,
  Weight,
} from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import type { ProfileFormData } from "../types";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Slider from "../components/ui/Slider";
import api from "../configs/api";

type Gender = "male" | "female" | "other";
type Goal = "lose" | "maintain" | "gain";

const BMI_CATEGORY = {
  underweight: "underweight",
  normal: "normal",
  overweight: "overweight",
  obese: "obese",
} as const;

const HEALTHY_BMI_MIN = 18.5;
const HEALTHY_BMI_MAX = 24.9;
const CALORIES_PER_KG = 7700;

type GoalDetails = {
  targetBmi: number;
  targetWeight: number;
  weightDifference: number;
  daysNeeded: number;
  startDate: string;
  endDate: string;
};

const Onboarding = () => {
  const { user, setOnboardingCompleted, fetchUser } = useAppContext();

  const [formData, setFormData] = useState<ProfileFormData & { gender: Gender }>({
    age: 0,
    weight: 0,
    height: 0,
    gender: "male",
    goal: "maintain",
    dailyCalorieIntake: 2000,
    dailyCalorieBurn: 400,
  });

  const updateField = (field: keyof typeof formData, value: string | number) => {
    if (field === "gender") {
      setFormData((prev) => ({ ...prev, gender: value as Gender }));
      return;
    }

    const nextValue = typeof value === "string" ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [field]: Number.isNaN(nextValue) ? 0 : nextValue,
    }));
  };

  const bmi = useMemo(() => {
    const heightInM = Number(formData.height) / 100;
    const weight = Number(formData.weight);
    if (!heightInM || !weight) return 0;
    return weight / (heightInM * heightInM);
  }, [formData.height, formData.weight]);

  const bmiCategory = useMemo(() => {
    if (!bmi) return null;
    if (bmi < 18.5) return BMI_CATEGORY.underweight;
    if (bmi < 25) return BMI_CATEGORY.normal;
    if (bmi < 30) return BMI_CATEGORY.overweight;
    return BMI_CATEGORY.obese;
  }, [bmi]);

  const recommendedGoal: Goal | null = useMemo(() => {
    if (!bmiCategory) return null;
    if (bmiCategory === BMI_CATEGORY.underweight) return "gain";
    if (bmiCategory === BMI_CATEGORY.normal) return "maintain";
    return "lose";
  }, [bmiCategory]);

  const targetValues = useMemo(() => {
    if (!recommendedGoal) return { intake: 2000, burn: 400 };
    if (recommendedGoal === "lose") return { intake: 1800, burn: 500 };
    if (recommendedGoal === "gain") return { intake: 2300, burn: 350 };
    return { intake: 2000, burn: 400 };
  }, [recommendedGoal]);

  const goalDetails = useMemo<GoalDetails>(() => {
    const heightInM = Number(formData.height) / 100;
    const currentWeight = Number(formData.weight);

    if (!heightInM || !currentWeight || !bmi) {
      return {
        targetBmi: 0,
        targetWeight: 0,
        weightDifference: 0,
        daysNeeded: 0,
        startDate: "",
        endDate: "",
      };
    }

    let targetBmi = bmi;
    if (bmi < HEALTHY_BMI_MIN) targetBmi = HEALTHY_BMI_MIN;
    if (bmi > HEALTHY_BMI_MAX) targetBmi = HEALTHY_BMI_MAX;

    const targetWeight = targetBmi * heightInM * heightInM;
    const weightDifference = targetWeight - currentWeight;
    const absWeightDifference = Math.abs(weightDifference);

    const dailyNetCalories = Math.abs(targetValues.burn - targetValues.intake);

    let daysNeeded = 0;
    if (recommendedGoal !== "maintain" && dailyNetCalories > 0) {
      const totalCaloriesNeeded = absWeightDifference * CALORIES_PER_KG;
      daysNeeded = Math.ceil(totalCaloriesNeeded / dailyNetCalories);
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + daysNeeded);

    return {
      targetBmi,
      targetWeight,
      weightDifference,
      daysNeeded,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };
  }, [formData.height, formData.weight, bmi, recommendedGoal, targetValues]);

  const validateForm = () => {
    const age = Number(formData.age);
    const weight = Number(formData.weight);
    const height = Number(formData.height);

    if (!age || age < 13 || age > 120) return "Age must be between 13 and 120.";
    if (!formData.gender) return "Gender is required.";
    if (!weight || weight < 20 || weight > 300) return "Weight must be between 20 and 300 kg.";
    if (!height || height < 100 || height > 250) return "Height must be between 100 and 250 cm.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateForm();
    if (error) return toast.error(error);
    if (!recommendedGoal) return toast.error("Unable to determine BMI goal.");

    const userPayload = {
      age: Number(formData.age),
      gender: formData.gender,
      weight: Number(formData.weight),
      height: Number(formData.height),
      goal: recommendedGoal,
      dailyCalorieIntake: targetValues.intake,
      dailyCalorieBurn: targetValues.burn,
      bmi: Number(bmi.toFixed(1)),
      bmiCategory,
      targetBmi: Number(goalDetails.targetBmi.toFixed(1)),
      targetWeight: Number(goalDetails.targetWeight.toFixed(1)),
      weightDifference: Number(goalDetails.weightDifference.toFixed(1)),
      daysNeeded: goalDetails.daysNeeded,
      goalStartDate: goalDetails.startDate,
      goalEndDate: goalDetails.endDate,
    };

    try {
      await api.put("/api/users/me", userPayload);

      await api.post("/api/user-profiles", {
        height: Number(formData.height),
        weight: Number(formData.weight),
        age: Number(formData.age),
        gender: formData.gender,
      });

      await fetchUser(user?.token || "");
      setOnboardingCompleted(true);
      toast.success("Onboarding completed 🎉");
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="onboarding-container">
      <div className="p-6 pt-12 onboarding-wrapper">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
            <PersonStanding className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">FitTrack</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 mt-4">
          Enter your details once and we will personalize your plan automatically.
        </p>
      </div>

      <div className="px-6 mb-8 onboarding-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <div>
            <Input
              label="Age"
              type="number"
              value={formData.age}
              onChange={(v) => updateField("age", v)}
              placeholder="Enter your age"
              min={13}
              max={120}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={(e) => updateField("gender", e.target.value as Gender)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-800 dark:text-white"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <Input
              label="Weight (kg)"
              type="number"
              value={formData.weight}
              onChange={(v) => updateField("weight", v)}
              placeholder="Enter your weight"
              min={20}
              max={300}
              required
            />
          </div>

          <div>
            <Input
              label="Height (cm)"
              type="number"
              value={formData.height}
              onChange={(v) => updateField("height", v)}
              placeholder="Enter your height"
              min={100}
              max={250}
              required
            />
          </div>
        </div>
      </div>

      <div className="px-6 mb-8 onboarding-wrapper">
        <div className="flex items-center gap-4 mb-4">
          <div className="size-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center">
            <ScaleIcon className="size-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">BMI Result</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Your goal is selected automatically based on BMI.
            </p>
          </div>
        </div>

        <div className="max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900 space-y-2">
          <p className="text-sm text-slate-500 dark:text-slate-400">BMI</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            {bmi ? bmi.toFixed(1) : "--"}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Category: {bmiCategory || "--"}
          </p>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
            Recommended goal: {recommendedGoal || "--"}
          </p>
        </div>
      </div>

      <div className="px-6 mb-8 onboarding-wrapper">
        <div className="flex items-center gap-4 mb-4">
          <div className="size-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center">
            <Weight className="size-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Goal Details</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Estimated target weight and timeline.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
            <p className="text-sm text-slate-500">Target BMI</p>
            <p className="text-xl font-semibold text-slate-800 dark:text-white">
              {goalDetails.targetBmi ? goalDetails.targetBmi.toFixed(1) : "--"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
            <p className="text-sm text-slate-500">Target Weight</p>
            <p className="text-xl font-semibold text-slate-800 dark:text-white">
              {goalDetails.targetWeight ? `${goalDetails.targetWeight.toFixed(1)} kg` : "--"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
            <p className="text-sm text-slate-500">
              Weight to {recommendedGoal === "gain" ? "Gain" : "Lose"}
            </p>
            <p className="text-xl font-semibold text-slate-800 dark:text-white">
              {goalDetails.weightDifference
                ? `${Math.abs(goalDetails.weightDifference).toFixed(1)} kg`
                : "--"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
            <p className="text-sm text-slate-500">Estimated Duration</p>
            <p className="text-xl font-semibold text-slate-800 dark:text-white">
              {goalDetails.daysNeeded ? `${goalDetails.daysNeeded} days` : "--"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
            <p className="text-sm text-slate-500">Goal Start Date</p>
            <p className="text-xl font-semibold text-slate-800 dark:text-white">
              {goalDetails.startDate || "--"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
            <p className="text-sm text-slate-500">Estimated Completion Date</p>
            <p className="text-xl font-semibold text-slate-800 dark:text-white">
              {goalDetails.endDate || "--"}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 mb-8 onboarding-wrapper">
        <div className="flex items-center gap-4 mb-4">
          <div className="size-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center">
            <Target className="size-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Plan</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Only the BMI-based option stays active.
            </p>
          </div>
        </div>

        <div className="space-y-4 max-w-lg">
          {(["lose", "maintain", "gain"] as Goal[]).map((option) => {
            const active = recommendedGoal === option;
            const disabled = recommendedGoal !== option;

            return (
              <button
                key={option}
                type="button"
                disabled={disabled}
                className={`onboarding-option-btn ${
                  active
                    ? "ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-900/10"
                    : "opacity-40 cursor-not-allowed"
                }`}
              >
                <span className="text-base text-slate-700 dark:text-slate-200 capitalize">
                  {option === "lose"
                    ? "Weight loss"
                    : option === "gain"
                    ? "Weight gain"
                    : "Maintain weight"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-6 mb-8 onboarding-wrapper">
        <div className="space-y-6 max-w-lg">
          <h3 className="text-md font-medium text-slate-800 dark:text-white mb-4">
            Daily Targets
          </h3>

          <Slider
            label="Daily Calorie Intake"
            min={120}
            max={4000}
            step={50}
            value={targetValues.intake}
            onChange={() => {}}
            unit="kcal"
            infoText="Automatically set from your BMI-based goal."
          />

          <Slider
            label="Daily Calorie Burn"
            min={100}
            max={2000}
            step={50}
            value={targetValues.burn}
            onChange={() => {}}
            unit="kcal"
            infoText="Automatically set from your BMI-based goal."
          />

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
              <CalendarDays className="size-4" />
              Goal timeline
            </div>
            <p className="text-slate-800 dark:text-white font-medium">
              {goalDetails.daysNeeded
                ? `From ${goalDetails.startDate} to ${goalDetails.endDate}`
                : "--"}
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Based on your daily calorie intake and burn targets.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 pb-10 onboarding-wrapper">
        <Button type="submit" className="w-full lg:w-auto lg:px-10">
          <span className="flex items-center justify-center gap-2">Submit</span>
        </Button>
      </div>
    </form>
  );
};

export default Onboarding;