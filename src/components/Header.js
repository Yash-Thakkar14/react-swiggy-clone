import React from "react";
import { LOGO_URL } from "../utils/constants";
import { useState, useEffect, useContext } from "react";
import UserContext from "../utils/UserContext";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // if no [] ==> useEffect will run on every render
  // if [empty] ==> useEffect will run only on initial render once
  // if [btnName] ==> useEffect will run everytime btnName changes
  const data = useContext(UserContext);
  //Selector
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  const onlineStatus = useOnlineStatus(); // Custom Hook

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} />
      </div>

      <div className="hamburger-menu">
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
        </button>
      </div>

      <div className={`nav-items ${isMenuOpen ? "open" : ""}`}>
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
              Cart - ({cartItems.length})
            </Link>
          </li>
          <li>
            <Link className="link-style">{data?.loggedInUser}</Link>
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
