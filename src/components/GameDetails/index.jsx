import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Banner from "./Banner";
import Boxscore from "./Boxscore";
import Info from "./GameInfo";
import Scoring from "./ScoringSummary";
import ThreeStars from "./ThreeStars";

const GameDetailsContainer = () => {
  const { gameId } = useParams();
  const [gamecenter, setGamecenter] = useState(null);

  useEffect(() => {
    const fetchGamecenter = async () => {
      try {
        const response = await axios.get(
          'https://corsmirror.onrender.com/v1/cors?url=' + encodeURIComponent(`https://api-web.nhle.com/v1/gamecenter/${gameId}/boxscore`)
        );
        setGamecenter(response.data);
      } catch (error) {
        console.error("Error fetching gamecenter:", error);
      }
    };

    fetchGamecenter();
    const interval = setInterval(fetchGamecenter, 15000);

    return () => clearInterval(interval);
  }, [gameId]);

  useEffect(() => {
    document.title = `${gamecenter?.awayTeam.name.default} vs. ${gamecenter?.homeTeam.name.default} | StickTap`;
  });

  function convertUTCToLocalTime(utcTime) {
    const date = new Date(utcTime);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "numeric" });
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-800 text-white">
        {gamecenter && (
          <div>
            <Banner game={gamecenter} />
            <Boxscore
              game={gamecenter}
              convertUTCToLocalTime={convertUTCToLocalTime}
            />
            <Info
              game={gamecenter}
              convertUTCToLocalTime={convertUTCToLocalTime}
            />
            <div className="flex justify-between">
              <div className="w-1/2">
                <Scoring gameId={gameId} />
              </div>
              <div className="w-1/2">
                <ThreeStars gameId={gameId} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GameDetailsContainer;
