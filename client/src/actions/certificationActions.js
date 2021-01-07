// Certificationactions
import api from "../utils/api";
import { GET_LAST_CERTIFICATIONS, GET_CERTIFICATIONS } from "./types";

// get last 4 certifications
export const getLastCertifiations = (limit = 4) => async dispatch => {
  const apiUrl = `/certifications?sort=-date&limit=${limit}`;
  const { data, error } = await api.get(apiUrl);
  if (error) {
    console.log(error);
  } else {
    dispatch({ type: GET_LAST_CERTIFICATIONS, payload: data.results });
  }
};

// get all certifications
export const getCertifiations = () => async dispatch => {
  const apiUrl = `/certifications?sort=-date`;
  const { data, error } = await api.get(apiUrl);
  if (error) {
    console.log(error);
  } else {
    dispatch({ type: GET_CERTIFICATIONS, payload: data.results });
  }
};
