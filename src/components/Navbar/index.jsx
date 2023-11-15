import { Link, Route, Routes } from "react-router-dom"; // Assuming you are using React Router for navigation
import Standings from "../Standings";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand */}
        <Link to="/" className="text-white text-lg font-bold">
          StickTap
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link to="/schedule" className="text-white">
            Schedule
          </Link>
          <Link to="/standings" className="text-white">
            Standings
          </Link>
          {/* Add more links as needed */}
        </div>
        <Routes>
          <Route path="/standings/*" element={<Standings />} />
        </Routes>
      </div>
    </nav>
  );
};

export default Navbar;
