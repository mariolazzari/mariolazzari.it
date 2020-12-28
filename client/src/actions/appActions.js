// App actions
import { SET_LOCALE, SET_SELECTED_ROUTE, SET_DRAWER_OPEN } from "./types";

// set app locale
export const setLocale = (locale = "en") => ({
  type: SET_LOCALE,
  payload: locale,
});

// set selected route
export const setSelectedRoute = (route = "/") => ({
  type: SET_SELECTED_ROUTE,
  payload: route,
});

// set drawer visibility
export const setDrawerOpen = (status = true) => ({
  type: SET_DRAWER_OPEN,
  payload: status,
});
