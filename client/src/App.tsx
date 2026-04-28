// import { Routes, Route, Navigate } from "react-router-dom";
// import Layout from "./pages/Layout";
// import Dashboard from "./pages/Dashboard";
// import FoodLog from "./pages/FoodLog";
// import ActivityLog from "./pages/ActivityLog";
// import Profile from "./pages/Profile";
// import Login from "./pages/Login";
// import Loading from "./components/Loading";
// import Onboarding from "./pages/Onboarding";
// import Reports from "./pages/Reports";
// import ActivityChart from "./pages/ActivityChart";
// import BodyChart from "./pages/BodyChart";
// import GoalChart from "./pages/GoalChart";
// import ConsistencyChart from "./pages/ConsistencyChart";
// import { useAppContext } from "./context/AppContext";
// import { Toaster } from "react-hot-toast";

// const App = () => {
//   const { user, isUserFetched, onboardingCompleted } = useAppContext();

//   // 🔴 Wait until user is fully loaded
//   if (!isUserFetched) return <Loading />;

//   // 🔴 Prevent redirect glitch (VERY IMPORTANT)
//   if (user && onboardingCompleted === null) return <Loading />;

//   return (
//     <>
//       <Toaster />

//       <Routes>
//         {/* LOGIN */}
//         <Route
//           path="/login"
//           element={user ? <Navigate to="/app" replace /> : <Login />}
//         />

//         {/* ONBOARDING */}
//         <Route
//           path="/onboarding"
//           element={
//             !user ? (
//               <Navigate to="/login" replace />
//             ) : onboardingCompleted ? (
//               <Navigate to="/app" replace />
//             ) : (
//               <Onboarding />
//             )
//           }
//         />

//         {/* MAIN APP */}
//         <Route
//           path="/app"
//           element={
//             !user ? (
//               <Navigate to="/login" replace />
//             ) : !onboardingCompleted ? (
//               <Navigate to="/onboarding" replace />
//             ) : (
//               <Layout />
//             )
//           }
//         >
//           <Route index element={<Dashboard />} />
//           <Route path="food" element={<FoodLog />} />
//           <Route path="activity" element={<ActivityLog />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="reports" element={<Reports />} />
//           <Route path="reports/activity-chart" element={<ActivityChart />} />
//           <Route path="reports/body-chart" element={<BodyChart />} />
//           <Route path="reports/goal-chart" element={<GoalChart />} />
//           <Route
//             path="reports/consistency-chart"
//             element={<ConsistencyChart />}
//           />
//         </Route>

//         {/* DEFAULT */}
//         <Route path="*" element={<Navigate to="/app" replace />} />
//       </Routes>
//     </>
//   );
// };

// export default App;


import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import FoodLog from "./pages/FoodLog";
import ActivityLog from "./pages/ActivityLog";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
// import Reports from "./pages/Reports";
// import ActivityChart from "./pages/ActivityChart";
// import BodyChart from "./pages/BodyChart";
// import GoalChart from "./pages/GoalChart";
// import ConsistencyChart from "./pages/ConsistencyChart";
import Home from "./pages/Home";
import Loading from "./components/Loading";
import { useAppContext } from "./context/AppContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { user, isUserFetched, onboardingCompleted } = useAppContext();

  // ⏳ Wait until user is loaded
  if (!isUserFetched) return <Loading />;

  return (
    <>
      <Toaster />

      <Routes>

        {/* 🏠 HOME PAGE */}
        <Route path="/" element={<Home />} />

        {/* 🔐 LOGIN + SIGNUP (same page) */}
        <Route
          path="/login"
          element={user ? <Navigate to="/app" replace /> : <Login />}
        />

        {/* 🧠 ONBOARDING */}
        <Route
          path="/onboarding"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : !onboardingCompleted ? (
              <Onboarding />
            ) : (
              <Navigate to="/app" replace />
            )
          }
        />

        {/* 📊 MAIN APP */}
        <Route
          path="/app"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : !onboardingCompleted ? (
              <Navigate to="/onboarding" replace />
            ) : (
              <Layout />
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="food" element={<FoodLog />} />
          <Route path="activity" element={<ActivityLog />} />
          <Route path="profile" element={<Profile />} />
          {/* <Route path="reports" element={<Reports />} />
          <Route path="reports/activity-chart" element={<ActivityChart />} />
          <Route path="reports/body-chart" element={<BodyChart />} />
          <Route path="reports/goal-chart" element={<GoalChart />} />
          <Route path="reports/consistency-chart" element={<ConsistencyChart />} /> */}
        </Route>

        {/* 🔄 FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </>
  );
};

export default App;
