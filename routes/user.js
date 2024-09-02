const { Router } = require('express');
const { getUsers, postUsers, putUsers, deleteUsers } = require('../controllers/user');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { isValidRole, emailExists, userExistsById } = require('../helpers/db-validators');

const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(emailExists),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({min: 6}),
    check('role').custom(isValidRole),
    validateFields
], postUsers);

router.put('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(isValidRole).optional(),
    validateFields
], putUsers);

router.delete('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(userExistsById),
    validateFields
], deleteUsers);

module.exports = router;