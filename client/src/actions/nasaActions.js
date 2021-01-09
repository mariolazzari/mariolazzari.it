import { GET_NASA_PODS, SET_NASA_PODS_LOADING } from "../actions/types";
import { setError } from "./appActions";
import api from "../utils/api";

// set nasa pods loading
const setNasaPodsLoading = (status = true) => ({
  type: SET_NASA_PODS_LOADING,
  payload: status,
});

// get nasa pods
export const getNasaPods = (search = "") => async dispatch => {
  setNasaPodsLoading();
  const { data, error } = await api.get("/nasa/pod?search=" + search);
  if (error) {
    setError(error);
  } else {
    dispatch({ type: GET_NASA_PODS, payload: data });
  }
  setNasaPodsLoading(false);
};
