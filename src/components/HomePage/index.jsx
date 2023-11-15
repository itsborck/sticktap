import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 text-center dark:bg-gray-800 dark:text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to StickTap!</h1>
        <p className="text-lg mb-6">
          Explore the latest NHL games and stay up-to-date with live scores,
          schedules, and more.
        </p>
        <p className="text-md mb-6">
          StickTap brings you real-time information about your favorite hockey
          teams and matches. Discover detailed game statistics, team details,
          and enjoy listening to live radio broadcasts.
        </p>
        <Link
          to="/schedule"
          className="text-white bg-blue-500 dark:bg-gray-700 py-2 px-4 rounded inline-block hover:bg-blue-600 dark:hover:bg-gray-600 transition duration-300"
        >
          Tap In!
        </Link>
      </div>
    </>
  );
};

export default HomePage;
