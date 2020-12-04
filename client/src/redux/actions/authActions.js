import { SET_CURRENT_USER } from 'redux/actions/types'
import setAuthToken from 'redux/utils/setAuthToken'
import axios from 'axios'
import { useMutation } from '@apollo/client'
import LOG_IN from 'mutations/loginMutation'
import jwtDecode from 'jwt-decode'

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	}
}

const loginUser = (token, dispatch) => {
	localStorage.setItem('jwtToken', token)
	setAuthToken(token)
	// decode token
	const decoded = jwtDecode(token)
	// set current user
	dispatch(setCurrentUser(decoded))
}

export const loginUserAction = userData => dispatch => {
	const mu = useMutation(LOG_IN)
	console.log(mu)
	// axios
	// 	.post('/api/user/login', userData)
	// 	.then(({ data: { token } }) => {
	// 		loginUser(token, dispatch)
	// 	})
	// 	.catch(response => console.log(response))
}

export const registerUserAction = userData => dispatch => {
	// axios
	// 	.post('/api/user/register', userData)
	// 	.then(({ data: { token } }) => {
	// 		loginUser(token, dispatch)
	// 	})
	// 	.catch(err => console.log(err))
}

export const logoutUser = () => dispatch => {
	// remove token from localStorage
	localStorage.removeItem('jwtToken')

	// remove the auth token header
	setAuthToken(false)

	// set the current user to empty
	dispatch(setCurrentUser({}))
}
