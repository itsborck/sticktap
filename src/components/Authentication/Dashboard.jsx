import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setDisplayName(user.displayName);
        setEmail(user.email);
        setPhotoURL(user.photoURL);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gray-700 shadow-md rounded-lg p-8">
        <img
          className="w-24 h-24 rounded-full mb-4"
          src={photoURL}
          alt={displayName}
        />
        <h2 className="text-2xl text-white mb-2">{displayName}</h2>
        <p className="text-gray-500">{email}</p>
      </div>
    </div>
  );
};

export default Dashboard;
