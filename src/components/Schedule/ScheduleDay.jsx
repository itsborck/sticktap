import GameCard from "./GameCard";

const ScheduleDay = ({ day }) => {
  return (
    <div key={day.date} className="mb-8">
      <div className="grid grid-cols-1 sm:w-full md:w-full lg:w-1/3 lg:pl-4 md:pl-4 md:pr-4 gap-4">
        {day.games.length === 0 ? (
          <p>No games scheduled.</p>
        ) : (
          day.games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))
        )}
      </div>
    </div>
  );
};

export default ScheduleDay;