const Info = ({ game }) => {
  return (
    <div className="text-white bg-gray-950 p-4 rounded-lg shadow-md my-2 mx-2">
      <div className="flex-col mt-2">
        <p>Networks</p>
        {game.tvBroadcasts.map((broadcast) => (
          <div key={broadcast.id} className="mr-2">
            {broadcast.countryCode === "US" ? (
              <div>
                <span className="text-s text-gray-400">
                  {broadcast.network}
                </span>
              </div>
            ) : null}
          </div>
        ))}
        <p>Location</p>
        <span className="text-s text-gray-400">{game.venue.default}</span>
        {game.boxscore &&
          game.boxscore.gameInfo &&
          game.boxscore.gameInfo.homeTeam.headCoach.default && (
            <>
              <p>{game.homeTeam.abbrev} Coach</p>
              <span className="text-s text-gray-400">
                {game.boxscore.gameInfo.homeTeam.headCoach.default}
              </span>
            </>
          )}
        {game.boxscore &&
          game.boxscore.gameInfo &&
          game.boxscore.gameInfo.awayTeam.headCoach.default && (
            <>
              <p>{game.awayTeam.abbrev} Coach</p>
              <span className="text-s text-gray-400">
                {game.boxscore.gameInfo.awayTeam.headCoach.default}
              </span>
            </>
          )}
        {game.boxscore &&
          game.boxscore.gameInfo &&
          game.boxscore.gameInfo.referees.length > 0 && (
            <>
              <p>Referees</p>
              {game.boxscore.gameInfo.referees.map((referee) => (
                <span key={referee} className="text-s text-gray-400">
                  {referee.default} <br />
                </span>
              ))}
            </>
          )}
        {game.boxscore &&
          game.boxscore.gameInfo &&
          game.boxscore.gameInfo.linesmen.length > 0 && (
            <>
              <p>Linesmen</p>
              {game.boxscore.gameInfo.linesmen.map((linesmen) => (
                <span key={linesmen} className="text-s text-gray-400">
                  {linesmen.default} <br />
                </span>
              ))}
            </>
          )}
      </div>
    </div>
  );
};

export default Info;
