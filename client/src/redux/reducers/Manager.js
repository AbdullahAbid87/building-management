import {
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
} from "../actions/types";
const initialState = {
  // Apartment
  addApartmentForm: {
    building: null,
    apartmentTitle: "",
    numberOfBedrooms: "",
    numberOfBathrooms: "",
    floorLevel: "",
    monthlyRent: "",
  },
  editApartmentForm: {
    building: null,
    apartmentTitle: "",
    numberOfBedrooms: "",
    numberOfBathrooms: "",
    floorLevel: "",
    monthlyRent: "",
  },
  apartments: [],
  filteredApartments: [],
  paginatedApartments: [],
  currentApartmentPage: 1,
  totalApartmentPages: 1,
  apartmentPerPage: 5,
  apartmentSearch: "",
  // Tenant
  addTenantForm: {
    building: null,
    apartment: null,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  },
  editTenantForm: {
    building: null,
    apartment: null,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  },
  tenants: [],
  filteredTenants: [],
  paginatedTenants: [],
  currentTenantPage: 1,
  totalTenantPages: 1,
  tenantPerPage: 5,
  tenantSearch: "",
  // Crew
  addCrewForm: {
    building: null,
    profession: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  },
  editCrewForm: {
    building: null,
    profession: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  },
  crews: [],
  filteredCrews: [],
  paginatedCrews: [],
  currentCrewPage: 1,
  totalCrewPages: 1,
  crewPerPage: 5,
  crewSearch: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MANAGER: {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    }
    case SET_ADD_APARTMENT: {
      return {
        ...state,
        addApartmentForm: {
          ...state.addApartmentForm,
          [action.payload.name]: action.payload.value,
        },
      };
    }
    case SET_EDIT_APARTMENT: {
      return {
        ...state,
        editApartmentForm: {
          ...state.editApartmentForm,
          [action.payload.name]: action.payload.value,
        },
      };
    }
    case SET_ADD_TENANT: {
      return {
        ...state,
        addTenantForm: {
          ...state.addTenantForm,
          [action.payload.name]: action.payload.value,
        },
      };
    }
    case SET_ADD_CREW: {
      return {
        ...state,
        addCrewForm: {
          ...state.addCrewForm,
          [action.payload.name]: action.payload.value,
        },
      };
    }
    case SET_EDIT_CREW: {
      return {
        ...state,
        editCrewForm: {
          ...state.editCrewForm,
          [action.payload.name]: action.payload.value,
        },
      };
    }
    case SET_EDIT_TENANT: {
      return {
        ...state,
        editTenantForm: {
          ...state.editTenantForm,
          [action.payload.name]: action.payload.value,
        },
      };
    }
    case SET_SEARCH_APARTMENT: {
      const value = action.payload;
      const filteredApartments = state.apartments.filter((apartment) => {
        const regex = new RegExp(value, "i");
        const { apartmentTitle, monthlyRent } = apartment;

        return (
          value === "" ||
          regex.test(apartmentTitle) ||
          regex.test(monthlyRent) ||
          regex.test(apartment.building.title)
        );
      });
      return { ...state, filteredApartments, apartmentSearch: value };
    }
    case SET_SEARCH_TENANT: {
      const value = action.payload;
      const filteredTenants = state.tenants.filter((tenant) => {
        const regex = new RegExp(value, "i");
        const { name, email, phoneNumber, building, apartment } = tenant;
        const { title } = building;
        const { apartmentTitle } = apartment;
        return (
          value === "" ||
          regex.test(name) ||
          regex.test(email) ||
          regex.test(phoneNumber) ||
          regex.test(title) ||
          regex.test(apartmentTitle)
        );
      });
      return { ...state, filteredTenants, tenantSearch: value };
    }
    case SET_SEARCH_CREW: {
      const value = action.payload;
      const filteredCrews = state.crews.filter((crew) => {
        const regex = new RegExp(value, "i");
        const { name, email, phoneNumber, building, profession } = crew;
        const { title } = building;
        return (
          value === "" ||
          regex.test(name) ||
          regex.test(email) ||
          regex.test(phoneNumber) ||
          regex.test(title) ||
          regex.test(profession)
        );
      });
      return { ...state, filteredCrews, crewSearch: value };
    }
    default:
      return state;
  }
};
