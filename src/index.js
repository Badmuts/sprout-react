import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import app from "./reducers/app";
import routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import "normalize.css";
import "flexboxgrid";
import "font-awesome/css/font-awesome.css";
import "@blueprintjs/core/dist/blueprint.css";

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = createStore(app, applyMiddleware(...middleware));

const Root = ({ store }) => (
  <Provider store={store}>
    <Router children={routes} />
  </Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
registerServiceWorker();
