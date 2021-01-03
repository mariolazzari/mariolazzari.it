// Skill action
import { GET_SKILLS } from "./types";
import { setError } from "./appActions";
import api from "../utils/api";

// get all skills
export const getSkills = () => async dispatch => {
  const { data, error } = await api.get("/skills");
  if (error) {
    setError(error);
  } else {
    dispatch({ type: GET_SKILLS, payload: data.results });
  }
};
