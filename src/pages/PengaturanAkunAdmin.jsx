import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Trash2, ImageUp, RotateCcw } from "lucide-react";
import Button from "../components/Button"; // Asumsi path ini benar
import {
  getAdminProfile,
  updateAdminProfile,
  uploadAdminProfilePicture,
  deleteAdminProfilePicture,
} from "../redux/actions/adminAccountActions"; // Path ke actions admin

// Nama komponen diubah dari PengaturanAkunMitra menjadi PengaturanAkunAdmin
const PengaturanAkunAdmin = ({ isSidebarOpen }) => {
  const dispatch = useDispatch();
  const {
    profile,
    loadingGetProfile,
    errorGetProfile,
    loadingUpdateProfile,
    errorUpdateProfile,
    updateProfileMessage,
    loadingUploadPicture,
    errorUploadPicture,
    uploadPictureMessage,
    loadingDeletePicture,
    errorDeletePicture,
    deletePictureMessage,
  } = useSelector((state) => state.adminAccount); // Menggunakan slice adminAccount

  const [nameInput, setNameInput] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const placeholderUrl = "https://placehold.co/150/EFEFEF/AAAAAA&text=No+Image";
  const [imagePreview, setImagePreview] = useState(placeholderUrl);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(getAdminProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setNameInput(profile.name || "");
      setCurrentEmail(profile.email || "");
      setImagePreview(profile.profilePicture || placeholderUrl);
    } else {
      setImagePreview(placeholderUrl);
    }
  }, [profile, placeholderUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        alert("Hanya file JPG/JPEG/PNG yang diizinkan.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert("Ukuran file harus kurang dari 2MB.");
        return;
      }
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleResetName = () => {
    if (profile) {
      setNameInput(profile.name || "");
    }
  };

  const handleSubmitName = () => {
    if (nameInput.trim() === "") {
      alert("Nama tidak boleh kosong.");
      return;
    }
    dispatch(updateAdminProfile(nameInput));
  };

  const handleUploadPicture = () => {
    if (selectedFile) {
      dispatch(uploadAdminProfilePicture(selectedFile));
    } else {
      alert("Silakan pilih file gambar terlebih dahulu.");
    }
  };

  const handleDeletePicture = () => {
    if (profile && profile.profilePicture) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm("Apakah Anda yakin ingin menghapus foto profil Anda?")) {
        dispatch(deleteAdminProfilePicture());
      }
    } else {
      alert("Tidak ada foto profil untuk dihapus.");
    }
  };

  useEffect(() => {
    if (uploadPictureMessage && !errorUploadPicture) {
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [uploadPictureMessage, errorUploadPicture]);

  useEffect(() => {
    if (deletePictureMessage && !errorDeletePicture && profile && !profile.profilePicture) {
        setImagePreview(placeholderUrl);
    }
  }, [deletePictureMessage, errorDeletePicture, profile, placeholderUrl]);

  if (loadingGetProfile && !profile) {
    return (
      <div className={`flex transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"} pt-24 h-screen items-center justify-center`}>
        <p className="text-xl">Memuat profil admin...</p>
      </div>
    );
  }

  if (errorGetProfile && !profile) {
    return (
      <div className={`flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"} pt-24 h-screen items-center justify-center`}>
        <p className="text-xl text-red-500 mb-4">Error memuat profil admin: {errorGetProfile}</p>
        <Button text="Coba Lagi" bgColor="bg-blue-500 hover:bg-blue-600" onClick={() => dispatch(getAdminProfile())} />
      </div>
    );
  }

  return (
    <div className="flex transition-all duration-300">
      <div className={`bg-white pt-24 pb-12 min-h-screen transition-all duration-300 ${isSidebarOpen ? "ml-16 md:ml-64 w-[calc(100%-64px)] md:w-[calc(100%-256px)]" : "ml-0 w-full"}`}>
        <div className="flex-col px-4 items-center">
          <div className="text-center md:text-2xl mb-6 md:mb-10 font-bold text-gray-800">
            <p>Edit Profil Admin</p>
          </div>

          {errorGetProfile && profile && <p className="text-red-500 text-center mb-4">Gagal menyegarkan profil: {errorGetProfile}</p>}
          {errorUpdateProfile && <p className="text-red-500 text-center mb-4">{errorUpdateProfile}</p>}
          {updateProfileMessage && <p className="text-green-500 text-center mb-4">{updateProfileMessage}</p>}
          {errorUploadPicture && <p className="text-red-500 text-center mb-4">{errorUploadPicture}</p>}
          {uploadPictureMessage && <p className="text-green-500 text-center mb-4">{uploadPictureMessage}</p>}
          {errorDeletePicture && <p className="text-red-500 text-center mb-4">{errorDeletePicture}</p>}
          {deletePictureMessage && <p className="text-green-500 text-center mb-4">{deletePictureMessage}</p>}

          <div className="flex flex-col md:flex-row items-center md:gap-12 gap-6 justify-center">
            <div className="relative md:w-64 w-40 md:h-64 h-40">
              <img
                src={imagePreview}
                alt="Profil Admin"
                className="w-full h-full rounded-full object-cover border-4 border-gray-300 shadow-lg"
                onError={(e) => { e.target.onerror = null; e.target.src = placeholderUrl; }}
              />
              <label
                className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-blue-500 hover:bg-blue-600 p-3 rounded-full border-2 border-white cursor-pointer shadow-md"
                title="Ubah Foto Profil"
              >
                <Pencil size={18} color="white" />
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  className="hidden"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  disabled={loadingGetProfile && !profile}
                />
              </label>
            </div>

            <div className="md:w-auto w-full px-4 md:px-0">
              <div className="flex flex-col mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  <span className="text-red-700 mr-1">*</span>Nama Admin
                </label>
                <input
                  type="text"
                  name="nama"
                  value={nameInput}
                  className="w-full md:max-w-md text-base p-2 border border-gray-300 text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleInputChange}
                  disabled={(loadingGetProfile && !profile) || loadingUpdateProfile}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={currentEmail}
                  className="w-full md:max-w-md text-base p-2 border border-gray-300 text-gray-500 bg-gray-200 rounded-lg"
                  disabled
                />
              </div>
              {/* Password field removed */}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 mt-8 md:mt-12">
            <div className="flex flex-row justify-center gap-4">
              <Button
                text="Reset Nama"
                bgColor="bg-yellow-500 hover:bg-yellow-600"
                onClick={handleResetName}
                disabled={loadingUpdateProfile || (profile && nameInput === profile.name) || (loadingGetProfile && !profile) }
                icon={<RotateCcw size={18} className="mr-2"/>}
              />
              <Button
                text={loadingUpdateProfile ? "Menyimpan..." : "Simpan Nama"}
                bgColor="bg-blue-600 hover:bg-blue-700"
                onClick={handleSubmitName}
                disabled={loadingUpdateProfile || (profile && nameInput === profile.name) || nameInput.trim() === "" || (loadingGetProfile && !profile)}
                icon={<Pencil size={18} className="mr-2"/>}
              />
            </div>

            <div className="flex flex-row justify-center gap-4 mt-4">
              <Button
                text={loadingUploadPicture ? "Mengunggah..." : "Unggah Foto"}
                bgColor="bg-green-500 hover:bg-green-600"
                onClick={handleUploadPicture}
                disabled={!selectedFile || loadingUploadPicture || (loadingGetProfile && !profile)}
                icon={<ImageUp size={18} className="mr-2"/>}
              />
              <Button
                text={loadingDeletePicture ? "Menghapus..." : "Hapus Foto"}
                bgColor="bg-red-500 hover:bg-red-600"
                onClick={handleDeletePicture}
                disabled={!(profile && profile.profilePicture) || loadingDeletePicture || (loadingGetProfile && !profile)}
                icon={<Trash2 size={18} className="mr-2"/>}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Nama export diubah menjadi PengaturanAkunAdmin
export default PengaturanAkunAdmin;