// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   ReferenceLine,
// } from "recharts";

// type BodyPoint = {
//   date?: string;
//   weight?: number;
//   height?: number;
//   bmi?: number | null;
// };

// export default function BodyChart() {
//   const navigate = useNavigate();
//   const [data, setData] = useState<BodyPoint[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("http://localhost:1337/api/reports/body");
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
//           <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Body Report</h2>
//           <p className="text-sm text-slate-500 dark:text-slate-400">
//             View your body trend using weight and BMI over time.
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
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
//             <p className="text-sm text-slate-500">Latest Weight</p>
//             <p className="text-2xl font-semibold text-slate-800 dark:text-white">{latest.weight ?? 0} kg</p>
//           </div>
//           <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
//             <p className="text-sm text-slate-500">Latest Height</p>
//             <p className="text-2xl font-semibold text-slate-800 dark:text-white">{latest.height ?? 0} cm</p>
//           </div>
//           <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
//             <p className="text-sm text-slate-500">Latest BMI</p>
//             <p className="text-2xl font-semibold text-slate-800 dark:text-white">{latest.bmi ?? "—"}</p>
//           </div>
//         </div>
//       )}

//       <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
//         <div style={{ width: "100%", height: 420 }}>
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip
//                 labelFormatter={(label) => `Date: ${label}`}
//                 formatter={(value, name) => {
//                   if (name === "weight") return [`${value} kg`, "Weight"];
//                   if (name === "bmi") return [value, "BMI"];
//                   return [value, name];
//                 }}
//               />
//               <Legend
//                 formatter={(value) => {
//                   if (value === "weight") return "Weight";
//                   if (value === "bmi") return "BMI";
//                   return value;
//                 }}
//               />
//               <ReferenceLine y={25} stroke="#94a3b8" strokeDasharray="4 4" label="BMI 25" />
//               <Line type="monotone" dataKey="weight" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
//               <Line type="monotone" dataKey="bmi" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  date?: string;
  weight?: number;
  height?: number;
  bmi?: number | null;
};

export default function BodyChart() {
  const navigate = useNavigate();
  const [data, setData] = useState<BodyPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/reports/body");
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
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Body Report</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              View your body trend using weight and BMI over time.
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
          No body data available yet.
        </div>
      </div>
    );
  }

  const latest = data[data.length - 1];

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Body Report</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            View your body trend using weight and BMI over time.
          </p>
        </div>
        <button
          onClick={() => navigate("/app/reports")}
          className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700"
        >
          Back to Reports
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
          <p className="text-sm text-slate-500">Latest Weight</p>
          <p className="text-2xl font-semibold text-slate-800 dark:text-white">{latest.weight ?? 0} kg</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
          <p className="text-sm text-slate-500">Latest Height</p>
          <p className="text-2xl font-semibold text-slate-800 dark:text-white">{latest.height ?? 0} cm</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
          <p className="text-sm text-slate-500">Latest BMI</p>
          <p className="text-2xl font-semibold text-slate-800 dark:text-white">{latest.bmi ?? "—"}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <div style={{ width: "100%", height: 420 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                labelFormatter={(label) => `Date: ${label}`}
                formatter={(value, name) => {
                  if (name === "weight") return [`${value} kg`, "Weight"];
                  if (name === "bmi") return [value, "BMI"];
                  return [value, name];
                }}
              />
              <Legend />
              <ReferenceLine y={25} stroke="#94a3b8" strokeDasharray="4 4" label="BMI 25" />
              <Line type="monotone" dataKey="weight" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="bmi" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}