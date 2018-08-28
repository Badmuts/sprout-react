import { setUser } from "../AuthenticatedUser/actions";

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

const updateUserRequest = () => ({ type: UPDATE_USER_REQUEST })
const updateUserSuccess = user => ({ type: UPDATE_USER_SUCCESS, user })
const updateUserFailure = error => ({ type: UPDATE_USER_FAILURE, error })

export const updateUser = user => (dispatch, getState, { http }) => {
	dispatch(updateUserRequest());
	return http.put(`/users/${user.id}`, user)
		.then(res => res.data)
		.then(user => {
			dispatch(updateUserSuccess(user))
			return user
		})
		.then(user => {
			// update AuthenticatedUser if ids are identical
			if (user.id === getState().AuthenticatedUser.id) {
				return dispatch(setUser(user));
			}
		})
		.catch(err => dispatch(updateUserFailure(err)))
}