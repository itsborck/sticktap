import { useState, useEffect } from "react";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import GameDetails from "./GameDetails";

const WeeklySchedule = () => {
  const [gameWeek, setGameWeek] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get('http://localhost:5000/schedule/now');
        setGameWeek(response.data.gameWeek);
      } catch (error) {
        console.error('Error fetching schedule: ', error);
      }
    };

    fetchSchedule();
  }, []);

  const convertToLocalTime = (utcTime, offset) => {
    const utcDate = new Date(utcTime);
    const localTime = new Date(utcDate.toLocaleDateString('en-US', { timeZone: 'UTC' }));
    localTime.setMinutes(localTime.getMinutes() + offset);
    return localTime.toLocaleDateString();
  }

  return (
    <Router>
      <div>
        <h1 className="text-4xl font-bold mb-4">Hockey Scores</h1>
        {gameWeek.map((day) => (
          <div key={day.date} className="mb-8">
            <h2 className="text-2xl font-bold mb-2">{day.date} ({day.dayAbbrev})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {day.games.map((game) => (
                <Link key={game.id} to={`game/${game.id}`}>
                  <div key={game.id} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <img src={game.awayTeam.logo} alt={game.awayTeam.placeName.default} className="w-8 h-8 mr-2" />
                        <span className="font-bold">{game.awayTeam.placeName.default}</span>
                      </div>
                      <span className="text-xl font-bold">{game.awayTeam.score} - {game.homeTeam.score}</span>
                      <div className="flex items-center">
                        <span className="font-bold">{game.homeTeam.placeName.default}</span>
                        <img src={game.homeTeam.logo} alt={game.homeTeam.placeName.default} className="w-8 h-8 ml-2" />
                      </div>
                    </div>
                    <div className="text-sm">
                      <p>Start Time: {convertToLocalTime(game.startTimeUTC, game.venueUTCOffset)}</p>
                      <p>Venue: {game.venue.default}</p>
                    </div>
                    <div className="flex mt-2">
                      {game.tvBroadcasts.map((broadcast) => (
                        <div key={broadcast.id} className="mr-2">
                          {broadcast.network} ({broadcast.countryCode})
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
        <Routes>
          <Route path="/game/:gameId" render={(props) => <GameDetails {...props} />} />
        </Routes>
      </div>
    </Router>
  );
};


export default WeeklySchedule;