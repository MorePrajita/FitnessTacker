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
