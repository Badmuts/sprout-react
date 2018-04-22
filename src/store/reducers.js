import { combineReducers } from "redux";
import AuthenticatedUser from "./AuthenticatedUser/reducers";
import Advertisements from "./Advertisements/reducers";

const rootReducer = combineReducers({
  AuthenticatedUser,
  Advertisements
});

export default rootReducer;
