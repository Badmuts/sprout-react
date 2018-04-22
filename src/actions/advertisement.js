import { findAdvertisements } from "../endpoints/advertisement";

export const REQUEST_ADVERTISEMENTS = "REQUEST_ADVERTISEMENTS";
export const RECEIVE_ADVERTISEMENTS = "RECEIVE_ADVERTISEMENTS";
export const SEARCH_ADVERTISEMENTS = "SEARCH_ADVERTISEMENTS";

export const requestAdvertisements = () => ({
  type: REQUEST_ADVERTISEMENTS
});

export const receiveAdvertisements = json => ({
  type: RECEIVE_ADVERTISEMENTS,
  advertisements: json
});

export const searchAdvertisements = (query, searchResults) => ({
  type: SEARCH_ADVERTISEMENTS,
  searchQuery: query,
  searchResults
});

export const fetchAdvertisementsByQuery = query => dispatch => {
  dispatch(requestAdvertisements());
  return findAdvertisements(query)
    .then(res => res.data.results)
    .then(json => dispatch(searchAdvertisements(query, json)));
};

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
