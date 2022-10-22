import { createRoot } from "react-dom/client";
// Redux
import { Provider } from "react-redux";
import store from "redux/store";
// components
import "@fontsource/quicksand";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
