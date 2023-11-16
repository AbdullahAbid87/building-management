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
  addRequest,
  editRequest,
  setAddRequest,
  setEditRequest,
} from "../../redux/actions/userAction";
import Profession from "../../constants/Profession";

const AddRequest = () => {
  const User = useSelector(({ User }) => User);
  const Manager = useSelector(({ Manager }) => Manager);
  const { crews } = Manager;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { editRequestForm, apartments, currentUser } = User;
  const isAdmin = currentUser?.type === "admin";
  const isManager = currentUser?.type === "manager";
  const isCrew = currentUser?.type === "crew";
  const isTenant = currentUser?.type === "tenant";
  const { category, description, handymen, apartment, status, _id } =
    editRequestForm;
  const [errors, setErrors] = useState({
    category: false,
    description: false,
    apartment: false,
  });

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);
    dispatch(
      setEditRequest({
        name,
        value,
      })
    );
    setErrors({ ...errors, [name]: false });
  };

  const onClick = () => {
    const requestId = _id;
    const handymenId = handymen?._id;
    let _status = status ? "closed" : "open";
    let newErrors = {
      category: !category,
      description: !description,
      apartment: !apartment,
    };
    const everyFieldFilled = Object.values(newErrors).every((value) => !value);
    if (everyFieldFilled) {
      dispatch(
        editRequest({
          data: { requestId, description, status: _status, handymenId },
          navigate,
        })
      );
    } else {
      setErrors(newErrors);
    }
  };

  useEffect(() => {}, []);
  const isDisabled = !(isAdmin || isManager);
  const isDescDisabled = !(isAdmin || isManager || isTenant);

  return (
    <Fragment>
      <FormLayout>
        <Card>
          <div className="card-title">Edit Request</div>
          <div className="card-form-inputs-container">
            <div className="card-form-input">
              <Autocomplete
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
                  onChange({
                    target: {
                      name: "apartment",
                      value: newValue,
                    },
                  });
                }}
                value={apartment}
                disabled={true}
              />
            </div>
            {(isAdmin || isManager) && (
              <div className="card-form-input">
                <Autocomplete
                  options={crews}
                  getOptionLabel={(option) => option.name}
                  name={"handymen"}
                  renderInput={(params) => (
                    <TextField {...params} label="Handyman" />
                  )}
                  onChange={(event, newValue) => {
                    onChange({
                      target: {
                        name: "handymen",
                        value: newValue,
                      },
                    });
                  }}
                  value={handymen}
                />
              </div>
            )}

            <div className="card-form-input">
              <Autocomplete
                options={Profession}
                getOptionLabel={(option) => option}
                name={"category"}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    error={errors.category}
                    helperText={errors.category ? "Category is required" : ""}
                  />
                )}
                onChange={(event, newValue) => {
                  onChange({
                    target: {
                      name: "category",
                      value: newValue,
                    },
                  });
                }}
                value={category}
                disabled={isDisabled}
              />
            </div>
            <div className="card-form-input">
              <TextField
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                className="w-100"
                name={"description"}
                value={description}
                onChange={onChange}
                disabled={isDescDisabled}
                error={errors.description}
                helperText={errors.description ? "Description is required" : ""}
              />
            </div>
            {!isTenant && (
              <div className="card-form-input switch justify-flex-end">
                <div className="switch-title">Status:</div>
                <span className="switch-value-label">Open</span>
                <div className="switch-container">
                  <Switch
                    inputProps={{ "aria-label": "controlled" }}
                    name="status"
                    checked={status}
                    onChange={(e) => {
                      const value = !status;
                      onChange({
                        target: {
                          name: "status",
                          value,
                        },
                      });
                    }}
                  />
                </div>
                <span className="switch-value-label">Closed</span>
              </div>
            )}

            <div className="card-btn-container dual">
              <Button
                variant="contained"
                className="card-btn dual cancel"
                onClick={() => navigate("/viewRequests")}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="card-btn dual"
                onClick={onClick}
              >
                Update Request
              </Button>
            </div>
          </div>
          <Loader />
        </Card>
      </FormLayout>
    </Fragment>
  );
};

export default withDashboard(AddRequest);
