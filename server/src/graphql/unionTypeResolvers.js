import { ERROR_MESSAGE, MESSAGE, ERROR } from 'variables/global'

const checkIfErroType = obj => obj[ERROR_MESSAGE]

const resolvers = {
	ErrorOrMessage: obj => {
		if (checkIfErroType(obj)) {
			return ERROR
		}

		if (obj[MESSAGE]) {
			return MESSAGE
		}

		return null
	},

	Login: obj => {
		if (obj.token) return 'LoginToken'

		if (checkIfErroType(obj)) return ERROR

		if (obj.validationError) return 'ValidationErrorMessages'

		return null
	},
}

export default resolvers
