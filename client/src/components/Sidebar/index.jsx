import React from "react";
import "./index.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import HandymanIcon from "@mui/icons-material/Handyman";
import ListIcon from "@mui/icons-material/List";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import BusinessIcon from "@mui/icons-material/Business";
import { useLocation, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="sidebar-container">
      <div className="sidebar-header-title">
        <span>
          <BusinessIcon />
        </span>
        RentHaven
      </div>
      <div className="sidebar-items-container">
        <div className="sidebar-item selected">
          <span>
            <DashboardIcon />
          </span>
          Dashboard
        </div>
        <div className="sidebar-item">
          <span>
            <PersonIcon />
          </span>
          Profile
        </div>
        <div
          className="sidebar-item"
          onClick={() => navigate("/viewBuildings")}
        >
          <span>
            <CorporateFareIcon />
          </span>
          Buildings
        </div>
        <div className="sidebar-item">
          <span>
            <ApartmentIcon />
          </span>
          Apartments
        </div>
        <div className="sidebar-item" onClick={() => navigate("/viewManagers")}>
          <span>
            <SupervisorAccountIcon />
          </span>
          Managers
        </div>
        <div className="sidebar-item">
          <span>
            <PersonIcon />
          </span>
          Tenants
        </div>
        <div className="sidebar-item">
          <span>
            <HandymanIcon />
          </span>
          Crew
        </div>
        <div className="sidebar-item">
          <span>
            <ListIcon />
          </span>
          Requests
        </div>
        <div className="sidebar-item">
          <span>
            <PowerSettingsNewIcon />
          </span>
          Log Out
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
