import axios from "axios";
import { useEffect, useState } from "react";

const Shootout = ({ gameId }) => {
  const [shootout, setShootout] = useState(null);

  useEffect(() => {
    const fetchShootout = async () => {
      try {
        const response = await axios.get(
          "https://corsmirror.onrender.com/v1/cors?url=" +
            encodeURIComponent(
              `https://api-web.nhle.com/v1/gamecenter/${gameId}/landing`
            )
        );
        setShootout(response.data.summary.shootout);
      } catch (error) {
        console.error("Error fetching shootout:", error);
      }
    };

    fetchShootout();
    const interval = setInterval(fetchShootout, 15000);

    return () => clearInterval(interval);
  }, [gameId]);

  if (!shootout) {
    return null;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      {shootout.map((player) => (
        <div key={player.sequence} className="flex mb-4 last:mb-0 border-b">
          <img
            className="w-24 h-24 rounded-full mb-2"
            src={player.headshot}
            alt={`${player.firstName} ${player.lastName}`}
          />
          <div className="ml-4">
            <h2 className="text-2xl font-bold">
              {player.firstName} {player.lastName} ({player.teamAbbrev})
            </h2>
            <p className="mt-1">Shot Type: {player.shotType}</p>
            <p className="mt-1">Result: {player.result}</p>
            {player.gameWinner && (
              <p className="mt-1 text-green-500 font-bold">Game Winner!</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shootout;
