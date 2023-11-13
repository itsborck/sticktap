import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import WeeklySchedule from "./components/WeeklySchedule";
import GameDetails from "./components/GameDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={HomePage} />
        <Route path="/games/*" Component={WeeklySchedule} />
        <Route path="/game/:gameId/*" Component={GameDetails} />
      </Routes>
    </Router>
  );
}

export default App;
