import { CreateUserUseCase } from "../use-cases/create-user.js"
import {
    badRequest,
    created,
    emailAlreadyInUseError,
    serverError,
} from "./helpers.js"
import validator from "validator"

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

            if (params.password.length < 6) {
                return badRequest({
                    message: "Password must be at least 6 characters",
                })
            }

            const emailIsValid = validator.isEmail(params.email)

            if (!emailIsValid) {
                return badRequest({
                    message: "Invalid e-mail. Please provide a valid one",
                })
            }

            const createUserUseCase = new CreateUserUseCase()
            const createUser = await createUserUseCase.execute(params)

            return created(createUser)
        } catch (error) {
            if (error instanceof emailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }

            console.log(error)
            return serverError()
        }
    }
}
