import React, { Fragment } from "react";
import withDashboard from "../../HOC/withDashboard";
import Card from "../../components/Card";
import Table from "../../components/Table";
import Layout from "../../components/Layout";
import Avatar from "../../assets/Avatar.jpg";
import { useEffect } from "react";
import {
  getBuildings,
  getManagers,
  removeBuilding,
  setSearchBuilding,
  setSearchManager,
} from "../../redux/actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ButtonBase,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import {
  getApartments,
  removeApartment,
  setManager,
  setSearchApartment,
} from "../../redux/actions/managerAction";

const ViewApartments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Admin = useSelector(({ Admin }) => Admin);
  const Manager = useSelector(({ Manager }) => Manager);
  const {
    apartments,
    filteredApartments,
    paginatedApartments,
    currentApartmentPage,
    totalApartmentPages,
    apartmentPerPage,
    apartmentSearch,
  } = Manager;

  useEffect(() => {
    dispatch(getApartments());
  }, []);

  const onEdit = (apartment) => {
    dispatch(
      setManager({
        name: "editApartmentForm",
        value: apartment,
      })
    );
    navigate("/editApartment");
  };

  const onDelete = async (apartment) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this Apartment, you won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete Apartment",
      cancelButtonText: "No",
    });
    const apartmentId = apartment._id;
    if (result.isConfirmed) {
      dispatch(
        removeApartment({
          data: {
            apartmentId,
          },
        })
      );
    }
  };

  const setTotalPages = (totalpages) => {
    dispatch(
      setManager({
        name: "totalApartmentPages",
        value: totalpages,
      })
    );
  };
  const setCurrentPage = (currentPage) => {
    dispatch(
      setManager({
        name: "currentApartmentPage",
        value: currentPage,
      })
    );
  };
  const setPaginatedItems = (paginatedItems) => {
    dispatch(
      setManager({
        name: "paginatedApartments",
        value: paginatedItems,
      })
    );
  };
  const handleChangeRowsPerPage = (event) => {
    const value = event.target.value;
    dispatch(
      setManager({
        name: "apartmentPerPage",
        value,
      })
    );
  };

  const onSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearchApartment(value));
    dispatch(
      setManager({
        name: "apartmentSearch",
        value: value,
      })
    );
  };
  return (
    <Fragment>
      <Layout>
        <div className="add-btn-container">
          <Button
            variant="contained"
            className="add-btn"
            onClick={() => navigate("/addApartment")}
          >
            <span>
              <AddIcon />
            </span>
            Add Apartment
          </Button>
        </div>
        <Card className="table-card">
          <div className="table-title">
            <span>Apartments Table</span>
            <div>
              <TextField
                fullWidth
                variant="standard"
                className="search-input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon style={{ color: "white" }} />
                    </InputAdornment>
                  ),
                }}
                onChange={onSearch}
                value={apartmentSearch}
              />
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <th>Building</th>
                <th>Title</th>
                <th>No of Bathrooms</th>
                <th>No of Bedrooms</th>
                <th>Floor Level</th>
                <th>Monthly Rent</th>
                <th>action</th>
              </thead>
              <tbody>
                {paginatedApartments.map((apartment) => (
                  <Fragment>
                    <tr>
                      <td>{apartment.building.title}</td>
                      <td>{apartment.apartmentTitle}</td>
                      <td>{apartment.numberOfBedrooms}</td>
                      <td>{apartment.numberOfBathrooms}</td>
                      <td>{apartment.floorLevel}</td>
                      <td>{apartment.monthlyRent}</td>
                      <td>
                        <div className="action-row">
                          <ButtonBase
                            className="action-btn edit"
                            onClick={() => onEdit(apartment)}
                          >
                            <EditIcon />
                          </ButtonBase>
                          <ButtonBase
                            className="action-btn delete"
                            onClick={() => onDelete(apartment)}
                          >
                            <DeleteIcon />
                          </ButtonBase>
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentApartmentPage}
            setCurrentPage={setCurrentPage}
            items={filteredApartments}
            totalPages={totalApartmentPages}
            setTotalPages={setTotalPages}
            itemsPerPage={apartmentPerPage}
            setPaginatedItems={setPaginatedItems}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <Loader />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default withDashboard(ViewApartments);
