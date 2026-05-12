import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../configs/api"; // Adjust this path to your axios instance
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ConsistencyPoint = {
  date: string;
  logs: number; // Represents the number of entries logged on that day
};

export default function ConsistencyChart() {
  const navigate = useNavigate();
  const [data, setData] = useState<ConsistencyPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Backend returns: { trend: [ {date: "YYYY-MM-DD", logs: X}, ... ] }
        const res = await api.get("/reports/consistency");
        
        const processedData = (Array.isArray(res.data.trend) ? res.data.trend : []).map((item: ConsistencyPoint) => ({
          ...item,
          // Formatting the date string to be more readable on the X-Axis
          date: item.date !== "—" ? new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : item.date
        }));

        setData(processedData);
      } catch (err) {
        console.error("Error fetching consistency data:", err);
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mr-3"></div>
        Calculating Consistency...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Consistency Report</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Track your daily logging habits over time.
            </p>
          </div>
          <button
            onClick={() => navigate("/app/reports")}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700"
          >
            Back to Reports
          </button>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center text-slate-500">
          Log your food or activities to start generating consistency data!
        </div>
      </div>
    );
  }

  // Calculate some simple stats based on the trend
  const totalEntries = data.reduce((acc, curr) => acc + curr.logs, 0);
  const activeDays = data.filter(d => d.logs > 0).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Consistency Report</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            A visualization of your daily engagement and logging frequency.
          </p>
        </div>
        <button
          onClick={() => navigate("/app/reports")}
          className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700 transition-colors"
        >
          Back to Reports
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Logged Entries</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalEntries}</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Active Logging Days</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{activeDays}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <div className="w-full h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLogs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
              <Area 
                name="Entries Logged"
                type="monotone" 
                dataKey="logs" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorLogs)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}