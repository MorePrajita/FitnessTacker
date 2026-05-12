// // import { useEffect, useState } from "react";
// // import { useAppContext } from "../context/AppContext"
// // import { useTheme } from "../context/ThemeContext";
// // import type { ProfileFormData } from "../types";
// // import Card from "../components/ui/Card";
// // import { Calendar, LogOutIcon, MoonIcon, Scale, SunIcon, Target, User } from "lucide-react";
// // import Button from "../components/ui/Button";
// // import { goalLabels, goalOptions } from "../assets/assets";
// // import Input from "../components/ui/Input";
// // import Select from "../components/ui/Select";
// // import toast from "react-hot-toast";
// // import api from "../configs/api";


// // const Profile = () => {
// //   const {user, logout, fetchUser, allFoodLogs, allActivityLogs} = useAppContext();
// //   const { theme, toggleTheme } = useTheme()

// //   const [isEditing, setIsEditing] = useState(false)
// //   const [formData, setFormData] = useState<ProfileFormData>({age: 0, weight: 0, height: 0, goal: 'maintain', dailyCalorieIntake: 2000, dailyCalorieBurn: 400 })

// //   const fetchUserData = ()=>{
// //     if(user){
// //       setFormData({
// //         age: user?.age || 0,
// //         weight: user?.weight || 0,
// //         height: user?.height || 0,
// //         goal: user?.goal || 'maintain',
// //         dailyCalorieIntake: user?.dailyCalorieIntake || 2000,
// //         dailyCalorieBurn: user?.dailyCalorieBurn || 400,
        
// //       })
// //     }
// //   }

// //   useEffect(()=>{
// //     (()=>{
// //       fetchUserData()
// //     })();
// //   },[user])

// //   const handleSave = async ()=>{
// //     try {
// //       await api.put(`/api/users/${user?.id}`, formData)
// //       await fetchUser(user?.token || '')
// //       toast.success('Profile updated successfully')
// //     } catch (error: any) {
// //        console.log(error);
// //        toast.error(error?.message || "Failed to update profile");
// //     }
// //     setIsEditing(false)
// //   }

// //    const getStats = ()=>{
// //     const totalFoodEntries = allFoodLogs?.length || 0;
// //     const totalActivities = allActivityLogs?.length || 0;

// //     return {totalFoodEntries, totalActivities}
// //    }

// //    const stats = getStats();

// //   if(!user || !formData) return null

// //   return (
// //     <div className='page-container'>
// //       {/* Header */}
// //       <div className="page-header">
// //         <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Profile</h1>
// //         <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your settings</p>
// //       </div>

// //       <div className='profile-content'>
// //         {/* left col */}
// //           <Card>
// //             {/* card title  */}
// //             <div className="flex items-center gap-4 mb-6">
// //               <div className="size-12 rounded-xl bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
// //                 <User className='size-6 text-white' />
// //               </div>
// //               <div>
// //                 <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Your Profile</h2>
// //                 <p className="text-slate-500 dark:text-slate-400 text-xs">Member since {new Date(user?.createdAt || '').toLocaleDateString()}</p>
// //               </div>
// //             </div>

// //             {isEditing ? (
// //               <div className="space-y-4">

// //                 <Input label="Age" type='number' value={formData.age} onChange={(v)=>setFormData({...formData, age: Number(v)})} min={13} max={120}/>

// //                 <Input label="Weight (kg)" type='number' value={formData.weight} onChange={(v)=>setFormData({...formData, weight: Number(v)})} min={20} max={300}/>

// //                 <Input label="Height (cm)" type='number' value={formData.height} onChange={(v)=>setFormData({...formData, height: Number(v)})} min={100} max={250}/>

// //                 <Select label="Fitness Goal" value={formData.goal as string} onChange={(v)=> setFormData({...formData, goal: v as 'lose' | 'maintain' | 'gain'})} options={goalOptions}/>

// //                 <div className="flex gap-3 pt-2">
// //                   <Button variant="secondary" className="flex-1" 
// //                   onClick={()=>{
// //                     setIsEditing(false);
// //                     setFormData({
// //                       age: Number(user.age),
// //                       weight: Number(user.weight),
// //                       height: Number(user.height),
// //                       goal: user.goal || '',
// //                       dailyCalorieIntake: user.dailyCalorieIntake || 2000,
// //                       dailyCalorieBurn: user.dailyCalorieBurn || 400
// //                     })
// //                   }}>
// //                        Cancel
// //                   </Button>
// //                   <Button onClick={handleSave} className="flex-1">
// //                        Save Changes
// //                   </Button>
// //                 </div>
// //               </div>
// //             ): (
// //               <>
// //               <div className="space-y-4">

// //                 {/* age  */}
// //                 <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
// //                   <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
// //                     <Calendar className="size-4.5 text-blue-600 dark:text-blue-400"/>
// //                   </div>
// //                   <div>
// //                     <p className="text-sm text-slate-500 dark:text-slate-400">Age</p>
// //                     <p className="font-semibold text-slate-800 dark:text-white">{user.age} years</p>
// //                   </div>
// //                 </div>

// //                 {/* Weight  */}
// //                 <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
// //                   <div className="size-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
// //                     <Scale className="size-4.5 text-purple-600 dark:text-purple-400"/>
// //                   </div>
// //                   <div>
// //                     <p className="text-sm text-slate-500 dark:text-slate-400">Weight</p>
// //                     <p className="font-semibold text-slate-800 dark:text-white">{user.weight} kg</p>
// //                   </div>
// //                 </div>

// //                  {/* Height  */}
// //                  {user.height !== 0 && (
// //                   <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
// //                   <div className="size-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
// //                     <User className="size-4.5 text-green-600 dark:text-green-400"/>
// //                   </div>
// //                   <div>
// //                     <p className="text-sm text-slate-500 dark:text-slate-400">Height</p>
// //                     <p className="font-semibold text-slate-800 dark:text-white">{user.height} cm</p>
// //                   </div>
// //                 </div>
// //                  )}

// //                  {/* Goal  */}
// //                  <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
// //                   <div className="size-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
// //                     <Target className="size-4.5 text-orange-600 dark:text-orange-400"/>
// //                   </div>
// //                   <div>
// //                     <p className="text-sm text-slate-500 dark:text-slate-400">Goal</p>
// //                     <p className="font-semibold text-slate-800 dark:text-white">{goalLabels[user?.goal || 'gain']}</p>
// //                   </div>
// //                 </div>

// //               </div>

// //               <Button variant="secondary" onClick={()=>setIsEditing(true)} className="w-full mt-4">
// //                 Edit Profile
// //               </Button>
// //               </>
// //             )}

// //           </Card>
// //         {/* right col */}
// //           <div className="space-y-4">
// //             {/* Stats Card */}
// //             <Card>
// //               <h3 className='font-semibold text-slate-800 dark:text-white mb-4'>Your Stats</h3>
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl">
// //                   <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.totalFoodEntries}</p>
// //                   <p className="text-sm text-slate-500 dark:text-slate-400">Food entries</p>
// //                 </div>
// //                 <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
// //                   <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalActivities}</p>
// //                   <p className="text-sm text-slate-500 dark:text-slate-400">Activities</p>
// //                 </div>
// //               </div>
              
// //             </Card>
// //             {/* toggle theme button for phone  */}
// //             <div className='lg:hidden'>
// //               <button
// //               onClick={toggleTheme}
// //                className="flex items-center gap-3 px-4 py-2.5 w-full text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors duration-200 cursor-pointer"> 
// //                 {theme === 'light' ? <MoonIcon className='size-5'/> : <SunIcon className='size-5'/>}
// //                 <span className="text-base">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
// //               </button>
// //             </div>

// //             {/* Logout button */}
// //             <Button variant="danger" onClick={logout} className="w-full ring ring-red-300 hover:ring-2">
// //               <LogOutIcon className='size-4'/>
// //               Logout
// //             </Button>

// //           </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Profile

// // import { useEffect, useState } from "react";
// // import { useAppContext } from "../context/AppContext";
// // import { useTheme } from "../context/ThemeContext";
// // import type { ProfileFormData } from "../types";
// // import Card from "../components/ui/Card";
// // import { Calendar, LogOutIcon, MoonIcon, Scale, SunIcon, Target, User } from "lucide-react";
// // import Button from "../components/ui/Button";
// // import { goalLabels, goalOptions } from "../assets/assets";
// // import Input from "../components/ui/Input";
// // import Select from "../components/ui/Select";
// // import toast from "react-hot-toast";
// // import api from "../configs/api";

// // const Profile = () => {
// //   const { user, logout, fetchUser, allFoodLogs, allActivityLogs } = useAppContext();
// //   const { theme, toggleTheme } = useTheme();

// //   const [isEditing, setIsEditing] = useState(false);
// //   const [formData, setFormData] = useState<ProfileFormData>({
// //     age: 0,
// //     weight: 0,
// //     height: 0,
// //     goal: "maintain",
// //     dailyCalorieIntake: 2000,
// //     dailyCalorieBurn: 400,
// //   });

// //   const fetchUserData = () => {
// //     if (user) {
// //       setFormData({
// //         age: user?.age || 0,
// //         weight: user?.weight || 0,
// //         height: user?.height || 0,
// //         goal: user?.goal || "maintain",
// //         dailyCalorieIntake: user?.dailyCalorieIntake || 2000,
// //         dailyCalorieBurn: user?.dailyCalorieBurn || 400,
// //       });
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUserData();
// //   }, [user]);

// //   const handleSave = async () => {
// //     try {
// //       await api.put(`/api/users/${user?.id}`, formData);
// //       await fetchUser(user?.token || "");
// //       toast.success("Profile updated successfully");
// //     } catch (error: any) {
// //       console.log(error);
// //       toast.error(error?.message || "Failed to update profile");
// //     }
// //     setIsEditing(false);
// //   };

// //   const getStats = () => {
// //     const totalFoodEntries = allFoodLogs?.length || 0;
// //     const totalActivities = allActivityLogs?.length || 0;
// //     const weeklyCalories = ((user?.dailyCalorieBurn || 0) - (user?.dailyCalorieIntake || 0)) * 7;

// //     return { totalFoodEntries, totalActivities, weeklyCalories };
// //   };

// //   const stats = getStats();

// //   if (!user || !formData) return null;

// //   return (
// //     <div className="page-container">
// //       <div className="page-header">
// //         <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Profile</h1>
// //         <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your settings</p>
// //       </div>

// //       <div className="profile-content">
// //         <Card>
// //           <div className="flex items-center gap-4 mb-6">
// //             <div className="size-12 rounded-xl bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
// //               <User className="size-6 text-white" />
// //             </div>
// //             <div>
// //               <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Your Profile</h2>
// //               <p className="text-slate-500 dark:text-slate-400 text-xs">
// //                 Member since {new Date(user?.createdAt || "").toLocaleDateString()}
// //               </p>
// //             </div>
// //           </div>

// //           {isEditing ? (
// //             <div className="space-y-4">
// //               <Input
// //                 label="Age"
// //                 type="number"
// //                 value={formData.age}
// //                 onChange={(v) => setFormData({ ...formData, age: Number(v) })}
// //                 min={13}
// //                 max={120}
// //               />

// //               <Input
// //                 label="Weight (kg)"
// //                 type="number"
// //                 value={formData.weight}
// //                 onChange={(v) => setFormData({ ...formData, weight: Number(v) })}
// //                 min={20}
// //                 max={300}
// //               />

// //               <Input
// //                 label="Height (cm)"
// //                 type="number"
// //                 value={formData.height}
// //                 onChange={(v) => setFormData({ ...formData, height: Number(v) })}
// //                 min={100}
// //                 max={250}
// //               />

// //               <Select
// //                 label="Fitness Goal"
// //                 value={formData.goal as string}
// //                 onChange={(v) => setFormData({ ...formData, goal: v as "lose" | "maintain" | "gain" })}
// //                 options={goalOptions}
// //               />

// //               <div className="flex gap-3 pt-2">
// //                 <Button
// //                   variant="secondary"
// //                   className="flex-1"
// //                   onClick={() => {
// //                     setIsEditing(false);
// //                     setFormData({
// //                       age: Number(user.age),
// //                       weight: Number(user.weight),
// //                       height: Number(user.height),
// //                       goal: user.goal || "maintain",
// //                       dailyCalorieIntake: user.dailyCalorieIntake || 2000,
// //                       dailyCalorieBurn: user.dailyCalorieBurn || 400,
// //                     });
// //                   }}
// //                 >
// //                   Cancel
// //                 </Button>
// //                 <Button onClick={handleSave} className="flex-1">
// //                   Save Changes
// //                 </Button>
// //               </div>
// //             </div>
// //           ) : (
// //             <>
// //               <div className="space-y-4">
// //                 <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
// //                   <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
// //                     <Calendar className="size-4.5 text-blue-600 dark:text-blue-400" />
// //                   </div>
// //                   <div>
// //                     <p className="text-sm text-slate-500 dark:text-slate-400">Age</p>
// //                     <p className="font-semibold text-slate-800 dark:text-white">{user.age} years</p>
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
// //                   <div className="size-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
// //                     <Scale className="size-4.5 text-purple-600 dark:text-purple-400" />
// //                   </div>
// //                   <div>
// //                     <p className="text-sm text-slate-500 dark:text-slate-400">Weight</p>
// //                     <p className="font-semibold text-slate-800 dark:text-white">{user.weight} kg</p>
// //                   </div>
// //                 </div>

// //                 {user.height !== 0 && (
// //                   <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
// //                     <div className="size-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
// //                       <User className="size-4.5 text-green-600 dark:text-green-400" />
// //                     </div>
// //                     <div>
// //                       <p className="text-sm text-slate-500 dark:text-slate-400">Height</p>
// //                       <p className="font-semibold text-slate-800 dark:text-white">{user.height} cm</p>
// //                     </div>
// //                   </div>
// //                 )}

// //                 <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
// //                   <div className="size-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
// //                     <Target className="size-4.5 text-orange-600 dark:text-orange-400" />
// //                   </div>
// //                   <div>
// //                     <p className="text-sm text-slate-500 dark:text-slate-400">Goal</p>
// //                     <p className="font-semibold text-slate-800 dark:text-white">
// //                       {goalLabels[user?.goal || "gain"]}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>

// //               <Button variant="secondary" onClick={() => setIsEditing(true)} className="w-full mt-4">
// //                 Edit Profile
// //               </Button>
// //             </>
// //           )}
// //         </Card>

// //         <div className="space-y-4">
// //           <Card>
// //             <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Your Stats</h3>
// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl">
// //                 <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
// //                   {stats.totalFoodEntries}
// //                 </p>
// //                 <p className="text-sm text-slate-500 dark:text-slate-400">Food entries</p>
// //               </div>
// //               <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
// //                 <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
// //                   {stats.totalActivities}
// //                 </p>
// //                 <p className="text-sm text-slate-500 dark:text-slate-400">Activities</p>
// //               </div>
// //             </div>

// //             <div className="mt-4 text-center p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl">
// //               <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
// //                 {Math.abs(stats.weeklyCalories)} kcal
// //               </p>
// //               <p className="text-sm text-slate-500 dark:text-slate-400">
// //                 {stats.weeklyCalories < 0
// //                   ? "Weekly calorie deficit"
// //                   : stats.weeklyCalories > 0
// //                   ? "Weekly calorie surplus"
// //                   : "Weekly calorie target"}
// //               </p>
// //             </div>
// //           </Card>

// //           <div className="lg:hidden">
// //             <button
// //               onClick={toggleTheme}
// //               className="flex items-center gap-3 px-4 py-2.5 w-full text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors duration-200 cursor-pointer"
// //             >
// //               {theme === "light" ? <MoonIcon className="size-5" /> : <SunIcon className="size-5" />}
// //               <span className="text-base">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
// //             </button>
// //           </div>

// //           <Button variant="danger" onClick={logout} className="w-full ring ring-red-300 hover:ring-2">
// //             <LogOutIcon className="size-4" />
// //             Logout
// //           </Button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;

// import { useEffect, useMemo, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import { useTheme } from "../context/ThemeContext";
// import type { ProfileFormData } from "../types";
// import Card from "../components/ui/Card";
// import { Calendar, LogOutIcon, MoonIcon, Scale, SunIcon, Target, User } from "lucide-react";
// import Button from "../components/ui/Button";
// import { goalLabels, goalOptions } from "../assets/assets";
// import Input from "../components/ui/Input";
// import Select from "../components/ui/Select";
// import toast from "react-hot-toast";
// import api from "../configs/api";

// const Profile = () => {
 

//   // ✅ ADDED profile
//   const { user, profile, logout, fetchUser, allFoodLogs, allActivityLogs } = useAppContext();
//    console.log("PROFILE:", profile);
//   const { theme, toggleTheme } = useTheme();

//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState<ProfileFormData>({
//     age: 0,
//     weight: 0,
//     height: 0,
//     goal: "maintain",
//     dailyCalorieIntake: 2000,
//     dailyCalorieBurn: 400,
//   });

//   const fetchUserData = () => {
//     if (user) {
//       setFormData({
//         age: user?.age || 0,
//         weight: user?.weight || 0,
//         height: user?.height || 0,
//         goal: user?.goal || "maintain",
//         dailyCalorieIntake: user?.dailyCalorieIntake || 2000,
//         dailyCalorieBurn: user?.dailyCalorieBurn || 400,
//       });
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, [user]);

//   const handleSave = async () => {
//     try {
//       await api.put(`/api/users/${user?.id}`, formData);
//       await fetchUser(user?.token || "");
//       toast.success("Profile updated successfully");
//     } catch (error: any) {
//       console.log(error);
//       toast.error(error?.message || "Failed to update profile");
//     }
//     setIsEditing(false);
//   };

//   // ✅ FIXED: using profile instead of user
//   const stats = useMemo(() => {
//     const totalFoodEntries = allFoodLogs?.length || 0;
//     const totalActivities = allActivityLogs?.length || 0;

//     const weeklyWeightChange =
//       typeof profile?.weeklyWeightChange === "number"
//         ? profile.weeklyWeightChange
//         : null;

//     const weeklyCalorieSurplus =
//       typeof profile?.weeklyCalorieSurplus === "number"
//         ? profile.weeklyCalorieSurplus
//         : null;

//     const weeklyCalorieDeficit =
//       typeof profile?.weeklyCalorieDeficit === "number"
//         ? profile.weeklyCalorieDeficit
//         : null;

//     const goalEndDate = profile?.goalEndDate
//       ? new Date(profile.goalEndDate)
//       : null;

//     const currentWeight = Number(profile?.weight || user?.weight || 0);
//     const targetWeight = Number(profile?.targetWeight || 0);

//     const achievedByWeight =
//       targetWeight > 0 ? Math.abs(currentWeight - targetWeight) <= 0.1 : false;

//     const achievedByDate = goalEndDate ? new Date() >= goalEndDate : false;

//     return {
//       totalFoodEntries,
//       totalActivities,
//       weeklyWeightChange,
//       weeklyCalorieSurplus,
//       weeklyCalorieDeficit,
//       goalEndDate,
//       achieved: achievedByWeight || achievedByDate,
//       targetWeight,
//     };
//   }, [allFoodLogs, allActivityLogs, profile, user]);

//   if (!user) return null;

//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Profile</h1>
//         <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your settings</p>
//       </div>

//       <div className="profile-content">
//         <Card>
//           <div className="flex items-center gap-4 mb-6">
//             <div className="size-12 rounded-xl bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
//               <User className="size-6 text-white" />
//             </div>
//             <div>
//               <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Your Profile</h2>
//               <p className="text-slate-500 dark:text-slate-400 text-xs">
//                 Member since {new Date(user?.createdAt || "").toLocaleDateString()}
//               </p>
//             </div>
//           </div>

//           {isEditing ? (
//             <div className="space-y-4">
//               <Input label="Age" type="number" value={formData.age} onChange={(v) => setFormData({ ...formData, age: Number(v) })} min={13} max={120} />
//               <Input label="Weight (kg)" type="number" value={formData.weight} onChange={(v) => setFormData({ ...formData, weight: Number(v) })} min={20} max={300} />
//               <Input label="Height (cm)" type="number" value={formData.height} onChange={(v) => setFormData({ ...formData, height: Number(v) })} min={100} max={250} />
//               <Select label="Fitness Goal" value={formData.goal as string} onChange={(v) => setFormData({ ...formData, goal: v as "lose" | "maintain" | "gain" })} options={goalOptions} />

//               <div className="flex gap-3 pt-2">
//                 <Button
//                   variant="secondary"
//                   className="flex-1"
//                   onClick={() => {
//                     setIsEditing(false);
//                     setFormData({
//                       age: Number(user.age),
//                       weight: Number(user.weight),
//                       height: Number(user.height),
//                       goal: user.goal || "maintain",
//                       dailyCalorieIntake: user.dailyCalorieIntake || 2000,
//                       dailyCalorieBurn: user.dailyCalorieBurn || 400,
//                     });
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button onClick={handleSave} className="flex-1">
//                   Save Changes
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
//                   <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
//                     <Calendar className="size-4.5 text-blue-600 dark:text-blue-400" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-slate-500 dark:text-slate-400">Age</p>
//                     <p className="font-semibold text-slate-800 dark:text-white">{user.age} years</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
//                   <div className="size-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
//                     <Scale className="size-4.5 text-purple-600 dark:text-purple-400" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-slate-500 dark:text-slate-400">Weight</p>
//                     <p className="font-semibold text-slate-800 dark:text-white">{user.weight} kg</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
//                   <div className="size-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
//                     <User className="size-4.5 text-green-600 dark:text-green-400" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-slate-500 dark:text-slate-400">Height</p>
//                     <p className="font-semibold text-slate-800 dark:text-white">{user.height} cm</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
//                   <div className="size-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
//                     <Target className="size-4.5 text-orange-600 dark:text-orange-400" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-slate-500 dark:text-slate-400">Goal</p>
//                     <p className="font-semibold text-slate-800 dark:text-white">
//                       {goalLabels[user?.goal || "maintain"]}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <Button variant="secondary" onClick={() => setIsEditing(true)} className="w-full mt-4">
//                 Edit Profile
//               </Button>
//             </>
//           )}
//         </Card>

//         {/* ================= STATS ================= */}

//         <div className="space-y-4">
//           <Card>
//             <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Your Stats</h3>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl">
//                 <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.totalFoodEntries}</p>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Food entries</p>
//               </div>
//               <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
//                 <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalActivities}</p>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Activities</p>
//               </div>
//             </div>

//             <div className="mt-4 text-center p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl">
//               <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
//                 {stats.weeklyCalorieDeficit !== null
//                   ? `${stats.weeklyCalorieDeficit} kcal`
//                   : stats.weeklyCalorieSurplus !== null
//                   ? `${stats.weeklyCalorieSurplus} kcal`
//                   : "No data"}
//               </p>
//               <p className="text-sm text-slate-500 dark:text-slate-400">
//                 {stats.weeklyCalorieDeficit !== null
//                   ? "Weekly calorie deficit"
//                   : stats.weeklyCalorieSurplus !== null
//                   ? "Weekly calorie surplus"
//                   : "Weekly calorie target"}
//               </p>
//             </div>

//             <div className="mt-4 text-center p-4 bg-violet-50 dark:bg-violet-900/10 rounded-xl">
//               <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
//                 {stats.weeklyWeightChange !== null ? `${stats.weeklyWeightChange.toFixed(1)} kg` : "No data"}
//               </p>
//               <p className="text-sm text-slate-500 dark:text-slate-400">Weekly weight change</p>
//             </div>

//             <div className="mt-4 text-center p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl">
//               <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
//                 {stats.goalEndDate ? new Date(stats.goalEndDate).toLocaleDateString() : "--"}
//               </p>
//               <p className="text-sm text-slate-500 dark:text-slate-400">Estimated completion date</p>
//             </div>

//             <div className="mt-4 text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
//               <p className={`text-2xl font-bold ${stats.achieved ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
//                 {stats.achieved ? "Achieved" : "Not yet"}
//               </p>
//               <p className="text-sm text-slate-500 dark:text-slate-400">Goal status</p>
//             </div>
//           </Card>

//           <div className="lg:hidden">
//             <button
//               onClick={toggleTheme}
//               className="flex items-center gap-3 px-4 py-2.5 w-full text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors duration-200 cursor-pointer"
//             >
//               {theme === "light" ? <MoonIcon className="size-5" /> : <SunIcon className="size-5" />}
//               <span className="text-base">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
//             </button>
//           </div>

//           <Button variant="danger" onClick={logout} className="w-full ring ring-red-300 hover:ring-2">
//             <LogOutIcon className="size-4" />
//             Logout
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
// import { useEffect, useMemo, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import { useTheme } from "../context/ThemeContext";
// import Card from "../components/ui/Card";
// import {
//   Calendar,
//   LogOutIcon,
//   MoonIcon,
//   Scale,
//   SunIcon,
//   Target,
//   User,
// } from "lucide-react";
// import Button from "../components/ui/Button";
// import { goalLabels, goalOptions } from "../assets/assets";
// import Input from "../components/ui/Input";
// import Select from "../components/ui/Select";
// import toast from "react-hot-toast";
// import api from "../configs/api";

// const Profile = () => {
//   const {
//     user,
//     profile,
//     logout,
//     fetchUser,
//     allFoodLogs,
//     allActivityLogs,
//   } = useAppContext();

//   const { theme, toggleTheme } = useTheme();

//   const [isEditing, setIsEditing] = useState(false);

//   const [formData, setFormData] = useState({
//     age: 0,
//     weight: 0,
//     height: 0,
//     goal: "maintain",
//     dailyCalorieIntake: 2000,
//     dailyCalorieBurn: 400,
//   });

//   /* ================= LOAD USER DATA ================= */

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         age: user?.age || 0,
//         weight: user?.weight || 0,
//         height: user?.height || 0,
//         goal: user?.goal || "maintain",
//         dailyCalorieIntake: user?.dailyCalorieIntake || 2000,
//         dailyCalorieBurn: user?.dailyCalorieBurn || 400,
//       });
//     }
//   }, [user]);

//   /* ================= SAVE ================= */

//   const handleSave = async () => {
//     try {
//       await api.put(`/api/users/${user?.id}`, formData);
//       await fetchUser(user?.token || "");
//       toast.success("Profile updated successfully");
//       setIsEditing(false);
//     } catch (error: any) {
//       console.log(error);
//       toast.error(error?.message || "Failed to update profile");
//     }
//   };

//   /* ================= STATS ================= */

//   const stats = useMemo(() => {
//     const totalFoodEntries = allFoodLogs?.length || 0;
//     const totalActivities = allActivityLogs?.length || 0;

//     const weeklyWeightChange =
//       typeof profile?.weeklyWeightChange === "number"
//         ? profile.weeklyWeightChange
//         : null;

//     const weeklyCalorieSurplus =
//       typeof profile?.weeklyCalorieSurplus === "number"
//         ? profile.weeklyCalorieSurplus
//         : null;

//     const weeklyCalorieDeficit =
//       typeof profile?.weeklyCalorieDeficit === "number"
//         ? profile.weeklyCalorieDeficit
//         : null;

//     const goalEndDate = profile?.goalEndDate
//       ? new Date(profile.goalEndDate)
//       : null;

//     const currentWeight = Number(profile?.weight ?? user?.weight ?? 0);
//     const targetWeight = Number(profile?.targetWeight ?? 0);

//     const achievedByWeight =
//       targetWeight > 0
//         ? Math.abs(currentWeight - targetWeight) <= 0.1
//         : false;

//     const achievedByDate =
//       goalEndDate ? new Date() >= goalEndDate : false;

//     return {
//       totalFoodEntries,
//       totalActivities,
//       weeklyWeightChange,
//       weeklyCalorieSurplus,
//       weeklyCalorieDeficit,
//       goalEndDate,
//       achieved: achievedByWeight || achievedByDate,
//     };
//   }, [allFoodLogs, allActivityLogs, profile, user]);

//   if (!user) return null;

//   /* ================= UI ================= */

//   return (
//     <div className="page-container">
//       {/* HEADER */}
//       <div className="page-header">
//         <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
//           Profile
//         </h1>
//         <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
//           Manage your settings
//         </p>
//       </div>

//       <div className="profile-content grid gap-4 lg:grid-cols-3">
//         {/* ================= PROFILE CARD ================= */}

//         <Card className="lg:col-span-2">
//           <div className="flex items-center gap-4 mb-6">
//             <div className="size-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
//               <User className="size-6 text-white" />
//             </div>
//             <div>
//               <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
//                 Your Profile
//               </h2>
//               <p className="text-xs text-slate-500">
//                 Member since{" "}
//                 {new Date(user?.createdAt || "").toLocaleDateString()}
//               </p>
//             </div>
//           </div>

//           {isEditing ? (
//             <div className="space-y-4">
//               <Input
//                 label="Age"
//                 type="number"
//                 value={formData.age}
//                 onChange={(v) =>
//                   setFormData({ ...formData, age: Number(v) })
//                 }
//               />

//               <Input
//                 label="Weight (kg)"
//                 type="number"
//                 value={formData.weight}
//                 onChange={(v) =>
//                   setFormData({ ...formData, weight: Number(v) })
//                 }
//               />

//               <Input
//                 label="Height (cm)"
//                 type="number"
//                 value={formData.height}
//                 onChange={(v) =>
//                   setFormData({ ...formData, height: Number(v) })
//                 }
//               />

//               <Select
//                 label="Goal"
//                 value={formData.goal}
//                 onChange={(v) =>
//                   setFormData({ ...formData, goal: v })
//                 }
//                 options={goalOptions}
//               />

//               <div className="flex gap-3">
//                 <Button
//                   variant="secondary"
//                   onClick={() => setIsEditing(false)}
//                   className="flex-1"
//                 >
//                   Cancel
//                 </Button>

//                 <Button onClick={handleSave} className="flex-1">
//                   Save
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div className="space-y-4">
//                 <Info label="Age" value={`${user.age} years`} icon={<Calendar />} />
//                 <Info label="Weight" value={`${user.weight} kg`} icon={<Scale />} />
//                 <Info label="Height" value={`${user.height} cm`} icon={<User />} />
//                 <Info
//                   label="Goal"
//                   value={goalLabels[user.goal] || user.goal}
//                   icon={<Target />}
//                 />
//               </div>

//               <Button
//                 variant="secondary"
//                 onClick={() => setIsEditing(true)}
//                 className="w-full mt-4"
//               >
//                 Edit Profile
//               </Button>
//             </>
//           )}
//         </Card>

//         {/* ================= STATS ================= */}

//         <Card>
//           <h3 className="font-semibold text-slate-800 dark:text-white mb-4">
//             Your Stats
//           </h3>

//           <div className="grid grid-cols-2 gap-4">
//             <StatBox label="Food" value={stats.totalFoodEntries} color="emerald" />
//             <StatBox label="Activities" value={stats.totalActivities} color="blue" />
//           </div>

//           {/* <StatFull
//             label="Weekly Calories"
//             value={
//               stats.weeklyCalorieDeficit ??
//               stats.weeklyCalorieSurplus ??
//               "No data"
//             }
//             color="amber"
//           /> */}

//           <StatFull
//             label="Weekly Weight Change"
//             value={
//               stats.weeklyWeightChange !== null
//                 ? `${stats.weeklyWeightChange.toFixed(1)} kg`
//                 : "No data"
//             }
//             color="violet"
//           />

//           <StatFull
//             label="Goal Completion"
//             value={
//               stats.goalEndDate
//                 ? stats.goalEndDate.toLocaleDateString()
//                 : "--"
//             }
//             color="indigo"
//           />

//           <StatFull
//             label="Status"
//             value={stats.achieved ? "Achieved ✅" : "Not Yet ❌"}
//             color={stats.achieved ? "green" : "red"}
//           />
//         </Card>

//         {/* ================= SETTINGS ================= */}

//         <div className="lg:col-span-3 space-y-3">
//           {/* <button
//             onClick={toggleTheme}
//             className="flex items-center gap-3 px-4 py-2 w-full rounded-lg bg-slate-100 dark:bg-slate-800"
//           >
//             {theme === "light" ? <MoonIcon /> : <SunIcon />}
//             {theme === "light" ? "Dark Mode" : "Light Mode"}
//           </button> */}

//           <Button variant="danger" onClick={logout} className="w-full">
//             <LogOutIcon className="size-4" />
//             Logout
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ================= SMALL COMPONENTS ================= */

// const Info = ({ label, value, icon }: any) => (
//   <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
//     {icon}
//     <div>
//       <p className="text-sm text-slate-500">{label}</p>
//       <p className="font-semibold">{value}</p>
//     </div>
//   </div>
// );

// const StatBox = ({ label, value, color }: any) => (
//   <div className={`p-4 rounded-xl text-center bg-${color}-50`}>
//     <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
//     <p className="text-sm text-slate-500">{label}</p>
//   </div>
// );

// const StatFull = ({ label, value, color }: any) => (
//   <div className={`mt-4 p-4 rounded-xl text-center bg-${color}-50`}>
//     <p className={`text-xl font-bold text-${color}-600`}>{value}</p>
//     <p className="text-sm text-slate-500">{label}</p>
//   </div>
// );

// export default Profile;
import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Card from "../components/ui/Card";
import {
  Calendar,
  LogOutIcon,
  Scale,
  Target,
  Ruler,
  TrendingUp,
  Clock,
  CheckCircle2,
  UserCircle,
} from "lucide-react";
import Button from "../components/ui/Button";
import { goalLabels, goalOptions } from "../assets/assets";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import toast from "react-hot-toast";
import api from "../configs/api";

const Profile = () => {
  const {
    user,
    profile,
    logout,
    fetchProfile,
    allFoodLogs,
    allActivityLogs,
  } = useAppContext();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    age: 0,
    weight: 0,
    height: 0,
    goal: "maintain",
    dailyCalorieIntake: 2000,
    dailyCalorieBurn: 400,
  });

  useEffect(() => {
    const source = profile || user;
    if (source) {
      setFormData({
        age: source.age || 0,
        weight: source.weight || 0,
        height: source.height || 0,
        goal: source.goal || "maintain",
        dailyCalorieIntake: source.dailyCalorieIntake || 2000,
        dailyCalorieBurn: source.dailyCalorieBurn || 400,
      });
    }
  }, [profile, user]);

  const handleSave = async () => {
    try {
      await api.put(`/user/profile`, formData);
      await fetchProfile();
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      toast.error("Failed to update profile");
    }
  };

  const stats = useMemo(() => {
    const totalFoodEntries = allFoodLogs?.length || 0;
    const totalActivities = allActivityLogs?.length || 0;
    const goalType = formData.goal;

    let weeklyGoalText = "Maintain";
    let estDays = 90;

    if (goalType === "lose") {
      weeklyGoalText = "Lose 0.5kg / week";
      estDays = 90;
    } else if (goalType === "gain") {
      weeklyGoalText = "Gain 0.25kg / week";
      estDays = 120;
    }

    const startDate = new Date(profile?.createdAt || user?.createdAt || Date.now());
    const achievementDate = new Date(startDate);
    achievementDate.setDate(startDate.getDate() + estDays);

    return {
      totalFoodEntries,
      totalActivities,
      startDate: startDate.toLocaleDateString(),
      achievementDate: achievementDate.toLocaleDateString(),
      weeklyGoalText,
    };
  }, [allFoodLogs, allActivityLogs, profile, user, formData.goal]);

  if (!user && !profile) return null;

  return (
    <div className="page-container max-w-6xl mx-auto p-6 min-h-screen bg-slate-950 text-slate-100">
      {/* HEADER SECTION */}
      <div className="mb-10 flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white">Profile</h1>
          <p className="text-slate-400 font-medium mt-1">Manage your identity and health goals</p>
        </div>
        <div className="hidden md:block">
            <UserCircle size={48} className="text-emerald-500 opacity-80" />
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        
        {/* LEFT COLUMN: CORE METRICS */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 ml-1">Core Metrics</h2>
          
          {isEditing ? (
            <Card className="bg-slate-900 border-2 border-emerald-500/50 shadow-2xl shadow-emerald-500/10 space-y-4 p-6">
              <Input label="Age" type="number" className="bg-slate-800 border-slate-700 text-white" value={formData.age} onChange={(v) => setFormData({...formData, age: Number(v)})} />
              <Input label="Weight (kg)" type="number" className="bg-slate-800 border-slate-700 text-white" value={formData.weight} onChange={(v) => setFormData({...formData, weight: Number(v)})} />
              <Input label="Height (cm)" type="number" className="bg-slate-800 border-slate-700 text-white" value={formData.height} onChange={(v) => setFormData({...formData, height: Number(v)})} />
              <Select label="Goal" className="bg-slate-800 border-slate-700 text-white" value={formData.goal} onChange={(v) => setFormData({...formData, goal: v})} options={goalOptions} />
              <div className="flex gap-3 pt-4">
                <Button variant="secondary" onClick={() => setIsEditing(false)} className="flex-1 bg-slate-800 text-white hover:bg-slate-700 border-slate-600">Cancel</Button>
                <Button onClick={handleSave} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold">Save Changes</Button>
              </div>
            </Card>
          ) : (
            <div className="flex flex-col gap-4">
              <MetricRow label="Age" value={`${formData.age} yrs`} icon={<Calendar className="text-blue-400" />} />
              <MetricRow label="Weight" value={`${formData.weight} kg`} icon={<Scale className="text-emerald-400" />} />
              <MetricRow label="Height" value={`${formData.height} cm`} icon={<Ruler className="text-indigo-400" />} />
              <MetricRow label="Target" value={goalLabels[formData.goal]} icon={<Target className="text-rose-400" />} />
              
              <Button onClick={() => setIsEditing(true)} className="mt-4 bg-slate-800 hover:bg-slate text-slate-950 py-4 rounded-2xl font-black text-lg transition-transform active:scale-95">
                Edit Profile Details
              </Button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: JOURNEY STATUS */}
        <div className="lg:col-span-7">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 ml-1 mb-6">Journey Status</h2>
          
          <Card className="bg-slate-900 border border-slate-800 shadow-xl p-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-slate-800/50 border border-emerald-500/30 p-8 rounded-[2rem] text-center">
                <p className="text-5xl font-black text-emerald-400">{stats.totalFoodEntries}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Meals Logged</p>
              </div>
              <div className="bg-slate-800/50 border border-blue-500/30 p-8 rounded-[2rem] text-center">
                <p className="text-5xl font-black text-blue-400">{stats.totalActivities}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Workouts</p>
              </div>
            </div>

            {/* Timeline Rows */}
            <div className="space-y-4">
              <StatusRow label="Member Since" value={stats.startDate} icon={<Clock className="text-slate-400" />} />
              <StatusRow label="Weekly Objective" value={stats.weeklyGoalText} icon={<TrendingUp className="text-amber-400" />} />
              <StatusRow label="Est. Achievement" value={stats.achievementDate} icon={<CheckCircle2 className="text-emerald-400" />} />
            </div>

            <div className="mt-12">
                <Button variant="danger" onClick={logout} className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-red-400 bg-red-950/20 border-2 border-red-900/50 hover:bg-red-900/40 transition-all">
                    <LogOutIcon size={20} /> Log Out
                </Button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

/* ================= DARK THEME SUB-COMPONENTS ================= */

const MetricRow = ({ label, value, icon }: any) => (
  <div className="flex items-center justify-between p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:border-slate-700 transition-colors group">
    <div className="flex items-center gap-5">
      <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 group-hover:bg-slate-750">
        {icon}
      </div>
      <span className="font-bold text-slate-400">{label}</span>
    </div>
    <span className="text-xl font-black text-white">{value}</span>
  </div>
);

const StatusRow = ({ label, value, icon }: any) => (
  <div className="flex items-center gap-5 p-6 bg-slate-800/30 border border-slate-800 rounded-3xl">
    <div className="size-14 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 shadow-inner">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
      <p className="text-lg font-bold text-slate-200">{value}</p>
    </div>
  </div>
);

export default Profile;
