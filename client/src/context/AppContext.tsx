// // import { createContext, useContext, useEffect, useState } from "react";
// // import { initialState, type ActivityEntry, type Credentials, type FoodEntry, type User } from "../types";
// // import { useNavigate } from "react-router-dom";
// // import api from "../configs/api";
// // import toast from "react-hot-toast";


// // const AppContext = createContext(initialState)

// // export const AppProvider = ({children} : {children: React.ReactNode})=>{

// //     const navigate = useNavigate()
// //     const [user, setUser] = useState<User>(null)
// //     const [isUserFetched, setIsUserFetched] = useState(localStorage.getItem('token') ? false : true);
// //     const [onboardingCompleted, setOnboardingCompleted] = useState(false)
// //     const [allFoodLogs, setAllFoodLogs] = useState<FoodEntry[]>([])
// //     const [allActivityLogs, setAllActivityLogs] = useState<ActivityEntry[]>([])
    

// //     const signup = async (credentials: Credentials)=>{

// //         try {
// //             const {data} = await api.post('/api/auth/local/register', credentials)

// //             setUser({...data.user, token: data.jwt})
// //             if(data?.user?.age && data?.user?.weight && data?.user?.goal){
// //                 setOnboardingCompleted(true)
// //             }
// //             // localStorage.setItem('token', data.jwt)
// //             // api.defaults.headers.common['Authorization'] = `Bearer ${data.jwt}`;
// //             localStorage.setItem("token", data.jwt);
// // api.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;

// // await fetchUser(data.jwt);

// // navigate("/app");


// //         } catch (error: any) {
// //             console.log(error);
// //             toast.error(error?.response?.data?.error?.message || error?.message)
// //         }
// //     }

// //        const login = async (credentials: Credentials)=>{
// //         try {
// //             const { data } = await api.post('/api/auth/local', {identifier: credentials.email, password: credentials.password})

// //             setUser({...data.user, token: data.jwt})
// //             if(data?.user?.age && data?.user?.weight && data?.user?.goal){
// //                 setOnboardingCompleted(true)
// //             }
// //             localStorage.setItem('token', data.jwt)
// //             api.defaults.headers.common['Authorization'] = `Bearer ${data.jwt}`;
// //         } catch (error: any) {
// //             console.log(error);
// //             toast.error(error?.response?.data?.error?.message || error?.message)
// //         }
// //     }
// //     // const login = async (credentials: Credentials)=>{
// //     //     try {
// //     //         const { data } = await api.post('/api/auth/local', {identifier: credentials.email, password: credentials.password})

// //     //         setUser({...data.user, token: data.jwt})
// //     //         if(data?.user?.age && data?.user?.weight && data?.user?.goal){
// //     //             setOnboardingCompleted(true)
// //     //         }
// //     //         localStorage.setItem('token', data.jwt)
// //     //         api.defaults.headers.common['Authorization'] = `Bearer ${data.jwt}`;
// //     //     } catch (error: any) {
// //     //         console.log(error);
// //     //         toast.error(error?.response?.data?.error?.message || error?.message)
// //     //     }
// //     // }

// //     const fetchUser = async (token: string)=>{

// //         try {
// //             const { data } = await api.get('/api/users/me', {headers: {Authorization: `Bearer ${token}`}})

// //             setUser({...data, token})
// //             if(data?.age && data?.weight && data?.goal){
// //                 setOnboardingCompleted(true)
// //             }
// //             api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// //         } catch (error: any) {
// //             console.log(error);
// //             toast.error(error?.response?.data?.error?.message || error?.message)
// //         }
// //         setIsUserFetched(true);
// //     }

// //     const fetchFoodLogs = async (token: string)=>{
// //         try {
// //             const {data} = await api.get('/api/food-logs', {headers: { Authorization: `Bearer ${token}` }})
// //             setAllFoodLogs(data)

// //         } catch (error: any) {
// //             console.log(error);
// //             toast.error(error?.response?.data?.error?.message || error?.message)
// //         }
// //     }

// //     const fetchActivityLogs = async (token: string)=>{
// //         try {
// //             const {data} = await api.get('/api/activity-logs', {headers: { Authorization: `Bearer ${token}` }})
// //             setAllActivityLogs(data)
            
// //         } catch (error: any) {
// //             console.log(error);
// //             toast.error(error?.response?.data?.error?.message || error?.message)
// //         }
// //     }

// //      const logout = ()=>{
// //         localStorage.removeItem('token')
// //         setUser(null)
// //         setOnboardingCompleted(false)
// //         setAllActivityLogs([])
// //         setAllFoodLogs([])
// //         api.defaults.headers.common['Authorization'] = '';
// //         navigate('/')
// //      }

// //     useEffect(()=>{
// //         const token = localStorage.getItem('token')
// //         if(token){
// //             (async ()=>{
// //                 await fetchUser(token)
// //                 await fetchFoodLogs(token)
// //                 await fetchActivityLogs(token)
// //             })();
// //         }
// //     },[])


// //     const value = {
// //         user, setUser, isUserFetched, fetchUser,
// //         signup, login, logout,
// //         onboardingCompleted, setOnboardingCompleted,
// //         allFoodLogs, allActivityLogs,
// //         setAllFoodLogs, setAllActivityLogs
// //     }

// //     return <AppContext.Provider value={value}>
// //         {children}
// //     </AppContext.Provider>
// // }

// // export const useAppContext = ()=> useContext(AppContext)

// import { createContext, useContext, useEffect, useState } from "react";
// import { initialState, type ActivityEntry, type Credentials, type FoodEntry, type User } from "../types";
// import { useNavigate } from "react-router-dom";
// import api from "../configs/api";
// import toast from "react-hot-toast";

// const AppContext = createContext(initialState)

// export const AppProvider = ({children} : {children: React.ReactNode})=>{

//     const navigate = useNavigate()
//     const [user, setUser] = useState<User>(null)
//     const [isUserFetched, setIsUserFetched] = useState(localStorage.getItem('token') ? false : true);
//     const [onboardingCompleted, setOnboardingCompleted] = useState(false)
//     const [allFoodLogs, setAllFoodLogs] = useState<FoodEntry[]>([])
//     const [allActivityLogs, setAllActivityLogs] = useState<ActivityEntry[]>([])
//     const [profile, setProfile] = useState<any>(null);

    

//     const signup = async (credentials: Credentials)=>{

//         try {
//             const {data} = await api.post('/api/auth/local/register', credentials)

//             setUser({...data.user, token: data.jwt})
//             if(data?.user?.age && data?.user?.weight && data?.user?.goal){
//                 setOnboardingCompleted(true)
//             }

//             localStorage.setItem("token", data.jwt);
//             api.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;

//             await fetchUser(data.jwt);

//             navigate("/app");

//         } catch (error: any) {
//             console.log(error);
//             toast.error(error?.response?.data?.error?.message || error?.message)
//         }
//     }

//     const login = async (credentials: Credentials)=>{
//         try {
//             const { data } = await api.post('/api/auth/local', {
//                 identifier: credentials.email,
//                 password: credentials.password
//             })

//             setUser({...data.user, token: data.jwt})
//             if(data?.user?.age && data?.user?.weight && data?.user?.goal){
//                 setOnboardingCompleted(true)
//             }

//             localStorage.setItem('token', data.jwt)
//             api.defaults.headers.common['Authorization'] = `Bearer ${data.jwt}`;

//             // 🔥 IMPORTANT: fetch merged data
//             await fetchUser(data.jwt);

//         } catch (error: any) {
//             console.log(error);
//             toast.error(error?.response?.data?.error?.message || error?.message)
//         }
//     }

//     // ✅ FIXED FUNCTION (ONLY CHANGE)
//     // const fetchUser = async (token: string)=>{

//     //     try {
//     //         // 1. Get auth user
//     //         const { data: userData } = await api.get('/api/users/me', {
//     //             headers: { Authorization: `Bearer ${token}` }
//     //         });

//     //         // 2. Get profile (calculated data)
//     //         const { data: profileRes } = await api.get('/api/user-profiles/me', {
//     //             headers: { Authorization: `Bearer ${token}` }
//     //         });

//     //         const profile = profileRes?.data?.data;

//     //         // 3. Merge both
//     //         const mergedUser = {
//     //             ...userData,
//     //             ...profile,
//     //             token
//     //         };

//     //         setUser(mergedUser);

//     //         if(mergedUser?.age && mergedUser?.weight && mergedUser?.goal){
//     //             setOnboardingCompleted(true)
//     //         }

//     //         api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//     //     } catch (error: any) {
//     //         console.log(error);
//     //         toast.error(error?.response?.data?.error?.message || error?.message)
//     //     }

//     //     setIsUserFetched(true);
//     // }
// const fetchUser = async (token: string)=>{

//     try {
//         const { data: userData } = await api.get('/api/users/me', {
//             headers: { Authorization: `Bearer ${token}` }
//         });

//         const { data: profileRes } = await api.get('/api/user-profiles/me', {
//             headers: { Authorization: `Bearer ${token}` }
//         });

//         const profile = profileRes?.data?.data;

//         // ✅ THIS WAS MISSING
//         setProfile(profile);

//         const mergedUser = {
//             ...userData,
//             ...profile,
//             token
//         };

//         setUser(mergedUser);

//         if(mergedUser?.age && mergedUser?.weight && mergedUser?.goal){
//             setOnboardingCompleted(true)
//         }

//         api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//     } catch (error: any) {
//         console.log(error);
//         toast.error(error?.response?.data?.error?.message || error?.message)
//     }

//     setIsUserFetched(true);
// }

//     const fetchFoodLogs = async (token: string)=>{
//         try {
//             const {data} = await api.get('/api/food-logs', {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//             setAllFoodLogs(data)

//         } catch (error: any) {
//             console.log(error);
//             toast.error(error?.response?.data?.error?.message || error?.message)
//         }
//     }

//     const fetchActivityLogs = async (token: string)=>{
//         try {
//             const {data} = await api.get('/api/activity-logs', {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//             setAllActivityLogs(data)
            
//         } catch (error: any) {
//             console.log(error);
//             toast.error(error?.response?.data?.error?.message || error?.message)
//         }
//     }

//     const logout = ()=>{
//         localStorage.removeItem('token')
//         setUser(null)
//         setOnboardingCompleted(false)
//         setAllActivityLogs([])
//         setAllFoodLogs([])
//         api.defaults.headers.common['Authorization'] = '';
//         navigate('/')
//     }

//     useEffect(()=>{
//         const token = localStorage.getItem('token')
//         if(token){
//             (async ()=>{
//                 await fetchUser(token)
//                 await fetchFoodLogs(token)
//                 await fetchActivityLogs(token)
//             })();
//         }
//     },[])

//   const value = {
//     user,
//     setUser,
//     profile,        // ✅ ADD THIS
//     setProfile,     // ✅ ADD THIS
//     isUserFetched,
//     fetchUser,
//     signup,
//     login,
//     logout,
//     onboardingCompleted,
//     setOnboardingCompleted,
//     allFoodLogs,
//     allActivityLogs,
//     setAllFoodLogs,
//     setAllActivityLogs
// }


//     return <AppContext.Provider value={value}>
//         {children}
//     </AppContext.Provider>
// }

// export const useAppContext = ()=> useContext(AppContext)
import { createContext, useContext, useEffect, useState } from "react";
import { initialState } from "../types"; // keep if exists OR remove typing
import { useNavigate } from "react-router-dom";
import api from "../configs/api";
import toast from "react-hot-toast";

const AppContext = createContext<any>(initialState);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isUserFetched, setIsUserFetched] = useState(
    localStorage.getItem("token") ? false : true
  );

  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [allFoodLogs, setAllFoodLogs] = useState<any[]>([]);
  const [allActivityLogs, setAllActivityLogs] = useState<any[]>([]);

  /* ================= AUTH ================= */

  const signup = async (credentials: any) => {
    try {
      const { data } = await api.post("/api/auth/local/register", credentials);

      localStorage.setItem("token", data.jwt);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;

      await fetchUser(data.jwt);

      navigate("/app");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error?.message || error?.message);
    }
  };

  const login = async (credentials: any) => {
    try {
      const { data } = await api.post("/api/auth/local", {
        identifier: credentials.email,
        password: credentials.password,
      });

      localStorage.setItem("token", data.jwt);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;

      await fetchUser(data.jwt);

    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error?.message || error?.message);
    }
  };

  /* ================= FETCH USER ================= */

  const fetchUser = async (token: string) => {
    try {
      // ✅ user
      const { data: userData } = await api.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ profile
      let profileData = null;

try {
  const { data: profileRes } = await api.get("/api/user-profiles", {
    params: {
      filters: {
        users_permissions_user: userData.id,
      },
      populate: "*",
    },
    headers: { Authorization: `Bearer ${token}` },
  });

  profileData = profileRes?.data?.[0] || null;

} catch (err) {
  console.log("No profile found yet");
}

      // let profileData = null;

      // try {
      //   const { data: profileRes } = await api.get("/api/user-profiles/me", {
      //     headers: { Authorization: `Bearer ${token}` },
      //   });

      //   // 🔥 IMPORTANT FIX
      //   profileData = profileRes?.data || null;

      // } catch (err) {
      //   console.log("No profile found yet");
      // }

      setProfile(profileData);

      const mergedUser = {
  ...userData,
  profile: profileData,
  token,
};


      setUser(mergedUser);

     if (
  profileData?.height &&
  profileData?.weight &&
  userData?.age
) {
  setOnboardingCompleted(true);
} else {
  setOnboardingCompleted(false);
}


      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error?.message || error?.message);
    }

    setIsUserFetched(true);
  };

  /* ================= LOGS ================= */

  const fetchFoodLogs = async (token: string) => {
    try {
      const { data } = await api.get("/api/food-logs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllFoodLogs(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const fetchActivityLogs = async (token: string) => {
    try {
      const { data } = await api.get("/api/activity-logs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllActivityLogs(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setProfile(null);
    setOnboardingCompleted(false);
    setAllActivityLogs([]);
    setAllFoodLogs([]);
    api.defaults.headers.common["Authorization"] = "";
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      (async () => {
        await fetchUser(token);
        await fetchFoodLogs(token);
        await fetchActivityLogs(token);
      })();
    }
  }, []);

  const value = {
    user,
    profile,
    isUserFetched,
    fetchUser,
    signup,
    login,
    logout,
    onboardingCompleted,
    allFoodLogs,
    allActivityLogs,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
