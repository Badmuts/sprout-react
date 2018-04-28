import { setUser } from "../AuthenticatedUser/actions";

export const UPDATE_COMPANY_REQUEST = 'UPDATE_COMPANY_REQUEST';
export const UPDATE_COMPANY_SUCCESS = 'UPDATE_COMPANY_SUCCESS';
export const UPDATE_COMPANY_FAILURE = 'UPDATE_COMPANY_FAILURE';

const updateCompanyRequest = () => ({ type: UPDATE_COMPANY_REQUEST })
const updateCompanySuccess = company => ({ type: UPDATE_COMPANY_SUCCESS, company })
const updateCompanyFailure = error => ({ type: UPDATE_COMPANY_FAILURE, error })

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