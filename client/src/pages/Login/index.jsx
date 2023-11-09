import React, { Fragment, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import GoogleImage from "../../assets/google.png";
import Button from "@mui/material/Button";
import "./index.css";

const Login = () => {
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
                <div className="login-accordina-item">User</div>
                <div className="login-accordina-item">Manager</div>
                <div className="login-accordina-item selected">Crew</div>
              </div>
            </div>
            <div className="login-card-body">
              <div className="login-form-item">
                <TextField
                  type="text"
                  label="Email"
                  variant="standard"
                  className="input"
                />
              </div>
              <div className="login-form-item">
                <TextField
                  type="text"
                  label="Password"
                  variant="standard"
                  className="input"
                />
              </div>
              <div className="login-btn-container">
                <Button variant="contained" className="w-100 login-btn">
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
