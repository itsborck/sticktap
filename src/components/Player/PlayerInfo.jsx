import axios from "axios";
import { useEffect, useState } from "react";

const PlayerInfo = ({ playerId }) => {
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

  function ordinalSuffix(i) {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }

  function convertInchesToFeet(inches) {
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return { feet, inches: remainingInches };
  }

  return (
    <div className="flex items-center space-x-4 shadow-2xl">
      <img className="w-40 h-40 rounded-full" src={player.headshot} />
      <div>
        <p className="text-sm text-white">
          <strong>Height: </strong>
          {convertInchesToFeet(player.heightInInches).feet}&apos;
          {convertInchesToFeet(player.heightInInches).inches}&quot;
        </p>
        <p className="text-sm text-white">
          <strong>Weight:</strong> {player.weightInPounds} lbs
        </p>
        <p className="text-sm text-white">
          <strong>Born:</strong>{" "}
          {new Date(player.birthDate).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-sm text-white">
          <strong>Birthplace:</strong> {player.birthCity.default},
          {player.birthStateProvince
            ? ` ${player.birthStateProvince.default}, `
            : " "}
          {player.birthCountry}
        </p>
        <p className="text-sm text-white">
          {player.position === "G" ? (
            <strong>Catches:</strong>
          ) : (
            <strong>Shoots:</strong>
          )}{" "}
          {player.shootsCatches}
        </p>
        {player.draftDetails ? (
          <p className="text-sm text-white">
            <strong>Draft:</strong> {player.draftDetails.year},{" "}
            {player.draftDetails.teamAbbrev} (
            {ordinalSuffix(player.draftDetails.overallPick)} Overall),{" "}
            {ordinalSuffix(player.draftDetails.round)} Round,{" "}
            {ordinalSuffix(player.draftDetails.pickInRound)} Pick
          </p>
        ) : (
          <p className="text-sm text-white">
            <strong>Draft:</strong> Undrafted
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayerInfo;
