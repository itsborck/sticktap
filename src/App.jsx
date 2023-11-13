import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import WeeklySchedule from "./components/WeeklySchedule";
import GameDetails from "./components/GameDetails";
import DarkModeToggle from "./components/DarkModeToggle";
import './index.css'

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark', !darkMode);
    setDarkMode(!darkMode);
  }

  return (
    <div className={`h-screen ${darkMode ? 'dark' : ''}`}>
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <Router>
        <Routes>
          <Route exact path="/" Component={HomePage} />
          <Route path="/games/*" Component={WeeklySchedule} />
          <Route path="/game/:gameId/*" Component={GameDetails} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
