import map from 'lodash/map';
import * as Company from "../Companies/actions"

export const ADD_ENTITY = 'ADD_ENTITY';
export const addEntity = ad => ({ type: ADD_ENTITY, ad });

export const ADVERTISEMENT_REQUEST = "ADVERTISEMENT_REQUEST";
export const ADVERTISEMENT_REQUEST_SUCCESS = "ADVERTISEMENT_REQUEST_SUCCESS";
export const ADVERTISEMENT_REQUEST_FAILURE = "ADVERTISEMENT_REQUEST_FAILURE";

const advertisementRequest = () => ({
	type: ADVERTISEMENT_REQUEST
})

const advertisementRequestSuccess = (advertisements) => ({
	type: ADVERTISEMENT_REQUEST_SUCCESS,
	advertisements
})

const advertisementRequestFailure = err => ({
	type: ADVERTISEMENT_REQUEST_FAILURE,
	err
})

export const fetchAdvertisements = () => (dispatch, getState, { http }) => {
	dispatch(advertisementRequest())
	http.get('/advertisements')
		.then(res => res.data)
		.then(advertisements => {
			dispatch(advertisementRequestSuccess(advertisements.results))
			dispatch(Company.addEntity(map(advertisements.results, 'company')))
		})
		.catch(err => dispatch(advertisementRequestFailure(err)))
}

export const fetchAdvertisementById = id => (dispatch, getState, { http }) => {
	dispatch(advertisementRequest())
	http.get(`/advertisements/${id}`)
		.then(res => [res.data])
		.then(ad => dispatch(advertisementRequestSuccess(ad)))
		.catch(err => dispatch(advertisementRequestFailure(err)))
}

export const ADVERTISEMENT_CREATE_REQUEST = "ADVERTISEMENT_CREATE_REQUEST";
export const ADVERTISEMENT_CREATE_REQUEST_SUCCESS = "ADVERTISEMENT_CREATE_REQUEST_SUCCESS";
export const ADVERTISEMENT_CREATE_REQUEST_FAILURE = "ADVERTISEMENT_CREATE_REQUEST_FAILURE";

const advertisementCreateRequest 		= () 	=> ({ type: ADVERTISEMENT_CREATE_REQUEST })
const advertisementCreateRequestSuccess = ()	=> ({ type: ADVERTISEMENT_CREATE_REQUEST_SUCCESS })
const advertisementCreateRequestFailure = err 	=> ({ type: ADVERTISEMENT_CREATE_REQUEST_FAILURE, err })

export const createAdvertisement = advertisement => (dispatch, getState, { http }) => {
	dispatch(advertisementCreateRequest());
	http.post(`/advertisements`, advertisement)
		.then(res => res.data)
		.then(ad => {
			dispatch(advertisementCreateRequestSuccess())
			dispatch(addEntity(ad))
		})
		.catch(err => dispatch(advertisementCreateRequestFailure(err)))
}