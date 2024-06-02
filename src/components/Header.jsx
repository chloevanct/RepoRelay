import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Make sure to have this file for your styles

import NotificationBell from "../assets/notification-bell.png";
import Headshot from "../assets/headshot.jpg";

import SkillTag from "./SkillTag";

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
        <Link to="/home">ABOUT US</Link>
        <Link to="/home">
          <img
            src={NotificationBell}
            alt="Notifications"
            id="notification-bell"
          />
        </Link>
        <Link to="/home">
          <img src={Headshot} alt="Profile" />
        </Link>
        <Link to="/home" id="add-project">
          ADD PROJECT
        </Link>
      </div>
      <SkillTag skill="Python" />
    </div>
  );
}
