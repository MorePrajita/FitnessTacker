// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// type GoalPoint = {
//   date?: string;
//   targetCalories?: number;
//   targetSteps?: number;
// };

// export default function GoalChart() {
//   const navigate = useNavigate();
//   const [data, setData] = useState<GoalPoint[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("http://localhost:1337/api/reports/goal");
//         const json = await res.json();
//         setData(json.trend || []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <div className="p-4">Loading chart...</div>;

//   const latest = data[data.length - 1];

//   return (
//     <div className="space-y-4">
//       <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
//         <div>
//           <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Goal Report</h2>
//           <p className="text-sm text-slate-500 dark:text-slate-400">
//             See your daily fitness goals for calories and steps.
//           </p>
//         </div>
//         <button
//           onClick={() => navigate("/app/reports")}
//           className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700"
//         >
//           Back to Reports
//         </button>
//       </div>

//       {latest && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
//             <p className="text-sm text-slate-500">Target Calories</p>
//             <p className="text-2xl font-semibold text-slate-800 dark:text-white">{latest.targetCalories ?? 0} kcal</p>
//           </div>
//           <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
//             <p className="text-sm text-slate-500">Target Steps</p>
//             <p className="text-2xl font-semibold text-slate-800 dark:text-white">{latest.targetSteps ?? 0} steps</p>
//           </div>
//         </div>
//       )}

//       <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
//         <div style={{ width: "100%", height: 420 }}>
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip
//                 labelFormatter={(label) => `Date: ${label}`}
//                 formatter={(value, name) => {
//                   if (name === "targetCalories") return [`${value} kcal`, "Target Calories"];
//                   if (name === "targetSteps") return [`${value} steps`, "Target Steps"];
//                   return [value, name];
//                 }}
//               />
//               <Legend
//                 formatter={(value) => {
//                   if (value === "targetCalories") return "Target Calories";
//                   if (value === "targetSteps") return "Target Steps";
//                   return value;
//                 }}
//               />
//               <Bar dataKey="targetCalories" fill="#10b981" />
//               <Bar dataKey="targetSteps" fill="#f59e0b" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  date?: string;
  targetCalories?: number;
  targetSteps?: number;
};

export default function GoalChart() {
  const navigate = useNavigate();
  const [data, setData] = useState<GoalPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/reports/goal");
        const json = await res.json();
        setData(Array.isArray(json.trend) ? json.trend : []);
      } catch (err) {
        console.error(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-4">Loading chart...</div>;

  if (!data.length) {
    return (
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Goal Report</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              See your daily fitness goals for calories and steps.
            </p>
          </div>
          <button
            onClick={() => navigate("/app/reports")}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700"
          >
            Back to Reports
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center text-slate-500">
          No goal data available yet.
        </div>
      </div>
    );
  }

  const latest = data[data.length - 1];

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Goal Report</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            See your daily fitness goals for calories and steps.
          </p>
        </div>
        <button
          onClick={() => navigate("/app/reports")}
          className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700"
        >
          Back to Reports
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
          <p className="text-sm text-slate-500">Target Calories</p>
          <p className="text-2xl font-semibold text-slate-800 dark:text-white">{latest.targetCalories ?? 0} kcal</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
          <p className="text-sm text-slate-500">Target Steps</p>
          <p className="text-2xl font-semibold text-slate-800 dark:text-white">{latest.targetSteps ?? 0} steps</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <div style={{ width: "100%", height: 420 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                labelFormatter={(label) => `Date: ${label}`}
                formatter={(value, name) => {
                  if (name === "targetCalories") return [`${value} kcal`, "Target Calories"];
                  if (name === "targetSteps") return [`${value} steps`, "Target Steps"];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar dataKey="targetCalories" fill="#10b981" />
              <Bar dataKey="targetSteps" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}