// App reducer
import {
  SET_LOCALE,
  SET_SELECTED_ROUTE,
  SET_DRAWER_OPEN,
} from "../actions/types";
// locales
import messages_EN from "../locales/en.json";
import messages_IT from "../locales/it.json";
import dates_EN from "date-fns/locale/en-GB";
import dates_IT from "date-fns/locale/it";

// initial state
const initState = {
  locale: "en",
  messages: new Map([
    ["en", messages_EN],
    ["it", messages_IT],
  ]),
  dates: new Map([
    ["en", dates_EN],
    ["it", dates_IT],
  ]),
  drawerOpen: false,
  menuOptions: [
    { label: "menu.home", path: "/" },
    { label: "menu.skills", path: "/skills" },
    { label: "menu.certifications", path: "/certifications" },
    { label: "menu.contacts", path: "/contacts" },
    { label: "menu.hobbies", path: "/hobbies" },
  ],
  selectedRoute: "/",
};

// app reducer
const appReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOCALE: {
      return { ...state, locale: action.payload };
    }

    case SET_SELECTED_ROUTE:
      return { ...state, selectedRoute: action.payload };

    case SET_DRAWER_OPEN:
      return { ...state, drawerOpen: action.payload };

    default:
      return state;
  }
};

// export app reduver
export default appReducer;
