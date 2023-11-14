const Info = ({ game, convertUTCToLocalTime }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <p className="text-sm">Venue: {game.venue.default}</p>
      {game.gameState === "LIVE" ? (
        <div>
          <p className="text-sm">Clock: {game.clock.timeRemaining}</p>
          <p className="text-sm">
            Score: {game.awayTeam.score} - {game.homeTeam.score}
          </p>
          <p className="text-sm">Period: {game.periodDescriptor.number}</p>
        </div>
      ) : game.gameState === "FINAL" || game.gameState === "OFF" ? (
        <p className="text-sm">
          Final Score: {game.awayTeam.score} - {game.homeTeam.score}
        </p>
      ) : (
        <p className="text-sm">
          Start Time: {convertUTCToLocalTime(game.startTimeUTC)}
        </p>
      )}
    </div>
  );
};

export default Info;
