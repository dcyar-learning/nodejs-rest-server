const Role = require('../models/Role');
const User = require('../models/User');

const isValidRole = async (rol = '') => {
  const existsRol = await Role.findOne({ rol });

  if (!existsRol) throw new Error(`El rol ${rol} no esta registrado en la BD.`);
};

const isValidEmail = async (email) => {
  const existsEmail = await User.findOne({ email });

  if (existsEmail) throw new Error('Este email ya esta registrado.');
};

module.exports = {
  isValidEmail,
  isValidRole,
};
