import { Card } from "@mui/material";
import React, { Fragment } from "react";
import Avatar from "../../assets/Avatar.jpg";
import "./index.css";

const Table = () => {
  return (
    <Fragment>
      <Card className="table-card">
        <div className="table-title">Tenant Table</div>
        <div className="table-container">
          <table>
            <thead>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Apartment No</th>
              <th>action</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="tenant-user-row">
                    <img src={Avatar} className="user-image" />
                    <div className="user-name">Abdullah Abid</div>
                  </div>
                </td>
                <td>abdullahabid427@gmail.com</td>
                <td>03155145023</td>
                <td>1</td>
                <td>Edit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </Fragment>
  );
};

export default Table;
