import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// USER PAGES
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import FoodLog from "./pages/FoodLog";
import ActivityLog from "./pages/ActivityLog";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports"; 

// CHART COMPONENTS
import ActivityChart from "./pages/ActivityChart";
import BodyChart from "./pages/BodyChart";
import GoalChart from "./pages/GoalChart";
import ConsistencyChart from "./pages/ConsistencyChart";

// ADMIN COMPONENTS
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import UserManagement from "./admin/UserManagement";
import GlobalFoodLogs from "./admin/GlobalFoodLogs";
import GlobalActivityLogs from "./admin/GlobalActivityLogs";
import UserStatusTable from "./admin/UserStatusTable";

// AUTH & UI
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Loading from "./components/Loading";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { user, isUserFetched, onboardingCompleted } = useAppContext();

  if (!isUserFetched) return <Loading />;

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        {/* SECTION 1: PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            user 
              ? (onboardingCompleted ? <Navigate to="/app" replace /> : <Navigate to="/onboarding" replace />) 
              : <Login />
          }
        />

        {/* SECTION 2: ONBOARDING */}
        <Route
          path="/onboarding"
          element={
            !user ? <Navigate to="/login" replace /> : 
            onboardingCompleted ? <Navigate to="/app" replace /> : <Onboarding />
          }
        />

        {/* SECTION 3: USER APP (All paths here start with /app) */}
        <Route
          path="/app"
          element={
            !user ? <Navigate to="/login" replace /> : 
            !onboardingCompleted ? <Navigate to="/onboarding" replace /> : <Layout />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="food" element={<FoodLog />} />
          <Route path="activity" element={<ActivityLog />} />
          <Route path="profile" element={<Profile />} />
          <Route path="reports" element={<Reports />} /> 
          <Route path="reports/activity-chart" element={<ActivityChart />} />
          <Route path="reports/body-chart" element={<BodyChart />} />
          <Route path="reports/goal-chart" element={<GoalChart />} />
          <Route path="reports/consistency-chart" element={<ConsistencyChart />} />
        </Route>

        {/* SECTION 4: ADMIN PANEL (Path starts with /admin) */}
        {/* Notice this is NOT inside the /app block anymore */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="logs" element={<GlobalFoodLogs />} />
          <Route path="activity-logs" element={<GlobalActivityLogs />} />
          <Route path="users-status" element={<UserStatusTable />} />
        </Route>

        {/* SECTION 5: CATCH-ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
