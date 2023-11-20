import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GameDetails from "./components/GameDetails";
import Standings from "./components/Standings";
import WeeklySchedule from "./components/Schedule";
import Account from "./components/Authentication";
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" Component={WeeklySchedule} />
          <Route path="/standings/*" Component={Standings} />
          <Route path="/game/:gameId/*" Component={GameDetails} />
          <Route path="/account/*" Component={Account} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
