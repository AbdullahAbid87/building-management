import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import Profile from "./pages/Profile";
import Login from "./pages/Login";
import AddTenant from "./pages/AddTenant";
import ViewTenants from "./pages/ViewTenants";
import AddApartment from "./pages/AddApartment";
import AddBuilding from "./pages/AddBuilding";
import ViewBuildings from "./pages/ViewBuildings";
import EditBuilding from "./pages/EditBuilding";
import AddManager from "./pages/AddManager";
import VIewManagers from "./pages/ViewManagers";
import EditManager from "./pages/EditManager";
import ViewApartments from "./pages/ViewApartments";
import EditApartment from "./pages/EditApartment";
import EditTenant from "./pages/EditTenant";
import AddCrew from "./pages/AddCrew";
import ViewCrews from "./pages/ViewCrews";
import EditCrew from "./pages/EditCrew";

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
        <Route path="/editBuilding" element={<EditBuilding />} />
        <Route path="/viewBuildings" element={<ViewBuildings />} />
        <Route path="/addManager" element={<AddManager />} />
        <Route path="/viewManagers" element={<VIewManagers />} />
        <Route path="/editManager" element={<EditManager />} />
        <Route path="/viewApartments" element={<ViewApartments />} />
        <Route path="/editApartment" element={<EditApartment />} />
        <Route path="/addTenant" element={<AddTenant />} />
        <Route path="/editTenant" element={<EditTenant />} />
        <Route path="/addCrew" element={<AddCrew />} />
        <Route path="/editCrew" element={<EditCrew />} />
        <Route path="/viewCrews" element={<ViewCrews />} />
      </Routes>
    </Fragment>
  );
};

export default AppRoutes;
