import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        pic<span>share</span>
      </div>

      <div className="navbar-links">
        <NavLink
          to="/feed"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Feed
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Create Post
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;