const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/User');

const getUsers = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;

  // const users = await User.find({ status: true })
  //   .skip(Number(from))
  //   .limit(Number(limit));

  // const total = await User.countDocuments({ status: true})

  const [ total, users ] = await Promise.all([
    User.countDocuments({ status: true}),
    User.find({ status: true }).skip(Number(from)).limit(Number(limit)),
  ])

  res.json({
    total,
    users,
  });
};

const findById = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findById(id)

  res.status(200).json({
    user
  })
}

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
    body.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
  }

  const user = await User.findByIdAndUpdate(id, body, { new: true });

  res.json({
    message: 'put API',
    user,
  });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  await User.findByIdAndUpdate(id, {status: false})

  res.status(204).json();
};

module.exports = {
  getUsers,
  findById,
  postUser,
  putUser,
  deleteUser,
};
