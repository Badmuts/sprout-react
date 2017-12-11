import { combineReducers } from "redux";
import {
  REQUEST_ADVERTISEMENTS,
  RECEIVE_ADVERTISEMENTS
} from "../actions/advertisement";

const initialState = {
  loggedIn: false
};

const advertisements = (
  state = {
    isFetching: false,
    advertisements: []
  },
  action
) => {
  switch (action.type) {
    case REQUEST_ADVERTISEMENTS:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_ADVERTISEMENTS:
      return {
        ...state,
        isFetching: false,
        advertisements: action.advertisements
      };
    default:
      return state;
  }
};

export function app(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  app,
  advertisements
});

export default rootReducer;
