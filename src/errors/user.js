export const EmailAlreadyInUseError = (email) => ({
    statusCode: 400,
    body: {
        errorMessage: `Email ${email} already in use`,
    },
})

export const ServerError = () => ({
    statusCode: 500,
    body: {
        errorMessage: "Internal server error",
    },
})

export const NotFound = () => ({
    statusCode: 400,
    body: {
        errorMessage: "User not found",
    },
})
