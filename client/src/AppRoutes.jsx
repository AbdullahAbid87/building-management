import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import Profile from "./pages/Profile";
import Login from "./pages/Login";
import AddTenant from "./pages/AddTenant";
import ViewTenants from "./pages/ViewTenants";
import AddApartment from "./pages/AddApartment";
import AddBuilding from "./pages/AddBuilding";
import ViewBuildings from "./pages/ViewBuildings";
const AppRoutes = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addTenant" element={<AddTenant />} />
        <Route path="/viewTenants" element={<ViewTenants />} />
        <Route path="/addApartment" element={<AddApartment />} />
        <Route path="/addBuilding" element={<AddBuilding />} />
        <Route path="/viewBuildings" element={<ViewBuildings />} />
      </Routes>
    </Fragment>
  );
};

export default AppRoutes;
