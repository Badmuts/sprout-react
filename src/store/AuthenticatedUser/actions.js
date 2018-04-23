import * as token from "../token";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_REQUEST_SUCCESS = "LOGIN_REQUEST_SUCCESS";
export const LOGIN_REQUEST_FAILURE = "LOGIN_REQUEST_FAILURE";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const SET_AUTHENTICATED_USER = "SET_AUTHENTICATED_USER";
export const LOGOUT = "LOGOUT";

const loginReq = (email, password) => ({
	type: LOGIN_REQUEST
});

const loginReqSuccess = (token, user) => ({
	type: LOGIN_REQUEST_SUCCESS
})

const loginReqFailure = err => ({
	type: LOGIN_REQUEST_FAILURE,
	err
})

const setToken = token => ({
	type: SET_ACCESS_TOKEN,
	token
})

const setUser = user => ({
	type: SET_AUTHENTICATED_USER,
	user
})

const signOut = () => ({
	type: LOGOUT
})

export const login = (email, password) => (dispatch, getState, { http }) => {
	dispatch(loginReq())
	console.log('http', http)
	return http.post("/auth/login", {email, password})
        .then(res => {
        	token.setToken(res.data.jwt)
        	dispatch(setToken(res.data.jwt))
        	return http.get("/users/me")
        })
        .then(res => {
        	dispatch(setUser(res.data))
        	return dispatch(loginReqSuccess())
        })
        .catch(err => dispatch(loginReqFailure(err)))
}

export const logout = () => (dispatch, getState) => {
	token.removeToken();
	dispatch(signOut())
}

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_REQUEST_SUCCESS = "REGISTER_REQUEST_SUCCESS";
export const REGISTER_REQUEST_FAILURE = "REGISTER_REQUEST_FAILURE";

const registerReq = () => ({ type: REGISTER_REQUEST })
const registerReqSuccess = () => ({ type: REGISTER_REQUEST_SUCCESS })
const registerReqFailure = error => ({ type: REGISTER_REQUEST_FAILURE, error })

export const register = (email, password) => (dispatch, getState, { http }) => {
	dispatch(registerReq())
	return http.post("/users", {email, password})
		.then(res => res.data)
		.then(user => dispatch(login(email, password)))
		.then(() => dispatch(registerReqSuccess()))
		.catch(err => dispatch(registerReqFailure(err)))
}