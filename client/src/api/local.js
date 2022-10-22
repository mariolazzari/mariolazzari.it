import axios from "axios";

// react env
const { NODE_ENV, REACT_APP_API_BASE_URL, REACT_APP_API_BASE_URL_DEV } =
  process.env;

// set user token for protected routes and axios defaults
axios.defaults.headers.common.Authorization = localStorage.getItem("token");
axios.defaults.baseURL =
  NODE_ENV === "development"
    ? REACT_APP_API_BASE_URL_DEV
    : REACT_APP_API_BASE_URL;
axios.defaults.responseType = "json";

// api call type
const GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  FILE = "FILE";

// get records
const get = api => callApi(GET, api);
// add new record
const post = (api, record) => callApi(POST, api, record);
// update selected record
const put = (api, record) => callApi(PUT, api, record);
// delete selected record
const del = api => callApi(DELETE, api);

// handle api call
const callApi = async (type = "GET", api, record, folder = "") => {
  let res;

  try {
    switch (type) {
      case GET:
        res = await axios.get(api);
        break;

      case POST:
        res = await axios.post(api, record);
        break;

      case PUT:
        res = await axios.put(api, record);
        break;

      case DELETE:
        res = await axios.delete(api);
        break;

      case FILE:
        let formData = new FormData();
        formData.append("dump", record);
        if (folder !== "") {
          formData.append("folder", folder);
        }

        res = await axios.post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        break;

      default:
        return { data: null, error: "API call type is mandatory." };
    }

    return { data: res.data, error: "" };
  } catch (ex) {
    return { data: null, error: handleError(ex, type) };
  }
};

// error handling
const handleError = (ex, type = GET) => {
  let error = "";

  if (ex.response) {
    // Request made and server responded with error
    const { status, data } = ex.response;

    switch (status) {
      case 400:
        error = "Richiesta errata";
        break;

      case 401:
        error = "Utente non abilitato";
        break;

      case 404:
        error = "Risorsa non trovata";
        break;

      default:
        error = "Errore server";
        break;
    }

    if (data) {
      error += `: ${data.error}`;
    }
  } else if (ex.request) {
    // The request was made but no response was received
    error = "Server non trovato.";
  } else {
    let operationType = "";

    switch (type) {
      case GET:
        operationType = "il recupero dei record.";
        break;

      case POST:
        operationType = "la creazione del record.";
        break;

      case PUT:
        operationType = "l'aggiornamento del record.";
        break;

      case DELETE:
        operationType = "la cancellazione del record.";
        break;

      case FILE:
        operationType = "il caricamento del file.";
        break;

      default:
        operationType = "la chiamata API.";
        break;
    }

    error = `Errore durante ${operationType}. ${ex.message}`;
  }
  return error;
};

// file upload
const fileUpload = (api, file, folder = "") => callApi(FILE, api, file, folder);

const exportObj = {
  get,
  post,
  put,
  del,
  delete: del,
  fileUpload,
};

// exports
export default exportObj;
