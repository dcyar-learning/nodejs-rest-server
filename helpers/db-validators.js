const Role = require('../models/Role');
const User = require('../models/User');

const existingId = async (id) => {
    const existsId = await User.findById(id);

    if (!existsId) throw new Error(`El id ${id} no existe.`);
};

const existingRole = async (rol = '') => {
    const existsRol = await Role.findOne({ rol });

    if (!existsRol) throw new Error(`El rol ${rol} no esta registrado en la BD.`);
};

const existingEmail = async (email) => {
    const existsEmail = await User.findOne({ email });

    if (existsEmail) throw new Error('Este email ya esta registrado.');
};

module.exports = {
    existingEmail,
    existingRole,
    existingId,
};
