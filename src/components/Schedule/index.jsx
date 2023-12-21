import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import GameDetails from "../GameDetails";
import Navbar from "../Navbar";
import GameCalendar from "./Calendar";
import ScheduleDay from "./ScheduleDay";
import PinnedGames from "./PinnedGames";

const WeeklySchedule = () => {
  const [gameWeek, setGameWeek] = useState([]);

  const today = new Date();
  const [formattedDate, setFormattedDate] = useState(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}`
  );

  const gamesToday = gameWeek.filter((day) => day.date === formattedDate);

  useEffect(() => {
    document.title = "Schedule | StickTap";
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          "https://corsmirror.onrender.com/v1/cors?url=" +
            encodeURIComponent(
              `https://api-web.nhle.com/v1/schedule/${formattedDate}`
            )
        );
        setGameWeek(response.data.gameWeek);
      } catch (error) {
        console.error("Error fetching schedule: ", error);
      }
    };

    fetchSchedule();
    const interval = setInterval(fetchSchedule, 15000);

    return () => clearInterval(interval);
  }, [formattedDate]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-800 text-white px-5" style={{}}>
        <GameCalendar
          formattedDate={formattedDate}
          setFormattedDate={setFormattedDate}
        />
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="flex text-2xl sm:col-span-1 lg:col-span-3"><FaStar className="mr-2 w-6"/> Favorite</div>
          <PinnedGames formattedDate={formattedDate} />
        </div>
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
