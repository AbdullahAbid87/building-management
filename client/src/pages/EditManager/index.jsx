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
import { isValidEmail } from "../../utils";
import NumberTextField from "../../components/NumberTextField";

const EditManager = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [editEmailDisabled, setEditEmailDisabled] = useState(false);
  const [editPasswordDisabled, setEditPasswordDisabled] = useState(false);
  const Admin = useSelector(({ Admin }) => Admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    building: false,
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    phoneNumber: false,
  });
  const [errorConfirmPassword, seterrorConfirmPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

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
    setErrors({ ...errors, [name]: false });
  };

  const onClick = () => {
    let newErrors = {
      building: !building,
      name: !name,
      phoneNumber: !phoneNumber,
    };
    const buildingId = building?._id;
    const managerId = _id;

    let data = {
      buildingId,
      managerId,
      name,
      phoneNumber,
    };
    if (editEmailDisabled) {
      // Email
      if (email.toString().trim() === "") {
        setErrorEmail("Email is requried");
        newErrors.email = true;
      } else if (!isValidEmail(email)) {
        setErrorEmail("Email is not valid");
        newErrors.email = true;
      }
      data.email = email;
    }
    if (editPasswordDisabled) {
      // Confirm Password
      if (password.toString().trim() === "") {
        newErrors.password = true;
      }
      if (confirmPassword.toString().trim() === "") {
        seterrorConfirmPassword("Confirm Password is requried");
        newErrors.confirmPassword = true;
      } else if (password !== confirmPassword) {
        seterrorConfirmPassword("Password and Confirm Password is requried");
        newErrors.confirmPassword = true;
      }
      data.password = password;
    }
    const everyFieldFilled = Object.values(newErrors).every((value) => !value);
    if (everyFieldFilled) {
      dispatch(
        editManager({
          data,
          navigate,
        })
      );
    } else {
      setErrors(newErrors);
    }
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
                  <TextField
                    {...params}
                    label="Building"
                    error={errors.building}
                    helperText={errors.building ? "Building is required" : ""}
                  />
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
                error={errors.name}
                helperText={errors.name ? "Name is required" : ""}
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
                error={errors.email}
                helperText={errors.email ? errorEmail : ""}
              />
            </div>
            <div className="card-form-input switch justify-flex-end">
              <div className="switch-title">Edit Email:</div>
              <span className="switch-value-label">No</span>
              <div className="switch-container">
                <Switch
                  inputProps={{ "aria-label": "controlled" }}
                  checked={editEmailDisabled}
                  onChange={() => {
                    setEditEmailDisabled(!editEmailDisabled);
                    setErrors({ ...errors, email: false });
                  }}
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
                error={errors.password}
                helperText={errors.password ? "Password is required" : ""}
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
                error={errors.confirmPassword}
                helperText={errors.confirmPassword ? errorConfirmPassword : ""}
              />
            </div>
            <div className="card-form-input switch justify-flex-end">
              <div className="switch-title">Change Password:</div>
              <span className="switch-value-label">No</span>
              <div className="switch-container">
                <Switch
                  inputProps={{ "aria-label": "controlled" }}
                  checked={editPasswordDisabled}
                  onChange={() => {
                    setEditPasswordDisabled(!editPasswordDisabled);
                    setErrors({
                      ...errors,
                      password: false,
                      confirmPassword: false,
                    });
                  }}
                />
              </div>
              <span className="switch-value-label">Yes</span>
            </div>
            <div className="card-form-input">
              <NumberTextField
                label="Phone Number"
                variant="outlined"
                className="w-100"
                name="phoneNumber"
                onChange={onChange}
                value={phoneNumber}
                error={errors.phoneNumber}
                helperText={
                  errors.phoneNumber ? "Phone Number is required" : ""
                }
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
