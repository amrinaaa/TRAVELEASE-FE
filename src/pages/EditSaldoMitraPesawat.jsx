// import React, { useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import Button from "../components/Button";
// import { updateUserAmount } from "../redux/actions/adminPesawatActions";

// const EditSaldoMitraPesawat = ({ isSidebarOpen }) => {
//   const { userId } = useParams();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   // Get current amount from navigation state
//   const [currentAmount] = useState(location.state?.currentAmount || 0);
//   const [changeAmount, setChangeAmount] = useState("");
//   const [changeType, setChangeType] = useState("tambah");
//   const [newAmount, setNewAmount] = useState(currentAmount);
//   const [labelColor, setLabelColor] = useState("");

//   const handleChangeAmount = (e) => {
//     const value = e.target.value.replace(/\D/g, '');
//     setChangeAmount(value);

//     const numericValue = parseInt(value || 0);
//     const calculatedAmount = changeType === "tambah" 
//       ? currentAmount + numericValue 
//       : currentAmount - numericValue;
    
//     setLabelColor(changeType === "tambah" ? "green" : "red");
//     setNewAmount(calculatedAmount);
//   };

//   const handleChangeType = (e) => {
//     setChangeType(e.target.value);
//     setChangeAmount("");
//     setLabelColor("");
//     setNewAmount(currentAmount);
//   };

//   const handleReset = () => {
//     setChangeAmount("");
//     setLabelColor("");
//     setNewAmount(currentAmount);
//   };

//   const handleSubmit = () => {
//     if (!userId) {
//       alert("User ID tidak valid");
//       return;
//     }

//     if (!changeAmount || isNaN(changeAmount)) {
//       alert("Masukkan jumlah yang valid");
//       return;
//     }

//     const numericAmount = parseInt(changeAmount);
//     const finalAmount = changeType === "tambah" ? numericAmount : -numericAmount;

//     dispatch(updateUserAmount(userId, finalAmount))
//       .then(() => {
//         alert("Saldo berhasil diperbarui!");
//         navigate("/manajemen-mitra-pesawat");
//       })
//       .catch((error) => {
//         alert(`Gagal memperbarui saldo: ${error.message}`);
//       });
//   };

//   return (
//     <div className="flex transition-all duration-300">
//       <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${
//         isSidebarOpen 
//           ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" 
//           : "ml-0 w-full"
//       }`}>
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
//             <Link to={`/edit-saldo-pengguna/${userId}`} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
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

//             <div className="flex flex-col mb-4 items-center">
//               <div className="text-left w-full max-w-md">
//                 {/* TODO: fix Current Saldo Display */}
//                 {/* <div className="flex flex-col mb-4">
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">
//                     <span className="text-red-700 mr-1">*</span>Current Saldo
//                   </label>
//                   <input
//                     type="text"
//                     value={`Rp. ${currentAmount.toLocaleString()}`}
//                     className="w-full p-2 border border-gray-300 bg-gray-100 rounded-lg"
//                     disabled
//                   />
//                 </div> */}

//                 {/* User ID Display */}
//                 <div className="flex flex-col mb-4">
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">
//                     <span className="text-red-700 mr-1">*</span>Partner ID
//                   </label>
//                   <input
//                     type="text"
//                     value={userId}
//                     className="w-full p-2 border border-gray-300 bg-gray-100 rounded-lg"
//                     disabled
//                   />
//                 </div>

//                 {/* Change Type Selector */}
//                 <div className="flex flex-col mb-4">
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">
//                     <span className="text-red-700 mr-1">*</span>Tipe Perubahan
//                   </label>
//                   <select
//                     value={changeType}
//                     onChange={handleChangeType}
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                   >
//                     <option value="tambah">Tambah Saldo</option>
//                     <option value="kurang">Kurangi Saldo</option>
//                   </select>
//                 </div>

//                 {/* Change Amount Input */}
//                 <div className="flex flex-col mb-4">
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">
//                     <span className="text-red-700 mr-1">*</span>Jumlah Perubahan
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <span className="text-gray-600">Rp.</span>
//                     <input
//                       type="number"
//                       value={changeAmount}
//                       onChange={handleChangeAmount}
//                       className={`w-full p-2 border border-gray-300 rounded-lg ${
//                         labelColor === "green" ? "bg-green-100" : 
//                         labelColor === "red" ? "bg-red-100" : ""
//                       }`}
//                       placeholder="Masukkan jumlah"
//                     />
//                   </div>
//                 </div>

//                 {/* New Saldo Preview */}
//                 <div className="flex flex-col mb-4">
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">
//                     <span className="text-red-700 mr-1">*</span>New Saldo
//                   </label>
//                   <input
//                     type="text"
//                     value={`Rp. ${newAmount.toLocaleString()}`}
//                     className="w-full p-2 border border-gray-300 bg-gray-100 rounded-lg"
//                     disabled
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
//               <Button 
//                 text="Reset" 
//                 bgColor="bg-yellow1" 
//                 onClick={handleReset} 
//               />
//               <Button
//                 text="Submit"
//                 bgColor="bg-blue1"
//                 onClick={handleSubmit}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditSaldoMitraPesawat;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { Link } from "react-router-dom";
import Button from "../components/Button";
// Import getHotels dan updateUserAmount
import { updateUserAmount, getHotels } from "../redux/actions/adminPesawatActions";

const EditSaldoMitraPesawat = ({ isSidebarOpen }) => {
  const { userId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ambil data hotels dan loading dari Redux store
  const { hotels, loading: hotelsLoading } = useSelector((state) => state.adminPesawat);

  // Prioritaskan data dari location.state, jika tidak ada, akan dicari/fetch
  const initialAmount = location.state?.currentAmount;

  const [currentAmount, setCurrentAmount] = useState(initialAmount !== undefined ? initialAmount : 0);
  const [changeAmount, setChangeAmount] = useState("");
  const [changeType, setChangeType] = useState("tambah");
  const [newAmount, setNewAmount] = useState(initialAmount !== undefined ? initialAmount : 0);
  const [labelColor, setLabelColor] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State untuk loading data saldo

  useEffect(() => {
    // Fungsi untuk memuat atau mencari data saldo
    const loadAmount = () => {
      // Jika initialAmount sudah ada dari location.state, gunakan itu.
      if (initialAmount !== undefined) {
        setCurrentAmount(initialAmount);
        setNewAmount(initialAmount);
        setIsLoading(false);
      } else {
        // Jika tidak ada, coba cari di Redux store
        const hotel = hotels.find((h) => h.uid === userId);
        if (hotel && hotel.amount !== undefined) {
          setCurrentAmount(hotel.amount);
          setNewAmount(hotel.amount);
          setIsLoading(false);
        } else if (!hotelsLoading && hotels.length === 0) {
          // Jika tidak ada di Redux dan belum loading, panggil getHotels
          dispatch(getHotels()).then(() => setIsLoading(false));
        } else if (!hotelsLoading && hotel === undefined) {
            // Jika sudah selesai loading tapi hotel tidak ditemukan
            console.error("Mitra Hotel tidak ditemukan di Redux store.");
            alert("Gagal memuat saldo saat ini. Mitra tidak ditemukan.");
            setIsLoading(false);
        } else {
            // Jika masih loading atau hotel ditemukan tapi tidak ada amount
            setIsLoading(hotelsLoading);
        }
      }
    };

    loadAmount();

  }, [userId, hotels, dispatch, initialAmount, hotelsLoading]); // Tambahkan dependencies

  // Effect untuk update currentAmount jika data hotels berubah setelah fetch
   useEffect(() => {
        if (initialAmount === undefined && !hotelsLoading) {
            const hotel = hotels.find((h) => h.uid === userId);
            if (hotel && hotel.amount !== undefined) {
                setCurrentAmount(hotel.amount);
                setNewAmount(hotel.amount);
                setIsLoading(false);
            }
        }
   }, [hotels, userId, initialAmount, hotelsLoading]);


  const handleChangeAmount = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setChangeAmount(value);
    const numericValue = parseInt(value || 0);
    const calculatedAmount = changeType === "tambah"
      ? currentAmount + numericValue
      : currentAmount - numericValue;
    setLabelColor(changeType === "tambah" ? "green" : "red");
    setNewAmount(calculatedAmount < 0 ? 0 : calculatedAmount);
  };

  const handleChangeType = (e) => {
    const newType = e.target.value;
    setChangeType(newType);
    const numericValue = parseInt(changeAmount || 0);
    const calculatedAmount = newType === "tambah"
      ? currentAmount + numericValue
      : currentAmount - numericValue;
    setLabelColor(newType === "tambah" ? "green" : "red");
    setNewAmount(calculatedAmount < 0 ? 0 : calculatedAmount);
  };

  const handleReset = () => {
    setChangeAmount("");
    setLabelColor("");
    setNewAmount(currentAmount);
    setChangeType("tambah");
  };

  const handleSubmit = () => {
    if (!userId) {
      alert("User ID tidak valid");
      return;
    }
    if (!changeAmount || isNaN(changeAmount) || parseInt(changeAmount) <= 0) {
      alert("Masukkan jumlah perubahan yang valid (angka positif)");
      return;
    }
    const numericAmount = parseInt(changeAmount);
    if (changeType === "kurang" && numericAmount > currentAmount) {
      alert("Saldo tidak boleh kurang dari nol.");
      return;
    }
    const type = changeType === "tambah" ? "adding" : "reduce";
    dispatch(updateUserAmount(userId, numericAmount, type))
      .then(() => {
        alert("Saldo berhasil diperbarui!");
        navigate("/manajemen-mitra-pesawat");
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
            <p className="text-xl">Mitra Hotel Management</p>
            <p className="text-xs pt-2 text-gray-600">Edit Saldo</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-mitra-hotel" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link to={`/edit-saldo-mitra-hotel/${userId}`} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
              <p>/</p>
              <p className="text-xs md:text-sm">Edit Saldo</p>
            </Link>
          </div>
        </div>

        <div className="bg-white m-4 py-4 rounded-lg shadow-md">
          <div className="flex-col px-4 items-center">
            <div className="text-left md:text-xl mb-6 md:mb-12">
              <p>Edit Saldo Mitra Hotel</p>
            </div>

            <div className="flex flex-col mb-4 items-center">
              <div className="text-left w-full max-w-md">
                {/* Current Saldo Display */}
                <div className="flex flex-col mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="text-red-700 mr-1">*</span>Current Saldo
                  </label>
                  <input
                    type="text"
                    value={isLoading ? "Memuat..." : `Rp. ${currentAmount.toLocaleString()}`}
                    className="w-full p-2 border border-gray-300 bg-gray-100 rounded-lg"
                    disabled
                  />
                </div>

                {/* User ID Display */}
                <div className="flex flex-col mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="text-red-700 mr-1">*</span>Partner ID
                  </label>
                  <input
                    type="text"
                    value={userId}
                    className="w-full p-2 border border-gray-300 bg-gray-100 rounded-lg"
                    disabled
                  />
                </div>

                {/* Change Type Selector */}
                <div className="flex flex-col mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="text-red-700 mr-1">*</span>Tipe Perubahan
                  </label>
                  <select
                    value={changeType}
                    onChange={handleChangeType}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    disabled={isLoading} // Disable saat loading
                  >
                    <option value="tambah">Tambah Saldo</option>
                    <option value="kurang">Kurangi Saldo</option>
                  </select>
                </div>

                {/* Change Amount Input */}
                <div className="flex flex-col mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="text-red-700 mr-1">*</span>Jumlah Perubahan
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Rp.</span>
                    <input
                      type="text"
                      pattern="[0-9]*"
                      value={changeAmount}
                      onChange={handleChangeAmount}
                      className={`w-full p-2 border border-gray-300 rounded-lg ${
                        changeAmount && (labelColor === "green" ? "bg-green-100" :
                        labelColor === "red" ? "bg-red-100" : "")
                      }`}
                      placeholder="Masukkan jumlah"
                      disabled={isLoading} // Disable saat loading
                    />
                  </div>
                </div>

                {/* New Saldo Preview */}
                <div className="flex flex-col mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <span className="text-red-700 mr-1">*</span>New Saldo
                  </label>
                  <input
                    type="text"
                    value={isLoading ? "Memuat..." : `Rp. ${newAmount.toLocaleString()}`}
                    className="w-full p-2 border border-gray-300 bg-gray-100 rounded-lg"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
              <Button
                text="Reset"
                bgColor="bg-yellow1"
                onClick={handleReset}
                disabled={isLoading} // Disable saat loading
              />
              <Button
                text="Submit"
                bgColor="bg-blue1"
                onClick={handleSubmit}
                disabled={isLoading} // Disable saat loading
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSaldoMitraPesawat;