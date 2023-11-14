import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";

const Standings = () => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get('https://api-web.nhle.com/v1/standings/now');
        setStandings(response.data.standings);
      } catch (error) {
        console.error('Error fetching standings:', error);
      }
    };

    fetchStandings();
  }, []);

  const groupByDivision = () => {
    const groupedStandings = {};
    standings.forEach((team) => {
      const divisionName = team.divisionName.default;

      if (!groupedStandings[divisionName]) {
        groupedStandings[divisionName] = [];
      }

      groupedStandings[divisionName].push(team);
    });

    return groupedStandings;
  };

  const renderDivisionTable = (divisionName, teams) => (
    <div key={divisionName}>
      <h2>{divisionName}</h2>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>OT Losses</th>
            <th>Points</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.teamAbbrev.default}>
              <td>
                <img src={team.teamLogo} alt={team.teamName.default} />
                {team.teamAbbrev.default}
              </td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.otLosses}</td>
              <td>{team.points}</td>
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
      <div>
        <h1>Standings</h1>
        {Object.entries(groupByDivision()).map(([divisionName, teams]) =>
          renderDivisionTable(divisionName, teams)
        )}
      </div>
    </>
  );
};

export default Standings;