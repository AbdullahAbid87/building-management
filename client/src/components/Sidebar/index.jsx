import React, { Fragment } from "react";
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
import { logout } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector(({ User }) => User);
  const { currentUser } = User;
  const type = currentUser?.type;
  const isAdmin = type === "admin";
  const isManager = type === "manager";
  const onLogout = () => {
    dispatch(
      logout({
        data: {
          type,
        },
        navigate,
      })
    );
  };
  return (
    <div className="sidebar-container">
      <div className="sidebar-header-title">
        <span>
          <BusinessIcon />
        </span>
        RentHaven
      </div>
      <div className="sidebar-items-container">
        <div
          className={`sidebar-item ${pathname === "/dashboard" && "selected"} `}
        >
          <span>
            <DashboardIcon />
          </span>
          Dashboard
        </div>
        <div
          className={`sidebar-item ${pathname === "/profile" && "selected"} `}
          onClick={() => navigate("/profile")}
        >
          <span>
            <PersonIcon />
          </span>
          Profile
        </div>
        {isAdmin && (
          <div
            className={`sidebar-item  ${
              pathname === "/viewBuildings" && "selected"
            }`}
            onClick={() => navigate("/viewBuildings")}
          >
            <span>
              <CorporateFareIcon />
            </span>
            Buildings
          </div>
        )}
        {(isAdmin || isManager) && (
          <div
            className={`sidebar-item ${
              pathname === "/viewApartments" && "selected"
            }`}
            onClick={() => navigate("/viewApartments")}
          >
            <span>
              <ApartmentIcon />
            </span>
            Apartments
          </div>
        )}

        {isAdmin && (
          <div
            className={`sidebar-item ${
              pathname === "/viewManagers" && "selected"
            }`}
            onClick={() => navigate("/viewManagers")}
          >
            <span>
              <SupervisorAccountIcon />
            </span>
            Managers
          </div>
        )}
        {(isAdmin || isManager) && (
          <Fragment>
            <div
              className={`sidebar-item ${
                pathname === "/viewTenants" && "selected"
              }`}
              onClick={() => navigate("/viewTenants")}
            >
              <span>
                <PersonIcon />
              </span>
              Tenants
            </div>
            <div
              className={`sidebar-item ${
                pathname === "/viewCrews" && "selected"
              }`}
              onClick={() => navigate("/viewCrews")}
            >
              <span>
                <HandymanIcon />
              </span>
              Crew
            </div>
          </Fragment>
        )}

        <div
          className={`sidebar-item ${
            pathname === "/viewRequests" && "selected"
          }`}
          onClick={() => navigate("/viewRequests")}
        >
          <span>
            <ListIcon />
          </span>
          Requests
        </div>
        <div className="sidebar-item" onClick={onLogout}>
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
