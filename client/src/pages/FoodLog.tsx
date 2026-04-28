// import React, { useEffect, useRef, useState } from "react";
// import { useAppContext } from "../context/AppContext"
// import type { FoodEntry, FormData } from "../types";
// import Card from "../components/ui/Card";
// import { mealColors, mealIcons, mealTypeOptions, quickActivitiesFoodLog } from "../assets/assets";
// import Button from "../components/ui/Button";
// import { Loader2Icon, PlusIcon, SparkleIcon, Trash2Icon, UtensilsCrossedIcon } from "lucide-react";
// import Input from "../components/ui/Input";
// import Select from "../components/ui/Select";
// import toast from "react-hot-toast";
// import api from "../configs/api";


// const FoodLog = () => {
//   const {allFoodLogs, setAllFoodLogs} = useAppContext();

//   const [entries, setEntries] = useState<FoodEntry[]>([])
//   const [showForm, setShowForm] = useState(false)
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     calories: 0,
//     mealType: ''
//   })
//   const [loading, setLoading] = useState(false)
//   const inputRef = useRef<HTMLInputElement>(null)

//   const today = new Date().toISOString().split('T')[0];

//   const loadEntries = () => {
//     const todaysEntries = allFoodLogs.filter((e: FoodEntry)=> e.createdAt?.split('T')[0] === today)
//     setEntries(todaysEntries)
//   }

//   const handleSubmit = async (e: React.FormEvent)=>{
//     e.preventDefault()

//     if(!formData.name.trim() || !formData.calories || formData.calories <= 0 || !formData.mealType){
//       return toast.error('Please enter valid data')
//     }

//     try {
//       const {data} = await api.post('/api/food-logs', {data: formData})
//       setAllFoodLogs(prev => [...prev, data])
//       setFormData({name: '', calories: 0, mealType: ''})
//       setShowForm(false)
//     } catch (error: any) {
//       console.log(error);
//       toast.error(error?.response?.data?.error?.message || error?.message);
//     } 
    
//   }

//   const handleDelete = async (documentId: string)=>{
//     try {
//       const confirm = window.confirm('Are you sure you want to delete this entry?');
//       if(!confirm) return;

//       await api.delete(`/api/food-logs/${documentId}`)
//       setAllFoodLogs(prev=>prev.filter((e)=>e.documentId !== documentId))
//     } catch (error: any) {
//       console.log(error)
//       toast.error(error?.response?.data?.error?.message || error?.message);
//     }
//   }

//    const totalCalories = entries.reduce((sum, e)=> sum + e.calories, 0)

//    // Group entries by meal type
//    const groupedEntries: Record<'breakfast' | 'lunch' | 'dinner' | 'snack', FoodEntry[]> = entries.reduce((acc, entry)=>{
//     if(!acc[entry.mealType]) acc[entry.mealType] = [];
//     acc[entry.mealType].push(entry);
//     return acc;
//    }, {} as Record<'breakfast' | 'lunch' | 'dinner' | 'snack', FoodEntry[]>)

//    const handleQuickAdd = (activityName: string)=>{
//     setFormData({...formData, mealType: activityName})
//     setShowForm(true)
//    }

//    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>)=>{
//       const file = e.target.files?.[0];
//       if(!file) return;
//       setLoading(true)
//       const formData = new FormData();
//       formData.append('image', file)
//       try {
//         const {data} = await api.post('/api/image-analysis', formData);
//         const result = data.result;
//         let mealType = '';

//         const hour = new Date().getHours()

//         if(hour >= 0 && hour < 12){
//           mealType = 'breakfast';
//         } else if (hour >= 12 && hour < 16) {
//             mealType = 'lunch';
//         }else if (hour >= 16 && hour < 18) {
//             mealType = 'snack';
//         }else if (hour >= 18 && hour < 24) {
//             mealType = 'dinner';
//         }

//         if(!mealType || !result.name || !result.calories){
//           return toast.error('Missing data')
//         }

//         // Save the result to the database
//         const {data: newEntry} = await api.post('/api/food-logs', {data: {name: result.name, calories: result.calories, mealType}})
//         setAllFoodLogs(prev => [...prev, newEntry])

//         //  reset input
//         if(inputRef.current){
//           inputRef.current.value = ''
//         }
//       } catch (error: any) {
//         console.log(error);
//         toast.error(error?.response?.data?.error?.message || error?.message);
//       }finally{
//         setLoading(false);
//       }
//    }

//    useEffect(()=>{
//     (()=>{
//       loadEntries();
//     })();
//    },[allFoodLogs])

//   return (
//     <div className="page-container">
//       {/* Header */}
//       <div className='page-header'>
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Food Log</h1>
//             <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Track your daily intake</p>
//           </div>
//           <div className="text-right">
//             <p className="text-sm text-slate-500 dark:text-slate-400">Today's Total</p>
//             <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{totalCalories} kcal</p>
//           </div>
//         </div>
//       </div>

//       <div className="page-content-grid">
//         {/* Quick Add Section */}
//         {!showForm && (
//           <div className="space-y-4">
//             <Card>
//               <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-3">Quick Add</h3>
//               <div className="flex flex-wrap gap-2">
//                 {quickActivitiesFoodLog.map((activity)=>(
//                   <button onClick={()=>handleQuickAdd(activity.name)}
//                   className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors"
//                   key={activity.name}>
//                     {activity.emoji} {activity.name}
//                   </button>
//                 ))}
//               </div>
//             </Card>

//             <Button className='w-full' onClick={()=>setShowForm(true)}>
//               <PlusIcon className='size-5' />
//               Add Food Entry
//             </Button>

//             <Button className='w-full' onClick={()=>{inputRef.current?.click()}}>
//               <SparkleIcon className='size-5' />
//               AI Food Snap
//             </Button>
//             <input onChange={handleImageChange} type="file" accept="image/*" hidden ref={inputRef}/>
//             {loading && (
//               <div className="fixed inset-0 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur flex items-center justify-center z-100">
//                 <Loader2Icon className="size-8 text-emerald-600 dark:text-emerald-400 animate-spin"/>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Add Form */}
//         {showForm && (
//           <Card className="border-2 border-emerald-200 dark:border-emerald-800">
//             <h3 className="font-semibold text-slate-800 dark:text-white mb-4">New Food Entry</h3>

//             <form className="space-y-4" onSubmit={handleSubmit}>

//               <Input label="Food Name" value={formData.name} onChange={(v)=>setFormData({...formData, name: v.toString()})} placeholder="e.g., Grilled Chicken Salad" required/>

//               <Input label="Calories" type="number" value={formData.calories} onChange={(v)=>setFormData({...formData, calories: Number(v)})} placeholder="e.g., 350" required min={1}/>

//                <Select label="Meal Type" value={formData.mealType} onChange={(v)=>setFormData({...formData, mealType: v.toString()})} options={mealTypeOptions} placeholder="Select meal type" required/>

//               <div className="flex gap-3 pt-2">
//                 <Button className='flex-1' type="button" variant="secondary" onClick={()=>{setShowForm(false); setFormData({
//                   name: '',
//                   calories: 0,
//                   mealType: ''
//                 })}}>
//                   Cancel
//                 </Button>

//                 <Button type="submit" className='flex-1' >
//                   Add Entry
//                 </Button>
//               </div>
//             </form>

//           </Card>
//         )}

//          {/* Entries List */}
//          {entries.length === 0 ? (
//           <Card className="text-center py-12">
//             <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
//               <UtensilsCrossedIcon className='size-8 text-slate-400 dark:text-slate-500'/>
//             </div>
//             <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">No food logged today</h3>
//             <p className="text-slate-500 dark:text-slate-400 text-sm">Start tracking your meals to stay on target</p>
//           </Card>
//          ) : (
//           <div className="space-y-4">
//             {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType)=>{
//               const mealTypeKey = mealType as keyof typeof groupedEntries;
//               if(!groupedEntries[mealTypeKey]) return null;

//               const MealIcon = mealIcons[mealTypeKey];
//               const mealCalories = groupedEntries[mealTypeKey].reduce((sum, e)=> sum + e.calories, 0);

//               return (
//                 <Card key={mealType}>
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${mealColors[mealTypeKey]}`}>
//                         <MealIcon className='size-5' />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-slate-800 dark:text-white capitalize">{mealType}</h3>
//                         <p className="text-sm text-slate-500 dark:text-slate-400">{groupedEntries[mealTypeKey].length} items</p>
//                       </div>
//                     </div>
//                     <p className="font-semibold text-slate-700 dark:text-slate-200">{mealCalories} kcal</p>
//                   </div>

//                   <div className="space-y-2">
//                   {groupedEntries[mealTypeKey].map((entry)=>(
//                     <div key={entry.id} className="food-entry-item">
//                       <div className="flex-1">
//                         <p className="font-medium text-slate-700 dark:text-slate-200">{entry.name}</p>
//                         <p className="ext-sm text-slate-400">{ }</p>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{entry.calories} kcal</span>

//                         <button 
//                         onClick={()=> handleDelete(entry?.documentId || '')}
//                         className='p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors'>
//                           <Trash2Icon className='w-4 h-4'/>
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                   </div>
//                 </Card>
//               )
//             })}
//           </div>
//          )}
//       </div>
//     </div>
//   )
// }

// export default FoodLog

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
  rice: 205,
  banana: 105,
  apple: 95,
  egg: 78,
  milk: 122,
  bread: 80,
  chicken: 165,
  paneer: 265,
  salad: 35,
  oatmeal: 150,
  yogurt: 100,
  roti: 120,
  dal: 180,
  potato: 163,
  pizza: 285,
  burger: 354,
  pasta: 221,
  curd: 59,

  idli: 58,
  dosa: 168,
  upma: 180,
  poha: 180,
  vada: 197,
  samosa: 262,
  paratha: 260,
  chapati: 120,
  naan: 262,
  biryani: 350,
  friedrice: 330,
  pulao: 290,
  khichdi: 210,
  sambar: 100,
  rasam: 35,
  chutney: 60,

  tea: 70,
  coffee: 80,
  black_coffee: 5,
  green_tea: 2,
  buttermilk: 40,
  lassi: 180,
  juice: 110,
  orange: 62,
  mango: 135,
  grapes: 104,
  watermelon: 46,
  papaya: 55,
  pineapple: 82,
  pomegranate: 105,
  coconut: 283,
  dates: 66,

  almonds: 164,
  cashews: 157,
  peanuts: 161,
  walnuts: 185,
  raisins: 85,
  chia_seeds: 58,
  flax_seeds: 55,
  peanut_butter: 188,
  cheese: 113,
  butter: 102,
  ghee: 112,

  soup: 90,
  sandwich: 250,
  fries: 312,
  noodles: 310,
  maggi: 340,
  chow_mein: 330,
  roll: 280,
  wrap: 240,
  sprouts: 70,
  boiled_egg: 78,
  omelette: 154,
  fish: 140,
  mutton: 294,
  tofu: 76,
  soya_chunks: 345,
}

const FoodLog = () => {
  const { allFoodLogs, setAllFoodLogs } = useAppContext()
  const [entries, setEntries] = useState<FoodEntry[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    calories: 0,
    mealType: "",
  })
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const today = new Date().toISOString().split("T")[0]

  const loadEntries = () => {
    const todaysEntries = allFoodLogs.filter((e: FoodEntry) => e.createdAt?.split("T")[0] === today)
    setEntries(todaysEntries)
  }

  const detectCalories = (foodName: string) => {
    const key = foodName.trim().toLowerCase()
    return foodCalories[key] || 0
  }

  const detectMealType = (name: string) => {
    const hour = new Date().getHours()
    const lower = name.trim().toLowerCase()

    if (lower.includes("breakfast") || lower.includes("egg") || lower.includes("oatmeal") || lower.includes("bread")) return "breakfast"
    if (lower.includes("lunch") || lower.includes("rice") || lower.includes("dal") || lower.includes("roti")) return "lunch"
    if (lower.includes("snack") || lower.includes("banana") || lower.includes("apple") || lower.includes("yogurt")) return "snack"
    if (lower.includes("dinner") || lower.includes("chicken") || lower.includes("paneer") || lower.includes("pasta")) return "dinner"

    if (hour >= 0 && hour < 12) return "breakfast"
    if (hour >= 12 && hour < 16) return "lunch"
    if (hour >= 16 && hour < 18) return "snack"
    return "dinner"
  }

  const handleFoodNameChange = (value: string | number) => {
    const name = value.toString()
    const calories = detectCalories(name)
    const mealType = formData.mealType || detectMealType(name)

    setFormData((prev) => ({
      ...prev,
      name,
      calories,
      mealType,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) return toast.error("Please enter a food name")
    if (!formData.mealType) return toast.error("Please select a meal type")

    const calories = detectCalories(formData.name)
    if (!calories) return toast.error("Food not found in calorie list. Please use a common food item.")

    try {
      const { data } = await api.post("/api/food-logs", {
        data: {
          name: formData.name,
          calories,
          mealType: formData.mealType,
        },
      })
      setAllFoodLogs((prev) => [...prev, data])
      setFormData({ name: "", calories: 0, mealType: "" })
      setShowForm(false)
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.error?.message || error?.message)
    }
  }

  const handleDelete = async (documentId: string) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this entry?")
      if (!confirm) return
      await api.delete(`/api/food-logs/${documentId}`)
      setAllFoodLogs((prev) => prev.filter((e) => e.documentId !== documentId))
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.error?.message || error?.message)
    }
  }

  const handleQuickAdd = (activityName: string) => {
    const calories = detectCalories(activityName)
    setFormData({
      name: activityName,
      calories,
      mealType: detectMealType(activityName),
    })
    setShowForm(true)
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)

    const formData = new FormData()
    formData.append("image", file)

    try {
      const { data } = await api.post("/api/image-analysis", formData)
      const result = data.result
      const mealType = detectMealType(result.name || "")

      if (!mealType || !result.name || !result.calories) {
        return toast.error("Missing data")
      }

      const { data: newEntry } = await api.post("/api/food-logs", {
        data: { name: result.name, calories: result.calories, mealType },
      })

      setAllFoodLogs((prev) => [...prev, newEntry])

      if (inputRef.current) {
        inputRef.current.value = ""
      }
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.error?.message || error?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEntries()
  }, [allFoodLogs])

  const totalCalories = entries.reduce((sum, e) => sum + e.calories, 0)
  const groupedEntries: Record<"breakfast" | "lunch" | "dinner" | "snack", FoodEntry[]> = entries.reduce(
    (acc, entry) => {
      if (!acc[entry.mealType]) acc[entry.mealType] = []
      acc[entry.mealType].push(entry)
      return acc
    },
    {} as Record<"breakfast" | "lunch" | "dinner" | "snack", FoodEntry[]>
  )

  return (
    <div className="page-container">
      <div className="page-header">
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

      <div className="page-content-grid">
        {!showForm && (
          <div className="space-y-4">
            <Card>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-3">Quick Add</h3>
              <div className="flex flex-wrap gap-2">
                {quickActivitiesFoodLog.map((activity) => (
                  <button
                    type="button"
                    onClick={() => handleQuickAdd(activity.name)}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors"
                    key={activity.name}
                  >
                    {activity.emoji} {activity.name}
                  </button>
                ))}
              </div>
            </Card>

            <Button className="w-full" onClick={() => setShowForm(true)}>
              <PlusIcon className="size-5" />
              Add Food Entry
            </Button>

            <Button className="w-full" onClick={() => inputRef.current?.click()}>
              <SparkleIcon className="size-5" />
              AI Food Snap
            </Button>
            <input onChange={handleImageChange} type="file" accept="image/*" hidden ref={inputRef} />
            {loading && (
              <div className="fixed inset-0 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur flex items-center justify-center z-100">
                <Loader2Icon className="size-8 text-emerald-600 dark:text-emerald-400 animate-spin" />
              </div>
            )}
          </div>
        )}

        {showForm && (
          <Card className="border-2 border-emerald-200 dark:border-emerald-800">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4">New Food Entry</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                label="Food Name"
                value={formData.name}
                onChange={handleFoodNameChange}
                placeholder="e.g., Banana, Rice, Egg"
                required
              />

              <Input
                label="Calories"
                type="number"
                value={formData.calories}
                onChange={() => {}}
                placeholder="Auto calculated"
                required
                min={1}
                disabled
              />

              <Select
                label="Meal Type"
                value={formData.mealType}
                onChange={(v) => setFormData({ ...formData, mealType: v.toString() })}
                options={mealTypeOptions}
                placeholder="Select meal type"
                required
              />

              <div className="text-sm text-slate-500 dark:text-slate-400">
                Calories are calculated automatically from the food name.
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  className="flex-1"
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowForm(false)
                    setFormData({ name: "", calories: 0, mealType: "" })
                  }}
                >
                  Cancel
                </Button>

                <Button type="submit" className="flex-1">
                  Add Entry
                </Button>
              </div>
            </form>
          </Card>
        )}

        {entries.length === 0 ? (
          <Card className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
              <UtensilsCrossedIcon className="size-8 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">No food logged today</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Start tracking your meals to stay on target</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {["breakfast", "lunch", "dinner", "snack"].map((mealType) => {
              const mealTypeKey = mealType as keyof typeof groupedEntries
              if (!groupedEntries[mealTypeKey]) return null

              const MealIcon = mealIcons[mealTypeKey]
              const mealCalories = groupedEntries[mealTypeKey].reduce((sum, e) => sum + e.calories, 0)

              return (
                <Card key={mealType}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${mealColors[mealTypeKey]}`}>
                        <MealIcon className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 dark:text-white capitalize">{mealType}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{groupedEntries[mealTypeKey].length} items</p>
                      </div>
                    </div>
                    <p className="font-semibold text-slate-700 dark:text-slate-200">{mealCalories} kcal</p>
                  </div>

                  <div className="space-y-2">
                    {groupedEntries[mealTypeKey].map((entry) => (
                      <div key={entry.id} className="food-entry-item">
                        <div className="flex-1">
                          <p className="font-medium text-slate-700 dark:text-slate-200">{entry.name}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{entry.calories} kcal</span>
                          <button
                            type="button"
                            onClick={() => handleDelete(entry?.documentId || "")}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <Trash2Icon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodLog