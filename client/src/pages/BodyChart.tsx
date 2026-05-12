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

type BodyPoint = {
  date: string;
  weight: number;
  bmi: number;
  height?: number;
};

export default function BodyChart() {
  const navigate = useNavigate();
  const [data, setData] = useState<BodyPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Backend returns: { trend: [ {date: "Current", weight, bmi}, ... ] }
        const res = await api.get("/reports/body");
        setData(Array.isArray(res.data.trend) ? res.data.trend : []);
      } catch (err) {
        console.error("Error fetching body metrics:", err);
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
        Loading Body Metrics...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Body Report</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">No data found in your profile.</p>
          </div>
          <button
            onClick={() => navigate("/app/reports")}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700 transition-colors"
          >
            Back to Reports
          </button>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center text-slate-500">
          Complete your profile setup to see your BMI and weight analytics.
        </div>
      </div>
    );
  }

  const latest = data[data.length - 1];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Body Report</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monitor your weight progress and Body Mass Index (BMI).
          </p>
        </div>
        <button
          onClick={() => navigate("/app/reports")}
          className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700 shadow-sm"
        >
          Back to Reports
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Current Weight</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{latest.weight ?? 0} <span className="text-sm font-normal">kg</span></p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">BMI Score</p>
          <p className="text-2xl font-bold text-rose-500">{latest.bmi ?? "—"}</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Health Status</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            {latest.bmi && latest.bmi < 25 ? "Healthy" : "Overweight"}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <div style={{ width: "100%", height: 380 }}>
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
              <Legend verticalAlign="top" align="right" height={36} />
              
              {/* BMI Threshold Reference */}
              <ReferenceLine y={25} stroke="#cbd5e1" strokeDasharray="5 5" label={{ value: 'BMI 25 (Overweight)', position: 'right', fill: '#94a3b8', fontSize: 10 }} />
              
              <Line 
                name="Weight (kg)" 
                type="monotone" 
                dataKey="weight" 
                stroke="#2563eb" 
                strokeWidth={3} 
                dot={{ r: 5, fill: '#2563eb' }} 
              />
              <Line 
                name="BMI" 
                type="monotone" 
                dataKey="bmi" 
                stroke="#ef4444" 
                strokeWidth={3} 
                dot={{ r: 5, fill: '#ef4444' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}