import React, { Fragment, useEffect } from "react";
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
  editApartment,
  setAddApartment,
  setEditApartment,
} from "../../redux/actions/managerAction";

const EditApartment = () => {
  const Admin = useSelector(({ Admin }) => Admin);
  const User = useSelector(({ User }) => User);
  const Manager = useSelector(({ Manager }) => Manager);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { buildings } = Admin;
  const { currentUser } = User;
  const { editApartmentForm } = Manager;
  const {
    _id,
    building,
    apartmentTitle,
    numberOfBedrooms,
    numberOfBathrooms,
    floorLevel,
    monthlyRent,
  } = editApartmentForm;

  const isAdmin = currentUser?.type === "admin";

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(
      setEditApartment({
        name,
        value,
      })
    );
  };

  const onClick = () => {
    const buildingId = building?._id;
    const apartmentId = _id;
    dispatch(
      editApartment({
        data: {
          apartmentId,
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
  };

  useEffect(() => {
    if (isAdmin) dispatch(getBuildings());
  }, []);

  return (
    <Fragment>
      <FormLayout>
        <Card>
          <div className="card-title">Edit Apartment</div>
          <div className="card-form-inputs-container">
            {isAdmin && (
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
              />
            </div>
            <div className="card-form-input">
              <TextField
                id="outlined-basic"
                label="Number of Bedrooms"
                variant="outlined"
                className="w-100"
                name="numberOfBedrooms"
                onChange={onChange}
                value={numberOfBedrooms}
              />
            </div>
            <div className="card-form-input">
              <TextField
                id="outlined-basic"
                label="Number of Bathrooms"
                variant="outlined"
                className="w-100"
                name="numberOfBathrooms"
                onChange={onChange}
                value={numberOfBathrooms}
              />
            </div>
            <div className="card-form-input">
              <TextField
                id="outlined-basic"
                label="Floor Level"
                variant="outlined"
                className="w-100"
                name="floorLevel"
                onChange={onChange}
                value={floorLevel}
              />
            </div>
            <div className="card-form-input">
              <TextField
                id="outlined-basic"
                label="Monthly Rent"
                variant="outlined"
                className="w-100"
                name="monthlyRent"
                onChange={onChange}
                value={monthlyRent}
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
                Update Apartment
              </Button>
            </div>
          </div>
        </Card>
      </FormLayout>
    </Fragment>
  );
};

export default withDashboard(EditApartment);
