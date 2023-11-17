import Swal from "sweetalert2";
import {
  BASE_URL,
  CLEAR_ADD_REQUEST,
  CLEAR_STATE,
  SET_ADD_REQUEST,
  SET_EDIT_REQUEST,
  SET_PROFILE_FORM,
  SET_SEARCH_REQUEST,
  SET_USER,
} from "./types";
import Axios from "axios";

// Set overall Reducer
export const setUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// Set Loader
export const setLoader = (isLoading) => async (dispatch) => {
  try {
    dispatch({
      type: SET_USER,
      payload: {
        name: "isLoading",
        value: isLoading,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// Login a User
export const login =
  ({ data, navigate }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      const type = data.type;
      const resp = await Axios.post(`${BASE_URL}/api/${type}/login`, data, {
        withCredentials: true,
      });
      const currentUser = resp.data.user;
      dispatch(setUser({ name: "currentUser", value: currentUser }));
      navigate("/profile");
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

// Login a User
export const logout =
  ({ data, navigate }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      const type = data.type;
      await Axios.get(`${BASE_URL}/api/${type}/logout`, {
        withCredentials: true,
      });
      dispatch({ type: CLEAR_STATE });
      navigate("/");
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

export const loggedInUser =
  ({ navigate }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      const resp = await Axios.get(`${BASE_URL}/api/tenant/loggedIn`, {
        withCredentials: true,
      });
      const data = resp.data;
      const currentUser = data.user;
      dispatch(setUser({ name: "currentUser", value: currentUser }));
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoader(false));
  };

// Set add Request
export const setAddRequest = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_ADD_REQUEST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const clearAddRequest = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_ADD_REQUEST });
  } catch (error) {
    console.log(error);
  }
};

// Set edit Request
export const setEditRequest = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_EDIT_REQUEST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// Add Request
export const addRequest =
  ({ data, navigate }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      await Axios.post(`${BASE_URL}/api/tenant/addRequest`, data, {
        withCredentials: true,
      });
      navigate("/viewRequests");
      dispatch(getRequests());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Request Added",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(clearAddRequest());
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

// Edit Request
export const editRequest =
  ({ data, navigate }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      await Axios.post(`${BASE_URL}/api/tenant/updateRequest`, data, {
        withCredentials: true,
      });
      navigate("/viewRequests");
      dispatch(getRequests());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Request Updated",
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

// Get Requests
export const getRequests = () => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const resp = await Axios.get(`${BASE_URL}/api/tenant/requests`, {
      withCredentials: true,
    });
    const requests = resp.data.requests;
    dispatch(
      setUser({
        name: "requests",
        value: requests,
      })
    );
    dispatch(
      setUser({
        name: "filteredRequests",
        value: requests,
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

// Set edit Request
export const setSearchRequest = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_SEARCH_REQUEST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// Set Profile Form
export const setProfileForm = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_PROFILE_FORM, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// Get Apartments
export const getApartments = () => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const resp = await Axios.get(`${BASE_URL}/api/tenant/apartments`, {
      withCredentials: true,
    });
    const apartments = resp.data.apartments;
    dispatch(
      setUser({
        name: "apartments",
        value: apartments,
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

// Update Profile
export const updateProfile =
  ({ data }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      const resp = await Axios.post(
        `${BASE_URL}/api/tenant/updateProfile`,
        data,
        {
          withCredentials: true,
        }
      );
      const user = resp.data.user;
      dispatch(
        setUser({
          name: "currentUser",
          value: user,
        })
      );
      const { name, phoneNumber } = user;
      dispatch(
        setProfileForm({
          name: "name",
          value: name,
        })
      );
      dispatch(
        setProfileForm({
          name: "phoneNumber",
          value: phoneNumber,
        })
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile Updated",
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

// Get Apartments
export const googleLogin = () => async (dispatch) => {
  // dispatch(setLoader(true));
  try {
    const resp = await Axios.get(`${BASE_URL}/api/tenant/success`, {
      withCredentials: true,
    });
    // const resp = await Axios.get(`${BASE_URL}/api/tenant/google/callback`);
    const data = resp.data;
    console.log(data);
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
  // dispatch(setLoader(false));
};
