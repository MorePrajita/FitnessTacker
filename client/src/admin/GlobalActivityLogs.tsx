
import React, { useEffect, useState } from "react";
import api from "../configs/api";

const GlobalActivityLogs = () => {

  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchActivities = async () => {

      try {

        const { data } =
          await api.get("/admin/activity-logs");

        setActivities(
          Array.isArray(data.logs)
            ? data.logs
            : []
        );

      } catch (err) {

        console.error(
          "Activity fetch error:",
          err
        );

        setActivities([]);

      } finally {

        setLoading(false);
      }
    };

    fetchActivities();

  }, []);

  if (loading) {

    return (

      <div className="bg-gray-800 rounded-lg shadow-lg text-white">

        <div className="p-6 border-b border-gray-700">

          <h2 className="text-xl font-bold">
            Global Activity Logs
          </h2>

        </div>

        <div className="p-6">

          <p className="text-center text-gray-400 py-10">
            Loading activities...
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="bg-gray-800 rounded-lg shadow-lg text-white">

      <div className="p-6 border-b border-gray-700">

        <h2 className="text-xl font-bold">
          Global Activity Logs
        </h2>

      </div>

      <div className="p-6">

        {activities.length === 0 ? (

          <p className="text-center text-gray-500 py-10">
            No activity records found.
          </p>

        ) : (

          <div className="space-y-4">

            {activities.map((act) => (

              <div
                key={act._id}
                className="flex justify-between items-center p-4 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-all"
              >

                <div>

                  <p className="font-medium text-blue-400 text-lg">

                    {act.name ||
                      "Unknown Activity"}

                  </p>

                  <p className="text-xs text-gray-400 mt-1">

                    User:

                    <span className="text-gray-300 ml-1">

                      {typeof act.userId === "object"
                        ? (
                            act.userId?.username ||
                            act.userId?.name ||
                            act.userId?.email ||
                            act.userId?._id ||
                            "Unknown User"
                          )
                        : act.userId ||
                          "Unknown User"}

                    </span>

                    <span className="mx-2">
                      |
                    </span>

                    Duration:

                    <span className="text-white ml-1">

                      {act.duration || 0} mins

                    </span>

                  </p>

                </div>

                <div className="text-right">

                  <p className="font-bold text-xl text-white">

                    {act.caloriesBurned || 0}

                    <span className="text-sm font-normal text-gray-400 ml-1">
                      kcal
                    </span>

                  </p>

                  <p className="text-[10px] text-gray-500 uppercase mt-1">

                    {act.date
                      ? act.date
                      : act.createdAt
                        ? new Date(
                            act.createdAt
                          ).toLocaleDateString()
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

export default GlobalActivityLogs;
