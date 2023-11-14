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
  removeManager,
  setSearchBuilding,
  setSearchManager,
} from "../../redux/actions/adminAction";
import {
  getTenants,
  removeTenant,
  setManager,
  setSearchTenant,
} from "../../redux/actions/managerAction";
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

const ViewTenants = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Manager = useSelector(({ Manager }) => Manager);
  const {
    tenants,
    filteredTenants,
    paginatedTenants,
    currentTenantPage,
    totalTenantPages,
    tenantPerPage,
    tenantSearch,
  } = Manager;

  useEffect(() => {
    dispatch(getTenants());
  }, []);

  const onEdit = (tenant) => {
    const data = tenant;
    delete data.password;
    dispatch(
      setManager({
        name: "editTenantForm",
        value: data,
      })
    );
    navigate("/editTenant");
  };

  const onDelete = async (tenant) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this building, you won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete Tenant",
      cancelButtonText: "No",
    });
    const tenantId = tenant._id;
    if (result.isConfirmed) {
      dispatch(
        removeTenant({
          data: {
            tenantId,
          },
        })
      );
    }
  };

  const setTotalPages = (totalpages) => {
    dispatch(
      setManager({
        name: "totalTenantPages",
        value: totalpages,
      })
    );
  };
  const setCurrentPage = (currentPage) => {
    dispatch(
      setManager({
        name: "currentTenantPage",
        value: currentPage,
      })
    );
  };
  const setPaginatedItems = (paginatedItems) => {
    dispatch(
      setManager({
        name: "paginatedTenants",
        value: paginatedItems,
      })
    );
  };
  const handleChangeRowsPerPage = (event) => {
    const value = event.target.value;
    dispatch(
      setManager({
        name: "tenantPerPage",
        value,
      })
    );
  };

  const onSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearchTenant(value));
    dispatch(
      setManager({
        name: "tenantSearch",
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
            onClick={() => navigate("/addTenant")}
          >
            <span>
              <AddIcon />
            </span>
            Add Tenant
          </Button>
        </div>
        <Card className="table-card">
          <div className="table-title">
            <span>Tenants Table</span>
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
                value={tenantSearch}
              />
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <th>Building</th>
                <th>Apartment</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>action</th>
              </thead>
              <tbody>
                {paginatedTenants.map((tenant) => (
                  <Fragment>
                    <tr>
                      <td>{tenant.building.title}</td>
                      <td>{tenant.apartment.apartmentTitle}</td>
                      <td>{tenant.name}</td>
                      <td>{tenant.email}</td>
                      <td>{tenant.phoneNumber}</td>
                      <td>
                        <div className="action-row">
                          <ButtonBase
                            className="action-btn edit"
                            onClick={() => onEdit(tenant)}
                          >
                            <EditIcon />
                          </ButtonBase>
                          <ButtonBase
                            className="action-btn delete"
                            onClick={() => onDelete(tenant)}
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
            currentPage={currentTenantPage}
            setCurrentPage={setCurrentPage}
            items={filteredTenants}
            totalPages={totalTenantPages}
            setTotalPages={setTotalPages}
            itemsPerPage={tenantPerPage}
            setPaginatedItems={setPaginatedItems}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <Loader />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default withDashboard(ViewTenants);
