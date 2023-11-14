import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import GameDetails from "../GameDetails";
import Navbar from "../Navbar";
import GameCalendar from "./ScheduleCalendar";

const WeeklySchedule = () => {
  const [gameWeek, setGameWeek] = useState([]);
  const [selectedDay, setSelectedDay] = useState("null");

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          "https://api-web.nhle.com/v1/schedule/now"
        );
        setGameWeek(response.data.gameWeek);
        setSelectedDay(response.data.gameWeek[0]?.dayAbbrev);
      } catch (error) {
        console.error("Error fetching schedule: ", error);
      }
    };

    fetchSchedule();
  }, []);

  const handleSelectDay = (day) => {
    setSelectedDay(day);
  };

  function convertUTCToLocalTime(utcTime) {
    const date = new Date(utcTime);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "numeric" });
  }

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
    <>
      <Navbar />
      <div className="dark:bg-gray-800 dark:text-white">
        <GameCalendar
          daysOfWeek={gameWeek.map((day) => day.dayAbbrev)}
          selectedDay={selectedDay}
          onSelectDay={handleSelectDay}
        />
        {gameWeek.map((day) => (
          <div key={day.date} className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {getFullDayName(day.date)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {day.games.map((game) => (
                <Link key={game.id} to={`/game/${game.id}`}>
                  <div
                    key={game.id}
                    className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transiton duration-300"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <img
                          src={game.awayTeam.logo}
                          alt={game.awayTeam.placeName.default}
                          className="w-8 h-8 mr-2"
                        />
                        <span className="font-bold">
                          {game.awayTeam.placeName.default}
                        </span>
                      </div>
                      <span className="text-xl text-center font-bold">
                        {game.awayTeam.score} - {game.homeTeam.score}
                      </span>
                      <div className="flex items-center">
                        <span className="font-bold">
                          {game.homeTeam.placeName.default}
                        </span>
                        <img
                          src={game.homeTeam.logo}
                          alt={game.homeTeam.placeName.default}
                          className="w-8 h-8 ml-2"
                        />
                      </div>
                    </div>
                    <div className="text-sm text-center">
                      {game.gameState === "LIVE" ? (
                        <div>
                          <p>Period {game.periodDescriptor.number}</p>
                        </div>
                      ) : game.gameState === "FINAL" ||
                        game.gameState === "OFF" ? (
                        <p>Final</p>
                      ) : (
                        <div>
                          <p>
                            Start Time:{" "}
                            {convertUTCToLocalTime(game.startTimeUTC)}
                          </p>
                          <p>Venue: {game.venue.default}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
        <Routes>
          <Route path="/game/:gameId" element={<GameDetails />} />
        </Routes>
      </div>
    </>
  );
};

export default WeeklySchedule;
