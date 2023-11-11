import { SET_USER } from "../actions/types";
const initialState = {
  email: "",
  password: "",
  selectedType: "admin",
  currentUser: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    }
    default:
      return state;
  }
};
