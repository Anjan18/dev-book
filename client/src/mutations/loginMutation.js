import { gql } from '@apollo/client'

const LOG_IN = gql`
	mutation LogIn($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			token
			success
		}
	}
`

export default LOG_IN
