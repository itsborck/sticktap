const Banner = ({ game, details }) => {
  return (
    <div className="bg-gray-900 py-8 text-white mb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-0" />
      <div className="relative z-10 flex flex-col items-center container mx-auto">
        <div className="flex items-center mb-4">
          <img
            src={game.awayTeam.logo}
            alt={game.awayTeam.name.default}
            className="w-12 h-12 mr-4"
          />
          <p className="text-2xl font-bold mr-8">
            {game.awayTeam.name.default}
          </p>
          <p className="text-4xl font-bold mx-8">
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
        <div className="text-sm text-center">
          <p>{game.clock.timeRemaining}</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;