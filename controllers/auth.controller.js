const bcryptjs = require('bcryptjs');

const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) throw new Error('El usuario con este email no existe.');

        if (!user.status) throw new Error('Usuario o contraseña no válidos.');

        if (!bcryptjs.compareSync(password, user.password)) throw new Error('Usuario o contraseña no válidos.');

        const token = await generarJWT(user.id);

        res.status(200).json({
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    login,
};
