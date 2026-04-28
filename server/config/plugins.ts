// // import type { CSVExporterPlugin } from "strapi-plugin-csv-exporter/dist/server/src";

// // export default (): CSVExporterPlugin => ({
// //   config: {
// //     "api::activity-summary.activity-summary": {
// //       dropdownLabel: "Activity Summary",
// //       columns: ["date", "steps", "calories_burned", "active_minutes"],
// //       filter: {
// //         date: {
// //           $gte: "2026-01-01",
// //           $lte: "2026-12-31",
// //         },
// //       },
// //       customColumns: {
// //         "Steps Goal Status": {
// //           column: (item) => {
// //             const steps = item.steps ?? 0;
// //             if (steps >= 10000) return "Excellent";
// //             if (steps >= 7000) return "Good";
// //             return "Needs Improvement";
// //           },
// //         },
// //       },
// //     },

// //     "api::body-log.body-log": {
// //       dropdownLabel: "Body Logs",
// //       columns: ["date", "weight", "height"],
// //       filter: {},
// //       customColumns: {
// //         BMI: {
// //           column: (item) => {
// //             if (!item.weight || !item.height) return "";
// //             return ((item.weight / (item.height * item.height)) * 10000).toFixed(1);
// //           },
// //         },
// //       },
// //     },

// //     "api::goal-progress.goal-progress": {
// //       dropdownLabel: "Goal Progress",
// //       columns: ["date", "targetcalories", "targetsteps"],
// //       filter: {},
// //       customColumns: {
// //         "Goal Summary": {
// //           column: (item) => `${item.targetcalories ?? 0} kcal / ${item.targetsteps ?? 0} steps`,
// //         },
// //       },
// //     },

// //     "api::consistency-log.consistency-log": {
// //       dropdownLabel: "Consistency Logs",
// //       columns: ["last_active_date", "missed_day_count", "streakcount"],
// //       filter: {},
// //       customColumns: {
// //         Status: {
// //           column: (item) => {
// //             const streak = item.streakcount ?? 0;
// //             if (streak >= 7) return "Strong";
// //             if (streak >= 3) return "Building";
// //             return "Weak";
// //           },
// //         },
// //       },
// //     },
// //   },

// //   dateFormat: "YYYY-MM-DD",
// //   timeZone: "+00:00",
// //   ignore: ["createdAt", "updatedAt", "publishedAt"],
// // });


// export default {
//   "csv-export": {
//     enabled: true,
//     config: {
//       dateFormat: "YYYY-MM-DD HH:mm:ss",
//       timeZone: "+00:00",
//       ignore: ["createdAt", "updatedAt", "publishedAt"],

//       "api::activity-summary.activity-summary": {
//         dropdownLabel: "Activity Summary",
//         columns: ["date", "steps", "calories_burned", "active_minutes"],
//         filter: {
//           date: {
//             $gte: "2026-01-01",
//             $lte: "2026-12-31",
//           },
//         },
//         customColumns: {},
//       },

//       "api::body-log.body-log": {
//         dropdownLabel: "Body Logs",
//         columns: ["date", "weight", "height"],
//         filter: {
//           date: {
//             $gte: "2026-01-01",
//             $lte: "2026-12-31",
//           },
//         },
//         customColumns: {},
//       },
//     },
//   },
// };