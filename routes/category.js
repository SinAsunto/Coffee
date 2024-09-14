const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, validateFields, isAdministrator } = require('../middlewares');
const {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory 
} = require('../controllers/category');
const { categoryExistsById } = require('../helpers');

const router = Router();

router.get('/', getCategories);

router.get('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(categoryExistsById),
    validateFields
], getCategory);

router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], createCategory);

router.put('/:id', [
    validateJWT,
    check('id', 'ID is not valid').isMongoId(),
    check('name', 'Name is required').not().isEmpty(),
    check('id').custom(categoryExistsById),
    validateFields
], updateCategory);

router.delete('/:id', [
    validateJWT,
    isAdministrator,
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(categoryExistsById),
    validateFields
], deleteCategory);

module.exports = router;