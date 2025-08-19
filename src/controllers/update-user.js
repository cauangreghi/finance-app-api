import {
    badRequest,
    emailAlreadyInUseError,
    ok,
    serverError,
} from "./helpers/http.js"
import { UpdateUserUseCase } from "../use-cases/update-user.js"
import {
    InvalidPasswordResponse,
    EmailIsAlreadyInUseResponse,
    InvalidIdResponse,
    checkIfIdIsValid,
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
} from "./helpers/user.js"

export class UpdateUserController {
    execute(httpRequest) {
        try {
            const params = httpRequest.body

            const userId = httpRequest.params.userId

            const isIdValid = checkIfIdIsValid(userId)

            if (!isIdValid) {
                return InvalidIdResponse()
            }

            const allowedFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ]

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: "Some provided field is not allowed",
                })
            }

            if (params.password) {
                const passwordIsValid = checkIfPasswordIsValid(params.password)
                if (!passwordIsValid) {
                    return InvalidPasswordResponse()
                }
            }

            if (params.email) {
                const emailIsValid = checkIfEmailIsValid(params.email)

                if (!emailIsValid) {
                    return EmailIsAlreadyInUseResponse()
                }
            }

            const updateUserUseCase = new UpdateUserUseCase()
            const updatedUser = updateUserUseCase.execute(userId, params)

            return ok(updatedUser)
        } catch (error) {
            if (error instanceof emailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.log(error)
            return serverError()
        }
    }
}
