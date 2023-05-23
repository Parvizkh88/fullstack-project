import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { logoutService } from "services/userService";
import "../../styles/Navbar.css";
import { logoutUser } from "redux/userSlice";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

const Navbar: React.FC = () => {
  const { isLoggedIn, isAdmin } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const user = await logoutService();
      if (user) {
        dispatch(logoutUser());
        toast("logout");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <ToastContainer />
      <nav className="navbar">
        <div className="navbar__logo">
          <Link to="/">GlamGem</Link>
        </div>
        <div className="navbar__links">
          <Link to="/">Home</Link>
          {isLoggedIn ? (
            <>
              <span></span>
              {isAdmin ? (
                <Link to="/dashboard">Dashboard</Link>
              ) : (
                <Link to="/profile">Profile</Link>
              )}

              <button onClick={logoutHandler}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
