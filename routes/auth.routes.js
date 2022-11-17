const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { paramsValidation } = require('../middlewares/params-validation');

const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    paramsValidation,
], login)

module.exports = router;