import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import dataMitraPesawat from "../utils/dataMitraPesawat.json"; 

const EditSaldoMitraPesawat = ({ isSidebarOpen }) => {
  const { userId } = useParams();
  const [user, setUser] = useState(null); // User data (null initially)
  const [currentSaldo, setCurrentSaldo] = useState(0); // Current saldo of the user
  const [changeAmount, setChangeAmount] = useState(""); 
  const [newSaldo, setNewSaldo] = useState(0); 
  const [labelColor, setLabelColor] = useState(""); 
  const [changeType, setChangeType] = useState("tambah"); 

  useEffect(() => {
    // Find the user based on the ID from the URL
    const selectedUser = dataMitraPesawat.find((user) => user.id === userId);
    if (selectedUser) {
      setUser(selectedUser);
      setCurrentSaldo(selectedUser.saldo);
      setNewSaldo(selectedUser.saldo);
    }
  }, [userId]);

  const handleChangeAmount = (e) => {
    // Extract number from input and set it
    const amount = e.target.value === "" ? "" : parseInt(e.target.value.replace(/\D/g, '') || 0); 
    setChangeAmount(amount);

    let newSaldoAmount = currentSaldo;
    if (changeType === "tambah" && amount !== "") {
      newSaldoAmount += amount;
      setLabelColor("green");
    } else if (changeType === "kurang" && amount !== "") {
      newSaldoAmount -= amount;
      setLabelColor("red");
    }

    setNewSaldo(amount === "" ? currentSaldo : newSaldoAmount);
  };

  const handleChangeType = (e) => {
    setChangeType(e.target.value);
    setLabelColor(""); 
    setChangeAmount(""); 
    setNewSaldo(currentSaldo);
  };

  // Reset the input for change amount
  const handleReset = () => {
    setChangeAmount(""); 
    setNewSaldo(currentSaldo); // Reset the new saldo to the current saldo
    setLabelColor("");
  };

  // Handle submit to update saldo
  const handleSubmit = () => {
    if (user) {
      const updatedUser = { ...user, saldo: newSaldo }; 
      // Update the saldo in the data
      const updatedData = dataPengguna.map((item) =>
        item.id === updatedUser.id ? updatedUser : item
      );
      alert(`Saldo updated successfully! New saldo: Rp. ${newSaldo.toLocaleString()}`);
      console.log(updatedData); // This is where the updated data would be used
    }
  };

  if (!user) return <div>Loading...</div>; // Show loading until user data is fetched

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-ungu10 pt-20 h-full transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="grid grid-cols-2 px-4">
          <div className="flex flex-col md:flex-row text-left md:gap-1">
            <p className="text-xl">User Management</p>
            <p className="text-xs pt-2 text-gray-600">Edit Saldo</p>
          </div>
          <div className="flex flex-row justify-end">
            <Link to="/manajemen-mitra-pesawat" className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0">
              <i className="fa-solid fa-house-chimney text-xs"></i>
              <p className="text-xs md:text-sm">Home</p>
            </Link>
            <Link to={`/edit-saldo-mitra-pesawat`} className="flex items-center gap-1 text-gray-600 pt-9 md:pt-0 ml-1">
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
            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <label className="text-red-700 mr-1">*</label>Change Type
                </label>
                <div className="md:w-96 w-64">
                  <select
                    value={changeType}
                    onChange={handleChangeType}
                    className="w-full md:text-base text-sm mt-1 pt-2 pb-2 pl-1 border border-gray-300 text-gray-600 bg-white rounded-lg"
                  >
                    <option value="tambah">Tambah Saldo</option>
                    <option value="kurang">Kurang Saldo</option>
                  </select>
                </div>
              </div>
            </div>
  
            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <label className="text-red-700 mr-1">*</label>User ID
                </label>
                <div className="md:w-96 w-64">
                  <input
                    type="text"
                    value={user.id}
                    className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 bg-gray-300 rounded-lg"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <label className="text-red-700 mr-1">*</label>Name
                </label>
                <div className="md:w-96 w-64">
                  <input
                    type="text"
                    value={user.nama}
                    className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 bg-gray-300 rounded-lg"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <label className="text-red-700 mr-1">*</label>Email
                </label>
                <div className="md:w-96 w-64">
                  <input
                    type="text"
                    value={user.email}
                    className="w-full md:text-base text-sm mt-1 p-2 border font-bold border-gray-300 text-gray-600 bg-gray-300 rounded-lg"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <label className="text-red-700 mr-1">*</label>Current Saldo Amount
                </label>
                <div className="md:w-96 w-64">
                  <input
                    type="text"
                    value={`Rp. ${currentSaldo.toLocaleString()}`}
                    className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 bg-gray-300 rounded-lg"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <label className="text-red-700 mr-1">*</label>Change Amount
                </label>
                <div className="flex md:w-96 w-64 items-center">
                  <span className="mr-2 text-sm">Rp.</span> {/* Adding "Rp." prefix */}
                  <input
                    type="number"
                    value={changeAmount}
                    onChange={handleChangeAmount}
                    className={`w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 rounded-lg ${labelColor === "green" ? "bg-green-100" : labelColor === "red" ? "bg-red-100" : "bg-white"}`}
                  />
                  <div className="absolute mt-1 ml-36 md:ml-64 text-sm md:text-base">
                    {labelColor && (
                      <span className={`text-${labelColor}-500 mt-1`}>
                        {labelColor === "green" ? `+ Rp. ${newSaldo - currentSaldo}` : `- Rp. ${currentSaldo - newSaldo}`}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col mb-2 md:mb-4 items-center">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700">
                  <label className="text-red-700 mr-1">*</label>New Saldo Amount
                </label>
                <div className="md:w-96 w-64">
                  <input
                    type="text"
                    value={`Rp. ${newSaldo.toLocaleString()}`}
                    className="w-full md:text-base text-sm mt-1 p-2 border border-gray-300 text-gray-600 bg-gray-300 rounded-lg"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-center gap-6 text-white font-bold mt-12 mb-10">
            <Button text="Reset" bgColor="bg-yellow1" onClick={handleReset} />
            <Button text="Submit" bgColor="bg-blue1" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSaldoMitraPesawat