import React, { Fragment, useState } from "react";
import withDashboard from "../../HOC/withDashboard";
import FormLayout from "../../components/FormLayout";
import Card from "../../components/Card";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { addBuilding, setAddBuilding } from "../../redux/actions/adminAction";
import { useNavigate } from "react-router-dom";
import BuildingType from "../../constants/BuildingType";
import { isNumber } from "../../utils/index";
import NumberTextField from "../../components/NumberTextField";

const AddBuilding = () => {
  const Admin = useSelector(({ Admin }) => Admin);
  const [errors, setErrors] = useState({
    title: false,
    address: false,
    numberOfFloors: false,
    type: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addBuildingForm } = Admin;
  const { title, address, numberOfFloors, parkingAvailability, type } =
    addBuildingForm;

  const onChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    console.log(e.target);
    if (!isNumber(value)) {
      return;
    }
    dispatch(
      setAddBuilding({
        name,
        value,
      })
    );
    setErrors({ ...errors, [name]: false });
  };
  const toggleSwitch = (e) => {
    dispatch(
      setAddBuilding({
        name: "parkingAvailability",
        value: !parkingAvailability,
      })
    );
  };

  const onClick = () => {
    const newErrors = {
      title: !title,
      address: !address,
      numberOfFloors: !numberOfFloors,
      type: !type,
    };
    const everyFieldFilled = Object.values(newErrors).every((value) => !value);
    if (everyFieldFilled) {
      dispatch(
        addBuilding({
          data: {
            title,
            address,
            type,
            numberOfFloors: parseInt(numberOfFloors),
            parkingAvailability,
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
          <div className="card-title">Add Building</div>
          <div className="card-form-inputs-container">
            <div className="card-form-input">
              <TextField
                label="Building Title"
                variant="outlined"
                className="w-100"
                name="title"
                onChange={onChange}
                value={title}
                error={errors.title}
                helperText={errors.title ? "Title is required" : ""}
              />
            </div>
            <div className="card-form-input">
              <TextField
                label="Address"
                variant="outlined"
                className="w-100"
                name="address"
                onChange={onChange}
                value={address}
                error={errors.address}
                helperText={errors.address ? "Address is required" : ""}
              />
            </div>
            <div className="card-form-input">
              <Autocomplete
                options={BuildingType}
                getOptionLabel={(option) => option}
                name={"type"}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Building Type"
                    error={errors.type}
                    helperText={errors.type ? "Building Type is required" : ""}
                  />
                )}
                onChange={(event, newValue) => {
                  onChange({
                    target: {
                      name: "type",
                      value: newValue,
                    },
                  });
                }}
                value={type}
              />
            </div>
            <div className="card-form-input">
              <NumberTextField
                label="Number Of Floors"
                variant="outlined"
                className="w-100"
                name="numberOfFloors"
                onChange={onChange}
                value={numberOfFloors}
                error={errors.numberOfFloors}
                helperText={
                  errors.numberOfFloors ? "Number of Floors is required" : ""
                }
                type={"text"}
              />
            </div>
            <div className="card-form-input switch">
              <div className="switch-title">Parking Availability:</div>
              <span className="switch-value-label">No</span>
              <div className="switch-container">
                <Switch
                  inputProps={{ "aria-label": "controlled" }}
                  value={parkingAvailability}
                  name="parkingAvailability"
                  onChange={toggleSwitch}
                />
              </div>
              <span className="switch-value-label">Yes</span>
            </div>
            <div className="card-btn-container dual">
              <Button
                variant="contained"
                className="card-btn dual cancel"
                onClick={() => navigate("/viewBuildings")}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="card-btn dual"
                onClick={onClick}
              >
                Add Building
              </Button>
            </div>
          </div>
          <Loader />
        </Card>
      </FormLayout>
    </Fragment>
  );
};

export default withDashboard(AddBuilding);
