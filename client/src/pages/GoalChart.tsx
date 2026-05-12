import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../configs/api"; // Adjust this path to where your axios instance is located
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type GoalPoint = {
  date: string;
  targetCalories: number;
  targetSteps: number;
};

export default function GoalChart() {
  const navigate = useNavigate();
  const [data, setData] = useState<GoalPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Backend returns: { trend: [ {date, targetCalories, targetSteps}, ... ] }
        const res = await api.get("/reports/goal");
        setData(Array.isArray(res.data.trend) ? res.data.trend : []);
      } catch (err) {
        console.error("Error loading chart:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getProgressMessage = (latest: GoalPoint | undefined) => {
    if (!latest) return "";
    return `Your current plan is set to ${latest.targetCalories} kcal and ${latest.targetSteps} steps daily. Stay consistent to reach your goal!`;
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mr-3"></div>
        Loading Goal Analytics...
      </div>
    );
  }

  const latest = data.length > 0 ? data[data.length - 1] : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Goal Report</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Your daily fitness targets based on your profile settings.
          </p>
        </div>
        <button
          onClick={() => navigate("/app/reports")}
          className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-700 transition-colors"
        >
          Back to Reports
        </button>
      </div>

      {!data.length ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center text-slate-500">
          No goal data found. Please update your profile.
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900 shadow-sm">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Target Intake</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {latest?.targetCalories ?? 0} <span className="text-sm font-normal text-slate-400">kcal/day</span>
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900 shadow-sm">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Step Goal</p>
              <p className="text-2xl font-bold text-amber-500">
                {latest?.targetSteps ?? 0} <span className="text-sm font-normal text-slate-400">steps/day</span>
              </p>
            </div>
          </div>

          {/* Chart Container */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <div style={{ width: "100%", height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    cursor={{fill: '#f1f5f9'}}
                  />
                  <Legend verticalAlign="top" align="right" height={36}/>
                  <Bar 
                    name="Calories" 
                    dataKey="targetCalories" 
                    fill="#10b981" 
                    radius={[4, 4, 0, 0]} 
                    barSize={40}
                  />
                  <Bar 
                    name="Steps" 
                    dataKey="targetSteps" 
                    fill="#f59e0b" 
                    radius={[4, 4, 0, 0]} 
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Insight Box */}
            <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 rounded-xl border border-emerald-100 dark:border-emerald-800 flex items-center gap-3">
              <span className="text-xl">💡</span>
              <p className="text-sm font-medium">
               {latest ? getProgressMessage(latest) : ""}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}