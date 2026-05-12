import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-slate-800">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="block p-3 rounded hover:bg-slate-800">Dashboard</Link>
          <Link to="/admin/users" className="block p-3 rounded hover:bg-slate-800">Users</Link>
          <Link to="/admin/logs" className="block p-3 rounded hover:bg-slate-800">Food Logs</Link>
          <Link to="/admin/activity-logs" className="block p-3 rounded hover:bg-slate-800">Activity Logs</Link>
          {/* <Link to="/admin/users-status" className="block p-3 rounded hover:bg-slate-800">User Status</Link> */}
          <Link to="/app" className="block p-3 rounded hover:bg-slate-800 text-gray-400 border-t border-slate-800 mt-4">Back to User App</Link>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;