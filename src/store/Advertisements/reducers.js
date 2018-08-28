import * as ActionTypes from "./actions";
import union from "lodash/unionBy";
import isArray from "lodash/isArray";
import * as Selectors from "./selectors";

const initialState = {
  isFetching: false,
  isSaving: false,
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
        advertisements: union(state.advertisements, action.advertisements, 'id')
      }
    case ActionTypes.ADVERTISEMENT_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.err
      }
    case ActionTypes.ADD_ENTITY:
      return {
        ...state,
        advertisements: union(state.advertisements, isArray(action.ad) ? action.ad : [action.ad], 'id')
      }
    case ActionTypes.ADVERTISEMENT_CREATE_REQUEST:
      return {
        ...state,
        isSaving: true,
        error: null
      }
    case ActionTypes.ADVERTISEMENT_CREATE_REQUEST_SUCCESS:
      return {
        ...state,
        isSaving: false
      }
    case ActionTypes.ADVERTISEMENT_CREATE_REQUEST_FAILURE:
      return {
        ...state,
        isSaving: false,
        error: action.err
      }
    default:
      return state;
  }
}

export default Advertisements;

export const getAdvertisementsByCompany = (state, companyId) =>
  Selectors.getAdvertisementsByCompany(state.Advertisements.advertisements, companyId)