import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Banner from "./Banner";
import Betting from "./Betting";
import Boxscore from "./Boxscore";
import Info from "./GameInfo";
import Scoring from "./ScoringSummary";
import Shootout from "./Shootout";
import ThreeStars from "./ThreeStars";

const GameDetailsContainer = () => {
  const { gameId } = useParams();
  const [gamecenter, setGamecenter] = useState(null);
  const [odds, setOdds] = useState(null);

  const today = new Date();
  const [formattedDate, setFormattedDate] = useState(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}`
  );

  useEffect(() => {
    const fetchGamecenter = async () => {
      try {
        const response = await axios.get(
          "https://corsmirror.onrender.com/v1/cors?url=" +
            encodeURIComponent(
              `https://api-web.nhle.com/v1/gamecenter/${gameId}/boxscore`
            )
        );
        setGamecenter(response.data);
      } catch (error) {
        console.error("Error fetching gamecenter:", error);
      }
    };

    fetchGamecenter();
    const interval = setInterval(fetchGamecenter, 15000);

    return () => clearInterval(interval);
  }, [gameId]);

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const response = await axios.get(
          "https://corsmirror.onrender.com/v1/cors?url=" +
            encodeURIComponent(
              `https://api-web.nhle.com/v1/schedule/${formattedDate}`
            )
        );
        setOdds(response.data);
      } catch (error) {
        console.error("Error fetching odds:", error);
      }
    };

    fetchOdds();
    const interval = setInterval(fetchOdds, 15000);

    return () => clearInterval(interval);
  }, [formattedDate]);

  useEffect(() => {
    document.title = `${gamecenter?.awayTeam.name.default} vs. ${gamecenter?.homeTeam.name.default} | StickTap`;
  });

  function convertUTCToLocalTime(utcTime) {
    const date = new Date(utcTime);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "numeric" });
  }

  return (
    <>
      <Navbar />
      <div className="text-white flex flex-col">
        {gamecenter && (
          <>
            <Banner game={gamecenter} />
            <Betting gameId={gameId} odds={odds} />
            <Boxscore
              game={gamecenter}
              convertUTCToLocalTime={convertUTCToLocalTime}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Scoring gameId={gameId} />
                <Shootout gameId={gameId} />
              </div>
              <div>
                <ThreeStars gameId={gameId} />
              </div>
              <div>
                <Info
                  game={gamecenter}
                  convertUTCToLocalTime={convertUTCToLocalTime}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GameDetailsContainer;
