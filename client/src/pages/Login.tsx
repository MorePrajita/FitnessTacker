
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
