import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-around items-center text-white">
        <li>
          <Link
            to="/"
            className="hover:text-gray-400 transition duration-300 ease-in-out"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/add-player"
            className="hover:text-gray-400 transition duration-300 ease-in-out"
          >
            Add Player
          </Link>
        </li>
        <li>
          <Link
            to="/match-details"
            className="hover:text-gray-400 transition duration-300 ease-in-out"
          >
            Match Details
          </Link>
        </li>
        <li>
          <Link
            to="/top-players"
            className="hover:text-gray-400 transition duration-300 ease-in-out"
          >
            Top Players
          </Link>
        </li>
        <li>
          <Link
            to="/matches-by-date-range"
            className="hover:text-gray-400 transition duration-300 ease-in-out"
          >
            Matches by Date Range
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
