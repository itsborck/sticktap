const Info = ({ game, convertUTCToLocalTime }) => {

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <p className="text-sm">
        Start Time: {convertUTCToLocalTime(game.startTimeUTC)}
      </p>
      <p className="text-sm">Venue: {game.venue.default}</p>
      {game.gameState === "LIVE" ? (
        <div>
          <p>Clock: {game.clock.timeRemaining}</p>
          <p>
            Score: {game.awayTeam.score} - {game.homeTeam.score}
          </p>
          <p>Period: {game.periodDescriptor.number}</p>
        </div>
      ) : game.gameState === "OFF" ? (
        <p>
          Final Score: {game.awayTeam.score} - {game.homeTeam.score}
        </p>
      ) : (
        <p>Game is not live</p>
      )}
    </div>
  );
};

export default Info;
