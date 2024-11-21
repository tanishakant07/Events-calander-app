import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1>Events Calendar</h1>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
