import * as ActionTypes from "./actions";
import unionBy from 'lodash/unionBy';

const initialState = {
	companies: [],
	isSaving: false,
	isFetching: false,
	error: null
}

const Companies = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.UPDATE_COMPANY_REQUEST:
			return {
				...state,
				isSaving: true,
				error: null
			}
		case ActionTypes.UPDATE_COMPANY_SUCCESS:
			return {
				...state,
				isSaving: false,
				companies: unionBy(state.companies, [action.company], 'id')
			}
		case ActionTypes.UPDATE_COMPANY_FAILURE:
			return {
				...state,
				isSaving: false, 
				error: action.error
			}
		default:
			return state;
	}
}

export default Companies