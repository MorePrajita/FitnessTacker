// import {
//   ActivityIcon,
//   HomeIcon,
//   MoonIcon,
//   PersonStandingIcon,
//   SunIcon,
//   UserIcon,
//   UtensilsIcon,
//   BarChart3, // Better icon for Reports
// } from "lucide-react";
// import { useTheme } from "../context/ThemeContext";
// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   const navItems = [
//     { path: "/app", label: "Home", icon: HomeIcon, end: true },
//     { path: "/app/food", label: "Food", icon: UtensilsIcon },
//     { path: "/app/activity", label: "Activity", icon: ActivityIcon },
//     { path: "/app/profile", label: "Profile", icon: UserIcon },
//     { path: "/app/reports", label: "Reports", icon: BarChart3 },
//   ];

//   const { theme, toggleTheme } = useTheme();

//   return (
//     <nav className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 p-6 transition-colors duration-200">
//       {/* Logo Section */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="size-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
//           <PersonStandingIcon className="size-7 text-white" />
//         </div>
//         <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">FitTrack</h1>
//       </div>

//       {/* Navigation Links */}
//       <div className="flex flex-col gap-2">
//         {navItems.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             end={item.end}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2.5 border-l-4 transition-all duration-200 ${
//                 isActive
//                   ? "bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 font-semibold border-emerald-500"
//                   : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 border-transparent"
//               }`
//             }
//           >
//             <item.icon className="size-5" />
//             <span className="text-base">{item.label}</span>
//           </NavLink>
//         ))}
//       </div>

//       {/* Theme Toggle Section */}
//       <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
//         <button
//           onClick={toggleTheme}
//           className="flex items-center gap-3 px-4 py-2.5 w-full text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors duration-200 cursor-pointer"
//         >
//           {theme === "light" ? <MoonIcon className="size-5" /> : <SunIcon className="size-5" />}
//           <span className="text-base">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Sidebar;

import {
  ActivityIcon,
  HomeIcon,
  MoonIcon,
  PersonStandingIcon,
  SunIcon,
  UserIcon,
  UtensilsIcon,
  BarChart3,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    // Using absolute paths starting with /app/
    { path: "/app", label: "Home", icon: HomeIcon, end: true },
    { path: "/app/food", label: "Food", icon: UtensilsIcon },
    { path: "/app/activity", label: "Activity", icon: ActivityIcon },
   
    { path: "/app/reports", label: "Reports", icon: BarChart3 },
     { path: "/app/profile", label: "Profile", icon: UserIcon },
  ];

  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 p-6 transition-colors duration-200 h-screen sticky top-0">
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-8">
        <div className="size-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <PersonStandingIcon className="size-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">FitTrack</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end} // Prevents "Home" from staying active on sub-pages
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 border-l-4 transition-all duration-200 ${
                isActive
                  ? "bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 font-semibold border-emerald-500"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 border-transparent"
              }`
            }
          >
            <item.icon className="size-5" />
            <span className="text-base">{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Theme Toggle Section */}
      <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={toggleTheme}
          type="button"
          className="flex items-center gap-3 px-4 py-2.5 w-full text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          {theme === "light" ? (
            <>
              <MoonIcon className="size-5" />
              <span className="text-base">Dark Mode</span>
            </>
          ) : (
            <>
              <SunIcon className="size-5" />
              <span className="text-base">Light Mode</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;