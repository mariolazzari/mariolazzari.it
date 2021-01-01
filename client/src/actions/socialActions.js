import { GET_SOCIALS } from "./types";
import { setError } from "../actions/appActions";
import api from "../utils/api";

// get all social accounts
export const getSocials = () => async dispatch => {
  const { data, error } = await api.get("/socials");
  if (error) {
    setError("socials.error");
  } else {
    dispatch({ type: GET_SOCIALS, payload: data.results });
  }
};
