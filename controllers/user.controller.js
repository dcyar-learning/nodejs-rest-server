const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/User');

const getUser = async (req, res = response) => {
  const users = await User.find();

  res.json({
    message: 'list of users',
    users: users.map((user) => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        google: user.google,
        status: user.status,
        rol: user.rol,
      };
    }),
  });
};

const postUser = async (req, res = response) => {
  const { name, email, password, rol } = req.body;

  const user = new User({ name, email, password, rol });

  user.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

  await user.save();

  res.status(201).json({
    user,
  });
};

const putUser = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...body } = req.body;

  if (password) {
    body = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
  }

  const user = await User.findByIdAndUpdate(id, body, { new: true });

  res.json({
    message: 'put API',
    user,
  });
};

const patchUser = (req, res = response) => {
  res.json({
    message: 'patch API',
  });
};

const deleteUser = (req, res = response) => {
  res.status(204).json({
    message: 'delete API',
  });
};

module.exports = {
  getUser,
  postUser,
  putUser,
  patchUser,
  deleteUser,
};
