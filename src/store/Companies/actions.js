import { setUser } from "../AuthenticatedUser/actions";
import * as Ads from "../Advertisements/actions";
import _ from 'lodash';

export const UPDATE_COMPANY_REQUEST = 'UPDATE_COMPANY_REQUEST';
export const UPDATE_COMPANY_SUCCESS = 'UPDATE_COMPANY_SUCCESS';
export const UPDATE_COMPANY_FAILURE = 'UPDATE_COMPANY_FAILURE';
export const ADD_ENTITY = 'ADD_ENTITY';
export const FETCH_COMPANY_REQUEST = "FETCH_COMPANY_REQUEST";
export const FETCH_COMPANY_SUCCESS = "FETCH_COMPANY_SUCCESS";
export const FETCH_COMPANY_FAILURE = "FETCH_COMPANY_FAILURE";

const updateCompanyRequest = () => ({ type: UPDATE_COMPANY_REQUEST })
const updateCompanySuccess = company => ({ type: UPDATE_COMPANY_SUCCESS, company })
const updateCompanyFailure = error => ({ type: UPDATE_COMPANY_FAILURE, error })
export const addEntity = company => ({ type: ADD_ENTITY, company });

export const updateCompany = company => (dispatch, getState, { http }) => {
	dispatch(updateCompanyRequest());
	return http.put(`/company/${company.id}`, company)
		.then(res => res.data)
		.then(company => {
			dispatch(updateCompanySuccess(company))
			return company
		})
		.then(company => {
			// update AuthenticatedUser company if ids are identical
			if (company.id === getState().AuthenticatedUser.user.company.id) {
				let user = getState().AuthenticatedUser.user;
				user.company = company;
				return dispatch(setUser(user));
			}
			return company
		})
		.catch(err => dispatch(updateCompanyFailure(err)))
}

export const UPLOADING_LOGO = "UPLOADING_LOGO";
export const UPLOADING_LOGO_SUCCESS = "UPLOADING_LOGO_SUCCESS";
const uploadingLogo = () => ({ type: UPLOADING_LOGO });
const uploadingLogoSuccess = () => ({ type: UPLOADING_LOGO_SUCCESS });

export const logoUpload = (company, logo) => (dispatch, getState, { http }) => {
	const reader  = new FileReader();

	reader.addEventListener('load', function() {
		const uploadedLogo = {
			logo: reader.result,
			logo_file_name: logo.name
		}
	
		http.put(`/company/${company.id}`, uploadedLogo)
			.then(res => res.data)
			.then(company => {
				dispatch(uploadingLogoSuccess())
				dispatch(addEntity(company))
			})
			.catch(err => {
				console.error('WHOOPS', err)
				dispatch(uploadingLogoSuccess())
			})
	}, false)

	if (logo) {
		dispatch(uploadingLogo())
		reader.readAsDataURL(logo)
	}
	
}

export const UPLOADING_PHOTO = "UPLOADING_PHOTO";
export const UPLOADING_PHOTO_SUCCESS = "UPLOADING_PHOTO_SUCCESS";
const uploadingPhoto = () => ({ type: UPLOADING_PHOTO });
const uploadingPhotoSuccess = () => ({ type: UPLOADING_PHOTO_SUCCESS });
export const photoUpload = (company, photo) => (dispatch, getState, { http }) => {
	const reader  = new FileReader();

	reader.addEventListener('load', function() {
		const uploadedPhoto = {
			photo: reader.result,
			photo_file_name: photo.name
		}
	
		http.post(`/company/${company.id}/photos`, uploadedPhoto)
			.then(res => res.data)
			.then(_company => {
				dispatch(uploadingPhotoSuccess())
				dispatch(addEntity(_company))
			})
			.catch(err => {
				console.error('ERROR', err)
				dispatch(uploadingPhotoSuccess())
			})
	}, false)

	if (photo) {
		dispatch(uploadingPhoto())
		reader.readAsDataURL(photo)
	}
	
}

const fetchCompanyRequest = () => ({ type: FETCH_COMPANY_REQUEST });
const fetchCompanySuccess = () => ({type: FETCH_COMPANY_SUCCESS });
const fetchCompanyFailure = err => ({ type: FETCH_COMPANY_FAILURE, err })

export const fetchCompanyByID = id => (dispatch, getState, { http }) => {
	dispatch(fetchCompanyRequest());
	return http.get(`/company/${id}`)
		.then(res => res.data)
		.then(company => {
			dispatch(addEntity(company));
			dispatch(Ads.addEntity(company.advertisements))
			dispatch(fetchCompanySuccess(company))
		})
		.catch(err => dispatch(fetchCompanyFailure(err)))
}














