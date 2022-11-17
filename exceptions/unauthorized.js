class UnauthorizedError extends Error {
    constructor(message = 'Unauthorized', code = 401) {
        super(message);

        this.code = code;
    }
}

module.exports = UnauthorizedError;
