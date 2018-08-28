import { combineReducers } from "redux";
import AuthenticatedUser from "./AuthenticatedUser/reducers";
import Advertisements from "./Advertisements/reducers";
import Users from "./Users/reducers";
import Companies from "./Companies/reducers";

const rootReducer = combineReducers({
  AuthenticatedUser,
  Advertisements,
  Users,
  Companies
});

export default rootReducer;
