import { getAuth, GoogleAuthProvider, signInWithPopup, getRedirectResult } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
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
import { auth } from "../Authentication";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const dropdownRef = useRef(null);

  const [photoURL, setPhotoURL] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing up with Google: ", error);
    }
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result.user) {
          setIsLoggedIn(true);
          setPhotoURL(result.user.photoURL);
        }
      })
      .catch((error) => {
        console.error("Error getting sign-in result: ", error);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setPhotoURL(user.photoURL);
      } else {
        setIsLoggedIn(false);
        setPhotoURL("");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/">
        <span className="text-white text-lg font-bold flex">
          <img src="/logo_white.png" className="mr-2 w-8" />
          StickTap
        </span>
        </a>

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
                <Link to="/" className="text-white flex" onClick={toggleMenu}>
                  <FaCalendar className="mr-2" /> Schedule
                </Link>
                <Link
                  to="/standings"
                  className="text-white flex"
                  onClick={toggleMenu}
                >
                  <FaTrophy className="mr-2" /> Standings
                </Link>
                <Link
                  to="/player"
                  className="text-white flex"
                  onClick={toggleMenu}
                >
                  <FaPeopleGroup className="mr-2" /> Players
                </Link>
                <div className="relative" ref={dropdownRef}>
                  {isLoggedIn ? (
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={toggleDropdown}
                    >
                      <img
                        src={photoURL}
                        alt="Profile"
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span className="text-white">Account</span>
                    </div>
                  ) : (
                    <button
                      onClick={toggleDropdown}
                      className="text-white flex"
                    >
                      <FaUser className="mr-2" /> Account
                    </button>
                  )}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        {isLoggedIn ? (
                          <>
                            <Link
                              to="/account"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              role="menuitem"
                            >
                              Your Account
                            </Link>
                            <button
                              onClick={() => getAuth().signOut()}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              role="menuitem"
                            >
                              Sign Out
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={handleGoogleSignIn}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            Sign In
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="absolute top-0 left-0 w-full h-full bg-blue-500 flex flex-col p-5 pt-20 space-y-3 transition-transform ease-in-out duration-300 transform -translate-x-full"></div>
            )}
          </>
        ) : (
          <div className="space-x-6 flex items-center">
            <Link to="/standings" className="text-white flex">
              <FaTrophy className="mr-2" /> Standings
            </Link>
            <Link to="/player" className="text-white flex">
              <FaPeopleGroup className="mr-2" /> Players
            </Link>
            <div className="relative" ref={dropdownRef}>
              {isLoggedIn ? (
                <div
                  className="flex items-center cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <img
                    src={photoURL}
                    alt="Profile"
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="text-white">Account</span>
                </div>
              ) : (
                <button onClick={toggleDropdown} className="text-white flex">
                  <FaUser className="mr-2" /> Account
                </button>
              )}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {isLoggedIn ? (
                      <>
                        <Link
                          to="/account"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Your Account
                        </Link>
                        <button
                          onClick={() => getAuth().signOut()}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleGoogleSignIn}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Sign In
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
