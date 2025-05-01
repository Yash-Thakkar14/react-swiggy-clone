import React from "react";
import { LOGO_URL } from "../utils/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  // if no [] ==> useEffect will run on every render
  // if [empty] ==> useEffect will run only on initial render once
  // if [btnName] ==> useEffect will run everytime btnName changes

  const onlineStatus = useOnlineStatus(); // Custom Hook
  useEffect(() => {}, []);

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <div>Online Status: </div>
            {onlineStatus ? (
              <div className="online-status-icon">
                <WifiIcon style={{ color: "green" }} />
              </div>
            ) : (
              <div className="online-status-icon">
                <WifiOffIcon style={{ color: "red" }} />
              </div>
            )}
          </li>
          <li>
            <Link className="link-style" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link-style" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="link-style">
              Contact us
            </Link>
          </li>
          <li>
            <Link to="/grocery" className="link-style">
              Grocery
            </Link>
          </li>
          <li>
            <Link className="link-style" to="/cart">
              Cart
            </Link>
          </li>
          <button
            className="login"
            onClick={() => {
              btnName === "Logout" ? setBtnName("Login") : setBtnName("Logout");
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
