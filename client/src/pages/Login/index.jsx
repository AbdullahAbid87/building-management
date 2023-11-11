import React, { Fragment, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import GoogleImage from "../../assets/google.png";
import Button from "@mui/material/Button";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { login, setUser } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const Login = () => {
  const User = useSelector(({ User }) => User);
  const { email, password, selectedType } = User;
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
  };
  const onLogin = () => {
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
  };
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
                      alt="Image"
                    />
                  }
                  className="w-100 google-btn"
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
