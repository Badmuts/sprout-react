import * as ActionTypes from "./actions";

const initialState = {
	user: null,
	accessToken: null,
	refreshToken: null,
	error: null,
  loading: false
};

const AuthenticatedUser = (state = initialState, action) => {
  switch(action.type) {
  	case ActionTypes.LOGIN_REQUEST:
  		return {
  			...state,
        loading: true,
  			err: null
  		}
  	case ActionTypes.SET_ACCESS_TOKEN:
  		return {
  			...state,
  			accessToken: action.token
  		}
  	case ActionTypes.SET_AUTHENTICATED_USER:
  		return {
  			...state,
  			user: action.user
  		}
  	case ActionTypes.LOGIN_REQUEST_FAILURE:
  		return {
  			...state,
  			error: action.err,
        loading: false
  		}
  	case ActionTypes.LOGIN_REQUEST_SUCCESS:
  		return {
  			...state,
  			error: null,
        loading: false
  		}
    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null
      }
    case ActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case ActionTypes.REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case ActionTypes.REGISTER_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default AuthenticatedUser;