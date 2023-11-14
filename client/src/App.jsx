import { Fragment } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { StyledEngineProvider } from "@mui/material/styles";
import store from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore } from "redux-persist";
// import "@sweetalert2/theme-material-ui/material-ui.css";
const App = () => {
  const persistor = persistStore(store);
  return (
    <Fragment>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StyledEngineProvider injectFirst>
            <Router>
              <AppRoutes />
            </Router>
          </StyledEngineProvider>
        </PersistGate>
      </Provider>
    </Fragment>
  );
};

export default App;
