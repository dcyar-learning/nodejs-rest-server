const { Router } = require('express');
const { check } = require('express-validator');

const {
  getUser,
  postUser,
  putUser,
  patchUser,
  deleteUser,
} = require('../controllers/user.controller');
const { paramsValidation } = require('../middlewares/params-validation');
const Role = require('../models/Role');
const User = require('../models/User');

const router = Router();

router.get('/', getUser);

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El email no es valido.').isEmail(),
    check('email').custom(async (email) => {
      const existsEmail = await User.findOne({ email });

      if (existsEmail) throw new Error('Este email ya esta registrado.');
    }),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    check('password', 'La contraseña debe tener mas de 5 caracteres.').isLength(
      {
        min: 5,
      }
    ),
    // check('rol', 'No es un rol valido.').isIn(['ADMIN', 'USER']),
    check('rol').custom(async (rol = '') => {
      const existsRol = await Role.findOne({ rol });

      if (existsRol)
        throw new Error(`El rol ${rol} no esta registrado en la BD.`);
    }),
    paramsValidation,
  ],
  postUser
);

router.put('/:id', putUser);

router.patch('/', patchUser);

router.delete('/', deleteUser);

module.exports = router;
