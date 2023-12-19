import axios from "axios";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PinnedGames = () => {
  const [favoriteTeam, setFavoriteTeam] = useState(null);
  const [favoriteDetails, setFavoriteDetails] = useState({});
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

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
          setFavoriteTeam(doc.data().favoriteTeam)
        });

        return unsubscribeFirestore;
      } else {
        setIsUserSignedIn(false);
      }
    });

    return () => unsubscribe();
  }, []); 

  useEffect(() => {
    if (favoriteTeam) { // Only run if favoriteTeam is not null
      const fetchFavoriteDetails = async () => {
        try {
          const response = await axios.get(
            "https://corsmirror.onrender.com/v1/cors?url=" +
              encodeURIComponent(
                `https://api-web.nhle.com/v1/club-schedule/${favoriteTeam}/week/now`
              )
          );
          setFavoriteDetails(response.data);
        } catch (error) {
          console.error("Error fetching game details: ", error);
        }
      };
  
      fetchFavoriteDetails();
    }
  }, [favoriteTeam]);

  return (
    <>
      {favoriteDetails.games && favoriteDetails.games.length > 0 ? (
        favoriteDetails.games.map((game, index) => (
        <Link key={index} to={`/game/${game.id}`}>
          <div
            key={index}
            className={`bg-gray-700 text-white p-2 rounded-lg shadow-md hover:bg-gray-600 transiton duration-300 ${
              game.specialEvent
                ? game.gameState === "FINAL" || game.gameState === "OFF"
                  ? "border-2 border-green-500"
                  : "border-2 border-yellow-500"
                : game.gameState === "CRIT"
                ? "border-2 border-red-500 animate-flash"
                : game.gameState === "LIVE"
                ? "border-2 border-blue-500"
                : game.gameState === "FINAL" || game.gameState === "OFF"
                ? "border-2 border-green-500"
                : game.gameState === "PRE" || game.gameState === "FUT"
                ? "border-2 border-gray-500"
                : ""
            }`}
          >
            <div className="flex justify-center items-center text-center">
              <span className="flex flex-col text-xl items-center justify-center">
                {game.gameState === "FUT" || game.gameState === "PRE" ? (
                  <>
                  {game.specialEventLogo ? (
                    <span className="flex flex-row">
                      <span className="mt-6 mr-2 font-bold">
                        {game.awayTeam.abbrev}
                      </span>
                      <img src={game.specialEventLogo} />
                      <span className="mt-6 ml-2 font-bold">
                        {game.homeTeam.abbrev}
                      </span>
                    </span>
                  ) : (
                    <span className="flex flex-row">
                      <span className="mt-2 font-bold">
                        {game.awayTeam.abbrev}
                      </span>
                      <img
                        src={game.awayTeam.logo}
                        alt={game.awayTeam.placeName.default}
                        className="w-16 mb-5 mr-7"
                      />
                      <span className="font-bold mt-2">@</span>
                      <img
                        src={game.homeTeam.logo}
                        alt={game.homeTeam.placeName.default}
                        className="w-16 mb-5 ml-7"
                      />
                      <span className="mt-2 font-bold">
                        {game.homeTeam.abbrev}
                      </span>
                    </span>
                  )}
                  <p className="text-sm">{new Date(game.startTimeUTC).toLocaleDateString()}</p>
                  </>
                ) : game.gameState === "LIVE" ||
                  game.gameState === "CRIT" ||
                  game.gameState === "FINAL" ||
                  game.gameState === "OFF" ? (
                  <span className="flex flex-row">
                    <span className="mt-2 font-bold">
                      {game.awayTeam.abbrev}
                    </span>
                    <img
                      src={game.awayTeam.logo}
                      alt={game.awayTeam.placeName.default}
                      className="w-16 mb-5 mr-7"
                    />
                    <span className="font-bold flex justify-between mt-2">
                      {game.awayTeam.score} - {game.homeTeam.score}
                    </span>
                    <img
                      src={game.homeTeam.logo}
                      alt={game.homeTeam.placeName.default}
                      className="w-16 mb-5 ml-7"
                    />
                    <span className="mt-2 font-bold">
                      {game.homeTeam.abbrev}
                    </span>
                  </span>
                ) : null}
                <div className="text-sm text-center">
                  {game.gameState === "LIVE" || game.gameState === "CRIT" ? (
                    <>
                    <div className="p-2"/>
                      <p>
                        {game.periodDescriptor.number === 4 ? (
                          `OT - ${
                            favoriteDetails && favoriteDetails.clock
                              ? favoriteDetails.clock.timeRemaining
                              : null
                          }`
                        ) : game.periodDescriptor.number === 5 ? (
                          "SO"
                        ) : favoriteDetails &&
                          favoriteDetails.clock &&
                          favoriteDetails.clock.inIntermission === true ? (
                          game.periodDescriptor.number === 1 ? (
                            <p>
                              1st Intermission -{" "}
                              {favoriteDetails.clock.timeRemaining}
                            </p>
                          ) : game.periodDescriptor.number === 2 ? (
                            <p>
                              2nd Intermission -{" "}
                              {favoriteDetails.clock.timeRemaining}
                            </p>
                          ) : null
                        ) : (
                          `Period ${game.periodDescriptor.number} - ${
                            favoriteDetails && favoriteDetails.clock
                              ? favoriteDetails.clock.timeRemaining
                              : null
                          }`
                        )}
                      </p>
                    </>
                  ) : game.gameState === "FINAL" || game.gameState === "OFF" ? (
                    <>
                    <div className="p-2"/>
                      <p>
                        {game.gameOutcome.lastPeriodType === "OT"
                          ? "Final/OT"
                          : game.gameOutcome.lastPeriodType === "SO"
                          ? "Final/SO"
                          : "Final"}
                      </p>
                    </>
                  ) : (
                    <div className="text-xs">
                      <p>
                        Start Time: {convertUTCToLocalTime(game.startTimeUTC)}
                      </p>
                    </div>
                  )}
                </div>
              </span>
            </div>
          </div>
        </Link>
      ))
      ) : (
        <p>{isUserSignedIn ? "No Favorite Team Selected. Pick Your Favorite Team in User Settings!" : "No Favorite Team Selected. Sign In to Pick Your Favorite Team!"}</p>
      )}
    </>
  );
};

export default PinnedGames;
