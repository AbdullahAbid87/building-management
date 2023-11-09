import React, { Fragment } from "react";
import "./index.css";
import Sidebar from "../../components/Sidebar";
import DashboardNav from "../../components/DashboardNav";

const withDashboard = (WrappedComponent) => {
  const DashboardLayout = (props) => {
    return (
      <Fragment>
        <div className="dashboard-container">
          <div className="dashboard-sidebar">
            <Sidebar />
          </div>
          <div className="dashboard-content">
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
