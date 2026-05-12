import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../configs/api"; // Adjust this path to your axios instance
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

type ActivityPoint = {
  date: string;
  caloriesBurned: number;
  steps?: number; // Optional until you add step tracking to your model
  activeMinutes?: number;
};

export default function ActivityChart() {
  const navigate = useNavigate();
  const [data, setData] = useState<ActivityPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Backend returns: { trend: [ {date, caloriesBurned}, ... ] }
        const res = await api.get("/reports/activity");
        setData(Array.isArray(res.data.trend) ? res.data.trend : []);
      } catch (err) {
        console.error("Error loading activity chart:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
        Loading Activity Data...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Activity Report</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">No logs found for the selected period.</p>
          </div>
          <button
            onClick={() => navigate("/app/reports")}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700 transition-colors"
          >
            Back to Reports
          </button>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center text-slate-500">
          Start logging your exercises to see your activity trends!
        </div>
      </div>
    );
  }

  const latest = data[data.length - 1];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Activity Report</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real-time tracking of your calories burned from logged activities.
          </p>
        </div>
        <button
          onClick={() => navigate("/app/reports")}
          className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700"
        >
          Back to Reports
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900 shadow-sm">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Most Recent Session</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {latest.caloriesBurned} <span className="text-sm font-normal text-slate-400">kcal burned</span>
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900 shadow-sm">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Logged Date</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{latest.date}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              />
              <Legend verticalAlign="top" align="right" height={36}/>
              
              {/* Only showing caloriesBurned as that's what is in your ActivityLog model */}
              <Line 
                name="Calories Burned" 
                type="monotone" 
                dataKey="caloriesBurned" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#3b82f6' }} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}