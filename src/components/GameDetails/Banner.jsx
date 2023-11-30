import axios from "axios";
import { useEffect, useState } from "react";
import BackButton from "./BackButton";

const Banner = ({ game }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [standings, setStandings] = useState([]);

  const today = new Date(game.gameDate);
  const formattedDate = today.toISOString().split("T")[0];
  console.log(formattedDate);

  const awayTeamStanding = standings.find(
    (standing) => standing.teamAbbrev.default === game.awayTeam.abbrev
  );
  const homeTeamStanding = standings.find(
    (standing) => standing.teamAbbrev.default === game.homeTeam.abbrev
  );

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get(
          "https://corsmirror.onrender.com/v1/cors?url=" +
            encodeURIComponent(
              `https://api-web.nhle.com/v1/standings/${formattedDate}`
            )
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

  function calculateWinProbability(standings) {
    if (!standings) return null;

    const winPctg = standings.winPctg;
    const goalDiff = standings.goalDifferential / 100;
    const recentForm = standings.l10Wins / 10;
    const points = standings.points / 100;
    const goalsFor = standings.goalFor / 100;
    const goalsAgainst = standings.goalAgainst / 100;
    const homeWins = standings.homeWins / 10;
    const roadWins = standings.roadWins / 10;
    const regPlusOtWins = standings.regulationPlusOtWins / 10;
    const streakCount = standings.streakCount / 10;

    const winProbability = (winPctg + goalDiff + recentForm + points + goalsFor - goalsAgainst + homeWins + roadWins + regPlusOtWins + streakCount) / 10;

    return winProbability;
  }

  const rawAwayTeamWinProbability = calculateWinProbability(awayTeamStanding);
  const rawHomeTeamWinProbability = calculateWinProbability(homeTeamStanding);

  const totalRawWinProbability = rawAwayTeamWinProbability + rawHomeTeamWinProbability;

  const awayTeamWinProbability = rawAwayTeamWinProbability / totalRawWinProbability;
  const homeTeamWinProbability = rawHomeTeamWinProbability / totalRawWinProbability;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-gray-900 py-8 text-white mb-8 relative overflow-hidden">
      <div style={{ zIndex: 1, position: "relative" }}>
        <BackButton />
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50" />
      <div className="relative flex flex-col items-center container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img
              src={game.awayTeam.logo}
              alt={game.awayTeam.name.default}
              className="w-24 h-24 ml-4"
            />
            <div className="flex flex-col">
              {!isMobile && (
                <>
                  <p className="text-2xl font-bold ml-8">
                    {game.awayTeam.name.default}
                  </p>
                  {awayTeamStanding && (
                    <>
                      <p className="text-xs ml-8 text-center">
                        ({awayTeamStanding.wins}-{awayTeamStanding.losses}-
                        {awayTeamStanding.otLosses})
                      </p>
                      {/* <p>
                        Win Probability:{" "}
                        {(awayTeamWinProbability * 100).toFixed()}%
                      </p> */}
                    </>
                  )}
                  <p className="text-xs ml-8 text-center">
                    {game.awayTeam.sog ? "SOG: " + game.awayTeam.sog : null}
                  </p>
                </>
              )}
            </div>
            <div className="flex flex-col text-sm text-center">
              <p className="text-4xl text-center font-bold mx-8">
                {game.awayTeam.score} - {game.homeTeam.score}
              </p>
              {game.gameState === "LIVE" || game.gameState === "CRIT" ? (
                <div>
                  {game.clock.inIntermission === true ? (
                    game.period === 1 ? (
                      <p>1st Intermission - {game.clock.timeRemaining}</p>
                    ) : game.period === 2 ? (
                      <p>2nd Intermission - {game.clock.timeRemaining}</p>
                    ) : null
                  ) : (
                    <p>
                      {game.period === 4 ? (
                        <p>OT - {game.clock.timeRemaining}</p>
                      ) : game.period === 5 ? (
                        <p>SO</p>
                      ) : (
                        `Period ${game.period} - ${game.clock.timeRemaining}`
                      )}
                    </p>
                  )}
                </div>
              ) : game.gameState === "FINAL" || game.gameState === "OFF" ? (
                <p>
                  {game.gameOutcome.lastPeriodType === "OT"
                    ? "Final/OT"
                    : game.gameOutcome.lastPeriodType === "SO"
                    ? "Final/SO"
                    : "Final"}
                </p>
              ) : null}
            </div>
            <div className="flex items-center">
              <div className="flex flex-col">
                {!isMobile && (
                  <>
                    <p className="text-2xl font-bold ml-8">
                      {game.homeTeam.name.default}
                    </p>
                    {homeTeamStanding && (
                      <>
                        <p className="text-xs ml-8 text-center">
                          ({homeTeamStanding.wins}-{homeTeamStanding.losses}-
                          {homeTeamStanding.otLosses})
                        </p>
                        {/* <p>
                          Win Probability: {(homeTeamWinProbability * 100).toFixed()}%
                        </p> */}
                      </>
                    )}
                    <p className="text-xs ml-8 text-center">
                      {game.homeTeam.sog ? "SOG: " + game.homeTeam.sog : null}
                    </p>
                  </>
                )}
              </div>
              <img
                src={game.homeTeam.logo}
                alt={game.homeTeam.name.default}
                className="w-24 h-24 mr-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
