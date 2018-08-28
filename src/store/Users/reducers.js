import * as ActionTypes from "./actions";
import union from "lodash/unionBy";

const initialState = {
  users: [],
  isLoading: false,
  isSaving: false,
  error: null
};

const Users = (state = initialState, action) => {
  switch(action.type) {
    case ActionTypes.UPDATE_USER_REQUEST:
      return {
        ...state,
        isSaving: true,
        error: null
      }
    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: union(state.users, [action.user], 'id'),
        isSaving: false
      }
    case ActionTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        isSaving: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default Users;