const Boxscore = ({ game }) => {
  if (!game.boxscore) {
    return null;
  }

  return (
    <div className="bg-gray-950 text-white rounded-lg shadow-lg p-4 my-2 mx-2 overflow-auto">
      <h2 className="text-2xl font-bold mb-2">Boxscore</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="border-b-2 border-gray-500">
            <th className="py-2 text-left">Period</th>
            {game.boxscore.linescore.byPeriod.map((period) => (
              <th
                key={period.period}
                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
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
