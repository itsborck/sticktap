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
    stats && stats.length > 0 ? (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2">Three Stars</h2>
        {stats.map((star, index) => (
          <div key={index} className="flex flex-row max-w-sm rounded overflow-hidden shadow-lg m-4">
            <img className="w-1/3 object-cover" src={star.headshot} alt={star.name} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Star {star.star}: {star.name}</div>
              <p className="text-base text-gray-300">Team: {star.teamAbbrev}</p>
              <p className="text-base text-gray-300">Position: {star.position}</p>
              <p className="text-base text-gray-300">Points: {star.points}</p>
            </div>
          </div>
        ))}
      </div>
    ) : null
  );
};

export default ThreeStars;
