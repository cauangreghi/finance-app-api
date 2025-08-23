import "dotenv/config.js"
import express from "express"
import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController,
} from "./src/controllers/index.js"
import {
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateUserRepository,
} from "./src/repositories/postgres/index.js"
import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
} from "./src/use-cases/index.js"
import {
    PostgresDeleteUserRepository,
    PostgresCreateUserRepository,
} from "./src/repositories/postgres/index.js"

const app = express()

app.use(express.json())

app.post("/api/users", async (request, response) => {
    const createUserRepository = new PostgresCreateUserRepository()
    const createUserUseCase = new CreateUserUseCase(createUserRepository)
    const createUserController = new CreateUserController(createUserUseCase)
    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).json(body)
})

app.patch("/api/users/:userId", async (request, response) => {
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository()
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()
    const updateUserUseCase = new UpdateUserUseCase(
        postgresUpdateUserRepository,
        postgresGetUserByEmailRepository,
    )
    const updateUserController = new UpdateUserController(updateUserUseCase)
    const { statusCode, body } = await updateUserController.execute(request)

    response.status(statusCode).json(body)
})

app.get("/api/users/:userId", async (request, response) => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)
    const { statusCode, body } = await getUserByIdController.execute(request)

    response.status(statusCode).send(body)
})

app.delete("/api/delete/:userId", async (request, response) => {
    const posgresDeleteUserRepository = new PostgresDeleteUserRepository()
    const deleteUserUseCase = new DeleteUserUseCase(posgresDeleteUserRepository)
    const deleteUserController = new DeleteUserController(deleteUserUseCase)
    const { statusCode, body } = await deleteUserController.execute(request)
    response.status(statusCode).send(body)
})

app.listen(process.env.PORT),
    () => console.log(`listening on port ${process.env.PORT}`)
