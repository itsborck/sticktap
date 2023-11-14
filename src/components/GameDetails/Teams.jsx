import { useState, useEffect } from 'react';
import axios from 'axios';

const Teams = ({ gameId }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`https://api-web.nhle.com/v1/gamecenter/${gameId}/landing`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };
    fetchStats();
  });

  return (
    <div>

    </div>
  );
};

export default Teams;
