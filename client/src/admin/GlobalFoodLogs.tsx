
import React, { useEffect, useState } from "react";
import api from "../configs/api";

const GlobalFoodLogs = () => {

  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchFoodLogs = async () => {

      try {

        const { data } = await api.get("/admin/food-logs");

        /*
          Backend response:
          {
            success: true,
            logs: [...]
          }
        */

        setLogs(
          Array.isArray(data.logs)
            ? data.logs
            : []
        );

      } catch (err) {

        console.error("Food logs fetch error:", err);

        setLogs([]);

      } finally {

        setLoading(false);
      }
    };

    fetchFoodLogs();

  }, []);

  if (loading) {

    return (
      <div className="bg-gray-800 rounded-lg shadow-lg text-white">

        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold">
            Global Food Logs
          </h2>
        </div>

        <div className="p-6">
          <p className="text-center text-gray-400 py-10">
            Loading food logs...
          </p>
        </div>

      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg text-white">

      {/* HEADER */}
      <div className="p-6 border-b border-gray-700">

        <h2 className="text-xl font-bold">
          Global Food Logs
        </h2>

      </div>

      {/* BODY */}
      <div className="p-6">

        {logs.length === 0 ? (

          <p className="text-center text-gray-500 py-10">
            No food logs found.
          </p>

        ) : (

          <div className="space-y-4">

            {logs.map((log) => (

              <div
                key={log._id}
                className="flex justify-between items-center p-4 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-all"
              >

                {/* LEFT SIDE */}
                <div>

                  <p className="font-medium text-emerald-400 text-lg">
                    {log.foodName || log.name || "Unknown Food"}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">

                    User:

                    <span className="text-gray-300 ml-1">

                      {typeof log.userId === "object"
                        ? (
                            log.userId?.username ||
                            log.userId?.name ||
                            log.userId?.email ||
                            log.userId?._id ||
                            "Unknown User"
                          )
                        : log.userId || "Unknown User"}

                    </span>

                    <span className="mx-2">|</span>

                    Calories:

                    <span className="text-white ml-1">
                      {log.calories || 0} kcal
                    </span>

                  </p>

                </div>

                {/* RIGHT SIDE */}
                <div className="text-right">

                  <p className="font-bold text-xl text-white">

                    {log.quantity || 1}

                    <span className="text-sm font-normal text-gray-400 ml-1">
                      qty
                    </span>

                  </p>

                  <p className="text-[10px] text-gray-500 uppercase mt-1">

                    {log.date
                      ? log.date
                      : log.createdAt
                        ? new Date(log.createdAt).toLocaleDateString()
                        : "No Date"}

                  </p>

                </div>

              </div>
            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default GlobalFoodLogs;
