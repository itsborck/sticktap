import { useState, useEffect } from 'react';
import axios from 'axios';

const Scoring = ({ gameId }) => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(
          `https://api-web.nhle.com/v1/gamecenter/${gameId}/landing`
        );
        setGoals(response.data.summary.scoring);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, [gameId]);

  if (!goals) {
    return <p>No goal information available for this game.</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-4 p-4 rounded-lg shadow-md">
      {goals.map((period, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Period {period.period}</h2>
          {period.goals && period.goals.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {period.goals.map((goal, goalIndex) => (
                <div key={goalIndex} className="border-b pb-2">
                  <p className="text-sm font-medium">
                    <strong>{goal.firstName} {goal.lastName}</strong> ({goal.teamAbbrev})
                  </p>
                  <p className="text-xs">Time: {goal.timeInPeriod}</p>
                  <p className="text-xs">Shot Type: {goal.shotType}</p>
                  {goal.assists && goal.assists.length > 0 && (
                    <p className="text-xs">Assists: {goal.assists.map((assist, assistIndex) => (
                      <span key={assistIndex}>{assist.firstName} {assist.lastName}{assistIndex < goal.assists.length - 1 ? ', ' : ''}</span>
                    ))}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs">No goals in this period.</p>
          )}
        </div>
      ))}
    </div>
  )
}

export default Scoring;