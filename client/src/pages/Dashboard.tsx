
import { useEffect, useState, useMemo } from "react";
import { getMotivationalMessage } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import type { ActivityEntry, FoodEntry } from "../types";
import Card from "../components/ui/Card";
import ProgressBar from "../components/ui/ProgressBar";
import { Activity, FlameIcon, HamburgerIcon, TrendingUpIcon, ZapIcon, ScaleIcon } from "lucide-react";
import CaloriesChart from "../components/CaloriesChart";

const Dashboard = () => {
  // ✅ Pulling everything from Context - no local fetch needed
  const { user, profile, allActivityLogs, allFoodLogs, refreshAppData } = useAppContext();
  
  
  const [todayFood, setTodayFood] = useState<FoodEntry[]>([]);
  const [todayActivities, setTodayActivities] = useState<ActivityEntry[]>([]);

  // 1. Initial Refresh on mount to ensure fresh data
  useEffect(() => {
    refreshAppData();
  }, [refreshAppData]);

  // 2. Logic to filter logs for TODAY whenever logs change

useEffect(() => {
  const loadUserData = () => {
    // Standardize 'today' to your local browser date string
    const date = new Date();
    const offset = date.getTimezoneOffset();
    const today = new Date(date.getTime() - (offset * 60 * 1000)).toISOString().split('T')[0];

    // Filter Food Logs
    const foodData = (allFoodLogs || []).filter((f: any) => {
      const entryDate = f.date || f.createdAt?.split('T')[0];
      return entryDate === today;
    });
    setTodayFood(foodData);

    // Filter Activity Logs (Ensuring both sync together)
    const activityData = (allActivityLogs || []).filter((a: any) => {
      const entryDate = a.date || a.createdAt?.split('T')[0];
      return entryDate === today;
    });
    setTodayActivities(activityData);
  };

  loadUserData();
}, [allFoodLogs, allActivityLogs]);


//   useEffect(() => {
//   const loadUserData = () => {
//     const date = new Date();
//     const offset = date.getTimezoneOffset();
//     const today = new Date(date.getTime() - (offset * 60 * 1000)).toISOString().split('T')[0];

//     // Filter Food
//     const foodData = (allFoodLogs || []).filter((f: any) => {
//       const entryDate = f.date || f.createdAt?.split('T')[0];
//       return entryDate === today;
//     });
//     setTodayFood(foodData);

//     // ✅ FIX: Added the missing activity filtering logic
//     const activityData = (allActivityLogs || []).filter((a: any) => {
//       const entryDate = a.date || a.createdAt?.split('T')[0];
//       return entryDate === today;
//     });
//     setTodayActivities(activityData);
//   };

//   loadUserData();
// }, [allFoodLogs, allActivityLogs]); // ✅ Added allActivityLogs here


  // 3. Dynamic Variables & Goals (Prioritizing Profile over User object)
  const DAILY_CALORIE_LIMIT: number = profile?.dailyCalorieIntake || 2000;
  const CALORIE_BURN_GOAL: number = profile?.dailyCalorieBurn || 400;
  
  const currentWeight = profile?.weight;
  const currentHeight = profile?.height;
  const currentGoal = profile?.goal;

  // 4. Calculations
  const totalCalories: number = todayFood.reduce((sum, item) => sum + (item.calories || 0), 0);
  const remainingCalories: number = DAILY_CALORIE_LIMIT - totalCalories;
  const totalActiveMinutes: number = todayActivities.reduce((sum, item) => sum + (item.duration || 0), 0);
  
  const totalBurned: number = todayActivities.reduce((sum, item: any) => {
    return sum + (item.caloriesBurned || item.calories || 0);
  }, 0);

  // Memoize motivation to prevent flickering on re-renders
  const motivation = useMemo(() => 
    getMotivationalMessage(totalCalories, totalActiveMinutes, DAILY_CALORIE_LIMIT),
    [totalCalories, totalActiveMinutes, DAILY_CALORIE_LIMIT]
  );

  return (
    <div className="page-container">
      {/* Header */}
      <div className="dashboard-header bg-emerald-600 p-8 rounded-b-3xl text-white mb-8 shadow-md">
        <p className='text-emerald-100 text-sm font-medium uppercase tracking-wider'>Welcome back</p>
        <h1 className="text-3xl font-bold mt-1">{`Hi there! 👋 ${user?.username || 'User'}`}</h1>

        <div className="mt-6 bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
          <div className="flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label="motivation-emoji">{motivation.emoji}</span>
            <p className="text-white font-medium">{motivation.text}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {/* Calories Card */}
        <Card className="shadow-lg md:col-span-2 border-none bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <HamburgerIcon className='w-6 h-6 text-orange-500'/>
              </div>
              <div>
                <p className="text-sm text-slate-500">Consumed Today</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">{totalCalories} kcal</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Target</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{DAILY_CALORIE_LIMIT}</p>
            </div>
          </div>
          <ProgressBar value={totalCalories} max={DAILY_CALORIE_LIMIT} color="bg-orange-500"/>

          <div className="mt-4 flex justify-between items-center">
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${remainingCalories >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                {remainingCalories >= 0 ? `${remainingCalories} kcal left` : `${Math.abs(remainingCalories)} kcal over`}
            </div>
            <span className="text-sm text-slate-400 font-medium">
                {Math.round((totalCalories / DAILY_CALORIE_LIMIT) * 100) || 0}%
            </span>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 my-6"></div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <FlameIcon className='w-6 h-6 text-red-500'/>
              </div>
              <div>
                <p className="text-sm text-slate-500">Activity Burn</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">{totalBurned} kcal</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Burn Goal</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{CALORIE_BURN_GOAL}</p>
            </div>
          </div>
          <ProgressBar value={totalBurned} max={CALORIE_BURN_GOAL} color="bg-red-500"/>
        </Card>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <Activity className='w-5 h-5 text-blue-500 mb-2'/>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{totalActiveMinutes}</p>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-tight">Active Mins</p>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <ZapIcon className='w-5 h-5 text-purple-500 mb-2'/>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{todayActivities.length}</p>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-tight">Workouts</p>
          </Card>
        </div>

        {/* Goal Card */}
        <Card className="bg-slate-800 dark:bg-slate-950 text-white flex items-center gap-4 hover:brightness-110 transition-all">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <TrendingUpIcon className='text-emerald-400'/>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase">Strategy</p>
              <p className="font-bold capitalize text-lg">{currentGoal || 'Set Goal'}</p>
            </div>
        </Card>

        {/* Body Metrics Card */}
        <Card className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <ScaleIcon className="text-indigo-500 w-5 h-5"/>
            <h3 className="font-bold text-slate-800 dark:text-white">Body Metrics</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Weight</span>
              <span className="font-bold text-slate-800 dark:text-white">{currentWeight ? `${currentWeight} kg` : '--'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Height</span>
              <span className="font-bold text-slate-800 dark:text-white">{currentHeight ? `${currentHeight} cm` : '--'}</span>
            </div>
            {currentWeight && currentHeight && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-500">Calculated BMI</span>
                    <span className="text-lg font-black text-emerald-500">
                        {(currentWeight / Math.pow(currentHeight / 100, 2)).toFixed(1)}
                    </span>
                 </div>
              </div>
            )}
          </div>
        </Card>
{/* Find the card in your Dashboard.tsx that holds the chart */}

<Card className="md:col-span-2 min-h-[350px] flex flex-col">
  <h3 className="font-bold mb-4">Weekly Progress</h3>

  {allFoodLogs && allActivityLogs ? (
    <div className="w-full h-[300px] min-w-0">
      <CaloriesChart />
    </div>
  ) : (
    <div className="h-[300px] flex items-center justify-center">
      Loading...
    </div>
  )}
</Card>
      </div>
    </div>
  );
};

export default Dashboard;
