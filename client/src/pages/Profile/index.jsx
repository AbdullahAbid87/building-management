import React from "react";
import withDashboard from "../../HOC/withDashboard";
import BackgroundImage from "../../assets/profilebackground.jpeg";
import "./index.css";
import ProfileImg from "../../assets/profile.jpg";
import { Button, TextField } from "@mui/material";

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-backgroundImage-container">
        <img src={BackgroundImage} className="profile-backgroundImage" />
      </div>
      <div className="profile-card-container">
        <div className="profile-card">
          <div className="profile-info-container">
            <img src={ProfileImg} className="profile-user-img" />
            <div className="profile-info-text-container">
              <div className="profile-info-role">Admin</div>
              <div className="profile-info-desc">CEO / Co-Founder</div>
            </div>
          </div>
          <div className="profile-inputs-container">
            <div className="profile-input-row">
              <div className="profile-input-item">
                <div className="profile-input-container">
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    className="w-100"
                  />
                </div>
              </div>
              <div className="profile-input-item">
                <div className="profile-input-container">
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    className="w-100"
                  />
                </div>
              </div>
            </div>
            <div className="profile-input-row">
              <div className="profile-input-item">
                <div className="profile-input-container">
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    className="w-100"
                  />
                </div>
              </div>
              <div className="profile-input-item">
                <div className="profile-input-container">
                  <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    className="w-100"
                  />
                </div>
              </div>
            </div>
            <div className="profile-input-btn-container">
              <Button variant="contained" className="profile-btn">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withDashboard(Profile);
