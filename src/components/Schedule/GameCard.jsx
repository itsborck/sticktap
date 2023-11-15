import { Link } from "react-router-dom";

const GameCard = ({ game }) => {
  function convertUTCToLocalTime(utcTime) {
    const date = new Date(utcTime);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "numeric" });
  }

  return (
    <Link to={`/game/${game.id}`}>
      <div
        className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transiton duration-300"
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            {game.specialEvent ? (
              <span className="font-bold">{game.awayTeam.placeName.default}</span>
            ) : (
              <>
                <span className="font-bold">{game.awayTeam.placeName.default}</span>
                <img
                  src={game.awayTeam.logo}
                  alt={game.awayTeam.placeName.default}
                  className="w-16 h-16 mr-2"
                />
              </>
            )}
          </div>
          <span className="text-xl text-center font-bold">
            {game.gameState === "FUT" ? (
              game.specialEvent ? (
                <img src={game.specialEventLogo} />
              ) : (
                <span>@</span>
              )
            ) : game.gameState === "LIVE" ? (
              <span>{game.awayTeam.score} - {game.homeTeam.score}</span>
            ) : null}
          </span>
          <div className="flex items-center">
            {game.specialEvent ? (
              <span className="font-bold">{game.homeTeam.placeName.default}</span>
            ) : (
              <>
                <img
                  src={game.homeTeam.logo}
                  alt={game.homeTeam.placeName.default}
                  className="w-16 h-16 mr-2"
                />
                <span className="font-bold">{game.homeTeam.placeName.default}</span>
              </>
            )}
          </div>
        </div>
        <div className="text-sm text-center">
        {game.gameState === "LIVE" ? (
            <p>Period {game.periodDescriptor.number}</p>
          ) : game.gameState === "FINAL" || game.gameState === "OFF" ? (
            <p>{game.gameOutcome.lastPeriodType === "OT" ? "Final/OT" : game.gameOutcome.lastPeriodType === "SO" ? "Final/SO" : "Final"}</p>
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
