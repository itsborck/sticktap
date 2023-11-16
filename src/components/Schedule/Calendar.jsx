import { useState } from "react";

const GameCalendar = ({ formattedDate, setFormattedDate }) => {
  const [displayDate, setDisplayDate] = useState(new Date(formattedDate + 'T00:00:00').toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric"}));
  const [isLoading, setIsLoading] = useState(false);

  const previousDay = () => {
    setIsLoading(true);
    const date = new Date(formattedDate + 'T00:00:00');
    date.setDate(date.getDate() - 1);
    const newDate = date.toISOString().slice(0, 10);
    setFormattedDate(newDate);
    const displayDate = date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric"});
    setDisplayDate(displayDate);
    setIsLoading(false);
  };

  const nextDay = () => {
    setIsLoading(true);
    const date = new Date(formattedDate + 'T00:00:00');
    date.setDate(date.getDate() + 1);
    const newDate = date.toISOString().slice(0, 10);
    setFormattedDate(newDate);
    const displayDate = date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric"});
    setDisplayDate(displayDate);
    setIsLoading(false);
  };

  return (
    <div className="flex justify-between">
      <button onClick={previousDay} className="ml-32">Prev</button>
      {isLoading ? <span>Loading...</span> : <span className="text-2xl mt-10 mb-10">{displayDate}</span>}
      <button onClick={nextDay} className="mr-32">Next</button>
    </div>
  );
};

export default GameCalendar;
