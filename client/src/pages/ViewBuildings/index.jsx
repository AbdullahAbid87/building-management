import { Fragment } from "react";
import withDashboard from "../../HOC/withDashboard";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import "./index.css";
import { useEffect } from "react";
import {
  getBuildings,
  removeBuilding,
  setAdmin,
  setSearchBuilding,
} from "../../redux/actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ButtonBase, Button, InputAdornment, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import SearchIcon from "@mui/icons-material/Search";

const ViewBuildings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Admin = useSelector(({ Admin }) => Admin);
  const {
    buildings,
    filteredBuildings,
    paginatedBuildings,
    currentBuildingPage,
    totalBuildingPages,
    buildingPerPage,
    buildingSearch,
  } = Admin;
  useEffect(() => {
    dispatch(getBuildings());
    // eslint-disable-next-line
  }, [buildings]);

  const onEdit = (building) => {
    dispatch(
      setAdmin({
        name: "editBuildingForm",
        value: building,
      })
    );
    navigate("/editBuilding");
  };

  const onDelete = async (building) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this building, you won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete Building",
      cancelButtonText: "No",
    });
    const buildingId = building._id;

    if (result.isConfirmed) {
      dispatch(
        removeBuilding({
          data: {
            buildingId,
          },
        })
      );
    }
  };

  const setTotalPages = (totalpages) => {
    dispatch(
      setAdmin({
        name: "totalBuildingPages",
        value: totalpages,
      })
    );
  };
  const setCurrentPage = (currentPage) => {
    dispatch(
      setAdmin({
        name: "currentBuildingPage",
        value: currentPage,
      })
    );
  };
  const setPaginatedItems = (paginatedItems) => {
    dispatch(
      setAdmin({
        name: "paginatedBuildings",
        value: paginatedItems,
      })
    );
  };
  const handleChangeRowsPerPage = (event) => {
    const value = event.target.value;
    dispatch(
      setAdmin({
        name: "buildingPerPage",
        value,
      })
    );
  };

  const onSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearchBuilding(value));
    dispatch(
      setAdmin({
        name: "buildingSearch",
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
            onClick={() => navigate("/addBuilding")}
          >
            <span>
              <AddIcon />
            </span>
            Add Building
          </Button>
        </div>
        <Card className="table-card">
          <div className="table-title">
            <span>Building Table</span>
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
                value={buildingSearch}
              />
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <th>Title</th>
                <th>Address</th>
                <th>Number of Floors</th>
                <th>Building Type</th>
                <th>Parking Availability</th>
                <th>action</th>
              </thead>
              <tbody>
                {paginatedBuildings.map((building) => (
                  <Fragment>
                    <tr>
                      <td>{building.title}</td>
                      <td>{building.address}</td>
                      <td>{building.numberOfFloors}</td>
                      <td>{building.type}</td>
                      <td>
                        {building.parkingAvailability ? (
                          <span className="isCheck">
                            <CheckCircleIcon />
                          </span>
                        ) : (
                          <span className="isNotChecked">
                            <CancelIcon />
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="action-row">
                          <ButtonBase
                            className="action-btn edit"
                            onClick={() => onEdit(building)}
                          >
                            <EditIcon />
                          </ButtonBase>
                          <ButtonBase
                            className="action-btn delete"
                            onClick={() => onDelete(building)}
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
            currentPage={currentBuildingPage}
            setCurrentPage={setCurrentPage}
            items={filteredBuildings}
            totalPages={totalBuildingPages}
            setTotalPages={setTotalPages}
            itemsPerPage={buildingPerPage}
            setPaginatedItems={setPaginatedItems}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <Loader />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default withDashboard(ViewBuildings);
