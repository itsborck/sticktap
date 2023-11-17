import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";

const Standings = () => {
  const [standings, setStandings] = useState([]);

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  console.log(formattedDate);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get(
          `https://corsproxy.io/?https://api-web.nhle.com/v1/standings/${formattedDate}`
        );
        setStandings(response.data.standings);
      } catch (error) {
        console.error("Error fetching standings:", error);
      }
    };

    fetchStandings();
  }, [formattedDate]);

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
        <thead className="text-center">
          <tr className="bg-gray-700 text-gray-400 uppercase text-sm leading-normal">
            <th className="py-3 px-6 ">Rank</th>
            <th className="py-3 px-6 ">Team</th>
            <th className="py-3 px-6 ">GP</th>
            <th className="py-3 px-6 ">W</th>
            <th className="py-3 px-6 ">L</th>
            <th className="py-3 px-6 ">OTL</th>
            <th className="py-3 px-6 ">PTS</th>
            <th className="py-3 px-6 ">P%</th>
            <th className="py-3 px-6 ">RW</th>
            <th className="py-3 px-6 ">ROW</th>
            <th className="py-3 px-6 ">GF</th>
            <th className="py-3 px-6 ">GA</th>
            <th className="py-3 px-6 ">DIFF</th>
            <th className="py-3 px-6 ">HOME</th>
            <th className="py-3 px-6 ">AWAY</th>
            <th className="py-3 px-6 ">S/O</th>
            <th className="py-3 px-6 ">L10</th>
            <th className="py-3 px-6 ">STRK</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {teams.map((team) => (
            <tr key={team.teamAbbrev.default} className="text-lg even:bg-gray-700">
              <td className="py-3 px-6 border-b border-gray-700">{team.divisionSequence}</td>
              <td className="py-3 px-16 border-b border-gray-700">
                <img src={team.teamLogo} alt={team.teamName.default} className="h-8 w-8 inline-block" />
                {team.teamAbbrev.default}
              </td>
              <td className="py-3 px-6 border-b border-gray-700">{team.gamesPlayed}</td>
              <td className="py-3 px-6 border-b border-gray-700">{team.wins}</td>
              <td className="py-3 px-6 border-b border-gray-700">{team.losses}</td>
              <td className="py-3 px-6 border-b border-gray-700">{team.otLosses}</td>
              <td className="py-3 px-6 border-b border-gray-700">{team.points}</td>
              <td className="py-3 px-6 border-b border-gray-700">{parseFloat(team.pointPctg).toFixed(3).replace(/^0+/, '')}</td>
              <td className="py-3 px-6 border-b border-gray-700">{team.regulationWins}</td>
              <td className="py-3 px-6 border-b border-gray-700">{team.regulationPlusOtWins}</td>
              <td className="py-3 px-6 border-b border-gray-700">{team.goalFor}</td>
              <td className="py-3 px-6 border-b border-gray-700">{team.goalAgainst}</td>
              <td className="py-3 px-6 border-b border-gray-700">{team.goalDifferential}</td>
              <td className="py-3 px-4 border-b border-gray-700">{team.homeWins}-{team.homeLosses}-{team.homeOtLosses}</td>
              <td className="py-3 px-4 border-b border-gray-700">{team.roadWins}-{team.roadLosses}-{team.roadOtLosses}</td>
              <td className="py-3 px-4 border-b border-gray-700">{team.shootoutWins}-{team.shootoutLosses}</td>
              <td className="py-3 border-b border-gray-700">{team.l10Wins}-{team.l10Losses}-{team.l10OtLosses}</td>
              <td className="py-3 px-6 border-b border-gray-700">{team.streakCode}{team.streakCount}</td>
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
      <div className="bg-gray-800 text-white p-6"> 
        <h1 className="text-3xl font-bold mb-4">Standings</h1>
        {Object.entries(groupByDivision()).map(([divisionName, teams]) =>
          renderDivisionTable(divisionName, teams)
        )}
      </div>
    </>
  );
};

export default Standings;
