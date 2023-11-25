import { useState } from "react";
import {
  FaBars,
  FaCalendar,
  FaPeopleGroup,
  FaTrophy,
  FaUser,
  FaX,
} from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-white text-lg font-bold flex">
          <img src="/logo_white.png" className="mr-2 w-8" />
          StickTap
        </span>

        {isMobile ? (
          <>
            <FaBars
              className="text-white cursor-pointer"
              onClick={toggleMenu}
            />
            {isOpen ? (
              <div className="absolute top-0 left-0 w-full h-full bg-blue-500 flex flex-col p-5 pt-20 space-y-3 transition-transform ease-in-out duration-300 transform translate-x-0 z-10">
                <FaX
                  className="text-white cursor-pointer absolute top-0 right-0 m-5"
                  onClick={toggleMenu}
                />
                <Link to="/" className="text-white inline" onClick={toggleMenu}>
                  <FaCalendar className="mr-2" /> Schedule
                </Link>
                <Link
                  to="/standings"
                  className="text-white"
                  onClick={toggleMenu}
                >
                  <FaTrophy className="mr-2" /> Standings
                </Link>
                <Link to="/player" className="text-white" onClick={toggleMenu}>
                  <FaPeopleGroup className="mr-2" /> Players
                </Link>
                {/* <Link to="/account" className="text-white" onClick={toggleMenu}><FaUser className="mr-2" /> Account</Link> */}
              </div>
            ) : (
              <div className="absolute top-0 left-0 w-full h-full bg-blue-500 flex flex-col p-5 pt-20 space-y-3 transition-transform ease-in-out duration-300 transform -translate-x-full"></div>
            )}
          </>
        ) : (
          <div className="space-x-6 flex items-center">
            <Link to="/" className="text-white flex">
              <FaCalendar className="mr-2" /> Schedule
            </Link>
            <Link to="/standings" className="text-white flex">
              <FaTrophy className="mr-2" /> Standings
            </Link>
            <Link to="/player" className="text-white flex">
              <FaPeopleGroup className="mr-2" /> Players
            </Link>
            {/* <Link to="/account" className="text-white flex" >
              <FaUser className="mr-2" /> Account
            </Link> */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
