import { GET_LAST_CERTIFICATIONS } from "../actions/types";

// initial state
const initialState = {
  certification: null,
  certifications: [],
  certificationsLast: [],
  certificationsLoading: false,
};

// reducer
const certificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LAST_CERTIFICATIONS:
      return { ...state, certificationsLast: action.payload };

    default:
      return state;
  }
};

// export
export default certificationReducer;
