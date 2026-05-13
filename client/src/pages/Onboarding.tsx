import { PersonStanding, ScaleIcon, Target, CalendarDays, Ruler, CheckCircle2, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import api from "../configs/api";
import { useAppContext } from "../context/AppContext";

type Gender = "male" | "female" | "other";
type Goal = "lose" | "maintain" | "gain";

const Onboarding = () => {
  const navigate = useNavigate();
  // Ensure your AppContext exports refreshAppData or fetchProfile
  const { refreshAppData } = useAppContext(); 
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    age: "" as number | "",
    weight: "" as number | "",
    height: "" as number | "",
    gender: "male" as Gender,
  });

  const updateField = (field: string, value: string | number) => {
    const stringValue = value.toString();
    if (stringValue === "") {
      setFormData((prev) => ({ ...prev, [field]: "" }));
      return;
    }
    const num = Number(stringValue);
    setFormData((prev) => ({
      ...prev,
      [field]: isNaN(num) ? prev[field as keyof typeof formData] : num,
    }));
  };

  const bmi = useMemo(() => {
    if (!formData.height || !formData.weight) return 0;
    const h = (formData.height as number) / 100;
    return (formData.weight as number) / (h * h);
  }, [formData.height, formData.weight]);

  const recommendedGoal: Goal | null = useMemo(() => {
    if (!bmi) return null;
    if (bmi < 18.5) return "gain";
    if (bmi < 25) return "maintain";
    return "lose";
  }, [bmi]);

  const targetAchievementDate = useMemo(() => {
    if (!recommendedGoal) return null;
    const today = new Date();
    let daysToAdd = 0;

    if (recommendedGoal === "lose") daysToAdd = 90;
    else if (recommendedGoal === "gain") daysToAdd = 120;
    else daysToAdd = 30;

    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysToAdd);

    return targetDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [recommendedGoal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.age || !formData.height || !formData.weight) {
      return toast.error("Please fill in all fields");
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // 1. Submit Profile Data
      await api.post(
        "/profile",
        {
          ...formData,
          goal: recommendedGoal,
          bmi: Number(bmi.toFixed(1)),
          dailyCalorieIntake: recommendedGoal === "lose" ? 1800 : recommendedGoal === "gain" ? 2800 : 2200,
          dailyCalorieBurn: 400,
          targetSteps: 10000,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 2. IMPORTANT: Update the global context state
      // This ensures 'onboardingCompleted' becomes true in your App.tsx logic
      if (refreshAppData) {
        await refreshAppData(token);
      }

      toast.success("Fitness profile established!");

      // 3. Final Redirect
      // We use a replace: true to prevent the user from clicking 'back' into onboarding
      navigate("/app", { replace: true });
      
    } catch (err: any) {
      console.error("Onboarding Error:", err);
      const message = err.response?.data?.message || "Failed to save profile";
      toast.error(message);
      
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-8 border-b border-slate-800 bg-slate-900/30">
          <div className="flex items-center gap-3 mb-2">
            <Target className="text-emerald-500 size-7" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Set Your Baseline</h1>
          </div>
          <p className="text-slate-400">We'll use this to calculate your personalized health targets.</p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="relative">
            <CalendarDays className="absolute left-3 top-[41px] text-slate-500 size-5 z-10" />
            <Input
              label="Age"
              type="number"
              placeholder="Ex: 22"
              className="pl-10 h-12 bg-slate-800/40 border-slate-700 focus:bg-slate-800"
              value={formData.age}
              onChange={(v) => updateField("age", v)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Gender Identity</label>
            <div className="relative">
              <PersonStanding className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 size-5 z-10" />
              <select
                className="w-full bg-slate-800/40 border border-slate-700 text-white pl-10 pr-10 h-12 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none appearance-none transition-all cursor-pointer"
                value={formData.gender}
                onChange={(e) => setFormData((p) => ({ ...p, gender: e.target.value as Gender }))}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 size-4 pointer-events-none" />
            </div>
          </div>

          <div className="relative">
            <ScaleIcon className="absolute left-3 top-[41px] text-slate-500 size-5 z-10" />
            <Input
              label="Current Weight (kg)"
              type="number"
              placeholder="70"
              className="pl-10 h-12 bg-slate-800/40 border-slate-700 focus:bg-slate-800"
              value={formData.weight}
              onChange={(v) => updateField("weight", v)}
            />
          </div>

          <div className="relative">
            <Ruler className="absolute left-3 top-[41px] text-slate-500 size-5 z-10" />
            <Input
              label="Height (cm)"
              type="number"
              placeholder="175"
              className="pl-10 h-12 bg-slate-800/40 border-slate-700 focus:bg-slate-800"
              value={formData.height}
              onChange={(v) => updateField("height", v)}
            />
          </div>
        </div>

        <div className="mx-8 mb-6 p-6 bg-slate-950/50 border border-slate-800 rounded-xl grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-bold uppercase text-slate-500 tracking-widest mb-1">Body Mass Index</p>
            <p className="text-3xl font-black text-emerald-400">{bmi ? bmi.toFixed(1) : "--"}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-500 tracking-widest mb-1">Primary Focus</p>
            <p className="text-3xl font-black text-blue-400 capitalize">{recommendedGoal || "--"}</p>
          </div>
        </div>

        {targetAchievementDate && (
          <div className="mx-8 mb-8 p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center gap-4">
            <div className="bg-emerald-500/10 p-3 rounded-lg flex-shrink-0">
              <CheckCircle2 className="text-emerald-500 size-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-emerald-500/70 tracking-widest">Est. Achievement Goal</p>
              <p className="text-lg font-bold text-white leading-tight">{targetAchievementDate}</p>
            </div>
          </div>
        )}

        <div className="p-8 pt-0">
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-black text-lg rounded-xl transition-all shadow-lg shadow-emerald-900/20"
          >
            {loading ? "Optimizing Dashboard..." : "Finalize & Launch"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Onboarding;
