import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Banner from "./Banner";
import Header from "./Boxscore";
import Info from "./Info";
import Scoring from "./ScoringSummary";
import Teams from "./Teams";

const GameDetailsContainer = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gamecenter, setGamecenter] = useState(null);

  useEffect(() => {
    const fetchGamecenter = async () => {
      try {
        const response = await axios.get(
          `https://api-web.nhle.com/v1/gamecenter/${gameId}/boxscore`
        );
        setGamecenter(response.data);
      } catch (error) {
        console.error("Error fetching gamecenter:", error);
      }
    };

    fetchGamecenter();
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
      <div className="dark:bg-gray-800 dark:text-white">
        <button
          onClick={() => navigate('/games')}
          className="mt-4 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 px-4 py-2 rounded"
        >
          Back
        </button>
        {gamecenter && (
          <div>
            <Banner game={gamecenter} />
            <Header
              game={gamecenter}
              convertUTCToLocalTime={convertUTCToLocalTime}
            />
            <Info
              game={gamecenter}
              convertUTCToLocalTime={convertUTCToLocalTime}
            />
            <Scoring gameId={gameId} />
            <Teams gameId={gameId} />
          </div>
        )}
      </div>
    </>
  );
};

export default GameDetailsContainer;
