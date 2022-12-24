import axios from "axios";
import { startOfYesterday, format } from "date-fns";

const DATE_FMT = "yyyy-MM-dd";
const API_KEY = process.env.REACT_APP_NASA_API_KEY;
let res = null;

// nasa api client
const api = axios.create({
  baseURL: "https://api.nasa.gov",
  responseType: "json",
});

const checkDate = dateStr => {
  const date =
    dateStr === ""
      ? format(startOfYesterday(), DATE_FMT)
      : format(new Date(dateStr), DATE_FMT);

  return date;
};

// get nasa picture of the day
const pods = async (from = "", to = "", count = 0) => {
  console.log("\n\ntest", from, to);

  try {
    let url = `/planetary/apod?api_key=${API_KEY}`;
    if (count > 0) {
      url += `&count=${count}`;
    } else {
      from = checkDate(from);
      to = checkDate(to);
      url += `&start_date=${from}&end_date=${to}`;
    }

    res = await api.get(url);
    return { data: res.data, error: "" };
  } catch (ex) {
    return { error: ex.message };
  }
};

// get nasa picture of the day
const neos = async (from = "", to = "") => {
  try {
    let url = `/neo/rest/v1/feed?api_key=${API_KEY}`;
    from = checkDate(from);
    to = checkDate(to);
    url += `&start_date=${from}&end_date=${to}`;

    res = await api.get(url);
    return { data: res.data, error: "" };
  } catch (ex) {
    return { error: ex.message };
  }
};

// export apis
const nasaApi = { pods, neos };
export default nasaApi;
