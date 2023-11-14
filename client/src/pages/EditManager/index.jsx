import React, { Fragment, useEffect, useState } from "react";
import withDashboard from "../../HOC/withDashboard";
import FormLayout from "../../components/FormLayout";
import Card from "../../components/Card";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import {
  addBuilding,
  addManager,
  editManager,
  getBuildings,
  setAddManager,
  setEditManager,
} from "../../redux/actions/adminAction";
import { useNavigate } from "react-router-dom";
import BuildingType from "../../constants/BuildingType";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Autocomplete from "@mui/material/Autocomplete";

const EditManager = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [editEmailDisabled, setEditEmailDisabled] = useState(false);
  const [editPasswordDisabled, setEditPasswordDisabled] = useState(false);
  const Admin = useSelector(({ Admin }) => Admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { editManagerForm, buildings } = Admin;
  const { name, email, password, confirmPassword, phoneNumber, building, _id } =
    editManagerForm;
  useEffect(() => {
    dispatch(
      setEditManager({
        name: "building",
        value: building,
      })
    );
  }, []);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(
      setEditManager({
        name,
        value,
      })
    );
  };

  const onClick = () => {
    const buildingId = building._id;
    const managerId = _id;

    let data = {
      buildingId,
      managerId,
      name,
      phoneNumber,
    };
    if (editEmailDisabled) {
      data.email = email;
    }
    if (editPasswordDisabled) {
      data.password = password;
    }
    dispatch(
      editManager({
        data,
        navigate,
      })
    );
  };

  useEffect(() => {
    dispatch(getBuildings());
  }, []);

  return (
    <Fragment>
      <FormLayout>
        <Card>
          <div className="card-title">Edit Manager</div>
          <div className="card-form-inputs-container">
            <div className="card-form-input">
              <Autocomplete
                options={buildings}
                getOptionLabel={(option) => option.title}
                name={"building"}
                renderInput={(params) => (
                  <TextField {...params} label="Building" />
                )}
                onChange={(event, newValue) => {
                  onChange({
                    target: {
                      name: "building",
                      value: newValue,
                    },
                  });
                }}
                value={building}
              />
            </div>
            <div className="card-form-input">
              <TextField
                label="Name"
                variant="outlined"
                className="w-100"
                name="name"
                onChange={onChange}
                value={name}
              />
            </div>
            <div className="card-form-input">
              <TextField
                label="Email"
                variant="outlined"
                className="w-100"
                name="email"
                onChange={onChange}
                value={email}
                disabled={!editEmailDisabled}
              />
            </div>
            <div className="card-form-input switch justify-flex-end">
              <div className="switch-title">Edit Email:</div>
              <span className="switch-value-label">No</span>
              <div className="switch-container">
                <Switch
                  inputProps={{ "aria-label": "controlled" }}
                  name="parkingAvailability"
                  checked={editEmailDisabled}
                  onChange={() => setEditEmailDisabled(!editEmailDisabled)}
                />
              </div>
              <span className="switch-value-label">Yes</span>
            </div>
            <div className="card-form-input">
              <TextField
                label="Password"
                variant="outlined"
                className="w-100"
                name="password"
                onChange={onChange}
                value={password}
                type={showPassword ? "text" : "password"}
                disabled={!editPasswordDisabled}
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
            <div className="card-form-input">
              <TextField
                label="Confirm Password"
                variant="outlined"
                className="w-100"
                name="confirmPassword"
                onChange={onChange}
                value={confirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                disabled={!editPasswordDisabled}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="card-form-input switch justify-flex-end">
              <div className="switch-title">Change Password:</div>
              <span className="switch-value-label">No</span>
              <div className="switch-container">
                <Switch
                  inputProps={{ "aria-label": "controlled" }}
                  name="parkingAvailability"
                  checked={editPasswordDisabled}
                  onChange={() =>
                    setEditPasswordDisabled(!editPasswordDisabled)
                  }
                />
              </div>
              <span className="switch-value-label">Yes</span>
            </div>
            <div className="card-form-input">
              <TextField
                label="Phone Number"
                variant="outlined"
                className="w-100"
                name="phoneNumber"
                onChange={onChange}
                value={phoneNumber}
              />
            </div>

            <div className="card-btn-container dual">
              <Button
                variant="contained"
                className="card-btn dual cancel"
                onClick={() => navigate("/viewManagers")}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="card-btn dual"
                onClick={onClick}
              >
                Update Manager
              </Button>
            </div>
          </div>
          <Loader />
        </Card>
      </FormLayout>
    </Fragment>
  );
};

export default withDashboard(EditManager);
