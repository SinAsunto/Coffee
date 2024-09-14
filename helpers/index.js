const dbValidators = require('./db-validators');
const generateJWT = require('./jwt');
const googleVerify = require('./google-verify');
const uploadFile = require('./upload-file');

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googleVerify,
    ...uploadFile
}