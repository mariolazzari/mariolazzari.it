// Skill action
import { GET_JOBS } from "./types";
import { setError } from "./appActions";
import api from "../utils/api";

// get all skills
export const getJobs = () => async dispatch => {
  const { data, error } = await api.get("/jobs");
  if (error) {
    setError(error);
  } else {
    dispatch({ type: GET_JOBS, payload: data.results });
  }
};
