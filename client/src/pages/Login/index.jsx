import { Fragment, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import GoogleImage from "../../assets/google.png";
import Button from "@mui/material/Button";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser, login, setUser } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { BASE_URL } from "../../redux/actions/types";
import Swal from "sweetalert2";
import { isValidEmail } from "../../utils";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const Login = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const failedParam = urlParams.get("failed");
  const [disableGoogle, setDisableGoogle] = useState(false);
  const User = useSelector(({ User }) => User);
  const { email, password, selectedType } = User;
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [errorEmail, setErrorEmail] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onAccordianChange = (value) => {
    dispatch(
      setUser({
        name: "selectedType",
        value,
      })
    );
  };
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(
      setUser({
        name,
        value,
      })
    );
    setErrors({ ...errors, [name]: false });
  };
  const onLogin = () => {
    let newErrors = {
      email: !email,
      password: !password,
    };
    if (email.toString().trim() === "") {
      setErrorEmail("Email is requried");
      newErrors.email = true;
    } else if (!isValidEmail(email)) {
      setErrorEmail("Email is not valid");
      newErrors.email = true;
    }
    const everyFieldFilled = Object.values(newErrors).every((value) => !value);
    if (everyFieldFilled) {
      const type = selectedType;
      dispatch(
        login({
          data: {
            email,
            password,
            type,
          },
          navigate,
        })
      );
    } else {
      setErrors(newErrors);
    }
  };
  const onGoogleLogin = () => {
    setDisableGoogle(true);
    window.open(`${BASE_URL}/api/tenant/google`, "_self");
    setDisableGoogle(false);
  };

  useEffect(() => {
    dispatch(loggedInUser({ navigate }));
    if (failedParam) {
      Swal.fire({
        icon: "error",
        title: "Error Occured",
        text: "Could not Authenticate",
      });
      const url = new URL(window.location.href);
      url.searchParams.delete("failed");

      // Replace the current URL without causing a page reload
      window.history.replaceState({}, document.title, url.toString());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className="login-container">
        <div className="login-content">
          <div className="login-card">
            <div className="login-header">
              <div className="login-header-title">Login</div>
              <div className="login-header-desc">
                Enter Email and Password to Login
              </div>
            </div>
            <div className="login-accordian-container">
              <div className="login-accordian">
                <div
                  className={`login-accordina-item ${
                    selectedType === "admin" && "selected"
                  }`}
                  onClick={() => onAccordianChange("admin")}
                >
                  Admin
                </div>
                <div
                  className={`login-accordina-item ${
                    selectedType === "manager" && "selected"
                  } `}
                  onClick={() => onAccordianChange("manager")}
                >
                  Manager
                </div>
                <div
                  className={`login-accordina-item ${
                    selectedType === "crew" && "selected"
                  }`}
                  onClick={() => onAccordianChange("crew")}
                >
                  Crew
                </div>
                <div
                  className={`login-accordina-item ${
                    selectedType === "tenant" && "selected"
                  }`}
                  onClick={() => onAccordianChange("tenant")}
                >
                  Tenant
                </div>
              </div>
            </div>
            <div className="login-card-body">
              <div className="login-form-item">
                <TextField
                  type="text"
                  label="Email"
                  variant="standard"
                  className="input"
                  name="email"
                  onChange={onChange}
                  value={email}
                  error={errors.email}
                  helperText={errors.email ? errorEmail : ""}
                />
              </div>
              <div className="login-form-item">
                <TextField
                  type="password"
                  label="Password"
                  variant="standard"
                  className="input"
                  name="password"
                  onChange={onChange}
                  value={password}
                  error={errors.password}
                  helperText={errors.password ? "Password is required" : ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setshowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="login-btn-container">
                <Button
                  variant="contained"
                  className="w-100 login-btn"
                  onClick={onLogin}
                >
                  Sign In
                </Button>
              </div>
              <div className="login-btn-container">
                <Button
                  variant="contained"
                  color="inherit"
                  startIcon={
                    <img
                      src={GoogleImage}
                      className="google-image"
                      alt="google.png"
                    />
                  }
                  className="w-100 google-btn"
                  onClick={onGoogleLogin}
                  disabled={disableGoogle}
                >
                  Login with Google
                </Button>
              </div>
            </div>
            <Loader />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
