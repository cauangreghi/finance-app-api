import { v4 as uuidV4 } from "uuid"
import bcrypt from "bcrypt"
import { PostgresCreateUserRepository } from "../repositories/postgres/create-user"

export class CreateUserUseCase {
    async execute(createUserParams) {
        const userId = uuidV4()
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }
        const postgresCreateUserRepository = new PostgresCreateUserRepository()
        const createdUser = await postgresCreateUserRepository.execute(user)
        return createdUser
    }
}
