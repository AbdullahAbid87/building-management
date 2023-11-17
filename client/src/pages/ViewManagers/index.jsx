import { Fragment } from "react";
import withDashboard from "../../HOC/withDashboard";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import { useEffect } from "react";
import {
  getManagers,
  removeManager,
  setAdmin,
  setSearchManager,
} from "../../redux/actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ButtonBase, Button, InputAdornment, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import SearchIcon from "@mui/icons-material/Search";

const ViewManagers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Admin = useSelector(({ Admin }) => Admin);
  const {
    filteredManagers,
    paginatedManagers,
    currentManagerPage,
    totalManagerPages,
    managerPerPage,
    managerSearch,
  } = Admin;

  useEffect(() => {
    dispatch(getManagers());
    // eslint-disable-next-line
  }, []);

  const onEdit = (manager) => {
    let { _id, name, email, phoneNumber, building } = manager;

    const data = {
      name,
      email,
      phoneNumber,
      building,
      _id,
      password: "",
      confirmPassword: "",
    };
    dispatch(
      setAdmin({
        name: "editManagerForm",
        value: data,
      })
    );
    navigate("/editManager");
  };

  const onDelete = async (manager) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this building, you won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete Manager",
      cancelButtonText: "No",
    });
    const managerId = manager._id;

    if (result.isConfirmed) {
      dispatch(
        removeManager({
          data: {
            managerId,
          },
        })
      );
    }
  };

  const setTotalPages = (totalpages) => {
    dispatch(
      setAdmin({
        name: "totalManagerPages",
        value: totalpages,
      })
    );
  };
  const setCurrentPage = (currentPage) => {
    dispatch(
      setAdmin({
        name: "currentManagerPage",
        value: currentPage,
      })
    );
  };
  const setPaginatedItems = (paginatedItems) => {
    dispatch(
      setAdmin({
        name: "paginatedManagers",
        value: paginatedItems,
      })
    );
  };
  const handleChangeRowsPerPage = (event) => {
    const value = event.target.value;
    dispatch(
      setAdmin({
        name: "managerPerPage",
        value,
      })
    );
  };

  const onSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearchManager(value));
    dispatch(
      setAdmin({
        name: "managerSearch",
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
            onClick={() => navigate("/addManager")}
          >
            <span>
              <AddIcon />
            </span>
            Add Manager
          </Button>
        </div>
        <Card className="table-card">
          <div className="table-title">
            <span>Managers Table</span>
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
                value={managerSearch}
              />
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <th>Building</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>action</th>
              </thead>
              <tbody>
                {paginatedManagers.map((manager) => (
                  <Fragment>
                    <tr>
                      <td>{manager.building.title}</td>
                      <td>{manager.name}</td>
                      <td>{manager.email}</td>
                      <td>{manager.phoneNumber}</td>
                      <td>
                        <div className="action-row">
                          <ButtonBase
                            className="action-btn edit"
                            onClick={() => onEdit(manager)}
                          >
                            <EditIcon />
                          </ButtonBase>
                          <ButtonBase
                            className="action-btn delete"
                            onClick={() => onDelete(manager)}
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
            currentPage={currentManagerPage}
            setCurrentPage={setCurrentPage}
            items={filteredManagers}
            totalPages={totalManagerPages}
            setTotalPages={setTotalPages}
            itemsPerPage={managerPerPage}
            setPaginatedItems={setPaginatedItems}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <Loader />
        </Card>
      </Layout>
    </Fragment>
  );
};

export default withDashboard(ViewManagers);
