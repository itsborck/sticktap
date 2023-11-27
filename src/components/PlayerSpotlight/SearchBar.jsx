import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [playerName, setPlayerName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchTimeout = useRef(null);

  const handleSearch = async () => {
    if (playerName.trim() === "") {
      setSearchResults([]);
    } else {
      const response = await axios.get(
        "https://corsmirror.onrender.com/v1/cors?url=" +
          encodeURIComponent(
            `https://search.d3.nhle.com/api/v1/search/player?culture=en-us&limit=20&q=${playerName}&active=true`
          )
      );
      setSearchResults(response.data);
    }
  };

  const debounceSearch = (fn, delay) => {
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      fn();
    }, delay);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center">
        <input
          type="search"
          value={playerName}
          onChange={(e) => {
            setPlayerName(e.target.value);
            if (e.target.value.trim() === "") {
              setSearchResults([]);
            } else {
              debounceSearch(handleSearch, 100);
            }
          }}
          placeholder="Search Players"
          className="border-2 border-gray-300 px-2 w-96 bg-white h-10 mt-5 rounded-lg text-sm focus:outline-none"
        />
      </div>
      <div className="flex flex-col items-center">
        {searchResults.length > 0 && (
          <div className="absolute w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-auto max-h-60">
            {searchResults.map((result, index) => (
              <Link
                to={`/player/${result.playerId}`}
                key={index}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {result.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
