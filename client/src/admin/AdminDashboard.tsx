// import React, { useEffect, useState } from "react";
// import api from "../configs/api";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//   userCount: 0,
//   foodLogCount: 0,
//   activityCount: 0,
//   goalStats: [],
// });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const { data } = await api.get("/admin/dashboard-stats");
//         setStats(res.data.stats);
//       } catch (err) {
//         console.error("Stats fetch error", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, []);

//   // const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];
//  const chartData = stats.goalStats.length > 0 
//   ? stats.goalStats.map(item => ({
//       name: item._id || 'Not Set',
//       value: item.count
//     }))
//   : [{ name: "No Data", value: 1 }]; // <--- Temporary mock data so the chart appears

// const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#374151']; // Added a gray for "No Data"
//   if (loading) return <div className="p-6 text-white">Loading Stats...</div>;

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white">
//       <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-blue-600 p-6 rounded-xl shadow-lg">
//           <h3 className="text-lg opacity-80">Total Users</h3>
//           <p className="text-4xl font-bold">{stats.userCount}</p>
//         </div>
//         <div className="bg-emerald-600 p-6 rounded-xl shadow-lg">
//           <h3 className="text-lg opacity-80">Total Food Logs</h3>
//           <p className="text-4xl font-bold">{stats.foodlogCount}</p>
//         </div>
//          <div className="bg-emerald-600 p-6 rounded-xl shadow-lg">
//           <h3 className="text-lg opacity-80">Total Activity Logs</h3>
//           <p className="text-4xl font-bold">{stats.activitylogCount}</p>
//         </div>
//       </div>

//       <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
//         <h2 className="text-xl font-bold mb-4">Goal Distribution (Chats/Intent)</h2>
//         <div className="h-75">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
//                 {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
//               </Pie>
//               <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard; // <--- CRITICAL FIX FOR YOUR VITE ERROR
import React, { useEffect, useState } from "react";
import api from "../configs/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    foodLogCount: 0,
    activityCount: 0,
    goalStats: [] as any[],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/dashboard-stats");

        // ✅ FIXED
        setStats(data.stats);

      } catch (err) {
        console.error("Stats fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // ✅ SAFE CHART DATA
  const chartData =
    stats.goalStats && stats.goalStats.length > 0
      ? stats.goalStats.map((item: any) => ({
          name: item._id || "Not Set",
          value: item.count,
        }))
      : [{ name: "No Data", value: 1 }];

  const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#374151"];

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading Stats...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">
        Admin Overview
      </h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-blue-600 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg opacity-80">
            Total Users
          </h3>

          <p className="text-4xl font-bold">
            {stats.userCount}
          </p>
        </div>

        <div className="bg-emerald-600 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg opacity-80">
            Total Food Logs
          </h3>

          {/* ✅ FIXED PROPERTY NAME */}
          <p className="text-4xl font-bold">
            {stats.foodLogCount}
          </p>
        </div>

        <div className="bg-purple-600 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg opacity-80">
            Total Activity Logs
          </h3>

          {/* ✅ FIXED PROPERTY NAME */}
          <p className="text-4xl font-bold">
            {stats.activityCount}
          </p>
        </div>

      </div>

      {/* CHART */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">

        <h2 className="text-xl font-bold mb-4">
          Goal Distribution
        </h2>

        {/* ✅ FIXED HEIGHT */}
        <div className="w-full h-[350px] min-h-[350px]">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              >
                {chartData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COLORS[i % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                }}
              />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;