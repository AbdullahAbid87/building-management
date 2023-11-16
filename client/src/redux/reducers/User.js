import {
  CLEAR_STATE,
  SET_ADD_REQUEST,
  SET_EDIT_REQUEST,
  SET_PROFILE_FORM,
  SET_SEARCH_REQUEST,
  SET_USER,
} from "../actions/types";
const initialState = {
  email: "",
  password: "",
  selectedType: "admin",
  currentUser: null,
  isLoading: false,
  sidebarOpen: true,
  // Tenant
  addRequestForm: {
    apartment: null,
    category: "",
    description: "",
    handymen: null,
    status: false,
  },
  editRequestForm: {
    apartment: null,
    category: "",
    description: "",
    handymen: null,
  },
  requests: [],
  filteredRequests: [],
  paginatedRequests: [],
  currentRequestPage: 1,
  totalRequestPages: 1,
  requestPerPage: 5,
  requestSearch: "",
  apartments: [],
  profileForm: {
    name: "",
    email: "",
    type: "",
    phoneNumber: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    }
    case SET_PROFILE_FORM: {
      return {
        ...state,
        profileForm: {
          ...state.profileForm,
          [action.payload.name]: action.payload.value,
        },
      };
    }
    case SET_ADD_REQUEST: {
      return {
        ...state,
        addRequestForm: {
          ...state.addRequestForm,
          [action.payload.name]: action.payload.value,
        },
      };
    }
    case SET_SEARCH_REQUEST: {
      const value = action.payload;
      const filteredRequests = state.requests.filter((request) => {
        const regex = new RegExp(value, "i");
        const { category, building, apartment, status } = request;
        const { apartmentTitle } = apartment;
        const { title } = building;
        return (
          value === "" ||
          regex.test(apartmentTitle) ||
          regex.test(category) ||
          regex.test(title) ||
          regex.test(status)
        );
      });
      return { ...state, filteredRequests, requestSearch: value };
    }
    case SET_EDIT_REQUEST: {
      return {
        ...state,
        editRequestForm: {
          ...state.editRequestForm,
          [action.payload.name]: action.payload.value,
        },
      };
    }
    case SET_EDIT_REQUEST: {
      return {
        ...state,
        editRequestForm: {
          ...state.editRequestForm,
          [action.payload.name]: action.payload.value,
        },
      };
    }
    case CLEAR_STATE: {
      return initialState;
    }
    default:
      return state;
  }
};
