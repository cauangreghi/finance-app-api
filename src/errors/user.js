export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`Email ${email} already in use`)
        this.statusCode = 400
    }
}

export class ServerError extends Error {
    constructor() {
        super("Internal server error")
        this.statusCode = 500
    }
}

export class NotFound extends Error {
    constructor() {
        super("User not found")
        this.statusCode = 404
    }
}
