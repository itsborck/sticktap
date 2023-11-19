import GameCard from "./GameCard";

const ScheduleDay = ({ day }) => {
  const liveGames = day.games.filter(game => game.gameState === "LIVE" || game.gameState === "CRIT");
  const futureGames = day.games.filter(game => game.gameState === "FUT" || game.gameState === "PRE");
  const finalGames = day.games.filter(game => game.gameState === "FINAL" || game.gameState === "OFF");


  return (
    <div key={day.date} className="mb-8">
      <div className="grid lg:pl-4 md:pl-4 md:pr-4 gap-4">
        {day.games.length === 0 ? (
          <p>No games scheduled.</p>
        ) : (
          <>
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
            {liveGames.length > 0 && <div className="text-2xl sm:col-span-1 lg:col-span-3">Live</div>}
            {liveGames.map((game) => <GameCard key={game.id} game={game} />)}
          </div>
          <div className="grid sm:grid-col-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
            {futureGames.length > 0 && <div className="text-2xl sm:col-span-1 lg:col-span-3">Upcoming</div>}
            {futureGames.map((game) => <GameCard key={game.id} game={game} />)}
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
            {finalGames.length > 0 && <div className="text-2xl sm:col-span-1 lg:col-span-3">Final</div>}
            {finalGames.map((game) => <GameCard key={game.id} game={game} />)}
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduleDay;
