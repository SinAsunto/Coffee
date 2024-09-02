const validateFieldsMiddleware = require('../middlewares/validate-fields');
const validateJWTMiddleware = require('../middlewares/validate-jwt');
const validateRolesMiddleware = require('../middlewares/validate-roles');

module.exports = {
    ...validateFieldsMiddleware,
    ...validateJWTMiddleware,
    ...validateRolesMiddleware
}