// import React, { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Button from "../components/Button";
// import { getUserById, updateUserAmount } from "../redux/actions/adminActions";

// const EditSaldoPengguna = ({ isSidebarOpen }) => {
//   const { userId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const { 
//     currentUser,
//     loadingFetchById: loading,
//     errorFetchById: error,
//     loadingUpdateAmount,
//     errorUpdateAmount
//   } = useSelector((state) => state.admin);

//   const [changeAmount, setChangeAmount] = useState("");
//   const [changeType, setChangeType] = useState("tambah");
//   const [labelColor, setLabelColor] = useState("");

//   useEffect(() => {
//     if (userId) {
//       dispatch(getUserById(userId));
//     }
//   }, [dispatch, userId]);

//   const handleChangeAmount = (e) => {
//     const value = e.target.value.replace(/\D/g, '');
//     setChangeAmount(value);

//     if (currentUser) {
//       const amount = parseInt(value || 0);
//       const newSaldo = changeType === "tambah" 
//         ? currentUser.currentAmount + amount 
//         : currentUser.currentAmount - amount;
        
//       setLabelColor(changeType === "tambah" ? "green" : "red");
//     }
//   };

//   const handleChangeType = (e) => {
//     setChangeType(e.target.value);
//     setChangeAmount("");
//     setLabelColor("");
//   };

//   const handleReset = () => {
//     setChangeAmount("");
//     setLabelColor("");
//   };

//   const handleSubmit = () => {
//     if (!changeAmount || isNaN(changeAmount)) {
//       alert("Please enter a valid amount");
//       return;
//     }

//     const amount = changeType === "tambah" 
//       ? parseInt(changeAmount)
//       : -parseInt(changeAmount);

//     dispatch(updateUserAmount(currentUser.id, amount, "adding"))
//       .then(() => {
//         alert("Saldo updated successfully!");
//         navigate("/manajemen-pengguna");
//       })
//       .catch((error) => {
//         alert(`Update failed: ${error.message}`);
//       });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-ungu1">Loading user data...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-red-500">{error}</div>
//       </div>
//     );
//   }

//   if (!currentUser) {
//     return (
//       <div className="text-center py-8">
//         <p className="text-red-500">User not found</p>
//         {userId && (
//           <p className="text-sm text-gray-600 mt-2">
//             User ID: {userId}
//           </p>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="flex transition-all duration-300">
//       <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
//         <div className="grid grid-cols-2 px-4">
//           <div className="flex flex-col md:flex-row text-left md:gap-1">
//             <p className="text-xl">User Management</p>
//             <p className="text-xs pt-2 text-gray-600">Edit Saldo</p>
//           </div>
//           <div className="flex flex-row justify-end">
//             <Link to="/manajemen-pengguna" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
//               <i className="fa-solid fa-house-chimney text-xs"></i>
//               <p className="text-xs md:text-sm">Home</p>
//             </Link>
//             <Link to={`/edit-saldo-pengguna`} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
//               <p>/</p>
//               <p className="text-xs md:text-sm">Edit Saldo</p>
//             </Link>
//           </div>
//         </div>

//         <div className="bg-white m-4 py-4 rounded-lg shadow-md">
//           <div className="flex-col px-4 items-center">
//             <div className="text-left md:text-xl mb-6 md:mb-12">
//               <p>Edit Saldo</p>
//             </div>
//             <div className="flex flex-col mb-2 md:mb-4 items-center">
//               <div className="text-left">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   <label className="text-red-700 mr-1">*</label>Change Type
//                 </label>
//                 <div className="md:w-96 w-64">
//                   <select
//                     value={changeType}
//                     onChange={handleChangeType}
//                     className="w-full md:text-base text-sm mt-1 pt-2 pb-2 pl-1 border border-gray-300 text-gray-600 bg-white rounded-lg"
//                   >
//                     <option value="tambah">Tambah Saldo</option>
//                     <option value="kurang">Kurang Saldo</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
  
//             <div className="flex flex-col mb-2 md:mb-4 items-center">
//               <div className="text-left">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   <label className="text-red-700 mr-1">*</label>User ID
//                 </label>
//                 <div className="md:w-96 w-64">
//                   <input
//                     type="text"
//                     value={user.id}
//                     className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 bg-gray-300 rounded-lg"
//                     disabled
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col mb-2 md:mb-4 items-center">
//               <div className="text-left">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   <label className="text-red-700 mr-1">*</label>Name
//                 </label>
//                 <div className="md:w-96 w-64">
//                   <input
//                     type="text"
//                     value={user.nama}
//                     className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 bg-gray-300 rounded-lg"
//                     disabled
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col mb-2 md:mb-4 items-center">
//               <div className="text-left">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   <label className="text-red-700 mr-1">*</label>Email
//                 </label>
//                 <div className="md:w-96 w-64">
//                   <input
//                     type="text"
//                     value={user.email}
//                     className="w-full md:text-base text-sm mt-1 p-2 border font-bold border-gray-300 text-gray-600 bg-gray-300 rounded-lg"
//                     disabled
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col mb-2 md:mb-4 items-center">
//               <div className="text-left">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   <span className="text-red-700 mr-1">*</span>Current Saldo Amount
//                 </label>
//                 <div className="md:w-96 w-64">
//                   <input
//                     type="text"
//                     value={`Rp. ${currentUser.currentAmount.toLocaleString()}`}
//                     className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 bg-gray-300 rounded-lg"
//                     disabled
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col mb-2 md:mb-4 items-center">
//               <div className="text-left">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   <label className="text-red-700 mr-1">*</label>Change Amount
//                 </label>
//                 <div className="flex md:w-96 w-64 items-center">
//                   <span className="mr-2 text-sm">Rp.</span> {/* Adding "Rp." prefix */}
//                   <input
//                     type="number"
//                     value={changeAmount}
//                     onChange={handleChangeAmount}
//                     className={`w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 rounded-lg ${labelColor === "green" ? "bg-green-100" : labelColor === "red" ? "bg-red-100" : "bg-white"}`}
//                   />
//                   <div className="absolute mt-1 ml-36 md:ml-64 text-sm md:text-base">
//                     {labelColor && (
//                       <span className={`text-${labelColor}-500 mt-1`}>
//                         {labelColor === "green" ? `+ Rp. ${newSaldo - currentSaldo}` : `- Rp. ${currentSaldo - newSaldo}`}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col mb-2 md:mb-4 items-center">
//               <div className="text-left">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   <label className="text-red-700 mr-1">*</label>New Saldo Amount
//                 </label>
//                 <div className="md:w-96 w-64">
//                   <input
//                     type="text"
//                     value={`Rp. ${newSaldo.toLocaleString()}`}
//                     className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 bg-gray-300 rounded-lg"
//                     disabled
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {errorUpdateAmount && (
//             <div className="text-center text-red-500 mb-4">
//               {errorUpdateAmount}
//             </div>
//           )}

//           <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
//             <Button text="Reset" bgColor="bg-yellow1" onClick={handleReset} />
//             <Button text="Submit" bgColor="bg-blue1" onClick={handleSubmit} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditSaldoPengguna
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { updateUserAmount } from "../redux/actions/adminActions";

const EditSaldoPengguna = ({ isSidebarOpen }) => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [changeAmount, setChangeAmount] = useState("");
  const [changeType, setChangeType] = useState("tambah");
  const [labelColor, setLabelColor] = useState("");

  const handleChangeAmount = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setChangeAmount(value);

    const numericValue = parseInt(value || 0);
    setLabelColor(changeType === "tambah" ? "green" : "red");
  };

  const handleChangeType = (e) => {
    setChangeType(e.target.value);
    setChangeAmount("");
    setLabelColor("");
  };

  const handleReset = () => {
    setChangeAmount("");
    setLabelColor("");
  };

  const handleSubmit = () => {
    if (!userId) {
      alert("User ID tidak valid");
      return;
    }

    if (!changeAmount || isNaN(changeAmount)) {
      alert("Masukkan jumlah yang valid");
      return;
    }

    const numericAmount = parseInt(changeAmount);
    const finalAmount = changeType === "tambah" ? numericAmount : -numericAmount;

    dispatch(updateUserAmount(userId, finalAmount))
      .then(() => {
        alert("Saldo berhasil diperbarui!");
        navigate("/manajemen-pengguna");
      })
      .catch((error) => {
        alert(`Gagal memperbarui saldo: ${error.message}`);
      });
  };

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${
        isSidebarOpen 
          ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" 
          : "ml-0 w-full"
      }`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">User Management</p>
            <p className="text-xs pt-2 text-gray-600">Edit Saldo</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-pengguna" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link to={`/edit-saldo-pengguna/${userId}`} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Edit Saldo</p>
            </Link>
          </div>
        </div>

        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
            <div className="text-left md:text-xl mb-6 md:mb-12">
              <p>Edit Saldo</p>
            </div>

            <div className="flex flex-col mb-4 items-center">
              <div className="text-left w-full max-w-md">
                <div className="flex flex-col mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="text-red-700 mr-1">*</span>User ID
                  </label>
                  <input
                    type="text"
                    value={userId}
                    className="w-full p-2 border border-gray-300 bg-gray-100 rounded-lg"
                    disabled
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="text-red-700 mr-1">*</span>Tipe Perubahan
                  </label>
                  <select
                    value={changeType}
                    onChange={handleChangeType}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="tambah">Tambah Saldo</option>
                    <option value="kurang">Kurangi Saldo</option>
                  </select>
                </div>

                <div className="flex flex-col mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="text-red-700 mr-1">*</span>Jumlah Perubahan
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Rp.</span>
                    <input
                      type="number"
                      value={changeAmount}
                      onChange={handleChangeAmount}
                      className={`w-full p-2 border border-gray-300 rounded-lg ${
                        labelColor === "green" ? "bg-green-100" : 
                        labelColor === "red" ? "bg-red-100" : ""
                      }`}
                      placeholder="Masukkan jumlah"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
              <Button 
                text="Reset" 
                bgColor="bg-yellow1" 
                onClick={handleReset} 
              />
              <Button
                text="Submit"
                bgColor="bg-blue1"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSaldoPengguna;