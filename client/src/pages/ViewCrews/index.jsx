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
  removeCrew,
  removeTenant,
  setManager,
  setSearchCrew,
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

const ViewCrews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Manager = useSelector(({ Manager }) => Manager);
  const {
    crews,
    filteredCrews,
    paginatedCrews,
    currentCrewPage,
    totalCrewPages,
    crewPerPage,
    crewSearch,
  } = Manager;

  useEffect(() => {
    dispatch(getCrews());
  }, []);

  const onEdit = (crew) => {
    const data = crew;
    data.password = "";
    data.confirmPassword = "";
    dispatch(
      setManager({
        name: "editCrewForm",
        value: data,
      })
    );
    navigate("/editCrew");
  };

  const onDelete = async (crew) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this Crew Member, you won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete Crew Member",
      cancelButtonText: "No",
    });
    const crewId = crew._id;
    if (result.isConfirmed) {
      dispatch(
        removeCrew({
          data: {
            crewId,
          },
        })
      );
    }
  };

  const setTotalPages = (totalpages) => {
    dispatch(
      setManager({
        name: "totalCrewPages",
        value: totalpages,
      })
    );
  };
  const setCurrentPage = (currentPage) => {
    dispatch(
      setManager({
        name: "currentCrewPage",
        value: currentPage,
      })
    );
  };
  const setPaginatedItems = (paginatedItems) => {
    dispatch(
      setManager({
        name: "paginatedCrews",
        value: paginatedItems,
      })
    );
  };
  const handleChangeRowsPerPage = (event) => {
    const value = event.target.value;
    dispatch(
      setManager({
        name: "crewPerPage",
        value,
      })
    );
  };

  const onSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearchCrew(value));
    dispatch(
      setManager({
        name: "crewSearch",
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
            onClick={() => navigate("/addCrew")}
          >
            <span>
              <AddIcon />
            </span>
            Add Crew
          </Button>
        </div>
        <Card className="table-card">
          <div className="table-title">
            <span>Crew Member Table</span>
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
                value={crewSearch}
              />
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <th>Building</th>
                <th>Profession</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>action</th>
              </thead>
              <tbody>
                {paginatedCrews.map((crew) => (
                  <Fragment>
                    <tr>
                      <td>{crew.building.title}</td>
                      <td>{crew.profession}</td>
                      <td>{crew.name}</td>
                      <td>{crew.email}</td>
                      <td>{crew.phoneNumber}</td>
                      <td>
                        <div className="action-row">
                          <ButtonBase
                            className="action-btn edit"
                            onClick={() => onEdit(crew)}
                          >
                            <EditIcon />
                          </ButtonBase>
                          <ButtonBase
                            className="action-btn delete"
                            onClick={() => onDelete(crew)}
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
            currentPage={currentCrewPage}
            setCurrentPage={setCurrentPage}
            items={filteredCrews}
            totalPages={totalCrewPages}
            setTotalPages={setTotalPages}
            itemsPerPage={crewPerPage}
            setPaginatedItems={setPaginatedItems}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <Loader />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default withDashboard(ViewCrews);
