import axios from "axios";

// api endpoints
const apiKey = process.env.REACT_APP_NASA_API_KEY;
let res = null;
let podsUrl = `/planetary/apod?api_key=${apiKey}`;

// nasa api client
const api = axios.create({
  baseURL: "https://api.nasa.gov",
  responseType: "json",
});

// get nasa picture of the day
const pods = async (count = 10) => {
  try {
    res = await api.get(`${podsUrl}&count=${count}`);
    return { data: res.data, error: "" };
  } catch (ex) {
    return { error: ex.message };
  }
};

// export apis
const nasaApi = { pods };
export default nasaApi;
