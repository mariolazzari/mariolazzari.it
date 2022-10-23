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

// get nasa pods
api.getPods = async (top = 10) => {
  try {
    console.log(`${podsUrl}&count=${top}`);
    res = await api.get(`${podsUrl}&count=${top}`);
    return { data: res.data, error: "" };
  } catch (ex) {
    return { data: null, error: ex.message };
  }
};

export default api;
