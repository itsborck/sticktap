import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import GameDetails from "../GameDetails";
import Navbar from "../Navbar";
import GameCalendar from "./ScheduleCalendar";
import ScheduleDay from "./ScheduleDay";
import { APIBaseURL, endpoints } from "../../config.json";

const WeeklySchedule = () => {
  const [gameWeek, setGameWeek] = useState([]);
  const [selectedDay, setSelectedDay] = useState("null");

  useEffect(() => {
    document.title = 'Schedule | StickTap';
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(APIBaseURL + endpoints.schedule);
        setGameWeek(response.data.gameWeek);
        console.log(response)
      } catch (error) {
        console.error("Error fetching schedule: ", error);
      }
    };

    fetchSchedule();
  }, []);

  const handleSelectDay = (day) => {
    setSelectedDay(day);
  };

  return (
    <>
      <Navbar />
      <div className="dark:bg-gray-800 dark:text-white">
        <GameCalendar
          daysOfWeek={gameWeek.map((date) => date.dayAbbrev)}
          selectedDay={selectedDay}
          onSelectDay={handleSelectDay}
        />
        {gameWeek.map((day) => (
          <ScheduleDay key={day.date} day={day} />
        ))}
        <Routes>
          <Route path="/game/:gameId" element={<GameDetails />} />
        </Routes>
      </div>
    </>
  );
};

export default WeeklySchedule;