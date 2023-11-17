const Boxscore = ({ game }) => {
  if (!game.boxscore) {
    return null;
  }

  return (
    <div className="text-white shadow-lg">
      <h2 className="text-lg font-bold mb-2">Boxscore</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b-2 border-gray-500">
            <th className="py-2 text-left">Period</th>
            {game.boxscore.linescore.byPeriod.map((period) => (
              <th key={period.period} className="py-2 text-center">
                {period.period === 4
                  ? "OT"
                  : period.period === 5
                  ? "SO"
                  : period.period}
              </th>
            ))}
            <th className="py-2 text-center">Totals</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-r border-gray-500 py-2 pl-2">
              {game.awayTeam.abbrev}
            </td>
            {game.boxscore.linescore.byPeriod.map((period) => (
              <td
                key={period.period}
                className="border-r border-gray-500 py-2 text-center"
              >
                {period.away}
              </td>
            ))}
            <td className="py-2 text-center">
              {game.boxscore.linescore.totals.away}
            </td>
          </tr>
          <tr>
            <td className="border-r border-gray-500 py-2 pl-2">
              {game.homeTeam.abbrev}
            </td>
            {game.boxscore.linescore.byPeriod.map((period) => (
              <td
                key={period.period}
                className="border-r border-gray-500 py-2 text-center"
              >
                {period.home}
              </td>
            ))}
            <td className="py-2 text-center">
              {game.boxscore.linescore.totals.home}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Boxscore;
