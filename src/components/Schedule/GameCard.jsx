import { Link } from "react-router-dom";
import { gameState } from '../../config.json';

const GameCard = ({ game }) => {

  function convertUTCToLocalTime(utcTime) {
    const date = new Date(utcTime);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "numeric" });
  }

  return (
    <Link to={`/game/${game.id}`}>
      <div
        key={game.id}
        className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transiton duration-300"
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <img
              src={game.awayTeam.logo}
              alt={game.awayTeam.placeName.default}
              className="w-8 h-8 mr-2"
            />
            <span className="font-bold">{game.awayTeam.placeName.default} ({game.awayTeam.abbrev})</span>
          </div>
          <span className="text-xl text-center font-bold">
            {game.awayTeam.score} - {game.homeTeam.score}
          </span>
          <div className="flex items-center">
            <span className="font-bold">{game.homeTeam.placeName.default} ({game.homeTeam.abbrev})</span>
            <img
              src={game.homeTeam.logo}
              alt={game.homeTeam.placeName.default}
              className="w-8 h-8 ml-2"
            />
          </div>
        </div>
        <div className="text-sm text-center">
          {game.gameState === gameState.live ? (
            <div>
              <p>Period {game.periodDescriptor.number}</p>
            </div>
          ) : game.gameState === gameState.hardFinal || game.gameState === gameState.official ? (
            <p>Final</p>
          ) : (game.period === 4 && game.gameState === gameState.hardFinal) ||
            (game.period === 4 && game.gameState === gameState.official) ? (
            <p>Final/OT</p>
          ) : (game.period === 5 && game.gameState === gameState.hardFinal) ||
            (game.period === 5 && game.gameState === gameState.official) ? (
            <p>Final/SO</p>
          ) : (
            <div>
              <p>Start Time: {convertUTCToLocalTime(game.startTimeUTC)}</p>
              <p>Venue: {game.venue.default}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
