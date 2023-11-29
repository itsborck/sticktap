import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { FaUserGear, FaX } from "react-icons/fa6";
import Modal from "react-modal";
import Navbar from "../Navbar";
import AccountSettings from "./AccountSettings";

const Dashboard = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [providerData, setProviderData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setDisplayName(user.displayName);
        setEmail(user.email);
        setPhotoURL(user.photoURL);
        setProviderData(user.providerData);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.title = "Your Account | StickTap";
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

    if (file.size > MAX_FILE_SIZE) {
      alert("File size exceeds the limit of 2MB");
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, "avatars/" + selectedFile.name);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log("Upload failed", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const auth = getAuth();
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            setPhotoURL(downloadURL);
          });
        });
      }
    );
  };

  const handleRemove = async () => {
    const originalPhotoURL = providerData[0].photoURL;
    const auth = getAuth();
    await updateProfile(auth.currentUser, {
      photoURL: originalPhotoURL,
    });
    setPhotoURL(originalPhotoURL);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-700 shadow-md rounded-lg p-4">
        <div>
          <img
            className="w-20 h-20 mb-2 rounded-full"
            src={photoURL}
            alt={displayName}
          />
        </div>
        <div>
          <h2 className="text-2xl text-white">Hello, {displayName}!</h2>
          <p className="text-gray-500">{email}</p>
        </div>
        <div className="flex justify-end items-end">
          <button
            onClick={handleOpenModal}
            className="absolute top-20 text-white flex"
          >
            <FaUserGear className="mr-2 mt-0.5" /> Account Settings
          </button>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Account Settings"
            className="relative bg-gray-900 lg:w-1/2 sm:w-full h-5/6 mx-auto mt-20 rounded overflow-auto text-white"
            overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
          >
            <button
              className="text-white cursor-pointer absolute top-0 right-0 m-5"
              onClick={handleCloseModal}
            >
              <FaX />
            </button>
            <AccountSettings
              handleFileChange={handleFileChange}
              handleUpload={handleUpload}
              handleRemove={handleRemove}
              photoURL={photoURL}
            />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
