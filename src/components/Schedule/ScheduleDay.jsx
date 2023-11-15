import GameCard from "./GameCard";

const ScheduleDay = ({ day }) => {

  function getFullDayName(utcDate) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(utcDate);
    return daysOfWeek[date.getUTCDay()];
  }

  return (
    <div key={day.date} className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">{getFullDayName(day.date)}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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