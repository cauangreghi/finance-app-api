import { v4 as uuidV4 } from "uuid"
import bcrypt from "bcrypt"
import { EmailAlreadyInUseError } from "../errors/user.js"

export class CreateUserUseCase {
    constructor(
        postgresCreateUserRepository,
        postgresGetUserByEmailRepository,
    ) {
        this.postgresCreateUserRepository = postgresCreateUserRepository
        this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository
    }
    async execute(createUserParams) {
        const userId = uuidV4()
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        const userWithProvidedEmail =
            await this.postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            )
        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }

        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }
        const createdUser =
            await this.postgresCreateUserRepository.execute(user)
        return createdUser
    }
}
