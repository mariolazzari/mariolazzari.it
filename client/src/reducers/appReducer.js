// App reducer
import { SET_LOCALE } from "../actions/types";
// locales
import messages_EN from "../locales/en.json";
import messages_IT from "../locales/it.json";

// initial state
const initState = {
  locale: "en",
  messages: new Map([
    ["en", messages_EN],
    ["it", messages_IT],
  ]),
  drawerOpen: false,
  menuOptions: [],
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
