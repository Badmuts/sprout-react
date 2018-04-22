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
		.then(advertisements => dispatch(advertisementRequestSuccess(advertisements)))
		.catch(err => dispatch(advertisementRequestFailure(err)))
}