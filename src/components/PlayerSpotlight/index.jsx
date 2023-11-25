import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Navbar from "../Navbar";
import PlayerPage from "../Player";

const PlayerSpotlight = () => {
  const [spotlight, setSpotlight] = useState([]);

  useEffect(() => {
    const fetchSpotlight = async () => {
      try {
        const response = await axios.get(
          "https://corsmirror.onrender.com/v1/cors?url=" +
            encodeURIComponent(
              `https://api-web.nhle.com/v1/player-spotlight`
            )
        );
        setSpotlight(response.data);
      } catch (error) {
        console.error("Error fetching spotlight:", error);
      }
    };

    fetchSpotlight();
    const interval = setInterval(fetchSpotlight, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = "Player Spotlight | StickTap";
  });

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap justify-center">
        {spotlight.sort((a,b) => a.sortId - b.sortId).map((player) => (
          <Link to={`/player/${player.playerId}`} key={player.playerId}>
            <div className="m-4 bg-gray-700 hover:bg-gray-600 cursor-pointer text-white shadow-xl rounded-lg overflow-hidden">
            <img className="w-full h-64 object-cover shadow-xl rounded-full" src={player.headshot} alt={player.name.default} />
            <div className="p-4">
              <h2 className="text-xl font-bold text-center">
                {player.name.default}
              </h2>
              <span className="flex flex-row justify-center">
                <img className="w-12 h-12 border-r-2 border-gray-500" src={player.teamLogo} alt={player.teamTriCode} />
                <div className="flex flex-row pt-3 px-2 border-r-2 border-gray-500">
                  <p>#{player.sweaterNumber}</p>
                </div>
                <div className="flex flex-row pt-3 px-2">
                  <p>{player.position}</p>
                </div>
              </span>
            </div>
          </div>
          </Link>
        ))}
        <Routes>
          <Route path="/player/:playerId" element={<PlayerPage />} />
        </Routes>
      </div>
    </>
  )
};

export default PlayerSpotlight;