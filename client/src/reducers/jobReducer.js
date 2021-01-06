import { GET_JOBS } from "../actions/types";

// initial state
const initialState = {
  jobs: [],
  jobsLoading: false,
};

// skill reducer
const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_JOBS:
      return { ...state, jobs: action.payload, jobsLoading: false };

    default:
      return state;
  }
};

// export reducer
export default jobReducer;
