const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields, validateFile } = require('../middlewares');
const { uploadFile, getImage, updateImageCloudinary } = require('../controllers/upload');
const { isValidCollection } = require('../helpers');

const router = Router();

router.post('/', validateFile, uploadFile);

router.put('/:collection/:id', [
    validateFile,
    check('id', 'Invalid ID').isMongoId(),
    check('collection').custom((c) => isValidCollection(c, ['users', 'products'])),
    validateFields
], updateImageCloudinary);

router.get('/:collection/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('collection').custom((c) => isValidCollection(c, ['users', 'products'])),
    validateFields
], getImage);

module.exports = router;