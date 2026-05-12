// // // // import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
// // // // import { useAppContext } from '../context/AppContext';

// // // // const CaloriesChart = () => {

// // // //     const { allActivityLogs, allFoodLogs } = useAppContext();

// // // //     const getData = () => {
// // // //         const data = [];
// // // //         const today = new Date();

// // // //         for (let i = 6; i >= 0; i--) {
// // // //             const date = new Date(today);
// // // //             date.setDate(today.getDate() - i);
// // // //             const dateString = date.toISOString().split('T')[0];
// // // //             const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

// // // //             const dailyFood = allFoodLogs.filter(log => log.createdAt?.split('T')[0] === dateString);
// // // //             const dailyActivity = allActivityLogs.filter(log => log.createdAt?.split('T')[0] === dateString);

// // // //             const intake = dailyFood.reduce((sum, item) => sum + item.calories, 0);
// // // //             const burn = dailyActivity.reduce((sum, item) => sum + (item.calories || 0), 0);

// // // //             data.push({
// // // //                 name: dayName,
// // // //                 Intake: intake,
// // // //                 Burn: burn,
// // // //                 date: dateString
// // // //             });
// // // //         }
// // // //         return data;
// // // //     };

// // // //     const data = getData();

// // // //     return (
// // // //         <div className="w-full h-[300px] mt-4">
// // // //             <ResponsiveContainer width="100%" height="100%">
// // // //                 <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
// // // //                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
// // // //                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} className="dark:text-slate-400" />
// // // //                     <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} className="dark:text-slate-400" />
// // // //                     <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
// // // //                     <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
// // // //                     <Bar dataKey="Intake" fill="#10b981" radius={[4, 4, 0, 0]} barSize={12} name="Intake" />
// // // //                     <Bar dataKey="Burn" fill="#f97316" radius={[4, 4, 0, 0]} barSize={12} name="Burn" />
// // // //                 </BarChart>
// // // //             </ResponsiveContainer>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default CaloriesChart;
// // // import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
// // // import { useAppContext } from '../context/AppContext';

// // // const CaloriesChart = () => {

// // //     const { allActivityLogs, allFoodLogs } = useAppContext();

// // //     const getData = () => {
// // //         const data = [];
// // //         const today = new Date();

// // //         // ✅ FIX: Ensure logs are at least an empty array so .filter doesn't crash
// // //         const safeFoodLogs = allFoodLogs || [];
// // //         const safeActivityLogs = allActivityLogs || [];

// // //         for (let i = 6; i >= 0; i--) {
// // //             const date = new Date(today);
// // //             date.setDate(today.getDate() - i);
// // //             const dateString = date.toISOString().split('T')[0];
// // //             const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

// // //             // Using the safe arrays here
// // //             const dailyFood = safeFoodLogs.filter(log => log.createdAt?.split('T')[0] === dateString);
// // //             const dailyActivity = safeActivityLogs.filter(log => log.createdAt?.split('T')[0] === dateString);

// // //             const intake = dailyFood.reduce((sum, item) => sum + (item.calories || 0), 0);
// // //             const burn = dailyActivity.reduce((sum, item) => sum + (item.calories || 0), 0);

// // //             data.push({
// // //                 name: dayName,
// // //                 Intake: intake,
// // //                 Burn: burn,
// // //                 date: dateString
// // //             });
// // //         }
// // //         return data;
// // //     };

// // //     const data = getData();

// // // return (
// // //     /* ✅ FIX: Added explicit height and minWidth to prevent -1 calculation */
// // //     <div style={{ width: '100%', height: '300px', minWidth: '0px' }} className="mt-4">
// // //         <ResponsiveContainer width="100%" height="100%">
// // //             <BarChart 
// // //                 data={data.length > 0 ? data : []} 
// // //                 margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
// // //             >
// // //                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
// // //                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
// // //                 <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
// // //                 <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
// // //                 <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
// // //                 <Bar dataKey="Intake" fill="#10b981" radius={[4, 4, 0, 0]} barSize={12} name="Intake" />
// // //                 <Bar dataKey="Burn" fill="#f97316" radius={[4, 4, 0, 0]} barSize={12} name="Burn" />
// // //             </BarChart>
// // //         </ResponsiveContainer>
// // //     </div>
// // // );
// // // };

// // // export default CaloriesChart;
// // import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
// // import { useAppContext } from '../context/AppContext';

// // const CaloriesChart = () => {
// //     // 1. Pulling logs from context
// //     const { allActivityLogs, allFoodLogs } = useAppContext();


// //     const getData = () => {
// //         const chartDataArray = [];
// //         const today = new Date();

// //         // ✅ SAFEGUARD: Ensure logs are at least an empty array before filtering
// //         const safeFoodLogs = allFoodLogs || [];
// //         const safeActivityLogs = allActivityLogs || [];

// //         for (let i = 6; i >= 0; i--) {
// //             const date = new Date(today);
// //             date.setDate(today.getDate() - i);
// //             const dateString = date.toISOString().split('T')[0];
// //             const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

// //             // Filter logs by date
// //             const dailyFood = safeFoodLogs.filter(log => 
// //                 (log.date === dateString || log.createdAt?.split('T')[0] === dateString)
// //             );
// //             const dailyActivity = safeActivityLogs.filter(log => 
// //                 (log.date === dateString || log.createdAt?.split('T')[0] === dateString)
// //             );

// //             // Calculate totals for the day
// //             const intake = dailyFood.reduce((sum, item) => sum + (item.calories || 0), 0);
            
// //             // ✅ BACKEND SYNC: Support both 'calories' and 'caloriesBurned' keys
// //             const burn = dailyActivity.reduce((sum, item: any) => 
// //                 sum + (item.caloriesBurned || item.calories || 0), 0
// //             );

// //             chartDataArray.push({
// //                 name: dayName,
// //                 Intake: intake,
// //                 Burn: burn,
// //                 date: dateString
// //             });
// //         }
// //         return chartDataArray;
// //     };

// //     // ✅ FIXED: Variable is named 'data' to match your JSX below
// //     const data = getData();

// //     return (
// //         <div style={{ width: '100%', height: '300px' }}>
// //         /* ✅ FIX: Add an aspect ratio as a fallback for the ResponsiveContainer */
// //         <ResponsiveContainer width="100%" height="100%" aspect={2} minWidth={0}>
// //             <BarChart 
// //                 data={data} 
// //                 margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
// //             >
// //                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
// //                 <XAxis dataKey="name" axisLine={false} tickLine={false} />
// //                 <YAxis axisLine={false} tickLine={false} />
// //                 <Tooltip cursor={{ fill: 'transparent' }} />
// //                 <Legend iconType="circle" />
// //                 <Bar dataKey="Intake" fill="#10b981" radius={[4, 4, 0, 0]} barSize={12} />
// //                 <Bar dataKey="Burn" fill="#f97316" radius={[4, 4, 0, 0]} barSize={12} />
// //             </BarChart>
// //         </ResponsiveContainer>
// //         </div>
// //     );

// //     // return (
// //     //     /* ✅ FIX: minWidth: 0 and explicit height stops the -1 width/height error */
// //     //     <div style={{ width: '100%', height: '300px', minWidth: '0px', position: 'relative' }} className="mt-4">
// //     //         <ResponsiveContainer width="100%" height="100%">
// //     //             <BarChart 
// //     //                 data={data} 
// //     //                 margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
// //     //             >
// //     //                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
// //     //                 <XAxis 
// //     //                     dataKey="name" 
// //     //                     axisLine={false} 
// //     //                     tickLine={false} 
// //     //                     tick={{ fill: '#64748b', fontSize: 12 }} 
// //     //                 />
// //     //                 <YAxis 
// //     //                     axisLine={false} 
// //     //                     tickLine={false} 
// //     //                     tick={{ fill: '#64748b', fontSize: 12 }} 
// //     //                 />
// //     //                 <Tooltip 
// //     //                     cursor={{ fill: 'transparent' }} 
// //     //                     contentStyle={{ 
// //     //                         borderRadius: '12px', 
// //     //                         border: 'none', 
// //     //                         boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
// //     //                     }} 
// //     //                 />
// //     //                 <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
// //     //                 <Bar dataKey="Intake" fill="#10b981" radius={[4, 4, 0, 0]} barSize={12} name="Intake" />
// //     //                 <Bar dataKey="Burn" fill="#f97316" radius={[4, 4, 0, 0]} barSize={12} name="Burn" />
// //     //             </BarChart>
// //     //         </ResponsiveContainer>
// //     //     </div>
// //     // );
// // };

// // export default CaloriesChart;

// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
// import { useAppContext } from '../context/AppContext';

// const CaloriesChart = () => {
//     // 1. Pulling logs from context
//     const { allActivityLogs, allFoodLogs } = useAppContext();

//     const getData = () => {
//         const chartDataArray = [];
//         const today = new Date();

//         // ✅ SAFEGUARD: Ensure logs are at least an empty array before filtering
//         const safeFoodLogs = allFoodLogs || [];
//         const safeActivityLogs = allActivityLogs || [];

//         for (let i = 6; i >= 0; i--) {
//             const date = new Date(today);
//             date.setDate(today.getDate() - i);
//             const dateString = date.toISOString().split('T')[0];
//             const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

//             // Filter logs by date
//             const dailyFood = safeFoodLogs.filter(log => 
//                 (log.date === dateString || log.createdAt?.split('T')[0] === dateString)
//             );
//             const dailyActivity = safeActivityLogs.filter(log => 
//                 (log.date === dateString || log.createdAt?.split('T')[0] === dateString)
//             );

//             // Calculate totals for the day
//             const intake = dailyFood.reduce((sum, item) => sum + (item.calories || 0), 0);
            
//             // ✅ BACKEND SYNC: Support both 'calories' and 'caloriesBurned' keys
//             const burn = dailyActivity.reduce((sum, item: any) => 
//                 sum + (item.caloriesBurned || item.calories || 0), 0
//             );

//             chartDataArray.push({
//                 name: dayName,
//                 Intake: intake,
//                 Burn: burn,
//                 date: dateString
//             });
//         }
//         return chartDataArray;
//     };

//     const data = getData();

//     return (
//         // ✅ FIX: Fixed height on parent div to prevent calculation errors
//         <div style={{ width: '100%', minWidth: '0px' }}>
//   <ResponsiveContainer width="100%" aspect={2}>
//     <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
//       <XAxis dataKey="name" axisLine={false} tickLine={false} />
//       <YAxis axisLine={false} tickLine={false} />
//       <Tooltip cursor={{ fill: 'transparent' }} />
//       <Legend iconType="circle" />
//       <Bar dataKey="Intake" fill="#10b981" radius={[4, 4, 0, 0]} barSize={12} />
//       <Bar dataKey="Burn" fill="#f97316" radius={[4, 4, 0, 0]} barSize={12} />
//     </BarChart>
//   </ResponsiveContainer>
// </div>
//         // <div style={{ width: '100%', height: '300px', minWidth: '0px' }}>
//         //     <ResponsiveContainer width="100%" height="100%" aspect={2} debounce={50}>
//         //         <BarChart 
//         //             data={data} 
//         //             margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
//         //         >
//         //             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
//         //             <XAxis 
//         //                 dataKey="name" 
//         //                 axisLine={false} 
//         //                 tickLine={false} 
//         //                 tick={{ fill: '#64748b', fontSize: 12 }} 
//         //             />
//         //             <YAxis 
//         //                 axisLine={false} 
//         //                 tickLine={false} 
//         //                 tick={{ fill: '#64748b', fontSize: 12 }} 
//         //             />
//         //             <Tooltip cursor={{ fill: 'transparent' }} />
//         //             <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
//         //             <Bar dataKey="Intake" fill="#10b981" radius={[4, 4, 0, 0]} barSize={12} />
//         //             <Bar dataKey="Burn" fill="#f97316" radius={[4, 4, 0, 0]} barSize={12} />
//         //         </BarChart>
//         //     </ResponsiveContainer>
//         // </div>
//     );
// };

// export default CaloriesChart;
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";

const CaloriesChart = () => {
  const { allActivityLogs, allFoodLogs } = useAppContext();

  // ✅ FIX 1: Delay render until layout is ready
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // ⛔ Prevent early render (this avoids -1 width bug)
  if (!ready) return null;

  const getData = () => {
    const chartDataArray: any[] = [];
    const today = new Date();

    const safeFoodLogs = allFoodLogs || [];
    const safeActivityLogs = allActivityLogs || [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const dateString = date.toISOString().split("T")[0];
      const dayName = date.toLocaleDateString("en-US", {
        weekday: "short",
      });

      const dailyFood = safeFoodLogs.filter(
        (log: any) =>
          log.date === dateString ||
          log.createdAt?.split("T")[0] === dateString
      );

      const dailyActivity = safeActivityLogs.filter(
        (log: any) =>
          log.date === dateString ||
          log.createdAt?.split("T")[0] === dateString
      );

      const intake = dailyFood.reduce(
        (sum: number, item: any) => sum + (item.calories || 0),
        0
      );

      const burn = dailyActivity.reduce(
        (sum: number, item: any) =>
          sum + (item.caloriesBurned || item.calories || 0),
        0
      );

      chartDataArray.push({
        name: dayName,
        Intake: intake,
        Burn: burn,
        date: dateString,
      });
    }

    return chartDataArray;
  };

  const data = getData();

  return (
    // ✅ FIX 2: Fixed height container (no % issues)
    <div style={{ width: "100%", height: "300px", minWidth: 0 }}>
      {/* ✅ FIX 3: NO aspect, NO height="100%" */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />

          <Tooltip cursor={{ fill: "transparent" }} />

          <Legend iconType="circle" wrapperStyle={{ paddingTop: "10px" }} />

          <Bar
            dataKey="Intake"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
            barSize={12}
            name="Intake"
          />

          <Bar
            dataKey="Burn"
            fill="#f97316"
            radius={[4, 4, 0, 0]}
            barSize={12}
            name="Burn"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CaloriesChart;