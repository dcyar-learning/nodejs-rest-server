const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UnauthorizedError = require('../exceptions/unauthorized');

const jwtTokenValidate = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        const unauthorizedError = new UnauthorizedError();

        return res.status(unauthorizedError.code).json({ message: unauthorizedError.message });
    }

    return jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        try {
            if (err) throw new UnauthorizedError();

            const { uid } = payload;

            const user = await User.findById(uid);

            if (!user) throw new UnauthorizedError();

            if (!user.status) throw new UnauthorizedError();

            req.user = user;

            next();
        } catch (error) {
            res.status(error.code).json({
                message: error.message,
            });
        }
    });
};

module.exports = {
    jwtTokenValidate,
};
