import React, { Fragment } from "react";
import withDashboard from "../../HOC/withDashboard";
import FormLayout from "../../components/FormLayout";
import Card from "../../components/Card";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

const AddTenant = () => {
  return (
    <Fragment>
      <FormLayout>
        <Card>
          <div className="card-title">Add Tenant</div>
          <div className="card-form-inputs-container">
            <div className="card-form-input">
              <TextField
                id="outlined-basic"
                label="Apartment No"
                variant="outlined"
                className="w-100"
              />
            </div>
            <div className="card-form-input">
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                className="w-100"
              />
            </div>
            <div className="card-form-input">
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                className="w-100"
              />
            </div>
            <div className="card-btn-container dual">
              <Button variant="contained" className="card-btn dual cancel">
                Cancel
              </Button>
              <Button variant="contained" className="card-btn dual">
                Add Tenant
              </Button>
            </div>
          </div>
        </Card>
      </FormLayout>
    </Fragment>
  );
};

export default withDashboard(AddTenant);
