import { DeleteUserUseCase } from "../use-cases/index.js"
import { ServerError } from "../errors/user.js"
import {
    InvalidIdResponse,
    checkIfIdIsValid,
    ok,
    userNotFoundResponse,
} from "./helpers/index.js"

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.userId)

            if (!isIdValid) {
                return InvalidIdResponse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()

            const deletedUser = await deleteUserUseCase.execute(
                httpRequest.params.userId,
            )

            if (!deletedUser) {
                return userNotFoundResponse()
            }

            return ok(deletedUser)
        } catch (error) {
            console.log(error)
            return ServerError()
        }
    }
}
