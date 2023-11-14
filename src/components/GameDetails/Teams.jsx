const GameDetailsTeams = ({ game }) => {
  return (
    <div>
      <h3>Teams:</h3>
      <div className="flex">
        <div>
          <h4>{game.awayTeam.abbrev}</h4>
          <img
            src={game.awayTeam.logo}
            alt={game.awayTeam.name.default}
            className="w-8 h-8"
          />
        </div>
        <div>
          <h4>{game.homeTeam.abbrev}</h4>
          <img
            src={game.homeTeam.logo}
            alt={game.homeTeam.name.default}
            className="w-8 h-8"
          />
        </div>
      </div>
    </div>
  );
};

export default GameDetailsTeams;
