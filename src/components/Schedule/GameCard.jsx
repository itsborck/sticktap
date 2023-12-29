import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../index.css";

const GameCard = ({ game, formattedDate }) => {
  const [gameDetails, setGameDetails] = useState({});
  const [standings, setStandings] = useState([]);

  function convertUTCToLocalTime(utcTime) {
    const date = new Date(utcTime);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "numeric" });
  }

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          "https://corsmirror.onrender.com/v1/cors?url=" +
            encodeURIComponent(
              `https://api-web.nhle.com/v1/gamecenter/${game.id}/landing`
            )
        );
        setGameDetails(response.data);
      } catch (error) {
        console.error("Error fetching game details: ", error);
      }
    };

    fetchGameDetails();
    const interval = setInterval(fetchGameDetails, 15000);

    return () => clearInterval(interval);
  }, [game.id]);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get(
          "https://corsmirror.onrender.com/v1/cors?url=" +
            encodeURIComponent(`https://api-web.nhle.com/v1/standings/now`)
        );
        setStandings(response.data.standings);
      } catch (error) {
        console.error("Error fetching standings:", error);
      }
    };

    fetchStandings();
    const interval = setInterval(fetchStandings, 15000);

    return () => clearInterval(interval);
  }, [formattedDate]);

  const awayTeamStanding = standings.find(
    (standing) => standing.teamAbbrev.default === game.awayTeam.abbrev
  );
  const homeTeamStanding = standings.find(
    (standing) => standing.teamAbbrev.default === game.homeTeam.abbrev
  );

  function calculateWinProbability(standings) {
    if (!standings) return null;

    const winPctg = standings.winPctg;
    const goalsForPctg = standings.goalsForPctg;
    const goalDiff = standings.goalDifferential / 100;
    const recentForm = standings.l10Wins / 10;
    const points = standings.points / 100;
    const goalsFor = standings.goalFor / 100;
    const goalsAgainst = standings.goalAgainst / 100;
    const homeWins = standings.homeWins / 10;
    const roadWins = standings.roadWins / 10;
    const regPlusOtWins = standings.regulationPlusOtWins / 10;
    const streakCount = standings.streakCount / 10;

    let denominator = 10;
    let winProbability =
      winPctg +
      goalDiff +
      recentForm +
      points +
      goalsFor -
      goalsAgainst +
      homeWins +
      roadWins +
      regPlusOtWins +
      streakCount +
      goalsForPctg;

    if (standings.streakCode === "W" && standings.streakCount >= 3) {
      winProbability += 0.5;
    } else if (standings.streakCode === "L") {
      winProbability -= 0.3; // adjust this value as per your requirements
    } else if (standings.streakCode === "OT") {
      winProbability -= 0.1; // adjust this value as per your requirements
    }

    winProbability /= denominator;

    return winProbability;
  }

  const rawAwayTeamWinProbability = calculateWinProbability(awayTeamStanding);
  const rawHomeTeamWinProbability = calculateWinProbability(homeTeamStanding);

  const totalRawWinProbability =
    rawAwayTeamWinProbability + rawHomeTeamWinProbability;

  const awayTeamWinProbability =
    rawAwayTeamWinProbability / totalRawWinProbability;
  const homeTeamWinProbability =
    rawHomeTeamWinProbability / totalRawWinProbability;

  return (
    <Link
      to={`/game/${game.id}`}
      className="text-gray-200 hover:text-white slide-up"
    >
      <div
        className={`bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-700 transition duration-300 ${
          game.specialEvent
            ? game.gameState === "FINAL" || game.gameState === "OFF"
              ? "border-green-500 border-2"
              : "border-yellow-500 border-2"
            : game.gameState === "CRIT"
            ? "border-red-500 border-2 animate-flash"
            : game.gameState === "LIVE"
            ? "border-blue-500 border-2"
            : game.gameState === "FINAL" || game.gameState === "OFF"
            ? "border-green-500 border-2"
            : game.gameState === "PRE" || game.gameState === "FUT"
            ? "border-gray-500 border-2"
            : ""
        }`}
      >
        <div className="flex flex-col justify-start items-start text-left mt-1">
          <div className="flex justify-between items-center w-full mb-4">
            <div className="flex items-center">
              <img
                src={game.awayTeam.logo}
                alt={game.awayTeam.placeName.default}
                className="w-16 mr-2"
              />
              <div>
                {awayTeamStanding && (
                  <>
                    <span className="font-bold text-xl text-gray-200">
                      {awayTeamStanding.teamCommonName.default}
                    </span>
                    {game.gameState === "FINAL" ||
                    game.gameState === "LIVE" ||
                    game.gameState === "CRIT" ||
                    game.gameState === "OFF" ? (
                      <p className="text-xs">
                        SOG:{" "}
                        {gameDetails &&
                          gameDetails.awayTeam &&
                          gameDetails.awayTeam.sog}
                      </p>
                    ) : (
                      <p className="text-xs">
                        ({awayTeamStanding.wins}-{awayTeamStanding.losses}-
                        {awayTeamStanding.otLosses})
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
            {game.gameState === "PRE" || game.gameState === "FUT" ? (
              awayTeamStanding && (
                <span
                  className={`font-bold text-2xl mr-8 ${
                    awayTeamWinProbability > homeTeamWinProbability
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {(awayTeamWinProbability * 100).toFixed(1)}%
                </span>
              )
            ) : game.gameState === "LIVE" ||
              game.gameState === "CRIT" ||
              game.gameState === "FINAL" ||
              game.gameState === "OFF" ? (
              <span className="font-bold text-2xl text-gray-200 mr-8">
                {game.awayTeam.score}
              </span>
            ) : null}
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <img
                src={game.homeTeam.logo}
                alt={game.homeTeam.placeName.default}
                className="w-16 mr-2"
              />
              <div>
                {homeTeamStanding && (
                  <>
                    <span className="font-bold text-xl text-gray-200">
                      {homeTeamStanding.teamCommonName.default}
                    </span>
                    {game.gameState === "FINAL" ||
                    game.gameState === "LIVE" ||
                    game.gameState === "CRIT" ||
                    game.gameState === "OFF" ? (
                      <p className="text-xs">
                        SOG:{" "}
                        {gameDetails &&
                          gameDetails.homeTeam &&
                          gameDetails.homeTeam.sog}
                      </p>
                    ) : (
                      <p className="text-xs">
                        ({homeTeamStanding.wins}-{homeTeamStanding.losses}-
                        {homeTeamStanding.otLosses})
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
            {game.gameState === "PRE" || game.gameState === "FUT" ? (
              homeTeamStanding && (
                <span
                  className={`font-bold text-2xl mr-8 ${
                    homeTeamWinProbability > awayTeamWinProbability
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {(homeTeamWinProbability * 100).toFixed(1)}%
                </span>
              )
            ) : game.gameState === "LIVE" ||
              game.gameState === "CRIT" ||
              game.gameState === "FINAL" ||
              game.gameState === "OFF" ? (
              <span className="font-bold text-2xl text-gray-200 mr-8">
                {game.homeTeam.score}
              </span>
            ) : null}
          </div>
        </div>
        <div className="text-md text-center">
          {game.gameState === "LIVE" || game.gameState === "CRIT" ? (
            <p>
              {game.periodDescriptor.number === 4 ? (
                `OT - ${
                  gameDetails && gameDetails.clock
                    ? gameDetails.clock.timeRemaining
                    : null
                }`
              ) : game.periodDescriptor.number === 5 ? (
                "SO"
              ) : gameDetails &&
                gameDetails.clock &&
                gameDetails.clock.inIntermission === true ? (
                game.periodDescriptor.number === 1 ? (
                  <p>1st Intermission - {gameDetails.clock.timeRemaining}</p>
                ) : game.periodDescriptor.number === 2 ? (
                  <p>2nd Intermission - {gameDetails.clock.timeRemaining}</p>
                ) : null
              ) : (
                `Period ${game.periodDescriptor.number} - ${
                  gameDetails && gameDetails.clock
                    ? gameDetails.clock.timeRemaining
                    : null
                }`
              )}
            </p>
          ) : game.gameState === "FINAL" || game.gameState === "OFF" ? (
            <p>
              {game.gameOutcome.lastPeriodType === "OT"
                ? "Final/OT"
                : game.gameOutcome.lastPeriodType === "SO"
                ? "Final/SO"
                : "Final"}
            </p>
          ) : (
            <div>
              <p>{convertUTCToLocalTime(game.startTimeUTC)}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
