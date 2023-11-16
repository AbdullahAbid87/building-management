import React, { Fragment } from "react";
import "./index.css";
import Sidebar from "../../components/Sidebar";
import DashboardNav from "../../components/DashboardNav";
import { useSelector } from "react-redux";

const withDashboard = (WrappedComponent) => {
  const DashboardLayout = (props) => {
    const User = useSelector(({ User }) => User);
    const { sidebarOpen } = User;
    return (
      <Fragment>
        <div className="dashboard-container">
          <div
            className={`dashboard-sidebar ${sidebarOpen ? "open" : "close"}`}
          >
            <Sidebar />
          </div>
          <div
            className={`dashboard-content ${sidebarOpen ? "open" : "close"}`}
          >
            <div className="hoc-dashboard-navbar-containter">
              <DashboardNav />
            </div>
            <div className="dashboard-component-container">
              <WrappedComponent {...props} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return DashboardLayout;
};

export default withDashboard;
