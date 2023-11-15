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
  getCrews,
  getTenants,
  removeTenant,
  setSearchCrew,
  setSearchTenant,
} from "../../redux/actions/managerAction";
import {
  getRequests,
  setSearchRequest,
  setUser,
} from "../../redux/actions/userAction";
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

const ViewRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector(({ User }) => User);
  const {
    requests,
    filteredRequests,
    paginatedRequests,
    currentRequestPage,
    totalRequestPages,
    requestPerPage,
    requestSearch,
    currentUser,
  } = User;
  const isAdmin = currentUser?.type === "admin";
  const isManager = currentUser?.type === "manager";

  const onEdit = (request) => {
    let { category, _id, description, apartment, status, handymen } = request;
    const handymenUser = handymen?.length >= 1 ? handymen[0] : null;
    status = status === "closed";
    const data = {
      category,
      _id,
      description,
      apartment,
      status,
      handymen: handymenUser,
    };
    // const data = crew;
    // delete data.password;
    dispatch(
      setUser({
        name: "editRequestForm",
        value: data,
      })
    );
    navigate("/editRequest");
  };

  const onDelete = async (tenant) => {
    // const result = await Swal.fire({
    //   title: "Are you sure?",
    //   text: "You are about to delete this building, you won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, Delete Tenant",
    //   cancelButtonText: "No",
    // });
    // const tenantId = tenant._id;
    // if (result.isConfirmed) {
    //   dispatch(
    //     removeTenant({
    //       data: {
    //         tenantId,
    //       },
    //     })
    //   );
    // }
  };

  const setTotalPages = (totalpages) => {
    dispatch(
      setUser({
        name: "totalRequestPages",
        value: totalpages,
      })
    );
  };
  const setCurrentPage = (currentPage) => {
    dispatch(
      setUser({
        name: "currentRequestPage",
        value: currentPage,
      })
    );
  };
  const setPaginatedItems = (paginatedItems) => {
    dispatch(
      setUser({
        name: "paginatedRequests",
        value: paginatedItems,
      })
    );
  };
  const handleChangeRowsPerPage = (event) => {
    const value = event.target.value;
    dispatch(
      setUser({
        name: "requestPerPage",
        value,
      })
    );
  };

  const onSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearchRequest(value));
    dispatch(
      setUser({
        name: "requestSearch",
        value: value,
      })
    );
  };

  useEffect(() => {
    dispatch(getRequests());
    if (isAdmin || isManager) dispatch(getCrews());
  }, []);

  return (
    <Fragment>
      <Layout>
        <div className="add-btn-container">
          <Button
            variant="contained"
            className="add-btn"
            onClick={() => navigate("/addRequest")}
          >
            <span>
              <AddIcon />
            </span>
            Add Request
          </Button>
        </div>
        <Card className="table-card">
          <div className="table-title">
            <span>Requests Table</span>
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
                value={requestSearch}
              />
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <th>Building</th>
                <th>Apartment</th>
                {(isAdmin || isManager) && <th>Handyman</th>}
                <th>Category</th>
                <th>Description</th>
                <th>Status</th>
                <th>action</th>
              </thead>
              <tbody>
                {paginatedRequests.map((request) => (
                  <Fragment>
                    <tr>
                      <td>{request.building.title}</td>
                      <td>{request.apartment.apartmentTitle}</td>
                      {(isAdmin || isManager) && (
                        <td>
                          {request?.handymen.length >= 1
                            ? request?.handymen[0].name
                            : "Not Assigned"}
                        </td>
                      )}
                      <td>{request.category}</td>
                      <td>{request.description}</td>
                      <td>
                        <td>
                          {request.status === "open" ? (
                            <span className="isNotChecked center">
                              <CancelIcon />
                              <span> Open</span>
                            </span>
                          ) : (
                            <span className="isCheck center">
                              <CheckCircleIcon />
                              <span> Closed</span>
                            </span>
                          )}
                        </td>
                      </td>
                      <td>
                        <div className="action-row">
                          <ButtonBase
                            className="action-btn edit"
                            onClick={() => onEdit(request)}
                          >
                            <EditIcon />
                          </ButtonBase>
                          <ButtonBase
                            className="action-btn delete"
                            onClick={() => onDelete(request)}
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
            currentPage={currentRequestPage}
            setCurrentPage={setCurrentPage}
            items={filteredRequests}
            totalPages={totalRequestPages}
            setTotalPages={setTotalPages}
            itemsPerPage={requestPerPage}
            setPaginatedItems={setPaginatedItems}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <Loader />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default withDashboard(ViewRequests);
