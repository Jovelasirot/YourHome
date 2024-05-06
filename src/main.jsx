import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "../scss/custom.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";
import store from "../redux/store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
