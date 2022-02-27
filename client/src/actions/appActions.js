// App actions
import {
  SET_LOCALE,
  SET_SELECTED_ROUTE,
  SET_DRAWER_OPEN,
  SET_SUCCESS,
  SET_ERROR,
  SET_FLAG,
} from "./types";

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

// set error message
export const setError = (error = "") => ({
  type: SET_ERROR,
  payload: error,
});

// set success message
export const setSuccess = (success = "") => ({
  type: SET_SUCCESS,
  payload: success,
});

// set flag
export const setFlag = (flag = "it") => ({
  type: SET_FLAG,
  payload: `/images/locales/${flag}.png`,
});
