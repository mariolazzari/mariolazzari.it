import React from "react";
import ReactDOM from "react-dom";
//import reportWebVitals from "./reportWebVitals";
// Redux
import { Provider } from "react-redux";
import store from "./store";
// components
import "@fontsource/quicksand";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

//reportWebVitals();
