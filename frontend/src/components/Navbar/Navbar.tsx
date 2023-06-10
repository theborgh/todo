import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";

export default function Navbar({ supabase }) {
  const navigate = useNavigate();
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    navigate("/");
  };

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
        <span className="navbar__link" onClick={signOut}>
          Logout
        </span>
      </div>
    </div>
  );
}
