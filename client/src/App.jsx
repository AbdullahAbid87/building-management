import { Fragment } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { StyledEngineProvider } from "@mui/material/styles";

const App = () => {
  return (
    <Fragment>
      <StyledEngineProvider injectFirst>
        <Router>
          <AppRoutes />
        </Router>
      </StyledEngineProvider>
    </Fragment>
  );
};

export default App;
