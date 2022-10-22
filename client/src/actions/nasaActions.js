import { GET_NASA_PODS, SET_NASA_PODS_LOADING } from "../actions/types";
import { setError } from "./appActions";
import api from "../api/nasa";
const apiKey = process.env.REACT_APP_NASA_API_KEY;

// set nasa pods loading
const setNasaPodsLoading = (status = true) => ({
  type: SET_NASA_PODS_LOADING,
  payload: status,
});

// get nasa pods
export const getNasaPods =
  (top = 10) =>
  async dispatch => {
    setNasaPodsLoading();
    const { data, error } = await api.get(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${top}`
      //`/planetary/apod?api_key=${apiKey}search=${search}`
    );

    console.log(data);

    if (error) {
      setError(error);
    } else {
      dispatch({ type: GET_NASA_PODS, payload: data });
    }
    setNasaPodsLoading(false);
  };
