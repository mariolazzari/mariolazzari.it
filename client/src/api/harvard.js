// https://github.com/harvardartmuseums/api-docs
import axios from "axios";

// set client api
const apiKey = process.env.REACT_APP_HARVARD_API_KEY;
const api = axios.create({
  baseURL: "https://api.harvardartmuseums.org",
  responseType: "json",
});

// api endpoints
let res = null;
let collectionUrl = `/collection?key=${apiKey}&imgonly=True`;
