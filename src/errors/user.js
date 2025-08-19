export const EmailAlreadyInUseError = (email) => ({
    statusCode: 400,
    body: {
        errorMessage: `Email ${email} already in use`,
    },
})

export const serverError = () => ({
    statusCode: 500,
    body: {
        errorMessage: "Internal server error",
    },
})
