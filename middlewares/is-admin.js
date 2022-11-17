const UnauthorizedError = require('../exceptions/unauthorized');

const isAdmin = (req, res, next) => {
    try {
        if (!req.user) throw new UnauthorizedError('no user');

        const { rol, name } = req.user;

        if (rol !== 'ADMIN') throw new UnauthorizedError('Unauthorized.', 403);

        next();
    } catch (error) {
        res.status(error.code).json({
            message: error.message,
        });
    }
};

module.exports = isAdmin;
