import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayerHeader from "./Header";
import PlayerInfo from "./PlayerInfo";
import Navbar from "../Navbar";

const PlayerPage = () => {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);

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
      } catch (error) {
        console.error("Error fetching player:", error);
      }
    };

    fetchPlayer();
  }, [playerId]);

  useEffect(() => {
    document.title = `${player?.firstName.default} ${player?.lastName.default} | StickTap`;
  });

  return (
    <>
      <Navbar />
      <PlayerHeader playerId={playerId} />
      <PlayerInfo playerId={playerId} />
    </>
  );
};

export default PlayerPage;