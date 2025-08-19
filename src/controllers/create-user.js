import { CreateUserUseCase } from "../use-cases/create-user.js"

import { EmailAlreadyInUseError, ServerError } from "../errors/user.js"

import {
    InvalidPasswordResponse,
    EmailIsAlreadyInUseResponse,
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    badRequest,
    created,
} from "./helpers/index.js"

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requiredFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ]

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length == 0) {
                    return badRequest({ message: `Missing param: ${field}` })
                }
            }

            const passwordIsValid = checkIfPasswordIsValid(params.password)

            if (!passwordIsValid) {
                return InvalidPasswordResponse()
            }

            const emailIsValid = checkIfEmailIsValid(params.email)

            if (!emailIsValid) {
                return EmailIsAlreadyInUseResponse()
            }

            const createUserUseCase = new CreateUserUseCase()
            const createUser = await createUserUseCase.execute(params)

            return created(createUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }

            console.log(error)
            return ServerError()
        }
    }
}
