import {
    badRequest,
    emailAlreadyInUseError,
    ok,
    serverError,
} from "./helpers.js"
import { validator } from "validator"
import { UpdateUserUseCase } from "../use-cases/update-user.js"

export class UpdateUserController {
    execute(httpRequest) {
        try {
            const updateUserParams = httpRequest.body

            const userId = httpRequest.params.userId

            const isIdValid = validator.isUUID(userId)

            if (!isIdValid) {
                return badRequest({
                    message: "The provided id is not valid",
                })
            }

            const allowedFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ]

            const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            )

            if (!someFieldIsNotAllowed) {
                return badRequest({
                    message: "Some provided field is not allowed",
                })
            }

            if (updateUserParams.password) {
                if (updateUserParams.password.length < 6) {
                    return badRequest({
                        message: "Password must be at least 6 characters",
                    })
                }
            }

            if (updateUserParams.email) {
                const emailIsValid = validator.isEmail(updateUserParams.email)

                if (!emailIsValid) {
                    return emailAlreadyInUseError({
                        message: "Invalid e-mail. Please provide a valid one",
                    })
                }
            }

            const updateUserUseCase = new UpdateUserUseCase()
            const updatedUser = updateUserUseCase.execute(
                userId,
                updateUserParams,
            )

            ok(updatedUser)
        } catch (error) {
            if (error instanceof emailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.log(error)
            return serverError()
        }
    }
}
