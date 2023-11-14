import {
  BASE_URL,
  SET_ADD_APARTMENT,
  SET_ADD_CREW,
  SET_ADD_TENANT,
  SET_EDIT_APARTMENT,
  SET_EDIT_CREW,
  SET_EDIT_TENANT,
  SET_MANAGER,
  SET_SEARCH_APARTMENT,
  SET_SEARCH_CREW,
  SET_SEARCH_TENANT,
} from "./types";
import Axios from "axios";
import { setLoader } from "./userAction";
import Swal from "sweetalert2";

// Set overall Reducer
export const setManager = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_MANAGER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// Set add apartment form
export const setAddApartment = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_ADD_APARTMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const setEditApartment = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_EDIT_APARTMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getApartments = () => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const resp = await Axios.get(`${BASE_URL}/api/manager/apartments`, {
      withCredentials: true,
    });
    const apartments = resp.data.apartments;
    dispatch(
      setManager({
        name: "apartments",
        value: apartments,
      })
    );
    dispatch(
      setManager({
        name: "filteredApartments",
        value: apartments,
      })
    );
  } catch (error) {
    console.log(error);
  }
  dispatch(setLoader(false));
};

export const addApartment =
  ({ data, navigate }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      await Axios.post(`${BASE_URL}/api/manager/addApartment`, data, {
        withCredentials: true,
      });
      navigate("/viewApartments");
      dispatch(getApartments());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Apartment Added",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoader(false));
  };

export const editApartment =
  ({ data, navigate }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      await Axios.post(`${BASE_URL}/api/manager/updateApartment`, data, {
        withCredentials: true,
      });
      navigate("/viewApartments");
      dispatch(getApartments());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Apartment Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoader(false));
  };

export const removeApartment =
  ({ data }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      await Axios.post(`${BASE_URL}/api/manager/removeApartment`, data, {
        withCredentials: true,
      });
      dispatch(getApartments());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Apartment Deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoader(false));
  };

export const setSearchApartment = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_SEARCH_APARTMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// Set add apartment form
export const setAddTenant = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_ADD_TENANT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addTenant =
  ({ data, navigate }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      await Axios.post(`${BASE_URL}/api/manager/addTenant`, data, {
        withCredentials: true,
      });
      navigate("/viewTenants");
      dispatch(getTenants());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Tenant Added",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoader(false));
  };

export const getTenants = () => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const resp = await Axios.get(`${BASE_URL}/api/manager/tenants`, {
      withCredentials: true,
    });
    const tenants = resp.data.tenants;
    dispatch(
      setManager({
        name: "tenants",
        value: tenants,
      })
    );
    dispatch(
      setManager({
        name: "filteredTenants",
        value: tenants,
      })
    );
  } catch (error) {
    console.log(error);
  }
  dispatch(setLoader(false));
};

export const editTenant =
  ({ data, navigate }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      await Axios.post(`${BASE_URL}/api/manager/updateTenant`, data, {
        withCredentials: true,
      });
      navigate("/viewTenants");
      dispatch(getTenants());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Tenant Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoader(false));
  };

export const removeTenant =
  ({ data }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      await Axios.post(`${BASE_URL}/api/manager/removeTenant`, data, {
        withCredentials: true,
      });
      dispatch(getTenants());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Tenant Deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoader(false));
  };

export const setSearchTenant = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_SEARCH_TENANT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const setEditTenant = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_EDIT_TENANT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const setAddCrew = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_ADD_CREW, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addCrew =
  ({ data, navigate }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      await Axios.post(`${BASE_URL}/api/manager/addCrew`, data, {
        withCredentials: true,
      });
      navigate("/viewCrews");
      dispatch(getCrews());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Crew Added",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoader(false));
  };

export const editCrew =
  ({ data, navigate }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      await Axios.post(`${BASE_URL}/api/manager/updateCrew`, data, {
        withCredentials: true,
      });
      navigate("/viewCrews");
      dispatch(getCrews());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Crew Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoader(false));
  };

export const getCrews = () => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const resp = await Axios.get(`${BASE_URL}/api/manager/crew`, {
      withCredentials: true,
    });
    const crews = resp.data.crews;
    dispatch(
      setManager({
        name: "crews",
        value: crews,
      })
    );
    dispatch(
      setManager({
        name: "filteredCrews",
        value: crews,
      })
    );
  } catch (error) {
    console.log(error);
  }
  dispatch(setLoader(false));
};

export const setSearchCrew = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_SEARCH_CREW, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const setEditCrew = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_EDIT_CREW, payload: data });
  } catch (error) {
    console.log(error);
  }
};
