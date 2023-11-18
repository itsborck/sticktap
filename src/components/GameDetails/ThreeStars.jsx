import axios from "axios";
import { useEffect, useState } from "react";

const ThreeStars = ({ gameId }) => {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await axios.get(
          "https://corsmirror.onrender.com/v1/cors?url=" +
            encodeURIComponent(
              `https://api-web.nhle.com/v1/gamecenter/${gameId}/landing`
            )
        );
        setStars(response.data.summary.threeStars);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchStars();
    const interval = setInterval(fetchStars, 15000);

    return () => clearInterval(interval);
  }, [gameId]);

  return stars && stars.length > 0 ? (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-2">Three Stars</h2>
      {stars.map((star, index) => (
        <div
          key={index}
          className="flex flex-row max-w-sm rounded overflow-hidden shadow-lg m-4"
        >
          <img
            className="w-1/3 object-cover rounded-full"
            src={star.headshot}
            alt={star.name}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              Star {star.star}: {star.name}
            </div>
            <p className="text-base text-gray-300">Team: {star.teamAbbrev}</p>
            <p className="text-base text-gray-300">Position: {star.position}</p>
            {star.position === 'G' ? (
              <>
                <p className="text-base text-gray-300">GAA: {star.goalsAgainstAverage}</p>
                <p className="text-base text-gray-300">SV%: {star.savePctg}</p>
              </>
            ) : (
              <p className="text-base text-gray-300">Points: {star.points}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export default ThreeStars;
