//   // // import React, { useEffect, useState } from 'react';
//   // // import api from '../configs/api'; // Ensuring we use your existing axios config
//   // // import toast from 'react-hot-toast';

//   // // const UserManagement = () => {
//   // //   const [users, setUsers] = useState<any[]>([]);
//   // //   const [searchTerm, setSearchTerm] = useState("");
//   // //   const [filterGoal, setFilterGoal] = useState("all");

//   // //   useEffect(() => {
//   // //     const fetchUsers = async () => {
//   // //       try {
//   // //         const { data } = await api.get('/admin/users');
//   // //         setUsers(data);
//   // //       } catch (err) {
//   // //         toast.error("Could not load users");
//   // //       }
//   // //     };
//   // //     fetchUsers();
//   // //   }, []);

//   // //   // --- 1. FILTER LOGIC ---
//   // //   const filteredUsers = users.filter(u => {
//   // //     const matchesName = (u.username || u.name || "").toLowerCase().includes(searchTerm.toLowerCase());
//   // //     const matchesGoal = filterGoal === "all" || u.goal === filterGoal;
//   // //     return matchesName && matchesGoal;
//   // //   });

//   // //   // --- 2. NATIVE CSV DOWNLOAD (No library needed) ---
//   // //   const downloadCSV = () => {
//   // //     const headers = "UserID,Name,Email,Age,Weight,Goal,Role\n";
//   // //     const rows = filteredUsers.map(u => 
//   // //       `${u._id},${u.username || u.name},${u.email},${u.age || 'N/A'},${u.weight || 'N/A'},${u.goal || 'N/A'},${u.isAdmin ? 'Admin' : 'User'}`
//   // //     ).join("\n");

//   // //     const blob = new Blob([headers + rows], { type: 'text/csv' });
//   // //     const url = window.URL.createObjectURL(blob);
//   // //     const a = document.createElement('a');
//   // //     a.href = url;
//   // //     a.download = `User_Report_${new Date().toLocaleDateString()}.csv`;
//   // //     a.click();
//   // //   };

//   // //   return (
//   // //     <div className="p-6 bg-gray-800 min-h-screen text-white">
//   // //       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//   // //         <h2 className="text-2xl font-bold">User Management</h2>
          
//   // //         <div className="flex gap-2">
//   // //           {/* Search Input */}
//   // //           <input 
//   // //             type="text" 
//   // //             placeholder="Search username..." 
//   // //             className="bg-gray-700 border border-gray-600 rounded px-4 py-2 text-sm focus:outline-none focus:border-emerald-500"
//   // //             onChange={(e) => setSearchTerm(e.target.value)}
//   // //           />

//   // //           {/* Goal Filter */}
//   // //           <select 
//   // //             className="bg-gray-700 border border-gray-600 rounded px-4 py-2 text-sm"
//   // //             onChange={(e) => setFilterGoal(e.target.value)}
//   // //           >
//   // //             <option value="all">All Goals</option>
//   // //             <option value="lose weight">Lose Weight</option>
//   // //             <option value="gain weight">Gain Weight</option>
//   // //             <option value="maintain">Maintain</option>
//   // //           </select>

//   // //           {/* Download Button */}
//   // //           <button 
//   // //             onClick={downloadCSV}
//   // //             className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded text-sm font-medium transition"
//   // //           >
//   // //             Download CSV
//   // //           </button>
//   // //         </div>
//   // //       </div>

//   // //       <div className="bg-gray-700 rounded-lg shadow-lg overflow-x-auto">
//   // //         <table className="w-full text-left border-collapse">
//   // //           <thead className="bg-gray-900 text-gray-400 uppercase text-xs font-semibold">
//   // //             <tr>
//   // //               <th className="p-4">User Details</th>
//   // //               <th className="p-4">Age/Weight</th>
//   // //               <th className="p-4">Goal</th>
//   // //               <th className="p-4">Role</th>
//   // //               <th className="p-4 text-center">Actions</th>
//   // //             </tr>
//   // //           </thead>
//   // //           <tbody className="divide-y divide-gray-600">
//   // //             {filteredUsers.map((u) => (
//   // //               // Inside your filteredUsers.map...
//   // // <tr key={u._id} className="hover:bg-gray-600 transition">
//   // //   <td className="p-4">
//   // //     {/* Change u.username to u.name to match your schema */}
//   // //     <div className="font-medium text-white">{u.name}</div>
//   // //     <div className="text-xs text-gray-400">{u.email}</div>
//   // //   </td>
//   // //   <td className="p-4 text-sm">
//   // //     {/* These will now work once you update the schema and save data */}
//   // //     {u.age ? `${u.age} yrs` : 'N/A'} / {u.weight ? `${u.weight} kg` : 'N/A'}
//   // //   </td>
//   // //   <td className="p-4 text-sm">
//   // //     <span className="capitalize px-2 py-1 bg-gray-800 rounded text-emerald-400 border border-emerald-900">
//   // //       {u.goal || "Not Set"}
//   // //     </span>
//   // //   </td>
//   // //   <td className="p-4">
//   // //     {/* This matches your isAdmin: Boolean field */}
//   // //     <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${u.isAdmin ? 'bg-purple-900 text-purple-200' : 'bg-blue-900 text-blue-200'}`}>
//   // //       {u.isAdmin ? 'Admin' : 'User'}
//   // //     </span>
//   // //   </td>
//   // //   {/* ... rest of the row */}
//   // // </tr>
//   // //               // <tr key={u._id} className="hover:bg-gray-600 transition">
//   // //               //   <td className="p-4">
//   // //               //     <div className="font-medium text-white">{u.username || u.name}</div>
//   // //               //     <div className="text-xs text-gray-400">{u.email}</div>
//   // //               //   </td>
//   // //               //   <td className="p-4 text-sm">
//   // //               //     {u.age ? `${u.age} yrs` : 'N/A'} / {u.weight ? `${u.weight} kg` : 'N/A'}
//   // //               //   </td>
//   // //               //   <td className="p-4 text-sm">
//   // //               //     <span className="capitalize px-2 py-1 bg-gray-800 rounded text-emerald-400 border border-emerald-900">
//   // //               //       {u.goal || "Not Set"}
//   // //               //     </span>
//   // //               //   </td>
//   // //               //   <td className="p-4">
//   // //               //     <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${u.isAdmin ? 'bg-purple-900 text-purple-200' : 'bg-blue-900 text-blue-200'}`}>
//   // //               //       {u.isAdmin ? 'Admin' : 'User'}
//   // //               //     </span>
//   // //               //   </td>
//   // //               //   <td className="p-4 text-center">
//   // //               //     <button className="text-red-400 hover:text-red-300 text-sm font-medium">Delete</button>
//   // //               //   </td>
//   // //               // </tr>
//   // //             ))}
//   // //           </tbody>
//   // //         </table>
//   // //         {filteredUsers.length === 0 && (
//   // //           <div className="p-10 text-center text-gray-400">No users found matching filters.</div>
//   // //         )}
//   // //       </div>
//   // //     </div>
//   // //   );
//   // // };

//   // // export default UserManagement;
//   // import React, { useEffect, useState } from 'react';
//   // import api from '../configs/api';
//   // import toast from 'react-hot-toast';

//   // const UserManagement = () => {
//   //   const [users, setUsers] = useState<any[]>([]);
//   //   const [searchTerm, setSearchTerm] = useState("");
//   //   const [filterGoal, setFilterGoal] = useState("all");

//   //   useEffect(() => {
//   //     const fetchUsers = async () => {
//   //       try {
//   //         // This now calls the backend route using $lookup to join User + Profile
//   //         const { data } = await api.get('/admin/users');
//   //         setUsers(data);
//   //       } catch (err) {
//   //         toast.error("Could not load users");
//   //       }
//   //     };
//   //     fetchUsers();
//   //   }, []);

//   //   // --- 1. UPDATED FILTER LOGIC ---
//   //   const filteredUsers = users.filter(u => {
//   //     const matchesName = (u.name || "").toLowerCase().includes(searchTerm.toLowerCase());
//   //     // Look inside physicalData for the goal
//   //     const userGoal = u.physicalData?.goal || "not set";
//   //     const matchesGoal = filterGoal === "all" || userGoal.toLowerCase() === filterGoal.toLowerCase();
//   //     return matchesName && matchesGoal;
//   //   });

//   //   // --- 2. UPDATED CSV DOWNLOAD (Includes Physical Data) ---
//   //   const downloadCSV = () => {
//   //     const headers = "UserID,Name,Email,Age,Weight,Goal,Role\n";
//   //     const rows = filteredUsers.map(u => {
//   //       const age = u.physicalData?.age || 'N/A';
//   //       const weight = u.physicalData?.weight || 'N/A';
//   //       const goal = u.physicalData?.goal || 'Not Set';
//   //       const role = u.isAdmin ? 'Admin' : 'User';
//   //       return `${u._id},${u.name},${u.email},${age},${weight},${goal},${role}`;
//   //     }).join("\n");

//   //     const blob = new Blob([headers + rows], { type: 'text/csv' });
//   //     const url = window.URL.createObjectURL(blob);
//   //     const a = document.createElement('a');
//   //     a.href = url;
//   //     a.download = `User_Report_${new Date().toLocaleDateString()}.csv`;
//   //     a.click();
//   //   };

//   //   return (
//   //     <div className="p-6 bg-gray-800 min-h-screen text-white">
//   //       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//   //         <h2 className="text-2xl font-bold">User Management</h2>
          
//   //         <div className="flex gap-2">
//   //           <input 
//   //             type="text" 
//   //             placeholder="Search by name..." 
//   //             className="bg-gray-700 border border-gray-600 rounded px-4 py-2 text-sm focus:outline-none focus:border-emerald-500"
//   //             onChange={(e) => setSearchTerm(e.target.value)}
//   //           />

//   // <select 
//   //   className="bg-gray-700 border border-gray-600 rounded px-4 py-2 text-sm"
//   //   onChange={(e) => setFilterGoal(e.target.value)}
//   // >
//   //   <option value="all">All Goals</option>
//   //   {/* Ensure these values match your DB string exactly, or use the lowercase fix above */}
//   //   <option value="maintain">Maintain</option>
//   //   <option value="lose weight">Lose Weight</option>
//   //   <option value="gain weight">Gain Weight</option>
//   // </select>

//   //           <button 
//   //             onClick={downloadCSV}
//   //             className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded text-sm font-medium transition"
//   //           >
//   //             Download CSV
//   //           </button>
//   //         </div>
//   //       </div>

//   //       <div className="bg-gray-700 rounded-lg shadow-lg overflow-x-auto">
//   //         <table className="w-full text-left border-collapse">
//   //           <thead className="bg-gray-900 text-gray-400 uppercase text-xs font-semibold">
//   //             <tr>
//   //               <th className="p-4 border-b border-gray-600">User Details</th>
//   //               <th className="p-4 border-b border-gray-600">Age / Weight</th>
//   //               <th className="p-4 border-b border-gray-600">Goal</th>
//   //               <th className="p-4 border-b border-gray-600">Role</th>
//   //               <th className="p-4 border-b border-gray-600 text-center">Actions</th>
//   //             </tr>
//   //           </thead>
//   //           <tbody className="divide-y divide-gray-600">
//   //             {filteredUsers.map((u) => (
//   //               <tr key={u._id} className="hover:bg-gray-600 transition">
//   //                 <td className="p-4">
//   //                   <div className="font-medium text-white">{u.name}</div>
//   //                   <div className="text-xs text-gray-400">{u.email}</div>
//   //                 </td>
//   //                 <td className="p-4 text-sm">
//   //                   {/* Accessing age/weight from the joined physicalData object */}
//   //                   {u.physicalData?.age ? `${u.physicalData.age} yrs` : 'N/A'} / 
//   //                   {u.physicalData?.weight ? ` ${u.physicalData.weight} kg` : ' N/A'}
//   //                 </td>
//   //                 <td className="p-4 text-sm">
//   //                   <span className="capitalize px-2 py-1 bg-gray-800 rounded text-emerald-400 border border-emerald-900">
//   //                     {u.physicalData?.goal || "Not Set"}
//   //                   </span>
//   //                 </td>
//   //                 <td className="p-4">
//   //                   <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${u.isAdmin ? 'bg-purple-900 text-purple-200' : 'bg-blue-900 text-blue-200'}`}>
//   //                     {u.isAdmin ? 'Admin' : 'User'}
//   //                   </span>
//   //                 </td>
//   //                 <td className="p-4 text-center">
//   //                   <button className="text-red-400 hover:text-red-300 text-sm font-medium">Delete</button>
//   //                 </td>
//   //               </tr>
//   //             ))}
//   //           </tbody>
//   //         </table>
//   //         {filteredUsers.length === 0 && (
//   //           <div className="p-10 text-center text-gray-400">No users found matching filters.</div>
//   //         )}
//   //       </div>
//   //     </div>
//   //   );
//   // };

//   // export default UserManagement;
//   import React, { useEffect, useState } from 'react';
//   import api from '../configs/api';
//   import toast from 'react-hot-toast';

//   const UserManagement = () => {
//     const [users, setUsers] = useState<any[]>([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filterGoal, setFilterGoal] = useState("all");

//     useEffect(() => {
//       const fetchUsers = async () => {
//         try {
//           const { data } = await api.get('/admin/users');
//           setUsers(data);
//         } catch (err) {
//           toast.error("Could not load users");
//         }
//       };
//       fetchUsers();
//     }, []);

//     // --- 1. FIXED FILTER LOGIC ---
//     const filteredUsers = users.filter(u => {
//       const matchesName = (u.name || "").toLowerCase().includes(searchTerm.toLowerCase());
      
//       // Normalize the goal from DB (e.g., "lose")
//       const userGoal = (u.physicalData?.goal || "not set").toLowerCase().trim();
      
//       // If filter is "all", show everyone. Otherwise, match exactly.
//       const matchesGoal = filterGoal === "all" || userGoal === filterGoal;
      
//       return matchesName && matchesGoal;
//     });

//     // --- 2. CSV DOWNLOAD ---
//     const downloadCSV = () => {
//       const headers = "UserID,Name,Email,Age,Weight,Goal,Role\n";
//       const rows = filteredUsers.map(u => {
//         const age = u.physicalData?.age || 'N/A';
//         const weight = u.physicalData?.weight || 'N/A';
//         const goal = u.physicalData?.goal || 'Not Set';
//         const role = u.isAdmin ? 'Admin' : 'User';
//         return `${u._id},${u.name},${u.email},${age},${weight},${goal},${role}`;
//       }).join("\n");

//       const blob = new Blob([headers + rows], { type: 'text/csv' });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `User_Report_${new Date().toLocaleDateString()}.csv`;
//       a.click();
//     };

// const handleDelete = async (userId: string, userName: string) => {
//   if (!window.confirm(`Are you sure you want to delete ${userName}?`)) return;

//   try {
//     // 1. Get the token (usually stored during login)
//     const token = localStorage.getItem("token"); 

//     // 2. Send the request with the Authorization Header
//     await api.delete(`/admin/users/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${token}` 
//       }
//     });
    
//     // 3. Update the UI locally so the user disappears
//     setUsers(prevUsers => prevUsers.filter(u => u._id !== userId));
//     toast.success(`${userName} deleted successfully`);
//   } catch (err: any) {
//     console.error("Delete Error:", err.response?.data);
//     toast.error(err.response?.data?.message || "Delete failed");
//   }
// };
//     return (
//       <div className="p-6 bg-gray-800 min-h-screen text-white">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//           <h2 className="text-2xl font-bold">User Management</h2>
          
//           <div className="flex gap-2">
//             <input 
//               type="text" 
//               placeholder="Search by name..." 
//               className="bg-gray-700 border border-gray-600 rounded px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 text-white"
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />

//             {/* FIXED SELECT VALUES TO MATCH YOUR MONGODB DATA */}
//             <select 
//               className="bg-gray-700 border border-gray-600 rounded px-4 py-2 text-sm text-white"
//               onChange={(e) => setFilterGoal(e.target.value)}
//               value={filterGoal}
//             >
//               <option value="all">All Goals</option>
//               <option value="lose">Lose Weight</option>
//               <option value="gain">Gain Weight</option>
//               <option value="maintain">Maintain</option>
//             </select>

//             <button 
//               onClick={downloadCSV}
//               className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded text-sm font-medium transition"
//             >
//               Download CSV
//             </button>
//           </div>
//         </div>

//         <div className="bg-gray-700 rounded-lg shadow-lg overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-gray-900 text-gray-400 uppercase text-xs font-semibold">
//               <tr>
//                 <th className="p-4 border-b border-gray-600">User Details</th>
//                 <th className="p-4 border-b border-gray-600">Age / Weight</th>
//                 <th className="p-4 border-b border-gray-600">Goal</th>
//                 <th className="p-4 border-b border-gray-600">Role</th>
//                 <th className="p-4 border-b border-gray-600 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-600">
//               {filteredUsers.map((u) => (
//                 <tr key={u._id} className="hover:bg-gray-600 transition">
//                   <td className="p-4">
//                     <div className="font-medium text-white">{u.name}</div>
//                     <div className="text-xs text-gray-400">{u.email}</div>
//                   </td>
//                   <td className="p-4 text-sm">
//                     {u.physicalData?.age ? `${u.physicalData.age} yrs` : 'N/A'} / 
//                     {u.physicalData?.weight ? ` ${u.physicalData.weight} kg` : ' N/A'}
//                   </td>
//                   <td className="p-4 text-sm">
//                     <span className="capitalize px-2 py-1 bg-gray-800 rounded text-emerald-400 border border-emerald-900">
//                       {u.physicalData?.goal || "Not Set"}
//                     </span>
//                   </td>
//                   <td className="p-4">
//                     <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${u.isAdmin ? 'bg-purple-900 text-purple-200' : 'bg-blue-900 text-blue-200'}`}>
//                       {u.isAdmin ? 'Admin' : 'User'}
//                     </span>
//                   </td>
// <td className="p-4 text-center">
//   <button 
//     onClick={() => handleDelete(u._id, u.name)}
//     className="text-red-400 hover:text-red-600 hover:bg-red-900/20 px-3 py-1 rounded transition-colors text-sm font-medium"
//   >
//     Delete
//   </button>
// </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {filteredUsers.length === 0 && (
//             <div className="p-10 text-center text-gray-400">No users found matching filters.</div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   export default UserManagement;


import React, { useEffect, useState } from 'react';
import api from '../configs/api';
import toast from 'react-hot-toast';

const UserManagement = () => {

  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGoal, setFilterGoal] = useState("all");

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const { data } = await api.get('/admin/users');

        setUsers(
          Array.isArray(data.users)
            ? data.users
            : []
        );

      } catch (err) {

        console.error("Users fetch error:", err);

        toast.error("Could not load users");

        setUsers([]);
      }
    };

    fetchUsers();

  }, []);

  // FILTER USERS
  const filteredUsers = Array.isArray(users)
    ? users.filter((u) => {

        const matchesName = (u.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const userGoal = (
          u.physicalData?.goal || "not set"
        )
          .toLowerCase()
          .trim();

        const matchesGoal =
          filterGoal === "all" ||
          userGoal === filterGoal;

        return matchesName && matchesGoal;

      })
    : [];

  // DOWNLOAD CSV
  const downloadCSV = () => {

    const headers =
      "UserID,Name,Email,Age,Weight,Goal,Role\n";

    const rows = filteredUsers
      .map((u) => {

        const age =
          u.physicalData?.age || 'N/A';

        const weight =
          u.physicalData?.weight || 'N/A';

        const goal =
          u.physicalData?.goal || 'Not Set';

        const role =
          u.isAdmin ? 'Admin' : 'User';

        return `${u._id},${u.name},${u.email},${age},${weight},${goal},${role}`;

      })
      .join("\n");

    const blob = new Blob(
      [headers + rows],
      { type: 'text/csv' }
    );

    const url =
      window.URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = url;

    a.download =
      `User_Report_${new Date().toLocaleDateString()}.csv`;

    a.click();
  };

  // DELETE USER
  const handleDelete = async (
    userId: string,
    userName: string
  ) => {

    if (
      !window.confirm(
        `Are you sure you want to delete ${userName}?`
      )
    ) return;

    try {

      const token =
        localStorage.getItem("token");

      await api.delete(
        `/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers((prevUsers) =>
        prevUsers.filter(
          (u) => u._id !== userId
        )
      );

      toast.success(
        `${userName} deleted successfully`
      );

    } catch (err: any) {

      console.error(
        "Delete Error:",
        err.response?.data
      );

      toast.error(
        err.response?.data?.message ||
        "Delete failed"
      );
    }
  };

  return (

    <div className="p-6 bg-gray-800 min-h-screen text-white">

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">

        <h2 className="text-2xl font-bold">
          User Management
        </h2>

        <div className="flex gap-2">

          <input
            type="text"
            placeholder="Search by name..."
            className="bg-gray-700 border border-gray-600 rounded px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 text-white"
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          <select
            className="bg-gray-700 border border-gray-600 rounded px-4 py-2 text-sm text-white"
            onChange={(e) =>
              setFilterGoal(e.target.value)
            }
            value={filterGoal}
          >
            <option value="all">
              All Goals
            </option>

            <option value="lose">
              Lose Weight
            </option>

            <option value="gain">
              Gain Weight
            </option>

            <option value="maintain">
              Maintain
            </option>

          </select>

          <button
            onClick={downloadCSV}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded text-sm font-medium transition"
          >
            Download CSV
          </button>

        </div>
      </div>

      <div className="bg-gray-700 rounded-lg shadow-lg overflow-x-auto">

        <table className="w-full text-left border-collapse">

          <thead className="bg-gray-900 text-gray-400 uppercase text-xs font-semibold">

            <tr>

              <th className="p-4 border-b border-gray-600">
                User Details
              </th>

              <th className="p-4 border-b border-gray-600">
                Age / Weight
              </th>

              <th className="p-4 border-b border-gray-600">
                Goal
              </th>

              <th className="p-4 border-b border-gray-600">
                Role
              </th>

              <th className="p-4 border-b border-gray-600 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-600">

            {filteredUsers.map((u) => (

              <tr
                key={u._id}
                className="hover:bg-gray-600 transition"
              >

                <td className="p-4">

                  <div className="font-medium text-white">
                    {u.name}
                  </div>

                  <div className="text-xs text-gray-400">
                    {u.email}
                  </div>

                </td>

                <td className="p-4 text-sm">

                  {u.physicalData?.age
                    ? `${u.physicalData.age} yrs`
                    : 'N/A'}

                  /

                  {u.physicalData?.weight
                    ? ` ${u.physicalData.weight} kg`
                    : ' N/A'}

                </td>

                <td className="p-4 text-sm">

                  <span className="capitalize px-2 py-1 bg-gray-800 rounded text-emerald-400 border border-emerald-900">

                    {u.physicalData?.goal ||
                      "Not Set"}

                  </span>

                </td>

                <td className="p-4">

                  <span
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      u.isAdmin
                        ? 'bg-purple-900 text-purple-200'
                        : 'bg-blue-900 text-blue-200'
                    }`}
                  >

                    {u.isAdmin
                      ? 'Admin'
                      : 'User'}

                  </span>

                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() =>
                      handleDelete(
                        u._id,
                        u.name
                      )
                    }
                    className="text-red-400 hover:text-red-600 hover:bg-red-900/20 px-3 py-1 rounded transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {filteredUsers.length === 0 && (

          <div className="p-10 text-center text-gray-400">

            No users found matching filters.

          </div>

        )}

      </div>

    </div>
  );
};

export default UserManagement;