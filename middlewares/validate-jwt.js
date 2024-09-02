const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Authentication token is missing.'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        // Get info from user logged in
        const user = await User.findById(uid);

        // Validate if user exists
        if (!user) {
            return res.status(401).json({
                msg: 'Invalid authentication token.'
            });
        }

        // Validate if user is active
        if (!user.status) {
            return res.status(401).json({
                msg: 'Invalid authentication token.'
            });
        }

        req.user = user

        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Invalid authentication token.'
        });
    }
}

module.exports = {
    validateJWT
}