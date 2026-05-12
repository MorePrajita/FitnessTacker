
import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../configs/api";
import axios from "axios";
import toast from "react-hot-toast";

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  
  // --- STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("token"));
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isUserFetched, setIsUserFetched] = useState(false);
  const [allFoodLogs, setAllFoodLogs] = useState<any[]>([]);
  const [allActivityLogs, setAllActivityLogs] = useState<any[]>([]);

  // --- HELPERS ---
  const getTodayStr = () => new Date().toISOString().split("T")[0];

  const setAuthSession = useCallback((token: string | null, userData: any = null) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      }
      setIsLoggedIn(true);
    } else {
      delete api.defaults.headers.common["Authorization"];
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUser(null);
      setProfile(null);
    }
  }, []);

  // --- DATA FETCHING ---
  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await api.get("/profile");
      setProfile(data);
      return data;
    } catch (err) {
      console.error("Profile fetch error:", err);
      setProfile(null);
      return null;
    }
  }, []);

const fetchDailyLogs = useCallback(async () => {
  try {
    const foodRes = await api.get("/food-log");
const activityRes = await api.get("/activity-logs");
    // const [foodRes, activityRes] = await Promise.all([
    //   api.get("/food-log"),
    //   api.get("/activity-logs"),
    // ]);

    console.log("Food Logs:", foodRes.data);
    console.log("Activity Logs:", activityRes.data);

    setAllFoodLogs(
      Array.isArray(foodRes.data)
        ? foodRes.data
        : foodRes.data.logs || []
    );

    setAllActivityLogs(
      Array.isArray(activityRes.data)
        ? activityRes.data
        : activityRes.data.logs || []
    );

  } catch (err: any) {
    console.error(
      "Daily logs fetch error:",
      err.response?.status,
      err.message
    );

    setAllFoodLogs([]);
    setAllActivityLogs([]);
  }
}, []);

  // Wrap refreshAppData in useCallback to stop the infinite loop
  const refreshAppData = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Ensure headers are set before fetching
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    await Promise.all([fetchProfile(), fetchDailyLogs()]);
  }, [fetchProfile, fetchDailyLogs]);

  // --- AUTH ACTIONS ---
  const signup = async (userData: any) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: userData.name,
        email: userData.email,
        password: userData.password
      });

      if (res.data?.token) {
        setAuthSession(res.data.token, res.data.user);
        toast.success("Account created!");
        navigate("/onboarding");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
      throw error;
    }
  };

  const login = async (credentials: any) => {
    try {
      const { data } = await api.post("/auth/login", credentials);
      setAuthSession(data.token, data.user);

      if (data.user.role === 'admin') {
        toast.success("Welcome, Admin");
        navigate("/admin");
      } else if (data.user.onboardingCompleted) {
        await refreshAppData();
        toast.success("Welcome back!");
        navigate("/app");
      } else {
        navigate("/onboarding");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = useCallback(() => {
    setAuthSession(null);
    setAllFoodLogs([]);
    setAllActivityLogs([]);
    navigate("/");
  }, [setAuthSession, navigate]);

  // --- INITIALIZATION ---
  useEffect(() => {
    const init = async () => {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (savedToken && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          await refreshAppData();
        } catch (e) {
          logout(); // Clear corrupted storage
        }
      }
      setIsUserFetched(true);
    };
    init();
  }, [refreshAppData, logout]); // refreshAppData is now stable

  // --- MEMOIZED CONTEXT VALUE ---
  const value = useMemo(() => ({
    user,
    profile,
    onboardingCompleted: user?.onboardingCompleted || !!profile,
    isUserFetched,
    allFoodLogs,
    allActivityLogs,
    isLoggedIn,
    setAllFoodLogs,
    setAllActivityLogs,
    fetchProfile,
    fetchDailyLogs,
    refreshAppData,
    signup,
    login,
    logout,
  }), [user, profile, isUserFetched, allFoodLogs, allActivityLogs, isLoggedIn, fetchProfile, fetchDailyLogs, refreshAppData, logout]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
