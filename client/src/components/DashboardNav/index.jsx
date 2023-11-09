import React from "react";
import "./index.css";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";

const DashboardNav = () => {
  return (
    <div className="dashboard-navbar-container">
      <div className="dashboard-navbar-link-container">
        <div className="dashboard-navbar-link">
          <div className="dashboard-navbar-link-icon">
            <HomeIcon />
          </div>
          /<div className="dashboard-navbar-link-text">User Profile</div>
        </div>
        <div className="dashboard-navbar-link-alt">User Profile</div>
      </div>
      <div className="dashboard-actions-container">
        <div className="dashboard-navbar-action-item">
          <PersonIcon />
        </div>
        <div className="dashboard-navbar-action-item">
          <SettingsIcon />
        </div>
        <div className="dashboard-navbar-action-item">
          <NotificationsIcon />
        </div>
        <div className="dashboard-navbar-action-item">
          <Button variant="contained" className="dashboard-btn">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
