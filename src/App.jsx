import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GameDetails from "./components/GameDetails";
import HomePage from "./components/HomePage";
import Standings from "./components/Standings";
import WeeklySchedule from "./components/Schedule";
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" Component={HomePage} />
          <Route path="/schedule/*" Component={WeeklySchedule} />
          <Route path="/standings/*" Component={Standings} />
          <Route path="/game/:gameId/*" Component={GameDetails} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
