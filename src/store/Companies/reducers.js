import * as ActionTypes from "./actions";
import unionBy from 'lodash/unionBy';
import isArray from 'lodash/isArray';

const initialState = {
	companies: [],
	isSaving: false,
	isFetching: false,
	isUploading: false,
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
		case ActionTypes.ADD_ENTITY:
			return {
				...state,
				companies: unionBy(state.companies, isArray(action.company) ? action.company : [action.company], 'id')
			}
		case ActionTypes.FETCH_COMPANY_REQUEST:
			return {
				...state,
				isFetching: true
			}
		case ActionTypes.FETCH_COMPANY_SUCCESS:
			return {
				...state,
				isFetching: false
			}
		case ActionTypes.FETCH_COMPANY_FAILURE:
			return {
				...state,
				error: action.err,
				isFetching: false
			}
		case ActionTypes.UPLOADING_LOGO:
			return {
				...state,
				isUploading: true
			}
		case ActionTypes.UPLOADING_LOGO_SUCCESS:
			return {
				...state,
				isUploading: false
			}
		case ActionTypes.UPLOADING_PHOTO:
			return {
				...state,
				isPhotoUploading: true
			}
		case ActionTypes.UPLOADING_PHOTO_SUCCESS:
			return {
				...state,
				isPhotoUploading: false
			}
		default:
			return state;
	}
}

export default Companies