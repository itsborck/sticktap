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
            {game.specialEvent && game.specialEventLogo ? (
              <span className="mb-5 font-bold">{game.awayTeam.abbrev}</span>
            ) : (
              <>
                <span className="mb-5 font-bold">{game.awayTeam.abbrev}</span>
                <img
                  src={game.awayTeam.logo}
                  alt={game.awayTeam.placeName.default}
                  className="w-16 h-16 mr-2 mb-5"
                />
              </>
            )}
          </div>
          <span className="flex flex-col text-xl items-center">
            {game.gameState === "FUT" ? (
              game.specialEvent && game.specialEventLogo ? (
                <img src={game.specialEventLogo} />
              ) : (
                <span className="font-bold">@</span>
              )
            ) : game.gameState === "LIVE" || game.gameState === "CRIT" || game.gameState === "FINAL" || game.gameState === "OFF" ? (
              <span className="font-bold">{game.awayTeam.score} - {game.homeTeam.score}</span>
            ) : null}
            <div className="text-sm text-center">
            {game.gameState === "LIVE" || game.gameState === "CRIT" ? (
                <p>Period {game.periodDescriptor.number}</p>
              ) : game.gameState === "FINAL" || game.gameState === "OFF" ? (
                <p>{game.gameOutcome.lastPeriodType === "OT" ? "Final/OT" : game.gameOutcome.lastPeriodType === "SO" ? "Final/SO" : "Final"}</p>
              ) : (
                <div className="text-xs">
                  <p>Start Time: {convertUTCToLocalTime(game.startTimeUTC)}</p>
                  <p>Venue: {game.venue.default}</p>
                </div>
              )}
            </div>
          </span>
          <div className="flex items-center">
            {game.specialEvent && game.specialEventLogo ? (
              <span className="mb-5 font-bold">{game.homeTeam.abbrev}</span>
            ) : (
              <>
                <img
                  src={game.homeTeam.logo}
                  alt={game.homeTeam.placeName.default}
                  className="w-16 h-16 mr-2 mb-5"
                />
                <span className=" mb-5 font-bold">{game.homeTeam.abbrev}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
