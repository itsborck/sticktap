import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container mx-auto my-8 text-center dark:bg-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to StickTap!</h1>
      <p className="text-lg mb-6">
        Explore the latest NHL games and information.
      </p>
      <Link
        to="/games"
        className="text-white bg-blue-500 dark:bg-gray-700 py-2 px-4 rounded-full inline-block hover:bg-blue-600 dark:hover:bg-gray-600 transition duration-300"
      >
        View Games Today
      </Link>
    </div>
  );
};

export default HomePage;
