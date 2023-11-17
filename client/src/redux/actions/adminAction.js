import {
  BASE_URL,
  CLEAR_ADD_BUILDING,
  CLEAR_ADD_MANAGER,
  SET_ADD_BUILDING,
  SET_ADD_MANAGER,
  SET_ADMIN,
  SET_EDIT_BUILDING,
  SET_EDIT_MANAGER,
  SET_SEARCH_BUILDING,
  SET_SEARCH_MANAGER,
} from "./types";
import Axios from "axios";
import { setLoader } from "./userAction";
import Swal from "sweetalert2";

// Set overall Reducer
export const setAdmin = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_ADMIN, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const setAddBuilding = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_ADD_BUILDING, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const clearAddBuilding = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_ADD_BUILDING });
  } catch (error) {
    console.log(error);
  }
};

export const setEditBuilding = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_EDIT_BUILDING, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const setSearchBuilding = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_SEARCH_BUILDING, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addBuilding =
  ({ data, navigate }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      await Axios.post(`${BASE_URL}/api/admin/addBuilding`, data, {
        withCredentials: true,
      });
      navigate("/viewBuildings");
      dispatch(getBuildings());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Building Added",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(clearAddBuilding());
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoader(false));
  };

export const editBuilding =
  ({ data, navigate }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      await Axios.post(`${BASE_URL}/api/admin/updateBuilding`, data, {
        withCredentials: true,
      });
      navigate("/viewBuildings");
      dispatch(getBuildings());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Building Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoader(false));
  };

export const removeBuilding =
  ({ data }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      await Axios.post(`${BASE_URL}/api/admin/removeBuilding`, data, {
        withCredentials: true,
      });
      dispatch(getBuildings());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Building Deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoader(false));
  };

export const getBuildings = () => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const resp = await Axios.get(`${BASE_URL}/api/admin/getBuildings`, {
      withCredentials: true,
    });
    const buildings = resp.data.buildings;
    dispatch(
      setAdmin({
        name: "buildings",
        value: buildings,
      })
    );
    dispatch(
      setAdmin({
        name: "filteredBuildings",
        value: buildings,
      })
    );
  } catch (error) {
    console.log(error);
  }
  dispatch(setLoader(false));
};

export const setAddManager = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_ADD_MANAGER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const clearAddManager = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_ADD_MANAGER });
  } catch (error) {
    console.log(error);
  }
};

export const setEditManager = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_EDIT_MANAGER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addManager =
  ({ data, navigate }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      await Axios.post(`${BASE_URL}/api/admin/addManager`, data, {
        withCredentials: true,
      });
      navigate("/viewManagers");
      dispatch(getManagers());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Manager Added",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(clearAddManager());
    } catch (error) {
      const response = error?.response;
      const data = response?.data;
      const errorMsg = data?.errorMsg;
      if (errorMsg) {
        Swal.fire({
          icon: "error",
          title: "Error Occured",
          text: errorMsg,
        });
      }
      console.log(error);
    }
    dispatch(setLoader(false));
  };

export const editManager =
  ({ data, navigate }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      await Axios.post(`${BASE_URL}/api/admin/updateManager`, data, {
        withCredentials: true,
      });
      navigate("/viewManagers");
      dispatch(getManagers());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Manager Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      const response = error?.response;
      const data = response?.data;
      const errorMsg = data?.errorMsg;
      if (errorMsg) {
        Swal.fire({
          icon: "error",
          title: "Error Occured",
          text: errorMsg,
        });
      }
      console.log(error);
    }
    dispatch(setLoader(false));
  };

export const removeManager =
  ({ data }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      await Axios.post(`${BASE_URL}/api/admin/removeManager`, data, {
        withCredentials: true,
      });
      dispatch(getManagers());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Manager Deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      const response = error?.response;
      const data = response?.data;
      const errorMsg = data?.errorMsg;
      if (errorMsg) {
        Swal.fire({
          icon: "error",
          title: "Error Occured",
          text: errorMsg,
        });
      }
      console.log(error);
    }
    dispatch(setLoader(false));
  };

export const getManagers = () => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const resp = await Axios.get(`${BASE_URL}/api/admin/managers`, {
      withCredentials: true,
    });
    const managers = resp.data.managers;
    dispatch(
      setAdmin({
        name: "managers",
        value: managers,
      })
    );
    dispatch(
      setAdmin({
        name: "filteredManagers",
        value: managers,
      })
    );
  } catch (error) {
    const response = error?.response;
    const data = response?.data;
    const errorMsg = data?.errorMsg;
    if (errorMsg) {
      Swal.fire({
        icon: "error",
        title: "Error Occured",
        text: errorMsg,
      });
    }
    console.log(error);
  }
  dispatch(setLoader(false));
};

export const setSearchManager = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_SEARCH_MANAGER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
