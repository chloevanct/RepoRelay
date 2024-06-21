import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import NotificationBell from "../assets/notification-bell.png";
import Headshot from "../assets/headshot.jpg";

export default function Header() {
  return (
    <div className="topnav">
      <div>
        <Link to="/home" id="logo-link">
          REPO RELAY
        </Link>
      </div>
      <div className="right-nav">
        <Link to="/home">DASHBOARD</Link>
        <Link to="/home">PROJECT HUB</Link>
        <Link to="/aboutUs">ABOUT US</Link>
        <Link to="/home">
          <img
            src={NotificationBell}
            alt="Notifications"
            id="notification-bell"
          />
        </Link>
        <Link to="/user">
          <img src={Headshot} alt="Profile" />
        </Link>
        <Link to="/post" id="add-project">
          ADD PROJECT
        </Link>
      </div>
      {/* <SkillTag skill="Python" /> */}
    </div>
  );
}
