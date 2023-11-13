import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GameDetails = () => {
  const { gameId } = useParams();

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
    return date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
  }

  if (!game) {
    return <div>Loading...</div>; // or handle the loading state as you prefer
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">
        {game.awayTeam.name.default} vs {game.homeTeam.name.default}
      </h2>
      <p>
        Start Time: {convertUTCToLocalTime(game.gameDate, game.venueUTCOffset)}
      </p>
      <p>Venue: {game.venue.default}</p>
      <p>Status: {game.gameState}</p>
      <p>Game Type: {game.gameType}</p>
      <p>Clock: {game.clock.timeRemaining}</p>
      <p>
        Score: {game.awayTeam.score} - {game.homeTeam.score}
      </p>
      <div>
        <h3>Broadcasts:</h3>
        <ul>
          {game.tvBroadcasts.map((broadcast) => (
            <li key={broadcast.id}>
              {broadcast.network} ({broadcast.countryCode})
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Teams:</h3>
        <div className="flex">
          <div>
            <h4>{game.awayTeam.name.default}</h4>
            <img
              src={game.awayTeam.logo}
              alt={game.awayTeam.name.default}
              className="w-8 h-8"
            />
            <p>Abbreviation: {game.awayTeam.abbrev}</p>
            <p>Radio Link: {game.awayTeam.radioLink}</p>
          </div>
          <div>
            <h4>{game.homeTeam.name.default}</h4>
            <img
              src={game.homeTeam.logo}
              alt={game.homeTeam.name.default}
              className="w-8 h-8"
            />
            <p>Abbreviation: {game.homeTeam.abbrev}</p>
            <p>Radio Link: {game.homeTeam.radioLink}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
