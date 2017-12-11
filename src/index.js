import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import app from "./reducers/app";
import routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import "normalize.css";
import "flexboxgrid";
import "font-awesome/css/font-awesome.css";
import "@blueprintjs/core/dist/blueprint.css";

const store = createStore(app);

const Root = ({ store }) => (
  <Provider store={store}>
    <Router children={routes} />
  </Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
registerServiceWorker();
