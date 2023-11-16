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
  getApartments,
  getRequests,
  setAddRequest,
} from "../../redux/actions/userAction";
import Profession from "../../constants/Profession";

const AddRequest = () => {
  const User = useSelector(({ User }) => User);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addRequestForm, apartments } = User;
  const { category, description, apartment } = addRequestForm;
  const [errors, setErrors] = useState({
    category,
    description,
    apartment,
  });

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(
      setAddRequest({
        name,
        value,
      })
    );
    setErrors({ ...errors, [name]: false });
  };

  const onClick = () => {
    const apartmentId = apartment?._id;
    let newErrors = {
      category: !category,
      description: !description,
      apartment: !apartment,
    };
    const everyFieldFilled = Object.values(newErrors).every((value) => !value);
    if (everyFieldFilled) {
      dispatch(
        addRequest({
          data: {
            apartmentId,
            category,
            description,
          },
          navigate,
        })
      );
    } else {
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    dispatch(getApartments());
  }, []);

  return (
    <Fragment>
      <FormLayout>
        <Card>
          <div className="card-title">Add Request</div>
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
              />
            </div>
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
                error={errors.description}
                helperText={errors.description ? "Description is required" : ""}
              />
            </div>

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
                Add Request
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
