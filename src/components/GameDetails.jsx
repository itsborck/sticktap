import { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FaRadio } from "react-icons/fa6";

const GameDetails = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          `https://api-web.nhle.com/v1/gamecenter/${gameId}/boxscore`
        );
        setGame(response.data);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  function convertUTCToLocalTime(utcTime) {
    const date = new Date(utcTime);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "numeric" });
  }

  const handlePlayRadio = (radioLink) => {
    if (audioRef.current) {
      audioRef.current.src = radioLink;
      audioRef.current.play();
    }
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dark:bg-gray-800 dark:text-white">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 px-4 py-2 rounded mb-4"
      >
        Back
      </button>
      <div className="bg-gray-900 py-8 text-white mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-0" />
        <div className="relative z-10 flex justify-center items-center container mx-auto">
          <div className="flex items-center">
            <img
              src={game.awayTeam.logo}
              alt={game.awayTeam.name.default}
              className="w-12 h-12 mr-4"
            />
            <p className="text-2xl font-bold mr-8">
              {game.awayTeam.name.default}
            </p>
            <p className="text-4xl font-bold mr-8">
              {game.awayTeam.score} - {game.homeTeam.score}
            </p>
            <p className="text-2xl font-bold ml-8">
              {game.homeTeam.name.default}
            </p>
            <img
              src={game.homeTeam.logo}
              alt={game.homeTeam.name.default}
              className="w-12 h-12 ml-4"
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md max-w-2xl mx-auto">
          <div className="mt-4">
            <h3 className="mb-2 text-center">Radio Stream:</h3>
            {game?.awayTeam.radioLink && (
              <button
                onClick={() => handlePlayRadio(game?.awayTeam.radioLink)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
              >
                <FaRadio className="mr-2 inline" /> {game.awayTeam.abbrev} Radio
              </button>
            )}
            {game?.homeTeam.radioLink && (
              <button
                onClick={() => handlePlayRadio(game?.homeTeam.radioLink)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                <FaRadio className="mr-2 inline" /> {game.homeTeam.abbrev} Radio
              </button>
            )}
            {game?.awayTeam.radioLink || game?.homeTeam.radioLink ? (
              <audio ref={audioRef} controls className="mt-2" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
