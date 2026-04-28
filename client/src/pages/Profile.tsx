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
import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import Card from "../components/ui/Card";
import {
  Calendar,
  LogOutIcon,
  MoonIcon,
  Scale,
  SunIcon,
  Target,
  User,
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
    fetchUser,
    allFoodLogs,
    allActivityLogs,
  } = useAppContext();

  const { theme, toggleTheme } = useTheme();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    age: 0,
    weight: 0,
    height: 0,
    goal: "maintain",
    dailyCalorieIntake: 2000,
    dailyCalorieBurn: 400,
  });

  /* ================= LOAD USER DATA ================= */

  useEffect(() => {
    if (user) {
      setFormData({
        age: user?.age || 0,
        weight: user?.weight || 0,
        height: user?.height || 0,
        goal: user?.goal || "maintain",
        dailyCalorieIntake: user?.dailyCalorieIntake || 2000,
        dailyCalorieBurn: user?.dailyCalorieBurn || 400,
      });
    }
  }, [user]);

  /* ================= SAVE ================= */

  const handleSave = async () => {
    try {
      await api.put(`/api/users/${user?.id}`, formData);
      await fetchUser(user?.token || "");
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Failed to update profile");
    }
  };

  /* ================= STATS ================= */

  const stats = useMemo(() => {
    const totalFoodEntries = allFoodLogs?.length || 0;
    const totalActivities = allActivityLogs?.length || 0;

    const weeklyWeightChange =
      typeof profile?.weeklyWeightChange === "number"
        ? profile.weeklyWeightChange
        : null;

    const weeklyCalorieSurplus =
      typeof profile?.weeklyCalorieSurplus === "number"
        ? profile.weeklyCalorieSurplus
        : null;

    const weeklyCalorieDeficit =
      typeof profile?.weeklyCalorieDeficit === "number"
        ? profile.weeklyCalorieDeficit
        : null;

    const goalEndDate = profile?.goalEndDate
      ? new Date(profile.goalEndDate)
      : null;

    const currentWeight = Number(profile?.weight ?? user?.weight ?? 0);
    const targetWeight = Number(profile?.targetWeight ?? 0);

    const achievedByWeight =
      targetWeight > 0
        ? Math.abs(currentWeight - targetWeight) <= 0.1
        : false;

    const achievedByDate =
      goalEndDate ? new Date() >= goalEndDate : false;

    return {
      totalFoodEntries,
      totalActivities,
      weeklyWeightChange,
      weeklyCalorieSurplus,
      weeklyCalorieDeficit,
      goalEndDate,
      achieved: achievedByWeight || achievedByDate,
    };
  }, [allFoodLogs, allActivityLogs, profile, user]);

  if (!user) return null;

  /* ================= UI ================= */

  return (
    <div className="page-container">
      {/* HEADER */}
      <div className="page-header">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Profile
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Manage your settings
        </p>
      </div>

      <div className="profile-content grid gap-4 lg:grid-cols-3">
        {/* ================= PROFILE CARD ================= */}

        <Card className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="size-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <User className="size-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                Your Profile
              </h2>
              <p className="text-xs text-slate-500">
                Member since{" "}
                {new Date(user?.createdAt || "").toLocaleDateString()}
              </p>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <Input
                label="Age"
                type="number"
                value={formData.age}
                onChange={(v) =>
                  setFormData({ ...formData, age: Number(v) })
                }
              />

              <Input
                label="Weight (kg)"
                type="number"
                value={formData.weight}
                onChange={(v) =>
                  setFormData({ ...formData, weight: Number(v) })
                }
              />

              <Input
                label="Height (cm)"
                type="number"
                value={formData.height}
                onChange={(v) =>
                  setFormData({ ...formData, height: Number(v) })
                }
              />

              <Select
                label="Goal"
                value={formData.goal}
                onChange={(v) =>
                  setFormData({ ...formData, goal: v })
                }
                options={goalOptions}
              />

              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>

                <Button onClick={handleSave} className="flex-1">
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <Info label="Age" value={`${user.age} years`} icon={<Calendar />} />
                <Info label="Weight" value={`${user.weight} kg`} icon={<Scale />} />
                <Info label="Height" value={`${user.height} cm`} icon={<User />} />
                <Info
                  label="Goal"
                  value={goalLabels[user.goal] || user.goal}
                  icon={<Target />}
                />
              </div>

              <Button
                variant="secondary"
                onClick={() => setIsEditing(true)}
                className="w-full mt-4"
              >
                Edit Profile
              </Button>
            </>
          )}
        </Card>

        {/* ================= STATS ================= */}

        <Card>
          <h3 className="font-semibold text-slate-800 dark:text-white mb-4">
            Your Stats
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <StatBox label="Food" value={stats.totalFoodEntries} color="emerald" />
            <StatBox label="Activities" value={stats.totalActivities} color="blue" />
          </div>

          {/* <StatFull
            label="Weekly Calories"
            value={
              stats.weeklyCalorieDeficit ??
              stats.weeklyCalorieSurplus ??
              "No data"
            }
            color="amber"
          /> */}

          <StatFull
            label="Weekly Weight Change"
            value={
              stats.weeklyWeightChange !== null
                ? `${stats.weeklyWeightChange.toFixed(1)} kg`
                : "No data"
            }
            color="violet"
          />

          <StatFull
            label="Goal Completion"
            value={
              stats.goalEndDate
                ? stats.goalEndDate.toLocaleDateString()
                : "--"
            }
            color="indigo"
          />

          <StatFull
            label="Status"
            value={stats.achieved ? "Achieved ✅" : "Not Yet ❌"}
            color={stats.achieved ? "green" : "red"}
          />
        </Card>

        {/* ================= SETTINGS ================= */}

        <div className="lg:col-span-3 space-y-3">
          {/* <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-2 w-full rounded-lg bg-slate-100 dark:bg-slate-800"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button> */}

          <Button variant="danger" onClick={logout} className="w-full">
            <LogOutIcon className="size-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ================= SMALL COMPONENTS ================= */

const Info = ({ label, value, icon }: any) => (
  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
    {icon}
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

const StatBox = ({ label, value, color }: any) => (
  <div className={`p-4 rounded-xl text-center bg-${color}-50`}>
    <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
    <p className="text-sm text-slate-500">{label}</p>
  </div>
);

const StatFull = ({ label, value, color }: any) => (
  <div className={`mt-4 p-4 rounded-xl text-center bg-${color}-50`}>
    <p className={`text-xl font-bold text-${color}-600`}>{value}</p>
    <p className="text-sm text-slate-500">{label}</p>
  </div>
);

export default Profile;
