import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../index.css";

const GameCard = ({ game }) => {
  const [gameDetails, setGameDetails] = useState({});

  function convertUTCToLocalTime(utcTime) {
    const date = new Date(utcTime);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "numeric" });
  }

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          "https://corsmirror.onrender.com/v1/cors?url=" +
            encodeURIComponent(
              `https://api-web.nhle.com/v1/gamecenter/${game.id}/landing`
            )
        );
        setGameDetails(response.data);
      } catch (error) {
        console.error("Error fetching game details: ", error);
      }
    };

    fetchGameDetails();
  }, [game.id]);

  return (
    <Link to={`/game/${game.id}`}>
      <div
        className={`bg-gray-700 text-white p-2 rounded-lg shadow-md hover:bg-gray-600 transiton duration-300 ${
          game.specialEvent ? "border-2 border-yellow-500" : ""
        }`}
      >
        <div className="flex justify-center items-center text-center">
          <span className="flex flex-col text-xl items-center justify-center">
            {game.gameState === "FUT" || game.gameState === "PRE" ? (
              game.specialEventLogo ? (
                <span className="flex flex-row">
                  <span className="mt-6 mr-2 font-bold">
                    {game.awayTeam.abbrev}
                  </span>
                  <img src={game.specialEventLogo} />
                  <span className="mt-6 ml-2 font-bold">
                    {game.homeTeam.abbrev}
                  </span>
                </span>
              ) : (
                <span className="flex flex-row">
                  <span className="mt-2 font-bold">{game.awayTeam.abbrev}</span>
                  <img
                    src={game.awayTeam.logo}
                    alt={game.awayTeam.placeName.default}
                    className="w-16 mb-5 mr-7"
                  />
                  <span className="font-bold mt-2">@</span>
                  <img
                    src={game.homeTeam.logo}
                    alt={game.homeTeam.placeName.default}
                    className="w-16 mb-5 ml-7"
                  />
                  <span className="mt-2 font-bold">{game.homeTeam.abbrev}</span>
                </span>
              )
            ) : game.gameState === "LIVE" ||
              game.gameState === "CRIT" ||
              game.gameState === "FINAL" ||
              game.gameState === "OFF" ? (
              <span className="flex flex-row">
                <span className="mt-2 font-bold">{game.awayTeam.abbrev}</span>
                <img
                  src={game.awayTeam.logo}
                  alt={game.awayTeam.placeName.default}
                  className="w-16 mb-5 mr-7"
                />
                <span className="font-bold flex justify-between mt-2">
                  {game.awayTeam.score} - {game.homeTeam.score}
                </span>
                <img
                  src={game.homeTeam.logo}
                  alt={game.homeTeam.placeName.default}
                  className="w-16 mb-5 ml-7"
                />
                <span className="mt-2 font-bold">{game.homeTeam.abbrev}</span>
              </span>
            ) : null}
            <div className="text-sm text-center">
              {game.gameState === "LIVE" || game.gameState === "CRIT" ? (
                <p>
                  {game.periodDescriptor.number === 4
                    ? "OT"
                    : game.periodDescriptor.number === 5
                    ? "SO"
                    : gameDetails && gameDetails.clock && gameDetails.clock.inIntermission === true ? (
                      game.periodDescriptor.number === 1 ? (
                      <p>1st Intermission - {gameDetails.clock.timeRemaining}</p>
                    ) : game.periodDescriptor.number === 2 ? (
                      <p>2nd Intermission - {gameDetails.clock.timeRemaining}</p>
                    ) : null)
                    : `Period ${game.periodDescriptor.number} - ${gameDetails && gameDetails.clock ? gameDetails.clock.timeRemaining : null}`}
                </p>
              ) : game.gameState === "FINAL" || game.gameState === "OFF" ? (
                <p>
                  {game.gameOutcome.lastPeriodType === "OT"
                    ? "Final/OT"
                    : game.gameOutcome.lastPeriodType === "SO"
                    ? "Final/SO"
                    : "Final"}
                </p>
              ) : (
                <div className="text-xs">
                  <p>Start Time: {convertUTCToLocalTime(game.startTimeUTC)}</p>
                  <p>Venue: {game.venue.default}</p>
                </div>
              )}
            </div>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
