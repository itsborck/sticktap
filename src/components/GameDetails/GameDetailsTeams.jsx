const GameDetailsTeams = ({ game, details }) => {
  return (
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
  );
};

export default GameDetailsTeams;
