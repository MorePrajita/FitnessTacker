// import { Outlet } from "react-router-dom"
// import Sidebar from "../components/Sidebar"
// import BottomNav from "../components/BottomNav"


// const Layout = () => {
//   return (
//     <div className="layout-container">
//         <Sidebar />
//         <div className="flex-1 overflow-y-scroll">
//           <Outlet />
//         </div>
//       <BottomNav />
//     </div>
//   )
// }

// export default Layout
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      <Toaster position="top-right" />
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}