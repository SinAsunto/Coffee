const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, validateFields, isAdministrator } = require('../middlewares');
const {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product');
const { productExistsById, categoryExistsById } = require('../helpers/db-validators');

const router = Router();

router.get('/', getProducts);

router.get('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(productExistsById),
    validateFields
], getProduct);

router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('category', 'Category ID is not valid').isMongoId(),
    check('category').custom(categoryExistsById),
    validateFields
], createProduct);

router.put('/:id', [
    validateJWT,
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(productExistsById),
    validateFields
], updateProduct);

router.delete('/:id', [
    validateJWT,
    isAdministrator,
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(productExistsById),
    validateFields
], deleteProduct);

module.exports = router;