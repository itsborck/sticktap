import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Scoring = ({ gameId }) => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(
          "https://corsmirror.onrender.com/v1/cors?url=" +
            encodeURIComponent(
              `https://api-web.nhle.com/v1/gamecenter/${gameId}/landing`
            )
        );
        setGoals(response.data.summary.scoring);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
    const interval = setInterval(fetchGoals, 15000);

    return () => clearInterval(interval);
  }, [gameId]);

  if (!goals) {
    return null;
  }

  return goals && goals.length > 0 ? (
    <div className="bg-gray-950 my-2 mx-2 p-4 rounded-lg shadow-md">
      {goals.map((period, index) => (
        <div key={index} className="mb-4">
          {period.period === 4 ? (
            <h2 className="text-lg font-semibold mb-2 text-gray-400">OT</h2>
          ) : period.period === 5 ? null : (
            <h2 className="text-lg font-semibold mb-2 text-gray-400">
              Period {period.period}
            </h2>
          )}
          {period.goals && period.goals.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {period.period !== 5 &&
                period.goals.map((goal, goalIndex) => (
                  <div key={goalIndex} className="border-b pb-2 flex">
                    <img
                      className="w-1/6 object-cover rounded-full"
                      src={goal.headshot}
                    />
                    <div className="ml-4">
                      <Link
                        to={`/player/${goal.playerId}`}
                        className="text-sm font-medium hover:underline"
                      >
                        <strong>
                          {goal.firstName} {goal.lastName}
                        </strong>{" "}
                        ({goal.teamAbbrev})
                      </Link>
                      {goal.assists && goal.assists.length > 0 && (
                        <p className="text-xs text-gray-400">
                          {goal.assists.map((assist, assistIndex) => (
                            <Link
                              key={assistIndex}
                              to={`/player/${assist.playerId}`}
                              className="hover:underline"
                            >
                              {assist.lastName} ({assist.assistsToDate})
                              {assistIndex < goal.assists.length - 1
                                ? ", "
                                : ""}
                            </Link>
                          ))}
                        </p>
                      )}
                      <p className="text-xs">Time: {goal.timeInPeriod}</p>
                      <p className="text-xs">Shot: {goal.shotType}</p>
                      {goal.strength === "pp" ? (
                        <p className="text-xs">PP Goal</p>
                      ) : goal.strength === "sh" ? (
                        <p className="text-xs">SH Goal</p>
                      ) : null}
                    </div>
                  </div>
                ))}
            </div>
          ) : period.period !== 5 ? (
            <p className="text-xs">No goals in this period.</p>
          ) : null}
        </div>
      ))}
    </div>
  ) : null;
};

export default Scoring;
