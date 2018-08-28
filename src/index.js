import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./store";
import throttle from "lodash/throttle";
import { saveState, loadState } from "./store/localstorage";
import "normalize.css";
import "flexboxgrid";
import "font-awesome/css/font-awesome.css";
import "@blueprintjs/core/dist/blueprint.css";

const persistedState = loadState();
const store = configureStore(persistedState)

const Root = ({ store }) => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

store.subscribe(
  throttle(() => {
    const state = { AuthenticatedUser: store.getState().AuthenticatedUser }
    saveState(state);
  }, 1000)
);

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
registerServiceWorker();
