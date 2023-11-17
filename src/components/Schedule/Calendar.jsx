import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const GameCalendar = ({ formattedDate, setFormattedDate }) => {
  const [displayDate, setDisplayDate] = useState(
    new Date(formattedDate + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  );
  const [isLoading, setIsLoading] = useState(false);

  const previousDay = () => {
    setIsLoading(true);
    const date = new Date(formattedDate + "T00:00:00");
    date.setDate(date.getDate() - 1);
    const newDate = date.toISOString().slice(0, 10);
    setFormattedDate(newDate);
    const displayDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    setDisplayDate(displayDate);
    setIsLoading(false);
  };

  const nextDay = () => {
    setIsLoading(true);
    const date = new Date(formattedDate + "T00:00:00");
    date.setDate(date.getDate() + 1);
    const newDate = date.toISOString().slice(0, 10);
    setFormattedDate(newDate);
    const displayDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    setDisplayDate(displayDate);
    setIsLoading(false);
  };

  return (
    <div className="flex justify-between text-white">
      <button onClick={previousDay} className="lg:ml-32 md:ml-16 sm:ml-8">
        <FaChevronLeft />
      </button>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <span className="text-xl my-10 overflow-hidden whitespace-nowrap text-ellipsis">
          {displayDate}
        </span>
      )}
      <button onClick={nextDay} className="lg:mr-32 md:mr-16 sm:mr-8">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default GameCalendar;
