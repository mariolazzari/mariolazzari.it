// Social reducer
import { GET_SOCIALS } from "../actions/types";

// intital state
const intitialState = {
  mail: "mario.lazzari@gmail.com",
  mailTo: "mailto:mario.lazzari@gmail.com",
  socials: [],
};

// reducer
const socialReducer = (state = intitialState, action) => {
  switch (action.type) {
    case GET_SOCIALS:
      return { ...state, socials: action.payload };

    default:
      return state;
  }
};

// export reducer
export default socialReducer;
