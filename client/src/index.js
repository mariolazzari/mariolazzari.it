import React from "react";
import ReactDOM from "react-dom";
// Redux
import { Provider } from "react-redux";
import store from "./store";
// theme
import "fontsource-roboto";
// components
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>{" "}
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
