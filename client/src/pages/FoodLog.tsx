
import React, { useEffect, useRef, useState } from "react"
import { useAppContext } from "../context/AppContext"
import type { FoodEntry, FormData } from "../types"
import Card from "../components/ui/Card"
import { mealColors, mealIcons, mealTypeOptions, quickActivitiesFoodLog } from "../assets/assets"
import Button from "../components/ui/Button"
import { Loader2Icon, PlusIcon, SparkleIcon, Trash2Icon, UtensilsCrossedIcon } from "lucide-react"
import Input from "../components/ui/Input"
import Select from "../components/ui/Select"
import toast from "react-hot-toast"
import api from "../configs/api"

const foodCalories: Record<string, number> = {
  rice: 205, banana: 105, apple: 95, egg: 78, milk: 122, bread: 80, chicken: 165, 
  paneer: 265, salad: 35, oatmeal: 150, yogurt: 100, roti: 120, dal: 180, potato: 163, pizza: 285,
  burger: 354, pasta: 221, curd: 59, idli: 58, dosa: 168, upma: 180, poha: 180, vada: 197, samosa: 262,
  paratha: 260, chapati: 120, naan: 262, biryani: 350, friedrice: 330, pulao: 290, khichdi: 210, sambar: 100,
  rasam: 35, chutney: 60, tea: 70, coffee: 80, black_coffee: 5, green_tea: 2, buttermilk: 40, lassi: 180, juice: 110, 
  orange: 62, mango: 135, grapes: 104, watermelon: 46, papaya: 55, pineapple: 82, pomegranate: 105, coconut: 283, dates: 66, 
  almonds: 164, cashews: 157, peanuts: 161, walnuts: 185, raisins: 85, chia_seeds: 58, flax_seeds: 55, peanut_butter: 188,
  cheese: 113, butter: 102, ghee: 112, soup: 90, sandwich: 250, fries: 312, noodles: 310, maggi: 340, chow_mein: 330, roll: 280,
  wrap: 240, sprouts: 70, boiled_egg: 78, omelette: 154, fish: 140, mutton: 294, tofu: 76, soya_chunks: 345,
}

const FoodLog = () => {
  const { allFoodLogs, setAllFoodLogs, refreshAppData } = useAppContext();
  const [entries, setEntries] = useState<FoodEntry[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    calories: 0,
    mealType: "",
  })
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Use Local Date string (YYYY-MM-DD) to avoid UTC day-shift bugs
  const today = new Date().toLocaleDateString('en-CA'); 

  useEffect(() => {
    if (allFoodLogs) {
      console.log("All Food Logs Received:", allFoodLogs);
      const todaysEntries = allFoodLogs.filter((e: FoodEntry) => {
        if (!e.createdAt) return false;
        // Compare only the YYYY-MM-DD part
        return e.createdAt.split("T")[0] === today;
      });
      setEntries(todaysEntries);
    }
  }, [allFoodLogs, today]);

  const detectCalories = (foodName: string) => {
    const key = foodName.trim().toLowerCase()
    return foodCalories[key] || 0
  }

  const detectMealType = (name: string) => {
    const hour = new Date().getHours()
    const lower = name.trim().toLowerCase()
    if (lower.includes("breakfast") || lower.includes("egg") || lower.includes("oatmeal")) return "breakfast"
    if (lower.includes("lunch") || lower.includes("rice") || lower.includes("dal")) return "lunch"
    if (lower.includes("snack") || lower.includes("banana") || lower.includes("apple")) return "snack"
    if (lower.includes("dinner") || lower.includes("chicken") || lower.includes("paneer")) return "dinner"
    if (hour >= 5 && hour < 12) return "breakfast"
    if (hour >= 12 && hour < 16) return "lunch"
    if (hour >= 16 && hour < 19) return "snack"
    return "dinner"
  }

  const handleFoodNameChange = (value: string | number) => {
    const name = value.toString()
    const calories = detectCalories(name)
    const mealType = detectMealType(name)
    setFormData((prev) => ({ ...prev, name, calories, mealType }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error("Please enter a food name");

    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/food-log", 
        {
          name: formData.name,
          calories: formData.calories || detectCalories(formData.name),
          mealType: formData.mealType
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (refreshAppData) {
        await refreshAppData();
      } else {
        setAllFoodLogs((prev: any[]) => [...(prev || []), response.data]);
      }

      setFormData({ name: "", calories: 0, mealType: "" });
      setShowForm(false);
      toast.success("Food logged successfully!");
    } catch (error: any) {
      console.error("Submit Error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to save entry");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/food-log/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (refreshAppData) {
        await refreshAppData();
      } else {
        setAllFoodLogs((prev: any[]) => (prev || []).filter((e) => e._id !== id));
      }
      toast.success("Entry deleted");
    } catch (error: any) {
      toast.error("Delete failed. Check permissions.");
    }
  };

  const handleQuickAdd = (activityName: string) => {
    const calories = detectCalories(activityName)
    setFormData({ name: activityName, calories, mealType: detectMealType(activityName) })
    setShowForm(true)
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    const form = new FormData()
    form.append("image", file)
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.post("/api/image-analysis", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = data.result
      const mealType = detectMealType(result.name || "")
      
      const response = await api.post("/food-log", {
        name: result.name, calories: result.calories, mealType 
      }, { headers: { Authorization: `Bearer ${token}` } });

      if (refreshAppData) await refreshAppData();
      else setAllFoodLogs((prev: any[]) => [...(prev || []), response.data]);
      
      if (inputRef.current) inputRef.current.value = ""
      toast.success("AI Logged: " + result.name);
    } catch (error: any) {
      toast.error("AI Analysis failed");
    } finally {
      setLoading(false)
    }
  }

  const totalCalories = entries.reduce((sum, e) => sum + e.calories, 0)

  const groupedEntries = entries.reduce((acc: any, entry) => {
    const type = entry.mealType || "snack";
    if (!acc[type]) acc[type] = [];
    acc[type].push(entry);
    return acc;
  }, {});

  return (
    <div className="page-container p-4 max-w-6xl mx-auto">
      <div className="page-header mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Food Log</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Track your daily intake</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400">Today's Total</p>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{totalCalories} kcal</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          {!showForm ? (
            <>
              <Card className="p-4">
                <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-3">Quick Add</h3>
                <div className="flex flex-wrap gap-2">
                  {quickActivitiesFoodLog.map((activity) => (
                    <button
                      key={activity.name}
                      onClick={() => handleQuickAdd(activity.name)}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 rounded-lg text-xs font-medium transition-colors"
                    >
                      {activity.emoji} {activity.name}
                    </button>
                  ))}
                </div>
              </Card>
              <Button className="w-full flex items-center justify-center gap-2" onClick={() => setShowForm(true)}>
                <PlusIcon className="size-5" /> Add Food Entry
              </Button>
              {/* <Button variant="secondary" className="w-full flex items-center justify-center gap-2" onClick={() => inputRef.current?.click()}>
                <SparkleIcon className="size-5 text-emerald-500" /> AI Food Snap
              </Button> */}
              <input onChange={handleImageChange} type="file" accept="image/*" hidden ref={inputRef} />
            </>
          ) : (
            <Card className="p-4 border-2 border-emerald-500/20">
              <h3 className="font-semibold mb-4">New Food Entry</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <Input label="Food Name" value={formData.name} onChange={handleFoodNameChange} placeholder="Search food..." required />
                <Input label="Calories" type="number" value={formData.calories} onChange={(v) => setFormData({...formData, calories: Number(v)})} required />
                <Select label="Meal Type" value={formData.mealType} onChange={(v) => setFormData({ ...formData, mealType: v.toString() })} options={mealTypeOptions} required />
                <div className="flex gap-2">
                  <Button className="flex-1" type="button" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
                  <Button type="submit" className="flex-1">Add</Button>
                </div>
              </form>
            </Card>
          )}
        </div>

        <div className="md:col-span-2">
          {entries.length === 0 ? (
            <Card className="text-center py-16">
              <UtensilsCrossedIcon className="size-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No food logged for today yet.</p>
            </Card>
          ) : (
            <div className="space-y-6">
              {["breakfast", "lunch", "dinner", "snack"].map((type) => {
                const logs = groupedEntries[type] || [];
                if (logs.length === 0) return null;
                const Icon = mealIcons[type as keyof typeof mealIcons];
                const subtotal = logs.reduce((s: number, e: any) => s + e.calories, 0);

                return (
                  <div key={type} className="space-y-2">
                    <div className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-2">
                        <Icon className="size-5 text-emerald-500" />
                        <h3 className="font-bold capitalize text-slate-700 dark:text-slate-200">{type}</h3>
                      </div>
                      <span className="text-sm font-medium text-slate-500">{subtotal} kcal</span>
                    </div>
                    {logs.map((entry: any) => (
                      <Card key={entry._id} className="p-3 flex items-center justify-between">
                        <span className="font-medium">{entry.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-emerald-600 font-semibold">{entry.calories} kcal</span>
                          <button onClick={() => handleDelete(entry._id)} className="text-slate-400 hover:text-red-500">
                            <Trash2Icon className="size-4" />
                          </button>
                        </div>
                      </Card>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Loader2Icon className="size-10 text-white animate-spin" />
        </div>
      )}
    </div>
  )
}

export default FoodLog;
