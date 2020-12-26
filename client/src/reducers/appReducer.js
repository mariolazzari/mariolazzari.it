// App reducer
import { SET_LOCALE } from "../actions/types";

// initial state
const initState = {
  locale: "it",
};

// app reducer
const appReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOCALE: {
      return { ...state, locale: action.payload };
    }

    default:
      return state;
  }
};

// export app reduver
export default appReducer;
