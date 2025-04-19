// import React, { useState } from "react";
// import { Link } from 'react-router-dom';
// import Searchbar from "../components/Searchbar";
// import Table from "../components/Table";

// const ManajemenPengguna = ({ isSidebarOpen }) => {
//   const [searchQuery, setSearchQuery] = useState("");

//   return (
//     <div className="flex transition-all duration-300">
//       <div className={`bg-ungu10 pt-20 h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
//         <div className="grid grid-cols-2 px-4">
//           <div className="flex flex-col md:flex-row text-left md:gap-1">
//             <p className="text-xl">User Management</p>
//             <p className="text-xs pt-2  text-gray-600">User List</p>
//           </div>
//           <div className="flex flex-row justify-end">
//             <Link to="/manajemen-pengguna" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
//               <i class="fa-solid fa-house-chimney text-xs"></i>
//               <p className="text-xs md:text-sm">Home</p>
//             </Link>
//           </div>
//         </div>
//         <div className="bg-white m-4 py-4 rounded-lg shadow-md">
//           <div className="grid grid-cols-2 px-4 items-center">
//             <div className="text-left md:text-xl">
//               <p>User List</p>
//             </div>
//             <div className="flex gap-3 items-center">
//               <Searchbar forWhat="user" onSearch={setSearchQuery} />
//               <Link to="/tambah-pengguna">
//                 <button className="bg-ungu7 text-white rounded-xl px-2 py-1 hidden md:inline">
//                   <i className="ri-add-line mr-1"></i>
//                   <span>User</span>
//                 </button>
//                 <button className="bg-ungu7 text-white rounded-3xl md:rounded-xl px-2 py-1 items-center md:hidden">
//                   <i className="ri-user-add-line text-xl"></i>
//                 </button>
//               </Link>
//             </div>
//           </div>
//           <div>
//             <Table searchQuery={searchQuery} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManajemenPengguna

// import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { getUsers } from "../redux/actions/adminActions";
// import Searchbar from "../components/Searchbar";
// import Table from "../components/Table";
// // import Loader from "../components/Loader";
// // import Message from "../components/Message";

// const ManajemenPengguna = ({ isSidebarOpen }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const dispatch = useDispatch();
  
//   // Get users from Redux store
//   const adminUsers = useSelector((state) => state.admin);
//   const { loading, error, users } = adminUsers;

//   useEffect(() => {
//     dispatch(getUsers());
//   }, [dispatch]);

//   // Filter users based on search query
//   const filteredUsers = users?.filter(user =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="flex transition-all duration-300">
//       <div className={`bg-ungu10 pt-20 h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
//         <div className="grid grid-cols-2 px-4">
//           <div className="flex flex-col md:flex-row text-left md:gap-1">
//             <p className="text-xl">User Management</p>
//             <p className="text-xs pt-2  text-gray-600">User List</p>
//           </div>
//           <div className="flex flex-row justify-end">
//             <Link to="/manajemen-pengguna" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
//               <i className="fa-solid fa-house-chimney text-xs"></i>
//               <p className="text-xs md:text-sm">Home</p>
//             </Link>
//           </div>
//         </div>
//         <div className="bg-white m-4 py-4 rounded-lg shadow-md">
//           <div className="grid grid-cols-2 px-4 items-center">
//             <div className="text-left md:text-xl">
//               <p>User List</p>
//             </div>
//             <div className="flex gap-3 items-center">
//               <Searchbar forWhat="user" onSearch={setSearchQuery} />
//               <Link to="/tambah-pengguna">
//                 <button className="bg-ungu7 text-white rounded-xl px-2 py-1 hidden md:inline">
//                   <i className="ri-add-line mr-1"></i>
//                   <span>User</span>
//                 </button>
//                 <button className="bg-ungu7 text-white rounded-3xl md:rounded-xl px-2 py-1 items-center md:hidden">
//                   <i className="ri-user-add-line text-xl"></i>
//                 </button>
//               </Link>
//             </div>
//           </div>
          
//           {loading ? (
//             <Loader />
//           ) : error ? (
//             <Message variant="danger">{error}</Message>
//           ) : (
//             <div>
//               <Table 
//                 searchQuery={searchQuery}
//                 users={filteredUsers}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManajemenPengguna;

// ManajemenPengguna.jsx
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/adminActions";
import Searchbar from "../components/Searchbar";
import Table from "../components/Table";

const ManajemenPengguna = ({ isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  
  const { loading, error, users } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers = users?.filter(user => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        {/* Header section remains same */}
        
        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          {/* Search/Add User section remains same */}

          <div className="px-4 mt-4">
            {loading ? (
              <div className="text-center py-4 text-gray-500">Loading users...</div>
            ) : error ? (
              <div className="text-red-500 text-center py-4">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Name</th>
                      <th className="text-left py-3">Email</th>
                      <th className="text-left py-3">Joined Date</th>
                      <th className="text-left py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers?.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-3">{user.name}</td>
                        <td className="py-3">{user.email}</td>
                        <td className="py-3">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          <button className="text-ungu7 hover:text-ungu9 mr-2">
                            <i className="ri-edit-line"></i>
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {!filteredUsers?.length && (
                  <div className="text-center py-4 text-gray-500">
                    {searchQuery ? `No results for "${searchQuery}"` : "No users found"}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenPengguna;