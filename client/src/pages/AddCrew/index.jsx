import { Fragment, useState } from "react";
import withDashboard from "../../HOC/withDashboard";
import FormLayout from "../../components/FormLayout";
import Card from "../../components/Card";
import { Autocomplete, IconButton, InputAdornment, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { addCrew, setAddCrew } from "../../redux/actions/managerAction";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Profession from "../../constants/Profession";
import { isValidEmail } from "../../utils";

const AddCrew = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const Admin = useSelector(({ Admin }) => Admin);
  const User = useSelector(({ User }) => User);
  const { currentUser } = User;
  const isAdmin = currentUser?.type === "admin";
  const { buildings } = Admin;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Manager = useSelector(({ Manager }) => Manager);
  const { addCrewForm } = Manager;
  const {
    building,
    profession,
    name,
    email,
    password,
    confirmPassword,
    phoneNumber,
  } = addCrewForm;
  const [errors, setErrors] = useState({
    building: false,
    profession: false,
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    phoneNumber: false,
  });
  const [errorConfirmPassword, seterrorConfirmPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(
      setAddCrew({
        name,
        value,
      })
    );
    setErrors({ ...errors, [name]: false });
  };

  const onClick = () => {
    const buildingId = building?._id;
    let newErrors = {
      profession: !profession,
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
        addCrew({
          data: {
            buildingId,
            profession,
            name,
            email,
            password,
            phoneNumber,
          },
          navigate,
        })
      );
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Fragment>
      <FormLayout>
        <Card>
          <div className="card-title">Add Crew Members</div>
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
                options={Profession}
                getOptionLabel={(option) => option}
                name={"profession"}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Profession"
                    error={errors.profession}
                    helperText={
                      errors.profession ? "Profession is required" : ""
                    }
                  />
                )}
                onChange={(event, newValue) => {
                  onChange({
                    target: {
                      name: "profession",
                      value: newValue,
                    },
                  });
                }}
                value={profession}
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
              <TextField
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
                onClick={() => navigate("/viewCrews")}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="card-btn dual"
                onClick={onClick}
              >
                Add Crew
              </Button>
            </div>
          </div>
          <Loader />
        </Card>
      </FormLayout>
    </Fragment>
  );
};

export default withDashboard(AddCrew);
