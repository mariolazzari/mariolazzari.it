import axios from "axios";

// set user token for protected routes and axios defaults
axios.defaults.baseURL = "https://api.nasa.gov";
axios.defaults.responseType = "json";

// api call type
const GET = "GET";
// get records
const get = api => callApi(GET, api);

// handle api call
const callApi = async (type = "GET", api) => {
  let res;

  try {
    switch (type) {
      case GET:
        res = await axios.get(api);
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

      default:
        operationType = "la chiamata API.";
        break;
    }

    error = `Errore durante ${operationType}. ${ex.message}`;
  }
  return error;
};

const exportObj = { get };

// exports
export default exportObj;
