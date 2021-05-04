const { Router } = require('express');
const { check } = require('express-validator');

const {
  getUser,
  postUser,
  putUser,
  patchUser,
  deleteUser,
} = require('../controllers/user.controller');
const { isValidEmail, isValidRole } = require('../helpers/db-validators');
const { paramsValidation } = require('../middlewares/params-validation');

const router = Router();

router.get('/', getUser);

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El email no es valido.').isEmail(),
    check('email').custom(isValidEmail),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    check('password', 'La contraseña debe tener mas de 5 caracteres.').isLength(
      {
        min: 5,
      }
    ),
    // check('rol', 'No es un rol valido.').isIn(['ADMIN', 'USER']),
    check('rol').custom(isValidRole),
    paramsValidation,
  ],
  postUser
);

router.put('/:id', putUser);

router.patch('/', patchUser);

router.delete('/', deleteUser);

module.exports = router;
