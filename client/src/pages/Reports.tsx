import { Link } from "react-router-dom";
// Make sure these components exist in your components folder!
import { 
  Activity, 
  Scale, 
  Target, 
  Flame, 
  ChevronRight, 
  CheckCircle2 
} from "lucide-react";

const cardClass =
  "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer";

const Reports = () => {
  const cards = [
    {
      to: "/app/reports/activity-chart",
      title: "Activity",
      desc: "Steps, calories, and active minutes",
      icon: Activity,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/10",
    },
    {
      to: "/app/reports/body-chart",
      title: "Body",
      desc: "Weight, height, and BMI trend",
      icon: Scale,
      color: "text-rose-500",
      bgColor: "bg-rose-50 dark:bg-rose-900/10",
    },
    {
      to: "/app/reports/goal-chart",
      title: "Goal",
      desc: "Target calories and steps",
      icon: Target,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/10",
    },
    {
      to: "/app/reports/consistency-chart",
      title: "Consistency",
      desc: "Streaks and missed days",
      icon: Flame,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/10",
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Analytics Report</h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Track your progress and fitness insights.
          </p>
        </div>
        
        {/* Goal Indicator */}
        <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
          <CheckCircle2 className="text-emerald-500 size-6" />
          <div>
            <p className="text-sm font-bold text-emerald-800 dark:text-emerald-400">On Track</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-500">You are 65% closer to your goal!</p>
          </div>
        </div>
      </div>

      {/* Grid of Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.to} to={card.to} className={cardClass}>
              <div className="flex items-center justify-between mb-4">
                <div className={`size-12 rounded-xl flex items-center justify-center transition-colors ${card.bgColor} ${card.color}`}>
                  <Icon className="size-6" />
                </div>
                <ChevronRight className="size-5 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {card.desc}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Motivational Hint */}
      <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-8 text-center">
        <p className="text-slate-500 dark:text-slate-400 italic">
          "Consistency is the key to transformation. View your Body trend to see long-term changes."
        </p>
      </div>
    </div>
  );
};

export default Reports;
