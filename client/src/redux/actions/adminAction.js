import { BASE_URL, SET_ADD_BUILDING, SET_ADMIN } from "./types";
import Axios from "axios";
import { setLoader } from "./userAction";

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

// Login a User
export const addBuilding =
  ({ data, navigate }) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      const type = data.type;
      const resp = await Axios.post(`${BASE_URL}/api/admin/addBuilding`, data, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoader(false));
  };
