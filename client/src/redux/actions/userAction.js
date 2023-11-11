import { BASE_URL, SET_USER } from "./types";
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
      console.log(error);
    }
    dispatch(setLoader(false));
  };
