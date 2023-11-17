import { useEffect } from "react";
import withDashboard from "../../HOC/withDashboard";
import BackgroundImage from "../../assets/profilebackground.jpeg";
import "./index.css";
import ProfileImg from "../../assets/profile.jpg";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setProfileForm, updateProfile } from "../../redux/actions/userAction";

const Profile = () => {
  const User = useSelector(({ User }) => User);
  const dispatch = useDispatch();

  const { currentUser, profileForm } = User;
  const { name, email, phoneNumber, type } = profileForm;

  const capitalizeFirstLetter = (string) => {
    return string.toString().charAt(0).toUpperCase() + string.slice(1);
  };
  useEffect(() => {
    dispatch(
      setProfileForm({
        name: "name",
        value: currentUser.name,
      })
    );
    dispatch(
      setProfileForm({
        name: "email",
        value: currentUser.email,
      })
    );
    dispatch(
      setProfileForm({
        name: "phoneNumber",
        value: currentUser.phoneNumber,
      })
    );
    dispatch(
      setProfileForm({
        name: "type",
        value: capitalizeFirstLetter(currentUser.type),
      })
    );
    // eslint-disable-next-line
  }, []);
  const onClick = () => {
    dispatch(
      updateProfile({
        data: {
          name,
          phoneNumber,
        },
      })
    );
  };
  const onChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    dispatch(
      setProfileForm({
        name,
        value,
      })
    );
  };
  return (
    <div className="profile-container">
      <div className="profile-backgroundImage-container">
        <img src={BackgroundImage} className="profile-backgroundImage" alt="background.png" />
      </div>
      <div className="profile-card-container">
        <div className="profile-card">
          <div className="profile-info-container">
            <img src={ProfileImg} className="profile-user-img" alt="profile.png" />
            <div className="profile-info-text-container">
              <div className="profile-info-role">{type}</div>
              <div className="profile-info-desc">Profile Form</div>
            </div>
          </div>
          <div className="profile-inputs-container">
            <div className="profile-input-row">
              <div className="profile-input-item">
                <div className="profile-input-container">
                  <TextField
                    label="Name"
                    variant="outlined"
                    className="w-100"
                    value={name}
                    name="name"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="profile-input-item">
                <div className="profile-input-container">
                  <TextField
                    label="Email"
                    variant="outlined"
                    className="w-100"
                    value={email}
                    name="email"
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <div className="profile-input-row">
              <div className="profile-input-item">
                <div className="profile-input-container">
                  <TextField
                    label="Password"
                    variant="outlined"
                    className="w-100"
                    disabled={true}
                  />
                </div>
              </div>
              <div className="profile-input-item">
                <div className="profile-input-container">
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    className="w-100"
                    value={phoneNumber}
                    name="phoneNumber"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div className="profile-input-btn-container">
              <Button
                variant="contained"
                className="profile-btn"
                onClick={onClick}
              >
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
