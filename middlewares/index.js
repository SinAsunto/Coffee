const validateFieldsMiddleware = require('../middlewares/validate-fields');
const validateJWTMiddleware = require('../middlewares/validate-jwt');
const validateRolesMiddleware = require('../middlewares/validate-roles');
const validateFile = require('../middlewares/validate-file');

module.exports = {
    ...validateFieldsMiddleware,
    ...validateJWTMiddleware,
    ...validateRolesMiddleware,
    ...validateFile
}