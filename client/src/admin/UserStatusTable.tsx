// import React, { useEffect, useState } from 'react';
// import api from '../configs/api';

// const UserStatusTable = () => {
//   const [users, setUsers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.get('/admin/users-status')
//       .then(res => {
//         setUsers(res.data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   return (
//     <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden text-white border border-gray-800">
//       <div className="bg-gray-800 p-6 border-b border-gray-700">
//         <h1 className="text-2xl font-extrabold text-blue-400">AdminMasterReport</h1>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-left">
//           <thead>
//             <tr className="bg-gray-800/50 text-gray-400 uppercase text-xs">
//               <th className="p-4">User Details</th>
//               <th className="p-4">Account Created</th>
//               <th className="p-4">Goal Timeline</th>
//               <th className="p-4 text-center">Status</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-800">
//             {users.map((user) => (
//               <tr key={user._id} className="hover:bg-gray-800/40">
//                 <td className="p-4">
//                   <div className="font-bold text-blue-100">{user.username}</div>
//                   <div className="text-xs text-gray-500">{user.email}</div>
//                 </td>
//                 <td className="p-4 text-sm">
//                   {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
//                 </td>
//                 <td className="p-4">
//                   <div className="text-emerald-400 font-semibold text-sm capitalize">{user.goal}</div>
//                   <div className="text-[10px] text-gray-500">{user.startDate} → {user.estimatedEndDate}</div>
//                 </td>
//                 <td className="p-4 text-center">
//                   <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
//                     user.status === 'Active' ? 'bg-green-900/30 text-green-400 border-green-800' : 'bg-red-900/30 text-red-400 border-red-800'
//                   }`}>
//                     {user.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserStatusTable;
import React, { useEffect, useState } from 'react';
import api from '../configs/api';

const UserStatusTable = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    api.get('/admin/users-status').then(res => setUsers(res.data));
  }, []);

  return (
    <div className="bg-gray-900 rounded-xl shadow-2xl text-white border border-gray-800">
      <div className="bg-gray-800 p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-blue-400">AdminMasterReport</h1>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-800/50 text-gray-400 text-xs uppercase">
            <th className="p-4">User</th>
            <th className="p-4">Joined</th>
            <th className="p-4">Goal Timeline</th>
            <th className="p-4 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-800/40 transition">
              <td className="p-4">
                <div className="font-bold text-blue-100">{user.username}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </td>
              <td className="p-4 text-sm">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </td>
              <td className="p-4">
                <div className="text-emerald-400 font-semibold text-sm capitalize">{user.goal}</div>
                <div className="text-[10px] text-gray-500">{user.startDate} → {user.estimatedEndDate}</div>
              </td>
              <td className="p-4 text-center">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                  user.status === 'Active' ? 'bg-green-900/30 text-green-400 border-green-800' : 'bg-red-900/30 text-red-400 border-red-800'
                }`}>
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserStatusTable;