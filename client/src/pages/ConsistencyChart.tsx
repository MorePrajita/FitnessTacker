

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// type ConsistencyPoint = {
//   lastActiveDate?: string;
//   missedDayCount?: number;
//   streakCount?: number;
// };

// export default function ConsistencyChart() {
//   const navigate = useNavigate();
//   const [data, setData] = useState<ConsistencyPoint[]>([]);
//   const [loading, setLoading] = useState(true);

//  useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const res = await fetch("http://localhost:1337/api/reports/consistency");
//       const json = await res.json();

//       console.log("=== CONSISTENCY API RESPONSE ===");
//       console.log("Full response:", json);
//       console.log("trend property:", json.trend);
//       console.log("Is trend array?", Array.isArray(json.trend));
//       console.log("First item:", json.trend?.[0]);

//       setData(Array.isArray(json.trend) ? json.trend : []);
//     } catch (err) {
//       console.error(err);
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, []);
//   if (loading) return <div className="p-4">Loading chart...</div>;

//   if (!data.length) {
//     return (
//       <div className="space-y-4">
//         <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
//           <div>
//             <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Consistency Report</h2>
//             <p className="text-sm text-slate-500 dark:text-slate-400">
//               Understand your workout streaks and missed days.
//             </p>
//           </div>
//           <button
//             onClick={() => navigate("/app/reports")}
//             className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700"
//           >
//             Back to Reports
//           </button>
//         </div>

//         <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center text-slate-500">
//           No consistency data available yet.
//         </div>
//       </div>
//     );
//   }

//   const latest = data[data.length - 1];

//   return (
//     <div className="space-y-4">
//       <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
//         <div>
//           <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Consistency Report</h2>
//           <p className="text-sm text-slate-500 dark:text-slate-400">
//             Understand your workout streaks and missed days.
//           </p>
//         </div>
//         <button
//           onClick={() => navigate("/app/reports")}
//           className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700"
//         >
//           Back to Reports
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
//           <p className="text-sm text-slate-500">Latest Streak</p>
//           <p className="text-2xl font-semibold text-slate-800 dark:text-white">{latest.streakCount ?? 0} days</p>
//         </div>
//         <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
//           <p className="text-sm text-slate-500">Missed Days</p>
//           <p className="text-2xl font-semibold text-slate-800 dark:text-white">{latest.missedDayCount ?? 0} days</p>
//         </div>
//         <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
//           <p className="text-sm text-slate-500">Last Active</p>
//           <p className="text-2xl font-semibold text-slate-800 dark:text-white">{latest.lastActiveDate ?? "—"}</p>
//         </div>
//       </div>

//       <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
//         <div style={{ width: "100%", height: 420 }}>
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="lastActiveDate" />
//               <YAxis />
//               <Tooltip
//                 labelFormatter={(label) => `Date: ${label}`}
//                 formatter={(value, name) => {
//                   if (name === "streakCount") return [`${value} days`, "Streak"];
//                   if (name === "missedDayCount") return [`${value} days`, "Missed Days"];
//                   return [value, name];
//                 }}
//               />
//               <Legend />
//               <Area type="monotone" dataKey="streakCount" stroke="#8b5cf6" fill="#c4b5fd" />
//               <Area type="monotone" dataKey="missedDayCount" stroke="#f43f5e" fill="#fda4af" />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  lastActiveDate?: string;
  missedDayCount?: number;
  streakCount?: number;
};

export default function ConsistencyChart() {
  const navigate = useNavigate();
  const [data, setData] = useState<ConsistencyPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/reports/consistency");
        const json = await res.json();

        const processedData = (Array.isArray(json.trend) ? json.trend : []).map((item: ConsistencyPoint) => {
          const rawDate = item.lastActiveDate ?? "";
          const parsed = new Date(rawDate);

          return {
            ...item,
            lastActiveDate: rawDate && !isNaN(parsed.getTime()) ? parsed.toLocaleDateString() : rawDate || "—",
          };
        });

        setData(processedData);
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
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Consistency Report</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Understand your workout streaks and missed days.
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
          No consistency data available yet.
        </div>
      </div>
    );
  }

  const latest = data[data.length - 1];

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Consistency Report</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Understand your workout streaks and missed days.
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
          <p className="text-sm text-slate-500">Latest Streak</p>
          <p className="text-2xl font-semibold text-slate-800 dark:text-white">
            {latest.streakCount ?? 0} days
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
          <p className="text-sm text-slate-500">Missed Days</p>
          <p className="text-2xl font-semibold text-slate-800 dark:text-white">
            {latest.missedDayCount ?? 0} days
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
          <p className="text-sm text-slate-500">Last Active</p>
          <p className="text-2xl font-semibold text-slate-800 dark:text-white">
            {latest.lastActiveDate ?? "—"}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <div className="w-full h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="lastActiveDate" />
              <YAxis />
              <Tooltip
                labelFormatter={(label) => `Date: ${label}`}
                formatter={(value, name) => {
                  if (name === "streakCount") return [`${value} days`, "Streak"];
                  if (name === "missedDayCount") return [`${value} days`, "Missed Days"];
                  return [value, name];
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="streakCount" stroke="#8b5cf6" fill="#c4b5fd" />
              <Area type="monotone" dataKey="missedDayCount" stroke="#f43f5e" fill="#fda4af" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
