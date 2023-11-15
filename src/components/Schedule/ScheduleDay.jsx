import GameCard from "./GameCard";

const ScheduleDay = ({ day }) => {
  return (
    <div key={day.date} className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">{day.date}</h2>
      {day.games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default ScheduleDay;