const { Router } = require('express');
const { check } = require('express-validator');
const { loginController } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/login', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], loginController);

module.exports = router;