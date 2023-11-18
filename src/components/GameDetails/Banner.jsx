import { useEffect, useState } from "react";

const Banner = ({ game }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50" />
      <div className="relative flex flex-col items-center container mx-auto">
        <div className="flex items-center mb-4">
          <img
            src={game.awayTeam.logo}
            alt={game.awayTeam.name.default}
            className="w-12 h-12 mr-4"
          />
          <div className="flex flex-col">
            {!isMobile && (
              <>
                <p className="text-2xl font-bold mr-8">
                  {game.awayTeam.name.default}
                </p>
                <p className="text-xs mr-8 text-left">
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
                    Period {game.period} - {game.clock.timeRemaining}
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
          <div className="flex flex-col">
            {!isMobile && (
              <>
                <p className="text-2xl font-bold ml-8">
                  {game.homeTeam.name.default}
                </p>
                <p className="text-xs ml-8 text-right">
                  {game.awayTeam.sog ? "SOG: " + game.awayTeam.sog : null}
                </p>
              </>
            )}
          </div>
          <img
            src={game.homeTeam.logo}
            alt={game.homeTeam.name.default}
            className="w-12 h-12 ml-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
