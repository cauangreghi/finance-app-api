export class DeleteUserUseCase {
    constructor(postgresDeleteUserRepository) {
        this.postgresDeleteUserRepository = postgresDeleteUserRepository
    }
    async execute(userId) {
        const user = await this.postgresDeleteUserRepository.execute(userId)

        return user
    }
}
