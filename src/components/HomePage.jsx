import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to StickTap!</h1>
      <p>Explore the latest NHL games and information.</p>
      <Link to="/games">
        <button>View Games Today</button>
      </Link>
    </div>
  );
};

export default HomePage;
