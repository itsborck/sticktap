const GameCalendar = ({ selectedDay, onSelectDay }) => {
  const reorderedDaysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="flex space-x-4">
      {reorderedDaysOfWeek.map((day) => (
        <button
          key={day}
          className={`p-2 border ${
            selectedDay === day ? "border-blue-500" : ""
          }`}
          onClick={() => onSelectDay(day)}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default GameCalendar;
