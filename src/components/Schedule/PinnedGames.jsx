import axios from "axios";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../index.css";

const PinnedGames = ({ formattedDate }) => {
  const [favoriteTeam, setFavoriteTeam] = useState(null);
  const [favoriteDetails, setFavoriteDetails] = useState({});
  const [gameDetails, setGameDetails] = useState({});
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [standings, setStandings] = useState([]);
  const [awayTeamWinProbability, setAwayTeamWinProbability] = useState(0);
  const [homeTeamWinProbability, setHomeTeamWinProbability] = useState(0);
  const previousDetailsRef = useRef();

  function convertUTCToLocalTime(utcTime) {
    const date = new Date(utcTime);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "numeric" });
  }

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setIsUserSignedIn(true);
        const db = getFirestore();
        const userRef = doc(db, "users", user.uid);
        const unsubscribeFirestore = onSnapshot(userRef, (doc) => {
          setFavoriteTeam(doc.data().favoriteTeam);
        });

        return unsubscribeFirestore;
      } else {
        setIsUserSignedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (favoriteTeam) {
      // Only run if favoriteTeam is not null
      const fetchFavoriteDetails = async () => {
        try {
          const response = await axios.get(
            "https://corsmirror.onrender.com/v1/cors?url=" +
              encodeURIComponent(
                `https://api-web.nhle.com/v1/club-schedule/${favoriteTeam}/week/now`
              )
          );
          const newDetails = response.data;

          // Only update the state if the new data is different
          if (
            JSON.stringify(newDetails) !==
            JSON.stringify(previousDetailsRef.current)
          ) {
            setFavoriteDetails(newDetails);
            previousDetailsRef.current = newDetails;
          }
        } catch (error) {
          console.error("Error fetching game details: ", error);
        }
      };

      fetchFavoriteDetails();
      const interval = setInterval(fetchFavoriteDetails, 15000);

      return () => clearInterval(interval);
    }
  }, [favoriteTeam]);

  useEffect(() => {
    let interval;

    const fetchGameDetails = async (gameId) => {
      try {
        const response = await axios.get(
          "https://corsmirror.onrender.com/v1/cors?url=" +
            encodeURIComponent(
              `https://api-web.nhle.com/v1/gamecenter/${gameId}/landing`
            )
        );
        return { gameId, data: response.data };
      } catch (error) {
        console.error("Error fetching game details: ", error);
      }
    };

    if (favoriteDetails && favoriteDetails.games) {
      Promise.all(
        favoriteDetails.games.map((game) => fetchGameDetails(game.id))
      ).then((details) => {
        const newGameDetails = {};
        details.forEach(({ gameId, data }) => {
          // destructuring gameId and data from each detail
          newGameDetails[gameId] = data;
        });
        setGameDetails(newGameDetails);
      });

      interval = setInterval(() => {
        Promise.all(
          favoriteDetails.games.map((game) => fetchGameDetails(game.id))
        ).then((details) => {
          const newGameDetails = {};
          details.forEach(({ gameId, data }) => {
            // destructuring gameId and data from each detail
            newGameDetails[gameId] = data;
          });
          setGameDetails(newGameDetails);
        });
      }, 15000);
    }

    return () => clearInterval(interval);
  }, [favoriteDetails]);

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

  const awayTeamStandings = [];
  const homeTeamStandings = [];

  if (favoriteDetails.games) {
    favoriteDetails.games &&
      favoriteDetails.games.map((game) => {
        let awayAbbrev = game.awayTeam.abbrev;
        let homeAbbrev = game.homeTeam.abbrev;

        const awayTeamStanding = standings.find(
          (standing) => standing.teamAbbrev.default === awayAbbrev
        );
        const homeTeamStanding = standings.find(
          (standing) => standing.teamAbbrev.default === homeAbbrev
        );

        awayTeamStandings.push(awayTeamStanding);
        homeTeamStandings.push(homeTeamStanding);
      });
  }

  function calculateWinProbability(standing) {
    if (!standing) return null;

    const winPctg = standing.winPctg;
    const goalsForPctg = standing.goalsForPctg;
    const goalDiff = standing.goalDifferential / 100;
    const recentForm = standing.l10Wins / 10;
    const points = standing.points / 100;
    const goalsFor = standing.goalFor / 100;
    const goalsAgainst = standing.goalAgainst / 100;
    const homeWins = standing.homeWins / 10;
    const roadWins = standing.roadWins / 10;
    const regPlusOtWins = standing.regulationPlusOtWins / 10;
    const streakCount = standing.streakCount / 10;

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

    if (standing.streakCode === "W" && standing.streakCount >= 3) {
      winProbability += 0.5;
    } else if (standing.streakCode === "L") {
      winProbability -= 0.3; // adjust this value as per your requirements
    } else if (standing.streakCode === "OT") {
      winProbability -= 0.1; // adjust this value as per your requirements
    }

    winProbability /= denominator;

    return winProbability;
  }

  let awayTeamWinProbabilities = [];
  awayTeamStandings.forEach((standing) => {
    const rawAwayTeamWinProbability = calculateWinProbability(standing);
    awayTeamWinProbabilities.push(rawAwayTeamWinProbability);
  });

  let homeTeamWinProbabilities = [];
  homeTeamStandings.forEach((standing) => {
    const rawHomeTeamWinProbability = calculateWinProbability(standing);
    homeTeamWinProbabilities.push(rawHomeTeamWinProbability);
  });

  useEffect(() => {
    let awayTeamWins = [];
    let homeTeamWins = [];

    awayTeamStandings.forEach((standing) => {
      const rawAwayTeamWinProbability = calculateWinProbability(standing);
      awayTeamWins.push(rawAwayTeamWinProbability);
    });

    homeTeamStandings.forEach((standing) => {
      const rawHomeTeamWinProbability = calculateWinProbability(standing);
      homeTeamWins.push(rawHomeTeamWinProbability);
    });

    awayTeamWins.forEach((awayTeamWin, index) => {
      const totalRawWinProbability = awayTeamWin + homeTeamWins[index];

      const calculatedAwayTeamWinProbability =
        awayTeamWin / totalRawWinProbability;
      const calculatedHomeTeamWinProbability =
        homeTeamWins[index] / totalRawWinProbability;

      setAwayTeamWinProbability(calculatedAwayTeamWinProbability);
      setHomeTeamWinProbability(calculatedHomeTeamWinProbability);
    });
  }, [awayTeamStandings, homeTeamStandings]);

  return (
    <>
      {favoriteDetails.games && favoriteDetails.games.length > 0 ? (
        favoriteDetails.games.map((game, index) => {
          if (!awayTeamStandings || !homeTeamStandings) {
            return null; // or some loading state
          }

          let awayTeamStanding = awayTeamStandings.find(
            (standing) => standing && standing.teamAbbrev && standing.teamAbbrev.default === game.awayTeam.abbrev
          );
          let homeTeamStanding = homeTeamStandings.find(
            (standing) => standing && standing.teamAbbrev && standing.teamAbbrev.default === game.homeTeam.abbrev
          );

          return (
            <Link key={index} to={`/game/${game.id}`} className="text-gray-200 hover:text-white slide-up">
              <div
                key={index}
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
                            game.gameState === "OFF" ? (
                              <p className="text-xs">
                                SOG:{" "}
                                {gameDetails[game.id] &&
                                  gameDetails[game.id].awayTeam &&
                                  gameDetails[game.id].awayTeam.sog}
                              </p>
                            ) : (
                              <p className="text-xs">
                                ({awayTeamStanding.wins}-
                                {awayTeamStanding.losses}-
                                {awayTeamStanding.otLosses})
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    {game.gameState === "LIVE" ||
                    game.gameState === "CRIT" ||
                    game.gameState === "FINAL" ||
                    game.gameState === "OFF" ? (
                      <span className="font-bold text-2xl text-gray-200 mr-8">
                        {game.awayTeam.score}
                      </span>
                    ) : null}
                    {/* {game.gameState === "PRE" || game.gameState === "FUT" ? (
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
                    ) : null} */}
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
                            game.gameState === "OFF" ? (
                              <p className="text-xs">
                                SOG:{" "}
                                {gameDetails[game.id] &&
                                  gameDetails[game.id].homeTeam &&
                                  gameDetails[game.id].homeTeam.sog}
                              </p>
                            ) : (
                              <p className="text-xs">
                                ({homeTeamStanding.wins}-
                                {homeTeamStanding.losses}-
                                {homeTeamStanding.otLosses})
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    {game.gameState === "LIVE" ||
                    game.gameState === "CRIT" ||
                    game.gameState === "FINAL" ||
                    game.gameState === "OFF" ? (
                      <span className="font-bold text-2xl text-gray-200 mr-8">
                        {game.homeTeam.score}
                      </span>
                    ) : null}
                    {/* {game.gameState === "PRE" || game.gameState === "FUT" ? (
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
                    ) : null} */}
                  </div>
                </div>
                <div className="text-md text-center">
                  {game.gameState === "LIVE" || game.gameState === "CRIT" ? (
                    <p>
                      {game.periodDescriptor.number === 4 ? (
                        `OT - ${
                          gameDetails[game.id] && gameDetails[game.id].clock
                            ? gameDetails[game.id].clock.timeRemaining
                            : null
                        }`
                      ) : game.periodDescriptor.number === 5 ? (
                        "SO"
                      ) : gameDetails[game.id] &&
                        gameDetails[game.id].clock &&
                        gameDetails[game.id].clock.inIntermission === true ? (
                        game.periodDescriptor.number === 1 ? (
                          <p>
                            1st Intermission -{" "}
                            {gameDetails[game.id].clock.timeRemaining}
                          </p>
                        ) : game.periodDescriptor.number === 2 ? (
                          <p>
                            2nd Intermission -{" "}
                            {gameDetails[game.id].clock.timeRemaining}
                          </p>
                        ) : null
                      ) : (
                        `Period ${game.periodDescriptor.number} - ${
                          gameDetails[game.id] && gameDetails[game.id].clock
                            ? gameDetails[game.id].clock.timeRemaining
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
                      <p>
                        {new Date(game.startTimeUTC).toLocaleString("default", {
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        - {convertUTCToLocalTime(game.startTimeUTC)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })
      ) : favoriteTeam ? (
        <p>No Upcoming Games</p>
      ) : (
        <p>
          {isUserSignedIn
            ? "No Favorite Team Selected. Pick Your Favorite Team in User Settings!"
            : "No Favorite Team Selected. Sign In to Pick Your Favorite Team!"}
        </p>
      )}
    </>
  );
};

export default PinnedGames;
