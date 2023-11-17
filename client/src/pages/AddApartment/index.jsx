import React, { Fragment, useEffect, useState } from "react";
import withDashboard from "../../HOC/withDashboard";
import FormLayout from "../../components/FormLayout";
import Card from "../../components/Card";
import { Autocomplete, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBuildings } from "../../redux/actions/adminAction";
import {
  addApartment,
  setAddApartment,
} from "../../redux/actions/managerAction";
import NumberTextField from "../../components/NumberTextField";

const AddApartment = () => {
  const Admin = useSelector(({ Admin }) => Admin);
  const User = useSelector(({ User }) => User);
  const Manager = useSelector(({ Manager }) => Manager);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    building: false,
    apartmentTitle: false,
    numberOfBathrooms: false,
    numberOfBedrooms: false,
    floorLevel: false,
    monthlyRent: false,
  });

  const { buildings } = Admin;
  const { currentUser } = User;
  const { addApartmentForm } = Manager;
  const {
    building,
    apartmentTitle,
    numberOfBedrooms,
    numberOfBathrooms,
    floorLevel,
    monthlyRent,
  } = addApartmentForm;

  const isAdmin = currentUser?.type === "admin";

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(
      setAddApartment({
        name,
        value,
      })
    );
    setErrors({ ...errors, [name]: false });
  };

  const onClick = () => {
    let newErrors = {
      apartmentTitle: !apartmentTitle,
      numberOfBathrooms: !numberOfBathrooms,
      numberOfBedrooms: !numberOfBedrooms,
      floorLevel: !floorLevel,
      monthlyRent: !monthlyRent,
    };
    if (isAdmin) {
      newErrors.building = !building;
    }
    const everyFieldFilled = Object.values(newErrors).every((value) => !value);
    const buildingId = building?._id;
    if (everyFieldFilled) {
      dispatch(
        addApartment({
          data: {
            buildingId,
            apartmentTitle,
            numberOfBedrooms,
            numberOfBathrooms,
            floorLevel,
            monthlyRent,
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
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <FormLayout>
        <Card>
          <div className="card-title">Add Apartment</div>
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
              <TextField
                id="outlined-basic"
                label="Apartment Title"
                variant="outlined"
                className="w-100"
                name="apartmentTitle"
                onChange={onChange}
                value={apartmentTitle}
                error={errors.apartmentTitle}
                helperText={
                  errors.apartmentTitle ? "Apartment Title is required" : ""
                }
              />
            </div>
            <div className="card-form-input">
              <NumberTextField
                id="outlined-basic"
                label="Number of Bedrooms"
                variant="outlined"
                className="w-100"
                name="numberOfBedrooms"
                onChange={onChange}
                value={numberOfBedrooms}
                error={errors.numberOfBedrooms}
                helperText={
                  errors.numberOfBedrooms
                    ? "Number of BedRooms is required"
                    : ""
                }
              />
            </div>
            <div className="card-form-input">
              <NumberTextField
                id="outlined-basic"
                label="Number of Bathrooms"
                variant="outlined"
                className="w-100"
                name="numberOfBathrooms"
                onChange={onChange}
                value={numberOfBathrooms}
                error={errors.numberOfBathrooms}
                helperText={
                  errors.numberOfBathrooms
                    ? "Number of BathRooms is required"
                    : ""
                }
              />
            </div>
            <div className="card-form-input">
              <NumberTextField
                id="outlined-basic"
                label="Floor Level"
                variant="outlined"
                className="w-100"
                name="floorLevel"
                onChange={onChange}
                value={floorLevel}
                error={errors.floorLevel}
                helperText={
                  errors.floorLevel ? "Level of Floors is required" : ""
                }
              />
            </div>
            <div className="card-form-input">
              <NumberTextField
                id="outlined-basic"
                label="Monthly Rent"
                variant="outlined"
                className="w-100"
                name="monthlyRent"
                onChange={onChange}
                value={monthlyRent}
                error={errors.monthlyRent}
                helperText={
                  errors.monthlyRent ? "Monthly Rent is required" : ""
                }
              />
            </div>
            <div className="card-btn-container dual">
              <Button
                variant="contained"
                className="card-btn dual cancel"
                onClick={() => navigate("/viewApartments")}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="card-btn dual"
                onClick={onClick}
              >
                Add Apartment
              </Button>
            </div>
          </div>
        </Card>
      </FormLayout>
    </Fragment>
  );
};

export default withDashboard(AddApartment);
