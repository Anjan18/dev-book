import UserType from 'types/userType'
import bcryptjs from 'bcryptjs'
import { authArguments, findUser } from 'utils/authentication'

import { throwError } from 'utils/error'
import validateRegisterInput from 'validation/register'
import User from 'models/User'

const generateHashPassword = (password) => {
    const passwordPromise = new Promise((resolve, reject) => {
        bcryptjs.genSalt(10, (error, salt) => {
            bcryptjs.hash(password, salt, (error, hash) => {
                if (error) reject(error)

                password = hash
                resolve(password)
            })
        })
    })

    return passwordPromise
}

const createUser = async ({ name, email, password }) => {
    const hashedPassword = await generateHashPassword(password)

    const userModelData = {
        name,
        email,
        password: hashedPassword,
    }

    const newUser = new User(userModelData)

    newUser.save()

    return newUser
}

const registerUser = {
    type: UserType,
    args: authArguments('register'),
    resolve: async (parent, { name, email, password, confirmPassword }) => {
        const { errors, isValid } = validateRegisterInput({
            name,
            email,
            password,
            confirmPassword,
        })

        if (!isValid) {
            return throwError(errors)
        }

        try {
            const user = await findUser(email)

            if (user) {
                return throwError('User already exist')
            }

            const newUser = await createUser({ name, email, password })

            return newUser
        } catch (error) {
            return throwError(error)
        }
    },
}

export default registerUser
