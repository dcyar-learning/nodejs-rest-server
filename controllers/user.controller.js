const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/User');

const getUser = (req, res = response) => {
  res.json({
    message: 'get API',
  });
};

const postUser = async (req, res = response) => {
  const { name, email, password, rol } = req.body;

  const user = new User({ name, email, password, rol });

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    return res
      .status(400)
      .json({ message: 'Ya existe una cuenta con este email.' });
  }

  user.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

  await user.save();

  res.status(201).json({
    user,
  });
};

const putUser = (req, res = response) => {
  const id = req.params.id;
  const search = req.query.q;

  res.json({
    message: 'put API',
    id,
    search,
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
