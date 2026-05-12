// // // // import { AtSignIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react"
// // // // import { useEffect, useState } from "react"
// // // // import { useNavigate } from "react-router-dom"
// // // // import { useAppContext } from "../context/AppContext"
// // // // import { Toaster } from "react-hot-toast"

// // // // const Login = () => {

// // // //   const [state, setState] = useState('login')
// // // //   const [username, setUsername] = useState('')
// // // //   const [email, setEmail] = useState('')
// // // //   const [password, setPassword] = useState('')
// // // //   const [showPassword, setShowPassword] = useState(false)
// // // //   const [isSubmitting, setIsSubmitting] = useState(false)

// // // //   const navigate = useNavigate()
// // // //   const {login, signup, user} = useAppContext()

// // // // const handleSubmit = async (e: React.FormEvent) => {
// // // //   e.preventDefault();
// // // //   setIsSubmitting(true);

// // // //   try {
// // // //     let res;

// // // //     if (state === "login") {
// // // //       res = await login({ email, password });
// // // //     } else {
// // // //       res = await signup({ username, email, password });
// // // //     }

// // // //     // 🔥 IMPORTANT: backend should return token
// // // //     const token = res?.token;

// // // //     if (!token) throw new Error("No token received");

// // // //     localStorage.setItem("token", token);

// // // //     // 🔥 NOW CHECK PROFILE
// // // //     const profileRes = await fetch("http://localhost:5000/api/user/profile", {
// // // //       headers: {
// // // //         Authorization: `Bearer ${token}`,
// // // //       },
// // // //     });

// // // //     const profile = await profileRes.json();

// // // //     // 🚀 ROUTING DECISION (THIS IS THE FIX)
// // // //     if (profile) {
// // // //       navigate("/app");         // existing profile → dashboard
// // // //     } else {
// // // //       navigate("/onboarding");  // no profile → onboarding
// // // //     }

// // // //   } catch (err) {
// // // //     console.log(err);
// // // //     navigate("/onboarding");
// // // //   }

// // // //   setIsSubmitting(false);
// // // // };

// // // //   // useEffect(()=>{
// // // //   //   if(user){
// // // //   //     navigate('/')
// // // //   //   }
// // // //   // },[user, navigate])

// // // //   return (
// // // //     <>
// // // //     <Toaster />
// // // //       <main className="login-page-container">
// // // //         <form onSubmit={handleSubmit} className="login-form">
// // // //           <h2 className="text-3xl font-medium text-gray-900 dark:text-white">
// // // //             {state === 'login' ? "Sign In" : "Sign up"}
// // // //           </h2>
// // // //           <p className="mt-2 text-sm text-gray-500/90 dark:text-gray-400">
// // // //             {state === 'login' ? 'Please enter email and password to access.' : 'Please enter your details to create an account.'}
// // // //           </p>
          
// // // //           {/* Username */}
// // // //           {state !== 'login' && (
// // // //             <div className="mt-4">
// // // //               <label className="font-medium text-sm text-gray-700 dark:text-gray-300">Username</label>
// // // //               <div className="relative mt-2">
// // // //                 <AtSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5"/>
// // // //                 <input onChange={(e)=>setUsername(e.target.value)} value={username}
// // // //                 type="text" placeholder="enter a username" className="login-input" required/>
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           {/* Email */}
// // // //           <div className="mt-4">
// // // //               <label className="font-medium text-sm text-gray-700 dark:text-gray-300">Email</label>
// // // //               <div className="relative mt-2">
// // // //                 <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5"/>
// // // //                 <input onChange={(e)=>setEmail(e.target.value)} value={email}
// // // //                 type="email" placeholder="Please enter your email" className="login-input" required/>
// // // //               </div>
// // // //             </div>

// // // //           {/* Password */}
// // // //             <div className="mt-4">
// // // //               <label className="font-medium text-sm text-gray-700 dark:text-gray-300">Password</label>
// // // //               <div className="relative mt-2">
// // // //                 <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5"/>
// // // //                 <input 
// // // //                 onChange={(e)=>setPassword(e.target.value)} 
// // // //                 value={password}
// // // //                 placeholder="Please enter your password" className="login-input pr-10" required
// // // //                 type={showPassword ? 'text' : 'password'}/>
// // // //                 <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
// // // //                 onClick={()=> setShowPassword((p)=> !p)}>
// // // //                   {showPassword ? <EyeOffIcon size={16}/> : <EyeIcon size={16}/>}
// // // //                 </button>
// // // //               </div>
// // // //             </div>

// // // //             <button type="submit" disabled={isSubmitting} className="login-button">
// // // //               {isSubmitting ? "Signing in..." : state === "login" ? 'Login' : 'Sign up'}
// // // //             </button>

// // // //             {state === 'login'
// // // //             ? (
// // // //               <p className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">Don't have an account? <button type="button" onClick={()=> setState('sign-up')} className="ml-1 cursor-pointer text-green-600 hover:underline">Sign up</button></p>
// // // //                 )
// // // //               :
// // // //               (
// // // //               <p className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">Already Have an account? <button type="button" onClick={()=> setState('login')} className="ml-1 cursor-pointer text-green-600 hover:underline">Login</button></p>
// // // //               )}
// // // //         </form>
// // // //       </main>
// // // //     </>
// // // //   )
// // // // }

// // // // export default Login


// // // // // import { AtSignIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react"
// // // // // import { useEffect, useState } from "react"
// // // // // import { useNavigate } from "react-router-dom"
// // // // // import { useAppContext } from "../context/AppContext"
// // // // // import { Toaster } from "react-hot-toast"


// // // // // const Login = () => {

// // // // //   const [state, setState] = useState('login')
// // // // //   const [username, setUsername] = useState('')
// // // // //   const [email, setEmail] = useState('')
// // // // //   const [password, setPassword] = useState('')
// // // // //   const [showPassword, setShowPassword] = useState(false)
// // // // //   const [isSubmitting, setIsSubmitting] = useState(false)

// // // // //   const navigate = useNavigate()
// // // // //   const {login, signup, user} = useAppContext()

// // // // //   const handleSubmit = async (e: React.FormEvent)=>{
// // // // //     e.preventDefault()
// // // // //     setIsSubmitting(true);
// // // // //     if(state === "login"){
// // // // //       await login({email, password})
// // // // //     }else{
// // // // //       await signup({username, email, password})
// // // // //     }
// // // // //     setIsSubmitting(false)
// // // // //   }

// // // // //   useEffect(()=>{
// // // // //     if(user){
// // // // //       navigate('/')
// // // // //     }
// // // // //   },[user, navigate])

// // // // //   return (
// // // // //     <>
// // // // //     <Toaster />
// // // // //       <main className="login-page-container">
// // // // //         <form onSubmit={handleSubmit} className="login-form">
// // // // //           <h2 className="text-3xl font-medium text-gray-900 dark:text-white">
// // // // //             {state === 'login' ? "Sign In" : "Sign up"}
// // // // //           </h2>
// // // // //           <p className="mt-2 text-sm text-gray-500/90 dark:text-gray-400">
// // // // //             {state === 'login' ? 'Please enter email and password to access.' : 'Please enter your details to create an account.'}
// // // // //           </p>
          
// // // // //           {/* Username */}
// // // // //           {state !== 'login' && (
// // // // //             <div className="mt-4">
// // // // //               <label className="font-medium text-sm text-gray-700 dark:text-gray-300">Username</label>
// // // // //               <div className="relative mt-2">
// // // // //                 <AtSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5"/>
// // // // //                 <input onChange={(e)=>setUsername(e.target.value)} value={username}
// // // // //                 type="text" placeholder="enter a username" className="login-input" required/>
// // // // //               </div>
// // // // //             </div>
// // // // //           )}

// // // // //           {/* Email */}
// // // // //           <div className="mt-4">
// // // // //               <label className="font-medium text-sm text-gray-700 dark:text-gray-300">Email</label>
// // // // //               <div className="relative mt-2">
// // // // //                 <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5"/>
// // // // //                 <input onChange={(e)=>setEmail(e.target.value)} value={email}
// // // // //                 type="email" placeholder="Please enter your email" className="login-input" required/>
// // // // //               </div>
// // // // //             </div>

// // // // //           {/* Password */}
// // // // //             <div className="mt-4">
// // // // //               <label className="font-medium text-sm text-gray-700 dark:text-gray-300">Password</label>
// // // // //               <div className="relative mt-2">
// // // // //                 <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5"/>
// // // // //                 <input 
// // // // //                 onChange={(e)=>setPassword(e.target.value)} 
// // // // //                 value={password}
// // // // //                 placeholder="Please enter your password" className="login-input pr-10" required
// // // // //                 type={showPassword ? 'text' : 'password'}/>
// // // // //                 <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
// // // // //                 onClick={()=> setShowPassword((p)=> !p)}>
// // // // //                   {showPassword ? <EyeOffIcon size={16}/> : <EyeIcon size={16}/>}
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>

// // // // //             <button type="submit" disabled={isSubmitting} className="login-button">
// // // // //               {isSubmitting ? "Signing in..." : state === "login" ? 'Login' : 'Sign up'}
// // // // //             </button>

// // // // //             {state === 'login'
// // // // //             ? (
// // // // //               <p className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">Don't have an account? <button type="button" onClick={()=> setState('sign-up')} className="ml-1 cursor-pointer text-green-600 hover:underline">Sign up</button></p>
// // // // //                 )
// // // // //               :
// // // // //               (
// // // // //               <p className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">Already Have an account? <button type="button" onClick={()=> setState('login')} className="ml-1 cursor-pointer text-green-600 hover:underline">Login</button></p>
// // // // //               )}
// // // // //         </form>
// // // // //       </main>
// // // // //     </>
// // // // //   )
// // // // // }

// // // // // export default Login
// // // import { AtSignIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
// // // import { useState } from "react";
// // // import { useAppContext } from "../context/AppContext";
// // // import { Toaster } from "react-hot-toast";

// // // const Login = () => {
// // //   const [state, setState] = useState<"login" | "signup">("login");
// // //   const [username, setUsername] = useState("");
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // //   const { login, signup } = useAppContext();

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setIsSubmitting(true);

// // //     try {
// // //       if (state === "login") {
// // //         await login({ email, password });
// // //       } else {
// // //         await signup({ username, email, password });
// // //       }
// // //     } catch (err) {
// // //       console.log("Auth error:", err);
// // //     }

// // //     setIsSubmitting(false);
// // //   };

// // //   return (
// // //     <>
// // //       <Toaster />

// // //       <main className="login-page-container">
// // //         <form onSubmit={handleSubmit} className="login-form">

// // //           {/* Title */}
// // //           <h2 className="text-3xl font-medium text-gray-900 dark:text-white">
// // //             {state === "login" ? "Sign In" : "Sign Up"}
// // //           </h2>

// // //           <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
// // //             {state === "login"
// // //               ? "Enter email and password to continue"
// // //               : "Create your account"}
// // //           </p>

// // //           {/* Username (Signup only) */}
// // //           {state === "signup" && (
// // //             <div className="mt-4">
// // //               <label className="text-sm font-medium">Username</label>
// // //               <div className="relative mt-2">
// // //                 <AtSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
// // //                 <input
// // //                   value={username}
// // //                   onChange={(e) => setUsername(e.target.value)}
// // //                   type="text"
// // //                   placeholder="Enter username"
// // //                   className="login-input"
// // //                   required
// // //                 />
// // //               </div>
// // //             </div>
// // //           )}

// // //           {/* Email */}
// // //           <div className="mt-4">
// // //             <label className="text-sm font-medium">Email</label>
// // //             <div className="relative mt-2">
// // //               <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
// // //               <input
// // //                 value={email}
// // //                 onChange={(e) => setEmail(e.target.value)}
// // //                 type="email"
// // //                 placeholder="Enter email"
// // //                 className="login-input"
// // //                 required
// // //               />
// // //             </div>
// // //           </div>

// // //           {/* Password */}
// // //           <div className="mt-4">
// // //             <label className="text-sm font-medium">Password</label>
// // //             <div className="relative mt-2">
// // //               <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />

// // //               <input
// // //                 value={password}
// // //                 onChange={(e) => setPassword(e.target.value)}
// // //                 type={showPassword ? "text" : "password"}
// // //                 placeholder="Enter password"
// // //                 className="login-input pr-10"
// // //                 required
// // //               />

// // //               <button
// // //                 type="button"
// // //                 onClick={() => setShowPassword((p) => !p)}
// // //                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
// // //               >
// // //                 {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* Submit */}
// // //           <button type="submit" disabled={isSubmitting} className="login-button">
// // //             {isSubmitting
// // //               ? "Processing..."
// // //               : state === "login"
// // //               ? "Login"
// // //               : "Sign Up"}
// // //           </button>

// // //           {/* Toggle */}
// // //           {state === "login" ? (
// // //             <p className="text-center py-6 text-sm text-gray-500">
// // //               Don't have an account?{" "}
// // //               <button
// // //                 type="button"
// // //                 onClick={() => setState("signup")}
// // //                 className="text-green-600 hover:underline"
// // //               >
// // //                 Sign up
// // //               </button>
// // //             </p>
// // //           ) : (
// // //             <p className="text-center py-6 text-sm text-gray-500">
// // //               Already have an account?{" "}
// // //               <button
// // //                 type="button"
// // //                 onClick={() => setState("login")}
// // //                 className="text-green-600 hover:underline"
// // //               >
// // //                 Login
// // //               </button>
// // //             </p>
// // //           )}
// // //         </form>
// // //       </main>
// // //     </>
// // //   );
// // // };

// // // export default Login;


// // import { AtSignIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
// // import { useNavigate } from "react-router-dom";
// // import { useState } from "react";
// // import { useAppContext } from "../context/AppContext";
// // import { Toaster } from "react-hot-toast";

// // const Login = () => {
// //   const [state, setState] = useState<"login" | "signup">("login");
// //   // Change state name to 'name' to likely match backend expectations
// //   const [username, setUsername] = useState(""); 
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const { login, signup } = useAppContext();


// //   const handleSubmit = async (e: React.FormEvent) => {
// //   e.preventDefault();
// //   setIsSubmitting(true);

// //   try {
// //     if (state === "login") {
// //       // 1. Wait for the login to complete and get the returned user data
// //       const response = await login({ email, password });
      
// //       // 2. Check the user's role/admin status from the response
// //       // Note: Adjust 'response.isAdmin' or 'response.role' based on your API return
// //       if (response?.isAdmin || response?.role === 'admin') {
// //         navigate("/admin");
// //       } else {
// //         navigate("/app");
// //       }
// //     } else {
// //       await signup({ username, email, password });
// //       // Usually, signup takes them to onboarding
// //       navigate("/onboarding");
// //     }
// //   } catch (err) {
// //     console.error("Authentication detail error:", err);
// //   } finally {
// //     setIsSubmitting(false);
// //   }
// // };
// //   // const handleSubmit = async (e: React.FormEvent) => {
// //   //   e.preventDefault();
// //   //   setIsSubmitting(true);

// //   //   try {
// //   //     if (state === "login") {
// //   //       // Standard login payload
// //   //       await login({ email, password });
// //   //     } else {
// //   //       // FIX: Sending 'name' instead of 'username' usually fixes the 400 error
// //   //       // If your backend EXPLICITLY requires 'username', change 'name' back to 'username' below.
// //   //       await signup({ username, email, password });
// //   //     }
// //   //   } catch (err) {
// //   //     // Error handling is managed by toasts in AppContext, 
// //   //     // but we log it here for developer debugging
// //   //     console.error("Authentication detail error:", err);
// //   //   } finally {
// //   //     setIsSubmitting(false);
// //   //   }
// //   // };

// //   return (
// //     <>
// //       <Toaster />

// //       <main className="login-page-container">
// //         <form onSubmit={handleSubmit} className="login-form">

// //           {/* Title */}
// //           <h2 className="text-3xl font-medium text-gray-900 dark:text-white">
// //             {state === "login" ? "Sign In" : "Sign Up"}
// //           </h2>

// //           <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
// //             {state === "login"
// //               ? "Enter email and password to continue"
// //               : "Create your account"}
// //           </p>

// //           {/* Name Field (Signup only) */}
// //           {state === "signup" && (
// //             <div className="mt-4">
// //               <label className="text-sm font-medium">Full Name</label>
// //               <div className="relative mt-2">
// //                 <AtSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
// //                 <input
// //                   value={username}
// //                   onChange={(e) => setUsername(e.target.value)}
// //                   type="text"
// //                   placeholder="Enter your username"
// //                   className="login-input"
// //                   required
// //                 />
// //               </div>
// //             </div>
// //           )}

// //           {/* Email */}
// //           <div className="mt-4">
// //             <label className="text-sm font-medium">Email</label>
// //             <div className="relative mt-2">
// //               <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
// //               <input
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 type="email"
// //                 placeholder="Enter email"
// //                 className="login-input"
// //                 required
// //               />
// //             </div>
// //           </div>

// //           {/* Password */}
// //           <div className="mt-4">
// //             <label className="text-sm font-medium">Password</label>
// //             <div className="relative mt-2">
// //               <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />

// //               <input
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 type={showPassword ? "text" : "password"}
// //                 placeholder="Enter password"
// //                 className="login-input pr-10"
// //                 required
// //               />

// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword((p) => !p)}
// //                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
// //               >
// //                 {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Submit */}
// //           <button type="submit" disabled={isSubmitting} className="login-button">
// //             {isSubmitting
// //               ? "Processing..."
// //               : state === "login"
// //               ? "Login"
// //               : "Sign Up"}
// //           </button>

// //           {/* Toggle */}
// //           {state === "login" ? (
// //             <p className="text-center py-6 text-sm text-gray-500">
// //               Don't have an account?{" "}
// //               <button
// //                 type="button"
// //                 onClick={() => setState("signup")}
// //                 className="text-green-600 hover:underline"
// //               >
// //                 Sign up
// //               </button>
// //             </p>
// //           ) : (
// //             <p className="text-center py-6 text-sm text-gray-500">
// //               Already have an account?{" "}
// //               <button
// //                 type="button"
// //                 onClick={() => setState("login")}
// //                 className="text-green-600 hover:underline"
// //               >
// //                 Login
// //               </button>
// //             </p>
// //           )}
// //         </form>
// //       </main>
// //     </>
// //   );
// // };

// // export default Login;
// import { AtSignIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
// import { useNavigate } from "react-router-dom"; // This should be here
// import { useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import { Toaster } from "react-hot-toast";

// const Login = () => {
//   const [state, setState] = useState<"login" | "signup">("login");
//   const [username, setUsername] = useState(""); 
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // --- ADD THIS LINE BELOW ---
//   const navigate = useNavigate(); 
//   // ---------------------------

//   const { login, signup } = useAppContext();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       if (state === "login") {
//         const response = await login({ email, password });
        
//         // Using your existing role-based logic
//         if (response?.isAdmin || response?.role === 'admin') {
//           navigate("/admin");
//         } else {
//           navigate("/app");
//         }
//       } else {
//         await signup({ username, email, password });
//         navigate("/onboarding");
//       }
//     } catch (err) {
//       console.error("Authentication detail error:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <Toaster />
//       <main className="login-page-container">
//         <form onSubmit={handleSubmit} className="login-form">
//           <h2 className="text-3xl font-medium text-gray-900 dark:text-white">
//             {state === "login" ? "Sign In" : "Sign Up"}
//           </h2>

//           <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//             {state === "login"
//               ? "Enter email and password to continue"
//               : "Create your account"}
//           </p>

//           {state === "signup" && (
//             <div className="mt-4">
//               <label className="text-sm font-medium">Full Name</label>
//               <div className="relative mt-2">
//                 <AtSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
//                 <input
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   type="text"
//                   placeholder="Enter your username"
//                   className="login-input"
//                   required
//                 />
//               </div>
//             </div>
//           )}

//           <div className="mt-4">
//             <label className="text-sm font-medium">Email</label>
//             <div className="relative mt-2">
//               <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
//               <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 type="email"
//                 placeholder="Enter email"
//                 className="login-input"
//                 required
//               />
//             </div>
//           </div>

//           <div className="mt-4">
//             <label className="text-sm font-medium">Password</label>
//             <div className="relative mt-2">
//               <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
//               <input
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter password"
//                 className="login-input pr-10"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((p) => !p)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//               >
//                 {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
//               </button>
//             </div>
//           </div>

//           <button type="submit" disabled={isSubmitting} className="login-button">
//             {isSubmitting
//               ? "Processing..."
//               : state === "login"
//               ? "Login"
//               : "Sign Up"}
//           </button>

//           {state === "login" ? (
//             <p className="text-center py-6 text-sm text-gray-500">
//               Don't have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => setState("signup")}
//                 className="text-green-600 hover:underline"
//               >
//                 Sign up
//               </button>
//             </p>
//           ) : (
//             <p className="text-center py-6 text-sm text-gray-500">
//               Already have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => setState("login")}
//                 className="text-green-600 hover:underline"
//               >
//                 Login
//               </button>
//             </p>
//           )}
//         </form>
//       </main>
//     </>
//   );
// };

// export default Login;
import { AtSignIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Toaster } from "react-hot-toast";

const Login = () => {
  const [state, setState] = useState<"login" | "signup">("login");
  const [name, setName] = useState(""); // Renamed from username to name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login, signup } = useAppContext();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    if (state === "login") {
      const response = await login({ email, password });
      
      // ADMIN CHECK: If backend returns role or isAdmin, redirect accordingly
      if (response?.isAdmin || response?.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/app");
      }
    } else {
      // SIGNUP LOGIC
      // FIX: We define 'result' here so the next line can use it
      const result = await signup({ name, email, password });
      
      if (result && result.token) {
        navigate("/onboarding");
      }
    }
  } catch (err) {
    console.error("Auth error:", err);
  } finally {
    setIsSubmitting(false);
  }
};

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       if (state === "login") {
//         const response = await login({ email, password });
        
//         // ADMIN CHECK: If backend returns role or isAdmin, redirect accordingly
//         if (response?.isAdmin || response?.role === 'admin') {
//           navigate("/admin");
//         } else {
//           navigate("/app");
//         }
//       } else {
//         // FIX: Sending 'name' instead of 'username' to satisfy Mongoose validation
//         await signup({ name, email, password });
//        if (result && result.token) {
//   navigate("/onboarding");
// }
//       }
//     } catch (err) {
//       console.error("Auth error:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

  return (
    <>
      <Toaster />
      <main className="login-page-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="text-3xl font-medium text-gray-900 dark:text-white">
            {state === "login" ? "Sign In" : "Sign Up"}
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {state === "login" ? "Enter email and password to continue" : "Create your account"}
          </p>

          {/* Name Field (Signup only) */}
          {state === "signup" && (
            <div className="mt-4">
              <label className="text-sm font-medium">Full Name</label>
              <div className="relative mt-2">
                <AtSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter your full name"
                  className="login-input"
                  required
                />
              </div>
            </div>
          )}

          <div className="mt-4">
            <label className="text-sm font-medium">Email</label>
            <div className="relative mt-2">
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
                className="login-input"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-2">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="login-input pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="login-button">
            {isSubmitting ? "Processing..." : state === "login" ? "Login" : "Sign Up"}
          </button>

          <p className="text-center py-6 text-sm text-gray-500">
            {state === "login" ? (
              <>Don't have an account? <button type="button" onClick={() => setState("signup")} className="text-green-600 hover:underline">Sign up</button></>
            ) : (
              <>Already have an account? <button type="button" onClick={() => setState("login")} className="text-green-600 hover:underline">Login</button></>
            )}
          </p>
        </form>
      </main>
    </>
  );
};

export default Login;