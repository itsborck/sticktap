import axios from "axios";
import { useEffect, useState } from "react";

const Scoring = ({ gameId }) => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(
          `https://corsproxy.io/?https://api-web.nhle.com/v1/gamecenter/${gameId}/landing`
        );
        setGoals(response.data.summary.scoring);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, [gameId]);

  return (
    <div className="max-w-lg mx-auto mt-4 p-4 rounded-lg shadow-md">
      {goals.map((period, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-400">Period {period.period}</h2>
          {period.goals && period.goals.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {period.goals.map((goal, goalIndex) => (
                <div key={goalIndex} className="border-b pb-2 flex">
                  <img className="w-1/6" src={goal.headshot} />
                  <div className="ml-4">
                    <p className="text-sm font-medium">
                      <strong>
                        {goal.firstName} {goal.lastName}
                      </strong>{" "}
                      ({goal.teamAbbrev})
                    </p>
                    {goal.assists && goal.assists.length > 0 && (
                      <p className="text-xs text-gray-400">
                        {goal.assists.map((assist, assistIndex) => (
                          <span key={assistIndex}>
                            {assist.lastName} ({assist.assistsToDate})
                            {assistIndex < goal.assists.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                    )}
                    <p className="text-xs">Time: {goal.timeInPeriod}</p>
                    <p className="text-xs">Shot: {goal.shotType}</p>
                    {goal.strength === "pp" ? (
                      <p className="text-xs">PP Goal</p>
                    ) : goals.strength === "sh" ? (
                      <p className="text-xs">SH Goal</p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs">No goals in this period.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Scoring;