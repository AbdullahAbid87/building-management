import React, { Fragment, useEffect, useState } from "react";
import withDashboard from "../../HOC/withDashboard";
import FormLayout from "../../components/FormLayout";
import Card from "../../components/Card";
import {
  Autocomplete,
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
  getBuildings,
  setAddManager,
} from "../../redux/actions/adminAction";
import { useNavigate } from "react-router-dom";
import BuildingType from "../../constants/BuildingType";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  addTenant,
  getApartments,
  setAddTenant,
} from "../../redux/actions/managerAction";
import { isValidEmail } from "../../utils";
import NumberTextField from "../../components/NumberTextField";

const AddTenant = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const Admin = useSelector(({ Admin }) => Admin);
  const Manager = useSelector(({ Manager }) => Manager);
  const User = useSelector(({ User }) => User);
  const { currentUser } = User;
  const isAdmin = currentUser?.type === "admin";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    building: false,
    apartment: false,
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    phoneNumber: false,
  });
  const [errorConfirmPassword, seterrorConfirmPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const { addManagerForm, buildings } = Admin;
  const { addTenantForm, apartments } = Manager;
  const {
    name,
    email,
    password,
    confirmPassword,
    phoneNumber,
    building,
    apartment,
  } = addTenantForm;

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);
    dispatch(
      setAddTenant({
        name,
        value,
      })
    );
    setErrors({ ...errors, [name]: false });
  };

  const onClick = () => {
    const buildingId = building?._id;
    const apartmentId = apartment.map((item) => item._id);
    let newErrors = {
      apartment: apartment.length < 1,
      name: !name,
      email: !email,
      password: !password,
      confirmPassword: !confirmPassword,
      phoneNumber: !phoneNumber,
    };
    if (isAdmin) {
      newErrors.building = !building;
    }
    // Confirm Password
    if (confirmPassword.toString().trim() === "") {
      seterrorConfirmPassword("Confirm Password is requried");
      newErrors.confirmPassword = true;
    } else if (password !== confirmPassword) {
      seterrorConfirmPassword("Password and Confirm Password is requried");
      newErrors.confirmPassword = true;
    }
    // Email
    if (email.toString().trim() === "") {
      setErrorEmail("Email is requried");
      newErrors.email = true;
    } else if (!isValidEmail(email)) {
      setErrorEmail("Email is not valid");
      newErrors.email = true;
    }
    const everyFieldFilled = Object.values(newErrors).every((value) => !value);
    if (everyFieldFilled) {
      dispatch(
        addTenant({
          data: {
            name,
            email,
            password,
            phoneNumber,
            buildingId,
            apartmentId,
          },
          navigate,
        })
      );
    } else {
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (isAdmin) dispatch(getBuildings());
    dispatch(getApartments());
  }, []);

  return (
    <Fragment>
      <FormLayout>
        <Card>
          <div className="card-title">Add Tenant</div>
          <div className="card-form-inputs-container">
            {isAdmin && (
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
            )}

            <div className="card-form-input">
              <Autocomplete
                multiple
                options={apartments}
                getOptionLabel={(option) => option.apartmentTitle}
                name={"apartment"}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Apartment"
                    error={errors.apartment}
                    helperText={errors.apartment ? "Apartment is required" : ""}
                  />
                )}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  onChange({
                    target: {
                      name: "apartment",
                      value: newValue,
                    },
                  });
                }}
                value={apartment}
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
                error={errors.email}
                helperText={errors.email ? errorEmail : ""}
              />
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
                onClick={() => navigate("/viewTenants")}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="card-btn dual"
                onClick={onClick}
              >
                Add Tenant
              </Button>
            </div>
          </div>
          <Loader />
        </Card>
      </FormLayout>
    </Fragment>
  );
};

export default withDashboard(AddTenant);
