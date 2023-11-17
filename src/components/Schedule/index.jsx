import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import GameDetails from "../GameDetails";
import Navbar from "../Navbar";
import GameCalendar from "./Calendar";
import ScheduleDay from "./ScheduleDay";

const WeeklySchedule = () => {
  const [gameWeek, setGameWeek] = useState([]);

  const today = new Date();
  const [formattedDate, setFormattedDate] = useState(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`);

  const gamesToday = gameWeek.filter(day => day.date === formattedDate);

  useEffect(() => {
    document.title = 'Schedule | StickTap';
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`https://api-web.nhle.com/v1/schedule/${formattedDate}`);
        setGameWeek(response.data.gameWeek);
      } catch (error) {
        console.error("Error fetching schedule: ", error);
      }
    };

    fetchSchedule();
  }, [formattedDate]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-800 text-white px-5" style={{}}>
        <GameCalendar formattedDate={formattedDate} setFormattedDate={setFormattedDate} />
        {gamesToday.map((day) => (
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