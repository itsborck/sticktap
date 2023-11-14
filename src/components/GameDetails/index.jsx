import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Banner from "./GameDetailsBanner";
import Header from "./GameDetailsHeader";
import Info from "./GameDetailsInfo";
import Radio from "./GameDetailsRadio";
import Teams from "./GameDetailsTeams";

const GameDetailsContainer = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gamecenter, setGamecenter] = useState(null);
  const [gameDetails, setGameDetails] = useState(null);

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
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          "https://api-web.nhle.com/v1/score/now"
        );
        setGameDetails(response.data);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };
    fetchGameDetails();
  });

  function convertUTCToLocalTime(utcTime) {
    const date = new Date(utcTime);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "numeric" });
  }

  return (
    <div className="dark:bg-gray-800 dark:text-white">
      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 px-4 py-2 rounded"
      >
        Back
      </button>
      {gamecenter && gameDetails && (
        <div>
          <Banner game={gamecenter} details={gameDetails} />
          <Header game={gamecenter} details={gameDetails} />
          <Info
            game={gamecenter}
            details={gameDetails}
            currentGameId={gameId}
            convertUTCToLocalTime={convertUTCToLocalTime}
          />
          <Teams game={gamecenter} details={gameDetails} />
          <Radio game={gamecenter} details={gameDetails} />
        </div>
      )}
    </div>
  );
};

export default GameDetailsContainer;
