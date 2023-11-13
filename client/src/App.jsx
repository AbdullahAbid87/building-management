import { Fragment } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { StyledEngineProvider } from "@mui/material/styles";
import store from "./redux/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
// import "@sweetalert2/theme-material-ui/material-ui.css";
const App = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <Router>
            <AppRoutes />
          </Router>
        </StyledEngineProvider>
      </Provider>
    </Fragment>
  );
};

export default App;
