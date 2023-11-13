import React, { Fragment } from "react";
import withDashboard from "../../HOC/withDashboard";
import FormLayout from "../../components/FormLayout";
import Card from "../../components/Card";
import {
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
import {
  addBuilding,
  editBuilding,
  setEditBuilding,
} from "../../redux/actions/adminAction";
import { useNavigate } from "react-router-dom";
import BuildingType from "../../constants/BuildingType";

const EditBuilding = () => {
  const Admin = useSelector(({ Admin }) => Admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { editBuildingForm } = Admin;
  const { _id, title, address, numberOfFloors, parkingAvailability, type } =
    editBuildingForm;

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);
    dispatch(
      setEditBuilding({
        name,
        value,
      })
    );
  };
  const toggleSwitch = (e) => {
    dispatch(
      setEditBuilding({
        name: "parkingAvailability",
        value: !parkingAvailability,
      })
    );
  };

  const onClick = () => {
    const buildingId = _id;
    dispatch(
      editBuilding({
        data: {
          buildingId,
          title,
          address,
          type,
          numberOfFloors: parseInt(numberOfFloors),
          parkingAvailability,
        },
        navigate,
      })
    );
  };

  return (
    <Fragment>
      <FormLayout>
        <Card>
          <div className="card-title">Edit Building</div>
          <div className="card-form-inputs-container">
            <div className="card-form-input">
              <TextField
                label="Building Title"
                variant="outlined"
                className="w-100"
                name="title"
                onChange={onChange}
                value={title}
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
              />
            </div>
            <div className="card-form-input">
              <FormControl fullWidth>
                <InputLabel id="building-type-label">Building Type</InputLabel>
                <Select
                  labelId="building-type-label"
                  className="w-100"
                  value={type}
                  label="Building Type"
                  name={"type"}
                  onChange={onChange}
                >
                  {BuildingType.map((type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="card-form-input">
              <TextField
                label="Number Of Floors"
                variant="outlined"
                className="w-100"
                name="numberOfFloors"
                onChange={onChange}
                value={numberOfFloors}
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
                  checked={parkingAvailability}
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
                Update Building
              </Button>
            </div>
          </div>
          <Loader />
        </Card>
      </FormLayout>
    </Fragment>
  );
};

export default withDashboard(EditBuilding);
