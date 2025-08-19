import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js"
import { ok } from "./helpers/http.js"
import { ServerError } from "../errors/user.js"
import { InvalidIdResponse, checkIfIdIsValid } from "./helpers/user.js"

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.userId)

            if (!isIdValid) {
                return InvalidIdResponse()
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            return ok(user)
        } catch (error) {
            console.log(error)
            return ServerError()
        }
    }
}
