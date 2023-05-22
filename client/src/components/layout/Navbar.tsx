import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "redux/hooks";
import "../../styles/Navbar.css";

const Navbar: React.FC = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">GlamGem</Link>
      </div>
      <div className="navbar__links">
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <span></span>
            <Link to="/profile">Profile</Link>
            <Link to="/">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
