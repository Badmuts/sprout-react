import * as ActionTypes from "./actions";
import union from "lodash/unionBy";

const initialState = {
  isFetching: false,
  error: null,
	advertisements: []
};

const Advertisements = (state = initialState, action) => {
  switch(action.type) {
    case ActionTypes.ADVERTISEMENT_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      }
    case ActionTypes.ADVERTISEMENT_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        advertisements: union(state.advertisements, action.advertisements.results, 'id')
      }
    case ActionTypes.ADVERTISEMENT_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.err
      }
    default:
      return state;
  }
}

export default Advertisements;