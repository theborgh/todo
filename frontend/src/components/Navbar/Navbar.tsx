import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Link to={"/"}>
          <img src={logo} alt="Logo" height="40px" />
        </Link>
      </div>
      <div className="navbar__links">
        <Link to={"/todos"} className="navbar__link">
          Todos
        </Link>
        <Link to={"/logout"} className="navbar__link">
          Logout
        </Link>
      </div>
    </div>
  );
}
