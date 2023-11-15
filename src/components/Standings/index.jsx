import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";

const Standings = () => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get(
          "https://api-web.nhle.com/v1/standings/now"
        );
        setStandings(response.data.standings);
      } catch (error) {
        console.error("Error fetching standings:", error);
      }
    };

    fetchStandings();
  }, []);

  useEffect(() => {
    document.title = "Current Standings | StickTap";
  });

  const groupByDivision = () => {
    const groupedStandings = {};
    standings.forEach((team) => {
      const divisionName = team.divisionName;

      if (!groupedStandings[divisionName]) {
        groupedStandings[divisionName] = [];
      }

      groupedStandings[divisionName].push(team);
    });

    return groupedStandings;
  };

  const renderDivisionTable = (divisionName, teams) => (
    <div key={divisionName} className="my-4">
      <h2 className="text-2xl font-bold mb-2">{divisionName}</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Team</th>
            <th className="py-3 px-6 text-left">GP</th>
            <th className="py-3 px-6 text-left">Wins</th>
            <th className="py-3 px-6 text-left">Losses</th>
            <th className="py-3 px-6 text-left">OT Losses</th>
            <th className="py-3 px-6 text-left">Points</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.teamAbbrev.default} className="text-lg">
              <td className="py-3 px-6 border-b border-gray-700">
                <img src={team.teamLogo} alt={team.teamName.default} className="h-6 w-6 inline-block mr-2" />
                {team.teamAbbrev.default}
              </td>
              <td className="py-3 px-6 border-b border-gray-700">{team.gamesPlayed}</td>
              <td className="py-3 px-6 border-b border-gray-700">{team.wins}</td>
              <td className="py-3 px-6 border-b border-gray-700">{team.losses}</td>
              <td className="py-3 px-6 border-b border-gray-700">{team.otLosses}</td>
              <td className="py-3 px-6 border-b border-gray-700">{team.points}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="dark:bg-gray-800 dark:text-white p-6"> 
        <h1 className="text-3xl font-bold mb-4">Standings</h1>
        {Object.entries(groupByDivision()).map(([divisionName, teams]) =>
          renderDivisionTable(divisionName, teams)
        )}
      </div>
    </>
  );
};

export default Standings;
