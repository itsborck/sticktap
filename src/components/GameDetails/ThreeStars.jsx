import { useState, useEffect } from 'react';
import axios from 'axios';

const ThreeStars = ({ gameId }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`https://api-web.nhle.com/v1/gamecenter/${gameId}/landing`);
        setStats(response.data.summary.threeStars);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchStats();
  }, [gameId]);

  return (
    <div className="flex flex-col items-center justify-center">
      {stats && stats.map((star, index) => (
        <div key={index} className="flex flex-row max-w-sm rounded overflow-hidden shadow-lg m-4">
          <img className="w-1/3" src={star.headshot} alt={star.name} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Star {star.star}: {star.name}</div>
            <p className="text-gray-700 dark:text-gray-300 text-base">Team: {star.teamAbbrev}</p>
            <p className="text-gray-700 dark:text-gray-300 text-base">Position: {star.position}</p>
            <p className="text-gray-700 dark:text-gray-300 text-base">Points: {star.points}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThreeStars;
