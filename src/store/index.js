import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import rootReducer from "./reducers";
import { createHttp } from "./http";

let configureStore = null;
const env = process.env.NODE_ENV

if (env === "production") {
  configureStore = preloadedState => createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(thunk.withExtraArgument({ http: createHttp() }))
    );
} else {
  configureStore = preloadedState => {
    const store = createStore(
      rootReducer,
      preloadedState,
      compose(
        applyMiddleware(thunk.withExtraArgument({ http: createHttp() }), createLogger())
      )
    );

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept("./reducers", () => {
        store.replaceReducer(rootReducer);
      });
    }

    return store;
  };
}

export default configureStore;