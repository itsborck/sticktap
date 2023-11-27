import axios from "axios";
import { useEffect, useState } from "react";
import BackButton from "./BackButton";

const PlayerHeader = ({ playerId }) => {
  const [player, setPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(
          "https://corsmirror.onrender.com/v1/cors?url=" +
            encodeURIComponent(
              `https://api-web.nhle.com/v1/player/${playerId}/landing`
            )
        );
        setPlayer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching player:", error);
      }
    };

    fetchPlayer();
  }, [playerId]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="bg-gray-900 py-8 text-white relative overflow-hidden">
        <span className="flex flex-row">
          <div>
            <span className="text-2xl ml-10 px-2 border-r-2 border-gray-800">
              {player.firstName.default} {player.lastName.default}
            </span>
          </div>
          <div>
            <img
              className="h-8 border-r-2 px-2 border-gray-800"
              src={player.teamLogo}
              alt={player.teamTriCode}
            />
          </div>
          <div>
            <span className="text-2xl px-2 border-r-2 border-gray-800">
              #{player.sweaterNumber}
            </span>
          </div>
          <div>
            <span className="text-2xl px-2">{player.position}</span>
          </div>
        </span>
      </div>
      <div style={{ zIndex: 1, position: 'relative' }}>
        <BackButton />
        <img
          className="flex w-full overflow-hidden object-cover object-top h-96"
          src={player.heroImage}
          alt={player.lastName.default}
        />
      </div>
    </>
  );
};

export default PlayerHeader;
