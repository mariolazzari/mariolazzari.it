import React from "react";
import ReactDOM from "react-dom";
// Redux
import { Provider } from "react-redux";
import store from "./store";
// components
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
