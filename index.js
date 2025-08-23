import "dotenv/config.js"
import express from "express"
import {
    MakeCreateUserController,
    MakeUpdateUserController,
    MakeGetUserByIdController,
    MakeDeleteUserController,
} from "./src/factories/controllers/user.js"

const app = express()

app.use(express.json())

app.post("/api/users", async (request, response) => {
    const createUserController = MakeCreateUserController()
    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).json(body)
})

app.patch("/api/users/:userId", async (request, response) => {
    const updateUserController = MakeUpdateUserController()
    const { statusCode, body } = await updateUserController.execute(request)

    response.status(statusCode).json(body)
})

app.get("/api/users/:userId", async (request, response) => {
    const getUserByIdController = MakeGetUserByIdController()
    const { statusCode, body } = await getUserByIdController.execute(request)

    response.status(statusCode).send(body)
})

app.delete("/api/delete/:userId", async (request, response) => {
    const deleteUserController = MakeDeleteUserController()
    const { statusCode, body } = await deleteUserController.execute(request)
    response.status(statusCode).send(body)
})

app.listen(process.env.PORT),
    () => console.log(`listening on port ${process.env.PORT}`)
