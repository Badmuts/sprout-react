import { findAdvertisements } from "../endpoints/advertisement";

export const REQUEST_ADVERTISEMENTS = "REQUEST_ADVERTISEMENTS";
export const RECEIVE_ADVERTISEMENTS = "RECEIVE_ADVERTISEMENTS";

export const requestAdvertisements = () => ({
  type: REQUEST_ADVERTISEMENTS
});

export const receiveAdvertisements = json => ({
  type: RECEIVE_ADVERTISEMENTS,
  advertisements: json
});

const fetchAdvertisements = () => dispatch => {
  dispatch(requestAdvertisements());
  return findAdvertisements()
    .then(res => res.data.results)
    .then(json => dispatch(receiveAdvertisements(json)));
};

const shouldFetchAdvertisements = state => {
  const advertisements = state.advertisements;
  if (!advertisements.advertisements) {
    return true;
  }
  if (advertisements.isFetching) {
    return false;
  }
  return true;
};

export const fetchAdvertisementsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchAdvertisements(getState())) {
    return dispatch(fetchAdvertisements());
  }
};
