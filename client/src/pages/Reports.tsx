// import { Link } from "react-router-dom";
// import { Activity, Scale, Target, Flame } from "lucide-react";

// const cardClass =
//   "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md transition cursor-pointer";

// const Reports = () => {
//   const cards = [
//     {
//       to: "activity-chart",
//       title: "Activity",
//       desc: "Steps, calories, and active minutes",
//       icon: Activity,
//       color: "text-blue-500",
//     },
//     {
//       to: "body-chart",
//       title: "Body",
//       desc: "Weight, height, and BMI trend",
//       icon: Scale,
//       color: "text-rose-500",
//     },
//     {
//       to: "goal-chart",
//       title: "Goal",
//       desc: "Target calories and steps",
//       icon: Target,
//       color: "text-emerald-500",
//     },
//     {
//       to: "consistency-chart",
//       title: "Consistency",
//       desc: "Streaks and missed days",
//       icon: Flame,
//       color: "text-orange-500",
//     },
//   ];

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Reports</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//         {cards.map((card) => {
//           const Icon = card.icon;
//           return (
//             <Link key={card.to} to={card.to} className={cardClass}>
//               <div className="flex items-center justify-between mb-4">
//                 <div className={`size-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${card.color}`}>
//                   <Icon className="size-6" />
//                 </div>
//                 <span className="text-sm text-slate-400">Open</span>
//               </div>
//               <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{card.title}</h3>
//               <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{card.desc}</p>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Reports;

import { Link } from "react-router-dom";
import { Activity, Scale, Target, Flame } from "lucide-react";

const cardClass =
  "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md transition cursor-pointer";

const Reports = () => {
  const cards = [
    {
      to: "activity-chart",
      title: "Activity",
      desc: "Steps, calories, and active minutes",
      icon: Activity,
      color: "text-blue-500",
    },
    {
      to: "body-chart",
      title: "Body",
      desc: "Weight, height, and BMI trend",
      icon: Scale,
      color: "text-rose-500",
    },
    {
      to: "goal-chart",
      title: "Goal",
      desc: "Target calories and steps",
      icon: Target,
      color: "text-emerald-500",
    },
    {
      to: "consistency-chart",
      title: "Consistency",
      desc: "Streaks and missed days",
      icon: Flame,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Reports</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Open a report card to view your charts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.to} to={card.to} className={cardClass}>
              <div className="flex items-center justify-between mb-4">
                <div className={`size-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${card.color}`}>
                  <Icon className="size-6" />
                </div>
                <span className="text-sm text-slate-400">Open</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{card.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{card.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Reports;