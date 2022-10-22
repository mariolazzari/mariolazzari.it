import { GET_NASA_PODS, SET_NASA_PODS_LOADING } from "../actions/types";

// initial state
const initialState = {
  pods: [],
  podsLoadig: false,
  podToday: null,
};

// nasa reducer
const nasaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NASA_PODS_LOADING:
      return {
        ...state,
        podsLoading: action.payload,
      };

    case GET_NASA_PODS:
      return {
        ...state,
        pods: action.payload,
        podToday: action.payload.today,
      };

    default:
      return state;
  }
};

// export nasa reducer
export default nasaReducer;
