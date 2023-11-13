import {
  SET_ADD_BUILDING,
  SET_ADD_MANAGER,
  SET_ADMIN,
  SET_EDIT_BUILDING,
  SET_EDIT_MANAGER,
  SET_SEARCH_BUILDING,
  SET_SEARCH_MANAGER,
} from "../actions/types";
const initialState = {
  // Building
  addBuildingForm: {
    title: "",
    address: "",
    type: "",
    numberOfFloors: "",
    parkingAvailability: false,
  },
  editBuildingForm: {
    title: "",
    address: "",
    type: "",
    numberOfFloors: "",
    parkingAvailability: false,
  },
  buildings: [],
  filteredBuildings: [],
  paginatedBuildings: [],
  currentBuildingPage: 1,
  totalBuildingPages: 1,
  buildingPerPage: 5,
  buildingSearch: "",
  // Manager
  addManagerForm: {
    building: {},
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  },
  editManagerForm: {
    building: {},
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  },
  managers: [],
  filteredManagers: [],
  paginatedManagers: [],
  currentManagerPage: 1,
  totalManagerPages: 1,
  managerPerPage: 5,
  managerSearch: "",
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
    case SET_EDIT_BUILDING: {
      return {
        ...state,
        editBuildingForm: {
          ...state.editBuildingForm,
          [action.payload.name]: action.payload.value,
        },
      };
    }
    case SET_SEARCH_BUILDING: {
      const value = action.payload;
      const filteredBuildings = state.buildings.filter((building) => {
        const regex = new RegExp(value, "i");
        const { title, address, numberOfFloors, type } = building;
        return (
          value === "" ||
          regex.test(title) ||
          regex.test(address) ||
          regex.test(numberOfFloors) ||
          regex.test(type)
        );
      });
      return { ...state, filteredBuildings, buildingSearch: value };
    }
    case SET_ADD_MANAGER: {
      return {
        ...state,
        addManagerForm: {
          ...state.addManagerForm,
          [action.payload.name]: action.payload.value,
        },
      };
    }
    case SET_SEARCH_MANAGER: {
      const value = action.payload;
      const filteredManagers = state.managers.filter((manager) => {
        const regex = new RegExp(value, "i");
        const { building, name, email, phoneNumber } = manager;
        const { title } = building;
        return (
          value === "" ||
          regex.test(title) ||
          regex.test(name) ||
          regex.test(email) ||
          regex.test(phoneNumber) ||
          regex.test(title)
        );
      });
      return { ...state, filteredManagers, managerSearch: value };
    }
    case SET_EDIT_MANAGER: {
      return {
        ...state,
        editManagerForm: {
          ...state.editManagerForm,
          [action.payload.name]: action.payload.value,
        },
      };
    }
    default:
      return state;
  }
};
