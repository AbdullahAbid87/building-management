import { SET_ADD_BUILDING, SET_ADMIN } from "../actions/types";
const initialState = {
  addBuildingForm: {
    title: "",
    address: "",
    type: "",
    numberOfFloors: "",
    parkingAvailability: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ADMIN: {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    }
    case SET_ADD_BUILDING: {
      return {
        ...state,
        addBuildingForm: {
          ...state.addBuildingForm,
          [action.payload.name]: action.payload.value,
        },
      };
    }
    default:
      return state;
  }
};
