// https://metmuseum.github.io/#search
import axios from "axios";

// Metropolitan museum client
const api = axios.create({
  baseURL: "https://collectionapi.metmuseum.org/public/collection/v1",
  responseType: "json",
});

// dept list
export const getDepartments = async () => {
  try {
    const { data } = await api.get("/departments");
    return { data, error: "" };
  } catch (ex) {
    return { data: [], error: ex.message };
  }
};

export const searchImages = async (term = "Rembrant", page = 1) => {
  try {
    const { data } = await api.get("/search?q=" + term);
    const ids = data.objectIDs.slice(10 * (page - 1), 10 + page);

    const images = [];
    for await (const id of ids) {
      const res = await api.get(`/objects/${id}`);
      const {
        title,
        primaryImage,
        primaryImageSmall,
        creditLine,
        medium,
        dimensions,
      } = res.data;

      images.push({
        id,
        title,
        primaryImage,
        primaryImageSmall,
        creditLine,
        medium,
        dimensions,
      });
    }

    return { data: images, error: "" };
  } catch (ex) {
    return { data: [], error: ex.message };
  }
};

const met = { getDepartments, searchImages };

export default met;
