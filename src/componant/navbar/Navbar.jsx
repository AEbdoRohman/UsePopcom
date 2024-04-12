import React, { useEffect, useRef } from "react";
import "./navbar.css";
import logo from "../../image/video.png";
import { Link, useNavigate } from "react-router-dom";
const Navbar = ({ search, sitSearch }) => {
  const navegat = useNavigate();
  const inputEl = useRef(null);

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.key === "Enter") {
        inputEl.current.focus();
        sitSearch("");
        navegat("/");
      }
    }

    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [navegat, sitSearch]);

  function handleChange(e) {
    sitSearch(e.target.value);
    inputEl.current.focus();
    navegat("/");
  }
  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="logo">
          <span>
            <img src={logo} alt="logo" />
          </span>
          usePopcorn
        </h1>
      </Link>
      <input
        className="search"
        type="search"
        placeholder="Search"
        value={search}
        onChange={handleChange}
        ref={inputEl}
      />

      <Link to="/watched" className="result">
        🛒
      </Link>
    </div>
  );
};

export default Navbar;
