import axios from "axios";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, writeBatch } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from ".";

const AccountSettings = ({
  handleFileChange,
  handleUpload,
  handleRemove,
  photoURL,
}) => {
  const [previewURL, setPreviewURL] = useState(photoURL);
  const [username, setUsername] = useState("");
  const [teams, setTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          "https://corsmirror.onrender.com/v1/cors?url=" +
            encodeURIComponent(
              `https://records.nhl.com/site/api/franchise?include=teams.id&include=teams.active&include=teams.triCode&include=teams.placeName&include=teams.commonName&include=teams.fullName&include=teams.logos&include=teams.conference.name&include=teams.division.name&include=teams.franchiseTeam.firstSeason.id&include=teams.franchiseTeam.lastSeason.id&sort=[{%22property%22:%22teamPlaceName%22},{%22property%22:%22teamCommonName%22}]`
            )
        );
        setTeams(response.data.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
    const interval = setInterval(fetchTeams, 15000);

    return () => clearInterval(interval);
  });

  const handleUsernameChange = async () => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const usernameRef = doc(db, "usernames", username);

    const usernameSnapshot = await getDoc(usernameRef);
    if (usernameSnapshot.exists()) {
      toast.error("Username already exists.");
      return;
    }

    const batch = writeBatch(db);
    batch.set(userRef, { username: username }, { merge: true });
    batch.set(usernameRef, { uid: auth.currentUser.uid });

    try {
      await batch.commit();
      await updateProfile(auth.currentUser, { displayName: username });
      toast.success("Username updated!");
    } catch (error) {
      console.error("Error updating username:", error);
      toast.error("Failed to update username.");
    }
  };

  const handleFileChangeWithPreview = (event) => {
    handleFileChange(event);
    setPreviewURL(URL.createObjectURL(event.target.files[0]));
  };

  const saveFavoriteTeam = async () => {
    if (selectedTeam) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      try {
        await setDoc(
          userRef,
          { favoriteTeam: selectedTeam.teamAbbrev },
          { merge: true }
        );
        toast.success("Favorite team saved!");
      } catch (error) {
        console.error("Error saving favorite team:", error);
        toast.error("Failed to save favorite team.");
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
      />
      <div className="flex flex-col items-center justify-center pt-10">
        <h1 className="text-2xl font-bold text-left mr-5">
          Change Profile Picture
        </h1>
        {previewURL && (
          <img
            src={previewURL}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full mb-5"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChangeWithPreview}
          className="w-1/2 px-3 py-2 text-sm leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
        <button
          onClick={handleUpload}
          className="w-1/2 px-4 py-2 mt-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Upload
        </button>
        <button
          onClick={handleRemove}
          className="w-1/2 px-4 py-2 mt-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
        >
          Remove Profile Picture
        </button>
        <br />
        {/* <h1 className="text-2xl font-bold text-left mr-5">Update Username</h1>
        <input
          type="text"
          value={username}
          placeholder="New Username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-1/2 px-3 py-2 text-sm border rounded shadow focus:outline-none focus:shadow-outline text-black"
        />
        <button
          onClick={handleUsernameChange}
          className="w-1/2 px-4 py-2 mt-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Update Username
        </button>
        <br /> */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-left mr-5">Favorite Team</h1>
          <button
            onClick={saveFavoriteTeam}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
          >
            Save
          </button>
        </div>
        {teams && (
          <div className="grid lg:grid-cols-4 grid-cols-3 gap-4 px-2">
            {teams
              .filter((team) =>
                team.teams.find((subTeam) => subTeam.active === "Y")
              )
              .map((team) => {
                const activeTeam = team.teams.find(
                  (subTeam) => subTeam.active === "Y"
                );
                const currentYear = new Date().getFullYear();
                const logo = activeTeam.logos.find((logo) =>
                  logo.endSeason.toString().includes(currentYear.toString())
                );
                if (logo) {
                  return (
                    <div
                      key={team.id}
                      className={`flex flex-col items-center justify-center text-center cursor-pointer transition transform hover:scale-105 hover:bg-gray-500 rounded-lg shadow-lg bg-gray-800 overflow-hidden ${
                        selectedTeam && selectedTeam.id === team.id
                          ? "bg-gray-500"
                          : ""
                      }`}
                      onClick={() => setSelectedTeam(team)}
                    >
                      <img
                        className="w-24 h-24 object-contain"
                        src={logo.secureUrl}
                        alt={activeTeam.fullName}
                      />
                      <p className="text-sm">{activeTeam.fullName}</p>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        )}
        <br />
      </div>
    </>
  );
};

export default AccountSettings;
