import axios from "axios";

// api client
const api = axios.create({
  baseURL: "https://www.rijksmuseum.nl/api/en",
  responseType: "json",
});

// api endpoints
const apiKey = process.env.REACT_APP_RIJKS_API_KEY;
let res = null;
let collectionUrl = `/collection?key=${apiKey}&imgonly=True`;
let query = "";

// search collection
api.getCollection = async (search = "Rembrandt", page = 1) => {
  try {
    query = `&q=${search}&p=${page}&ps=10`;
    res = await api.get(`${collectionUrl}${query}`);

    const { count } = res.data;
    const images = res.data.artObjects.map(ao => ({
      id: ao.id,
      title: ao.title,
      longTitle: ao.longTitle,
      preview: ao.headerImage.url,
      url: ao.webImage.url,
    }));

    return { data: { count, images }, error: "" };
  } catch (ex) {
    return { data: null, error: ex.message };
  }
};

export default api;
