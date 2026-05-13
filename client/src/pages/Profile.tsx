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
