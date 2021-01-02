import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
// Redux
import { Provider } from "react-redux";
import store from "./store";
// components
import Backdrop from "@material-ui/core/Backdrop";
const App = React.lazy(() => import("./App"));

ReactDOM.render(
  <Provider store={store}>
    <React.Suspense fallback={<Backdrop open />}>
      <App />
    </React.Suspense>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
