import React, { Fragment } from "react";
import withDashboard from "../../HOC/withDashboard";
import FormLayout from "../../components/FormLayout";
import Card from "../../components/Card";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

const AddApartment = () => {
  return (
    <Fragment>
      <FormLayout>
        <Card>
          <div className="card-title">Add Apartment</div>
          <div className="card-form-inputs-container">
            <div className="card-form-input">
              <TextField
                id="outlined-basic"
                label="Apartment Title"
                variant="outlined"
                className="w-100"
              />
            </div>
            <div className="card-form-input">
              <TextField
                id="outlined-basic"
                label="Number of Bedrooms"
                variant="outlined"
                className="w-100"
              />
            </div>
            <div className="card-form-input">
              <TextField
                id="outlined-basic"
                label="Number of Bathrooms"
                variant="outlined"
                className="w-100"
              />
            </div>
            <div className="card-form-input">
              <TextField
                id="outlined-basic"
                label="Floor Level"
                variant="outlined"
                className="w-100"
              />
            </div>
            <div className="card-form-input">
              <TextField
                id="outlined-basic"
                label="Monthly Rent"
                variant="outlined"
                className="w-100"
              />
            </div>
            <div className="card-btn-container dual">
              <Button variant="contained" className="card-btn dual cancel">
                Cancel
              </Button>
              <Button variant="contained" className="card-btn dual">
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
