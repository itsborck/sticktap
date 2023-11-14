import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GameDetails from "./components/GameDetails";
import HomePage from "./components/HomePage";
import Standings from "./components/Standings";
import WeeklySchedule from "./components/Schedule";
import "./index.css";

function App() {
  const [isDarkMode, setDarkMode] = useState(() => {
    const storedMode = JSON.parse(localStorage.getItem("darkMode"));
    return storedMode ? JSON.parse(storedMode) : true;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <button onClick={toggleDarkMode} className="fixed bottom-4 right-4 p-4 rounded-full shadow-md bg-blue-800 text-white">
        {isDarkMode ? '🌙' : '☀️'}
      </button>
      <Router>
        <Routes>
          <Route exact path="/" Component={HomePage} />
          <Route path="/games/*" Component={WeeklySchedule} />
          <Route path="/standings/*" Component={Standings} />
          <Route path="/game/:gameId/*" Component={GameDetails} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
