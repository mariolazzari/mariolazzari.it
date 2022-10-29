// https://metmuseum.github.io/#search
import axios from "axios";

// dept list
export const getDepartments = async () => {
  try {
    const { data } = await axios.get(
      "https://collectionapi.metmuseum.org/public/collection/v1/departments"
    );

    return { data, error: "" };
  } catch (ex) {
    return { data: [], error: ex.message };
  }
};
