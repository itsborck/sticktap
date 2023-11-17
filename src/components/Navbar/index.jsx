import { Link } from "react-router-dom";
import { FaUser, FaCalendar, FaTrophy } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand */}
        <Link to="/" className="text-white text-lg font-bold">
          StickTap
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 flex items-center">
          <Link to="/schedule" className="text-white flex">
            <FaCalendar className="mr-2"/> Schedule
          </Link>
          <Link to="/standings" className="text-white flex">
            <FaTrophy className="mr-2"/> Standings
          </Link>
          {/* <Link to="/account" className="text-white">
            <FaUser />
          </Link> */}
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
