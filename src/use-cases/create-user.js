import { v4 as uuidV4 } from "uuid"
import bcrypt from "bcrypt"

export class CreateUserUseCase {
    constructor(postgresCreateUserRepository) {
        this.postgresCreateUserRepository = postgresCreateUserRepository
    }
    async execute(createUserParams) {
        const userId = uuidV4()
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)
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
